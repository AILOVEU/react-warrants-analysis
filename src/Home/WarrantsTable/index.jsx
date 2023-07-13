import React, { useMemo } from "react";
import { Table } from "antd";
import { columns } from "./columns";

const WarrantsTable = ({ data, filterParam }) => {
  const tableData = useMemo(() => {
    return data.filter((item) => {
      let flag = true;
      if (
        filterParam["正股"] &&
        filterParam["正股"].length &&
        !filterParam["正股"].includes(item["正股"])
      ) {
        flag = false;
      }
      if (
        filterParam["类型"] &&
        filterParam["类型"].length &&
        !filterParam["类型"].includes(item["类型"])
      ) {
        flag = false;
      }
      const getOutRange = (name) => {
        const [min, max] = filterParam[name];
        const val = parseFloat(item[name]);
        return val > max || val < min;
      };
      if (filterParam["街货比"] && getOutRange("街货比")) {
        flag = false;
      }
      if (filterParam["单手价格"] && getOutRange("单手价格")) {
        flag = false;
      }
      if (filterParam["价内/价外"] && getOutRange("价内/价外")) {
        flag = false;
      }
      if (filterParam["距离交易日"] && getOutRange("距离交易日")) {
        flag = false;
      }
      if (filterParam["溢价"] && getOutRange("溢价")) {
        flag = false;
      }
      return flag;
    });
  }, [data, filterParam]);
  return (
    <Table
      columns={columns}
      dataSource={tableData}
      // pagination={false}
      pagination={{
        pageSize: 100,
      }}
      scroll={{ x: 800, y: 500 }}
      bordered
    />
  );
};
export default WarrantsTable;
