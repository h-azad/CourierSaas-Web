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
import { useNavigate , useParams} from "react-router-dom"
import Select from "react-select"
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, PRICING_POLICY_EDIT,PRICING_POLICY_DETAILS, PRODUCT_TYPE_LIST } from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import SwalAlert from "../../components/SwalAlert"

const EditPricingPolicy = () => {
  const [selectboxProduct, setSelectboxProduct] = useState([])
  const [data, setData] = useState(null)
  const [pricingInfo, setPricingInfo] = useState(null)

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
      pricing_policy: '',
      product_type: {},   

    }
  })
  
  let { id } = useParams()

  useEffect(() => {
    console.log(id)
    useJwt
      .axiosGet(getApi(PRICING_POLICY_DETAILS) + id + "/")
      .then((res) => {
        console.log("res", res.data)
        setPricingInfo(res.data)
        console.log(identity.find(id => id.value == pricingInfo.identity))
        return res.data
      })
      .catch(err => console.log(err))
      
  }, [])
  

  useEffect(() => {
    fetchProductData()
  },[])

  const fetchProductData = () => {
    return useJwt
      .axiosGet(getApi(PRODUCT_TYPE_LIST) + '?request-location=form')
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

    if(!(data.product && data.product.value)) {
      setError('product', { type: 'required', message: 'Product Type is required' })
      isFormValid = false
    }

    if(!data.policy_title) {
      setError('policy_title', { type: 'required', message: 'Policy Title is required' })
      isFormValid = false
    }
    
    if(!data.delivary_charge) {
      setError('delivary_charge', { type: 'required', message: 'Delivary Charge is required' })
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
    if(!data.max_weight) {
      setError('max_weight', { type: 'required', message: 'Max Weight is required' })
      isFormValid = false
    } 
    if(!data.additional_charge) {
      setError('additional_charge', { type: 'required', message: 'Additional Charge is required' })
      isFormValid = false
    } 
    if(!data.per_dimention) {
      setError('per_dimention', { type: 'required', message: 'Per Dimention is required' })
      isFormValid = false
    } 
    if(!data.cod_charge) {
      setError('cod_charge', { type: 'required', message: 'COD Charge is required' })
      isFormValid = false
    }
   
    if(!isFormValid) {
      return false
    }

    setData(data)
    {

      let formData = {
        policy_title: data.policy_title,
        product: data.product.value,
        delivary_charge: data.delivary_charge,
        min_dimention: data.min_dimention,
        max_dimention: data.max_dimention,
        max_weight: data.max_weight,
        additional_charge: data.additional_charge,
        per_dimention: data.per_dimention,
        cod_charge: data.cod_charge,
        status: 'active'
      }

      console.log("formData", formData)
//asiosGet method change korte hbe 
      useJwt
        .axiosGet(getApi(PRICING_POLICY_EDIT), formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Pricing Policy Edited Successfully")
          navigate("/pricing_policy")
        })
        .catch(err => console.log(err))

    }
  }
  

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Edit Pricing Policy</CardTitle>
      </CardHeader>

      <CardBody>
      {pricingInfo &&
      <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
              <Label className='form-label' for='product_type'>
                 Product Type
              </Label>
              <Controller
                defaultValue={{ value: pricingInfo.product.id, label: pricingInfo.product.product_type}}
                  id="product"
                  name="product"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
                    className={classnames('react-select', { 'is-invalid': errors.product && true })} 
                    classNamePrefix='select'
                    options={selectboxProduct} 
                    {...field} 
                  />}
                />
              {errors && errors.product && <span>{errors.product.message}</span>}
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='policy_title'>
              Policy Title
            </Label>
            <Controller
                defaultValue={pricingInfo.policy_title}
              control={control}
              id='policy_title'
              name='policy_title'
              render={({ field }) => <Input placeholder='' invalid={errors.policy_title && true} {...field} />}
            />
            {errors && errors.policy_title && <span>{errors.policy_title.message}</span>}
          </div>

          <div className='mb-1'>
            <Label className='form-label' for='delivary_charge'>
              Delivary Charge
            </Label>
            <Controller
                defaultValue={pricingInfo.delivary_charge}
              control={control}
              id='delivary_charge'
              name='delivary_charge'
              render={({ field }) => <Input type="number" placeholder='' invalid={errors.delivary_charge && true} {...field} />}
            />
            {errors && errors.delivary_charge && <span>{errors.delivary_charge.message}</span>}
          </div>

          <div class="row">
            <div class="col-lg-4">
              <div className='mb-1'>
                <Label className='form-label' for='min_dimention'>
                Min Dimension
                </Label>
                <Controller
                    defaultValue={pricingInfo.min_dimention}
                  control={control}
                  id='min_dimention'
                  name='min_dimention'
                  render={({ field }) => <Input type="number" placeholder='' invalid={errors.min_dimention && true} {...field} />}
                />
                {errors && errors.min_dimention && <span>{errors.min_dimention.message}</span>}
              </div>
            </div>
            <div class="col-lg-4">
              <div className='mb-1'>
                <Label className='form-label' for='max_dimention'>
                Max Dimension
                </Label>
                <Controller
                    defaultValue={pricingInfo.max_dimention}
                  control={control}
                  id='max_dimention'
                  name='max_dimention'
                  render={({ field }) => <Input type="number" placeholder='' invalid={errors.max_dimention && true} {...field} />}
                />
                {errors && errors.max_dimention && <span>{errors.max_dimention.message}</span>}
              </div>
            </div>
            <div class="col-lg-4">
              <div className='mb-1'>
                <Label className='form-label' for='max_weight'>
                Max Weight / KG
                </Label>
                <Controller
                    defaultValue={pricingInfo.max_weight}
                  control={control}
                  id='max_weight'
                  name='max_weight'
                  render={({ field }) => <Input type="number" placeholder='' invalid={errors.max_weight && true} {...field} />}
                />
                {errors && errors.max_weight && <span>{errors.max_weight.message}</span>}
              </div>
            </div>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='additional_charge'>
            Addition Charge
            </Label>
            <Controller
                defaultValue={pricingInfo.additional_charge}
              control={control}
              id='additional_charge'
              name='additional_charge'
              render={({ field }) => <Input type="number" placeholder='' invalid={errors.additional_charge && true} {...field} />}
            />
            {errors && errors.additional_charge && <span>{errors.additional_charge.message}</span>}
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='per_dimention'>
            Shipping Charge
            </Label>
            <Controller
                defaultValue={pricingInfo.per_dimention}
              control={control}
              id='per_dimention'
              name='per_dimention'
              render={({ field }) => <Input type="number" placeholder='' invalid={errors.per_dimention && true} {...field} />}
            />
            {errors && errors.per_dimention && <span>{errors.per_dimention.message}</span>}
          </div>
          
          <div className='mb-1'>
            <Label className='form-label' for='cod_charge'>
            COD Charge (%)
            </Label>
            <Controller
                defaultValue={pricingInfo.cod_charge}
              control={control}
              id='cod_charge'
              name='cod_charge'
              render={({ field }) => <Input type="number" placeholder='' invalid={errors.cod_charge && true} {...field} />}
            />
            {errors && errors.cod_charge && <span>{errors.cod_charge.message}</span>}
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
export default EditPricingPolicy
