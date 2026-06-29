import { Button, Card, Select, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { FC } from 'react';
import React, { useMemo, useState } from 'react';
import { formatNumber } from '@/utils/format';
import type { ProfitDetailRow } from '../../mock/profitDetailData';
import allMockData from '../../mock/profitDetailData';

// ==================== 工具函数 ====================

const POSITIVE_COLOR = '#52c41a';
const NEGATIVE_COLOR = '#f5222d';

const renderRate = (rate: number): React.ReactNode => {
  if (rate === 0) return null;
  const isPositive = rate > 0;
  const color = isPositive ? POSITIVE_COLOR : NEGATIVE_COLOR;
  const sign = isPositive ? '+' : '';
  return (
    <span style={{ color }}>
      {sign}
      {(rate * 100).toFixed(1)}%
    </span>
  );
};

const renderAmount = (val: number) => formatNumber(val);

const renderAchieveRate = (rate: number): React.ReactNode => {
  if (rate === 0) return null;
  const color = rate >= 1 ? NEGATIVE_COLOR : POSITIVE_COLOR;
  return <span style={{ color }}>{(rate * 100).toFixed(0)}%</span>;
};

// ==================== 列定义 ====================

const columns: ColumnsType<ProfitDetailRow> = [
  {
    title: '项目',
    dataIndex: 'project',
    key: 'project',
    width: 200,
  },
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
    width: 180,
    align: 'right',
    render: (val: number | null, record) => {
      if (val === null) return <span style={{ color: '#bfbfbf' }}>—</span>;
      const ratio = record.revenueRatio !== null ? record.revenueRatio : 0;
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 8,
          }}
        >
          <span>{renderAmount(val)}</span>
          {ratio > 0 && (
            <div
              style={{
                width: 60,
                height: 8,
                backgroundColor: '#e8e8e8',
                borderRadius: 4,
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: `${Math.min(ratio * 100, 100)}%`,
                  height: '100%',
                  backgroundColor: '#6EE7B7',
                  borderRadius: 4,
                }}
              />
            </div>
          )}
        </div>
      );
    },
  },
  {
    title: '占收入',
    dataIndex: 'revenueRatio',
    key: 'revenueRatio',
    width: 100,
    align: 'center',
    render: (val: number | null) => {
      if (val === null) return <span style={{ color: '#bfbfbf' }}>—</span>;
      return `${(val * 100).toFixed(1)}%`;
    },
  },
  {
    title: '同比',
    key: 'yoy',
    width: 150,
    align: 'center',
    render: (_: unknown, record) => (
      <span>
        <span style={{ color: '#8c8c8c' }}>
          {renderAmount(record.yoyAmount)}
        </span>{' '}
        {renderRate(record.yoyRate)}
      </span>
    ),
  },
  {
    title: '环比',
    key: 'mom',
    width: 150,
    align: 'center',
    render: (_: unknown, record) => (
      <span>
        <span style={{ color: '#8c8c8c' }}>
          {renderAmount(record.momAmount)}
        </span>{' '}
        {renderRate(record.momRate)}
      </span>
    ),
  },
  {
    title: '预算比',
    key: 'budget',
    width: 170,
    align: 'center',
    render: (_: unknown, record) => {
      if (record.budgetAmount === 0 && record.budgetAchieveRate === 0) {
        return <span style={{ color: '#bfbfbf' }}>—</span>;
      }
      return (
        <span>
          <span style={{ color: '#8c8c8c' }}>
            {renderAmount(record.budgetAmount)}
          </span>{' '}
          {renderAchieveRate(record.budgetAchieveRate)}
        </span>
      );
    },
  },
];

// ==================== 过滤工具 ====================

