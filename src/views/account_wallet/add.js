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
import { getApi, ACCOUNT_WALLET_ADD, MARCHANT_LIST } from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import SwalAlert from "../../components/SwalAlert"

const AddAreas = () => {
  const [data, setData] = useState(null)
  const [selectboxMarchant, setSelectboxMarchant] = useState([])
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
      marchant: {}
    }
  })

  useEffect(() => {
    fetchMarchantData()
  }, [])

  const fetchMarchantData = () => {
    return useJwt
      .axiosGet(getApi(MARCHANT_LIST))
      .then((res) => {
        console.log(res)
        let marchantData = []

        res.data.data.map((data) => {
          marchantData.push({ value: data.id, label: data.full_name })
        })

        setSelectboxMarchant(marchantData)
        return res.data.data
      })
      .catch((err) => console.log(err))
  }


  const onSubmit = data => {
    let isFormValid = true

    if (!data.marchant) {
      setError("marchant", {
        type: "required",
        message: "Marchant is required",
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
    if (data.marchant_name !== null && data.balance !== null) {

      let formData = {
        marchant: data.marchant_name.value,
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
        <CardTitle tag="h4">Add Areas</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
            <Label className='form-label' for='marchant_name'>
              Marchant
            </Label>
            <Controller
              id="marchant_name"
              name="marchant_name"
              control={control}
              render={({ field }) => <Select
                isClearable
                className={classnames('react-select', { 'is-invalid': data !== null && data.marchant === null })}
                classNamePrefix='select'
                options={selectboxMarchant}
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
