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
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors } from "@utils"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, AREAS_ADD } from '@src/constants/apiUrls'
import ToastContent from "../../components/ToastContent"

const AddAreas = () => {
  const navigate = useNavigate()
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
        areas_name: data.areas_name,
        cities_name: data.cities_name,
        status: 'active'
      }

      useJwt
        .axiosPost(getApi(AREAS_ADD), formData)
        .then((res) => {
          console.log("res", res.data)
          // handleReset()
          toast(t => (
            <ToastContent t={t} type='SUCCESS' message={'Area Added Successfully'} />
          ))
          navigate("/areas")
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
        <CardTitle tag="h4">Add Areas</CardTitle>
      </CardHeader>

      <CardBody>
      <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
            <Label className='form-label' for='firstNameBasic'>
              Area Name
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='areas_name'
              name='areas_name'
              render={({ field }) => <Input placeholder='Mirpur' invalid={errors.areas_name && true} {...field} />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='firstNameBasic'>
              City Name
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='cities_name'
              name='cities_name'
              render={({ field }) => <Input placeholder='Dhaka' invalid={errors.cities_name && true} {...field} />}
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
