import React, {useEffect} from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, APPLICATION_SETTING } from '@src/constants/apiUrls'
import SwalAlert from '@src/components/SwalAlert'



const GoogleKey = ({ googleKeyProps }) => {

  const [form] = Form.useForm()

  const onFinish = (values) => {

    let formData = new FormData()
    formData.append('google_key', values.google_key)

    return useJwt
      .axiosPost(getApi(APPLICATION_SETTING), formData)
      .then((res) => {
        // navigate("/")
        SwalAlert("Application Create Successfully")
      })
      .catch(err => console.log(err))
  }


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }


  useEffect(() => {
    if (googleKeyProps) {
      form.setFieldValue("google_key", googleKeyProps?.appID)
    }
  }, [googleKeyProps])

  return (
    <Form
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
      // rules={[
      //   {
      //     required: true,
      //     message: 'Please input your google key!',
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


export default GoogleKey