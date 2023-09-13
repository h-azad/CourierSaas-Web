import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Label, Card, Form, CardBody, Button, } from "reactstrap"
import classnames from 'classnames'
import Select from "react-select"
import { getApi, CITY_FORM_LIST, AREAS_BY_CITY } from '@src/constants/apiUrls'
import useJwt from '@src/auth/jwt/useJwt'


export default function Form2({ setCity, setAreas, next, prev }) {
  const { handleSubmit, control, watch, resetField, formState: { errors } } = useForm()

  const [selectboxCity, setSelectboxCity] = useState([])
  const [selectboxArea, setSelectboxArea] = useState([])

  const onSubmit = data => {

    let isFormValid = true

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

    if (data.city.value !== null && data.area.value !== null) {
      setCity(data.city.value)
      setAreas(JSON.stringify(data.area))
      next()
    }

  }

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name == 'city' && type == 'change') {
        resetField('area')
        fetchAreaData(value.city.value)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

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

  useEffect(() => {
    fetchCityData()
  }, [])




  return (
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
            <Label className='form-label' for='city'>
              Cities
            </Label>
            <Controller
              id='city'
              name='city'
              control={control}
              render={({ field }) => <Select
                isClearable
                className={classnames('react-select', { 'is-invalid': errors.city && true })}
                classNamePrefix='select'
                options={selectboxCity}
                {...field}
              />}
            />
            {errors && errors.city && <span className="invalid-feedback">{errors.city.message}</span>}
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='area'>
              Areas
            </Label>
            <Controller
              id='area'
              name='area'
              control={control}
              render={({ field }) => <Select
                isClearable
                isMulti
                className={classnames('basic-multi-select', { 'is-invalid': errors.area && true })}
                classNamePrefix='select'
                options={selectboxArea}
                {...field}
              />}
            />
            {errors && errors.area && <span className="invalid-feedback">{errors.area.message}</span>}
          </div>
          <div className='d-flex'>
            <Button className='me-1' color='primary' type='submit'>
              Next
            </Button>
          </div>
          <div className='d-flex'>
            <Button className='me-1' color='primary' onClick={prev} type={Button}>
              Previous
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>

  )
}