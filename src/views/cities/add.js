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
import { getApi, CITIES_ADD } from '@src/constants/apiUrls'
import SwalAlert from "../../components/SwalAlert"
import { useEffect, useState } from "react"


const AddCities = () => {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()
  
  const onSubmit = data => {
    let isFormValid = true

    if (!(data.city_name)) {
      setError('city_name', { type: 'required', message: 'City name must be added' })
      isFormValid = false
    }
    if(!isFormValid) {
      return false
    }

    setData(data)
    if (data.city_name !== null) {

      let formData = {
        city_name: data.city_name,
        status: 'active'
      }

      console.log("formData", formData)

      useJwt
        .axiosPost(getApi(CITIES_ADD), formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("City Added Successfully")
          navigate("/cities")
        })
        .catch(err => console.log(err))

    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Cities</CardTitle>
      </CardHeader>

      <CardBody>
      <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
            <Label className='form-label' for='firstNameBasic'>
              City Name
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='city_name'
              name='city_name'
              render={({ field }) => <Input placeholder='Dhaka' invalid={errors.city_name && true} {...field} />}
            />
            {errors && errors.city_name && <span>{errors.city_name.message}</span>}
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
export default AddCities
