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
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, AGENT_ADD,PAYMENT_METHOD_LIST,CITIES_LIST,AREAS_LIST } from '@src/constants/apiUrls'
import SwalAlert from "../../components/SwalAlert"
import { useEffect, useState } from "react"
import {identity } from "../../constants/data/identity"
import { AREAS_BY_CITY } from "../../constants/apiUrls"
import React, { useRef } from "react"


const AddAgent = () => {
  const [selectboxPaymentMethod, setSelectboxPaymentMethod] = useState([])
  const [selectboxCity, setSelectboxCity] = useState([])
  const [selectboxArea, setSelectboxArea] = useState([])
  const [data, setData] = useState(null)


  const navigate = useNavigate()
  const {
    reset,
    resetField,
    watch,
    control,
    setError,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      payment_method: {},
      city: {}, 
      area: {},
    }
  })

  useEffect(() => {
    const subscription = watch((value, { name, type }) => { 
      console.log(value, name, type)
      if(name == 'city' && type=='change'){
        resetField('area')
        fetchAreaData(value.city.value)
      }
    })
    
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    fetchPaymentmethodData()
    fetchCityData()
  },[])

  const fetchPaymentmethodData = () => {
    return useJwt
      .axiosGet(getApi(PAYMENT_METHOD_LIST))
      .then((res) => {
        let paymentmethodData = []

        res.data.map(data => {
          paymentmethodData.push({value: data.id, label: data.method_name})
        })

        setSelectboxPaymentMethod(paymentmethodData)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const fetchCityData = () => {
    return useJwt
      .axiosGet(getApi(CITIES_LIST))
      .then((res) => {
        let cityData = []

        res.data.map(data => {
          cityData.push({value: data.id, label: data.cities_name})
        })

        setSelectboxCity(cityData)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const fetchAreaData = (cityId) => {

    return useJwt
      .axiosGet(getApi(AREAS_BY_CITY) + cityId + '/')
      .then((res) => {
        let areaData = []

        res.data.map(data => {
          areaData.push({value: data.id, label: data.areas_name})
        })

        setSelectboxArea(areaData)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const onSubmit = data => {
    console.log("data", data)

    let isFormValid = true

    if(!data.full_name) {
      setError('full_name', { type: 'required', message: 'Full Name is required' })
      isFormValid = false
    }
    if(!data.contact_no) {
      setError('contact_no', { type: 'required', message: 'Contact No is required' })
      isFormValid = false
    }
    if(!data.contact_optional) {
      setError('contact_optional', { type: 'required', message: 'Contact (Optional) is required' })
      isFormValid = false
    }
    if(!data.identity) {
      setError('identity', { type: 'required', message: 'Identity is required' })
      isFormValid = false
    }
    if(!data.identity_no) {
      setError('identity_no', { type: 'required', message: 'Identity No is required' })
      isFormValid = false
    }
    if(!data.email) {
      setError('email', { type: 'required', message: 'Email is required' })
      isFormValid = false
    }
    if(!data.payment_method && data.payment_method.value ) {
      setError('payment_method', { type: 'required', message: 'Payment method is required' })
      isFormValid = false
    }
    if(!data.bank_name) {
      setError('bank_name', { type: 'required', message: 'Bank Name is required' })
      isFormValid = false
    }
    if(!data.bank_account_name) {
      setError('bank_account_name', { type: 'required', message: ' Bank Account Name is required' })
      isFormValid = false
    }
    if(!data.bank_account_num) {
      setError('bank_account_num', { type: 'required', message: 'Bank account number is required' })
      isFormValid = false
    }
    if(!data.city && data.city.value) {
      setError('city', { type: 'required', message: 'City is required' })
      isFormValid = false
    }
    if(!data.area && data.area.value) {
      setError('area', { type: 'required', message: ' Area is required' })
      isFormValid = false
    }
    // if(!data.business_name) {
    //   setError('business_name', { type: 'required', message: ' Business name is required' })
    //   isFormValid = false
    // }
    if(!data.address) {
      setError('address', { type: 'required', message: ' Address is required' })
      isFormValid = false
    }
    // if(!data.pickup_address) {
    //   setError('pickup_address', { type: 'required', message: 'Pickup address is required' })
    //   isFormValid = false
    // }
    if(!data.password) {
      setError('password', { type: 'required', message: 'Password is required' })
      isFormValid = false
    }
    if(!data.confirm_password) {
      setError('confirm_password', { type: 'required', message: 'Confirm password is required' })
      isFormValid = false
    }
    if(!isFormValid) {
      return false
    }


    setData(data)
    if ( data.full_name !== null &&  data.contact_no !== null &&  data.contact_no_two !== null 
      && data.identity !== null &&  data.identity_no !== null &&  data.email !== null
      && data.payment_method.value !== null &&  data.bank_name !== null &&  data.bank_account_name !== null 
      && data.bank_account_num !== null &&  data.city.value !== null &&  data.area.value!== null
      && data.address !== null && data.password !== null &&  data.confirm_password !== null  ) {


    // if (Object.values(data).every(field => field.length > 0)) {
      let formData = {
        full_name: data.full_name,
        contact_no: data.contact_no,
        contact_optional: data.contact_optional,
        identity: data.identity?.value,
        identity_no: data.identity_no,
        email: data.email,
        payment_method: data.payment_method.value,
        bank_name: data.bank_name,
        bank_account_name: data.bank_account_name,
        bank_account_num: data.bank_account_num,
        city: data.city.value,
        area: data.area.value,
        address: data.address,
        password: data.password,
        confirm_password: data.confirm_password,
        status: 'active'
      }
      console.log("formData", formData)
      // return false
      useJwt
        .axiosPost(getApi(AGENT_ADD), formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Agent Added Successfully")
          navigate("/agent")
        })
        .catch(err => console.log(err))

    }
  }

  console.log("errors", errors)

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Agent</CardTitle>
      </CardHeader>

      <CardBody>
      <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
            <Label className='form-label' for='full_name'>
              Full Name
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='full_name'
              name='full_name'
              render={({ field }) => <Input placeholder='Bruce Wayne' invalid={errors.full_name && true} {...field} />}
            />
            {errors && errors.full_name && <span className="invalid-feedback">{errors.full_name.message}</span>}
          </div>
          <div class="row">
            <div class="col-lg-6">
            <div className='mb-1'>
            <Label className='form-label' for='contact_no'>
            Contact Number 1*
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='contact_no'
              name='contact_no'
              render={({ field }) => (
                <Input
                  type='text'
                  placeholder='017XXXXXXXXX'
                  invalid={errors.contact_no && true}
                  {...field}
                />
                
              )}
            />
            {errors && errors.contact_no && <span className="invalid-feedback">{errors.contact_no.message}</span>}
          </div>
            </div>
            <div class="col-lg-6">
            <div className='mb-1'>
            <Label className='form-label' for='contact_optional'>
            Contact (Optional)
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='contact_optional'
              name='contact_optional'
              render={({ field }) => (
                <Input
                  type='text'
                  placeholder='017XXXXXXXXX'
                  invalid={errors.contact_optional && true}
                  {...field}
                />
              )}
            />
            {errors && errors.contact_optional && <span className="invalid-feedback">{errors.contact_optional.message}</span>}
          </div>
            </div>
            
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='identity'>
                Identity
                </Label>
                <Controller
                   id='identity'
                   name='identity'
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
                    className={classnames('react-select', { 'is-invalid': errors.identity && true })} 
                    classNamePrefix='select'
                    options={identity} 
                    {...field} 
                  />}
                />
                {errors && errors.identity && <span className="invalid-feedback">{errors.identity.message}</span>}
              </div>
            </div>
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='identity_no'>
                Identity No *
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='identity_no'
                  name='identity_no'
                  render={({ field }) => <Input placeholder='' invalid={errors.identity_no && true} {...field} />}
                />
                {errors && errors.identity_no && <span className="invalid-feedback">{errors.identity_no.message}</span>}
              </div>
            </div>
            
          </div>
          <div class="row">
            <div class="col-lg-6">
            <div className='mb-1'>
            <Label className='form-label' for='email'>
              Email
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='email'
              name='email'
              render={({ field }) => (
                <Input
                  type='email'
                  placeholder='bruce.wayne@email.com'
                  invalid={errors.email && true}
                  {...field}
                />
              )}
            />
            {errors && errors.email && <span className="invalid-feedback">{errors.email.message}</span>}

          </div>
            </div>
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='payment_method'>
                Preferred Payment Method*
                </Label>
                <Controller
                  id="payment_method"
                  name="payment_method"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
                    className={classnames('react-select', { 'is-invalid': errors.payment_method && true })} 
                    classNamePrefix='select'
                    options={selectboxPaymentMethod} 
                    {...field} 
                  />}
                />
                {errors && errors.payment_method && <span className="invalid-feedback">{errors.payment_method.message}</span>}
              </div>
            </div>
            
          </div>
          <div class="row">
            <div class="col-lg-4">
              <div className='mb-1'>
                <Label className='form-label' for='bank_name'>
                Bank Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='bank_name'
                  name='bank_name'
                  render={({ field }) => <Input placeholder='Bank Name' invalid={errors.bank_name && true} {...field} />}
                />
                {errors && errors.bank_name && <span className="invalid-feedback">{errors.bank_name.message}</span>}
              </div>
            </div>
            <div class="col-lg-4">
              <div className='mb-1'>
                <Label className='form-label' for='bank_account_name'>
                Bank Account Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='bank_account_name'
                  name='bank_account_name'
                  render={({ field }) => <Input placeholder='Bank Account Name' invalid={errors.bank_account_name && true} {...field} />}
                />
                {errors && errors.bank_account_name && <span className="invalid-feedback">{errors.bank_account_name.message}</span>}
              </div>
            </div>
            <div class="col-lg-4">
              <div className='mb-1'>
                <Label className='form-label' for='bank_account_num'>
                Account Number
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='bank_account_num'
                  name='bank_account_num'
                  render={({ field }) => <Input placeholder='Account Number' invalid={errors.bank_account_num && true} {...field} />}
                />
                {errors && errors.bank_account_num && <span className="invalid-feedback">{errors.bank_account_num.message}</span>}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
            <div className='mb-1'>
            <Label className='form-label' for='city'>
              City Name
            </Label>
            <Controller
                  id="city"
                  name="city"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
                    className={classnames('react-select', { 'is-invalid': errors.city && true })} 
                    classNamePrefix='select'
                    options={selectboxCity} 
                    {...field} 
                  />}
                />
            {errors && errors.city && <span className="invalid-feedback">{errors.city.message}</span>}

          </div>
            </div>
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='area'>
                Area Name
                </Label>
                <Controller
                  id="area"
                  name="area"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
                    className={classnames('react-select', { 'is-invalid': errors.area && true })} 
                    classNamePrefix='select'
                    options={selectboxArea} 
                    {...field} 
                  />}
                />
                {errors && errors.area && <span className="invalid-feedback">{errors.area.message}</span>}

              </div>
            </div>
            
          </div>        
          <div className='mb-1'>
            <Label className='form-label' for='address'>
              Address
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='address'
              name='address'
              render={({ field }) => <Input placeholder='Dhaka , Bangladesh' invalid={errors.address && true} {...field} />}
            />
            {errors && errors.address && <span className="invalid-feedback">{errors.address.message}</span>}

          </div>
          <div class="row">
            <div class="col-lg-6">
            <div className='mb-1'>
            <Label className='form-label' for='password'>
              Password
            </Label>
            <input
                className={`form-control  ${errors.password ? "is-invalid" : ""}`}
                type="password"
                {...register("password", {
                  required: "You must specify a password",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters"
                  }
                })}
                placeholder='******'
                invalid={errors.password && true}
          
              />
            {errors && errors.password && <span className="invalid-feedback">{errors.password.message}</span>}

          </div>
            </div>
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='confirm_password'>
                Confirm Password
                </Label>
                <input
                    className={`form-control  ${errors.confirm_password ? "is-invalid" : ""}`}
                    type="password"
                    placeholder='******'
                    {...register("confirm_password", {
                      required: "Confirm Password is required",
                      validate: (value) => value === watch('password') || "Password not match"
                    })}
                  />
                {errors && errors.confirm_password && <span className="invalid-feedback" >{errors.confirm_password.message}</span>}
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
export default AddAgent




// // ** Reactstrap Imports
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardBody,
//   Row,
//   Col,
//   Input,
//   Form,
//   Button,
//   Label,
// } from "reactstrap"
// import { useNavigate } from "react-router-dom"
// import Select from "react-select"
// import toast from 'react-hot-toast'
// import { useForm, Controller } from 'react-hook-form'
// import { selectThemeColors } from "@utils"
// import useJwt from '@src/auth/jwt/useJwt'
// import { getApi, AGENT_ADD } from '@src/constants/apiUrls'
// import ToastContent from "../../components/ToastContent"
// import SwalAlert from "../../components/SwalAlert"


// const AddAgent = () => {
//   const navigate = useNavigate()
//   const {
//     reset,
//     control,
//     setError,
//     handleSubmit,
//     formState: { errors }
//   } = useForm()
  
//   const onSubmit = data => {
//     if (Object.values(data).every(field => field.length > 0)) {
//       let formData = {
//         user_name: data.user_name,
//         email: data.email,
//         phone_number: data.phone_number,
//         address: data.address,
//         status: 'active'
//       }

//       useJwt
//         .axiosPost(getApi(AGENT_ADD), formData)
//         .then((res) => {
//           console.log("res", res.data)
//           // handleReset()
//           // toast(t => (
//           //   <ToastContent t={t} type='SUCCESS' message={'Agent Added Successfully'} />
//           // ))
//           SwalAlert("Agent Added Successfully")
//           navigate("/agent")
//         })
//         .catch(err => console.log(err))

//       // console.log(formData)
//     } else {
//       for (const key in data) {
//         if (data[key].length === 0) {
//           setError(key, {
//             type: 'manual'
//           })
//         }
//       }
//     }
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle tag="h4">Add Agent</CardTitle>
//       </CardHeader>

//       <CardBody>
//       <Form onSubmit={handleSubmit(onSubmit)}>
//           <div className='mb-1'>
//             <Label className='form-label' for='firstNameBasic'>
//               Full Name
//             </Label>
//             <Controller
//               defaultValue=''
//               control={control}
//               id='user_name'
//               name='user_name'
//               render={({ field }) => <Input placeholder='Bruce Wayne' invalid={errors.user_name && true} {...field} />}
//             />
//           </div>
          
//           <div className='mb-1'>
//             <Label className='form-label' for='emailBasic'>
//               Email
//             </Label>
//             <Controller
//               defaultValue=''
//               control={control}
//               id='email'
//               name='email'
//               render={({ field }) => (
//                 <Input
//                   type='email'
//                   placeholder='bruce.wayne@email.com'
//                   invalid={errors.email && true}
//                   {...field}
//                 />
//               )}
//             />
//           </div>
//           <div className='mb-1'>
//             <Label className='form-label' for='emailBasic'>
//               Mobile
//             </Label>
//             <Controller
//               defaultValue=''
//               control={control}
//               id='phone_number'
//               name='phone_number'
//               render={({ field }) => (
//                 <Input
//                   type='text'
//                   placeholder='017XXXXXXXXX'
//                   invalid={errors.phone_number && true}
//                   {...field}
//                 />
//               )}
//             />
//           </div>
//           <div className='mb-1'>
//             <Label className='form-label' for='firstNameBasic'>
//              Address
//             </Label>
//             <Controller
//               defaultValue=''
//               control={control}
//               id='address'
//               name='address'
//               render={({ field }) => <Input placeholder='Dhaka, Bangladessh' invalid={errors.address && true} {...field} />}
//             />
//           </div>
//           <div className='d-flex'>
//             <Button className='me-1' color='primary' type='submit'>
//               Submit
//             </Button>
//           </div>
//         </Form>
//       </CardBody>
//     </Card>
//   )
// }
// export default AddAgent
