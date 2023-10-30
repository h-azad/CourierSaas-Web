import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input, Select } from 'antd'

import useJwt from '@src/auth/jwt/useJwt'
import { getApi, APPLICATION_SETTING } from '@src/constants/apiUrls'
import SwalAlert from '@src/components/SwalAlert'


const PusherSetting = ({ pusherProps }) => {

  const [form] = Form.useForm()

  const onFinish = (values) => {

    let formData = new FormData()
    formData.append('app_id', values.app_id)
    formData.append('key', values.key)
    formData.append('secret', values.secret)
    formData.append('cluster', values.cluster)
    formData.append('ssl', values.ssl)

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
    if (pusherProps) {

      form.setFieldValue("app_id", pusherProps?.appID)
      form.setFieldValue("key", pusherProps?.key)
      form.setFieldValue("secret", pusherProps?.secret)
      form.setFieldValue("cluster", pusherProps?.cluster)
      form.setFieldValue("ssl", pusherProps?.ssl)

    }
  }, [pusherProps])

  return(
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
      // rules={[
      //   {
      //     required: true,
      //     message: 'Please input your app id!',
      //   },
      // ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Key"
        name="key"
      // rules={[
      //   {
      //     required: true,
      //     message: 'Please input your key!',
      //   },
      // ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Secret"
        name="secret"
      // rules={[
      //   {
      //     required: true,
      //     message: 'Please input your secret!',
      //   },
      // ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Cluster"
        name="cluster"
      // rules={[
      //   {
      //     required: true,
      //     message: 'Please input your cluster!',
      //   },
      // ]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        label="SSL"
        name="ssl"
      // rules={[
      //   {
      //     required: true,
      //     message: 'Please input your ssl!',
      //   },
      // ]}
      >
        <Input />
      </Form.Item> */}

      <Form.Item label="SSL" name="ssl">
        <Select placeholder="select your SSL">
          <Option value="True">Active</Option>
          <Option value="False">InActive</Option>
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