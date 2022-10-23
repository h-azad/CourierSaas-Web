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
import { useNavigate , useParams} from "react-router-dom"
import Select from "react-select"
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, VOLUMETRIC_POLICY_EDIT,VOLUMETRIC_POLICY_DETAILS, PRODUCT_TYPE_LIST } from '@src/constants/apiUrls'
import { useEffect, useState } from "react"
import SwalAlert from "../../components/SwalAlert"

const EditVolumetricPolicy = () => {
  const [selectboxProduct, setSelectboxProduct] = useState([])
  const [data, setData] = useState(null)
  const [volumetricInfo, setVolumetricInfo] = useState(null)

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
      volumetric_policy: '',
      product_type: {},   

    }
  })
  
  let { id } = useParams()

  useEffect(() => {
    console.log(id)
    useJwt
      .axiosGet(getApi(VOLUMETRIC_POLICY_DETAILS) + id + "/")
      .then((res) => {
        console.log("res", res.data)
        setVolumetricInfo(res.data)
        console.log(identity.find(id => id.value == volumetricInfo.identity))
        return res.data
      })
      .catch(err => console.log(err))
      
  }, [])
  

  useEffect(() => {
    fetchProductData()
  },[])

  const fetchProductData = () => {
    return useJwt
      .axiosGet(getApi(PRODUCT_TYPE_LIST))
      .then((res) => {
        let productData = []

        res.data.map(data => {
          productData.push({value: data.id, label: data.product_type})
        })

        setSelectboxProduct(productData)
        return res.data
      })
      .catch(err => console.log(err))
  }

  const onSubmit = data => {
    console.log("data", data)

    let isFormValid = true

    if(!(data.product && data.product.value)) {
      setError('product', { type: 'required', message: 'Product Type is required' })
      isFormValid = false
    }

    if(!data.policy_title) {
      setError('policy_title', { type: 'required', message: 'Policy Title is required' })
      isFormValid = false
    }
    
    if(!data.delivary_charge) {
      setError('delivary_charge', { type: 'required', message: 'Delivary Charge is required' })
      isFormValid = false
    } 
    if(!data.min_dimention) {
      setError('min_dimention', { type: 'required', message: 'Min Dimention is required' })
      isFormValid = false
    } 
    if(!data.max_dimention) {
      setError('max_dimention', { type: 'required', message: 'Max Dimention is required' })
      isFormValid = false
    } 
    if(!data.max_weight) {
      setError('max_weight', { type: 'required', message: 'Max Weight is required' })
      isFormValid = false
    } 
    if(!data.additional_charge) {
      setError('additional_charge', { type: 'required', message: 'Additional Charge is required' })
      isFormValid = false
    } 
    if(!data.per_dimention) {
      setError('per_dimention', { type: 'required', message: 'Per Dimention is required' })
      isFormValid = false
    } 
    if(!data.cod_charge) {
      setError('cod_charge', { type: 'required', message: 'COD Charge is required' })
      isFormValid = false
    }
   
    if(!isFormValid) {
      return false
    }

    setData(data)
    {

      let formData = {
        policy_title: data.policy_title,
        product: data.product.value,
        delivary_charge: data.delivary_charge,
        min_dimention: data.min_dimention,
        max_dimention: data.max_dimention,
        max_weight: data.max_weight,
        additional_charge: data.additional_charge,
        per_dimention: data.per_dimention,
        cod_charge: data.cod_charge,
        status: 'active'
      }

      console.log("formData", formData)

      useJwt
        .axiosPost(getApi(VOLUMETRIC_POLICY_EDIT), formData)
        .then((res) => {
          console.log("res", res.data)
          SwalAlert("Pricing Policy Edited Successfully")
          navigate("/volumetric_policy")
        })
        .catch(err => console.log(err))

    }
  }
  

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Edit Pricing Policy</CardTitle>
      </CardHeader>

      <CardBody>
      {volumetricInfo &&
      <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
              <Label className='form-label' for='product_type'>
                 Product Type
              </Label>
              <Controller
                  defaultValue={{value: volumetricInfo.product.id, label: volumetricInfo.product.product_type}}
                  id="product"
                  name="product"
                  control={control}
                  render={({ field }) => <Select 
                    isClearable
                    className={classnames('react-select', { 'is-invalid': errors.product && true })} 
                    classNamePrefix='select'
                    options={selectboxProduct} 
                    {...field} 
                  />}
                />
              {errors && errors.product && <span>{errors.product.message}</span>}
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='policy_title'>
              Policy Title
            </Label>
            <Controller
              defaultValue={volumetricInfo.policy_title}
              control={control}
              id='policy_title'
              name='policy_title'
              render={({ field }) => <Input placeholder='' invalid={errors.policy_title && true} {...field} />}
            />
            {errors && errors.policy_title && <span>{errors.policy_title.message}</span>}
          </div>

          <div className='mb-1'>
            <Label className='form-label' for='delivary_charge'>
              Delivary Charge
            </Label>
            <Controller
              defaultValue={volumetricInfo.delivary_charge}
              control={control}
              id='delivary_charge'
              name='delivary_charge'
              render={({ field }) => <Input placeholder='' invalid={errors.delivary_charge && true} {...field} />}
            />
            {errors && errors.delivary_charge && <span>{errors.delivary_charge.message}</span>}
          </div>

          <div class="row">
            <div class="col-lg-4">
              <div className='mb-1'>
                <Label className='form-label' for='min_dimention'>
                Min Dimension
                </Label>
                <Controller
                  defaultValue={volumetricInfo.min_dimention}
                  control={control}
                  id='min_dimention'
                  name='min_dimention'
                  render={({ field }) => <Input placeholder='' invalid={errors.min_dimention && true} {...field} />}
                />
                {errors && errors.min_dimention && <span>{errors.min_dimention.message}</span>}
              </div>
            </div>
            <div class="col-lg-4">
              <div className='mb-1'>
                <Label className='form-label' for='max_dimention'>
                Max Dimension
                </Label>
                <Controller
                  defaultValue={volumetricInfo.max_dimention}
                  control={control}
                  id='max_dimention'
                  name='max_dimention'
                  render={({ field }) => <Input placeholder='' invalid={errors.max_dimention && true} {...field} />}
                />
                {errors && errors.max_dimention && <span>{errors.max_dimention.message}</span>}
              </div>
            </div>
            <div class="col-lg-4">
              <div className='mb-1'>
                <Label className='form-label' for='max_weight'>
                Max Weight / KG
                </Label>
                <Controller
                  defaultValue={volumetricInfo.max_weight}
                  control={control}
                  id='max_weight'
                  name='max_weight'
                  render={({ field }) => <Input placeholder='' invalid={errors.max_weight && true} {...field} />}
                />
                {errors && errors.max_weight && <span>{errors.max_weight.message}</span>}
              </div>
            </div>
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='additional_charge'>
            Addition Charge
            </Label>
            <Controller
              defaultValue={volumetricInfo.additional_charge}
              control={control}
              id='additional_charge'
              name='additional_charge'
              render={({ field }) => <Input placeholder='' invalid={errors.additional_charge && true} {...field} />}
            />
            {errors && errors.additional_charge && <span>{errors.additional_charge.message}</span>}
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='per_dimention'>
            Per Dimension
            </Label>
            <Controller
              defaultValue={volumetricInfo.per_dimention}
              control={control}
              id='per_dimention'
              name='per_dimention'
              render={({ field }) => <Input placeholder='' invalid={errors.per_dimention && true} {...field} />}
            />
            {errors && errors.per_dimention && <span>{errors.per_dimention.message}</span>}
          </div>
          
          <div className='mb-1'>
            <Label className='form-label' for='cod_charge'>
            COD Charge
            </Label>
            <Controller
              defaultValue={volumetricInfo.cod_charge}
              control={control}
              id='cod_charge'
              name='cod_charge'
              render={({ field }) => <Input placeholder='' invalid={errors.cod_charge && true} {...field} />}
            />
            {errors && errors.cod_charge && <span>{errors.cod_charge.message}</span>}
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
export default EditVolumetricPolicy





// import { Card,
//   CardHeader,
//   CardTitle,
//   CardBody,
//   Input,
//   Form,
//   Button,
//   Label,} from 'reactstrap'
// import { Router, useNavigate, useParams} from "react-router-dom"
// import Select from "react-select"
// import classnames from 'classnames'
// import { useForm, Controller } from 'react-hook-form'
// import { selectThemeColors } from "@utils"
// import useJwt from '@src/auth/jwt/useJwt'
// // import { getApi, VOLUMETRIC_POLICY_EDIT, VOLUMETRIC_POLICY_DETAILS, SERVICE_TYPE_LIST, SHIPMENT_TYPE_LIST,PRODUCT_TYPE_LIST} from '@src/constants/apiUrls'
// import { getApi, VOLUMETRIC_POLICY_EDIT, VOLUMETRIC_POLICY_DETAILS} from '@src/constants/apiUrls'
// import { useEffect, useState } from 'react'
// import SwalAlert from "../../components/SwalAlert"


// const EditVolumetricPolicy = () => {
//   // const [selectboxService, setSelectboxService] = useState([])
//   // const [selectboxShipment, setSelectboxShipment] = useState([])
//   // const [selectboxProduct, setSelectboxProduct] = useState([])
//   const [volumetricInfo, setVolumetricInfo] = useState(null)
//   const [data, setData] = useState(null)

//   let { id } = useParams()
//   const navigate = useNavigate()

//   useEffect(() => {
//     console.log(id)
//     useJwt
//       .axiosGet(getApi(VOLUMETRIC_POLICY_DETAILS) + id + "/")
//       .then((res) => {
//         console.log("res", res.data)
//         setVolumetricInfo(res.data)
//         return res.data
//       })
//       .catch(err => console.log(err))
//       // fetchServiceData(),
//       // fetchShipmentData(),
//       // fetchProductData()

//   }, [])

//   // const fetchServiceData = () => {
//   //   return useJwt
//   //     .axiosGet(getApi(SERVICE_TYPE_LIST))
//   //     .then((res) => {
//   //       // console.log("res", res.data)
//   //       let serviceData = []

//   //       res.data.map(data => {
//   //         serviceData.push({value: data.id, label: data.service_type})
//   //       })

//   //       setSelectboxService(serviceData)
//   //       return res.data
//   //     })
//   //     .catch(err => console.log(err))
//   // }

//   // const fetchShipmentData = () => {
//   //   return useJwt
//   //     .axiosGet(getApi(SHIPMENT_TYPE_LIST))
//   //     .then((res) => {
//   //       // console.log("res", res.data)
//   //       let shipmentData = []

//   //       res.data.map(data => {
//   //         shipmentData.push({value: data.id, label: data.shipment_type})
//   //       })

//   //       setSelectboxShipment(shipmentData)
//   //       return res.data
//   //     })
//   //     .catch(err => console.log(err))
//   // }

//   // const fetchProductData = () => {
//   //   return useJwt
//   //     .axiosGet(getApi(PRODUCT_TYPE_LIST))
//   //     .then((res) => {
//   //       // console.log("res", res.data)
//   //       let productData = []

//   //       res.data.map(data => {
//   //         productData.push({value: data.id, label: data.product_type})
//   //       })

//   //       setSelectboxProduct(productData)
//   //       return res.data
//   //     })
//   //     .catch(err => console.log(err))
//   // }
//   const {
//     reset,
//     control,
//     setValue,
//     setError,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     defaultValues: volumetricInfo
//   })
  
//   const onSubmit = data => {

//     let isFormValid = true

//     // if(!(data.service_type && data.service_type.value)) {
//     //   setError('service_type', { type: 'required', message: 'Service Type must be added' })
//     //   isFormValid = false
//     // }
//     // if(!(data.shipment_type && data.shipment_type.value)) {
//     //   setError('shipment_type', { type: 'required', message: 'Shipment Type must be added' })
//     //   isFormValid = false
//     // }

//     // if(!(data.product_type && data.product_type.value)) {
//     //   setError('product_type', { type: 'required', message: 'Product Type must be added' })
//     //   isFormValid = false
//     // }

//     if(!data.volumetric_policy) {
//       setError('volumetric_policy', { type: 'required', message: 'Volumetric Policy must be added' })
//       isFormValid = false
//     }
   
//     if(!isFormValid) {
//       return false
//     }

//     setData(data)
//     // if (data.service_type !== null && data.volumetric_policy !== null && data.shipment_type !== null && data.product_type !== null)  {
//     if ( data.product_type !== null)  {
      
//       let formData = {
//         volumetric_policy: data.volumetric_policy,
//         // service: data.service_type.value,
//         // shipment: data.shipment_type.value,
//         // product: data.product_type.value,
//         status: 'active'
//       }
              
//       console.log('formData',formData)
//       useJwt
//         .axiosPut(getApi(VOLUMETRIC_POLICY_EDIT) + id + "/", formData)
//         .then((res) => {
//           console.log("res", res.data)
//           SwalAlert("Volumetric Policy Edited Successfully")
//           navigate("/volumetric_policy")
//         })
//         .catch(err => console.log(err))
//     }
//   }

//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle tag="h4">Edit Volumetric Policy</CardTitle>
//         </CardHeader>  
//         <CardBody>
//           {volumetricInfo &&
//         <Form onSubmit={handleSubmit(onSubmit)}>
//             {/* <div className='mb-1'>
//               <Label className='form-label' for='service_type'>
//                Service Type
//               </Label>
//               <Controller
//                   id="service_type"
//                   defaultValue={{label: volumetricInfo.service && volumetricInfo.service.service_type ? volumetricInfo.service.service_type : "" , value: volumetricInfo.service?.id}}
//                   name="service_type"
//                   control={control}
//                   render={({ field }) => <Select 
//                     isClearable
//                     defaultValue={volumetricInfo.service_type}
//                     className={classnames('react-select', { 'is-invalid':errors.service_type && true })} 
//                     classNamePrefix='select'
//                     options={selectboxService} 
//                     {...field} 
//                   />}
//                 />
//                 {errors && errors.service_type && <span>{errors.service_type.message}</span>}
//           </div>
//           <div className='mb-1'>
//               <Label className='form-label' for='shipment_type'>
//                Shipment Type
//               </Label>
//               <Controller
//                   id="shipment_type"
//                   defaultValue={{label: volumetricInfo.shipment && volumetricInfo.shipment.shipment_type? volumetricInfo.shipment.shipment_type : "", value: volumetricInfo.shipment?.id}}
//                   name="shipment_type"
//                   control={control}
//                   render={({ field }) => <Select 
//                     isClearable
//                     defaultValue={volumetricInfo.shipment_type}
//                     className={classnames('react-select', { 'is-invalid': errors.shipment_type && true })} 
//                     classNamePrefix='select'
//                     options={selectboxShipment} 
//                     {...field} 
//                   />}
//                 />
//                 {errors && errors.shipment_type && <span>{errors.shipment_type.message}</span>}
//           </div>
//           <div className='mb-1'>
//               <Label className='form-label' for='product_type'>
//                Product Type
//               </Label>
//               <Controller
//                   id="product_type"
//                   defaultValue={{label: volumetricInfo.product && volumetricInfo.product.product_type? volumetricInfo.product.product_type : "", value: volumetricInfo.product?.id}}
//                   name="product_type"
//                   control={control}
//                   render={({ field }) => <Select 
//                     isClearable
//                     defaultValue={volumetricInfo.product_type}
//                     className={classnames('react-select', { 'is-invalid': errors.product_type && true })} 
//                     classNamePrefix='select'
//                     options={selectboxProduct} 
//                     {...field} 
//                   />}
//                 />
//                 {errors && errors.product_type && <span>{errors.product_type.message}</span>}
//           </div> */}
//             <div className='mb-1'>
//               <Label className='form-label' for='product_type'>
//                Volumetric Policy
//               </Label>
//               <Controller
//                 defaultValue={volumetricInfo.volumetric_policy}
//                 control={control}
//                 id='volumetric_policy'
//                 name='volumetric_policy'
//                 render={({ field }) => <Input placeholder='KG' invalid={errors.volumetric_policy && true} {...field} />}
//               />
//               {errors && errors.volumetric_policy && <span>{errors.volumetric_policy.message}</span>}
//             </div>
            
//             <div className='d-flex'>
//               <Button className='me-1' color='primary' type='submit'>
//                 Submit
//               </Button>
//             </div>
//           </Form>
//           }
//         </CardBody>
//       </Card>
//     )
//   }
//   export default EditVolumetricPolicy
        
