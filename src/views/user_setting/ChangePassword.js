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
import { getApi, CHANGE_PASSWORD, PAYMENT_METHOD_LIST, CITIES_LIST, AREAS_LIST } from '@src/constants/apiUrls'
import SwalAlert from "../../components/SwalAlert"
import { useEffect, useState } from "react"
import { identity } from "../../constants/data/identity"
import { AREAS_BY_CITY } from "../../constants/apiUrls"
import React, { useRef } from "react"
import { useDispatch } from "react-redux"
import { handleLogout } from "@store/authentication"
const UserChangePassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setErrors] = useState()
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
    }
  })

  const submitLogout = async () => {
    // console.log(e)
    await dispatch(handleLogout())
    navigate('/login')
    return true

  }


  const onSubmit = data => {
    console.log("data", data)

    let isFormValid = true

    if (!data.password) {
      setError('password', { type: 'required', message: 'Password is required' })
      isFormValid = false
    }
    if (!data.confirm_password) {
      setError('confirm_password', { type: 'required', message: 'Confirm password is required' })
      isFormValid = false
    }
    if (!data.old_password) {
      setError('old_password', { type: 'required', message: 'Old password is required' })
      isFormValid = false
    }
    if (!isFormValid) {
      return false
    }

    if (data.password !== null && data.confirm_password !== null && data.old_password !== null) {
      let formData = {
        password: data.password,
        password2: data.confirm_password,
        old_password: data.old_password,
      }
      const headers = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      useJwt
        .axiosPost(getApi(CHANGE_PASSWORD), formData, headers)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Password Change Successfully")
          submitLogout()
        })
        .catch(err => setErrors(err.response.data.old_password))

    }
  }

  console.log("errors", errors)

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Change Password</CardTitle>
      </CardHeader>
      
      <CardBody>
      {error && <h3 style={{ color: 'red'}}>{error}</h3> }
        <Form onSubmit={handleSubmit(onSubmit)}>
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


          <div class="col-lg-6">
            <div className='mb-1'>
              <Label className='form-label' for='old_password'>
                Old Password
              </Label>
              <input
                className={`form-control  ${errors.old_password ? "is-invalid" : ""}`}
                type="password"
                placeholder='******'
                {...register("old_password", {
                  required: "Old Password is required",
                })}
              />
              {errors && errors.old_password && <span className="invalid-feedback" >{errors.old_password.message}</span>}
            </div>
          </div>

          <div className='d-flex'>
            <Button className='me-1' color='primary' type="submit">
              Change Password
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card >
  )
}
export default UserChangePassword
