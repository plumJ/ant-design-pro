// ==================== 对比卡片 Mock 数据 ====================

/** 单个比较项 */
export interface ComparisonItem {
  label: string; // "环比（上月）" / "同比（去年同月）"
  referenceValue?: string; // 参考值，如 "￥2,500.00"，净利润率卡不显示
  rate: number; // 变化率，如 -5.60，正数为涨，负数为跌
  unit?: string; // "%" 或 "pp"
}

export interface CardConfig {
  title: string;
  primaryValue: string;
  mom: ComparisonItem; // 环比
  yoy: ComparisonItem; // 同比
}

export const cards: CardConfig[] = [
  {
    title: '本月收入',
    primaryValue: '￥2,360,000',
    mom: {
      label: '环比（上月）',
      referenceValue: '￥2,500,000',
      rate: -5.6,
    },
    yoy: {
      label: '同比（去年同月）',
      referenceValue: '￥2,200,000',
      rate: 7.27,
    },
  },
  {
    title: '本月销售净毛利',
    primaryValue: '￥6,169,000',
    mom: {
      label: '环比（上月）',
      referenceValue: '￥5,800,000',
      rate: 6.36,
    },
    yoy: {
      label: '同比（去年同月）',
      referenceValue: '￥5,500,000',
      rate: 12.16,
    },
  },
  {
    title: '本月净利润',
    primaryValue: '￥3,380,000',
    mom: {
      label: '环比（上月）',
      referenceValue: '￥3,200,000',
      rate: 5.62,
    },
    yoy: {
      label: '同比（去年同月）',
      referenceValue: '￥3,050,000',
      rate: 10.82,
    },
  },
  {
    title: '本月净利润率',
    primaryValue: '14.5%',
    mom: {
      label: '环比（上月）',
      referenceValue: '13.80%',
      rate: 0.7,
      unit: 'pp',
    },
    yoy: {
      label: '同比（去年同月）',
      referenceValue: '12.90%',
      rate: 1.6,
      unit: 'pp',
    },
  },
];
