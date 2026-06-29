// ==================== 指标卡 Mock 数据 ====================

/** 前 4 个标准指标卡 */
export interface MetricCard {
  title: string;
  value: string;
  /** 正值涨、负值跌 */
  delta: number;
  /** "pp" 或 "万" 等 */
  unit: string;
  comparisonLabel: string;
  comparisonValue: string;
}

export const metricCards: MetricCard[] = [
  {
    title: '本月费用率',
    value: '28.7%',
    delta: 2.3,
    unit: 'pp',
    comparisonLabel: '环比上月',
    comparisonValue: '26.4%',
  },
  {
    title: '本月预算执行率',
    value: '89.4%',
    delta: -3.1,
    unit: 'pp',
    comparisonLabel: '环比上月',
    comparisonValue: '92.5%',
  },
  {
    title: '本年费用率',
    value: '27.5%',
    delta: -1.2,
    unit: 'pp',
    comparisonLabel: '同比去年',
    comparisonValue: '28.7%',
  },
  {
    title: '本年预算执行率',
    value: '52.8%',
    delta: 4.5,
    unit: 'pp',
    comparisonLabel: '时间进度',
    comparisonValue: '50.0%',
  },
];

/** 第 5 个进度汇总卡 */
export interface ProgressCard {
  percent: number;
  usedLabel: string;
  usedAmount: string;
  targetLabel: string;
  targetAmount: string;
}

export const progressCard: ProgressCard = {
  percent: 52.8,
  usedLabel: '本年累计使用',
  usedAmount: '¥528.0万',
  targetLabel: '全年目标',
  targetAmount: '¥1000.0万',
};
