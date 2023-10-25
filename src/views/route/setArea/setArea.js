// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Form,
  Button,
  Label,
} from "reactstrap"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import toast from 'react-hot-toast'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, ROUTE_AREA, ROUTE_FORM_LIST, CITY_FORM_LIST, AREAS_BY_CITY } from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import SwalAlert from "@src/components/SwalAlert"

const SetAreaToRoute = () => {
  const [selectRoute, setSelectRoute] = useState([])
  const [selectCity, setSelectCity] = useState([])
  const [selectArea, setSelectArea] = useState([])

  const navigate = useNavigate()

  const {
    control,
    watch,
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



  const fetchCityData = () => {
    return useJwt
      .axiosGet(getApi(CITY_FORM_LIST))
      .then((res) => {

        let cityData = []

        res.data.map(data => {
          cityData.push({ value: data.id, label: data.city_name })
        })

        setSelectCity(cityData)
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

        setSelectArea(areaData)
        return res.data
      })
      .catch(err => console.log(err))
  }




  const onSubmit = data => {

    if (data.route !== null && data.city !== null) {
      let formData = {
        route: data.route.value,
        city: data.city.value,
        area: data.area,
      }

      useJwt
        .axiosPost(getApi(ROUTE_AREA), formData)
        .then((res) => {
          SwalAlert("Set Route Area Successfully")
          toast.success('Set Route Area Successfully')
          // navigate("/route/")
        })
        .catch(err => toast.error(`Rider Set Route ${err}`))
    }
  }



  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name == 'city' && type == 'change') {
        fetchAreaData(value.city.value)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])



  useEffect(() => {
    fetchRouteData()
    fetchCityData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Set Route Areas</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
            <Label className='form-label' for='route'>
              Routes
            </Label>
            <Controller
              id="route"
              name="route"
              control={control}
              render={({ field }) => <Select
                isClearable
                required={true}
                // className={classnames('react-select', { 'is-invalid': data !== null && data.route === null })}
                classNamePrefix='select'
                options={selectRoute}
                {...field}
              />}
            />
          </div>

          <div className='mb-1'>
            <Label className='form-label' for='city'>
              City
            </Label>
            <Controller
              id="city"
              name="city"
              control={control}
              render={({ field }) => <Select
                isClearable
                required={true}
                // className={classnames('react-select', { 'is-invalid': data !== null && data.city === null })}
                classNamePrefix='select'
                options={selectCity}
                {...field}
              />}
            />
          </div>

          <div className='mb-1'>
            <Label className='form-label' for='area'>
              Area
            </Label>
            <Controller
              id="area"
              name="area"
              control={control}
              render={({ field }) => <Select
                isClearable
                required={true}
                // className={classnames('react-select', { 'is-invalid': data !== null && data.area === null })}
                classNamePrefix='select'
                options={selectArea}
                {...field}
                isMulti
                className="basic-multi-select"
              />}
            />

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
export default SetAreaToRoute
