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
import { getApi, PAYMENT_METHOD_ADD } from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import SwalAlert from "../../components/SwalAlert"

const AddPaymentMethod = () => {
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
      payment_method: '',
    }
  })

  const onSubmit = data => {
    let isFormValid = true

    if (!(data.payment_method_name)) {
      setError('payment_method_name', { type: 'required', message: 'Payment Method is required' })
      isFormValid = false
    }
    if(!isFormValid) {
      return false
    }

    setData(data)
    if (data.payment_method_name !== null) {

      let formData = {
        payment_method_name: data.payment_method_name,
        status: 'active'
      }

      console.log("formData", formData)

      useJwt
        .axiosPost(getApi(PAYMENT_METHOD_ADD), formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Payment Method Added Successfully")
          navigate("/payment_method")
        })
        .catch(err => console.log(err))

    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Payment Method</CardTitle>
      </CardHeader>

      <CardBody>
      <Form onSubmit={handleSubmit(onSubmit)}>
          
          <div className='mb-1'>
            <Label className='form-label' for='payment_method_name'>
              Payment Method
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='payment_method_name'
              name='payment_method_name'
              render={({ field }) => <Input placeholder='bKash' invalid={errors.payment_method_name && true} {...field} />}
            />
            {errors && errors.payment_method_name && <span>{errors.payment_method_name.message}</span>}
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
export default AddPaymentMethod
