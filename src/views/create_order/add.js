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
import { getApi, CREATE_ORDER_ADD, PRODUCT_TYPE_LIST } from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import SwalAlert from "../../components/SwalAlert"

const AddCreateOrder = () => {
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
      create_order: '',
      // product_type: {},   

    }
  })

  // useEffect(() => {
  //   fetchCreateOrderData()
  // },[])

  // const fetchProductData = () => {
  //   return useJwt
  //     .axiosGet(getApi(PRODUCT_TYPE_LIST))
  //     .then((res) => {
  //       let productData = []

  //       res.data.map(data => {
  //         productData.push({value: data.id, label: data.product_type})
  //       })

  //       setSelectboxProduct(productData)
  //       return res.data
  //     })
  //     .catch(err => console.log(err))
  // }

  const onSubmit = data => {
    console.log("data", data)

    let isFormValid = true

    if(!data.marchant_name) {
      setError('marchant_name', { type: 'required', message: 'Marchant Name is required' })
      isFormValid = false
    }

    if(!(data.product_type && data.product_type.value)) {
      setError('product_type', { type: 'required', message: 'Product Type is required' })
      isFormValid = false
    }
    if(!data.recipient_name) {
      setError('recipient_name', { type: 'required', message: 'Recipient Name is required' })
      isFormValid = false
    } 
    if(!data.min_dimention) {
      setError('min_dimention', { type: 'required', message: 'Min Dimention is required' })
      isFormValid = false
    } 
    if(!data.max_dimention) {
      setError('max_dimention', { type: 'required', message: 'Max Dimention is required' })
      isFormValid = false
    } 
    if(!data.amount_to_be_collected) {
      setError('amount_to_be_collected', { type: 'required', message: 'Amount is required' })
      isFormValid = false
    } 
    if(!data.dimention) {
      setError('dimention', { type: 'required', message: 'Additional Charge is required' })
      isFormValid = false
    } 
    if(!data.delivary_area) {
      setError('delivary_area', { type: 'required', message: 'Per Dimention is required' })
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
    {

      let formData = {
        marchant_name: data.marchant_name,
        product: data.product_type.value,
        recipient_name: data.recipient_name,
        phone_number: data.phone_number,
        delivary_address: data.delivary_address,
        amount_to_be_collected: data.amount_to_be_collected,
        dimention: data.dimention,
        delivary_area: data.delivary_area,
        delivary_charge: data.delivary_charge,
        status: 'active'
      }

      console.log("formData", formData)

      useJwt
        .axiosPost(getApi(CREATE_ORDER_ADD), formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Pricing Policy Added Successfully")
          navigate("/create_order")
        })
        .catch(err => console.log(err))

    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Order</CardTitle>
      </CardHeader>

      <CardBody>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
            <Label className='form-label' for='marchant_name'>
              Marchant Name
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='marchant_name'
              name='marchant_name'
              render={({ field }) => <Input placeholder='' invalid={errors.marchant_name && true} {...field} />}
            />
            {errors && errors.marchant_name && <span>{errors.marchant_name.message}</span>}
          </div>

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

          <div class="row">
            <div class="col-lg-4">
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
            <div class="col-lg-4">
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
            </div>
            <div class="col-lg-4">
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
            </div>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='dimention'>
            Dimention
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='dimention'
              name='dimention'
              render={({ field }) => <Input placeholder='' invalid={errors.dimention && true} {...field} />}
            />
            {errors && errors.dimention && <span>{errors.dimention.message}</span>}
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='delivary_area'>
           Delivary Area
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='delivary_area'
              name='delivary_area'
              render={({ field }) => <Input placeholder='' invalid={errors.delivary_area && true} {...field} />}
            />
            {errors && errors.delivary_area && <span>{errors.delivary_area.message}</span>}
          </div>
          
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
export default AddCreateOrder
