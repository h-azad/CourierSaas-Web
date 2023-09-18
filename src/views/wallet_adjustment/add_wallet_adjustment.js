

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
  ACCOUNT_WALLET_FORM_LIST,
  AREAS_BY_CITY,
  ADJUSTMENT_LIST
} from "@src/constants/apiUrls"
import { useEffect, useState } from "react"
import SwalAlert from "../../components/SwalAlert"

// import { getUserData } from "../../../auth/utils"

const AddWalletAdjustment = () => {

  const [selectboxWalletAccount, setSelectboxWalletAccount] = useState([])
  const [selectboxArea, setSelectboxArea] = useState([])
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  const {
    reset,
    control,
    watch,
    resetField,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {

    },
  })
  useEffect(() => {
    fetchCityData()
  }, [])

  const fetchCityData = () => {
    return useJwt
      .axiosGet(getApi(ACCOUNT_WALLET_FORM_LIST) + '?request-location=form')
      .then((res) => {
        let walletAccount = []
        // console.log('res.data', res)
        res.data.map((data) => {
          walletAccount.push({ value: data.id, label: data.account_name })
        })
        setSelectboxWalletAccount(walletAccount)
        return res.data
      })
      .catch((err) => console.log(err))
  }


  const onSubmit = (data) => {
    console.log("from data", data)

    let isFormValid = true

    if (!data.amount) {
      setError("amount", {
        type: "required",
        message: "Amount is required",
      })
      isFormValid = false
    }


    if (!(data.wallet_account && data.wallet_account.value)) {
      setError("wallet_account", {
        type: "required",
        message: "Wallet Account Type is required",
      })
      isFormValid = false
    }


    if (!isFormValid) {
      return false
    }

    setData(data)
    if (
      data.amount !== null &&
      data.wallet_account.value !== null
    ) {
      let formData = {
        amount: data.amount,
        wallet_account: data.wallet_account.value,
      }
      const headers = {
      headers: {
        'Content-Type': 'multipart/form-data'
        }
      }

      useJwt
        .axiosPost(getApi(ADJUSTMENT_LIST), formData, headers )
        .then((res) => {
          SwalAlert("Wallet Adjust Added Successfully")
          navigate("/wallet-adjustment")
        })
        .catch(err => console.log(err))
      }
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Adjust Amount</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          
          <div class="row">
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="amount">
                  Amount*
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="amount"
                  name="amount"
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder=""
                      invalid={errors.amount && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.amount && (
                  <span>{errors.amount.message}</span>
                )}
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6">
              <div className="mb-1">
                <Label className="form-label" for="wallet_account">
                  Wallet Account*
                </Label>
                <Controller
                  id="wallet_account"
                  name="wallet_account"
                  control={control}
                  render={({ field }) => (
                    <Select
                      isClearable
                      className={classnames("react-select", {
                        "is-invalid": errors.wallet_account && true,
                      })}
                      classNamePrefix="select"
                      options={selectboxWalletAccount}
                      {...field}
                    />
                  )}
                />
                {errors && errors.wallet_account && (
                  <span className="invalid-feedback">
                    {errors.wallet_account.message}
                  </span>
                )}
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
export default AddWalletAdjustment

