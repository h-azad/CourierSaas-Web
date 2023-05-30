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
import { getApi, WITHDRAW_REQUEST_ADD, WITHDRAW_REQUEST_LIST } from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import SwalAlert from "../../components/SwalAlert"

const AddAreas = () => {
  const [data, setData] = useState(null)
  const [selectboxWithdrawRequest, setSelectboxWithdrawRequest] = useState([])
  const [balance, setBalance] = useState()
  const [withdrawBalance, setWithdrawBalance] = useState()
  const [currentBalance, setCurrentBalance] = useState()


  const navigate = useNavigate()
  const {
    watch,
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
    fetchWithdrawRequestData()
  }, [])


  useEffect(() => {
    console.log('I am watch')
    const subscription = watch(({ name, type }) => {
      if (name == "marchant_name" && type == "change") {
        console.log('hello i am colling')
      }

    })

    return () => subscription.unsubscribe()
  }, [watch])





  const fetchWithdrawRequestData = () => {
    return useJwt
      .axiosGet(getApi(WITHDRAW_REQUEST_LIST))
      .then((res) => {
        console.log("res", res.data)
        let withdrawRequest = []
        res.data.map((data) => {
          withdrawRequest.push({
            value: data.id,
            label: data.account_wallet.marchant.full_name,
          })
        })

        setSelectboxWithdrawRequest(withdrawRequest)
        return res.data

      })
      .catch(err => console.log(err))
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
        .axiosPost(getApi(WITHDRAW_REQUEST_ADD), formData)
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
        <CardTitle tag="h4">Add Withdraw</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div class="row">
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='marchant_name'>
                  Withdraw
                </Label>
                <Controller
                  id="marchant_name"
                  name="marchant_name"
                  control={control}
                  render={({ field }) => <Select
                    isClearable
                    className={classnames('react-select', { 'is-invalid': data !== null && data.marchant_name === null })}
                    classNamePrefix='select'
                    options={selectboxWithdrawRequest}
                    {...field}
                  />}
                />
              </div>
            </div>
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="balance">
                  Balance
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="balance"
                  name="balance"
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="Balance"
                      invalid={errors.balance && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="withdrawbalance">
                  Withdraw Balance
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="withdrawbalance"
                  name="withdrawbalance"
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="Withdraw Balance"
                      invalid={errors.balance && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className="form-label" for="current_balance">
                  Current Balance
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="current_balance"
                  name="current_balance"
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="Current Balance"
                      invalid={errors.balance && true}
                      {...field}
                    />
                  )}
                />
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
export default AddAreas
