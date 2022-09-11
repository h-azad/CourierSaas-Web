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
import { getApi, SHIPMENT_TYPE_ADD } from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import SwalAlert from "../../components/SwalAlert"

const AddShipmentType = () => {
  // const [selectboxOptions, setSelectboxOptions] = useState([])
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
      shipment_type: '',
    }
  })

  const onSubmit = data => {
    let isFormValid = true

    if(!( data.shipment_type)) {
      setError('shipment_type', { type: 'required', message: 'Shipment Type must be added' })
      isFormValid = false
    }
    if(!isFormValid) {
      return false
    }

    setData(data)
    if ( data.shipment_type !== null) {

      let formData = {
        shipment_type: data.shipment_type,
        status: 'active'
      }

      console.log("formData", formData)

      useJwt
        .axiosPost(getApi(SHIPMENT_TYPE_ADD), formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Shipment Type Added Successfully")
          navigate("/shipment_type")
        })
        .catch(err => console.log(err))

    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Shipment Type</CardTitle>
      </CardHeader>

      <CardBody>
      <Form onSubmit={handleSubmit(onSubmit)}>
          
          <div className='mb-1'>
            <Label className='form-label' for='shipment_type'>
              Shipment Type
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='shipment_type'
              name='shipment_type'
              render={({ field }) => <Input placeholder='Regular' invalid={errors.shipment_type && true} {...field} />}
            />
            {errors && errors.shipment_type && <span>{errors.shipment_type.message}</span>}
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
export default AddShipmentType
