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
  HUB_ADMIN_WALLET_FORM_LIST,
  ADMIN_WALLET_FORM_LIST,
} from "@src/constants/apiUrls"
import { useEffect, useState } from "react"
import SwalAlert from "../../components/SwalAlert"
import toast from 'react-hot-toast'

const CreateFundTransfer = () => {

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({})
  const navigate = useNavigate()

  const [data, setData] = useState(null)
  const [walletData, setWalletData] = useState([])



  const getHUBAdminWalletData = () => {
    useJwt
      .axiosGet(getApi(HUB_ADMIN_WALLET_FORM_LIST))
      .then((res) => {
        res.data.map((data) => {
          walletData.push({
            value: data.id,
            label: data.account_name,
          })
        })

      })
      .catch((err) => {
        toast.error('Hub Admin Wallet List Error')
      })
  }



  const getAdminWalletData = () => {
    useJwt
      .axiosGet(getApi(ADMIN_WALLET_FORM_LIST))
      .then((res) => {
        res.data.map((data) => {
          walletData.push({
            value: data.id,
            label: data.account_name,
          })
        })
      })
      .catch((err) => {
        toast.error('Admin Wallet List Error')
      })
  }


  const onSubmit = (data) => {
    let isFormValid = true

    if (!data.sender) {
      setError("sender", {
        type: "required",
        message: "Sender request is required",
      })
      isFormValid = false
    }
    if (!data.receiver) {
      setError("receiver", {
        type: "required",
        message: "Receiver request is required",
      })
      isFormValid = false
    }

    if (!isFormValid) {
      return false
    }

    if (data.sender !== null && data.receiver !== null) {
      let formData = {
        sender: data?.sender?.value,
        receiver: data?.receiver?.value,
        amount: data?.amount

      }
      useJwt
        .axiosPost(getApi(FUND_TRANSFER), formData)
        .then((res) => {
          SwalAlert("Fund Transfer Successfully")
          toast.success(res?.data?.message)
          navigate("/fund-transfer/index/")
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message)
        })
    }
  }



  useEffect(() => {
    getAdminWalletData()
    getHUBAdminWalletData()
  }, [])


  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Fund Transfer</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div class="row">
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="sender">
                  Sender
                </Label>
                <Controller
                  id="sender"
                  name="sender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      isClearable
                      className={classnames("react-select", {
                        "is-invalid":
                          data !== null && data.sender === null,
                      })}
                      classNamePrefix="select"
                      options={walletData}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
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
                      invalid={errors.balance && true}
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
export default CreateFundTransfer
