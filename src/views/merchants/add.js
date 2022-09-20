import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
} from "reactstrap"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors } from "@utils"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, MARCHANT_ADD } from '@src/constants/apiUrls'
import ToastContent from "../../components/ToastContent"
import SwalAlert from "../../components/SwalAlert"


const AddMerchants = () => {
  const navigate = useNavigate()
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

      useJwt
        .axiosPost(getApi(MARCHANT_ADD), formData)
        .then((res) => {
          console.log("res", res.data)
          // handleReset()
          // toast(t => (
          //   <ToastContent t={t} type='SUCCESS' message={'Marchant Added Successfully'} />
          // ))
          SwalAlert("Marchant Added Successfully")

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
        <CardTitle tag="h4">Add Merchant</CardTitle>
      </CardHeader>

      <CardBody>
      <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
            <Label className='form-label' for=''>
              Full Name
            </Label>
            <Controller
              defaultValue='Your full name '
              control={control}
              id='user_name'
              name='user_name'
              render={({ field }) => <Input placeholder='Bruce Wayne' invalid={errors.user_name && true} {...field} />}
            />
          </div>
          <div class="row">
            <div class="col-lg-6">
            <div className='mb-1'>
            <Label className='form-label' for='mobile'>
            Contact Number 1*
            </Label>
            <Controller
              defaultValue=''
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
            </div>
            <div class="col-lg-6">
            <div className='mb-1'>
            <Label className='form-label' for='mobile'>
            Contact Number 2*
            </Label>
            <Controller
              defaultValue=''
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
            </div>
            
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='identity'>
                Identity
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='identity'
                  name='identity'
                  render={({ field }) => <Input placeholder='NID/Passport' invalid={errors.identity && true} {...field} />}
                />
                {errors && errors.identity && <span>{errors.identity.message}</span>}
              </div>
            </div>
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='identity_no'>
                Identity No *
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='identity_no'
                  name='identity_no'
                  render={({ field }) => <Input placeholder='' invalid={errors.identity_no && true} {...field} />}
                />
                {errors && errors.identity_no && <span>{errors.identity_no.message}</span>}
              </div>
            </div>
            
          </div>
          <div class="row">
            <div class="col-lg-6">
            <div className='mb-1'>
            <Label className='form-label' for='email'>
              Email
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='email'
              name='email'
              render={({ field }) => (
                <Input
                  type='email'
                  placeholder='bruce.wayne@email.com'
                  invalid={errors.email && true}
                  {...field}
                />
              )}
            />
          </div>
            </div>
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='payment_method'>
                Preferred Payment Method*
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='payment_method'
                  name='payment_method'
                  render={({ field }) => <Input placeholder='Bank/bKash/Nogod' invalid={errors.payment_method && true} {...field} />}
                />
                {errors && errors.payment_method && <span>{errors.payment_method.message}</span>}
              </div>
            </div>
            
          </div>
          <div class="row">
            <div class="col-lg-4">
              <div className='mb-1'>
                <Label className='form-label' for='bank_name'>
                Bank Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='bank_name'
                  name='bank_name'
                  render={({ field }) => <Input placeholder='Bank Name' invalid={errors.bank_name && true} {...field} />}
                />
                {errors && errors.bank_name && <span>{errors.bank_name.message}</span>}
              </div>
            </div>
            <div class="col-lg-4">
              <div className='mb-1'>
                <Label className='form-label' for='bank_account_name'>
                Bank Account Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='bank_account_name'
                  name='bank_account_name'
                  render={({ field }) => <Input placeholder='Bank Account Name' invalid={errors.bank_account_name && true} {...field} />}
                />
                {errors && errors.bank_account_name && <span>{errors.bank_account_name.message}</span>}
              </div>
            </div>
            <div class="col-lg-4">
              <div className='mb-1'>
                <Label className='form-label' for='account_number'>
                Account Number
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='account_number'
                  name='account_number'
                  render={({ field }) => <Input placeholder='Account Number' invalid={errors.account_number && true} {...field} />}
                />
                {errors && errors.account_number && <span>{errors.account_number.message}</span>}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
            <div className='mb-1'>
            <Label className='form-label' for='city_name'>
              City Name
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='city_name'
              name='city_name'
              render={({ field }) => (
                <Input
                  type='city_name'
                  placeholder='Dhaka'
                  invalid={errors.city_name && true}
                  {...field}
                />
              )}
            />
          </div>
            </div>
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='area_name'>
                Area Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='area_name'
                  name='area_name'
                  render={({ field }) => <Input placeholder='' invalid={errors.area_name && true} {...field} />}
                />
                {errors && errors.area_name && <span>{errors.area_name.message}</span>}
              </div>
            </div>
            
          </div>
         
          <div className='mb-1'>
            <Label className='form-label' for='business_name'>
              Business Name
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='business_name'
              name='business_name'
              render={({ field }) => <Input placeholder='Test Shop' invalid={errors.business_name && true} {...field} />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='address'>
              Address
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='address'
              name='address'
              render={({ field }) => <Input placeholder='Dhaka , Bangladesh' invalid={errors.address && true} {...field} />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='pickup_address'>
              Pickup Address
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='pickup_address'
              name='pickup_address'
              render={({ field }) => <Input placeholder='Dhaka , Bangladesh' invalid={errors.pickup_address && true} {...field} />}
            />
          </div>
          <div class="row">
            <div class="col-lg-6">
            <div className='mb-1'>
            <Label className='form-label' for='password'>
              Password
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='password'
              name='password'
              render={({ field }) => (
                <Input
                  type='password'
                  placeholder='******'
                  invalid={errors.password && true}
                  {...field}
                />
              )}
            />
          </div>
            </div>
            <div class="col-lg-6">
              <div className='mb-1'>
                <Label className='form-label' for='confirm_password'>
                Confirm Password
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='confirm_password'
                  name='confirm_password'
                  render={({ field }) => <Input placeholder='******' invalid={errors.confirm_password && true} {...field} />}
                />
                {errors && errors.confirm_password && <span>{errors.confirm_password.message}</span>}
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
export default AddMerchants
