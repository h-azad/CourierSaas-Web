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
import { useForm, Controller } from "react-hook-form"
import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  AGENT_TYPE_ADD,
} from "@src/constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"

const AddAgentType = () => {


  const navigate = useNavigate()
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
    },
  })


  const onSubmit = (data) => {
    let isFormValid = true

    if (!data.agent_type) {
      setError("Agent Type", {
        type: "required",
        message: "Agent Type is required",
      })
      isFormValid = false
    }


    if (!isFormValid) {
      return false
    }

    // setData(data)
    if (data.agent_type !== null) {
      console.log('data', data)
      let formData = {
        // account_wallet: data.
        name: data.agent_type,

      }
      useJwt
        .axiosPost(getApi(AGENT_TYPE_ADD), formData)
        .then((res) => {
          SwalAlert("Agent Added Successfully")
          navigate("/agent-type")
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Agent Type</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div class="row">
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='agent_type'>
                  Type Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='agent_type'
                  name='agent_type'
                  render={({ field }) => <Input placeholder='Service Provider ..' invalid={errors.name && true} {...field} />}
                />
                {errors && errors.name && <span className="invalid-feedback">{errors.name.message}</span>}
              </div>
            </div>
          </div>


          <div className="d-flex">
            <Button className="me-1" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}
export default AddAgentType
