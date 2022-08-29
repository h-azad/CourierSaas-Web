// // ** Reactstrap Imports
// import { Card,
//   CardHeader,
//   CardTitle,
//   CardBody,
//   Row,
//   Col,
//   Input,
//   Form,
//   Button,
//   Label,} from 'reactstrap'
// import { Router, useNavigate, useParams} from "react-router-dom"
// import Select from "react-select"
// import toast from 'react-hot-toast'
// import { useForm, Controller } from 'react-hook-form'
// import { selectThemeColors } from "@utils"
// import useJwt from '@src/auth/jwt/useJwt'
// import { getApi, AREAS_EDIT, AREAS_DETAILS } from '@src/constants/apiUrls'
// import ToastContent from "../../components/ToastContent"  
// import { useEffect, useState } from 'react'

// const EditAreas = () => {

//   const [areasInfo, setAreasInfo] = useState(null)

//   let { id } = useParams()
//   const navigate = useNavigate()

//   useEffect(() => {
//     console.log(id)
//     useJwt
//       .axiosGet(getApi(AREAS_DETAILS) + id + "/")
//       .then((res) => {
//         setAreasInfo(res.data)
//         return res.data
//       })
//       .catch(err => console.log(err))
//   }, [])

//   const {
//     reset,
//     control,
//     setError,
//     handleSubmit,
//     formState: { errors }
//   } = useForm()


  
//   const onSubmit = data => {
//     if (Object.values(data).every(field => field.length > 0)) {
//       let formData = {
//         areas_name: data.areas_name,
//         cities_name: data.cities_name,
//         status: 'active'
//       }
      
//       useJwt
//         .axiosPut(getApi(AREAS_EDIT) + id + "/", formData)
//         .then((res) => {
//           console.log("res", res.data)
//           toast(t => (
//             <ToastContent t={t} type='SUCCESS' message={'Area Edited Successfully'} />
//           ))
//           navigate("/areas")
//         })
//         .catch(err => console.log(err))

//     } else {
//       for (const key in data) {
//         if (data[key].length === 0) {
//           setError(key, {
//             type: 'manual'
//           })
//         }
//       }
//     }
//   }

//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle tag="h4">Edit Areas</CardTitle>
//         </CardHeader>
  
//         <CardBody>
//           {areasInfo &&
//         <Form onSubmit={handleSubmit(onSubmit)}>
//             <div className='mb-1'>
//               <Label className='form-label' for='firstNameBasic'>
//                 Areas Name
//               </Label>
//               <Controller
//                 defaultValue={areasInfo.areas_name}
//                 control={control}
//                 id='areas_name'
//                 name='areas_name'
//                 render={({ field }) => <Input placeholder='Mirpur' invalid={errors.areas_name && true} {...field} />}
//               />
//             </div>
//             <div className='mb-1'>
//               <Label className='form-label' for='firstNameBasic'>
//                 Cities Name
//               </Label>
//               <Controller
//                 defaultValue={areasInfo.cities_name}
//                 control={control}
//                 id='cities_name'
//                 name='cities_name'
//                 render={({ field }) => <Input placeholder='Dhaka' invalid={errors.cities_name && true} {...field} />}
//               />
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
//   export default EditAreas
        
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
import { getApi, AREAS_EDIT, AREAS_DETAILS } from '@src/constants/apiUrls'
import ToastContent from "../../components/ToastContent"  
import { useEffect, useState } from 'react'

const EditAreas = () => {

  const [areasInfo, setAreasInfo] = useState(null)

  let { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(id)
    useJwt
      .axiosGet(getApi(AREAS_DETAILS) + id + "/")
      .then((res) => {
        // console.log("res", res.data)
        setAreasInfo(res.data)
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
      // let formData = {
      //   user_name: data.user_name,
        
      //   status: 'active'
      // }
      let formData = {
                areas_name: data.areas_name,
                cities_name: data.cities_name,
                status: 'active'
              }
              
      console.log(getApi(AREAS_EDIT))
      useJwt
        .axiosPut(getApi(AREAS_EDIT) + id + "/", formData)
        .then((res) => {
          console.log("res", res.data)
          // handleReset()
          toast(t => (
            <ToastContent t={t} type='SUCCESS' message={'Areas Edited Successfully'} />
          ))
          navigate("/areas")
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
          <CardTitle tag="h4">Edit Areas</CardTitle>
        </CardHeader>
  
        <CardBody>
          {areasInfo &&
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-1'>
              <Label className='form-label' for='firstNameBasic'>
                Areas Name
              </Label>
              <Controller
                defaultValue={areasInfo.areas_name}
                control={control}
                id='areas_name'
                name='areas_name'
                render={({ field }) => <Input placeholder='Mirpur' invalid={errors.areas_name && true} {...field} />}
              />
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='firstNameBasic'>
                Cities Name
              </Label>
              <Controller
                defaultValue={areasInfo.cities_name}
                control={control}
                id='cities_name'
                name='cities_name'
                render={({ field }) => <Input placeholder='Dhaka' invalid={errors.cities_name && true} {...field} />}
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
  export default EditAreas
        
