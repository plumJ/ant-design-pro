// ==================== 月度费用构成 Mock 数据 ====================

export interface DonutItem {
  category: string;
  value: number;
}

export const donutData: DonutItem[] = [
  { category: '销售费用-项目', value: 65 },
  { category: '销售费用-非项目', value: 95 },
  { category: '管理费用', value: 208 },
  { category: '研发费用', value: 241 },
  { category: '财务费用', value: 26 },
];

export const donutTotal = 635;
