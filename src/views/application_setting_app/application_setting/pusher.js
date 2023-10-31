import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input, Select } from 'antd'


const PusherSetting = ({ propsData }) => {

  const [form] = Form.useForm()

  const onFinish = (values) => {
    propsData.onSubmit()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }


  useEffect(() => {
    if (propsData) {
      console.log('propsData?.ssl', propsData?.ssl)
      form.setFieldValue("app_id", propsData?.appID)
      form.setFieldValue("key", propsData?.key)
      form.setFieldValue("secret", propsData?.secret)
      form.setFieldValue("cluster", propsData?.cluster)
      // form.setFieldValue("ssl", propsData?.ssl)

    }
  }, [])

  return (
    <Form
      form={form}
      name="Pusher Setting"
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
      <Form.Item
        label="App ID"
        name="app_id"
      >
        <Input onChange={(e) => { propsData.setAppID(e.target.value) }} />
      </Form.Item>

      <Form.Item
        label="Key"
        name="key"
      >
        <Input onChange={(e) => { propsData.setKey(e.target.value) }} />
      </Form.Item>

      <Form.Item
        label="Secret"
        name="secret"
      >
        <Input onChange={(e) => { propsData.setSecret(e.target.value) }} />
      </Form.Item>

      <Form.Item
        label="Cluster"
        name="cluster"
      >
        <Input onChange={(e) => { propsData.setCluster(e.target.value) }} />
      </Form.Item>

      <Form.Item label="SSL" name="ssl">
        <Select defaultValue={propsData?.ssl} onChange={(e) => { propsData.setSSL(e) }} placeholder="select your SSL">
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
export default PusherSetting