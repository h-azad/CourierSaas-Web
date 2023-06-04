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
import { useNavigate, useParams } from "react-router-dom"
import Select from "react-select"
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, ADMIN_EDIT, ADMIN_DETAILS } from '@src/constants/apiUrls'
import { useEffect, useState } from 'react'
import SwalAlert from "../../components/SwalAlert"


const EditAdmin = () => {
  const [adminInfo, setAdminInfo] = useState([])
  const [data, setData] = useState(null)

  const {
    control,
    setError,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
  })

  let { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    useJwt
      .axiosGet(getApi(ADMIN_DETAILS) + id + "/")
      .then((res) => {
        console.log(res)
        setValue("name", res.data.name)
        setValue('admin_role', res.data.admin_role)
        setAdminInfo({ "name": res.data.name, "adminRole": res.data.admin_role })
        return res.data
      })
      .catch(err => console.log(err))
  }, [])

  const onSubmit = data => {
    let isFormValid = true
    console.log('data is ', data)

    if (!data.name) {
      setError("name", {
        type: "required",
        message: "name is required",
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
    if (data.name !== null && data.admin_role !== null) {

      let formData = {
        name: data.name,
        admin_role: data.admin_role.value,
      }
      useJwt
        .axiosPatch(getApi(ADMIN_EDIT + id + "/"), formData)
        .then((res) => {
          SwalAlert("Admin Edit Successfully")
          navigate("/admin")
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Edit Admin</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div class="">
            <div className='mb-1'>
              <Label className='form-label' for='admin_role'>
                Admin Role
              </Label>
              <Controller
                // defaultValue={ adminInfo?.admin_role }
                id="admin_role"
                name="admin_role"
                control={control}
                render={({ field }) => <Select
                  isClearable
                  className={classnames('react-select', { 'is-invalid': errors.admin_role && errors.admin_role.value && true })}
                  classNamePrefix='select'
                  options={[{ value: 'Admin', label: 'Admin' }, { value: 'Manager', label: 'Manager' }, { value: 'Dispatcher', label: 'Dispatcher' }]}
                  {...field}
                />}
              />
              {errors && errors.admin_role && <span className="invalid-feedback">{errors.admin_role.message}</span>}

            </div>
          </div>

          <div className='mb-1'>
            <Label className='form-label' for='name'>
              Full Name
            </Label>
            <Controller
              // defaultValue={adminInfo?.name}
              control={control}
              id='name'
              name='name'
              render={({ field }) => (
                <Input
                  type='text'
                  placeholder='mr. X'
                  invalid={errors.name && true}
                  {...field}
                />

              )}
            />
            {errors && errors.name && <span className="invalid-feedback">{errors.name.message}</span>}
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
export default EditAdmin

