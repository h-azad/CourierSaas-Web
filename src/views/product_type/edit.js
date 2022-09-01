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
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors } from "@utils"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, SHIPMENT_TYPE_EDIT, SHIPMENT_TYPE_DETAILS, SERVICE_TYPE_LIST } from '@src/constants/apiUrls'
import { useEffect, useState } from 'react'
import SwalAlert from "../../components/SwalAlert"


const EditShipmentType = () => {
  const [selectboxOptions, setSelectboxOptions] = useState([])
  const [data, setData] = useState(null)
  const [shipmentInfo, setShipmentInfo] = useState(null)

  let { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(id)
    useJwt
      .axiosGet(getApi(SHIPMENT_TYPE_DETAILS) + id + "/")
      .then((res) => {
        console.log("res", res.data)
        setShipmentInfo({
          service: res.data.service,
          shipment_type: res.data.shipment_type
        })
        return res.data
      })
      .catch(err => console.log(err))
      fetchServiceData()
  }, [])

  const fetchServiceData = () => {
    return useJwt
      .axiosGet(getApi(SERVICE_TYPE_LIST))
      .then((res) => {
        // console.log("res", res.data)
        let serviceData = []

        res.data.map(data => {
          serviceData.push({value: data.id, label: data.service_type})
        })

        setSelectboxOptions(serviceData)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: shipmentInfo
  })
  
  const onSubmit = data => {
    setData(data)
    if (data.service_type !== null && data.shipment_type !== null) {
      
      let formData = {
        shipment_type: data.shipment_type,
        service: data.service_type.value,
        status: 'active'
      }
              
      console.log('formData',formData)
      useJwt
        .axiosPut(getApi(SHIPMENT_TYPE_EDIT) + id + "/", formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Shipment Type Edited Successfully")
          navigate("/shipment_type")
        })
        .catch(err => console.log(err))

    }
  }

    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Edit Shipment Type</CardTitle>
        </CardHeader>
  
        <CardBody>
          {shipmentInfo &&
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-1'>
              <Label className='form-label' for='service_type'>
               Service Type
              </Label>
              <Controller
                  id="service_type"
                  defaultValue={{label: shipmentInfo.service.service_type, value: shipmentInfo.service.id}}
                  name="service_type"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
                    defaultValue={shipmentInfo.service_type}
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
                defaultValue={shipmentInfo.shipment_type}
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
          }
        </CardBody>
      </Card>
    )
  }
  export default EditShipmentType
        
