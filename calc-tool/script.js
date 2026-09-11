// 消费记账数据
const expenses = [
  { category: '餐饮', amount: 35, note: '午餐' },
  { category: '交通', amount: 12, note: '地铁' },
  { category: '餐饮', amount: 28, note: '晚餐' },
  { category: '购物', amount: -50, note: '退款误录' },
  { category: '交通', amount: 15, note: '打车' },
  { category: '餐饮', amount: 0, note: '朋友请客' },
  { category: '娱乐', amount: 88, note: '电影票' },
  { category: '购物', amount: 9999, note: '测试异常' }
];
// 清洗：只保留金额大于0且不超过5000的合法记录
const cleanExpenses = (list) => list.filter(e => e.amount > 0 && e.amount <= 5000);
// 总支出
const totalSpent = (list) => list.reduce((sum, e) => sum + e.amount, 0);
// 平均每笔
const averageExpense = (list) => {
  if (list.length === 0) return '0.00';
  return (totalSpent(list) / list.length).toFixed(2);
};
// 最高单笔
const topExpense = (list) => list.reduce((max, e) => e.amount > max.amount ? e : max, list[0]);
// 各分类小计
const categoryTotals = (list) => {
  const result = {};
  list.forEach(e => {
    result[e.category] = (result[e.category] || 0) + e.amount;
  });
  return result;
};
console.log('清洗后：', cleanExpenses(expenses));
console.log('总支出：', totalSpent(cleanExpenses(expenses)));
console.log('平均每笔：', averageExpense(cleanExpenses(expenses)));
console.log('最高单笔：', topExpense(cleanExpenses(expenses)));
console.log('各分类小计：', categoryTotals(cleanExpenses(expenses)));
// 消费等级判定（单值进单值出，纯函数）
const toLevel = (amount) => {
  if (amount >= 200) return '高消费';
  if (amount >= 100) return '中消费';
  if (amount >= 50) return '低消费';
  return '微量消费';
};
// 各等级笔数统计
const levelCount = (list) => {
  const result = { '高消费': 0, '中消费': 0, '低消费': 0, '微量消费': 0 };
  list.forEach(e => { result[toLevel(e.amount)]++; });
  return result;
};
// 分类摘要（map用法）
const categorySummary = (list) => {
  const totals = categoryTotals(list);
  return Object.keys(totals).map(cat => `${cat}:${totals[cat]}元`);
};
// 格式化报告
const report = (list) => {
  const valid = cleanExpenses(list);
  if (valid.length === 0) {
    return '没有有效消费记录';
  }
  const dist = levelCount(valid);
  const cats = categorySummary(valid).join('、');
  return `有效记录${valid.length}笔，总支出${totalSpent(valid)}元，平均每笔${averageExpense(valid)}元，最高单笔${topExpense(valid).amount}元（${topExpense(valid).note}）；
分类小计：${cats}；
消费等级：高消费${dist['高消费']}笔 中消费${dist['中消费']}笔 低消费${dist['低消费']}笔 微量消费${dist['微量消费']}笔`;
};
try {
  console.log(report(expenses));
} catch (err) {
  console.error('报告生成失败：', err.message);
}
