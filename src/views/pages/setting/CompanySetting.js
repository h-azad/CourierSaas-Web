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
  import classnames from "classnames"
  import { useForm, Controller } from "react-hook-form"
  import useJwt from "@src/auth/jwt/useJwt"
  import {
    getApi,
    CREATE_ORDER_BY_AGENT,
    MARCHANT_LIST,
    DELIVARY_CHARGE_BY_PERCEL_TYPE,
    RIDER_LIST,
    PRODUCT_TYPE_LIST,
    AREAS_LIST,
    SHIPMENT_TYPE_LIST,
    PRICING_POLICY_BY_PRODUCT,
  } from "@src/constants/apiUrls"
  

import { Radio, Select, Space } from 'antd'


  import { useEffect, useState } from "react"
  import SwalAlert from "../../../components/SwalAlert"


  
  const EditCompanySetting = () => {
    const [selectboxProduct, setSelectboxProduct] = useState([])
    const [selectboxPricingPolicy, setSelectboxPricingPolicy] = useState([])
    const [selectboxArea, setSelectboxArea] = useState([])
    const [selectboxShipmentType, setSelectboxShipmentType] = useState([])
    const [delivaryCharge, setDelivaryCharge] = useState(0)
    const [amountCollected, setAmountCollected] = useState(0)
    const [CODCharge, setCODCharge] = useState(0)
    const [orderType, setOrderType] = useState()
    const navigate = useNavigate()
    const {
      control,
      watch,
      setError,
      setValue,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
  
      },
    })
    useEffect(() => {
      fetchProductData()
      fetchAreaData()
      fetchPricingPolicyData()
      fetchDelivaryChargeData()
      fetchShipmentTypeData()
    }, [delivaryCharge, amountCollected])
  
  
    const fetchShipmentTypeData = () => {
      return useJwt
        .axiosGet(getApi(SHIPMENT_TYPE_LIST))
        .then((res) => {
          let shipmenttypeData = []
  
          res.data.map((data) => {
            shipmenttypeData.push({ value: data.id, label: data.shipment_type })
          })
  
          setSelectboxShipmentType(shipmenttypeData)
          return res.data
        })
        .catch((err) => console.log(err))
    }
  
    const fetchProductData = () => {
      return useJwt
        .axiosGet(getApi(PRODUCT_TYPE_LIST))
        .then((res) => {
          let productData = []
  
          res.data.map((data) => {
            productData.push({ value: data.id, label: data.product_type })
          })
  
          setSelectboxProduct(productData)
          return res.data
        })
        .catch((err) => console.log(err))
    }
  
    const fetchPricingPolicyData = (productTypeId) => {
      return useJwt
        .axiosGet(getApi(PRICING_POLICY_BY_PRODUCT) + productTypeId + "/")
        .then((res) => {
          let pricingData = []
  
          res.data.map((data) => {
            pricingData.push({ value: data.id, label: data.policy_title })
          })
  
          setSelectboxPricingPolicy(pricingData)
          setPricingPolicybyProduct(res.data)
          return res.data
        })
        .catch((err) => console.log(err))
    }
  
    useEffect(() => {
      const subscription = watch((value, { name, type }) => {
  
        if (name == "product_type" && type == "change") {
          fetchPricingPolicyData(value.product_type.value)
        }
        if (name == "amount_to_be_collected" && type == "change") {
          fetchDelivaryChargeData(value?.pricing_policy?.value)
          setAmountCollected(value.amount_to_be_collected)
          setCODCharge(CODCharge)
        }
        if (name ==='order_type' && type==="change"){
          if (value.order_type.value === "COD"){
            setOrderType(value.order_type.value)
            setCODCharge(CODCharge)
            
          }else{
            setOrderType(value.order_type.value)
            setCODCharge(0)
            setValue('amount_to_be_collected', 0.00)
            setAmountCollected(0.00)
          }
        }
  
      })
  
      return () => subscription.unsubscribe()
    }, [watch])
  
    const fetchDelivaryChargeData = (pricingPolicyId) => {
      return useJwt
        .axiosGet(getApi(DELIVARY_CHARGE_BY_PERCEL_TYPE) + pricingPolicyId + "/")
        .then((res) => {
          let delivaryChargeData = []
  
          res.data.map((data) => {
            setDelivaryCharge(data.delivary_charge)
            setCODCharge(data.cod_charge)
            setValue('delivary_charge', data.delivary_charge)
            delivaryChargeData.push({
              value: data.id,
              label: data.delivary_charge,
            })
          })
  
          return res.data
        })
        .catch((err) => console.log(err))
    }
  
    useEffect(() => {
      const subscription = watch((value, { name, type }) => {
        if (name == "pricing_policy" && type == "change") {
          fetchDelivaryChargeData(value?.pricing_policy?.value)
          console.log('pricing_policy is fffffff', value)
        }
  
      })
  
      return () => subscription.unsubscribe()
    }, [watch])
  
  
    const fetchAreaData = () => {
      return useJwt
        .axiosGet(getApi(AREAS_LIST))
        .then((res) => {
          let areaData = []
          res.data.map((data) => {
            areaData.push({ value: data.id, label: data.area_name })
          })
          setSelectboxArea(areaData)
          return res.data
        })
        .catch((err) => console.log(err))
    }
  
    const onSubmit = (data) => {
      let isFormValid = true
  
      if (!data.company_name) {
        setError("company_name", {
          type: "required",
          message: "Recipient Name is required",
        })
        isFormValid = false
      }
      if (!data.phone_number) {
        setError("phone_number", {
          type: "required",
          message: "Phone Number is required",
        })
        isFormValid = false
      }
      if (!data.address) {
        setError("address", {
          type: "required",
          message: "Delivary Address is required",
        })
        isFormValid = false
      }
      if (data.order_type.value === 'COD' && !data.amount_to_be_collected) {
        setError("amount_to_be_collected", {
          type: "required",
          message: "Amount is required",
        })
        isFormValid = false
      }
  
  
      if (!(data.product_type && data.product_type.value)) {
        setError("product_type", {
          type: "required",
          message: "Product Type is required",
        })
        isFormValid = false
      }
      if (!(data.pricing_policy && data.pricing_policy.value)) {
        setError("pricing_policy", {
          type: "required",
          message: "Percel Type is required",
        })
        isFormValid = false
      }
      if (!(data.shipment_type && data.shipment_type.value)) {
        setError("shipment_type", {
          type: "required",
          message: "Shipment Type is required",
        })
        isFormValid = false
      }
  
      if (!(data.delivary_area && data.delivary_area.value)) {
        setError("delivary_area", {
          type: "required",
          message: "Delivary Area is required",
        })
        isFormValid = false
      }
      if (!data.order_type) {
        setError("order_type", {
          type: "required",
          message: "Order Type is required",
        })
        isFormValid = false
      }
      if (!data.delivary_charge) {
        setError("delivary_charge", {
          type: "required",
          message: "Delivary Charge is required",
        })
        isFormValid = false
      }
  
      if (!isFormValid) {
        return false
      }
  
      if (
        data.company_name !== null &&
        data.phone_number !== null &&
        data.address !== null &&
        data.amount_to_be_collected !== null &&
        data.product_type.value !== null &&
        data.delivary_area.value !== null &&
        data.delivary_charge !== null &&
        data.pricing_policy.value !== null &&
        data.shipment_type.value !== null &&
        data.order_type !== null
      ) {
        let formData = {
          company_name: data.company_name,
          phone_number: data.phone_number,
          address: data.address,
          amount_to_be_collected: data.amount_to_be_collected,
          product_type: data.product_type.value,
          delivary_area: data.delivary_area.value,
          pricing_policy: data.pricing_policy.value,
          shipment_type: data.shipment_type.value,
          delivary_charge: data.delivary_charge,
          order_type: data.order_type.value,
          pickup_rider: data?.pickup_rider?.value,
          pricing_policy: data.pricing_policy.value,
        }
  
        useJwt
          .axiosPost(getApi(CREATE_ORDER_BY_AGENT), formData)
          .then((res) => {
            console.log("res", res.data)
            SwalAlert("Order Created Successfully")
            navigate("/agent/order")
          })
          .catch((err) => console.log(err))
      }
    }

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const options = []

    weekday.forEach(myFunction)

    function myFunction(value) {
        options.push({
            value: value,
            label: value,
          })
    }
  

    const handleChange = (value) => {
      console.log(`Selected: ${value}`)
    }


