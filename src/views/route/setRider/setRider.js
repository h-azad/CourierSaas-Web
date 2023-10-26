// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  // Form,
  Button,
  Label,
} from "reactstrap"
import { useNavigate } from "react-router-dom"
// import Select from "react-select"
import toast from 'react-hot-toast'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, RIDER_ROUTE, ROUTE_FORM_LIST, RIDER_LIST } from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import SwalAlert from "@src/components/SwalAlert"

import { Select, Form } from 'antd'

const SetRiderInRoute = () => {
  const [form] = Form.useForm()

  const [selectRoute, setSelectRoute] = useState([])
  const [selectRider, setSelectRider] = useState([])


  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()


  const fetchRouteData = () => {
    return useJwt
      .axiosGet(getApi(ROUTE_FORM_LIST))
      .then((res) => {
        let routeData = []
        res.data.map(data => {
          routeData.push({ value: data.id, label: data.title })
        })
        setSelectRoute(routeData)
      })
      .catch(err => console.log(err))
  }



  const fetchRiderData = () => {
    return useJwt
      .axiosGet(getApi(RIDER_LIST))
      .then((res) => {
        console.log(res)
        let riderData = []
        res.data?.data.map((data) => {
          riderData.push({ value: data.id, label: data.full_name })
        })
        setSelectRider(riderData)
      })
      .catch((err) => console.log(err))
  }


  const onSubmit = data => {

    if (data.route !== null && data.rider !== null) {

      let formData = {
        route: data.route.value,
        rider: data.rider.value,
      }

      useJwt
        .axiosPost(getApi(RIDER_ROUTE), formData)
        .then((res) => {
          SwalAlert("Rider Set Route Successfully")
          toast.success('Rider Set Route Successfully')
          navigate("/route/rider-route")
        })
        .catch(err => toast.error(`Rider Set Route ${err?.response?.data?.non_field_errors[0]}`))
    }
  }

  const handleChange = (value) => {
    // fetchAreaData(value)
    

    useJwt
      .axiosGet(getApi(RIDER_ROUTE)+ `?route=${value}`)
      .then((res) => {
        console.log('response rider route', res)
        // SwalAlert("Rider Set Route Successfully")
        // toast.success('Rider Set Route Successfully')
        // navigate("/route/rider-route")
      })
      .catch(err => toast.error(`Rider Set Route ${err?.response?.data?.non_field_errors[0]}`))

  }

  const onFinish = (data) => {
    let formData = {
      route: data.route,
      rider: data.rider,
    }
    useJwt
      .axiosPost(getApi(RIDER_ROUTE), formData)
      .then((res) => {
        SwalAlert("Rider Set Route Successfully")
        toast.success('Rider Set Route Successfully')
        navigate("/route/rider-route")
      })
      .catch(err => toast.error(`Rider Set Route ${err?.response?.data?.non_field_errors[0]}`))

    // routeAreaData?.setCity(data.city)
    // routeAreaData?.setArea(data.area)
    // routeAreaData?.next()
  }

  useEffect(() => {
    fetchRouteData()
    fetchRiderData()
  }, [])

  return (
    // <Card>
    //   <CardHeader>
    //     <CardTitle tag="h4">Set Rider</CardTitle>
    //   </CardHeader>

    //   <CardBody>
    //     <Form onSubmit={handleSubmit(onSubmit)}>
    //       <div className='mb-1'>
    //         <Label className='form-label' for='route'>
    //           Routes
    //         </Label>
    //         <Controller
    //           id="route"
    //           name="route"
    //           control={control}
    //           render={({ field }) => <Select
    //             isClearable
    //             required={true}
    //             // className={classnames('react-select', { 'is-invalid': data !== null && data.route === null })}
    //             classNamePrefix='select'
    //             options={selectRoute}
    //             {...field}
    //           />}
    //         />
    //       </div>

    //       <div className='mb-1'>
    //         <Label className='form-label' for='rider'>
    //           Riders
    //         </Label>
    //         <Controller
    //           id="rider"
    //           name="rider"
    //           control={control}
    //           render={({ field }) => <Select
    //             isClearable
    //             required={true}
    //             // className={classnames('react-select', { 'is-invalid': data !== null && data.rider === null })}
    //             classNamePrefix='select'
    //             options={selectRider}
    //             {...field}
    //           />}
    //         />
    //       </div>

    //       <div className='d-flex'>
    //         <Button className='me-1' color='primary' type='submit'>
    //           Submit
    //         </Button>
    //       </div>
    //     </Form>
    //   </CardBody>
    // </Card>

    <Card>
      <CardHeader>
        <CardTitle tag="h4">Set Route Rider</CardTitle>
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
            label="Route"
            name="route"
            rules={[
              {
                required: true,
                message: 'Please Select Route!',
              },
            ]}
          >

            <Select
              allowClear
              style={{
                width: '100%',
              }}
              placeholder="Please select Route"
              onChange={handleChange}
              options={selectRoute}
            />
          </Form.Item>


          <Form.Item
            label="SelectRider"
            name="rider"
            rules={[
              {
                required: true,
                message: 'Please Select Rider!',
              },
            ]}
          >

            <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
              placeholder="Please select Rider"
              // onChange={handleChange}

              options={selectRider}
            />
          </Form.Item>

          <div className='d-flex'>
            <Button className='me-1' color='primary' type='submit'>
              Submit
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}
export default SetRiderInRoute
