// ** Reactstrap Imports
import { Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,} from 'reactstrap'
import { Router, useNavigate, useParams} from "react-router-dom"
import Select from "react-select"
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors } from "@utils"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, MARCHANT_EDIT, MARCHANT_DETAILS } from '@src/constants/apiUrls'
import ToastContent from "../../components/ToastContent"  
import { useEffect, useState } from 'react'

const EditMerchants = () => {

  const [merchantInfo, setMerchantInfo] = useState(null)

  let { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(id)
    useJwt
      .axiosGet(getApi(MARCHANT_DETAILS) + id + "/")
      .then((res) => {
        // console.log("res", res.data)
        setMerchantInfo(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }, [])

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()


  
  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      let formData = {
        user_name: data.user_name,
        business_name: data.business_name,
        email: data.email,
        mobile: data.mobile,
        address: data.address,
        status: 'approved'
      }
      // console.log(getApi(MARCHANT_EDIT))
      useJwt
        .axiosPut(getApi(MARCHANT_EDIT) + id + "/", formData)
        .then((res) => {
          console.log("res", res.data)
          // handleReset()
          toast(t => (
            <ToastContent t={t} type='SUCCESS' message={'Marchant Edited Successfully'} />
          ))
          navigate("/merchants")
        })
        .catch(err => console.log(err))

      // console.log(formData)
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }


    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Edit Merchant</CardTitle>
        </CardHeader>
  
        <CardBody>
          {merchantInfo &&
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-1'>
              <Label className='form-label' for='firstNameBasic'>
                Full Name
              </Label>
              <Controller
                defaultValue={merchantInfo.user_name}
                control={control}
                id='user_name'
                name='user_name'
                render={({ field }) => <Input placeholder='Partho Roy' invalid={errors.user_name && true} {...field} />}
              />
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='lastNameBasic'>
                Business Name
              </Label>
              <Controller
                defaultValue={merchantInfo.business_name}
                control={control}
                id='business_name'
                name='business_name'
                render={({ field }) => <Input placeholder='Test Shop' invalid={errors.business_name && true} {...field} />}
              />
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='emailBasic'>
                Email
              </Label>
              <Controller
                defaultValue={merchantInfo.email}
                control={control}
                id='email'
                name='email'
                render={({ field }) => (
                  <Input
                    type='email'
                    placeholder='partho@email.com'
                    invalid={errors.email && true}
                    {...field}
                  />
                )}
              />
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='emailBasic'>
                Mobile
              </Label>
              <Controller
                defaultValue={merchantInfo.mobile}
                control={control}
                id='mobile'
                name='mobile'
                render={({ field }) => (
                  <Input
                    type='text'
                    placeholder='017XXXXXXXXX'
                    invalid={errors.mobile && true}
                    {...field}
                  />
                )}
              />
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='firstNameBasic'>
               Address
              </Label>
              <Controller
                defaultValue={merchantInfo.address}
                control={control}
                id='address'
                name='address'
                render={({ field }) => <Input placeholder='Dhaka, Bangladesh' invalid={errors.address && true} {...field} />}
              />
            </div>
            <div className='d-flex'>
              <Button className='me-1' color='primary' type='submit'>
                Submit
              </Button>
            </div>
          </Form>
          }
        </CardBody>
      </Card>
    )
  }
  export default EditMerchants
        
