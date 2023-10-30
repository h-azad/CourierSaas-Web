import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'

import useJwt from '@src/auth/jwt/useJwt'
import { getApi, APPLICATION_SETTING } from '@src/constants/apiUrls'
import SwalAlert from '@src/components/SwalAlert'





const HostEmailSetting = ({ emailHostProps }) => {
  const [form] = Form.useForm()

  const onFinish = (values) => {

    let formData = new FormData()
    formData.append('email_host', values.email_host)
    formData.append('email_host_user', values.email_host_user)
    formData.append('email_host_password', values.email_host_password)
    formData.append('email_port', values.email_port)

    return useJwt
      .axiosPost(getApi(APPLICATION_SETTING), formData)
      .then((res) => {
        SwalAlert("Application Create Successfully")
      })
      .catch(err => console.log(err))
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    if (emailHostProps) {

      form.setFieldValue("email_host", emailHostProps?.emailHost)
      form.setFieldValue("email_host_user", emailHostProps?.emailHostUser)
      form.setFieldValue("email_host_password", emailHostProps?.emailHostPassword)
      form.setFieldValue("email_port", emailHostProps?.emailPort)

    }
  }, [emailHostProps])

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
        rules={[
          {
            type: 'email'
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email Host User"
        name="email_host_user"
      // rules={[
      //   {
      //     required: true,
      //     message: 'Please input your email host user!',
      //   },
      // ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email Host Password"
        name="email_host_password"
      // rules={[
      //   {
      //     required: true,
      //     message: 'Please input your email host password!',
      //   },
      // ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email port"
        name="email_port"
      // rules={[
      //   {
      //     required: true,
      //     message: 'Please input your email port!',
      //   },
      // ]}
      >
        <Input />
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