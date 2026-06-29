import { PageContainer } from '@ant-design/pro-components';
import { Col, DatePicker, Row, Segmented, Select } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { FC } from 'react';
import { useState } from 'react';
import AnnualCostDonut from './components/AnnualCostDonut';
import CostDetailTable from './components/CostDetailTable';
import CostRatioTrend from './components/CostRatioTrend';
import DepartmentBudgetChart from './components/DepartmentBudgetChart';
import IndicatorCards from './components/IndicatorCards';
import MonthlyCostDonut from './components/MonthlyCostDonut';
import MonthlyCostStack from './components/MonthlyCostStack';

type PeriodMode = 'year' | 'month';

interface PeriodValue {
  mode: PeriodMode;
  year: number;
  month: number;
}

const now = dayjs();
const defaultPeriodValue: PeriodValue = {
  mode: 'month',
  year: now.year(),
  month: now.month() + 1,
};

const CATEGORY_OPTIONS = [
  { label: '全选', value: 'all' },
  { label: '项目', value: 'project' },
  { label: '非项目+人员', value: 'non-project' },
];

const CostAnalysis: FC = () => {
  const [period, setPeriod] = useState<PeriodValue>(defaultPeriodValue);
  const [category, setCategory] = useState<string>('all');
  const [linkedDepartment, setLinkedDepartment] = useState<string>('');

  const { mode, year, month } = period;

  return (
    <PageContainer title={false}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <span>数据周期：</span>
        <Segmented
          value={mode}
          onChange={(val) => setPeriod({ ...period, mode: val as PeriodMode })}
          options={[
            { label: '年度', value: 'year' },
            { label: '月度', value: 'month' },
          ]}
        />
        <DatePicker
          picker="year"
          value={dayjs().year(year)}
          onChange={(d: Dayjs | null) => {
            if (d) setPeriod({ ...period, year: d.year() });
          }}
          allowClear={false}
        />
        {mode === 'month' && (
          <DatePicker
            picker="month"
            value={dayjs(`${year}-${String(month).padStart(2, '0')}`)}
            onChange={(d: Dayjs | null) => {
              if (d) setPeriod({ ...period, month: d.month() + 1 });
            }}
            allowClear={false}
          />
        )}
        <span>分类：</span>
        <Select
          style={{ width: 160 }}
          value={category}
          onChange={setCategory}
          options={CATEGORY_OPTIONS}
        />
      </div>
      <IndicatorCards />
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={15}>
          <MonthlyCostStack />
        </Col>
        <Col span={9}>
          <MonthlyCostDonut />
        </Col>
      </Row>
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={15}>
          <CostRatioTrend />
        </Col>
        <Col span={9}>
          <AnnualCostDonut />
        </Col>
      </Row>
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={9}>
          <DepartmentBudgetChart onDepartmentClick={setLinkedDepartment} />
        </Col>
        <Col span={15}>
          <CostDetailTable linkedDepartment={linkedDepartment} />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default CostAnalysis;
