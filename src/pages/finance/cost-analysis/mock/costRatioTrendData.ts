// ==================== 费用占收入比趋势 Mock 数据 ====================

const months = [
  '1月', '2月', '3月', '4月', '5月', '6月',
  '7月', '8月', '9月', '10月', '11月', '12月',
];

// ---- 各月占比（小数，如 0.062 = 6.2%） ----
// 去年：1–12 月全部有数据
const lastYearRatios = [0.062, 0.068, 0.063, 0.059, 0.066, 0.067, 0.065, 0.069, 0.064, 0.068, 0.052, 0.075];
// 本年：仅 1–6 月有数据，7–12 月为空
const thisYearRatios = [0.058, 0.058, 0.058, 0.058, 0.058, 0.058];

// ---- 绝对值模式数据 ----
export interface LinePoint {
  month: string;
  category: string;
  value: number;
}

export const absoluteData: LinePoint[] = [
  // 去年占比：12 个月
  ...months.map((month, i) => ({
    month,
    category: '去年占比',
    value: lastYearRatios[i],
  })),
  // 本年占比：仅 1–6 月
  ...months.slice(0, 6).map((month, i) => ({
    month,
    category: '本年占比',
    value: thisYearRatios[i],
  })),
];
