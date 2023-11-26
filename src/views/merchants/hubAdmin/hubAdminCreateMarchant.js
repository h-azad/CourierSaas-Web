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
import { getApi, MARCHANT_ADD, PAYMENT_METHOD_FORM_LIST, CITY_FORM_LIST, AREAS_BY_CITY } from '@src/constants/apiUrls'
import SwalAlert from "@src/components/SwalAlert"
import { useEffect, useState } from "react"
import { identity } from "@src/constants/data/identity"
import React, { useRef } from "react"
import toast from 'react-hot-toast'


const HubAdminCreateMerchant = () => {
  const [selectboxPaymentMethod, setSelectboxPaymentMethod] = useState([])
  const [selectboxCity, setSelectboxCity] = useState([])
  const [selectboxArea, setSelectboxArea] = useState([])
  const [data, setData] = useState(null)
  const [responseError, setResponseError] = useState()


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
    fetchPaymentmethodData()
  }, [])

  const fetchPaymentmethodData = () => {
    return useJwt
      .axiosGet(getApi(PAYMENT_METHOD_FORM_LIST) + '?request-location=form')
      .then((res) => {
        let paymentmethodData = []

        res.data.map(data => {
          paymentmethodData.push({ value: data.id, label: data.payment_method_name })
        })

        setSelectboxPaymentMethod(paymentmethodData)
        return res.data
      })
      .catch(err => console.log(err))
  }


  const onSubmit = data => {

    let isFormValid = true

    if (!data.name) {
      setError('name', { type: 'required', message: 'Full Name is required' })
      isFormValid = false
    }
    if (!data.contact_no) {
      setError('contact_no', { type: 'required', message: 'Contact No is required' })
      isFormValid = false
    }
    if (!data.contact_no_two) {
      setError('contact_no_two', { type: 'required', message: 'Contact No 2 is required' })
      isFormValid = false
    }
    if (!data.identity) {
      setError('identity', { type: 'required', message: 'Identity is required' })
      isFormValid = false
    }
    if (!data.identity_no) {
      setError('identity_no', { type: 'required', message: 'Identity No is required' })
      isFormValid = false
    }
    if (!data.email) {
      setError('email', { type: 'required', message: 'Email is required' })
      isFormValid = false
    }
    if (!data.payment_method && data.payment_method.value) {
      setError('payment_method', { type: 'required', message: 'Payment method is required' })
      isFormValid = false
    }
    if (!data.bank_name) {
      setError('bank_name', { type: 'required', message: 'Bank Name is required' })
      isFormValid = false
    }
    if (!data.bank_account_name) {
      setError('bank_account_name', { type: 'required', message: ' Bank Account Name is required' })
      isFormValid = false
    }
    if (!data.bank_account_num) {
      setError('bank_account_num', { type: 'required', message: 'Bank account number is required' })
      isFormValid = false
    }

    if (!data.business_name) {
      setError('business_name', { type: 'required', message: ' Business name is required' })
      isFormValid = false
    }
    if (!data.address) {
      setError('address', { type: 'required', message: ' Address is required' })
      isFormValid = false
    }

    if (!data.password) {
      setError('password', { type: 'required', message: 'Password is required' })
      isFormValid = false
    }
    if (!data.confirm_password) {
      setError('confirm_password', { type: 'required', message: 'Confirm password is required' })
      isFormValid = false
    }
    if (!isFormValid) {
      return false
    }


    setData(data)
    if (data.name !== null && data.contact_no !== null && data.contact_no_two !== null
      && data.identity !== null && data.identity_no !== null && data.email !== null
      && data.payment_method.value !== null && data.bank_name !== null && data.bank_account_name !== null
      && data.bank_account_num !== null
      && data.business_name !== null && data.address !== null
      && data.password !== null && data.confirm_password !== null) {


      // if (Object.values(data).every(field => field.length > 0)) {
      let formData = {
        name: data.name,
        contact_no: data.contact_no,
        contact_no_two: data.contact_no_two,
        identity: data.identity?.value,
        identity_no: data.identity_no,
        email: data.email,
        payment_method: data.payment_method.value,
        bank_name: data.bank_name,
        bank_account_name: data.bank_account_name,
        bank_account_num: data.bank_account_num,
        business_name: data.business_name,
        address: data.address,
        // pickup_address: data.pickup_address,
        password: data.password,
        confirm_password: data.confirm_password,
        status: 'approved',
        is_active: true
      }
      // return false
      const headers = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      useJwt
        .axiosPost(getApi(MARCHANT_ADD), formData, headers)

        .then((res) => {
          SwalAlert("Marchant Added Successfully")
          toast.success("Marchant Added Successfully")
          navigate("/merchants")
        })
        .catch(err => {
          toast.error(err?.response?.data?.message)
          setResponseError(err?.response?.data?.message)
          // err?.response?.data?.message.startsWith('duplicate key value violates unique constraint "account_user_email_key"' ?
          //   setError('email', { message: 'This email already exists' }) :
          //   setError(err)
          // )
        })

    }
    // else {
    //   for (const key in data) {
    //     console.log(key, data[key])
    //     if (data?.[key]?.length === 0) {
    //       setError(key, {
    //         type: 'requred'
    //       })
    //     }
    //   }
    // }
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Merchant</CardTitle>
      </CardHeader>

      <CardBody>
        {responseError && <h3 style={{ color: 'red' }}>{responseError}</h3>}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
            <Label className='form-label' for='name'>
              Name
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='name'
              name='name'
              render={({ field }) => <Input required={true} placeholder='Bruce Wayne' invalid={errors.name && true} {...field} />}
            />
            {errors && errors.name && <span className="invalid-feedback">{errors.name.message}</span>}
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='contact_no'>
                  Contact Number
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='contact_no'
                  name='contact_no'
                  render={({ field }) => (
                    <Input
                      required={true}
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
                <Label className='form-label' for='contact_no_two'>
                  Contact Number 2*
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='contact_no_two'
                  name='contact_no_two'
                  render={({ field }) => (
                    <Input
                      type='text'
                      placeholder='017XXXXXXXXX'
                      invalid={errors.contact_no_two && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.contact_no_two && <span className="invalid-feedback">{errors.contact_no_two.message}</span>}
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
                  render={({ field }) => <Input required={true} placeholder='1542****' invalid={errors.identity_no && true} {...field} />}
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
                      required={true}
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
                    className={classnames('react-select', { 'is-invalid': errors.payment_method && errors.payment_method.value && true })}
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
                  render={({ field }) => <Input required={true} placeholder='Bank Name' invalid={errors.bank_name && true} {...field} />}
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
                  defaultValue='Savings'
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

          <div className='mb-1'>
            <Label className='form-label' for='business_name'>
              Business Name
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='business_name'
              name='business_name'
              render={({ field }) => <Input placeholder='Test Shop' invalid={errors.business_name && true} {...field} />}
            />
            {errors && errors.business_name && <span className="invalid-feedback">{errors.business_name.message}</span>}

          </div>
          <div className='mb-1'>
            <Label className='form-label' for='address'>
              Address
            </Label>
            <Controller
              required={true}
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
export default HubAdminCreateMerchant
