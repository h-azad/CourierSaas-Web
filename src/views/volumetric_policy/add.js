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
import { getApi, VOLUMETRIC_POLICY_ADD, SERVICE_TYPE_LIST, SHIPMENT_TYPE_LIST,PRODUCT_TYPE_LIST } from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import SwalAlert from "../../components/SwalAlert"

const AddVolumetricPolicy = () => {
  const [selectboxService, setSelectboxService] = useState([])
  const [selectboxShipment, setSelectboxShipment] = useState([])
  const [selectboxProduct, setSelectboxProduct] = useState([])
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
      volumetric_policy: '',
      service_type: {},
      shipment_type:{},
      product_type:{}

    }
  })

  useEffect(() => {
    fetchServiceData()
  },[])

  const fetchServiceData = () => {
    return useJwt
      .axiosGet(getApi(SERVICE_TYPE_LIST))
      .then((res) => {
        let serviceTypeData = []
        res.data.map(data => {
          serviceTypeData.push({value: data.id, label: data.service_type})
        })
        setSelectboxService(serviceTypeData)
        return res.data
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchShipmentData()
  },[])

  const fetchShipmentData = () => {
    return useJwt
      .axiosGet(getApi(SHIPMENT_TYPE_LIST))
      .then((res) => {
        let shimmentTypeData = []

        res.data.map(data => {
          shimmentTypeData.push({value: data.id, label: data.shipment_type})
        })

        setSelectboxShipment(shimmentTypeData)
        return res.data
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchProductData()
  },[])

  const fetchProductData = () => {
    return useJwt
      .axiosGet(getApi(PRODUCT_TYPE_LIST))
      .then((res) => {
        let productData = []

        res.data.map(data => {
          productData.push({value: data.id, label: data.product_type})
        })

        setSelectboxProduct(productData)
        return res.data
      })
      .catch(err => console.log(err))
  }


  const onSubmit = data => {
    console.log("data", data)

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
    if (data.service_type !== null && data.product_type !== null && data.shipment_type !== null  && data.volumetric_policy !== null) {

      let formData = {
        volumetric_policy: data.volumetric_policy,
        service: data.service_type.value,
        shipment: data.shipment_type.value,
        product: data.product_type.value,

        status: 'active'
      }

      console.log("formData", formData)

      useJwt
        .axiosPost(getApi(VOLUMETRIC_POLICY_ADD), formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Volumetric Policy Added Successfully")
          navigate("/volumetric_policy")
        })
        .catch(err => console.log(err))

    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Volumetric Policy</CardTitle>
      </CardHeader>

      <CardBody>
      <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
              <Label className='form-label' for='service_type'>
                Service Type
              </Label>
              <Controller
                  id="service_type"
                  name="service_type"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
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
                  name="shipment_type"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
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
                  name="product_type"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
                    className={classnames('react-select', { 'is-invalid': errors.product_type && true })} 
                    classNamePrefix='select'
                    options={selectboxProduct} 
                    {...field} 
                  />}
                />
              {errors && errors.product_type && <span>{errors.product_type.message}</span>}
          </div>

          <div className='mb-1'>
            <Label className='form-label' for='volumetric_policy'>
              Volumetric Policy
            </Label>
            <Controller
              defaultValue=''
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
      </CardBody>
    </Card>
  )
}
export default AddVolumetricPolicy
