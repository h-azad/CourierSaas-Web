// ** Reactstrap Imports
import { Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Form,
  Button,
  Label,} from 'reactstrap'
import { Router, useNavigate, useParams} from "react-router-dom"
import { useForm, Controller } from 'react-hook-form'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, SERVICE_TYPE_EDIT, SERVICE_TYPE_DETAILS } from '@src/constants/apiUrls'
import { useEffect, useState } from 'react'
import SwalAlert from "../../components/SwalAlert"


const EditServiceType = () => {

  const [servicetypeInfo, setServicetypeInfo] = useState(null)

  let { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(id)
    useJwt
      .axiosGet(getApi(SERVICE_TYPE_DETAILS) + id + "/")
      .then((res) => {
        setServicetypeInfo(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }, [])

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()

  
  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      let formData = {
        service_type: data.service_type,
        status: 'active'
      }
      useJwt
        .axiosPut(getApi(SERVICE_TYPE_EDIT) + id + "/", formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Service Type Edited Successfully")
          navigate("/service_type")
        })
        .catch(err => console.log(err))

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
          <CardTitle tag="h4">Edit Service Type</CardTitle>
        </CardHeader>
  
        <CardBody>
          {servicetypeInfo &&
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-1'>
              <Label className='form-label' for='firstNameBasic'>
               Service Type
              </Label>
              <Controller
                defaultValue={servicetypeInfo.service_type}
                control={control}
                id='service_type'
                name='service_type'
                render={({ field }) => <Input placeholder='' invalid={errors.service_type && true} {...field} />}
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
  export default EditServiceType
        
