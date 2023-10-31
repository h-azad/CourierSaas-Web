import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Select } from 'antd'


const RiderAutoAssign = ({ propsData }) => {

  const [form] = Form.useForm()

  const onFinish = (values) => {

    propsData.onSubmit()

  }


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }



  return (
    <Form
      form={form}
      name="Google Key Setting"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="Automatic Picked Order Assing To Rider" name="picked_auto_assign">
        <Select defaultValue={propsData?.pickupAutoAssingToRider} onChange={(e) => { propsData.SetPickupAutoAssingToRider(e) }} placeholder="select your Rider Auto Assign">
          <Option value={true}>Active</Option>
          <Option value={false}>InActive</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Automatic Delivery Order Assing To Rider" name="delivery_auto_assign">
        <Select defaultValue={propsData?.deliveryAutoAssingToRider} onChange={(e) => { propsData.SetDeliveryAutoAssingToRider(e) }} placeholder="select your Rider Auto Assign">
          <Option value={true}>Active</Option>
          <Option value={false}>InActive</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )

}


export default RiderAutoAssign