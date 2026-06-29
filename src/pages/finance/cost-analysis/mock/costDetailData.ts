// ==================== 费用明细 Mock 数据 ====================

export interface CostDetailRow {
  key: string;
  departmentKey: string; // 部门（用于筛选）
  primaryCategory: string; // 一级科目
  secondaryCategory: string; // 二级科目
  costItem: string; // 费用项目
  category: string; // 分类：'项目' | '非项目+人员'
  budget: number;
  actual: number;
}

const allRows: CostDetailRow[] = [
  // ---- 研发部（默认展示）----
  { key: '1', departmentKey: '研发部', primaryCategory: '研发费用', secondaryCategory: '研发费用–人员', costItem: '工资', category: '非项目+人员', budget: 51.7, actual: 39.8 },
  { key: '2', departmentKey: '研发部', primaryCategory: '研发费用', secondaryCategory: '研发费用–人员', costItem: '社保公积金', category: '非项目+人员', budget: 43.1, actual: 38.4 },
  { key: '3', departmentKey: '研发部', primaryCategory: '研发费用', secondaryCategory: '研发费用–其他', costItem: '软件费', category: '非项目+人员', budget: 34.4, actual: 31.3 },
  { key: '4', departmentKey: '研发部', primaryCategory: '研发费用', secondaryCategory: '研发费用–其他', costItem: '专利费', category: '非项目+人员', budget: 25.8, actual: 25.6 },

  // ---- 销售部 ----
  { key: '5', departmentKey: '销售部', primaryCategory: '销售费用', secondaryCategory: '销售费用–项目', costItem: '项目提成', category: '项目', budget: 29.0, actual: 24.9 },
  { key: '6', departmentKey: '销售部', primaryCategory: '销售费用', secondaryCategory: '销售费用–非项目', costItem: '广告费', category: '非项目+人员', budget: 33.1, actual: 32.7 },
  { key: '7', departmentKey: '销售部', primaryCategory: '销售费用', secondaryCategory: '销售费用–非项目', costItem: '差旅费', category: '非项目+人员', budget: 12.4, actual: 14.0 },
  { key: '8', departmentKey: '销售部', primaryCategory: '销售费用', secondaryCategory: '销售费用–非项目', costItem: '广告费', category: '非项目+人员', budget: 26.3, actual: 28.0 },
  { key: '9', departmentKey: '销售部', primaryCategory: '销售费用', secondaryCategory: '销售费用–非项目', costItem: '差旅费', category: '非项目+人员', budget: 9.9, actual: 12.0 },
  { key: '10', departmentKey: '销售部', primaryCategory: '销售费用', secondaryCategory: '销售费用–人员', costItem: '工资', category: '非项目+人员', budget: 49.7, actual: 45.1 },
  { key: '11', departmentKey: '销售部', primaryCategory: '销售费用', secondaryCategory: '销售费用–人员', costItem: '奖金', category: '非项目+人员', budget: 20.7, actual: 23.3 },
  { key: '12', departmentKey: '销售部', primaryCategory: '销售费用', secondaryCategory: '销售费用–人员', costItem: '工资', category: '非项目+人员', budget: 39.4, actual: 38.7 },
  { key: '13', departmentKey: '销售部', primaryCategory: '销售费用', secondaryCategory: '销售费用–人员', costItem: '奖金', category: '非项目+人员', budget: 16.4, actual: 20.0 },
  { key: '14', departmentKey: '销售部', primaryCategory: '销售费用', secondaryCategory: '销售费用–项目', costItem: '项目提成', category: '项目', budget: 23.0, actual: 21.3 },

  // ---- 财务部 ----
  { key: '15', departmentKey: '财务部', primaryCategory: '财务费用', secondaryCategory: '财务费用', costItem: '利息支出', category: '非项目+人员', budget: 97.5, actual: 89.6 },
  { key: '16', departmentKey: '财务部', primaryCategory: '财务费用', secondaryCategory: '财务费用', costItem: '手续费', category: '非项目+人员', budget: 32.5, actual: 38.4 },

  // ---- 行政部 ----
  { key: '17', departmentKey: '行政部', primaryCategory: '管理费用', secondaryCategory: '管理费用–办公', costItem: '办公费', category: '非项目+人员', budget: 4.8, actual: 6.2 },
  { key: '18', departmentKey: '行政部', primaryCategory: '管理费用', secondaryCategory: '管理费用–办公', costItem: '房租费', category: '非项目+人员', budget: 19.3, actual: 19.6 },
  { key: '19', departmentKey: '行政部', primaryCategory: '管理费用', secondaryCategory: '管理费用–办公', costItem: '水电费', category: '非项目+人员', budget: 3.9, actual: 3.6 },
  { key: '20', departmentKey: '行政部', primaryCategory: '管理费用', secondaryCategory: '管理费用–办公', costItem: '停车费', category: '非项目+人员', budget: 2.4, actual: 3.1 },
  { key: '21', departmentKey: '行政部', primaryCategory: '管理费用', secondaryCategory: '管理费用–办公', costItem: '通讯费', category: '非项目+人员', budget: 1.4, actual: 2.1 },
  { key: '22', departmentKey: '行政部', primaryCategory: '管理费用', secondaryCategory: '管理费用–办公', costItem: '物业费', category: '非项目+人员', budget: 5.8, actual: 5.7 },
  { key: '23', departmentKey: '行政部', primaryCategory: '管理费用', secondaryCategory: '管理费用–人员', costItem: '工资', category: '非项目+人员', budget: 43.3, actual: 43.9 },
  { key: '24', departmentKey: '行政部', primaryCategory: '管理费用', secondaryCategory: '管理费用–人员', costItem: '社保公积金', category: '非项目+人员', budget: 14.4, actual: 16.5 },

  // ---- 市场部 ----
  { key: '25', departmentKey: '市场部', primaryCategory: '管理费用', secondaryCategory: '管理费用–其他', costItem: '咨询费', category: '非项目+人员', budget: 9.6, actual: 9.3 },
];

export default allRows;
