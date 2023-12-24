import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Form,
  Button,
  Label,
} from 'reactstrap'
import { useNavigate, useParams } from "react-router-dom"
import Select from "react-select"
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, WITHDRAW_REQUEST_EDIT, WITHDRAW_REQUEST_DETAILS, ACCOUNT_WALLET_LIST } from '@src/constants/apiUrls'
import { useEffect, useState } from 'react'
import SwalAlert from "../../components/SwalAlert"



const EditFundTransfer = () => {
  const [selectboxMarchant, setSelectboxMarchant] = useState([])
  const [data, setData] = useState(null)
  const [accountWalletInfo, setAccountWalletInfo] = useState(null)
  console.log('accountWalletInfo', accountWalletInfo)
  let { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    useJwt
      .axiosGet(getApi(WITHDRAW_REQUEST_DETAILS) + id + "/")
      .then((res) => {
        setAccountWalletInfo(res.data)
        return res.data
      })
      .catch(err => console.log(err))
    fetchMarchantData()
  }, [])

  const fetchMarchantData = () => {
    return useJwt
      .axiosGet(getApi(ACCOUNT_WALLET_LIST))
      .then((res) => {
        let marchantData = []

        res.data.data.map((data) => {
          marchantData.push({ value: data.id, label: data.full_name })
        })

        setSelectboxMarchant(marchantData)
        return res.data.data
      })
      .catch((err) => console.log(err))
  }

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: accountWalletInfo
  })



  const onSubmit = (data) => {

    let isFormValid = true

    if (!data.marchant_name) {
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

    setData(data)
    if (data.marchant_name !== null && data.balance !== null) {
      let formData = {
        marchant: data.marchant_name.value,
        balance: data.balance,
      }
      useJwt
        .axiosPut(getApi(WITHDRAW_REQUEST_EDIT + id + '/'), formData)
        .then((res) => {
          SwalAlert("Account Wallet Successfully")
          navigate("/account-wallet")
        })
        .catch((err) => console.log(err))
    }
  }



  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Edit Account Wallet</CardTitle>
      </CardHeader>
      {/* <CardBody>
        {accountWalletInfo &&
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-1'>
              <Label className='form-label' for='marchant_name'>
                Marchant
              </Label>
              <Controller
                id="marchant_name"
                defaultValue={{ label: accountWalletInfo.marchant.full_name, value: accountWalletInfo.marchant.id }}
                name="marchant_name"
                control={control}
                render={({ field }) => <Select
                  isClearable
                  defaultValue={accountWalletInfo.marchant_name}
                  className={classnames('react-select', { 'is-invalid': data !== null && data.marchant_name === null })}
                  classNamePrefix='select'
                  options={selectboxMarchant}
                  {...field}
                />}
              />
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='firstNameBasic'>
                Balance
              </Label>
              <Controller
                defaultValue={accountWalletInfo.balance}
                control={control}
                id='balance'
                name='balance'
                render={({ field }) => <Input placeholder='Mirpur' invalid={errors.balance && true} {...field} />}
              />
            </div>

            <div className='d-flex'>
              <Button className='me-1' color='primary' type='submit'>
                Submit
              </Button>
            </div>
          </Form>
        }
      </CardBody> */}
    </Card>
  )
}
export default EditFundTransfer

