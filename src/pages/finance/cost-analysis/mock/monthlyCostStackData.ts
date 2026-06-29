// ==================== 月度费用堆叠 Mock 数据 ====================

const categories = [
  '销售费用-项目',
  '销售费用-非项目',
  '管理费用',
  '研发费用',
  '财务费用',
] as const;

/** 12 个月各分类费用数据 */
const monthlyData: Record<(typeof categories)[number], number[]> = {
  '销售费用-项目': [55, 57, 59, 62, 65, 67, 68, 70, 72, 73, 74, 75],
  '销售费用-非项目': [80, 83, 87, 91, 95, 98, 100, 103, 105, 107, 108, 110],
  '管理费用': [180, 185, 192, 200, 210, 215, 220, 225, 230, 235, 238, 240],
  '研发费用': [200, 205, 213, 223, 235, 242, 248, 253, 258, 262, 264, 265],
  '财务费用': [25, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30],
};

export interface MonthlyCostItem {
  month: string;
  category: string;
  value: number;
}

/** 转换为堆叠面积图所需格式 */
export const monthlyCostData: MonthlyCostItem[] = [];
const months = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月',
];

for (const category of categories) {
  for (let i = 0; i < 12; i++) {
    monthlyCostData.push({
      month: months[i],
      category,
      value: monthlyData[category][i],
    });
  }
}

/** 颜色映射 */
export const categoryColors: Record<string, string> = {
  '销售费用-项目': '#B3D9FF',
  '销售费用-非项目': '#C4B5E8',
  '管理费用': '#F0B8D8',
  '研发费用': '#FFD9B3',
  '财务费用': '#FFF2B3',
};
