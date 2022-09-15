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
import { getApi, SHIPMENT_TYPE_EDIT, SHIPMENT_TYPE_DETAILS } from '@src/constants/apiUrls'
import { useEffect, useState } from 'react'
import SwalAlert from "../../components/SwalAlert"


const EditShipmentType = () => {
  // const [selectboxOptions, setSelectboxOptions] = useState([])
  const [shipmentInfo, setShipmentInfo] = useState(null)
  const [data, setData] = useState(null)


  let { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(id)
    useJwt
      .axiosGet(getApi(SHIPMENT_TYPE_DETAILS) + id + "/")
      .then((res) => {
        console.log("res", res.data)
        setShipmentInfo({
          shipment_type: res.data.shipment_type
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
    defaultValues: shipmentInfo
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
              
      console.log('formData',formData)
      useJwt
        .axiosPut(getApi(SHIPMENT_TYPE_EDIT) + id + "/", formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Shipment Type Edited Successfully")
          navigate("/shipment_type")
        })
        .catch(err => console.log(err))

    }
  }

    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Edit Shipment Type</CardTitle>
        </CardHeader>
  
        <CardBody>
          {shipmentInfo &&
        <Form onSubmit={handleSubmit(onSubmit)}>
           
            <div className='mb-1'>
              <Label className='form-label' for='shipment_type'>
                Shipment Type
              </Label>
              <Controller
                defaultValue={shipmentInfo.shipment_type}
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
          }
        </CardBody>
      </Card>
    )
  }
  export default EditShipmentType
        
