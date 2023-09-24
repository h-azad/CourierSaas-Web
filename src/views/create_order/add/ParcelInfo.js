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
} from "@src/constants/apiUrls"


const AddOrder = ({ parcellInfoPropsData }) => {
  const [selectboxShipmentType, setSelectboxShipmentType] = useState([])
  const [selectboxProduct, setSelectboxProduct] = useState([])
  const [selectboxPricingPolicy, setSelectboxPricingPolicy] = useState([])

  const {
    control,
    setError,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {

    },
  })


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
      data.product_type !== null &&
      data.pricing_policy !== null &&
      data.shipment_type != null &&
      data.order_type != null

    ) {

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
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name == "product_type" && type == "change") {
        fetchPricingPolicyData(value.product_type.value)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])


  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Order</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>

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