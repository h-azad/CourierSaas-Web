import React, {useEffect} from 'react'
import { Button, Checkbox, Form, Input } from 'antd'


const GoogleKey = ({ propsData }) => {

  const [form] = Form.useForm()

  const onFinish = (values) => {

    propsData.onSubmit()

  }


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }


  useEffect(() => {
    if (propsData) {
      form.setFieldValue("google_key", propsData?.googleKey)
    }
  }, [])

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
      <Form.Item
        label="Google Key"
        name="google_key"

      >
        <Input onChange={(e) => { propsData.setGoogleKey(e.target.value) }} />
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


export default GoogleKey