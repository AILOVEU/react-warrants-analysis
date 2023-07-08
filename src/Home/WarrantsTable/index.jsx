import React, { useMemo } from "react";
import { Table } from "antd";
import { columns } from "./columns";
import { keyArray } from "../constant";

const WarrantsTable = ({ data, filterParam }) => {
  const tableData = useMemo(() => {
    return data
      .filter((item) => {
        return parseFloat(item["对冲值"]) !== 0;
      })
      .filter((item) => {
        let flag = true;
        console.log(
          filterParam["正股"],
          !filterParam["正股"]?.includes(item["正股"])
        );
        if (
          filterParam["正股"] &&
          !filterParam["正股"].includes(item["正股"])
        ) {
          flag = false;
        }
        if (
          filterParam["类型"] &&
          !filterParam["类型"].includes(item["类型"])
        ) {
          flag = false;
        }
        if (filterParam["街货比"]) {
          const [min, max] = filterParam["街货比"];
          const val = parseFloat(item["街货比"]);
          if (val > max || val < min) flag = false;
        }
        if (filterParam["单手价格"]) {
          const [min, max] = filterParam["单手价格"];
          const val = parseFloat(item["单手价格"]);
          if (val > max || val < min) flag = false;
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
