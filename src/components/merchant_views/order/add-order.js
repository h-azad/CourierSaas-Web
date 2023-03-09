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
import { getApi, MARCHANT_CREATE_ORDER,  PRODUCT_TYPE_LIST, AREAS_LIST, PRICING_POLICY_LIST, SHIPMENT_TYPE_LIST, PRICING_POLICY_BY_PRODUCT } from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import SwalAlert from "../../../components/SwalAlert"
import { getUserData } from "../../../auth/utils"


const MerchantAddOrder = () => {
  // const [selectboxMarchant, setSelectboxMarchant] = useState([])
  const [selectboxProduct, setSelectboxProduct] = useState([])
  const [selectPricingPolicybyProduct, setPricingPolicybyProduct] = useState([])
  const [selectboxPricingPolicy, setSelectboxPricingPolicy] = useState([])
  const [selectboxArea, setSelectboxArea] = useState([])
  const [selectboxShipmentType, setSelectboxShipmentType] = useState([])

  const [data, setData] = useState(null)
  const navigate = useNavigate()
  const {
    reset,
    control,
    watch,
    resetField,
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      product_type: {},

    }
  })

  useEffect(() => {
   
    fetchProductData()
    fetchAreaData()
    // fetchPricingPolicyData()
    fetchShipmentTypeData()

  },[])

  const fetchShipmentTypeData = () => {
    return useJwt
      .axiosGet(getApi(SHIPMENT_TYPE_LIST))
      .then((res) => {
        let shipmenttypeData = []

        res.data.map(data => {
          shipmenttypeData.push({ value: data.id, label: data.shipment_type })
        })

        setSelectboxShipmentType(shipmenttypeData)
        return res.data
      })
      .catch(err => console.log(err))
  }

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

  const fetchPricingPolicyData = (productTypeId) => {

    return useJwt
      .axiosGet(getApi(PRICING_POLICY_BY_PRODUCT) + productTypeId + '/')
      .then((res) => {
        let pricingData = []

        res.data.map(data => {
          pricingData.push({value: data.id, label: data.policy_title})
        })

        setSelectboxPricingPolicy(pricingData)
        setPricingPolicybyProduct(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(value, name, type)
      if (name == 'product_type' && type == 'change') {
        fetchPricingPolicyData(value.product_type.value)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  function setDeliveryCharge(policyID){
    console.log(policyID)
    if (policiesData && policyID) {
      const parcelInfo = policiesData.find(x => x.id == policyID)
      console.log('policiesData', policiesData)
      console.log('parcelInfo', policyID, parcelInfo)
      parcelInfo ? setValue('delivary_charge', parcelInfo.delivary_charge) : null
    }

  }

  const fetchAreaData = () => {
    return useJwt
      .axiosGet(getApi(AREAS_LIST))
      .then((res) => {
        let areaData = []
        res.data.map(data => {
          areaData.push({value: data.id, label: data.area_name})
        })
        setSelectboxArea(areaData)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const onSubmit = data => {
    console.log("data", data)

    let isFormValid = true

  
    if(!data.recipient_name) {
      setError('recipient_name', { type: 'required', message: 'Recipient Name is required' })
      isFormValid = false
    }
    if(!data.phone_number) {
      setError('phone_number', { type: 'required', message: 'Phone Number is required' })
      isFormValid = false
    }
    if(!data.delivary_address) {
      setError('delivary_address', { type: 'required', message: 'Delivary Address is required' })
      isFormValid = false
    }
    if(!data.amount_to_be_collected) {
      setError('amount_to_be_collected', { type: 'required', message: 'Amount is required' })
      isFormValid = false
    } 

    if(!(data.product_type && data.product_type.value)) {
      setError('product_type', { type: 'required', message: 'Product Type is required' })
      isFormValid = false
    }
    if (!(data.pricing_policy && data.pricing_policy.value)) {
      setError('pricing_policy', { type: 'required', message: 'Percel Type is required' })
      isFormValid = false
    }
    if (!(data.shipment_type && data.shipment_type.value)) {
      setError('shipment_type', { type: 'required', message: 'Shipment Type is required' })
      isFormValid = false
    }
   
    if(!(data.delivary_area && data.delivary_area.value)) {
      setError('delivary_area', { type: 'required', message: 'Delivary Area is required' })
      isFormValid = false
    }
    if(!data.delivary_charge) {
      setError('delivary_charge', { type: 'required', message: 'Delivary Charge is required' })
      isFormValid = false
    }
   
    if(!isFormValid) {
      return false
    }

    setData(data)
    if ( data.recipient_name !== null &&  data.phone_number !== null 
      && data.delivary_address !== null &&  data.amount_to_be_collected !== null 
      && data.product_type.value !== null && data.delivary_area.value !== null
      && data.delivary_charge !== null && data.pricing_policy.value !== null
      && data.shipment_type.value !== null && getUserData()
      ) 
    {
      console.log(getUserData())
      const userInfo = getUserData()
      let formData = {
        marchant: userInfo.id,
        recipient_name: data.recipient_name,
        phone_number: data.phone_number,
        delivary_address: data.delivary_address,
        amount_to_be_collected: data.amount_to_be_collected,
        product_type: data.product_type.value,
        delivary_area: data.delivary_area.value,
        pricing_policy: data.pricing_policy.value,
        shipment_type: data.shipment_type.value,
        delivary_charge: data.delivary_charge,
        status: 'accepted'
      }

      console.log("formData", formData)
      const headers = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      useJwt
        .axiosPost(getApi(MARCHANT_CREATE_ORDER), formData, headers )
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Parcel Added Successfully")
          navigate("/create_order")
        })
        .catch(err => console.log(err))

    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Create New Order</CardTitle>
      </CardHeader>

      <CardBody>
      <Form onSubmit={handleSubmit(onSubmit)}>

          <div class="row">
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='recipient_name'>
                  Recipient Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='recipient_name'
                  name='recipient_name'
                  render={({ field }) => <Input placeholder='' invalid={errors.recipient_name && true} {...field} />}
                />
                {errors && errors.recipient_name && <span>{errors.recipient_name.message}</span>}
              </div>
            </div>
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='phone_number'>
                Phone Number
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='phone_number'
                  name='phone_number'
                  render={({ field }) => <Input placeholder='' invalid={errors.phone_number && true} {...field} />}
                />
                {errors && errors.phone_number && <span>{errors.phone_number.message}</span>}
              </div>
            </div>
          </div>
            <div className='mb-1'>
              <Label className='form-label' for='delivary_address'>
              Delivary Address
              </Label>
              <Controller
                defaultValue=''
                control={control}
                id='delivary_address'
                name='delivary_address'
                render={({ field }) => <Input placeholder='' invalid={errors.delivary_address && true} {...field} />}
              />
              {errors && errors.delivary_address && <span>{errors.delivary_address.message}</span>}
            </div>
          <div className='mb-1'>
            <Label className='form-label' for='amount_to_be_collected'>
            Amount to be Collected
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='amount_to_be_collected'
              name='amount_to_be_collected'
              render={({ field }) => <Input placeholder='' invalid={errors.amount_to_be_collected && true} {...field} />}
            />
            {errors && errors.amount_to_be_collected && <span>{errors.amount_to_be_collected.message}</span>}
          </div>
          <div class="row">
            <div class="col-lg-6">
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
                  {errors && errors.product_type && <span  className="invalid-feedback">{errors.product_type.message}</span>}
              </div>
            </div>
              <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='area'>
                  Percel Type(Pricing Policy)
                </Label>
                <Controller
                  id="pricing_policy"
                  name="pricing_policy"
                  control={control}
                  render={({ field }) => <Select 
                    // isClearable
                    className={classnames('react-select', { 'is-invalid': errors.pricing_policy && true })} 
                    classNamePrefix='select'
                    options={selectboxPricingPolicy} 
                    {...field} 
                  />}
                />
                {errors && errors.pricing_policy && <span className="invalid-feedback">{errors.pricing_policy.message}</span>}

              </div>
            </div>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='area'>
              Shipment Type
            </Label>
            <Controller
              id="shipment_type"
              name="shipment_type"
              control={control}
              render={({ field }) => <Select
                // isClearable
                className={classnames('react-select', { 'is-invalid': errors.shipment_type && true })}
                classNamePrefix='select'
                options={selectboxShipmentType}
                {...field}
              />}
            />
            {errors && errors.shipment_type && <span className="invalid-feedback">{errors.shipment_type.message}</span>}

          </div>       
          <div class="row">
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='delivary_area'>
                  Delivary Area
                </Label>
                <Controller
                  id='delivary_area'
                  name='delivary_area'
                  control={control}
                  render={({ field }) => <Select 
                  isClearable
                  className={classnames('react-select', { 'is-invalid': errors.delivary_area && true })} 
                  classNamePrefix='select'
                  options={selectboxArea} 
                  {...field} 
                />}
                />
                {errors && errors.delivary_area && <span className="invalid-feedback">{errors.delivary_area.message}</span>}
              </div>
            </div>
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='delivary_charge'>
                Delivary Charge
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='delivary_charge'
                  name='delivary_charge'
                  render={({ field }) => <Input placeholder='' invalid={errors.delivary_charge && true} {...field} />}
                />
                {errors && errors.delivary_charge && <span>{errors.delivary_charge.message}</span>}
              </div>
            </div>
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
export default MerchantAddOrder
