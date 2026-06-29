// ==================== 全年费用构成 Mock 数据 ====================

export interface DonutItem {
  category: string;
  value: number;
}

export const donutData: DonutItem[] = [
  { category: '销售费用-项目', value: 780 },
  { category: '销售费用-非项目', value: 1150 },
  { category: '管理费用', value: 2555 },
  { category: '研发费用', value: 2910 },
  { category: '财务费用', value: 286 },
];

export const donutTotal = 7681;
