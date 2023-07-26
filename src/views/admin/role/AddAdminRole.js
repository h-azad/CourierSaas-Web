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
import { useForm, Controller } from 'react-hook-form'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, ADMIN_ROLE } from '@src/constants/apiUrls'
import SwalAlert from "../../../components/SwalAlert"

const AddAdminRole = () => {
  const navigate = useNavigate()
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({

  })

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
        .axiosPost(getApi(ADMIN_ROLE), formData)
        .then((res) => {
          SwalAlert("Admin role Added Successfully")
          navigate("/admin-role")
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Admin Role</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div class="row">
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='name'>
                  Role Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='name'
                  name='name'
                  render={({ field }) => (
                    <Input
                      type='text'
                      placeholder='Manager...'
                      invalid={errors.name && true}
                      {...field}
                    />

                  )}
                />
                {errors && errors.name && <span className="invalid-feedback">{errors.name.message}</span>}
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
export default AddAdminRole
