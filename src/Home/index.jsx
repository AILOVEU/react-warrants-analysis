import React, { useMemo } from "react";
import { useState } from "react";
import Papa from "papaparse"; // 解析cvs插件 市面上使用较多的
import jschardet from "jschardet"; // 编码识别
import WarrantsTable from "./WarrantsTable";
import { Upload, Button } from "antd";
import WarrantsFilter from "./WarrantsFilter";
import { keyArray } from "./constant";

const CsvReader = () => {
  const [csvArray, setCsvArray] = useState([]);
  const [filterParam, setFilterParam] = useState({});

  const checkEncoding = (base64Str) => {
    //这种方式得到的是一种二进制串
    const str = atob(base64Str.split(";base64,")[1]); // atob  方法 Window 对象 定义和用法 atob() 方法用于解码使用 base-64 编码的字符
    //要用二进制格式
    let encoding = jschardet.detect(str);
    encoding = encoding.encoding;
    // 有时候会识别错误
    if (encoding === "windows-1252") {
      encoding = "ANSI";
    }
    return encoding;
  };
  const beforeUpload = (file) => {
    const fReader = new FileReader();
    fReader.readAsDataURL(file); //  readAsDataURL 读取本地文件 得到的是一个base64值
    fReader.onload = function (evt) {
      // 读取文件成功
      const data = evt.target.result;
      const encoding = checkEncoding(data);
      //papaparse.js 用来解析转换成二维数组
      Papa.parse(file, {
        encoding: encoding,
        complete: function (results) {
          // UTF8 \r\n与\n混用时有可能会出问题
          const res = results.data;
          if (res[res.length - 1] === "") {
            //去除最后的空行 有些解析数据尾部会多出空格
            res.pop();
          }
          // 当前res 就是二维数组的值 数据拿到了 那么在前端如何处理渲染 就根据需求再做进一步操作了
          setCsvArray(res);
        },
      });
    };
    return false;
  };

  // csv筛选有效数据行，并转成map格式，且已计算拓展值
  const validMapData = useMemo(() => {
    if (csvArray.length <= 1) {
      return [];
    }
    return csvArray
      .slice(1)
      .filter((item) => !!item[0])
      .map((item) => {
        const res = {};
        keyArray.forEach((key, index) => {
          res[key] = item[index];
        });
        return res;
      })
      .map((item) => {
        const res = { ...item };
        // TODO big.js bignumbe
        // TODO 以下计算仅支持认购证
        res["单手价格"] = Math.floor(
          parseFloat(res["最新价"]) * parseFloat(res["每手"])
        );
        res["正股"] = res["名称"].substring(0, 2);
        res["股价上涨1收益"] = Math.floor(
          parseFloat(res["每手"]) / parseFloat(res["换股比率"])
        );
        res["换股价"] = (
          parseFloat(res["打和点"]) - parseFloat(res["行使价"])
        ).toFixed(2);
        res["正股价"] = (
          (100 * parseFloat(res["打和点"])) /
          (100 + parseFloat(res["溢价"]))
        ).toFixed(2);
        res["股价上涨1%收益"] = (
          (0.01 *
            parseFloat(res["正股价"]) *
            parseFloat(res["对冲值"]) *
            parseFloat(res["每手"])) /
          parseFloat(res["换股比率"])
        ).toFixed(2);
        res["性价比"] = (
          (parseFloat(res["股价上涨1%收益"]) / parseFloat(res["单手价格"])) *
          100
        ).toFixed(2);
        return res;
      });
  }, [csvArray]);

  return (
    <div>
      <Upload
        beforeUpload={beforeUpload}
        maxCount={1}
        accept={".csv"}
        // showUploadList={false}
      >
        <Button>点击上传csv</Button>
      </Upload>
      <br />
      <WarrantsFilter data={validMapData} setFilterParam={setFilterParam} />
      <br />
      <div>
        <WarrantsTable data={validMapData} filterParam={filterParam} />
      </div>
    </div>
  );
};

export default CsvReader;
