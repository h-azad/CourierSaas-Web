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
import { useForm, Controller } from 'react-hook-form'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, ADMIN_ROLE } from '@src/constants/apiUrls'
import { useEffect } from 'react'
import SwalAlert from '../../../components/SwalAlert'


const EditAdminRole = () => {

  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
  })

  let { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchAdminRoleData()
  }, [])

  const fetchAdminRoleData = () => {
    return useJwt
      .axiosGet(getApi(ADMIN_ROLE + id + '/'))
      .then((res) => {
        setValue('name', res?.data?.name)
      })
      .catch(err => console.log(err))
  }

  const onSubmit = data => {
    let isFormValid = true

    if (!data.name) {
      setError("name", {
        type: "required",
        message: "name is required",
      })
      isFormValid = false
    }

    if (!isFormValid) {
      return false
    }

    if (data.name !== null) {

      let formData = {
        name: data.name,
      }
      useJwt
        .axiosPatch(getApi(ADMIN_ROLE + id + "/"), formData)
        .then((res) => {
          SwalAlert("Admin Edit Successfully")
          navigate("/admin-role")
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
          <div className='mb-1'>
            <Label className='form-label' for='name'>
              Name
            </Label>
            <Controller
              control={control}
              id='name'
              name='name'
              render={({ field }) => (
                <Input
                  type='text'
                  placeholder='Admin ..'
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
export default EditAdminRole