/** 递归过滤树形数据，保留匹配的行及其祖先链 */
const filterTree = (
  rows: ProfitDetailRow[],
  dc?: string,
  dept?: string,
): ProfitDetailRow[] => {
  return rows.reduce<ProfitDetailRow[]>((acc, row) => {
    // 汇总行：如果上级维度匹配则保留
    const isSummary = row.rowType === 'summary' || row.rowType === 'summaryKey';
    // 检查当前行是否匹配所有筛选条件
    const matchDC = !dc || row.departmentCategory === dc;
    const matchDept = !dept || row.department === dept;

    if (row.children && row.children.length > 0) {
      // 对子行应用过滤
      const filteredChildren = filterTree(row.children, dc, dept);
      // 父行：全局行无条件保留；有归属则自身匹配或有匹配的子行则保留
      const isGlobal = !row.departmentCategory && !row.department;
      const selfMatch =
        (!dc || row.departmentCategory === dc) &&
        (!dept || row.department === dept);
      if (isGlobal || selfMatch || filteredChildren.length > 0) {
        acc.push({
          ...row,
          children:
            filteredChildren.length > 0 ? filteredChildren : row.children,
        });
      }
    } else if (isSummary) {
      // 汇总行：无部门归属（全局）则始终保留；有归属则按部门维度匹配
      const isGlobal = !row.departmentCategory && !row.department;
      if (isGlobal || (matchDC && matchDept)) {
        acc.push(row);
      }
    } else {
      // 普通子行：匹配所有条件
      if (matchDC && matchDept) {
        acc.push(row);
      }
    }
    return acc;
  }, []);
};

// ==================== 组件 ====================

const SELECT_STYLE: React.CSSProperties = { width: 140 };

const ProfitDetailTable: FC = () => {
  // 筛选状态
  const [filterDC, setFilterDC] = useState<string | undefined>(undefined);
  const [filterDept, setFilterDept] = useState<string | undefined>(undefined);

  // 过滤后的数据
  const filteredData = useMemo(
    () => filterTree(allMockData, filterDC, filterDept),
    [filterDC, filterDept],
  );

  // 筛选选项（级联）— 部门维度暂为空，后续接入真实数据后恢复
  const dcOptions = useMemo(
    () =>
      [...new Set(allMockData.map((r) => r.departmentCategory))].filter(
        Boolean,
      ),
    [],
  );

  const deptOptions = useMemo(
    () =>
      [
        ...new Set(
          allMockData
            .filter((r) => !filterDC || r.departmentCategory === filterDC)
            .map((r) => r.department),
        ),
      ].filter(Boolean),
    [filterDC],
  );

  // 父行 key（用于展开/折叠）
  const parentKeys = useMemo(() => {
    const keys: string[] = [];
    const collect = (rows: ProfitDetailRow[]) => {
      for (const row of rows) {
        if (row.rowType === 'parent') keys.push(row.key);
        if (row.children) collect(row.children);
      }
    };
    collect(filteredData);
    return keys;
  }, [filteredData]);

  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  return (
    <Card
      variant="borderless"
      style={{ marginBottom: 24 }}
      title={
        <span style={{ fontWeight: 600, fontSize: 16 }}>📋 利润明细表</span>
      }
      extra={
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{ fontSize: 13, color: '#8c8c8c', whiteSpace: 'nowrap' }}
            >
              部门分类：
            </span>
            <Select
              style={SELECT_STYLE}
              placeholder="全部"
              allowClear
              value={filterDC}
              onChange={(val) => {
                setFilterDC(val);
                setFilterDept(undefined);
              }}
              options={dcOptions.map((v) => ({ label: v, value: v }))}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{ fontSize: 13, color: '#8c8c8c', whiteSpace: 'nowrap' }}
            >
              部门：
            </span>
            <Select
              style={SELECT_STYLE}
              placeholder="全部"
              allowClear
              value={filterDept}
              onChange={(val) => {
                setFilterDept(val);
              }}
              options={deptOptions.map((v) => ({ label: v, value: v }))}
            />
          </div>
        </div>
      }
    >
      {/* 展开/折叠按钮 */}
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Space>
          <Button size="small" onClick={() => setExpandedRowKeys(parentKeys)}>
            展开所有
          </Button>
          <Button size="small" onClick={() => setExpandedRowKeys([])}>
            折叠所有
          </Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        scroll={{ x: 860 }}
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange: (keys) => setExpandedRowKeys(keys as string[]),
          rowExpandable: (record) => record.rowType === 'parent',
        }}
        onRow={(record) => ({
          style: {
            backgroundColor:
              record.rowType === 'summary' || record.rowType === 'summaryKey'
                ? '#e8f5e9'
                : record.rowType === 'parent'
                  ? '#fafafa'
                  : undefined,
            fontWeight: record.rowType === 'child' ? undefined : 600,
            borderBottom:
              record.rowType === 'summaryKey' ? '2px solid #a5d6a7' : undefined,
          },
        })}
      />
    </Card>
  );
};

export default ProfitDetailTable;
