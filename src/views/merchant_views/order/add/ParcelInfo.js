import React, { useState, useEffect } from 'react'
import Select from "react-select"
import classnames from "classnames"
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

import { useForm, Controller } from "react-hook-form"
import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  SHIPMENT_TYPE_FORM_LIST,
  PRICING_POLICY_BY_PRODUCT,
  PRODUCT_TYPE_USEING_FORM,
  MARCHANT_LIST,
  CITY_FORM_LIST,
  AREAS_BY_CITY,
  DELIVARY_CHARGE_BY_PERCEL_TYPE,
} from "@src/constants/apiUrls"


const AddOrder = ({ parcellInfoPropsData }) => {
  const [selectboxShipmentType, setSelectboxShipmentType] = useState([])
  const [selectboxProduct, setSelectboxProduct] = useState([])
  const [selectboxPricingPolicy, setSelectboxPricingPolicy] = useState([])
  const [selectboxMarchant, setSelectboxMarchant] = useState([])
  const [orderType, setOrderType] = useState()
  const [amountCollected, setAmountCollected] = useState(0)
  const [CODCharge, setCODCharge] = useState(0)
  const [delivaryCharge, setDelivaryCharge] = useState(0)
  const [selectboxCity, setSelectboxCity] = useState([])
  const [selectboxArea, setSelectboxArea] = useState([])
  const {
    control,
    resetField,
    setError,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {

    },
  })

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

        setDelivaryChargebyPercelType(res.data)
      })
      .catch((err) => console.log(err))
  }

  const fetchCityData = () => {
    return useJwt
      .axiosGet(getApi(CITY_FORM_LIST) + '?request-location=form')
      .then((res) => {
        let cityData = []

        res.data.map(data => {
          cityData.push({ value: data.id, label: data.city_name })
        })

        setSelectboxCity(cityData)
      })
      .catch(err => console.log(err))
  }

  const fetchAreaData = (cityId) => {

    return useJwt
      .axiosGet(getApi(AREAS_BY_CITY) + cityId + '/')
      .then((res) => {
        let areaData = []

        res.data.map(data => {
          areaData.push({ value: data.id, label: data.area_name })
        })

        setSelectboxArea(areaData)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const fetchMarchantData = () => {
    return useJwt
      .axiosGet(getApi(MARCHANT_LIST))
      .then((res) => {
        let marchantData = []

        res.data.data.map((data) => {
          marchantData.push({ value: data.id, label: data.full_name })
        })

        setSelectboxMarchant(marchantData)
      })
      .catch((err) => console.log(err))
  }


  const fetchShipmentTypeData = () => {
    return useJwt
      .axiosGet(getApi(SHIPMENT_TYPE_FORM_LIST))
      .then((res) => {
        let shipmenttypeData = []

        res.data.map((data) => {
          shipmenttypeData.push({ value: data.id, label: data.shipment_type })
        })

        setSelectboxShipmentType(shipmenttypeData)
      })
      .catch((err) => console.log(err))
  }

  // ?search_fields=status&search=pending
  const fetchProductData = () => {
    return useJwt
      .axiosGet(getApi(PRODUCT_TYPE_USEING_FORM))
      .then((res) => {
        let productData = []

        res.data.map((data) => {
          productData.push({ value: data.id, label: data.product_type })
        })

        setSelectboxProduct(productData)
      })
      .catch((err) => console.log(err))
  }

  const fetchPricingPolicyData = (productTypeId) => {
    return useJwt
      .axiosGet(getApi(PRICING_POLICY_BY_PRODUCT) + productTypeId + "/" + '?request-location=form')
      .then((res) => {
        let pricingData = []

        res.data.map((data) => {
          pricingData.push({ value: data.id, label: data.policy_title })
        })

        setSelectboxPricingPolicy(pricingData)
      })
      .catch((err) => console.log(err))
  }



  const onSubmit = (data) => {
    let isFormValid = true

    if (data.order_type.value === 'COD' && !data.amount_to_be_collected) {
      setError("amount_to_be_collected", {
        type: "required",
        message: "Amount is required",
      })
      isFormValid = false
    }

    if (!(data.city_area && data.city_area.value)) {
      setError("city_area", {
        type: "required",
        message: "City is required",
      })
      isFormValid = false
    }

    if (!(data.delivary_area && data.delivary_area.value)) {
      setError("delivary_area", {
        type: "required",
        message: "Delivery is required",
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
    if (!data.order_type) {
      setError("order_type", {
        type: "required",
        message: "Order Type is required",
      })
      isFormValid = false
    }

    if (!isFormValid) {
      return false
    }

    if (
      data.city_area !== null &&
      data.delivary_area !== null &&
      data.product_type !== null &&
      data.pricing_policy !== null &&
      data.shipment_type != null &&
      data.order_type != null

    ) {

      parcellInfoPropsData.setCity(data.city_area)
      parcellInfoPropsData.setArea(data.delivary_area)
      parcellInfoPropsData.setAmountCollected(data.amount_to_be_collected)
      parcellInfoPropsData.setDeliveryCharge(data.delivary_charge)
      parcellInfoPropsData.setDeliveryInstruction(data.delivery_instruction)

      parcellInfoPropsData.setOrderType(data.order_type)
      parcellInfoPropsData.setProductTypeData(data.product_type)
      parcellInfoPropsData.setPricingPolicyData(data.pricing_policy)
      parcellInfoPropsData.setShipmentTypeData(data.shipment_type)
      parcellInfoPropsData.next()
    }
  }


  useEffect(() => {
    fetchShipmentTypeData()
    fetchProductData()
    fetchMarchantData()
    fetchCityData()
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name == "product_type" && type == "change") {
        fetchPricingPolicyData(value.product_type.value)
      }

      if (name === 'order_type' && type === "change") {
        if (value.order_type.value === "COD") {
          setOrderType(value.order_type.value)
          setCODCharge(CODCharge)

        } else {
          setOrderType(value.order_type.value)
          setCODCharge(0)
          setValue('amount_to_be_collected', 0.00)
          setAmountCollected(0.00)
        }
      }
      if (name == 'city_area' && type == 'change') {
        resetField('delivary_area')
        fetchAreaData(value.city_area.value)
      }
      if (name == "pricing_policy" && type == "change") {
        fetchDelivaryChargeData(value?.pricing_policy?.value)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])


  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Parcel Info</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-1">
            <Label className="form-label" for="area">
              Shipment Type*
            </Label>
            <Controller
              id="shipment_type"
              name="shipment_type"
              defaultValue={parcellInfoPropsData?.shipmentData}
              control={control}
              render={({ field }) => (
                <Select
                  // isClearable
                  className={classnames("react-select", {
                    "is-invalid": errors.shipment_type && true,
                  })}
                  classNamePrefix="select"
                  options={selectboxShipmentType}
                  {...field}
                />
              )}
            />
            {errors && errors.shipment_type && (
              <span className="invalid-feedback">
                {errors.shipment_type.message}
              </span>
            )}
          </div>


          <div class="row">
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="order_type">
                  Order Type*
                </Label>
                <Controller
                  defaultValue={parcellInfoPropsData?.orderType}
                  control={control}
                  id="order_type"
                  name="order_type"
                  render={({ field }) => (
                    <Select
                      isClearable
                      className={classnames("react-select", {
                        "is-invalid": errors.order_type && true,
                      })}
                      classNamePrefix="select"
                      options={[
                        { value: "", label: "Select" },
                        { value: "pre-paid", label: "Pre-Paid" },
                        { value: "COD", label: "COD" },
                      ]}
                      {...field}
                    />
                  )}
                />
                {errors && errors.order_type && (
                  <span>{errors.order_type.message}</span>
                )}
              </div>
            </div>

            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="amount_to_be_collected">
                  Amount to be Collected*
                </Label>
                <Controller
                  defaultValue={parcellInfoPropsData?.amountCollected}
                  control={control}
                  id="amount_to_be_collected"
                  name="amount_to_be_collected"
                  render={({ field }) => (
                    <Input
                      type="number"
                      readOnly={orderType === 'pre-paid' ? true : false}
                      value={amountCollected}
                      // onChange={(e) => setAmountCollected(e.target.value)}
                      placeholder=""
                      invalid={errors.amount_to_be_collected && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.amount_to_be_collected && (
                  <span>{errors.amount_to_be_collected.message}</span>
                )}
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div className="mb-1">
                  <Label className="form-label" for="product_type">
                    Product Type*
                  </Label>
                  <Controller
                    id="product_type"
                    name="product_type"
                    defaultValue={parcellInfoPropsData?.productTypeData}
                    control={control}
                    render={({ field }) => (
                      <Select
                        isClearable
                        className={classnames("react-select", {
                          "is-invalid": errors.product_type && true,
                        })}
                        classNamePrefix="select"
                        options={selectboxProduct}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.product_type && (
                    <span className="invalid-feedback">
                      {errors.product_type.message}
                    </span>
                  )}
                </div>
              </div>



              <div class="col-lg-6">
                <div className="mb-1">
                  <Label className="form-label" for="area">
                    Percel Type(Pricing Policy)*
                  </Label>
                  <Controller
                    id="pricing_policy"
                    name="pricing_policy"
                    control={control}
                    defaultValue={parcellInfoPropsData?.percellTypeData}
                    render={({ field }) => (
                      <Select
                        // isClearable
                        className={classnames("react-select", {
                          "is-invalid": errors.pricing_policy && true,
                        })}
                        classNamePrefix="select"
                        options={selectboxPricingPolicy}
                        {...field}
                      />
                    )}
                  />
                  {errors && errors.pricing_policy && (
                    <span className="invalid-feedback">
                      {errors.pricing_policy.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="city_area">
                  City*
                </Label>
                <Controller
                  id="city_area"
                  name="city_area"
                  defaultValue={parcellInfoPropsData?.city}
                  control={control}
                  render={({ field }) => (
                    <Select
                      isClearable
                      className={classnames("react-select", {
                        "is-invalid": errors.city_area && true,
                      })}
                      classNamePrefix="select"
                      options={selectboxCity}
                      {...field}
                    />
                  )}
                />
                {errors && errors.city_area && (
                  <span className="invalid-feedback">
                    {errors.city_area.message}
                  </span>
                )}
              </div>
            </div>
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="delivary_area">
                  Delivary Area*
                </Label>
                <Controller
                  id="delivary_area"
                  name="delivary_area"
                  defaultValue={parcellInfoPropsData?.area}
                  control={control}
                  render={({ field }) => (
                    <Select
                      isClearable
                      className={classnames("react-select", {
                        "is-invalid": errors.delivary_area && true,
                      })}
                      classNamePrefix="select"
                      options={selectboxArea}
                      {...field}
                    />
                  )}
                />
                {errors && errors.delivary_area && (
                  <span className="invalid-feedback">
                    {errors.delivary_area.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div class="row">

            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="delivary_charge">
                  Delivary Charge*
                </Label>
                <Controller
                  defaultValue={parcellInfoPropsData?.deliveryCharge}
                  key={delivaryCharge}
                  control={control}
                  id="delivary_charge"
                  name="delivary_charge"
                  render={({ field }) => (
                    <Input
                      readOnly={true}
                      placeholder=""
                      invalid={errors.delivary_charge && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.delivary_charge && (
                  <span className="invalid-feedback">
                    {errors.delivary_charge.message}
                  </span>
                )}
              </div>
            </div>

            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="delivery_instruction">
                  Delivery Instruction
                </Label>
                <Controller
                  defaultValue={parcellInfoPropsData?.deliveryInstruction}
                  key={delivaryCharge}
                  control={control}
                  id="delivery_instruction"
                  name="delivery_instruction"
                  render={({ field }) => (
                    <Input
                      type='textarea'
                      placeholder=""
                      invalid={errors.delivery_instruction && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.delivery_instruction && (
                  <span className="invalid-feedback">
                    {errors.delivery_instruction.message}
                  </span>
                )}
              </div>
            </div>
            
          </div>


          <div className="d-flex">

            {parcellInfoPropsData.currentStep > 0 && (
              <Button className="me-1" color="primary"
                style={{
                  margin: '0 8px',
                }}
                onClick={() => parcellInfoPropsData.prev()}
              >
                Previous
              </Button>
            )}

            {parcellInfoPropsData.currentStep < parcellInfoPropsData?.stepsData?.length - 1 && (
              <Button className="me-1" color="primary" type="submit">
                Next
              </Button>
            )}


          </div>
        </Form>
      </CardBody>
    </Card>
  )
}
export default AddOrder