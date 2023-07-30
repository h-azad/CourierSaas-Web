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
import SwalAlert from "../../components/SwalAlert"

const AddAreas = () => {
  const [data, setData] = useState(null)
  const [selectboxWithdrawRequest, setSelectboxWithdrawRequest] = useState([])
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
      if (name == "withdraw_request" && type == "change") {
        let data = value
        let id = data?.withdraw_request?.value
        // setAccountWallet()
        console.log(id)
        if (id) {
          getMerchantBalance(id)
        }
      }
      if (name == "withdrawbalance" && type == "change") {
        let withdrawBalanceValue = value
        setWithdrawBalance(withdrawBalanceValue.withdrawbalance)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])



  const getMerchantBalance = (id) => {
    console.log("getMerchantBalance", id)

    useJwt
      .axiosGet(getApi(ACCOUNT_WALLET_LIST) + id + "/" + '?request-location=form')
      .then((res) => {
        let responseData = res.data
        if (responseData.balance) {
          setBalance(Number(responseData.balance))
          setValue("balance", Number(responseData.balance))
        }
        return res.data
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    console.log(withdrawBalance)
  }, [withdrawBalance])


  const fetchWithdrawRequestData = () => {
    return useJwt
      // .axiosGet(getApi(WITHDRAW_REQUEST_LIST))
      .axiosGet(getApi(ACCOUNT_WALLET_LIST) + '?request-location=form')
    
      .then((res) => {
        console.log("res", res.data)
        let withdrawRequest = []
        res.data.map((data) => {
          console.log('console data', data)
          withdrawRequest.push({
            value: data.id,
            label: data.account_name,
          })
        })

        setSelectboxWithdrawRequest(withdrawRequest)
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const onSubmit = (data) => {
    let isFormValid = true

    if (!data.withdraw_request) {
      setError("Withdraw request", {
        type: "required",
        message: "wWthdraw request is required",
      })
      isFormValid = false
    }
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

    console.log("data", data)
    setData(data)
    if (data.withdraw_request !== null && data.withdrawbalance !== null) {
      let formData = {
        // account_wallet: data.
        account_wallet: data.withdraw_request.value,
        balance: data.balance,
        withdraw_balance: data.withdrawbalance,
        current_balance: data.current_balance,
        withdraw_status: "Complete"

      }
      console.log("formdata", formData)
      useJwt
        .axiosPost(getApi(WITHDRAW_REQUEST_ADD), formData)
        .then((res) => {
          SwalAlert("Area Added Successfully")
          navigate("/withdraw-request")
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
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="withdraw_request">
                  Withdraw
                </Label>
                <Controller
                  id="withdraw_request"
                  name="withdraw_request"
                  control={control}
                  render={({ field }) => (
                    <Select
                      isClearable
                      className={classnames("react-select", {
                        "is-invalid":
                          data !== null && data.withdraw_request === null,
                      })}
                      classNamePrefix="select"
                      options={selectboxWithdrawRequest}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            <div class="col-lg-6">
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
export default AddAreas