const [size, setSize] = useState('middle')
  const handleSizeChange = (e) => {
    setSize(e.target.value)
  }
  
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Company Setting</CardTitle>
        </CardHeader>
  
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
  
            <div class="row">
              <div class="col-lg-6">
                <div className="mb-1">
                  <Label className="form-label" for="company_name">
                    Name *
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="company_name"
                    name="company_name"
                    render={({ field }) => (
                      <Input
                        placeholder=""
                        invalid={errors.company_name && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.company_name && (
                    <span>{errors.company_name.message}</span>
                  )}
                </div>
              </div>
              <div class="col-lg-6">
                <div className="mb-1">
                  <Label className="form-label" for="phone_number">
                    Phone Number*
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="phone_number"
                    name="phone_number"
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder=""
                        invalid={errors.phone_number && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.phone_number && (
                    <span>{errors.phone_number.message}</span>
                  )}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div className="mb-1">
                  <Label className="form-label" for="email">
                    Email *
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="email"
                    name="email"
                    render={({ field }) => (
                      <Input
                        placeholder=""
                        invalid={errors.email && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.email && (
                    <span>{errors.email.message}</span>
                  )}
                </div>
              </div>
              <div class="col-lg-6">
                <div className="mb-1">
                  <Label className="form-label" for="google_map">
                    Google Map Link*
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="google_map"
                    name="google_map"
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder=""
                        invalid={errors.google_map && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.google_map && (
                    <span>{errors.google_map.message}</span>
                  )}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div className="mb-1">
                  <Label className="form-label" for="working_days">
                    Working Days *
                  </Label>
                  
                  <Select
          mode="multiple"
          size={size}
          placeholder="Please select"
        //   defaultValue={['a10', 'c12']}
          onChange={handleChange}
          style={{
            width: '100%',
          }}
          options={options}
        />


                  {errors && errors.working_days && (
                    <span>{errors.working_days.message}</span>
                  )}
                </div>
              </div>
              <div class="col-lg-6">
                <div className="mb-1">
                  <Label className="form-label" for="working_time">
                    Working Time *
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="working_time"
                    name="working_time"
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder=""
                        invalid={errors.working_time && true}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.working_time && (
                    <span>{errors.working_time.message}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-1">
              <Label className="form-label" for="address">
                Address*
              </Label>
              <Controller
                defaultValue=""
                control={control}
                id="address"
                name="address"
                render={({ field }) => (
                  <Input
                    placeholder=""
                    invalid={errors.address && true}
                    {...field}
                  />
                )}
              />
              {errors && errors.address && (
                <span>{errors.address.message}</span>
              )}
            </div>
            <div className="d-flex">
              <Button className="me-1" color="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    )
  }
  export default EditCompanySetting
  