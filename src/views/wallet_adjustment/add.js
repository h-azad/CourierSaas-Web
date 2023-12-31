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

import {
  getApi,
  ACCOUNT_WALLET_FORM_LIST,
  ADJUSTMENT
} from "@src/constants/apiUrls"
import useJwt from "@src/auth/jwt/useJwt"

import { useEffect, useState } from "react"
import SwalAlert from "@src/components/SwalAlert"
import toast from 'react-hot-toast'



const AddWalletAdjustment = () => {

  const navigate = useNavigate()

  const [selectboxWalletAccount, setSelectboxWalletAccount] = useState([])

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({})
  

  const fetchAccountWalletFormList = () => {
    return useJwt
      .axiosGet(getApi(ACCOUNT_WALLET_FORM_LIST))
      .then((res) => {
        let walletAccount = []
        res.data.map((data) => {
          walletAccount.push({ value: data.id, label: data.account_name })
        })
        setSelectboxWalletAccount(walletAccount)
      })
      .catch((err) => console.log(err))
  }


  const onSubmit = (data) => {

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

    if (
      data.amount !== null &&
      data.wallet_account.value !== null
    ) {
      let formData = {
        amount: data.amount,
        wallet: data.wallet_account.value,
      }

      useJwt
        .axiosPost(getApi(ADJUSTMENT), formData)
        .then((res) => {
          
          if(res?.data?.error){
            toast.error(res?.data?.message)
            navigate("/wallet-adjustment/")
          }else{
            SwalAlert(res?.data?.message)
            toast.success(res?.data?.message)
            navigate("/wallet-adjustment/")
          }
          
        })
        .catch(err => {
          toast.error(err?.response?.data?.message)
        })
      }
  }

  useEffect(() => {
    fetchAccountWalletFormList()
  }, [])

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

