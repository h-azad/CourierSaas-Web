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
import Select from "react-select"
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, PRODUCT_TYPE_ADD, SERVICE_TYPE_LIST ,SHIPMENT_TYPE_LIST} from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import SwalAlert from "../../components/SwalAlert"

const AddProductType = () => {
  const [selectboxOptions, setSelectboxOptions] = useState([])
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
      product_type: '',
      shipment_type: {},
      service_type: {}
    }
  })

  useEffect(() => {
    fetchServiceData(),
    fetchShipmentData()
  },[])

  const fetchServiceData = () => {
    return useJwt
      .axiosGet(getApi(SERVICE_TYPE_LIST))
      .then((res) => {
        // console.log("res", res.data)
        let serviceTypeData = []

        res.data.map(data => {
          serviceTypeData.push({value: data.id, label: data.service_type})
        })

        setSelectboxOptions(serviceTypeData)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const fetchShipmentData = () => {
    return useJwt
      .axiosGet(getApi(SHIPMENT_TYPE_LIST))
      .then((res) => {
        // console.log("res", res.data)
        let shipmentTypeData = []

        res.data.map(data => {
          shipmentTypeData.push({value: data.id, label: data.shipment_type})
        })

        setSelectboxOptions(shipmentTypeData)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const handleServiceChange = (service) => {
    setValue('service_type', service)
  }

  const handleShipmentChange = (shipment) => {
    setValue('shipment_type', service)
  }

  const onSubmit = data => {
    // console.log("data", data)
    setData(data)
    if (data.service_type !== null && data.shipment_type !== null && data.product_type !== null) {
      // console.log("data", data)

      let formData = {
        product_type: data.product_type,
        service: data.service_type.value,
        shipment: data.shipment_type.value,
        status: 'active'
      }

      console.log("formData", formData)

      useJwt
        .axiosPost(getApi(PRODUCT_TYPE_ADD), formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Product Type Added Successfully")
          navigate("/product_type")
        })
        .catch(err => console.log(err))

    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Product Type</CardTitle>
      </CardHeader>

      <CardBody>
      <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
              <Label className='form-label' for='service_type'>
                Product Type
              </Label>
              <Controller
                  id="product_type"
                  name="product_type"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
                    className={classnames('react-select', { 'is-invalid': data !== null && data.product_type === null })} 
                    classNamePrefix='select'
                    options={selectboxOptions} 
                    {...field} 
                  />}
                />
          </div>
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
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='service_type'>
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
export default AddProductType
