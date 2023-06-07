import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash, Search, Edit3, Eye } from "react-feather"
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  CardText,
  Label,
  Input,
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, CREATE_ORDER_LIST, CREATE_ORDER_DELETE, SEARCH_CREATE_ORDER } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"
import ChangeStatusModal from "../../create_order/partials/ChangeStatusModal"
import ChangeStatusModalRider from "../../../components/rider_view/task/delivary/DelivaryStatusModal"
import { EyeOutlined } from '@ant-design/icons'

const RiderTasks = () => {
  const [createOrder, setCreateOrder] = useState([])
  const MySwal = withReactContent(Swal)
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedInfo, setSelectedInfo] = useState(null)

  const deleteAction = (e, id) => {
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

        useJwt
          .axiosDelete(getApi(CREATE_ORDER_DELETE + id + '/'))
          .then((res) => {
            SwalAlert("Deleted Successfully")
          })
          .finally(() => fetchCreateOrderData())

      }
    })

  }

  const updateStatusAction = (e) => {
    e.preventDefault()
    console.log("selectedInfo", selectedInfo)
    console.log("selectedStatus", selectedStatus)
    return false

  }


  const changeStatusAction = (e, info) => {
    e.preventDefault()
    setStatusModalState(true)
    setSelectedStatus(info.status)
    setSelectedInfo(info)
  }

  useEffect(() => {
    fetchCreateOrderData()
  }, [])

  const fetchCreateOrderData = () => {
    return useJwt
      .axiosGet(getApi(CREATE_ORDER_LIST))
      .then((res) => {
        console.log("res", res.data)
        setCreateOrder(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (!statusModalState) {
      clearData()
    }
    fetchCreateOrderData()
  }, [statusModalState])

  const fetchSearchCreateOrderData = searchTerm => {
    return useJwt
      .axiosGet(getApi(SEARCH_CREATE_ORDER) + '?search=' + searchTerm)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = debounce(e => {
    console.log(e.target.value)
    const searchTerm = e.target.value
    if (searchTerm.length > 0) {
      fetchSearchCreateOrderData(searchTerm)
        .then(data => {
          if (data?.length > 0) {
            console.log('res', data)
            setCreateOrder(data)
          } else {
            console.log("No data")
          }
        })
    } else {
      fetchCreateOrderData()
    }

  }, 300)

  const clearData = () => {
    setSelectedInfo(null)
    setSelectedStatus(null)
  }

  function debounce(fn, time) {
    let timeoutId
    return wrapper
    function wrapper(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        timeoutId = null
        fn(...args)
      }, time)
    }
  }

  return (
    // <>
    //   <CardText>
    //     <div className="row justify-content-between">
    //       <div className="col-lg-5">
    //         <div className="d-flex align-items-center">
    //           <Link to={'/create_order/add'}>
    //             <Button.Ripple color="primary">Add Order</Button.Ripple>
    //           </Link>
    //         </div>
    //       </div>
    //       <div className="col-lg-5">
    //         <div className="d-flex align-items-center ">
    //           <input
    //             placeholder="Search Order "
    //             name="user_name"
    //             type="text"
    //             class="form-control"
    //             onChange={handleSearch}
    //           />
    //           <Button.Ripple className="btn-icon ms-1" outline color="primary">
    //             <Search size={16} />
    //           </Button.Ripple>
    //         </div>
    //       </div>
    //     </div>
    //   </CardText>
    //   <div class="table-responsive">
    //     <Table bordered>
    //       <thead>
    //         <tr>
    //           <th>Marchant </th>
    //           {/* <th>Recipient Name</th> */}
    //           <th>Parcel Id</th>
    //           <th>Delivary Area</th>
    //           <th>Pickup Rider</th>
    //           <th>Warehouse Status</th>
    //           <th>Status</th>
    //           <th>Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {createOrder &&
    //           createOrder.map((info) => (
    //             <tr key={info.id}>
    //               <td>
    //                 <span className="align-middle fw-bold">{info.marchant.full_name}</span>
    //               </td>
    //               {/* <td>
    //                 <span className="align-middle fw-bold">{info.recipient_name}</span>
    //               </td> */}
    //               <td>
    //                 <span className="align-middle fw-bold">{info.parcel_id}</span>
    //               </td>
    //               <td>
    //                 <span className="align-middle fw-bold">{info.delivary_area.area_name}</span>
    //               </td>
    //               <td>
    //                 <span className="align-middle fw-bold">{info.pickup_rider?.full_name}</span>
    //               </td>
    //               <td>
    //                 <span className="align-middle fw-bold">{info.warehouse_status==true?'Yes':'No'}</span>
    //               </td>
    //               <td>
    //                 <Badge pill color="light-primary" className="me-1">
    //                   {info.status}
    //                 </Badge>
    //               </td>
    //               <td>
    //                 <UncontrolledDropdown>
    //                   <DropdownToggle
    //                     className="icon-btn hide-arrow"
    //                     color="transparent"
    //                     size="sm"
    //                     caret
    //                   >
    //                     <MoreVertical size={15} />
    //                   </DropdownToggle>
    //                   <DropdownMenu>
    //                     <DropdownItem href={"/create_order/view/" + info.id} >
    //                       <Eye className="me-50" size={15} />{" "}
    //                       <span className="align-middle">View</span>
    //                     </DropdownItem>
    //                     <DropdownItem href={"/create_order/edit/" + info.id}>
    //                       <Edit className="me-50" size={15} />{" "}
    //                       <span className="align-middle">Edit</span>
    //                     </DropdownItem>
    //                     <DropdownItem href="/" onClick={e=>deleteAction(e, info.id)}>
    //                       <Trash className="me-50" size={15} />{" "}
    //                       <span className="align-middle">Delete</span>
    //                     </DropdownItem>
    //                     <DropdownItem href="/" onClick={e=>changeStatusAction(e, info)}>
    //                     <Edit3 className="me-50" size={15} />{" "}
    //                     <span className="align-middle">Change Status</span>
    //                   </DropdownItem>
    //                   </DropdownMenu>
    //                 </UncontrolledDropdown>
    //               </td>
    //             </tr>
    //           ))}
    //       </tbody>
    //     </Table>

    //     <ChangeStatusModal
    //       statusModalState={statusModalState}
    //       setStatusModalState={setStatusModalState}
    //       orderInfo={selectedInfo}
    //       fetchCreateOrderData={fetchCreateOrderData}
    //     />

    //     <StatusModal
    //     statusModalState={statusModalState}
    //     setStatusModalState={setStatusModalState}
    //     updateStatusAction={updateStatusAction}
    //     title={"Change Pricing Policy Status"}
    //   >
    //     <div className='demo-inline-spacing'>
    //       <div className='form-check'>
    //         <Input type='radio' id='ex1-active' name='ex1' checked={selectedStatus == "accepted" ? true : false} onChange={() => setSelectedStatus("accepted")} />
    //         <Label className='form-check-label' for='ex1-active'>
    //         Accepted
    //         </Label>
    //       </div>
    //       <div className='form-check'>
    //         <Input type='radio' name='ex1' id='ex1-inactive' checked={selectedStatus == "pending" ? true : false} onChange={() => setSelectedStatus("pending")} />
    //         <Label className='form-check-label' for='ex1-inactive'>
    //         Pending
    //         </Label>
    //       </div>
    //       <div className='form-check'>
    //         <Input type='radio' name='ex1' id='ex1-inactive' checked={selectedStatus == "delivered" ? true : false} onChange={() => setSelectedStatus("delivered")} />
    //         <Label className='form-check-label' for='ex1-inactive'>
    //         Delivered
    //         </Label>
    //       </div>
    //     </div>
    //   </StatusModal> 
    //   </div>

    // </>



    <>
      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="d-flex align-items-center">
              <Link to={'/create_order/add'}>
                <Button.Ripple color="primary">Add Order</Button.Ripple>
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Order "
                name="user_name"
                type="text"
                class="form-control"
                onChange={handleSearch}
              />
              <Button.Ripple className="btn-icon ms-1" outline color="primary">
                <Search size={16} />
              </Button.Ripple>
            </div>
          </div>
        </div>
      </CardText>
      <div className='invoice-title-card'>
      </div>
      <hr></hr>
      {createOrder &&
        createOrder.map((info) => (
          <Card className='invoice-preview-card'>
            <CardBody>
              <Row >
                <Col xl='9'>
                  <h5 className='mb-25'><b>Parcel Id :{info?.parcel_id} </b> </h5>
                  <h9 className='mb-25'>Created: {info.created_at}</h9>
                </Col>
                <Col xl='3'>
                  <div className='button-wrapper'>
                    <button className='action-view'>
                      <EyeOutlined /><a href={"/create_order/view/" + info?.id}> View</a>
                    </button>
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
                        <DropdownItem href={"/create_order/edit/" + info.id}>
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
                  </div>
                </Col>
              </Row>
              <Row className='mt-2' >
                <Col xl='7'>
                  <h6 className='mb-25'><b>Recipient Name :{info?.recipient_name}</b>  </h6>
                  <h6 className='mb-25'>Phone Number : {info?.phone_number}</h6>
                  <h6 className='mb-25'>Delivary Address : {info?.delivary_address}</h6>
                  <h6 className='mb-25 '>Order Status : <span className='highlight-status' style={{ textTransform: 'capitalize' }}>{info.status}</span></h6>
                  <h6 className='mb-25'>Pickup Status :<span className='highlight-pickup-status'>{info.pickup_status == true ? 'True' : 'False'}</span></h6>
                </Col>
                <Col xl='5'>
                  <h6 className='mb-25'>Warehouse Status :<span className='highlight-pickup-status'>{info.warehouse_status == true ? 'True' : 'False'}</span></h6>
                  <h6 className='mb-25'>Product type : {info.product_type.product_type}</h6>
                  <h6 className='mb-25'>Shipment type : {info.shipment_type.shipment_type}</h6>
                  <h6 className='mb-25'>Delivary Charge: {info?.delivary_charge}</h6>
                  <h6 className='mb-25'>Cash On Delivery Charge : {info?.cash_on_delivery_charge}</h6>
                  <h6 className='mb-25'>Collection Amount : {info?.amount_to_be_collected}</h6>
                  <h6 className='mb-25'>Total Amount : {Number(info?.amount_to_be_collected) + Number(info?.delivary_charge)}</h6>
                  
                </Col>
              </Row>
            </CardBody>
          </Card >
        ))}
      <ChangeStatusModal
        statusModalState={statusModalState}
        setStatusModalState={setStatusModalState}
        orderInfo={selectedInfo}
        fetchCreateOrderData={fetchCreateOrderData}
      />
    </>

  )
}

export default RiderTasks
