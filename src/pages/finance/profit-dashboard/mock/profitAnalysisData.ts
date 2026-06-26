// ==================== 年利润趋势 Mock 数据 ====================

export const months = [
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

// 2026 年 1-4 月实际值
export const revenue2026: Record<number, number> = {
  0: 2900,
  1: 2700,
  2: 2400,
  3: 2000,
};
export const profit2026: Record<number, number> = {
  0: 464,
  1: 430,
  2: 380,
  3: 320,
};

// 2026 年利润率
export const rate2026ActualValues = [0.16, 0.159, 0.158, 0.16];

// 2026 年 1-4 月实际值柱状数据
export const actualBarData = months.slice(0, 4).flatMap((m, i) => [
  { month: m, type: '收入', value: revenue2026[i] },
  { month: m, type: '净利润', value: profit2026[i] },
]);

// 2026 年 1-4 月实际值折线数据
export const actualLineData = months.slice(0, 4).map((m, i) => ({
  month: m,
  value: rate2026ActualValues[i],
}));
