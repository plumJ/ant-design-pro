import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row } from 'antd';
import dayjs from 'dayjs';
import type { FC } from 'react';
import { useState } from 'react';
import ComparisonCards from './components/ComparisonCards';
import type { PeriodValue } from './components/PeriodFilter';
import PeriodFilter from './components/PeriodFilter';
import ProfitAnalysis from './components/ProfitAnalysis';
import ProfitDetailTable from './components/ProfitDetailTable';
import ProfitWaterfallChart from './components/ProfitDetailTable/ProfitWaterfallChart';
import TopCards from './components/TopCards';

const now = dayjs();
const defaultPeriodValue: PeriodValue = {
  mode: 'month',
  year: now.year(),
  month: now.month() + 1,
};

const ProfitDashboard: FC = () => {
  const [period, setPeriod] = useState<PeriodValue>(defaultPeriodValue);

  const handlePeriodChange = (value: PeriodValue) => {
    setPeriod(value);
    // TODO: 后续在此触发数据重新请求
  };

  return (
    <PageContainer title={false}>
      <PeriodFilter value={period} onChange={handlePeriodChange} />
      <TopCards />
      <ComparisonCards />
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <ProfitAnalysis />
        </Col>
        <Col span={12}>
          <Card
            variant="borderless"
            title={
              <span style={{ fontWeight: 600, fontSize: 16 }}>利润瀑布图</span>
            }
          >
            <ProfitWaterfallChart />
          </Card>
        </Col>
      </Row>
      <ProfitDetailTable />
      {/* TODO: 后续添加利润构成饼图 */}
      {/* TODO: 后续添加业务线明细 */}
    </PageContainer>
  );
};

export default ProfitDashboard;
