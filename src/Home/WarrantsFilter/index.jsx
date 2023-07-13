import React, { useEffect, useMemo } from "react";
import { Select, Form, Button, Slider } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const WarrantsFilter = ({ data, setFilterParam }) => {
  const 正股Ops = useMemo(() => {
    return Array.from(new Set(data.map((item) => item["正股"]))).map(
      (item) => ({ value: item, key: item })
    );
  }, [data]);

  const 类型Ops = useMemo(() => {
    return Array.from(new Set(data.map((item) => item["类型"]))).map(
      (item) => ({ value: item, key: item })
    );
  }, [data]);

  const 街货比Marks = [
    {
      0: "0%",
      30: "30%",
      50: "50%",
      100: "100%",
    },
    0,
    100,
  ];

  const 单手价格Marks = useMemo(() => {
    const priceList = data.length
      ? data.map((item) => parseFloat(item["单手价格"]))
      : [0];
    const max = Math.max(...priceList, 3000);
    const min = Math.min(...priceList);
    return [
      {
        0: 0,
        // [min]: min,
        3000: 3000,
        [max]: max,
      },
      min,
      max,
    ];
  }, [data]);

  const 价内价外Marks = useMemo(() => {
    const list = data.length
      ? data.map((item) => parseFloat(item["价内/价外"]))
      : [0];
    const max = Math.max(...list, 100);
    const min = Math.min(...list, -20);
    return [
      {
        0: "0%",
        [min]: min + "%",
        [max]: max + "%",
      },
      min,
      max,
    ];
  }, [data]);

  const 溢价Marks = useMemo(() => {
    const list = data.length
      ? data.map((item) => parseFloat(item["溢价"]))
      : [0];
    const max = Math.max(...list, 20);
    const min = Math.min(...list, -100);
    return [
      {
        0: "0%",
        [min]: min + "%",
        [max]: max + "%",
      },
      min,
      max,
    ];
  }, [data]);

  const 距离交易日Marks = useMemo(() => {
    const list = data.length
      ? data.map((item) => parseFloat(item["距离交易日"]))
      : [0];
    const max = Math.max(...list, 365);
    const min = Math.min(...list, 0);
    console.log(min, max, list);

    return [
      {
        0: 0,
        30: 30,
        60: 60,
        90: 90,
        180: 180,
        365: 365,
        // [min]: min,
        [max]: max,
      },
      min,
      max,
    ];
  }, [data]);

  const [form] = Form.useForm();

  const initialValues = useMemo(() => {
    return {
      "价内/价外": [-5, 25],
      正股: ["恒指", "腾讯", "美团", "阿里", "汇丰", "中移", "港交", "平安"],
      街货比: [0, 30],
      单手价格: [0, 3000],
      距离交易日: [30, Infinity],
      溢价: [-100, 20],
    };
  }, []);

  useEffect(() => {
    setFilterParam(initialValues);
  }, [initialValues]);

  const onFinish = (values) => {
    setFilterParam(values);
  };

  const onReset = () => {
    form.resetFields();
    setTimeout(() => form.submit());
  };

  return (
    <div>
      <Form
        {...layout}
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item name="正股" label="正股">
          <Select
            allowClear
            options={正股Ops}
            mode="multiple"
            placeholder="全部"
          />
        </Form.Item>
        <Form.Item name="类型" label="类型">
          <Select
            allowClear
            options={类型Ops}
            mode="multiple"
            placeholder="全部"
          />
        </Form.Item>
        <Form.Item name="距离交易日" label="距离交易日">
          <Slider
            range
            marks={距离交易日Marks[0]}
            min={距离交易日Marks[1]}
            max={距离交易日Marks[2]}
          />
        </Form.Item>
        <Form.Item name="街货比" label="街货比">
          <Slider range marks={街货比Marks[0]} />
        </Form.Item>
        <Form.Item name="单手价格" label="单手价格">
          <Slider range marks={单手价格Marks[0]} max={单手价格Marks[2]} />
        </Form.Item>
        <Form.Item name="价内/价外" label="价内/价外">
          <Slider
            range
            marks={价内价外Marks[0]}
            min={价内价外Marks[1]}
            max={价内价外Marks[2]}
          />
        </Form.Item>
        <Form.Item name="溢价" label="溢价">
          <Slider
            range
            marks={溢价Marks[0]}
            min={溢价Marks[1]}
            max={溢价Marks[2]}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default WarrantsFilter;
