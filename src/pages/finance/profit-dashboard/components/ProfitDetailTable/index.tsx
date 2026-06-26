import { Button, Card, Select, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { FC } from 'react';
import React, { useMemo, useState } from 'react';
import { formatNumber } from '@/utils/format';

// ==================== 类型 ====================

interface ProfitDetailRow {
  key: string;
  project: string;
  rowType: 'parent' | 'child' | 'summary' | 'summaryKey';
  departmentCategory: string;
  department: string;
  categoryLevel1: string;
  categoryLevel2: string;
  amount: number | null;
  revenueRatio: number | null;
  yoyAmount: number;
  yoyRate: number;
  momAmount: number;
  momRate: number;
  budgetAmount: number;
  budgetAchieveRate: number;
  children?: ProfitDetailRow[];
}

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

// ==================== Mock 数据 ====================

const allMockData: ProfitDetailRow[] = [
  {
    key: '1',
    project: '营业收入',
    rowType: 'parent',
    departmentCategory: '',
    department: '',
    categoryLevel1: '营业收入',
    categoryLevel2: '',
    amount: 18087,
    revenueRatio: 1,
    yoyAmount: 11668,
    yoyRate: 0.082,
    momAmount: 16520,
    momRate: 0.114,
    budgetAmount: 17322,
    budgetAchieveRate: 1,
    children: [
      {
        key: '1-1',
        project: '订阅收入',
        rowType: 'child',
        departmentCategory: '',
        department: '',
        categoryLevel1: '营业收入',
        categoryLevel2: '订阅收入',
        amount: 107223,
        revenueRatio: 0.978,
        yoyAmount: 60328,
        yoyRate: 0.779,
        momAmount: 96502,
        momRate: 0.111,
        budgetAmount: 105624,
        budgetAchieveRate: 1,
      },
      {
        key: '1-2',
        project: '服务收入',
        rowType: 'child',
        departmentCategory: '',
        department: '',
        categoryLevel1: '营业收入',
        categoryLevel2: '服务收入',
        amount: 2465,
        revenueRatio: 0.022,
        yoyAmount: 2276,
        yoyRate: 0.082,
        momAmount: 1520,
        momRate: 0.032,
        budgetAmount: 2425,
        budgetAchieveRate: 1.02,
      },
    ],
  },
  {
    key: '2',
    project: '营业成本',
    rowType: 'parent',
    departmentCategory: '',
    department: '',
    categoryLevel1: '营业成本',
    categoryLevel2: '',
    amount: 13667,
    revenueRatio: 0.756,
    yoyAmount: 5020,
    yoyRate: 0.058,
    momAmount: 8200,
    momRate: 0.064,
    budgetAmount: 14000,
    budgetAchieveRate: 0.98,
    children: [
      {
        key: '2-1',
        project: '托管成本',
        rowType: 'child',
        departmentCategory: '',
        department: '',
        categoryLevel1: '营业成本',
        categoryLevel2: '托管成本',
        amount: 8540,
        revenueRatio: 0.472,
        yoyAmount: 3100,
        yoyRate: 0.057,
        momAmount: 5200,
        momRate: 0.065,
        budgetAmount: 8700,
        budgetAchieveRate: 0.98,
      },
      {
        key: '2-2',
        project: '服务交付成本',
        rowType: 'child',
        departmentCategory: '',
        department: '',
        categoryLevel1: '营业成本',
        categoryLevel2: '服务交付成本',
        amount: 5127,
        revenueRatio: 0.284,
        yoyAmount: 1920,
        yoyRate: 0.06,
        momAmount: 3000,
        momRate: 0.062,
        budgetAmount: 5300,
        budgetAchieveRate: 0.97,
      },
    ],
  },
  {
    key: '3',
    project: '项目销售费用',
    rowType: 'parent',
    departmentCategory: '',
    department: '',
    categoryLevel1: '项目销售费用',
    categoryLevel2: '',
    amount: 3159,
    revenueRatio: 0.175,
    yoyAmount: 1230,
    yoyRate: 0.041,
    momAmount: 2100,
    momRate: 0.071,
    budgetAmount: 3200,
    budgetAchieveRate: 0.99,
    children: [
      {
        key: '3-1',
        project: '直销人员费用',
        rowType: 'child',
        departmentCategory: '',
        department: '',
        categoryLevel1: '项目销售费用',
        categoryLevel2: '直销人员费用',
        amount: 1965,
        revenueRatio: 0.109,
        yoyAmount: 780,
        yoyRate: 0.041,
        momAmount: 1300,
        momRate: 0.071,
        budgetAmount: 2000,
        budgetAchieveRate: 0.98,
      },
      {
        key: '3-2',
        project: '渠道合作费用',
        rowType: 'child',
        departmentCategory: '',
        department: '',
        categoryLevel1: '项目销售费用',
        categoryLevel2: '渠道合作费用',
        amount: 1194,
        revenueRatio: 0.066,
        yoyAmount: 450,
        yoyRate: 0.039,
        momAmount: 800,
        momRate: 0.072,
        budgetAmount: 1200,
        budgetAchieveRate: 0.995,
      },
    ],
  },
  {
    key: '4',
    project: '销售净利',
    rowType: 'summary',
    departmentCategory: '',
    department: '',
    categoryLevel1: '销售净利',
    categoryLevel2: '',
    amount: 79261,
    revenueRatio: null,
    yoyAmount: 65800,
    yoyRate: 0.066,
    momAmount: 62200,
    momRate: 0.058,
    budgetAmount: 80026,
    budgetAchieveRate: 0.99,
  },
  {
    key: '5',
    project: '销售净利率',
    rowType: 'summary',
    departmentCategory: '',
    department: '',
    categoryLevel1: '销售净利率',
    categoryLevel2: '',
    amount: null,
    revenueRatio: 0.723,
    yoyAmount: 0,
    yoyRate: 0.066,
    momAmount: 0,
    momRate: 0.058,
    budgetAmount: 0,
    budgetAchieveRate: 0,
  },
  {
    key: '6',
    project: '非项目销售费用',
    rowType: 'parent',
    departmentCategory: '',
    department: '',
    categoryLevel1: '非项目销售费用',
    categoryLevel2: '',
    amount: 5486,
    revenueRatio: 0.303,
    yoyAmount: 2200,
    yoyRate: 0.042,
    momAmount: 3800,
    momRate: 0.074,
    budgetAmount: 5600,
    budgetAchieveRate: 0.98,
    children: [
      {
        key: '6-1',
        project: '品牌宣传费用',
        rowType: 'child',
        departmentCategory: '',
        department: '',
        categoryLevel1: '非项目销售费用',
        categoryLevel2: '品牌宣传费用',
        amount: 2914,
        revenueRatio: 0.161,
        yoyAmount: 1200,
        yoyRate: 0.043,
        momAmount: 2000,
        momRate: 0.074,
        budgetAmount: 3000,
        budgetAchieveRate: 0.97,
      },
      {
        key: '6-2',
        project: '市场推广费用',
        rowType: 'child',
        departmentCategory: '',
        department: '',
        categoryLevel1: '非项目销售费用',
        categoryLevel2: '市场推广费用',
        amount: 2572,
        revenueRatio: 0.142,
        yoyAmount: 1000,
        yoyRate: 0.04,
        momAmount: 1800,
        momRate: 0.075,
        budgetAmount: 2600,
        budgetAchieveRate: 0.99,
      },
    ],
  },
  {
    key: '7',
    project: '研发费用',
    rowType: 'parent',
    departmentCategory: '',
    department: '',
    categoryLevel1: '研发费用',
    categoryLevel2: '',
    amount: 55739,
    revenueRatio: 0.308,
    yoyAmount: 0,
    yoyRate: 0,
    momAmount: 0,
    momRate: 0,
    budgetAmount: 56926,
    budgetAchieveRate: 0.88,
    children: [
      {
        key: '7-1',
        project: '产品研发',
        rowType: 'child',
        departmentCategory: '',
        department: '',
        categoryLevel1: '研发费用',
        categoryLevel2: '产品研发',
        amount: 35830,
        revenueRatio: 0.198,
        yoyAmount: 0,
        yoyRate: 0,
        momAmount: 0,
        momRate: 0,
        budgetAmount: 36500,
        budgetAchieveRate: 0.88,
      },
      {
        key: '7-2',
        project: '技术基础研发',
        rowType: 'child',
        departmentCategory: '',
        department: '',
        categoryLevel1: '研发费用',
        categoryLevel2: '技术基础研发',
        amount: 19909,
        revenueRatio: 0.11,
        yoyAmount: 0,
        yoyRate: 0,
        momAmount: 0,
        momRate: 0,
        budgetAmount: 20426,
        budgetAchieveRate: 0.88,
      },
    ],
  },
  {
    key: '8',
    project: '管理费用',
    rowType: 'parent',
    departmentCategory: '',
    department: '',
    categoryLevel1: '管理费用',
    categoryLevel2: '',
    amount: 3191,
    revenueRatio: 0.176,
    yoyAmount: 1100,
    yoyRate: 0.036,
    momAmount: 2100,
    momRate: 0.07,
    budgetAmount: 3300,
    budgetAchieveRate: 0.97,
    children: [
      {
        key: '8-1',
        project: '人力行政',
        rowType: 'child',
        departmentCategory: '',
        department: '',
        categoryLevel1: '管理费用',
        categoryLevel2: '人力行政',
        amount: 2034,
        revenueRatio: 0.112,
        yoyAmount: 700,
        yoyRate: 0.036,
        momAmount: 1300,
        momRate: 0.068,
        budgetAmount: 2100,
        budgetAchieveRate: 0.97,
      },
      {
        key: '8-2',
        project: '法务合规',
        rowType: 'child',
        departmentCategory: '',
        department: '',
        categoryLevel1: '管理费用',
        categoryLevel2: '法务合规',
        amount: 1157,
        revenueRatio: 0.064,
        yoyAmount: 400,
        yoyRate: 0.036,
        momAmount: 800,
        momRate: 0.074,
        budgetAmount: 1200,
        budgetAchieveRate: 0.96,
      },
    ],
  },
  {
    key: '9',
    project: '财务费用',
    rowType: 'parent',
    departmentCategory: '',
    department: '',
    categoryLevel1: '财务费用',
    categoryLevel2: '',
    amount: 1505,
    revenueRatio: 0.083,
    yoyAmount: 520,
    yoyRate: 0.036,
    momAmount: 950,
    momRate: 0.067,
    budgetAmount: 1550,
    budgetAchieveRate: 0.97,
    children: [
      {
        key: '9-1',
        project: '利息支出',
        rowType: 'child',
        departmentCategory: '',
        department: '',
        categoryLevel1: '财务费用',
        categoryLevel2: '利息支出',
        amount: 892,
        revenueRatio: 0.049,
        yoyAmount: 310,
        yoyRate: 0.036,
        momAmount: 560,
        momRate: 0.067,
        budgetAmount: 920,
        budgetAchieveRate: 0.97,
      },
      {
        key: '9-2',
        project: '汇兑损益',
        rowType: 'child',
        departmentCategory: '',
        department: '',
        categoryLevel1: '财务费用',
        categoryLevel2: '汇兑损益',
        amount: 613,
        revenueRatio: 0.034,
        yoyAmount: 210,
        yoyRate: 0.034,
        momAmount: 390,
        momRate: 0.068,
        budgetAmount: 630,
        budgetAchieveRate: 0.97,
      },
    ],
  },
  {
    key: '10',
    project: '净利润',
    rowType: 'summaryKey',
    departmentCategory: '',
    department: '',
    categoryLevel1: '净利润',
    categoryLevel2: '',
    amount: 948,
    revenueRatio: null,
    yoyAmount: 320,
    yoyRate: 0.051,
    momAmount: 580,
    momRate: 0.066,
    budgetAmount: 980,
    budgetAchieveRate: 0.99,
  },
  {
    key: '11',
    project: '净利率',
    rowType: 'summary',
    departmentCategory: '',
    department: '',
    categoryLevel1: '净利率',
    categoryLevel2: '',
    amount: null,
    revenueRatio: 0.052,
    yoyAmount: 0,
    yoyRate: 0.051,
    momAmount: 0,
    momRate: 0.066,
    budgetAmount: 0,
    budgetAchieveRate: 0,
  },
];

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
  l1?: string,
  l2?: string,
): ProfitDetailRow[] => {
  return rows.reduce<ProfitDetailRow[]>((acc, row) => {
    // 汇总行：如果上级维度匹配则保留
    const isSummary = row.rowType === 'summary' || row.rowType === 'summaryKey';
    // 检查当前行是否匹配所有筛选条件
    const matchDC = !dc || row.departmentCategory === dc;
    const matchDept = !dept || row.department === dept;
    const matchL1 = !l1 || row.categoryLevel1 === l1;
    const matchL2 = !l2 || row.categoryLevel2 === l2;

    if (row.children && row.children.length > 0) {
      // 对子行应用过滤
      const filteredChildren = filterTree(row.children, dc, dept, l1, l2);
      // 父行：全局行无条件保留；有归属则自身匹配或有匹配的子行则保留
      const isGlobal = !row.departmentCategory && !row.department;
      const selfMatch =
        (!dc || row.departmentCategory === dc) &&
        (!dept || row.department === dept) &&
        (!l1 || row.categoryLevel1 === l1);
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
      if (matchDC && matchDept && matchL1 && matchL2) {
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
  const [filterL1, setFilterL1] = useState<string | undefined>(undefined);
  const [filterL2, setFilterL2] = useState<string | undefined>(undefined);

  // 过滤后的数据
  const filteredData = useMemo(
    () => filterTree(allMockData, filterDC, filterDept, filterL1, filterL2),
    [filterDC, filterDept, filterL1, filterL2],
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

  const l1Options = useMemo(
    () => [
      ...new Set(
        allMockData
          .filter(
            (r) =>
              r.rowType === 'parent' &&
              (!filterDC || r.departmentCategory === filterDC) &&
              (!filterDept || r.department === filterDept),
          )
          .map((r) => r.categoryLevel1),
      ),
    ],
    [filterDC, filterDept],
  );

  const l2Options = useMemo(
    () => [
      ...new Set(
        allMockData
          .filter(
            (r) =>
              r.rowType === 'child' &&
              (!filterDC || r.departmentCategory === filterDC) &&
              (!filterDept || r.department === filterDept) &&
              (!filterL1 || r.categoryLevel1 === filterL1),
          )
          .map((r) => r.categoryLevel2),
      ),
    ],
    [filterDC, filterDept, filterL1],
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
      title="利润明细"
      style={{ marginBottom: 24 }}
      extra={
        <Space>
          <Button size="small" onClick={() => setExpandedRowKeys(parentKeys)}>
            展开所有
          </Button>
          <Button size="small" onClick={() => setExpandedRowKeys([])}>
            折叠所有
          </Button>
        </Space>
      }
    >
      {/* 筛选器 */}
      <div
        style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}
      >
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
              setFilterL1(undefined);
              setFilterL2(undefined);
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
              setFilterL1(undefined);
              setFilterL2(undefined);
            }}
            options={deptOptions.map((v) => ({ label: v, value: v }))}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{ fontSize: 13, color: '#8c8c8c', whiteSpace: 'nowrap' }}
          >
            一级类目：
          </span>
          <Select
            style={SELECT_STYLE}
            placeholder="全部"
            allowClear
            value={filterL1}
            onChange={(val) => {
              setFilterL1(val);
              setFilterL2(undefined);
            }}
            options={l1Options.map((v) => ({ label: v, value: v }))}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{ fontSize: 13, color: '#8c8c8c', whiteSpace: 'nowrap' }}
          >
            二级类目：
          </span>
          <Select
            style={SELECT_STYLE}
            placeholder="全部"
            allowClear
            value={filterL2}
            onChange={setFilterL2}
            options={l2Options.map((v) => ({ label: v, value: v }))}
          />
        </div>
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
