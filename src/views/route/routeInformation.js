import React, { useEffect } from 'react'
import { Button } from "reactstrap"
import { Form, Input, TimePicker, Col, Row } from 'antd'
import { useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import { googleKey } from "@src/configs/google_key"
import dayjs from 'dayjs'
import moment from 'moment/moment'
const format = 'H:mm'

const containerStyle = {
  width: '100%',
  height: '400px'
}


export default function RouteInformation({ routeInformationData }) {
  const [map, setMap] = useState(null)
  const [form] = Form.useForm()
  const [value, setValue] = useState(null)


  const onFinish = (data) => {
    const formattedEventDate = dayjs(data?.start_time).format(format)
    routeInformationData?.setStartTime(formattedEventDate)
    routeInformationData?.setTitle(data.route_title)
    // routeInformationData?.setStartLocation(value.label)
    routeInformationData?.setCoordinate(JSON.stringify(map))
    routeInformationData?.next()
  }

  useEffect(() => {
    if (value) {

      routeInformationData?.setStartLocation(value?.label)

      geocodeByAddress(value.label)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log('Successfully got latitude and longitude', { lat, lng })
          setMap({ lat, lng })
        })
    }
  }, [value])

  useEffect(() => {
    // if (routeInformationData?.startTime != null) {
    //   form.setFieldValue("start_time", dayjs(routeInformationData?.startTime).format(format) )
    // }
    form.setFieldValue("route_title", routeInformationData?.title)


  }, [])


  return (

    <Row>
      <Col span={24}>
        <Form form={form} name="basic"
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

            label="Start Time"
            name="start_time"
            rules={[
              {
                required: true,
                message: 'Please input your Start Time!',
              },
            ]}
          >
            <TimePicker style={{ width: '100%' }} use12Hours format={format} />
          </Form.Item>


          <Form.Item
            label="Route Title"
            name="route_title"
            rules={[
              {
                required: true,
                message: 'Please input your Route Title',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Row>
            <Col span={12}>
              <Form.Item
                label="Start Location"
                name="route_title"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Route Title',
                  },
                ]}
              >
                <GooglePlacesAutocomplete
                  // apiKey='AIzaSyA_bi6febAzWK5EPN8cWv986ATCRxhK-ac'
                  apiKey={googleKey()}
                  selectProps={{
                    value,
                    onChange: setValue,
                    isClearable: true,
                    placeholder: "Mirpur DOHS, Dhaka, Bangladesh",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div>
                {map && (
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={map}
                    zoom={15}
                    
                  >
                    <Marker
                      position={map}
                      animation="bounce"
                    />
                  </GoogleMap>
                )}
              </div>

            </Col>
          </Row>
          <Row>
            <Col>
              <Button className='me-1' color='primary' type='submit'>
                Next
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>

  )
}