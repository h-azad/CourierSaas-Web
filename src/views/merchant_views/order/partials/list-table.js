// import { Link } from "react-router-dom"
// import { MoreVertical, Edit, Trash, Search, Edit3, Eye } from "react-feather"
// import {
//   Table,
//   Badge,
//   UncontrolledDropdown,
//   DropdownMenu,
//   DropdownItem,
//   DropdownToggle,
//   Button,
//   CardText,
//   Label,
//   Input,
// } from "reactstrap"
// import { useEffect, useState } from "react"
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
// import useJwt from '@src/auth/jwt/useJwt'
// import { getApi, MARCHANT_ORDER_LIST, MARCHANT_ORDER_STATUS_UPDATE, CREATE_ORDER_DELETE, SEARCH_CREATE_ORDER } from "../../../../constants/apiUrls"
// import SwalAlert from "../../../../components/SwalAlert"
// import SwalConfirm from "../../../../components/SwalConfirm"
// import StatusModal from "../../../../components/StatusModal"
// import classnames from 'classnames'
// import { useForm, Controller } from 'react-hook-form'
// import Select from "react-select"
// import ChangeStatusModal from "../../../../components/merchant_views/order/ChangeStatusModal"

// const ListTable = () => {
//   // const [createOrder, setCreateOrder] = useState([])
//   // // console.log("createOrder", createOrder)
//   // const MySwal = withReactContent(Swal)
//   // const [statusModalState, setStatusModalState] = useState(false)
//   // const [selectedStatus, setSelectedStatus] = useState(null)
//   // const [selectedInfo, setSelectedInfo] = useState(null)

//   const deleteAction = (e, id) => {
//     e.preventDefault()
//     return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
//       if (result.value) {

//         useJwt
//           .axiosDelete(getApi(CREATE_ORDER_DELETE + id + '/'))
//           .then((res) => {
//             SwalAlert("Deleted Successfully")
//           })
//           .finally(() => fetchCreateOrderData())

//       }
//     })

//   }
//   const {
//     reset,
//     control,
//     watch,
//     resetField,
//     setError,
//     setValue,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     defaultValues: {

//     }
//   })

//   // const changeStatusAction = (e, info) => {
//   //   e.preventDefault()
//   //   setStatusModalState(true)
//   //   setSelectedStatus(info.status)
//   //   setSelectedInfo(info)
//   // }

//   // useEffect(() => {
//   //   fetchCreateOrderData()
//   // }, [])

//   // const fetchCreateOrderData = () => {
//   //   return useJwt
//   //     .axiosGet(getApi(MARCHANT_ORDER_LIST))
//   //     .then((res) => {
//   //       console.log("res", res.data)
//   //       setCreateOrder(res.data.data)
//   //       return res.data
//   //     })
//   //     .catch(err => console.log(err))
//   // }
  
//   // useEffect(() => {
//   //   if (!statusModalState) {
//   //     clearData()
//   //   }
//   //   fetchCreateOrderData()
//   // }, [statusModalState])

//   // const fetchSearchCreateOrderData = searchTerm => {
//   //   return useJwt
//   //     .axiosGet(getApi(SEARCH_CREATE_ORDER) + '?search=' + searchTerm)
//   //     .then((res) => {
//   //       return res.data
//   //     })
//   //     .catch((err) => console.log(err))
//   // }

//   // const handleSearch = debounce(e => {
//   //   console.log(e.target.value)
//   //   const searchTerm = e.target.value
//   //   if (searchTerm.length > 0) {
//   //     fetchSearchCreateOrderData(searchTerm)
//   //       .then(data => {
//   //         if (data.length > 0) {
//   //           console.log('res', data)
//   //           setCreateOrder(data)
//   //         } else {
//   //           console.log("No data")
//   //         }
//   //       })
//   //   }

//   // }, 300)

//   // const clearData = () => {
//   //   setSelectedInfo(null)
//   //   setSelectedStatus(null)
//   // }

//   // function debounce(fn, time) {
//   //   let timeoutId
//   //   return wrapper
//   //   function wrapper(...args) {
//   //     if (timeoutId) {
//   //       clearTimeout(timeoutId)
//   //     }
//   //     timeoutId = setTimeout(() => {
//   //       timeoutId = null
//   //       fn(...args)
//   //     }, time)
//   //   }
//   // }


//   return (
//     <>
//       <CardText>
//         <div className="row justify-content-between">
//           <div className="col-lg-5">
//             <div className="d-flex align-items-center">
//               <Link to={'/marchant-orders/create'}>
//                 <Button.Ripple color="primary">Create Order</Button.Ripple>
//               </Link>
//             </div>
//           </div>
//           <div className="col-lg-5">
//             <div className="d-flex align-items-center ">
//               <input
//                 placeholder="Search Order "
//                 name="user_name"
//                 type="text"
//                 class="form-control"
//                 // onChange={handleSearch}
//               />
//               <Button.Ripple className="btn-icon ms-1" outline color="primary">
//                 <Search size={16} />
//               </Button.Ripple>
//             </div>
//           </div>
//         </div>
//       </CardText>
//       <div class="table-responsive">
//         <Table bordered>
//           <thead>
//             <tr>
//               <th>Phone Number</th>
//               <th>Recipient Name</th>
//               <th>Delivary Area</th>
//               <th>Pickup Status</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {createOrder &&
//               createOrder.map((info) => (
//                 <tr key={info.id}>
//                   <td>
//                     <span className="align-middle fw-bold">{info.phone_number}</span>
//                   </td>
//                   <td>
//                     <span className="align-middle fw-bold">{info.recipient_name}</span>
//                   </td>
//                   <td>
//                     <span className="align-middle fw-bold">{info.delivary_address.area_name}</span>
//                   </td>
//                   <td>
//                     <span className="align-middle fw-bold">{info.pickup_status == true ? 'Picked' : 'Not Picked'}</span>
//                   </td>
//                   <td>
//                     <Badge pill color="light-primary" className="me-1">
//                       {info.status}
//                     </Badge>
//                   </td>
                  <td>
                    <UncontrolledDropdown>
                      <DropdownToggle
                        className="icon-btn hide-arrow"
                        color="transparent"
                        size="sm"
                        caret
                      >
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href={"/marchant-orders/view/" + info.id} >
                          <Eye className="me-50" size={15} />{" "}
                          <span className="align-middle">View</span>
                        </DropdownItem>
                        <DropdownItem href={"/marchant_order/edit/" + info.id}>
                          <Edit className="me-50" size={15} />{" "}
                          <span className="align-middle">Edit</span>
                        </DropdownItem>
                        <DropdownItem href="/" onClick={e => deleteAction(e, info.id)}>
                          <Trash className="me-50" size={15} />{" "}
                          <span className="align-middle">Delete</span>
                        </DropdownItem>
                        <DropdownItem href="/" onClick={e => changeStatusAction(e, info)}>
                          <Edit3 className="me-50" size={15} />{" "}
                          <span className="align-middle">Change Status</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
//                 </tr>
//               ))}
//           </tbody>
//         </Table>

//         {/* <ChangeStatusModal
//           statusModalState={statusModalState}
//           setStatusModalState={setStatusModalState}
//           orderInfo={selectedInfo}
//           fetchCreateOrderData={fetchCreateOrderData}
//         /> */}

//       </div>

//     </>
//   )
// }

// export default ListTable
