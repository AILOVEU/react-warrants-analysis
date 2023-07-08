export const columns = [
  "代码",
  "正股",
  "正股价",
  "类型",
  "名称",
  "最新价",
  // "每手",
  // "换股比率",
  "涨跌幅",
  "打和点",
  "行使价",
  // "成交量",
  "有效杠杆",
  "最后交易日",
  "溢价",
  // "敏感度",
  "对冲值",
  "到期日",
  // "上市日期",
  "引伸波幅",
  "价内/价外",
  // "杠杆比率(倍)",
  // "序号",
  "街货比",
  "成交额",
  "单手价格",
  "股价上涨1收益",
  "换股价",
  "股价上涨1%收益",
  "综合评分",
  "性价比",
].map((item) => {
  const baseCfg = {
    title: item,
    dataIndex: item,
    key: item,
    width: 120,
    // sorter: (a, b) => parseFloat(a[item]) - parseFloat(b[item]),
    // onFilter: (value, record) => record[item].includes(value),
  }
  let extraCfg = {}
  switch(item){
    case '名称':
      extraCfg =  {
        width: 200
      }
      break
    case '性价比':
      extraCfg =  {
        sorter: (a, b) => parseFloat(a[item]) - parseFloat(b[item]),
      }
      break
  }
  return {
    ...baseCfg,
    ...extraCfg
  }
});
