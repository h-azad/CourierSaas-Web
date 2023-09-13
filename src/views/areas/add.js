// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
} from "reactstrap"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import toast from 'react-hot-toast'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors } from "@utils"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, AREAS_ADD, CITY_FORM_LIST } from '@src/constants/apiUrls'
import ToastContent from "../../components/ToastContent"
import { useEffect, useState } from "react"
import SwalAlert from "../../components/SwalAlert"

const AddAreas = () => {
  const [selectboxOptions, setSelectboxOptions] = useState([])
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      area_name: '',
      city: {}
    }
  })

  useEffect(() => {
    fetchCitiesData()
  },[])

  const fetchCitiesData = () => {
    return useJwt
      .axiosGet(getApi(CITY_FORM_LIST) + '?request-location=form')
      .then((res) => {
        // console.log("res", res.data)
        let cityData = []

        res.data.map(data => {
          cityData.push({value: data.id, label: data.city_name})
        })

        setSelectboxOptions(cityData)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const handleCityChange = (city) => {
    setValue('city_name', city)
  }

  
  const onSubmit = data => {
    // console.log("data", data)
    setData(data)
    if (data.city_name !== null && data.area_name !== null) {
      // console.log("data", data)

      let formData = {
        area_name: data.area_name,
        city: data.city_name.value,
        status: 'active'
      }

      console.log("formData", formData)

      useJwt
        .axiosPost(getApi(AREAS_ADD), formData)
        .then((res) => {
          console.log("res", res.data)
          // handleReset()
          // toast(t => (
          //   <ToastContent t={t} type='SUCCESS' message={'Area Added Successfully'} />
          // ))
          SwalAlert("Area Added Successfully")
          navigate("/areas")
        })
        .catch(err => console.log(err))

      // console.log(formData)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Areas</CardTitle>
      </CardHeader>

      <CardBody>
      <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
              <Label className='form-label' for='city_name'>
                City Name
              </Label>
              <Controller
              id="city_name"
              name="city_name"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
                    className={classnames('react-select', { 'is-invalid': data !== null && data.city_name === null })} 
                    classNamePrefix='select'
                    options={selectboxOptions} 
                    {...field} 
                  />}
                />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='area_name'>
              Area Name
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='area_name'
              name='area_name'
              render={({ field }) => <Input placeholder='Mirpur' invalid={errors.area_name && true} {...field} />}
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
export default AddAreas
