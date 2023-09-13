

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
import { useNavigate, useParams } from "react-router-dom"
import Select from "react-select"
import classnames from "classnames"
import { useForm, Controller } from "react-hook-form"
import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  CITY_FORM_LIST,
  AREAS_BY_CITY,
  MARCHANT_PICKUP_ADDRESS
} from "@src/constants/apiUrls"
import { useEffect, useState } from "react"
import SwalAlert from "../../../components/SwalAlert"

const MerchantEditPickupAddress = () => {
  let { id } = useParams()
  const [selectboxProduct, setSelectboxCity] = useState([])
  const [selectboxArea, setSelectboxArea] = useState([])
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
  

  const fetchAddressData = (id) => {
    return useJwt
      .axiosGet(getApi(MARCHANT_PICKUP_ADDRESS + id + "/"))
      .then((res) => {
        setValue('phone', res?.data?.phone)
        setValue('street_address', res?.data?.street_address)
        setValue('city', {value: res?.data?.city?.id, label: res?.data?.city?.city_name})
        setValue('area', {value: res?.data?.area?.id, label: res?.data?.area?.area_name})
      })
      .catch((err) => console.log(err))
  }

  const fetchCityData = () => {
    return useJwt
      .axiosGet(getApi(CITY_FORM_LIST))
      .then((res) => {
  
        let cityData = []
        res.data.map((data) => {
          cityData.push({ value: data?.id, label: data?.city_name })
        })
        setSelectboxCity(cityData)
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const fetchAreaData = (productTypeId) => {

    return useJwt
      .axiosGet(getApi(AREAS_BY_CITY) + productTypeId + "/")
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

    if (!data.phone) {
      setError("phone", {
        type: "required",
        message: "Phone Number is required",
      })
      isFormValid = false
    }


    if (!(data.city && data.city.value)) {
      setError("city", {
        type: "required",
        message: "City Type is required",
      })
      isFormValid = false
    }
    if (!(data.area && data.area.value)) {
      setError("area", {
        type: "required",
        message: "Area Type is required",
      })
      isFormValid = false
    }

    if (!(data.street_address)) {
      setError("street_address", {
        type: "required",
        message: "Street Address is required",
      })
      isFormValid = false
    }

    

    if (!isFormValid) {
      return false
    }

    if (
      data.phone !== null &&
      data.city.value !== null &&
      data.area.value !== null &&
      data.street_address !== null
    ) {
      let formData = {
        phone: data.phone,
        city: data.city.value,
        area: data.area.value,
        street_address: data.street_address
      }

      const headers = {
      headers: {
        'Content-Type': 'multipart/form-data'
        }
      }

      useJwt
        .axiosPatch(getApi(MARCHANT_PICKUP_ADDRESS) + id + "/", formData, headers )
        .then((res) => {
          SwalAlert("Pickup Address Update Successfully")
          navigate("/marchant-pickup-address")
        })
        .catch(err => console.log(err))
      }
  }

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name == "city" && type == "change") {
        setSelectboxArea([])
        fetchAreaData(value.city.value)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])


  useEffect(() => {
    fetchAddressData(id)
    fetchCityData()
  }, [])


  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Pickup Address</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          
          <div class="row">
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="phone">
                  Phone Number*
                </Label>
                <Controller
                  control={control}
                  id="phone"
                  name="phone"
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder=""
                      invalid={errors.phone && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.phone && (
                  <span>{errors.phone.message}</span>
                )}
              </div>
            </div>
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="street_address">
                  Pickup Address
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="street_address"
                  name="street_address"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder=""
                      invalid={errors.street_address && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.street_address && (
                  <span>{errors.street_address.message}</span>
                )}
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="city">
                  City*
                </Label>
                <Controller
                  id="city"
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Select
                      isClearable
                      className={classnames("react-select", {
                        "is-invalid": errors.city && true,
                      })}
                      classNamePrefix="select"
                      options={selectboxProduct}
                      {...field}
                    />
                  )}
                />
                {errors && errors.city && (
                  <span className="invalid-feedback">
                    {errors.city.message}
                  </span>
                )}
              </div>
            </div>
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="area">
                  Area*
                </Label>
                <Controller
                  id="area"
                  name="area"
                  control={control}
                  render={({ field }) => (
                    <Select
                      // isClearable
                      className={classnames("react-select", {
                        "is-invalid": errors.area && true,
                      })}
                      classNamePrefix="select"
                      options={selectboxArea}
                      {...field}
                    />
                  )}
                />
                {errors && errors.area && (
                  <span className="invalid-feedback">
                    {errors.area.message}
                  </span>
                )}
              </div>
            </div>
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
export default MerchantEditPickupAddress



