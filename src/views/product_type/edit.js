import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Form,
  Button,
  Label,
} from 'reactstrap'
import { Router, useNavigate, useParams } from "react-router-dom"
import Select from "react-select"
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors } from "@utils"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, PRODUCT_TYPE_EDIT, PRODUCT_TYPE_DETAILS } from '@src/constants/apiUrls'
// import { getApi, PRODUCT_TYPE_EDIT, PRODUCT_TYPE_DETAILS, SERVICE_TYPE_LIST, SHIPMENT_TYPE_LIST} from '@src/constants/apiUrls'
import { useEffect, useState } from 'react'
import SwalAlert from "../../components/SwalAlert"
import { volumeUnit, weightUnit } from "../../constants/data/unit"



const EditProductType = () => {
  const [productInfo, setProductInfo] = useState(null)
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

  let { id } = useParams()
  const navigate = useNavigate()




  useEffect(() => {
    useJwt
      .axiosGet(getApi(PRODUCT_TYPE_DETAILS) + id + "/")
      .then((res) => {
        setProductInfo(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }, [])

 

  const onSubmit = data => {

    let isFormValid = true

    if (!(data.product_type)) {
      setError('product_type', { type: 'required', message: 'Product Type must be added' })
      isFormValid = false
    }
    if (!data.weight_unit) {
      setError('weight_unit', { type: 'required', message: 'Weight Unit must be added' })
      isFormValid = false
    }
    if (!data.volume_unit) {
      setError('volume_unit', { type: 'required', message: 'Volume Unit must be added' })
      isFormValid = false
    }

    if (!isFormValid) {
      return false
    }

    if (data.product_type !== null && data.weight_unit !== null && data.volume_unit !== null) {

      let formData = {
        product_type: data.product_type,
        weight_unit: data.weight_unit?.value,
        volume_unit: data.volume_unit?.value,
        status: 'active'
      }

      useJwt
        .axiosPut(getApi(PRODUCT_TYPE_EDIT) + id + "/", formData)
        .then((res) => {
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
              {errors && errors.product_type && <span>{errors.product_type.message}</span>}
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='volume_unit'>
                Volume Unit
              </Label>
              <Controller
                id="volume_unit"
                name="volume_unit"
                defaultValue={[{value: productInfo?.volume_unit, label: productInfo?.volume_unit}]}
                control={control}
                render={({ field }) => <Select
                  isClearable
                  className={classnames('react-select', { 'is-invalid': errors.volume_unit && true })}
                  classNamePrefix='select'
                  options={volumeUnit}
                  {...field}
                />}
              />
              {errors && errors.volume_unit && <span>{errors.volume_unit.message}</span>}
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='weight_unit'>
                Weight Unit
              </Label>
              <Controller
              defaultValue={[{value: productInfo?.weight_unit, label: productInfo?.weight_unit}]}
                id="weight_unit"
                name="weight_unit"
                control={control}
                render={({ field }) => <Select
                  isClearable
                  className={classnames('react-select', { 'is-invalid': errors.weight_unit && true })}
                  classNamePrefix='select'
                  options={weightUnit}
                  {...field}
                />}
              />
              {errors && errors.weight_unit && <span>{errors.weight_unit.message}</span>}
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

