import React, { useMemo } from "react";
import { Select, Form, Button, Slider } from "antd";
import { keyArray } from "../constant";
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

  const 街货比Marks = [{
    0: "0%",
    30: "30%",
    50: "50%",
    100: "100%",
  },0,100]

  const 单手价格Marks = useMemo(() => {
    const priceList = data.length
      ? data.map((item) => parseFloat(item["单手价格"]))
      : [0];
    console.log(priceList);
    const max = Math.max(...priceList);
    const min = Math.min(...priceList);
    return [
      {
        0: 0,
        [min]: min,
        [max]: max,
      },
      min,
      max,
    ];
  }, [data]);

  const { Option } = Select;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const [form] = Form.useForm();

  const on正股Change = (value) => {};
  const on类型Change = () => {};
  const onFinish = (values) => {
    setFilterParam(values);
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ note: "Hello world!", gender: "male" });
  };

  return (
    <div>
      <Form
        {...layout}
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="正股" label="正股">
          <Select
            onChange={on正股Change}
            allowClear
            options={正股Ops}
            mode="multiple"
          />
        </Form.Item>
        <Form.Item name="类型" label="类型">
          <Select
            onChange={on类型Change}
            allowClear
            options={类型Ops}
            mode="multiple"
          />
        </Form.Item>
        <Form.Item name="街货比" label="街货比">
          <Slider range marks={街货比Marks[0]} defaultValue={[0, 30]} />
        </Form.Item>
        <Form.Item name="单手价格" label="单手价格">
          <Slider range marks={单手价格Marks[0]} max={单手价格Marks[2]} defaultValue={[0, 3000]} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          {/* <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button> */}
        </Form.Item>
      </Form>
    </div>
  );
};
export default WarrantsFilter;
