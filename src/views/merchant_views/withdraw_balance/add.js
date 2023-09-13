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
import classnames from "classnames"
import { useForm, Controller } from "react-hook-form"
import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  WITHDRAW_REQUEST_ADD,
  WITHDRAW_REQUEST_LIST,
  ACCOUNT_WALLET_LIST
} from "@src/constants/apiUrls"
import { useEffect, useState } from "react"
import SwalAlert from "../../../components/SwalAlert"

const MarchantBalanceWithrawRequestAdd = () => {
  const [data, setData] = useState(null)
  const [balance, setBalance] = useState()
  const [withdrawBalance, setWithdrawBalance] = useState()
  const [accountWallet, setAccountWallet] = useState()

  const navigate = useNavigate()
  const {
    watch,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      balance: "",
      marchant: {},
    },
  })

  useEffect(() => {
    fetchWithdrawRequestData()
  }, [])

  useEffect(()=>{
    setValue("current_balance", balance - Number(withdrawBalance))
  }, [withdrawBalance])

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name == "withdrawbalance" && type == "change") {
        let withdrawBalanceValue = value
        setWithdrawBalance(withdrawBalanceValue.withdrawbalance)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])





  const fetchWithdrawRequestData = () => {
    return useJwt
      .axiosGet(getApi(ACCOUNT_WALLET_LIST))
      .then((res) => {
        setAccountWallet(res.data.id)
        setBalance(res.data.balance)
        setValue('balance', res.data.balance)

        console.log('data is ', res.data)
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const onSubmit = (data) => {
    let isFormValid = true

    if (!data.withdrawbalance) {
      setError("Withdraw request balance", {
        type: "required",
        message: "Withdraw request is required",
      })
      isFormValid = false
    }

    if (!isFormValid) {
      return false
    }

    setData(data)
    if (data.withdrawbalance !== null) {
      let formData = {
        balance: data.balance,
        withdraw_balance: data.withdrawbalance,
        current_balance: data.current_balance,
        account_wallet: accountWallet,
      }
      useJwt
        .axiosPost(getApi(WITHDRAW_REQUEST_ADD), formData)
        .then((res) => {
          SwalAlert("Area Added Successfully")
          navigate("/marchant-withdraw-request")
        })
        .catch((err) => console.log(err))
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
              <div className="mb-1">
                <Label className="form-label" for="balance">
                  Balance
                </Label>
                <Controller
                  control={control}
                  id="balance"
                  name="balance"
                  render={({ field }) => (
                    <Input
                      readOnly={true}
                      type="number"
                      placeholder="Balance"
                      invalid={errors.balance && true}
                      {...field}
                    />
                  )}
                />
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
              <div className="mb-1">
                <Label className="form-label" for="current_balance">
                  Current Balance
                </Label>
                <Controller
                  // defaultValue=""
                  control={control}
                  id="current_balance"
                  name="current_balance"
                  render={({ field }) => (
                    <Input
                      readOnly={true}
                      type="number"
                      placeholder="Current Balance"
                      invalid={errors.balance && true || balance < Number(withdrawBalance)}
                      {...field}
                    />
                  )}
                />
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
export default MarchantBalanceWithrawRequestAdd
