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
import { getApi, RIDER_ROUTE, ROUTE_FORM_LIST, RIDER_LIST } from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import SwalAlert from "@src/components/SwalAlert"

const SetRiderInRoute = () => {
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
          navigate("/route/")
        })
        .catch(err => toast.error(`Rider Set Route ${err}`))
    }
  }

  useEffect(() => {
    fetchRouteData()
    fetchRiderData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Set Rider</CardTitle>
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
            <Label className='form-label' for='rider'>
              Riders
            </Label>
            <Controller
              id="rider"
              name="rider"
              control={control}
              render={({ field }) => <Select
                isClearable
                required={true}
                // className={classnames('react-select', { 'is-invalid': data !== null && data.rider === null })}
                classNamePrefix='select'
                options={selectRider}
                {...field}
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
export default SetRiderInRoute
