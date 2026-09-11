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
