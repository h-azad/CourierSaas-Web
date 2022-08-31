// ** Reactstrap Imports
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
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors } from "@utils"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, SHIPMENT_TYPE_ADD, SERVICE_TYPE_LIST } from '@src/constants/apiUrls'
import ToastContent from "../../components/ToastContent"
import { useEffect, useState } from "react"
import SwalAlert from "../../components/SwalAlert"

const AddShipmentType = () => {
  const [selectboxOptions, setSelectboxOptions] = useState([])
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      shipment_type: '',
      service_type: {}
    }
  })

  useEffect(() => {
    fetchServiceData()
  },[])

  const fetchServiceData = () => {
    return useJwt
      .axiosGet(getApi(SERVICE_TYPE_LIST))
      .then((res) => {
        // console.log("res", res.data)
        let serviceTypeData = []

        res.data.map(data => {
          serviceTypeData.push({value: data.id, label: data.service_type})
        })

        setSelectboxOptions(serviceTypeData)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const handleCityChange = (service) => {
    setValue('service_type', service)
  }

  
  const onSubmit = data => {
    // console.log("data", data)
    setData(data)
    if (data.service_type !== null && data.shipment_type !== null) {
      // console.log("data", data)

      let formData = {
        shipment_type: data.shipment_type,
        service_type: data.service_type.value,
        status: 'active'
      }

      console.log("formData", formData)

      useJwt
        .axiosPost(getApi(SHIPMENT_TYPE_ADD), formData)
        .then((res) => {
          console.log("res", res.data)
          // handleReset()
          // toast(t => (
          //   <ToastContent t={t} type='SUCCESS' message={'Area Added Successfully'} />
          // ))
          SwalAlert("Shipment Type Added Successfully")
          navigate("/shipment_type")
        })
        .catch(err => console.log(err))

      // console.log(formData)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Add Shipment Type</CardTitle>
      </CardHeader>

      <CardBody>
      <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
              <Label className='form-label' for='service_type'>
                Service Type
              </Label>
              <Controller
                  id="service_type"
                  name="service_type"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
                    className={classnames('react-select', { 'is-invalid': data !== null && data.service_type === null })} 
                    classNamePrefix='select'
                    options={selectboxOptions} 
                    {...field} 
                  />}
                />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='shipment_type'>
              Shipment Type
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='shipment_type'
              name='shipment_type'
              render={({ field }) => <Input placeholder='Regular' invalid={errors.shipment_type && true} {...field} />}
            />
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
export default AddShipmentType
