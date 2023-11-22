// ** Reactstrap Imports
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
import { getApi, ADMIN_ADD, ADMIN_ROLE } from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import SwalAlert from "../../components/SwalAlert"
import toast from 'react-hot-toast'

const AddAdmin = () => {
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  const [adminRoleData, setAdminRoleData] = useState([])
  const [responseError, setResponseError] = useState()
  const {
    control,
    setError,
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({

  })

  const fetchAdminRoleData = () => {
    return useJwt
      .axiosGet(getApi(ADMIN_ROLE))
      .then((res) => {
        let roleData = []
        res.data.map(data => {
          roleData.push({ value: data.id, label: data.name })
        })
        setAdminRoleData(roleData)

      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchAdminRoleData()
  }, [])

  const onSubmit = data => {
    let isFormValid = true

    if (!data.name) {
      setError("name", {
        type: "required",
        message: "name is required",
      })
      isFormValid = false
    }
    if (!data.email) {
      setError("emal", {
        type: "email",
        message: "Email is required",
      })
      isFormValid = false
    }
    if (!data.password) {
      setError("password", {
        type: "password",
        message: "password is required",
      })
      isFormValid = false
    }
    if (!data.confirm_password) {
      setError("confirm_password", {
        type: "confirm_password",
        message: "Conform Password is required",
      })
      isFormValid = false
    }
    if (!data.admin_role) {
      setError("admin_role", {
        type: "admin_role",
        message: "Admin Role is required",
      })
      isFormValid = false
    }

    if (!isFormValid) {
      return false
    }

    setData(data)
    if (data.name !== null && data.email !== null && data.password !== null && data.confirm_password !== null && data.admin_role !== null) {

      let formData = {
        name: data.name,
        email: data.email,
        admin_role: data.admin_role.value,
        password: data.password,
        confirm_password: data.confirm_password,


      }
      useJwt
        .axiosPost(getApi(ADMIN_ADD), formData)
        .then((res) => {
          SwalAlert("Admin Added Successfully")
          toast.success('Admin Added Successfully') 
          navigate("/admin")
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message),
          setResponseError(err?.response?.data?.message)
        })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Admin</CardTitle>
      </CardHeader>

      <CardBody>
        {responseError && <h3 style={{ color: 'red' }}>{responseError}</h3>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div class="">
            <div className='mb-1'>
              <Label className='form-label' for='admin_role'>
                Admin Role
              </Label>
              <Controller
                id="admin_role"
                name="admin_role"
                control={control}
                render={({ field }) => <Select
                  required={true}
                  isClearable
                  className={classnames('react-select', { 'is-invalid': errors.admin_role && errors.admin_role.value && true })}
                  classNamePrefix='select'
                  options={adminRoleData}
                  {...field}
                />}
              />
              {errors && errors.admin_role && <span className="invalid-feedback">{errors.admin_role.message}</span>}

            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='name'>
                  Full Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='name'
                  name='name'
                  render={({ field }) => (
                    <Input
                      required={true}
                      type='text'
                      placeholder='Bruce Wayne'
                      invalid={errors.name && true}
                      {...field}
                    />

                  )}
                />
                {errors && errors.name && <span className="invalid-feedback">{errors.name.message}</span>}
              </div>
            </div>
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='email'>
                  Email*
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
                      placeholder='@gmail.com'
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.email && <span className="invalid-feedback">{errors.email.message}</span>}
              </div>
            </div>

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
export default AddAdmin
