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
  FUND_TRANSFER,
  ADMIN_WALLET_FORM_LIST,
  SELF_WALLET,
} from "@src/constants/apiUrls"
import { useEffect, useState } from "react"
import SwalAlert from "@src/components/SwalAlert"

import toast from 'react-hot-toast'



const CreateFundTransferByHubAdmin = () => {

  const [data, setData] = useState(null)
  const [selfWalletBalance, setSelfWalletBalance] = useState(0)
  const [walletData, setWalletData] = useState([])

  const navigate = useNavigate()
  const {
    watch,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({})



  const getAdminWalletData = () => {
    useJwt
      .axiosGet(getApi(ADMIN_WALLET_FORM_LIST))
      .then((res) => {
        let walletAccount = []
        res.data.map((data) => {
          walletAccount.push({
            value: data.id,
            label: data.account_name,
          })
        })
        return setWalletData(walletAccount)

      })
      .catch((err) => {
        toast.error('Admin Wallet List Error')
      })
  }



  const getSelfWalletData = () => {
    useJwt
      .axiosGet(getApi(SELF_WALLET))
      .then((res) => {
        setSelfWalletBalance(res?.data?.balance)
        setValue('previous_amount', res?.data?.balance)

      }).catch((err) => {
        toast.error('Wallet Data Error')
      })
  }



  const onSubmit = (data) => {

    let isFormValid = true

    if (data?.current_amount < 0) {
      setError("current_amount", {
        type: "required",
        message: "Insufficient Balance",
      })
      isFormValid = false
    }

    if (selfWalletBalance < data?.amount) {
      setError("amount", {
        type: "required",
        message: "Insufficient Balance",
      })
      isFormValid = false
    }


    if (!isFormValid) {
      return false
    }

    if (data.receiver !== null && data.amount !== null) {
      let formData = {
        amount: data?.amount,
        receiver: data?.receiver.value

      }

      useJwt
        .axiosPost(getApi(FUND_TRANSFER), formData)
        .then((res) => {
          SwalAlert("Fund Transfer Successfully")
          toast.success(res?.data?.message)
          navigate("/hub/admin/fund-transfer/index/")
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message)
        })
    }
  }



  useEffect(() => {

    const subscription = watch((value, { name, type }) => {

      if (name == "amount" && type == "change") {
        setValue('current_amount', selfWalletBalance - value?.amount)
      }
    })

    return () => subscription.unsubscribe()

  }, [watch, selfWalletBalance])



  useEffect(() => {
    getAdminWalletData()
    getSelfWalletData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Fund Transfer To Admin</CardTitle>
      </CardHeader>

      <CardBody>

        <Form onSubmit={handleSubmit(onSubmit)}>

          <div class="row">
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="previous_amount">
                  Previous Amount
                </Label>
                <Controller
                  control={control}
                  id="previous_amount"
                  name="previous_amount"
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="Previous Amount"
                      invalid={errors.previous_amount && true}
                      readOnly={true}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="current_amount">
                  Current Amount
                </Label>
                <Controller
                  control={control}
                  id="current_amount"
                  name="current_amount"
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="Current Amount"
                      invalid={errors.current_amount && true}
                      readOnly={true}
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
                <Label className="form-label" for="receiver">
                  Receiver
                </Label>
                <Controller
                  id="receiver"
                  name="receiver"
                  control={control}
                  render={({ field }) => (
                    <Select
                      isClearable
                      className={classnames("react-select", {
                        "is-invalid":
                          data !== null && data.receiver === null,
                      })}
                      classNamePrefix="select"
                      options={walletData}
                      required={true}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="amount">
                  Amount
                </Label>
                <Controller
                  control={control}
                  id="amount"
                  name="amount"

                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="Amount"
                      invalid={errors.amount && true}
                      min={0}
                      required={true}
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
export default CreateFundTransferByHubAdmin
