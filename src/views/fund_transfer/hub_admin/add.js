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
  ACCOUNT_WALLET_FORM_LIST,
} from "@src/constants/apiUrls"
import { useEffect, useState } from "react"
import SwalAlert from "@src/components/SwalAlert"

import toast from 'react-hot-toast'

const CreateFundTransferByHubAdmin = () => {
  const [data, setData] = useState(null)

  const [walletData, setWalletData] = useState([])

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


  const getWalletData = () => {
    useJwt
      .axiosGet(getApi(ACCOUNT_WALLET_FORM_LIST))
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
      .catch((err) => console.log(err))
  }



  const onSubmit = (data) => {
    let isFormValid = true

    if (!isFormValid) {
      return false
    }

    if (data.receiver !== null && data.amount !== null) {
      let formData = {
        amount: data?.amount

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


  useEffect(()=>{
    getWalletData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Fund Transfer To Admin</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div class="row">
            <div class="col-lg-12">
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
            {/* <div class="col-lg-6">
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
            </div> */}
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
