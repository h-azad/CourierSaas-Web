import { Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,} from 'reactstrap'
import { Router, useNavigate, useParams} from "react-router-dom"
import Select from "react-select"
import toast from 'react-hot-toast'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors } from "@utils"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, AREAS_EDIT, AREAS_DETAILS, CITY_FORM_LIST } from '@src/constants/apiUrls'
import ToastContent from "../../components/ToastContent"  
import { useEffect, useState } from 'react'
import SwalAlert from "../../components/SwalAlert"


const EditAreas = () => {
  const [selectboxOptions, setSelectboxOptions] = useState([])
  const [data, setData] = useState(null)
  const [areasInfo, setAreasInfo] = useState(null)

  let { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(id)
    useJwt
      .axiosGet(getApi(AREAS_DETAILS) + id + "/")
      .then((res) => {
        console.log("res", res.data)
        setAreasInfo({
          city: res.data.city,
          area_name: res.data.area_name
        })
        return res.data
      })
      .catch(err => console.log(err))
      fetchCitiesData()
  }, [])

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

  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: areasInfo
  })
  
  const onSubmit = data => {
    setData(data)
    if (data.city_name !== null && data.city_name.value !== null && data.area_name !== null) {
      
      let formData = {
        area_name: data.area_name,
        city: data.city_name.value,
        status: 'active'
      }
              
      console.log('formData',formData)
      useJwt
        .axiosPut(getApi(AREAS_EDIT) + id + "/", formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Area Edited Successfully")
          navigate("/areas")
        })
        .catch(err => console.log(err))

    }
  }

    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Edit Areas</CardTitle>
        </CardHeader>
  
        <CardBody>
          {areasInfo &&
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-1'>
              <Label className='form-label' for='city_name'>
                City Name
              </Label>
              <Controller
                  id="city_name"
                  defaultValue={{ label: areasInfo.city.city_name, value: areasInfo.city.id}}
                  name="city_name"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
                    defaultValue={areasInfo.city_name}
                    className={classnames('react-select', { 'is-invalid': data !== null && data.city_name === null })} 
                    classNamePrefix='select'
                    options={selectboxOptions} 
                    {...field} 
                  />}
                />
          </div>
            <div className='mb-1'>
              <Label className='form-label' for='firstNameBasic'>
                Areas Name
              </Label>
              <Controller
                defaultValue={areasInfo.area_name}
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
          }
        </CardBody>
      </Card>
    )
  }
  export default EditAreas
        
