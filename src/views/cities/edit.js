// ** Reactstrap Imports
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
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors } from "@utils"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, CITIES_EDIT, CITIES_DETAILS } from '@src/constants/apiUrls'
import ToastContent from "../../components/ToastContent"  
import { useEffect, useState } from 'react'
import SwalAlert from "../../components/SwalAlert"


const EditCities = () => {

  const [citiesInfo, setCitiesInfo] = useState(null)

  let { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(id)
    useJwt
      .axiosGet(getApi(CITIES_DETAILS) + id + "/")
      .then((res) => {
        // console.log("res", res.data)
        setCitiesInfo(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }, [])

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()


  
  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      let formData = {
        city_name: data.city_name,
        status: 'active'
      }
      
      useJwt
        .axiosPut(getApi(CITIES_EDIT) + id + "/", formData)
        .then((res) => {
          console.log("res", res.data)
          // handleReset()
          // toast(t => (
          //   <ToastContent t={t} type='SUCCESS' message={'City Edited Successfully'} />
          // ))
          SwalAlert("City Edited Successfully")
          navigate("/cities")
        })
        .catch(err => console.log(err))

      // console.log(formData)
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Edit Cities</CardTitle>
        </CardHeader>
  
        <CardBody>
          {citiesInfo &&
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-1'>
              <Label className='form-label' for='firstNameBasic'>
                Cities Name
              </Label>
              <Controller
                  defaultValue={citiesInfo.city_name}
                control={control}
                  id='city_name'
                  name='city_name'
                  render={({ field }) => <Input placeholder='Dhaka' invalid={errors.city_name && true} {...field} />}
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
  export default EditCities
        
