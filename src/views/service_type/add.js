// ** Reactstrap Imports
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
import { useForm, Controller } from 'react-hook-form'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, SERVICE_TYPE_ADD } from '@src/constants/apiUrls'
import SwalAlert from "../../components/SwalAlert"


const AddServiceType = () => {
  const navigate = useNavigate()
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
        .axiosPost(getApi(SERVICE_TYPE_ADD), formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Service Type Added Successfully")
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
        <CardTitle tag="h4">Add Service Type</CardTitle>
      </CardHeader>

      <CardBody>
      <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
            <Label className='form-label' for='firstNameBasic'>
              Service Type
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='service_type'
              name='service_type'
              render={({ field }) => <Input placeholder='Package' invalid={errors.service_type && true} {...field} />}
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
export default AddServiceType
