import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'



const HostEmailSetting = ({ propsData }) => {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    propsData.onSubmit()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    if (propsData) {

      form.setFieldValue("email_host", propsData?.emailHost)
      form.setFieldValue("email_host_user", propsData?.emailHostUser)
      form.setFieldValue("email_host_password", propsData?.emailHostPassword)
      form.setFieldValue("email_port", propsData?.emailPort)

    }
  }, [propsData])

  return(
    <Form
      name="Host Email Setting"
      form={form}
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
        label="Email Host"
        name="email_host"
        // rules={[
        //   {
        //     type: 'email'
        //   },
        // ]}
      >
        <Input onChange={(e) => { propsData.setEmailHost(e.target.value) }} />
      </Form.Item>

      <Form.Item
        label="Email Host User"
        name="email_host_user"
      >
        <Input onChange={(e) => { propsData.setEmailHostUser(e.target.value) }}  />
      </Form.Item>

      <Form.Item
        label="Email Host Password"
        name="email_host_password"

      >
        <Input onChange={(e) => { propsData.setEmailHostPassword(e.target.value) }} />
      </Form.Item>

      <Form.Item
        label="Email port"
        name="email_port"

      >
        <Input onChange={(e) => { propsData.SetEmailPort(e.target.value) }} />
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
export default HostEmailSetting