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
import { getApi, AREAS_EDIT, AREAS_DETAILS, CITIES_LIST } from '@src/constants/apiUrls'
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
          cities_name: res.data.cities_name,
          areas_name: res.data.areas_name
        })
        return res.data
      })
      .catch(err => console.log(err))
      fetchCitiesData()
  }, [])

  const fetchCitiesData = () => {
    return useJwt
      .axiosGet(getApi(CITIES_LIST))
      .then((res) => {
        // console.log("res", res.data)
        let cityData = []

        res.data.map(data => {
          cityData.push({value: data.id, label: data.cities_name})
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
    if (data.cities_name !== null && data.areas_name !== null) {
      
      let formData = {
        areas_name: data.areas_name,
        cities_name: data.cities_name.value,
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
              <Label className='form-label' for='cities_name'>
                City Name
              </Label>
              <Controller
                  id="cities_name"
                  defaultValue={{label: areasInfo.cities_name.cities_name, value: areasInfo.cities_name.id}}
                  name="cities_name"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
                    defaultValue={areasInfo.cities_name}
                    className={classnames('react-select', { 'is-invalid': data !== null && data.cities_name === null })} 
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
                defaultValue={areasInfo.areas_name}
                control={control}
                id='areas_name'
                name='areas_name'
                render={({ field }) => <Input placeholder='Mirpur' invalid={errors.areas_name && true} {...field} />}
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
        
