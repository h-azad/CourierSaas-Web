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
import { getApi, RIDER_ADD } from '@src/constants/apiUrls'
import ToastContent from "../../components/ToastContent"

const AddRiders = () => {
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
        user_name: data.user_name,
        business_name: data.business_name,
        email: data.email,
        phone_number: data.phone_number,
        status: 'active'
      }

      useJwt
        .axiosPost(getApi(RIDER_ADD), formData)
        .then((res) => {
          console.log("res", res.data)
          // handleReset()
          toast(t => (
            <ToastContent t={t} type='SUCCESS' message={'Rider Added Successfully'} />
          ))
          navigate("/rider")
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

  const handleReset = () => {
    reset({
      user_name: '',
      business_name: '',
      email: '',
      phone_number: '',
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Rider</CardTitle>
      </CardHeader>

      <CardBody>
      <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
            <Label className='form-label' for='firstNameBasic'>
              Full Name
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='user_name'
              name='user_name'
              render={({ field }) => <Input placeholder='Bruce Wayne' invalid={errors.user_name && true} {...field} />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='lastNameBasic'>
              Business Name
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='business_name'
              name='business_name'
              render={({ field }) => <Input placeholder='Test Shop' invalid={errors.business_name && true} {...field} />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='emailBasic'>
              Email
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='email'
              name='email'
              render={({ field }) => (
                <Input
                  type='email'
                  placeholder='bruce.wayne@email.com'
                  invalid={errors.email && true}
                  {...field}
                />
              )}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='emailBasic'>
              Mobile
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='phone_number'
              name='phone_number'
              render={({ field }) => (
                <Input
                  type='text'
                  placeholder='017XXXXXXXXX'
                  invalid={errors.phone_number && true}
                  {...field}
                />
              )}
            />
          </div>
          <div className='d-flex'>
            <Button className='me-1' color='primary' type='submit'>
              Submit
            </Button>
            <Button outline color='secondary' type='reset' onClick={handleReset}>
              Reset
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}
export default AddRiders
