import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Form,
  Button,
  Label,
} from "reactstrap"
import { useNavigate } from "react-router-dom"
import classnames from "classnames"
import { useForm, Controller } from "react-hook-form"
import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  COMPANY_SETTING,
} from "@src/constants/apiUrls"


import { Radio, Select, Space } from 'antd'


import { useEffect, useState } from "react"
import SwalAlert from "../../../components/SwalAlert"

import { TimePicker } from 'antd'
const { RangePicker } = TimePicker


const EditCompanySetting = () => {
  const [officeTime, setOfficeTime] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const [companyID, setCompanyID] = useState()
  const {
    control,
    watch,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
    },
  })
  useEffect(() => {
    fetchCompanySettingData()
  }, [])




  const fetchCompanySettingData = () => {
    return useJwt
      .axiosGet(getApi(COMPANY_SETTING))
      .then((res) => {
        console.log('company data', res.data)
        res.data.map((data) => {
          setValue('name', data?.name)
          setValue('email', data?.email)
          setValue('phone', data?.phone)
          setValue('google_map', data?.google_map)
          setValue('weekends', data?.weekends)
          // setValue('office_time', data?.office_time)
          setValue('address', data?.address)
          setCompanyID(data?.id)
          setIsUpdate(true)
        })

        
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const onSubmit = (data) => {

    console.log('form data', data)

    let isFormValid = true

    if (!data.name) {
      setError("name", {
        type: "required",
        message: "Recipient Name is required",
      })
      isFormValid = false
    }
    if (!data.phone) {
      setError("phone", {
        type: "required",
        message: "Phone Number is required",
      })
      isFormValid = false
    }
    if (!data.address) {
      setError("email", {
        type: "required",
        message: "Email is required",
      })
      isFormValid = false
    }
    if (!data.address) {
      setError("google_map", {
        type: "required",
        message: "Google map is required",
      })
      isFormValid = false
    }
    if (!data.address) {
      setError("weekends", {
        type: "required",
        message: "Working days is required",
      })
      isFormValid = false
    }
    if (!data.address) {
      setError("office_time", {
        type: "required",
        message: "Working time is required",
      })
      isFormValid = false
    }
    if (!data.address) {
      setError("address", {
        type: "required",
        message: "Address is required",
      })
      isFormValid = false
    }

    if (!isFormValid) {
      return false
    }

    if (
      data.name !== null &&
      data.phone !== null &&
      data.email !== null &&
      data.google_map !== null &&
      data.weekends !== null &&
      data.office_time !== null &&
      data.address !== null
    ) {
      let formData = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        google_map: data.google_map,
        weekends: data.weekends,
        office_time: officeTime,
        address: data.address
      }
      if(isUpdate===false){
        useJwt
        .axiosPost(getApi(COMPANY_SETTING), formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Setting Update Successfully")
          navigate("/")
        })
        .catch((err) => console.log(err))
      }else{

        useJwt
        .axiosPatch(getApi(COMPANY_SETTING) + companyID + "/", formData)
        .then((res) => {
          SwalAlert("Company Setting Edited Successfully")
          navigate("/")
        })
        .catch((err) => console.log(err))
    
      }
      
    }
  }

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const options = []

  weekday.forEach(myFunction)

  function myFunction(value) {
    options.push({
      value: value,
      label: value,
    })
  }

  const onChangeTime = (time, timeString) => {
    setOfficeTime(timeString)
    console.log('timeString', timeString)
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Company Setting</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>

          <div class="row">
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="name">
                  Company Name *
                </Label>
                <Controller
                  control={control}
                  id="name"
                  name="name"
                  render={({ field }) => (
                    <Input
                      placeholder=""
                      invalid={errors.name && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.name && (
                  <span>{errors.name.message}</span>
                )}
              </div>
            </div>
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="phone">
                  Phone Number*
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="phone"
                  name="phone"
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder=""
                      invalid={errors.phone && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.phone && (
                  <span>{errors.phone.message}</span>
                )}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="email">
                  Email *
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="email"
                  name="email"
                  render={({ field }) => (
                    <Input
                      placeholder=""
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.email && (
                  <span>{errors.email.message}</span>
                )}
              </div>
            </div>
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="google_map">
                  Google Map Link*
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="google_map"
                  name="google_map"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder=""
                      invalid={errors.google_map && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.google_map && (
                  <span>{errors.google_map.message}</span>
                )}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="weekends">
                  Weekend Days *
                </Label>

                <Controller
                  name="weekends"
                  control={control}
                  render={({ field }) => (
                    <Select
                      name="weekends"
                      mode="multiple"
                      // size={size}
                      {...field}
                      placeholder="Please select"
                      style={{
                        width: '100%',
                      }}
                      options={options}
                    />

                  )}
                />


                {errors && errors.weekends && (
                  <span>{errors.weekends.message}</span>
                )}
              </div>
            </div>
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="office_time">
                  Office Time *
                </Label>

                <Controller
                  name="office_time"
                  control={control}
                  render={({ field }) => (
                    <RangePicker {...field} use12Hours format="h:mm A" name="office_time" onChange={onChangeTime} />
                  )}
                />


                {errors && errors.office_time && (
                  <span>{errors.office_time.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className="mb-1">
            <Label className="form-label" for="address">
              Address*
            </Label>
            <Controller
              defaultValue=""
              control={control}
              id="address"
              name="address"
              render={({ field }) => (
                <Input
                  placeholder=""
                  invalid={errors.address && true}
                  {...field}
                />
              )}
            />
            {errors && errors.address && (
              <span>{errors.address.message}</span>
            )}
          </div>
          <div className="d-flex">
            <Button className="me-1" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}
export default EditCompanySetting
