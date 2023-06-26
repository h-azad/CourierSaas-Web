import React from "react"
import {
  Card,
  CardBody,
  CardText,
  Row,
  Col,
  Table,
  Tooltip,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap"
import { useEffect, useState } from "react"
import { formatDate } from "@utils"
import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  CREATE_ORDER_LIST,
  RIDER_PICKUP_STATUS_UPDATE,
  RIDER_PICKUP,
  RIDER_PICKUP_CREATE_ORDER_FILTER,
  RIDER_ASSIGNMENT,
} from "@src/constants/apiUrls"
import { Dropdown, Typography, Select, Button, Space, Menu } from "antd"
import PickupStatusModal from "../../../rider_view/task/pickup/PickupStatusModal"
import toast from "react-hot-toast"
import { DownOutlined, EyeOutlined } from "@ant-design/icons"
import { MoreVertical, Edit, Trash, Search, Edit3, Eye } from "react-feather"
import ChangeStatusModalRider from "../delivary/DelivaryStatusModal"
import CancelReasonModal from "./CancelReasonModal"
import CancelByMarchantModal from "./CancelByMarchantModal"
import SwalConfirm from "../../../SwalConfirm"
const PickupView = ({ orderInfo }) => {
  const [pickupData, setPickupData] = useState([])
  const [statusModalState, setStatusModalState] = useState(false)
  const [cancleModalState, setCancleModalState] = useState(false)
  const [cancelByMarchantModalState, setCancelByMarchantModalState] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedInfo, setSelectedInfo] = useState(null)

  const [modalState, setModalState] = useState(false)


  const fetchPickupData = () => {
    return useJwt
      .axiosGet(getApi(RIDER_PICKUP_CREATE_ORDER_FILTER))
      .then((res) => {
        console.log("res jjjjjjj", res.data)
        setPickupData(res.data)

        return res.data
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchPickupData()
  }, [])

  useEffect(() => {
    if (!cancleModalState) {
      clearData()
    }
    fetchPickupData()
  }, [cancleModalState])

  const pickupReturnAction = (e, info) => {
    e.preventDefault()
    setStatusModalState(true)
    setSelectedStatus(info.status)
    setSelectedInfo(info)
  }



  const clearData = () => {
    setSelectedInfo(null)
    setSelectedStatus(null)
  }

  const updateStatusActionx = (selectedValue, id) => {
    const formData = {
      status: selectedValue,
    }
    console.log("formData", formData)

    useJwt
      .axiosPatch(getApi(RIDER_PICKUP_STATUS_UPDATE) + `${id}/`, formData)
      .then((res) => {
        toast.success("Pickup Status Updated Successfully!")
        setStatusModalState(false)
        fetchPickupData()
      })
      .catch((err) => {
        toast.success("Pickup Status Updated Failed!")
        setStatusModalState(false)
      })
  }
  const handleChange = (id, selectedValue) => {
    // console.log(`selected xxx ${value}`)
    updateStatusActionx(selectedValue, id)
  }

  const changeStatusAction = (e, info) => {
    e.preventDefault()
    console.log(`selected xxx ${value}`)

    setStatusModalState(true)
    setSelectedStatus(info.status)
    setSelectedInfo(info)
  }

  // const confirmPickup = (e, info) => {
  //   e.preventDefault()
  //   useJwt
  //     .axiosPost(getApi(`${RIDER_ASSIGNMENT}/${info.id}/confirm_pickup/`))
  //     .then((res) => {
  //       toast.success(res.data)
  //       fetchPickupData()
  //     })
  //     .catch((err) => console.log(err))
  // }


 

  const cancelByRiderAction = (e, info) => {
    e.preventDefault()
    useJwt
      .axiosPost(getApi(`${RIDER_ASSIGNMENT}/${info.id}/cancel_by_pickup_rider/`))
      .then((res) => {
        toast.success(res.data)
        fetchPickupData()
      })
      .catch((err) => console.log(err))
  }



  // const pickupCancelIssue = (e, info) => {
  //   e.preventDefault()
  //   setModalState(true)
  //   // setSelectedStatus(info.status)
  //   setSelectedInfo(info)
  // }


  
  const confirmPickup = (e, info) => {
    e.preventDefault()
    return SwalConfirm(`Confirm Pickup`).then(
      function (result) {
        if (result.value) {
          useJwt
          .axiosPost(getApi(`${RIDER_ASSIGNMENT}/${info.id}/confirm_pickup/`))
          .then((res) => {
            toast.success(res.data)
            fetchPickupData()
          })
          .catch((err) => console.log(err))
        }
      }
    )
  }

  const pickupCancelIssue = (e, info) => {
    e.preventDefault()
    setCancleModalState(true)
    setSelectedInfo(info)
  }

  const cancelByMarchant = (e, info) => {
    e.preventDefault()
    setCancelByMarchantModalState(true)
    setSelectedInfo(info)
  }


  return (
    <>
      <div className="invoice-title-card">
        <h3> Pickup Task </h3>
      </div>
      <hr></hr>
      {pickupData &&
        pickupData.map((info) => (
          // <Card className='invoice-preview-card'>
          //     <CardBody>
          //         <Row >
          //             <Col xl='9'>
          //                         <h5 className='mb-25'><b>Parcel Id :{info?.parcel_id}  </b> </h5>
          //                         <h9 className='mb-25'>Created:{info.created_at} </h9>
          //             </Col>
          //         </Row>
          //         <Row className='mt-2' >
          //             <Col xl='7'>
          //                         <h6 className='mb-25'><b>Recipient Name :{info?.recipient_name}</b>  </h6>
          //                         <h6 className='mb-25'>Phone Number :  {info?.phone_number}</h6>
          //                         <h6 className='mb-25'>Delivary Address : {info?.delivary_address}</h6>
          //                 <h6 className='mb-25 '> Pickup Status : <span className='highlight-status'>
          //                     <Select
          //                         defaultValue="No"
          //                         style={{
          //                             width: 120,
          //                         }}
          //                         bordered={false}
          //                                 onChange={(value) => handleChange(info.id, value)}
          //                         options={[
          //                             {
          //                                 value: 'No',
          //                                 label: 'No',

          //                             },
          //                             {
          //                                 value: 'Yes',
          //                                 label: 'Yes',
          //                             },
          //                         ]}
          //                     /></span></h6>

          //             </Col>
          //             <Col xl='5'>
          //                         <h6 className='mb-25'>Product type :{info.product_type.product_type} </h6>
          //                         <h6 className='mb-25'>Shipment type :{info.shipment_type.shipment_type}</h6>
          //                         <h6 className='mb-25'>Delivary Charge:{info?.delivary_charge} </h6>
          //                         <h6 className='mb-25'>Total Amount :  {info?.amount_to_be_collected}</h6>
          //             </Col>
          //         </Row>

          //     </CardBody>
          //             <PickupStatusModal
          //                 statusModalState={statusModalState}
          //                 setStatusModalState={setStatusModalState}
          //                 Info={selectedInfo}
          //                 fetchPickupData={fetchPickupData}
          //             />

          // </Card >

          <Card className="invoice-preview-card">
            <CardBody>
              <Row>
                <Col xl="9">
                  <h5 className="mb-25">
                    <b>Parcel Id :{info?.parcel_id} </b>{" "}
                  </h5>
                  <h9 className="mb-25">Created: {info.created_at}</h9>
                </Col>
                <Col xl="3">
                  <div className="button-wrapper">
                    <button className="action-view">
                      <EyeOutlined />
                      <a href={"/rider-orders/task-view/" + info?.id}> View</a>
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

                        {info.pickup_status == false &&
                          !info.warehouse_status && (
                            <DropdownItem
                              href="/"
                              onClick={(e) => pickupCancelIssue(e, info)}
                            >
                              <Edit3 className="me-50" size={15} />{" "}
                              <span className="align-middle">
                                Cencelled
                              </span>
                            </DropdownItem>
                          )}
                        {/* {info.pickup_status == false &&
                          !info.warehouse_status && (
                            <DropdownItem
                              href="/"
                              onClick={(e) => pickupReturnAction(e, info)}
                            >
                              <Edit3 className="me-50" size={15} />{" "}
                              <span className="align-middle">
                                ReversoRide
                              </span>
                            </DropdownItem>
                          )}

                        {info.pickup_status == false &&
                          !info.warehouse_status && (
                            <DropdownItem
                              href="/"
                              onClick={(e) => cancelByMarchant(e, info)}
                            >
                              <Edit3 className="me-50" size={15} />{" "}
                              <span className="align-middle">
                                Cancel By Marchant
                              </span>
                            </DropdownItem>
                          )} */}

                        {info.pickup_status == false &&
                          !info.warehouse_status && (
                            <DropdownItem
                              href="/"
                              onClick={(e) => confirmPickup(e, info)}
                            >
                              <Edit3 className="me-50" size={15} />{" "}
                              <span className="align-middle">
                                Confirm Picked Up
                              </span>
                            </DropdownItem>
                          )}

                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xl="7">
                  <h6 className="mb-25">
                    <b>Recipient Name :{info?.recipient_name}</b>{" "}
                  </h6>
                  <h6 className="mb-25">Phone Number : {info?.phone_number}</h6>
                  <h6 className="mb-25">
                    Delivary Address : {info?.delivary_address}
                  </h6>
                  <h6 className="mb-25 ">
                    Order Status :{" "}
                    <span className="highlight-status">{info.status}</span>
                  </h6>
                  <h6 className="mb-25">
                    Pickup Status :
                    <span className="highlight-pickup-status">
                      {info.pickup_status == true ? "True" : "False"}
                    </span>
                  </h6>
                  <h6 className="mb-25">
                    Delivery Status :
                    <span className="highlight-pickup-status">
                      {info.delivery_status == true ? "True" : "False"}
                    </span>
                  </h6>
                </Col>
                <Col xl="5">
                  <h6 className="mb-25">
                    Warehouse Status :
                    <span className="highlight-pickup-status">
                      {info.warehouse_status == true ? "True" : "False"}
                    </span>
                  </h6>
                  <h6 className="mb-25">
                    Product type : {info.product_type.product_type}
                  </h6>
                  <h6 className="mb-25">
                    Shipment type : {info.shipment_type.shipment_type}
                  </h6>
                  <h6 className="mb-25">
                    Delivary Charge: {info?.delivary_charge}
                  </h6>
                  <h6 className="mb-25">
                    Collection Amount : {info?.amount_to_be_collected}
                  </h6>
                  <h6 className="mb-25">
                    Total Amount :{" "}
                    {Number(info?.amount_to_be_collected) +
                      Number(info?.delivary_charge)}
                  </h6>
                </Col>
              </Row>
            </CardBody>
            {/* <PickupStatusModal
              statusModalState={statusModalState}
              setStatusModalState={setStatusModalState}
              taskInfo={selectedInfo}
              fetchPickupData={fetchPickupData}
            /> */}
            <CancelReasonModal
              cancleModalState={cancleModalState}
              setCancleModalState={setCancleModalState}
              taskInfo={selectedInfo}
              fetchPickupData={fetchPickupData}
            />
            {/* <CancelByMarchantModal
            cancelByMarchantModalState={cancelByMarchantModalState}
            setCancelByMarchantModalState={setCancelByMarchantModalState}
            taskInfo={selectedInfo}
            fetchPickupData={fetchPickupData}
            /> */}
          </Card>
        ))}
    </>
  )
}

export default PickupView
