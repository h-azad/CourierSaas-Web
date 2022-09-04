import { Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Form,
  Button,
  Label,} from 'reactstrap'
import { Router, useNavigate, useParams} from "react-router-dom"
import Select from "react-select"
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors } from "@utils"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, PRODUCT_TYPE_EDIT, PRODUCT_TYPE_DETAILS, SERVICE_TYPE_LIST, SHIPMENT_TYPE_LIST} from '@src/constants/apiUrls'
import { useEffect, useState } from 'react'
import SwalAlert from "../../components/SwalAlert"


const EditProductType = () => {
  const [selectboxService, setSelectboxService] = useState([])
  const [selectboxShipment, setSelectboxShipment] = useState([])
  const [productInfo, setProductInfo] = useState(null)
  const [data, setData] = useState(null)


  let { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(id)
    useJwt
      .axiosGet(getApi(PRODUCT_TYPE_DETAILS) + id + "/")
      .then((res) => {
        console.log("res", res.data)
        setProductInfo({
          service: res.data.service,
          product_type: res.data.product_type,
          shipment_type: res.data.shipment_type

        })
        return res.data
      })
      .catch(err => console.log(err))
      fetchServiceData(),
      fetchShipmentData()

  }, [])

  const fetchServiceData = () => {
    return useJwt
      .axiosGet(getApi(SERVICE_TYPE_LIST))
      .then((res) => {
        // console.log("res", res.data)
        let serviceData = []

        res.data.map(data => {
          serviceData.push({value: data.id, label: data.service_type})
        })

        setSelectboxService(serviceData)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const fetchShipmentData = () => {
    return useJwt
      .axiosGet(getApi(SHIPMENT_TYPE_LIST))
      .then((res) => {
        // console.log("res", res.data)
        let shipmentData = []

        res.data.map(data => {
          shipmentData.push({value: data.id, label: data.shipment_type})
        })

        setSelectboxShipment(shipmentData)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: productInfo
  })
  
  const onSubmit = data => {
    setData(data)
    if (data.service_type !== null && data.product_type !== null && data.shipment_type !== null) {
      
      let formData = {
        product_type: data.product_type,
        service: data.service_type.value,
        shipment: data.shipment_type.value,

        status: 'active'
      }
              
      console.log('formData',formData)
      useJwt
        .axiosPut(getApi(PRODUCT_TYPE_EDIT) + id + "/", formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Product Type Edited Successfully")
          navigate("/product_type")
        })
        .catch(err => console.log(err))

    }
  }

    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Edit Product Type</CardTitle>
        </CardHeader>
  
        <CardBody>
          {productInfo &&
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-1'>
              <Label className='form-label' for='service_type'>
               Service Type
              </Label>
              <Controller
                  id="service_type"
                  defaultValue={{label: productInfo.service.service_type, value: productInfo.service.id}}
                  name="service_type"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
                    defaultValue={productInfo.service_type}
                    className={classnames('react-select', { 'is-invalid': data !== null && data.service_type === null })} 
                    classNamePrefix='select'
                    options={selectboxService} 
                    {...field} 
                  />}
                />
          </div>
          <div className='mb-1'>
              <Label className='form-label' for='shipment_type'>
               Shipment Type
              </Label>
              <Controller
                  id="shipment_type"
                  // defaultValue={{label: productInfo.shipment.shipment_type, value: productInfo.shipment.id}}
                  name="shipment_type"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
                    defaultValue={productInfo.shipment_type}
                    className={classnames('react-select', { 'is-invalid': data !== null && data.shipment_type === null })} 
                    classNamePrefix='select'
                    options={selectboxShipment} 
                    {...field} 
                  />}
                />
          </div>
            <div className='mb-1'>
              <Label className='form-label' for='product_type'>
               Product Type
              </Label>
              <Controller
                defaultValue={productInfo.product_type}
                control={control}
                id='product_type'
                name='product_type'
                render={({ field }) => <Input placeholder='Electronics' invalid={errors.product_type && true} {...field} />}
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
  export default EditProductType
        
