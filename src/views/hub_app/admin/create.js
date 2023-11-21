import React from "react"
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
import { getApi, ADMIN_ADD } from '@src/constants/apiUrls'
import SwalAlert from "@src/components/SwalAlert"
import { useEffect, useState } from "react"
import toast from 'react-hot-toast'


const HubAdminCreate = () => {
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
  } = useForm()



  const onSubmit = data => {
    let isFormValid = true

    if (!data.email) {
      setError('email', { type: 'required', message: 'Email is required' })
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

    if (data.email !== null && data.password !== null && data.confirm_password !== null) {

      let formData = {
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
      }

      useJwt
        .axiosPost(getApi(`${ADMIN_ADD}`), formData)
        .then((res) => {
          SwalAlert("Hub Admin Added Successfully")
          toast.success("Hub Admin Added Successfully")
          navigate("/hub/admin/")
        })
        .catch(err => {
          toast.error(err?.message)
          setResponseError(err?.message)
        })
    }
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Hub Admin</CardTitle>
      </CardHeader>

      <CardBody>
        {responseError && <h3 style={{ color: 'red' }}>{responseError}</h3>}

        <Form onSubmit={handleSubmit(onSubmit)}>
          
          <div className='mb-1'>
            <Label className='form-label' for='email'>
              Email
            </Label>
            <Controller
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
export default HubAdminCreate
