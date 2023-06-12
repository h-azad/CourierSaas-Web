import React from "react"
import { useEffect, useState } from "react"
import { formatDate } from "@utils"
import useJwt from "@src/auth/jwt/useJwt"
import SwalConfirm from "../../../SwalConfirm"
import {
  getApi,
  CREATE_ORDER_LIST,
  RIDER_DELIVARY_STATUS_UPDATE,
  RIDER_DELIVARY,
  RIDER_DELIVERY_CREATE_ORDER_FILTER,
  DELIVERY_ASSIGNMENT,
} from "@src/constants/apiUrls"
import { Dropdown, Typography, Select, Button, Space, Menu } from "antd"
import PickupStatusModal from "../../../rider_view/task/pickup/PickupStatusModal"
import { string } from "yup"
import toast from "react-hot-toast"
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
import { DownOutlined, EyeOutlined } from "@ant-design/icons"
import { MoreVertical, Edit, Trash, Search, Edit3, Eye } from "react-feather"
import ChangeStatusModalRider from "../delivary/DelivaryStatusModal"

const DelivaryView = ({}) => {
  const [delivaryData, setDelivaryData] = useState([])
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedInfo, setSelectedInfo] = useState(null)

  const fetchDelivaryData = () => {
    return useJwt
      .axiosGet(getApi(RIDER_DELIVERY_CREATE_ORDER_FILTER))
      .then((res) => {
        console.log("res", res.data)
        setDelivaryData(res.data)

        return res.data
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchDelivaryData()
  }, [])

  useEffect(() => {
    if (!statusModalState) {
      clearData()
    }
    fetchDelivaryData()
  }, [statusModalState])

  const updateStatusAction = (e) => {
    e.preventDefault()
    console.log("selectedInfo", selectedInfo)
    console.log("selectedStatus", selectedStatus)
    return false
  }

  const changeDeliveryStatusAction = (e, info) => {
    e.preventDefault()
    useJwt
      .axiosPost(
        getApi(`${DELIVERY_ASSIGNMENT}/${info.id}/confirm_delivery/`),
        { details: info }
      )
      .then((res) => {
        toast.success(res.data)
        fetchDelivaryData()
      })
      .catch((err) => console.log(err))
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
      .axiosPatch(getApi(RIDER_DELIVARY_STATUS_UPDATE) + `${id}/`, formData)
      .then((res) => {
        toast.success("Delivary Status Updated Successfully!")
        setStatusModalState(false)
        fetchDelivaryData()
      })
      .catch((err) => {
        toast.success("Delivary Status Updated Failed!")
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

  return (
    <>
      <div className="invoice-title-card">
        <h3> Delivary Task </h3>
      </div>
      <hr></hr>
      {delivaryData &&
        delivaryData.map((info) => (
          // <Card className='invoice-preview-card'>
          //     <CardBody>
          //         <Row >
          //             <Col xl='9'>
          //                 <h5 className='mb-25'><b>Parcel Id :{info?.parcel_id}  </b> </h5>
          //                 <h9 className='mb-25'>Created:{info.created_at} </h9>
          //             </Col>
          //         </Row>
          //         <Row className='mt-2' >
          //             <Col xl='7'>
          //                 <h6 className='mb-25'><b>Recipient Name :{info?.recipient_name}</b>  </h6>
          //                 <h6 className='mb-25'>Phone Number :  {info?.phone_number}</h6>
          //                 <h6 className='mb-25'>Delivary Address : {info?.delivary_address}</h6>
          //                 <h6 className='mb-25 '> Delivary Status : <span className='highlight-status'>
          //                     <Select
          //                         defaultValue="No"
          //                         style={{
          //                             width: 120,
          //                         }}
          //                         bordered={false}
          //                         onChange={(value) => handleChange(info.id, value)}
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
          //                 <h6 className='mb-25'>Product type :{info.product_type.product_type} </h6>
          //                 <h6 className='mb-25'>Shipment type :{info.shipment_type.shipment_type}</h6>
          //                 <h6 className='mb-25'>Delivary Charge:{info?.delivary_charge} </h6>
          //                 <h6 className='mb-25'>Total Amount :  {info?.amount_to_be_collected}</h6>
          //             </Col>
          //         </Row>

          //     </CardBody>
          //     <PickupStatusModal
          //         statusModalState={statusModalState}
          //         setStatusModalState={setStatusModalState}
          //         Info={selectedInfo}
          //         fetchDelivaryData={fetchDelivaryData}
          //     />

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
                        {info.pickup_status &&
                          info.warehouse_status &&
                          !info.delivery_status && (
                            <DropdownItem
                              href="/"
                              onClick={(e) =>
                                changeDeliveryStatusAction(e, info)
                              }
                            >
                              <Edit3 className="me-50" size={15} />{" "}
                              <span className="align-middle">
                                Confirm Delivery
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
            <ChangeStatusModalRider
              statusModalState={statusModalState}
              setStatusModalState={setStatusModalState}
              taskInfo={selectedInfo}
              fetchDelivaryData={fetchDelivaryData}
            />
          </Card>
        ))}
    </>
  )
}

export default DelivaryView
