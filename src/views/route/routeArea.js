// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
} from "reactstrap"

import useJwt from '@src/auth/jwt/useJwt'
import { getApi, CITY_FORM_LIST, AREAS_BY_CITY } from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import { Select, Form } from 'antd'


const RouteArea = ({ routeAreaData }) => {
  const [form] = Form.useForm()
  // const [selectCity, setSelectCity] = useState([])
  // const [selectArea, setSelectArea] = useState([])


  const fetchCityData = () => {
    return useJwt
      .axiosGet(getApi(CITY_FORM_LIST))
      .then((res) => {

        let cityData = []

        res.data.map(data => {
          cityData.push({ value: data.id, label: data.city_name })
        })

        routeAreaData?.setSelectCity(cityData)
      })
      .catch(err => console.log(err))
  }



  const fetchAreaData = (cityId) => {

    return useJwt
      .axiosGet(getApi(AREAS_BY_CITY) + cityId + '/')
      .then((res) => {
        let areaData = []
        res.data.map(data => {
          areaData.push({ value: data.id, label: data.area_name })
        })

        routeAreaData?.setSelectArea(areaData)
        return res.data
      })
      .catch(err => console.log(err))
  }


  const onFinish = (data) => {
    routeAreaData?.setCity(data.city)
    routeAreaData?.setArea(data.area)
    routeAreaData?.next()
  }


  useEffect(() => {
    form.setFieldValue("city", routeAreaData?.city)
    form.setFieldValue("area", routeAreaData?.area)
  }, [])



  const handleChange = (value) => {
    fetchAreaData(value)
  }


  useEffect(() => {
    fetchCityData()

  }, [])


  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Set Route Areas</CardTitle>
      </CardHeader>

      <CardBody>
        <Form
          form={form}
          name="basic"
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
            label="City"
            name="city"
            rules={[
              {
                required: true,
                message: 'Please Select City!',
              },
            ]}
          >

            <Select
              allowClear
              style={{
                width: '100%',
              }}
              placeholder="Please select city"
              onChange={handleChange}
              options={routeAreaData?.selectCity}
            />
          </Form.Item>


          <Form.Item
            label="Area"
            name="area"
            rules={[
              {
                required: true,
                message: 'Please Select Area!',
              },
            ]}
          >

            <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
              placeholder="Please select city"
              // onChange={handleChange}

              options={routeAreaData?.selectArea}
            />
          </Form.Item>

          <div className='d-flex'>
            <Button className='me-1' onClick={routeAreaData?.prev}>
              Prev
            </Button>
            <Button className='me-1' color='primary' type='submit'>
              Next
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}
export default RouteArea
