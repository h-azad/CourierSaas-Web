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
import { getApi, ACCOUNT_WALLET_ADD, USER_LIST } from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import SwalAlert from "../../components/SwalAlert"

const AddAreas = () => {
  const [data, setData] = useState(null)
  const [selectboxUser, setselectboxUser] = useState([])
  const navigate = useNavigate()
  const {
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      balance: '',
      // marchant: {}
    }
  })

  useEffect(() => {
    fetchUsertData()
  }, [])

  const fetchUsertData = () => {
    return useJwt
      .axiosGet(getApi(USER_LIST))
      .then((res) => {
        console.log("response data", res)
        let userData = []

        res.data.map((data) => {
          userData.push({ value: data.id, label: data.name })
        })
        console.log('userdata', userData)
        setselectboxUser(userData)
        return res.data.data
      })
      .catch((err) => console.log(err))
  }


  const onSubmit = data => {
    let isFormValid = true
    if (!data.user_name) {
      setError("user", {
        type: "required",
        message: "User is required",
      })
      isFormValid = false
    }
    if (!data.balance) {
      setError("balance", {
        type: "required",
        message: "Balance Name is required",
      })
      isFormValid = false
    }

    if (!isFormValid) {
      return false
    }

    console.log("data", data)
    setData(data)
    if (data.user_name !== null && data.balance !== null) {

      let formData = {
        user: data.user_name.value,
        balance: data.balance

      }
      console.log('formdata', formData)
      useJwt
        .axiosPost(getApi(ACCOUNT_WALLET_ADD), formData)
        .then((res) => {
          SwalAlert("Area Added Successfully")
          navigate("/account-wallet")
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Account Wallet</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
            <Label className='form-label' for='user_name'>
              User
            </Label>
            <Controller
              id="user_name"
              name="user_name"
              control={control}
              render={({ field }) => <Select
                isClearable
                className={classnames('react-select', { 'is-invalid': data !== null && data.user === null })}
                classNamePrefix='select'
                options={selectboxUser}
                {...field}
              />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='balance'>
              Balance
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='balance'
              name='balance'
              render={({ field }) => <Input type="number" placeholder='Balance' invalid={errors.balance && true} {...field} />}
            />
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
export default AddAreas
