import React, { useMemo } from "react";
import { Table } from "antd";
import { columns } from "./columns";

const WarrantsTable = ({ data }) => {
  const tableData = useMemo(() => {
    if (data.length <= 1) {
      return [];
    }
    return data
      .slice(1)
      .filter((item) => !!item[0])
      .map((item) => {
        const keyArray = [
          "代码",
          "名称",
          "综合评分",
          "最新价",
          "每手",
          "换股比率",
          "涨跌幅",
          "打和点",
          "行使价",
          "成交量",
          "有效杠杆",
          "最后交易日",
          "溢价",
          "敏感度",
          "对冲值",
          "到期日",
          "上市日期",
          "引伸波幅",
          "价内/价外",
          "杠杆比率(倍)",
          "序号",
          "街货比",
          "类型",
          "成交额",
        ];
        const res = {};
        keyArray.forEach((key, index) => {
          res[key] = item[index];
        });
        // TODO big.js bignumbe
        res["单手价格"] = Math.floor(parseFloat(res["最新价"]) * parseFloat(res["每手"]));
        res["正股"] = res["名称"].substring(0, 2);
        res["股价上涨1收益"] = Math.floor(parseFloat(res["每手"]) / parseFloat(res["换股比率"]));
        res["换股价"] = (parseFloat(res["打和点"]) - parseFloat(res["行使价"])).toFixed(2);
        res["股价上涨1%收益"] =
          ((0.01 *
            parseFloat(res["打和点"]) *
            parseFloat(res["对冲值"]) *
            parseFloat(res["每手"])) /
          parseFloat(res["换股比率"])).toFixed(2);
        res["性价比"] = (
          (parseFloat(res["股价上涨1%收益"]) / parseFloat(res["单手价格"])) *
          100
        ).toFixed(2);
        return res;
      })
      .filter((item) => {
        return parseFloat(item["对冲值"]) !== 0;
      });
  }, [data]);
  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={false}
      scroll={{ x: 800, y: 500 }}
      bordered
    />
  );
};
export default WarrantsTable;
