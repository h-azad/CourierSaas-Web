import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input, TimePicker, Select } from 'antd'

const { RangePicker } = TimePicker

const CompanySetting = ({ propsData }) => {
  const [form] = Form.useForm()

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const options = []

  weekday.forEach(myFunction)

  function myFunction(value) {
    options.push({
      value: value,
      label: value,
    })
  }

  const onFinish = (values) => {
    propsData.onSubmit()
  }



  useEffect(() => {
    if (propsData) {

      form.setFieldValue("name", propsData?.name)
      form.setFieldValue("phone", propsData?.phone)
      form.setFieldValue("email", propsData?.email)
      form.setFieldValue("google_map", propsData?.googleMap)
      form.setFieldValue("weekends", propsData?.weekends)
      form.setFieldValue("office_time", propsData?.officeTime)
      form.setFieldValue("address", propsData?.address)

    }
  }, [propsData])

  return (
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
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Company Name"
        name="name"
        rules={[
          {
            required: true
          },
        ]}
      >
        <Input onChange={(e) => { propsData.setName(e.target.value) }} />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            required: true
          },
        ]}
      >
        <Input onChange={(e) => { propsData.setPhone(e.target.value) }} />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: 'email',
            required: true
          },
        ]}
      >
        <Input onChange={(e) => { propsData.setEmail(e.target.value) }} />
      </Form.Item>

      <Form.Item
        label="Google MAP Link"
        name="google_map"
        rules={[
          {
            required: true
          },
        ]}
      >
        <Input onChange={(e) => { propsData.setGoogleMap(e.target.value) }} />
      </Form.Item>

      <Form.Item
        label="Weekends"
        name="weekends"
        rules={[
          {
            required: true
          },
        ]}
      >
        <Select
          mode="multiple"
          // size={size}
          placeholder="Please select"
          // defaultValue={['a10', 'c12']}
          // onChange={handleChange}
          style={{
            width: '100%',
          }}
          options={options}
          
        />

      </Form.Item>

      <Form.Item
        label="Office Time"
        name="office_time"
        // rules={[
        //   {
        //     required: true,
        //   },
        // ]}
      >
        {/* <Input onChange={(e) => { propsData.SetEmailPort(e.target.value) }} /> */}
        <RangePicker use12Hours />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: true
          },
        ]}
      >
        <Input onChange={(e) => { propsData.setAddress(e.target.value) }} />
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
export default CompanySetting