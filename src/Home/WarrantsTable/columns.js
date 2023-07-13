export const columns = [
  "代码",
  "名称",
  "正股",
  "正股价",
  "类型",
  "最新价",
  // "每手",
  // "换股比率",
  "涨跌幅",
  "打和点",
  "行使价",
  // "成交量",
  "有效杠杆",
  "最后交易日",
  "距离交易日",
  "溢价",
  // "敏感度",
  "对冲值",
  // "到期日",
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
  };
  let extraCfg = {};
  if (item === "名称") {
    extraCfg = {
      fixed: true,
      width: 200,
    };
  } else if (["性价比", "价内/价外", "距离交易日","溢价"].includes(item)) {
    extraCfg = {
      sorter: (a, b) => parseFloat(a[item]) - parseFloat(b[item]),
    };
    if ("性价比" === item) {
      extraCfg = {
        ...extraCfg,
        defaultSortOrder: 'descend',
      };
    }
  } else if (["股价上涨1收益", "股价上涨1%收益"].includes(item)) {
    extraCfg = {
      width: 150,
    };
  }
  return {
    ...baseCfg,
    ...extraCfg,
  };
});
