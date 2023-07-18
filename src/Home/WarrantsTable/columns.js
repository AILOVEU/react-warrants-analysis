export const columns = [
  "代码",
  "名称",
  "性价比",
  // "综合评分",
  "单手价格",
  // "股价变动1收益",
  "股价变动1%收益",

  "溢价",
  "价内/价外",
  "距离交易日",
  "行使价",
  "打和点",

  "正股价",
  "换股价",
  "对冲值",



  "街货比",
  "成交额",
  "有效杠杆",


  
  "最新价",
  // "每手",
  // "换股比率",
  "涨跌幅",
  // "成交量",
  "最后交易日",
  // "敏感度",
  // "到期日",
  // "上市日期",
  "引伸波幅",
  // "杠杆比率(倍)",
  // "序号",
  "正股",
  "类型",

 
].map((item) => {
  const baseCfg = {
    title: item,
    dataIndex: item,
    key: item,
    width: 120,
    // sorter: (a, b) => parseFloat(a[item]) - parseFloat(b[item]),
    // onFilter: (value, record) => record[item].includes(value),
  };
  let extraCfg = {};
  if (item === "名称") {
    extraCfg = {
      fixed: true,
      width: 200,
    };
  } else if (["性价比", "价内/价外", "距离交易日","溢价",'对冲值'].includes(item)) {
    extraCfg = {
      sorter: (a, b) => parseFloat(a[item]) - parseFloat(b[item]),
    };
    if ("性价比" === item) {
      extraCfg = {
        ...extraCfg,
        defaultSortOrder: 'descend',
      };
    }
  } else if (["股价变动1收益", "股价变动1%收益"].includes(item)) {
    extraCfg = {
      width: 150,
    };
  }
  return {
    ...baseCfg,
    ...extraCfg,
  };
});
