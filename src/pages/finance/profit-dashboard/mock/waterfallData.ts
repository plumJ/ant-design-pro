// ==================== 瀑布图数据转换 ====================

import allMockData from './profitDetailData';

export interface WaterfallItem {
  category: string;
  amount: number;
  type: 'rising' | 'falling' | 'total';
  isTotal?: boolean;
}

export const buildWaterfallData = (): WaterfallItem[] => {
  const items: WaterfallItem[] = [];

  for (const row of allMockData) {
    // 一级类目（parent 行）
    if (row.rowType === 'parent') {
      const isIncome = row.categoryLevel1 === '营业收入';
      items.push({
        category: row.project,
        amount: isIncome ? (row.amount ?? 0) : -((row.amount ?? 0)),
        type: isIncome ? 'rising' : 'falling',
      });
    }
    // 净利润 → 总计柱
    if (row.rowType === 'summaryKey' && row.categoryLevel1 === '净利润') {
      items.push({
        category: row.project,
        amount: row.amount ?? 0,
        type: 'total',
        isTotal: true,
      });
    }
  }

  return items;
};
