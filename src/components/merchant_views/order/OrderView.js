import React from "react"
import { Card, CardBody, Row, Col } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { Link } from "react-router-dom"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import {
  getApi,
  MARCHANT_DELETE_ORDER,
} from "@src/constants/apiUrls"
import { MoreVertical, Edit, Trash } from "react-feather"
import { EyeOutlined } from "@ant-design/icons"
import { Typography, Button} from "antd"
import ChangeStatusModalMarchant from "../../../components/merchant_views/order/ChangeStatusModal"
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap"

import OrderDetailsDrawer from "../../order/OrderDetailsDrawer"
import {Pagination} from "antd"

const OrderView = ({ currentOrderData }) => {
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState(null)

  const [orderid, setOrderId] = useState(0)
  const [open, setOpen] = useState(false)
  const showOrderDetailsDrawer = () => {
    setOpen(true)
  }
  const onCloseOrderDetailsDrawer = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!statusModalState) {
      clearData()
    }
    currentOrderData.handleSearchQuery()
  }, [statusModalState])

  const deleteOrderAction = (e, id) => {
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, "Delete").then(
      function (result) {
        if (result.value) {
          useJwt
            .axiosDelete(getApi(MARCHANT_DELETE_ORDER + id + "/"))
            .then((res) => {
              SwalAlert("Deleted Successfully")
            })
            .finally(() => currentOrderData.handleSearchQuery())
        }
      }
    )
  }


  const clearData = () => {
    setSelectedInfo(null)
  }


  return (
    <>
      <OrderDetailsDrawer open={open} orderID={orderid} showOrderDetailsDrawer={showOrderDetailsDrawer} onCloseOrderDetailsDrawer={onCloseOrderDetailsDrawer} />

      <div className="invoice-title-card">
        <h3> Orders </h3>
        <Link to={"/marchant-orders/create"}>
          <Button type="primary" color="primary">
            {" "}
            + Create Order
          </Button>
        </Link>
      </div>
      <hr></hr>
      {currentOrderData.orders &&
        currentOrderData.orders.map((info) => (
          <Card className="invoice-preview-card">
            <CardBody>
              <Row>
                <Col xl="9">
                  <h5 className="mb-25">
                    <Typography.Title
                      level={5}
                      style={{
                        margin: 0,
                      }}
                    >
                      Order ID:{" "}
                      <Typography.Text copyable>
                        {info?.parcel_id}
                      </Typography.Text>
                    </Typography.Title>
                  </h5>
                  <h9 className="mb-25">Created: {info.created_at}</h9>
                </Col>
                <Col xl="3">
                  <div className="button-wrapper">
                    <button className="action-view" type="primary" onClick={() => { setOrderId(info?.id), showOrderDetailsDrawer() }}>
                      <EyeOutlined />
                      View
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
                      {info.status === 'pending' && <DropdownMenu>
                        <DropdownItem href={"/marchant_order/edit/" + info?.id}>
                          <Edit className="me-50" size={15} />{" "}
                          <span className="align-middle">Edit</span>
                        </DropdownItem>
                        <DropdownItem
                          href="/"
                          onClick={(e) => deleteOrderAction(e, info?.id)}
                        >
                          <Trash className="me-50" size={15} />{" "}
                          <span className="align-middle">Delete</span>
                        </DropdownItem>
                      </DropdownMenu>}

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
                    Status :{" "}
                    <span className="highlight-status">{info.status}</span>
                  </h6>
                  <h6 className="mb-25">
                    Pickup Status :
                    {info.pickup_status == true ? "True" : "False"}
                  </h6>
                  {/* <h6 className='mb-25'>Pickup Status :<Typography.Text strong>{info.pickup_status}</Typography.Text></h6> */}
                </Col>
                <Col xl="5">
                  <h6 className="mb-25">
                    Product type : {info.product_type.product_type}
                  </h6>
                  <h6 className="mb-25">
                    Shipment type : {info.shipment_type.shipment_type}
                  </h6>
                  {/* <h6 className='mb-25'>Delivary Charge: {info?.delivary_charge}</h6>
                            <h6 className='mb-25'>Total Amount : {info?.amount_to_be_collected}</h6> */}

                  <h6 className="mb-25">
                    Delivary Charge: {info?.delivary_charge}
                  </h6>
                  <h6 className="mb-25">
                    Cash On Delivery Charge : {info?.cash_on_delivery_charge}
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
            <ChangeStatusModalMarchant
              statusModalState={statusModalState}
              setStatusModalState={setStatusModalState}
              orderInfo={selectedInfo}
              fetchMarchantOrderData={currentOrderData.handleSearchQuery}
            />
          </Card>
        ))}
        <Pagination onChange={currentOrderData.paginationUpdate} total={currentOrderData.orderCount} defaultPageSize={50} />
    </>
  )
}

export default OrderView
