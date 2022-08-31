// ** Reactstrap Imports
import { Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Form,
  Button,
  Label,} from 'reactstrap'
import { Router, useNavigate, useParams} from "react-router-dom"
import { useForm, Controller } from 'react-hook-form'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, RIDER_EDIT, RIDER_DETAILS } from '@src/constants/apiUrls'
import { useEffect, useState } from 'react'
import SwalAlert from "../../components/SwalAlert"


const EditRider = () => {

  const [riderInfo, setRiderInfo] = useState(null)

  let { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(id)
    useJwt
      .axiosGet(getApi(RIDER_DETAILS) + id + "/")
      .then((res) => {
        setRiderInfo(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }, [])

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()

  
  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      let formData = {
        user_name: data.user_name,
        email: data.email,
        phone_number: data.phone_number,
        address: data.address,
        status: 'active'
      }
      useJwt
        .axiosPut(getApi(RIDER_EDIT) + id + "/", formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Rider Edited Successfully")
          navigate("/rider")
        })
        .catch(err => console.log(err))

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
          <CardTitle tag="h4">Edit Rider</CardTitle>
        </CardHeader>
  
        <CardBody>
          {riderInfo &&
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-1'>
              <Label className='form-label' for='firstNameBasic'>
                Full Name
              </Label>
              <Controller
                defaultValue={riderInfo.user_name}
                control={control}
                id='user_name'
                name='user_name'
                render={({ field }) => <Input placeholder='Partho Roy' invalid={errors.user_name && true} {...field} />}
              />
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='emailBasic'>
                Email
              </Label>
              <Controller
                defaultValue={riderInfo.email}
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
                defaultValue={riderInfo.phone_number}
                control={control}
                id='phone_number'
                name='phone_number'
                render={({ field }) => (
                  <Input
                    type='text'
                    placeholder='017XXXXXXXXX'
                    invalid={errors.phone_number && true}
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
                defaultValue={riderInfo.address}
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
  export default EditRider
        
