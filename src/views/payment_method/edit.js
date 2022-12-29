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
import { getApi, PAYMENT_METHOD_EDIT, PAYMENT_METHOD_DETAILS } from '@src/constants/apiUrls'
import { useEffect, useState } from 'react'
import SwalAlert from "../../components/SwalAlert"


const EditPaymentMethod = () => {
  const [paymentInfo, setPaymentInfo] = useState(null)
  const [data, setData] = useState(null)


  let { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(id)
    useJwt
      .axiosGet(getApi(PAYMENT_METHOD_DETAILS) + id + "/")
      .then((res) => {
        console.log("res", res.data)
        setPaymentInfo({
          payment_method_name: res.data.payment_method_name
        })
        return res.data
      })
      .catch(err => console.log(err))
  }, [])
  
  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: paymentInfo
  })
  
  const onSubmit = data => {
    let isFormValid = true

    if (!(data.payment_method_name)) {
      setError('payment_method_name', { type: 'required', message: 'Payment method is required' })
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
              
      console.log('formData',formData)
      useJwt
        .axiosPut(getApi(PAYMENT_METHOD_EDIT) + id + "/", formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Payment Method Edited Successfully")
          navigate("/payment_method")
        })
        .catch(err => console.log(err))

    }
  }

    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Edit Payment Method</CardTitle>
        </CardHeader>
  
        <CardBody>
          {paymentInfo &&
        <Form onSubmit={handleSubmit(onSubmit)}>
           
            <div className='mb-1'>
              <Label className='form-label' for='shipment_type'>
                Payment Method Name
              </Label>
              <Controller
                  defaultValue={paymentInfo.payment_method_name}
                control={control}
                  id='payment_method_name'
                  name='payment_method_name'
                  render={({ field }) => <Input placeholder='' invalid={errors.payment_method_name && true} {...field} />}
              />
                {errors && errors.payment_method_name && <span>{errors.payment_method_name.message}</span>}
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
  export default EditPaymentMethod
        
