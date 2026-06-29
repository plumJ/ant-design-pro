import { Button, Card, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { FC } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import type { CostDetailRow } from '../../mock/costDetailData';
import allRows from '../../mock/costDetailData';

// ==================== 常量 ====================

const ALL = '__all__';

const CATEGORY_OPTIONS = [
  { label: '全部', value: ALL },
  { label: '项目', value: '项目' },
  { label: '非项目+人员', value: '非项目+人员' },
];

// ==================== 行类型（含 computed 字段） ====================

interface DisplayRow extends CostDetailRow {
  difference: number;
  differenceRate: number;
  _rowSpan?: number;
  _secRowSpan?: number;
}

// ==================== 列定义 ====================

const columns: ColumnsType<DisplayRow> = [
  {
    title: '一级科目',
    dataIndex: 'primaryCategory',
    key: 'primaryCategory',
    width: 100,
    onCell: (record) => ({ rowSpan: record._rowSpan ?? 0 }),
    render: (text: string) => (
      <span style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{text}</span>
    ),
  },
  {
    title: '二级科目',
    dataIndex: 'secondaryCategory',
    key: 'secondaryCategory',
    width: 130,
    onCell: (record) => ({ rowSpan: record._secRowSpan ?? 0 }),
    render: (text: string) => (
      <span style={{ whiteSpace: 'nowrap' }}>{text}</span>
    ),
  },
  {
    title: '费用项目',
    dataIndex: 'costItem',
    key: 'costItem',
    width: 110,
    render: (text: string) => (
      <span style={{ whiteSpace: 'nowrap' }}>{text}</span>
    ),
  },
  {
    title: '预算',
    dataIndex: 'budget',
    key: 'budget',
    width: 80,
    align: 'right',
    render: (val: number) => val.toFixed(1),
  },
  {
    title: '实际',
    dataIndex: 'actual',
    key: 'actual',
    width: 80,
    align: 'right',
    render: (val: number) => val.toFixed(1),
  },
  {
    title: '差异',
    dataIndex: 'difference',
    key: 'difference',
    width: 85,
    align: 'right',
    render: (val: number) => (
      <span
        style={{
          display: 'inline-block',
          padding: '2px 8px',
          borderRadius: 4,
          backgroundColor: val >= 0 ? '#fff1f0' : '#f6ffed',
          color: val >= 0 ? '#cf1322' : '#389e0d',
          fontWeight: 600,
        }}
      >
        {val >= 0 ? '+' : ''}
        {val.toFixed(1)}
      </span>
    ),
  },
  {
    title: '差异率',
    dataIndex: 'differenceRate',
    key: 'differenceRate',
    width: 85,
    align: 'right',
    render: (val: number) => (
      <span
        style={{
          color: val >= 0 ? '#cf1322' : '#389e0d',
          fontWeight: 500,
        }}
      >
        {val >= 0 ? '+' : ''}
        {(val * 100).toFixed(1)}%
      </span>
    ),
  },
];

// ==================== 工具函数 ====================

/** 计算差异和差异率 */
function enrichRow(row: CostDetailRow): DisplayRow {
  const difference = row.actual - row.budget;
  const differenceRate = row.budget !== 0 ? difference / row.budget : 0;
  return { ...row, difference, differenceRate };
}

/** 计算一级科目和二级科目的 rowSpan */
function computeRowSpans(rows: DisplayRow[]): DisplayRow[] {
  const result: DisplayRow[] = [];

  let i = 0;
  while (i < rows.length) {
    // 一级科目分组
    const primary = rows[i].primaryCategory;
    let j = i;
    while (j < rows.length && rows[j].primaryCategory === primary) j++;

    // 在一级科目组内按二级科目再分组
    let k = i;
    while (k < j) {
      const secondary = rows[k].secondaryCategory;
      let m = k;
      while (m < j && rows[m].secondaryCategory === secondary) m++;

      for (let idx = k; idx < m; idx++) {
        result.push({
          ...rows[idx],
          _rowSpan: idx === i ? j - i : 0,
          _secRowSpan: idx === k ? m - k : 0,
        });
      }
      k = m;
    }
    i = j;
  }

  return result;
}

// ==================== 组件 ====================

interface Props {
  linkedDepartment?: string;
}

const CostDetailTable: FC<Props> = ({ linkedDepartment }) => {
  // ---- 筛选状态 ----
  const [deptFilter, setDeptFilter] = useState<string[]>([]);
  const [primaryFilter, setPrimaryFilter] = useState<string[]>([]);
  const [secondaryFilter, setSecondaryFilter] = useState<string[]>([]);
  const [itemFilter, setItemFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>(ALL);

  // ---- 联动：图表点击部门时自动筛选 ----
  useEffect(() => {
    if (linkedDepartment) {
      setDeptFilter([linkedDepartment]);
    }
  }, [linkedDepartment]);

  // ---- 选项列表（从全量数据提取） ----
  const deptOptions = useMemo(
    () => [...new Set(allRows.map((r) => r.departmentKey))],
    [],
  );
  const primaryOptions = useMemo(
    () => [...new Set(allRows.map((r) => r.primaryCategory))],
    [],
  );
  const secondaryOptions = useMemo(
    () => [...new Set(allRows.map((r) => r.secondaryCategory))],
    [],
  );
  const itemOptions = useMemo(
    () => [...new Set(allRows.map((r) => r.costItem))],
    [],
  );

  // ---- 过滤 + 计算 ----
  const dataSource = useMemo(() => {
    let filtered = allRows;

    if (deptFilter.length > 0) {
      filtered = filtered.filter((r) => deptFilter.includes(r.departmentKey));
    }
    if (primaryFilter.length > 0) {
      filtered = filtered.filter((r) =>
        primaryFilter.includes(r.primaryCategory),
      );
    }
    if (secondaryFilter.length > 0) {
      filtered = filtered.filter((r) =>
        secondaryFilter.includes(r.secondaryCategory),
      );
    }
    if (itemFilter.length > 0) {
      filtered = filtered.filter((r) => itemFilter.includes(r.costItem));
    }
    if (categoryFilter !== ALL) {
      filtered = filtered.filter((r) => r.category === categoryFilter);
    }

    return computeRowSpans(filtered.map(enrichRow));
  }, [deptFilter, primaryFilter, secondaryFilter, itemFilter, categoryFilter]);

  // ---- 合计 ----
  const summaryData = useMemo(() => {
    const totalBudget = dataSource.reduce((s, r) => s + r.budget, 0);
    const totalActual = dataSource.reduce((s, r) => s + r.actual, 0);
    const totalDiff = totalActual - totalBudget;
    const totalDiffRate = totalBudget !== 0 ? totalDiff / totalBudget : 0;
    return { totalBudget, totalActual, totalDiff, totalDiffRate };
  }, [dataSource]);

  // ---- 重置 ----
  const handleReset = () => {
    setDeptFilter([]);
    setPrimaryFilter([]);
    setSecondaryFilter([]);
    setItemFilter([]);
    setCategoryFilter(ALL);
  };

  return (
    <Card
      variant="borderless"
      title={
        <span style={{ fontWeight: 600, fontSize: 16 }}>
          📋 费用明细（多选标签）
        </span>
      }
      extra={
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ whiteSpace: 'nowrap' }}>分类：</span>
          <Select
            style={{ width: 140 }}
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={CATEGORY_OPTIONS}
          />
          <Button type="primary" danger onClick={handleReset}>
            重置
          </Button>
        </div>
      }
    >
      {/* 筛选行: 部门 | 一级科目 | 二级科目 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 12,
          flexWrap: 'wrap',
        }}
      >
        <span style={{ whiteSpace: 'nowrap' }}>部门：</span>
        <Select
          mode="multiple"
          style={{ minWidth: 180 }}
          value={deptFilter.length === 0 ? [ALL] : deptFilter}
          onChange={(vals: string[]) => {
            const others = vals.filter((v) => v !== ALL);
            if (vals.includes(ALL) && others.length === 0) {
              setDeptFilter([]);
            } else {
              setDeptFilter(others);
            }
          }}
          options={[
            { label: '全部', value: ALL },
            ...deptOptions.map((v) => ({ label: v, value: v })),
          ]}
          placeholder="全部"
          allowClear
        />
        <span style={{ whiteSpace: 'nowrap' }}>一级科目：</span>
        <Select
          mode="multiple"
          style={{ minWidth: 140 }}
          value={primaryFilter.length === 0 ? [ALL] : primaryFilter}
          onChange={(vals: string[]) => {
            const others = vals.filter((v) => v !== ALL);
            if (vals.includes(ALL) && others.length === 0) {
              setPrimaryFilter([]);
            } else {
              setPrimaryFilter(others);
            }
          }}
          options={[
            { label: '全部', value: ALL },
            ...primaryOptions.map((v) => ({ label: v, value: v })),
          ]}
          placeholder="全部"
          allowClear
        />
        <span style={{ whiteSpace: 'nowrap' }}>二级科目：</span>
        <Select
          mode="multiple"
          style={{ minWidth: 160 }}
          value={secondaryFilter.length === 0 ? [ALL] : secondaryFilter}
          onChange={(vals: string[]) => {
            const others = vals.filter((v) => v !== ALL);
            if (vals.includes(ALL) && others.length === 0) {
              setSecondaryFilter([]);
            } else {
              setSecondaryFilter(others);
            }
          }}
          options={[
            { label: '全部', value: ALL },
            ...secondaryOptions.map((v) => ({ label: v, value: v })),
          ]}
          placeholder="全部"
          allowClear
        />
      </div>
      {/* 筛选行2: 费用项目 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 16,
          flexWrap: 'wrap',
        }}
      >
        <span style={{ whiteSpace: 'nowrap' }}>费用项目：</span>
        <Select
          mode="multiple"
          style={{ minWidth: 140 }}
          value={itemFilter.length === 0 ? [ALL] : itemFilter}
          onChange={(vals: string[]) => {
            const others = vals.filter((v) => v !== ALL);
            if (vals.includes(ALL) && others.length === 0) {
              setItemFilter([]);
            } else {
              setItemFilter(others);
            }
          }}
          options={[
            { label: '全部', value: ALL },
            ...itemOptions.map((v) => ({ label: v, value: v })),
          ]}
          placeholder="全部"
          allowClear
        />
      </div>

      {/* 表格 */}
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        size="small"
        scroll={{ y: 500 }}
        bordered
        summary={() => (
          <Table.Summary.Row
            style={{ backgroundColor: '#fafafa', fontWeight: 600 }}
          >
            <Table.Summary.Cell index={0}>合计</Table.Summary.Cell>
            <Table.Summary.Cell index={1} />
            <Table.Summary.Cell index={2} />
            <Table.Summary.Cell index={3} align="right">
              {summaryData.totalBudget.toFixed(1)}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={4} align="right">
              {summaryData.totalActual.toFixed(1)}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={5} align="right">
              <span
                style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  borderRadius: 4,
                  backgroundColor:
                    summaryData.totalDiff >= 0 ? '#fff1f0' : '#f6ffed',
                  color: summaryData.totalDiff >= 0 ? '#cf1322' : '#389e0d',
                }}
              >
                {summaryData.totalDiff >= 0 ? '+' : ''}
                {summaryData.totalDiff.toFixed(1)}
              </span>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={6} align="right">
              <span
                style={{
                  color: summaryData.totalDiffRate >= 0 ? '#cf1322' : '#389e0d',
                }}
              >
                {summaryData.totalDiffRate >= 0 ? '+' : ''}
                {(summaryData.totalDiffRate * 100).toFixed(1)}%
              </span>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    </Card>
  );
};

export default CostDetailTable;
