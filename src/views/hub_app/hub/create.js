import React from "react"
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
import Select from "react-select"
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, HUB, CITY_FORM_LIST, AREAS_BY_CITY } from '@src/constants/apiUrls'
import SwalAlert from "@src/components/SwalAlert"
import { useEffect, useState } from "react"
import toast from 'react-hot-toast'
import TextArea from "antd/es/input/TextArea"


const AddHub = () => {
  const [selectboxCity, setSelectboxCity] = useState([])
  const [selectboxArea, setSelectboxArea] = useState([])
  const [responseError, setResponseError] = useState()

  const navigate = useNavigate()
  const {
    reset,
    resetField,
    watch,
    control,
    setError,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name == 'city' && type == 'change') {
        resetField('area')
        fetchAreaData(value.city.value)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    fetchCityData()
  }, [])

  const fetchCityData = () => {
    return useJwt
      .axiosGet(getApi(CITY_FORM_LIST) + '?request-location=form')
      .then((res) => {
        let cityData = []

        res.data.map(data => {
          cityData.push({ value: data.id, label: data.city_name })
        })

        setSelectboxCity(cityData)
        return res.data
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

        setSelectboxArea(areaData)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const onSubmit = data => {
    let isFormValid = true

    console.log('data', data)

    if (!data.name && data.name.value) {
      setError('name', { type: 'required', message: 'Name is required' })
      isFormValid = false
    }

    if (!data.city && data.city.value) {
      setError('city', { type: 'required', message: 'City is required' })
      isFormValid = false
    }
    if (!data.area && data.area.value) {
      setError('area', { type: 'required', message: ' Area is required' })
      isFormValid = false
    }
    if (!isFormValid) {
      return false
    }

    if (data.name !== null && data.city.value !== null && data.area.value !== null) {

      let formData = {
        name: data.name,
        city: data.city.value,
        area: data.area.value,
        address: data.address,
      }

      useJwt
        .axiosPost(getApi(`${HUB}/`), formData)
        .then((res) => {
          SwalAlert("Hub Added Successfully")
          toast.success("Hub Added Successfully")
          navigate("/hub")
        })
        .catch(err => {
          console.log('err?.response?.data?.message', err?.message)
          toast.error(err?.message)
          setResponseError(err?.message)
        })
    }
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Hub</CardTitle>
      </CardHeader>

      <CardBody>
        {responseError && <h3 style={{ color: 'red' }}>{responseError}</h3>}

        <Form onSubmit={handleSubmit(onSubmit)}>
          


          <div class="row">
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='name'>
                  Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='name'
                  name='name'
                  render={({ field }) => <Input required={true} placeholder='Mirpur DOHS...' invalid={errors.name && true} {...field} />}
                />
                {errors && errors.name && <span className="invalid-feedback">{errors.name.message}</span>}
              </div>
            </div>
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='address'>
                  Address
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='address'
                  name='address'
                  render={({ field }) => <TextArea required={true} placeholder='House 1140, Block D, Road 8 ...' invalid={errors.address && true} {...field} />}
                />
                {errors && errors.address && <span className="invalid-feedback">{errors.address.message}</span>}
              </div>
            </div>

          </div>



          <div class="row">
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='city'>
                  City Name
                </Label>
                <Controller
                  id="city"
                  name="city"
                  control={control}
                  render={({ field }) => <Select
                    isClearable
                    required={true}
                    className={classnames('react-select', { 'is-invalid': errors.city && true })}
                    classNamePrefix='select'
                    options={selectboxCity}
                    {...field}
                  />}
                />
                {errors && errors.city && <span className="invalid-feedback">{errors.city.message}</span>}

              </div>
            </div>
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='area'>
                  Area Name
                </Label>
                <Controller
                  id="area"
                  name="area"
                  control={control}
                  render={({ field }) => <Select
                    required={true}
                    isClearable
                    className={classnames('react-select', { 'is-invalid': errors.area && true })}
                    classNamePrefix='select'
                    options={selectboxArea}
                    {...field}
                  />}
                />
                {errors && errors.area && <span className="invalid-feedback">{errors.area.message}</span>}

              </div>
            </div>

          </div>

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
export default AddHub
