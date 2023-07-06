import React, { useMemo } from "react";
import { useState } from "react";
import Papa from "papaparse"; // 解析cvs插件 市面上使用较多的
import jschardet from "jschardet"; // 编码识别
import WarrantsTable from './WarrantsTable'

const CsvReader = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [csvArray, setCsvArray] = useState([]);

  const checkEncoding = (base64Str) => {
    //这种方式得到的是一种二进制串
    const str = atob(base64Str.split(";base64,")[1]); // atob  方法 Window 对象 定义和用法 atob() 方法用于解码使用 base-64 编码的字符
    //要用二进制格式
    let encoding = jschardet.detect(str);
    encoding = encoding.encoding;
    // 有时候会识别错误
    if (encoding == "windows-1252") {
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

  const tableData = useMemo(()=> {
    if(csvArray.length<=1){
      return []
    }
    return csvArray.slice(1).map(item=> {
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
      ]
      const res = {}
      keyArray.forEach((key,index)=> {
        res[key] = item[index]
      })
      return res
    })
  },[csvArray])

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          setCsvFile(e.target.files[0]);
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          beforeUpload(csvFile);
        }}
      >
        Submit
      </button>
      <br />
      <WarrantsTable data={tableData}/>
    </div>
  );
};

export default CsvReader;
