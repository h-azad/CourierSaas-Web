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
import { getApi, VOLUMETRIC_POLICY_EDIT, VOLUMETRIC_POLICY_DETAILS, SERVICE_TYPE_LIST, SHIPMENT_TYPE_LIST,PRODUCT_TYPE_LIST} from '@src/constants/apiUrls'
import { useEffect, useState } from 'react'
import SwalAlert from "../../components/SwalAlert"


const EditVolumetricPolicy = () => {
  const [selectboxService, setSelectboxService] = useState([])
  const [selectboxShipment, setSelectboxShipment] = useState([])
  const [selectboxProduct, setSelectboxProduct] = useState([])
  const [volumetricInfo, setVolumetricInfo] = useState(null)
  const [data, setData] = useState(null)

  let { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(id)
    useJwt
      .axiosGet(getApi(VOLUMETRIC_POLICY_DETAILS) + id + "/")
      .then((res) => {
        console.log("res", res.data)
        setVolumetricInfo(res.data)
        return res.data
      })
      .catch(err => console.log(err))
      fetchServiceData(),
      fetchShipmentData(),
      fetchProductData()

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

  const fetchProductData = () => {
    return useJwt
      .axiosGet(getApi(PRODUCT_TYPE_LIST))
      .then((res) => {
        // console.log("res", res.data)
        let productData = []

        res.data.map(data => {
          productData.push({value: data.id, label: data.product_type})
        })

        setSelectboxProduct(productData)
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
    defaultValues: volumetricInfo
  })
  
  const onSubmit = data => {

    let isFormValid = true

    if(!(data.service_type && data.service_type.value)) {
      setError('service_type', { type: 'required', message: 'Service Type must be added' })
      isFormValid = false
    }
    if(!(data.shipment_type && data.shipment_type.value)) {
      setError('shipment_type', { type: 'required', message: 'Shipment Type must be added' })
      isFormValid = false
    }

    if(!(data.product_type && data.product_type.value)) {
      setError('product_type', { type: 'required', message: 'Product Type must be added' })
      isFormValid = false
    }

    if(!data.volumetric_policy) {
      setError('volumetric_policy', { type: 'required', message: 'Volumetric Policy must be added' })
      isFormValid = false
    }
   
    if(!isFormValid) {
      return false
    }

    setData(data)
    if (data.service_type !== null && data.volumetric_policy !== null && data.shipment_type !== null && data.product_type !== null)  {
      
      let formData = {
        volumetric_policy: data.volumetric_policy,
        service: data.service_type.value,
        shipment: data.shipment_type.value,
        product: data.product_type.value,
        status: 'active'
      }
              
      console.log('formData',formData)
      useJwt
        .axiosPut(getApi(VOLUMETRIC_POLICY_EDIT) + id + "/", formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Volumetric Policy Edited Successfully")
          navigate("/volumetric_policy")
        })
        .catch(err => console.log(err))
    }
  }

    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Edit Volumetric Policy</CardTitle>
        </CardHeader>  
        <CardBody>
          {volumetricInfo &&
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-1'>
              <Label className='form-label' for='service_type'>
               Service Type
              </Label>
              <Controller
                  id="service_type"
                  defaultValue={{label: volumetricInfo.service && volumetricInfo.service.service_type ? volumetricInfo.service.service_type : "" , value: volumetricInfo.service?.id}}
                  name="service_type"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
                    defaultValue={volumetricInfo.service_type}
                    className={classnames('react-select', { 'is-invalid':errors.service_type && true })} 
                    classNamePrefix='select'
                    options={selectboxService} 
                    {...field} 
                  />}
                />
                {errors && errors.service_type && <span>{errors.service_type.message}</span>}
          </div>
          <div className='mb-1'>
              <Label className='form-label' for='shipment_type'>
               Shipment Type
              </Label>
              <Controller
                  id="shipment_type"
                  defaultValue={{label: volumetricInfo.shipment && volumetricInfo.shipment.shipment_type? volumetricInfo.shipment.shipment_type : "", value: volumetricInfo.shipment?.id}}
                  name="shipment_type"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
                    defaultValue={volumetricInfo.shipment_type}
                    className={classnames('react-select', { 'is-invalid': errors.shipment_type && true })} 
                    classNamePrefix='select'
                    options={selectboxShipment} 
                    {...field} 
                  />}
                />
                {errors && errors.shipment_type && <span>{errors.shipment_type.message}</span>}
          </div>
          <div className='mb-1'>
              <Label className='form-label' for='product_type'>
               Product Type
              </Label>
              <Controller
                  id="product_type"
                  defaultValue={{label: volumetricInfo.product && volumetricInfo.product.product_type? volumetricInfo.product.product_type : "", value: volumetricInfo.product?.id}}
                  name="product_type"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
                    defaultValue={volumetricInfo.product_type}
                    className={classnames('react-select', { 'is-invalid': errors.product_type && true })} 
                    classNamePrefix='select'
                    options={selectboxProduct} 
                    {...field} 
                  />}
                />
                {errors && errors.product_type && <span>{errors.product_type.message}</span>}
          </div>
            <div className='mb-1'>
              <Label className='form-label' for='product_type'>
               Volumetric Policy
              </Label>
              <Controller
                defaultValue={volumetricInfo.volumetric_policy}
                control={control}
                id='volumetric_policy'
                name='volumetric_policy'
                render={({ field }) => <Input placeholder='KG' invalid={errors.volumetric_policy && true} {...field} />}
              />
              {errors && errors.volumetric_policy && <span>{errors.volumetric_policy.message}</span>}
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
  export default EditVolumetricPolicy
        
