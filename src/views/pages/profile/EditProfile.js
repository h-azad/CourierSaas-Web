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
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, PROFILE, PAYMENT_METHOD_LIST, CITIES_LIST, AREAS_LIST, GET_USER, RIDER_PROFILE_UPDATE, MARCHANT_PROFILE_UPDATE, ADMIN_EDIT } from '@src/constants/apiUrls'
import SwalAlert from "../../../components/SwalAlert"
import { useEffect, useState } from "react"
import { identity } from "../../../constants/data/identity"
import { AREAS_BY_CITY } from "../../../constants/apiUrls"
import React, { useRef } from "react"

const handleImgReset = () => {
  setAvatar(require('@src/assets/images/avatars/avatar-blank.png').default)
}


const EditProfile = () => {
  const [selectboxPaymentMethod, setSelectboxPaymentMethod] = useState([])
  const [selectboxCity, setSelectboxCity] = useState([])
  const [selectboxArea, setSelectboxArea] = useState([])
  const [userInFo, setuserInFo] = useState(null)
  const [adminInFo, setAdminInFo] = useState(null)
  const [userRole, setUserRole] = useState(null)
  // const [avatar, setAvatar] = useState(avatar)
  console.log()

  const [avatar, setAvatar] = useState()
  console.log("avatar x", avatar)

  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  let { id } = useParams()

  const fetchProfileData = () => {
    return useJwt
      .axiosGet(getApi(PROFILE))
      .then((res) => {
        setuserInFo(res.data)
        setAvatar(res?.data?.profile_picture)
      })
      .catch((err) => console.log(err))
  }

  const fetchUserData = () => {
    return useJwt
      .axiosGet(getApi(GET_USER))
      .then((res) => {
        if (res?.data?.role == null) {
          setAdminInFo(res?.data)
        } else {
          setUserRole(res?.data?.role)
          fetchProfileData()
        }
      })
      .catch((err) => console.log(err))
  }



  useEffect(() => {
    // fetchProfileData()
    fetchUserData()
  }, [])


  const navigate = useNavigate()
  const {
    reset,
    resetField,
    watch,
    control,
    setError,
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
  })

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(value, name, type)
      if (name == 'city' && type == 'change') {
        setValue('area', null)
        fetchAreaData(value.city.value)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    fetchPaymentmethodData()
    fetchCityData()
  }, [])

  const fetchPaymentmethodData = () => {
    return useJwt
      .axiosGet(getApi(PAYMENT_METHOD_LIST))
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

  const fetchCityData = () => {
    return useJwt
      .axiosGet(getApi(CITIES_LIST))
      .then((res) => {
        let cityData = []

        res.data.map(data => {
          cityData.push({ value: data.id, label: data.city_name })
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
          areaData.push({ value: data.id, label: data.area_name })
        })

        setSelectboxArea(areaData)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const onSubmit = data => {
    
    let isFormValid = true

    if (!data.full_name) {
      setError('full_name', { type: 'required', message: 'Full Name is required' })
      isFormValid = false
    }
    if (!data.contact_no) {
      setError('contact_no', { type: 'required', message: 'Contact No is required' })
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
    if (!data.city && data.city.value) {
      setError('city', { type: 'required', message: 'City is required' })
      isFormValid = false
    }
    if (data.area === null) {
      setError('area', { type: 'required', message: ' Area is required' })
      isFormValid = false
    }
    if (!data.address) {
      setError('address', { type: 'required', message: ' Address is required' })
      isFormValid = false
    }
    
    if (!isFormValid) {
      return false
    }
    

    if (data.full_name !== null && data.contact_no !== null
      && data.identity !== null && data.identity_no !== null && data.email !== null
      && data.payment_method.value !== null && data.bank_name !== null && data.bank_account_name !== null
      && data.bank_account_num !== null && data.city.value !== null && data.area.value !== null
      && data.business_name !== null && data.address !== null) {
      
      let formData = new FormData()
      Object.keys(data).forEach((key) => {
        if (key === "profile_picture") {
          if (data.profile_picture.length !== 0) {
            formData.append(key, data[key][0])
          }
        }
        else if (key === "city") {
          formData.append(key, data.city.value.id)
        }
        else if (key === "area") {
          formData.append(key, data.area.value.id)
        }
        else if (key === "payment_method") {
          formData.append(key, data.payment_method.value.id)
        }
        else if (key === "identity") {
          formData.append(key, data.identity.value)
        }

        else {
          formData.append(key, data[key])
        }
      })
      console.log('formData', formData)
      const headers = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      if (userRole === 'MARCHANT') {
        console.log('submit form', data)
        useJwt
          .axiosPatch(getApi(MARCHANT_PROFILE_UPDATE) + userInFo.id + "/", formData, headers)
          .then((res) => {
            console.log("res", res.data)
            SwalAlert("Profile Edited Successfully")
            navigate("/profile")
          })
          .catch(err => console.log(err))

      } else if (userRole === 'RIDER') {
        useJwt
          .axiosPatch(getApi(RIDER_PROFILE_UPDATE) + userInFo.id + "/", formData, headers)
          .then((res) => {
            console.log("res", res.data)
            SwalAlert("Profile Edited Successfully")
            navigate("/profile")
          })
          .catch(err => console.log(err))
      }


    }
  }


  const onSubmitAdminForm = data => {
    let isFormValid = true

    if (!data.name) {
      setError('name', { type: 'required', message: 'Full Name is required' })
      isFormValid = false
    }

    if (!isFormValid) {
      return false
    }

    if (data.name !== null) {

      let formData = new FormData()
      Object.keys(data).forEach((key) => {
        if (key === "profile_picture") {
          if (data.profile_picture.length !== 0) {
            formData.append(key, data[key][0])
          }
        }
        else {
          formData.append(key, data[key])
        }
      })
      const headers = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      console.log('form data', formData)

      useJwt
        .axiosPatch(getApi(ADMIN_EDIT) + adminInFo.id + "/", formData, headers)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Profile Edited Successfully")
          navigate("/profile")
        })
        .catch(err => console.log(err))

    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Edit Profile</CardTitle>
      </CardHeader>

      <CardBody>
        {userInFo &&
          <Form onSubmit={handleSubmit(onSubmit)}>

            <div className='d-flex'>
              <div className='me-25'>
                <img className='rounded me-50' src={avatar} alt='Generic placeholder image' height='100' width='100' />
              </div>
              <div className='d-flex align-items-end mt-75 ms-1'>
                <div>
                  <div className='mb-1'>
                    <input type="file" className="from-control" {...register('profile_picture')} />
                  </div>
                  <p className='mb-0'>Allowed JPG, GIF or PNG. Max size of 800kB</p>
                </div>
              </div>
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='full_name'>
                Full Name
              </Label>
              <Controller
                defaultValue={userInFo.full_name}
                control={control}
                id='full_name'
                name='full_name'
                render={({ field }) => <Input invalid={errors.full_name && true} {...field} />}
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
                    defaultValue={userInFo && userInFo?.contact_no}
                    control={control}
                    id='contact_no'
                    name='contact_no'
                    render={({ field }) => (
                      <Input
                        type='text'

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
                    defaultValue={userInFo && userInFo?.contact_no_two}
                    control={control}
                    id='contact_no_two'
                    name='contact_no_two'
                    render={({ field }) => (
                      <Input
                        type='text'

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
                    defaultValue={identity.find(id => id.value == userInFo.identity)}
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
                    defaultValue={userInFo.identity_no}
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
                    defaultValue={userInFo.email}
                    control={control}
                    id='email'
                    name='email'
                    render={({ field }) => (
                      <Input
                        readOnly={true}
                        type='email'
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
                    defaultValue={{ value: userInFo.payment_method, label: userInFo.payment_method.payment_method_name }}
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
                    defaultValue={userInFo.bank_name}
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
                    defaultValue={userInFo.bank_account_name}
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
                    defaultValue={userInFo.bank_account_num}
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
                    defaultValue={{ value: userInFo.city, label: userInFo.city.city_name }}
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
                    defaultValue={{ value: userInFo.area, label: userInFo.area.area_name }}
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
              <Label className='form-label' for='business_name'>
                Business Name
              </Label>
              <Controller
                defaultValue={userInFo.business_name}
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
                defaultValue={userInFo.address}
                control={control}
                id='address'
                name='address'
                render={({ field }) => <Input placeholder='Dhaka , Bangladesh' invalid={errors.address && true} {...field} />}
              />
              {errors && errors.address && <span className="invalid-feedback">{errors.address.message}</span>}

            </div>

            <div className='d-flex'>
              <Button className='me-1' color='primary' type='submit'>
                Submit
              </Button>
            </div>
          </Form>
        }

        {adminInFo &&
          <Form onSubmit={handleSubmit(onSubmitAdminForm)}>

            <div className='d-flex'>
              <div className='me-25'>
                <img className='rounded me-50' src={avatar} alt='Generic placeholder image' height='100' width='100' />
              </div>
              <div className='d-flex align-items-end mt-75 ms-1'>
                <div>
                  <div className='mb-1'>
                    <input type="file" className="from-control" {...register('profile_picture')} />
                  </div>
                  <p className='mb-0'>Allowed JPG, GIF or PNG. Max size of 800kB</p>
                </div>
              </div>
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='name'>
                Full Name
              </Label>
              <Controller
                defaultValue={adminInFo.name}
                control={control}
                id='name'
                name='name'
                render={({ field }) => <Input invalid={errors.name && true} {...field} />}
              />
              {errors && errors.name && <span className="invalid-feedback">{errors.name.message}</span>}
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
export default EditProfile

