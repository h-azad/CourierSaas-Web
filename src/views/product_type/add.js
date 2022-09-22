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
// import { getApi, PRODUCT_TYPE_ADD, SERVICE_TYPE_LIST, SHIPMENT_TYPE_LIST } from '@src/constants/apiUrls'
import { getApi, PRODUCT_TYPE_ADD } from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import SwalAlert from "../../components/SwalAlert"
import { volumeUnit, weightUnit } from "../../constants/data/unit"

const AddProductType = () => {
  // const [selectboxService, setSelectboxService] = useState([])
  // const [selectboxShipment, setSelectboxShipment] = useState([])
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
      // service_type: {},
      // shipment_type:{}
    }
  })

  const onSubmit = data => {
    console.log("data", data)

    let isFormValid = true

    if(!data.product_type) {
      setError('product_type', { type: 'required', message: 'Product Type must be added' })
      isFormValid = false
    }
    if(!data.weight_unit) {
      setError('weight_unit', { type: 'required', message: 'Weight Unit must be added' })
      isFormValid = false
    }
    if(!data.volume_unit) {
      setError('volume_unit', { type: 'required', message: 'Volume Unit must be added' })
      isFormValid = false
    }
    if(!isFormValid) {
      return false
    }

    setData(data)
    if ( data.product_type !== null &&  data.weight_unit !== null &&  data.volume_unit !== null ) {

      let formData = {
        product_type: data.product_type,
        // service: data.service_type.value,
        // shipment: data.shipment_type.value,
        weight_unit: data.weight_unit?.value,
        volume_unit: data.volume_unit?.value,
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
            <Label className='form-label' for='product_type'>
              Product Type
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='product_type'
              name='product_type'
              render={({ field }) => <Input placeholder='Fragile' invalid={errors.product_type && true} {...field} />}
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
      </CardBody>
    </Card>
  )
}
export default AddProductType
