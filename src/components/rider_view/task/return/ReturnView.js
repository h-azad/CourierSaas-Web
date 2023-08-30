import React from "react"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import SwalConfirm from "../../../SwalConfirm"
import {
  getApi,
  RIDER_RETURN_CREATE_ORDER_FILTER,
  DELIVERY_ASSIGNMENT,
} from "@src/constants/apiUrls"
import toast from "react-hot-toast"
import {
  Card,
  CardBody,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap"
import { EyeOutlined } from "@ant-design/icons"
import { MoreVertical } from "react-feather"
import CancelReasonModal from "./CancelReasonModal"
import OrderDetailsDrawer from "../../../order/OrderDetailsDrawer"

const ReturnView = ({ }) => {
  const [delivaryData, setDelivaryData] = useState([])
  const [cancelModalState, setCancelModalState] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState(null)

  const [orderid, setOrderId] = useState(0)
  const [open, setOpen] = useState(false)
  const showOrderDetailsDrawer = () => {
    setOpen(true)
  }
  const onCloseOrderDetailsDrawer = () => {
    setOpen(false)
  }

  const fetchReturnOrderData = () => {
    return useJwt
      .axiosGet(getApi(RIDER_RETURN_CREATE_ORDER_FILTER))
      .then((res) => {
        setDelivaryData(res.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchReturnOrderData()
  }, [])

  useEffect(() => {
    if (!cancelModalState) {
      clearData()
    }
    fetchReturnOrderData()
  }, [])


  const clearData = () => {
    setSelectedInfo(null)
  }

  const returnCancelIssue = (e, info) => {
    e.preventDefault()
    setCancelModalState(true)
    setSelectedInfo(info)
  }

  const confirmReturn = (e, info) => {
    console.log('info data', info)
    e.preventDefault()
    return SwalConfirm(`Confirm Return`).then(
      function (result) {
        if (result.value) {
          useJwt
            .axiosGet(
              getApi(`${DELIVERY_ASSIGNMENT}/${info.id}/return_order_confirm/`),
              // { details: info }
            )
            .then((res) => {
              toast.success(res.data)
              fetchReturnOrderData()
            })
            .catch((err) => console.log(err))
        }
      }
    )
  }


  return (
    <>
      <div className="invoice-title-card">
        <h3> Return Task </h3>
      </div>
      <hr></hr>
      <OrderDetailsDrawer open={open} orderID={orderid} showOrderDetailsDrawer={showOrderDetailsDrawer} onCloseOrderDetailsDrawer={onCloseOrderDetailsDrawer} />
      {delivaryData &&
        delivaryData.map((info) => (
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
                      <DropdownMenu>
                        {info.pickup_status &&
                          info.warehouse_status &&
                          !info.delivery_status && (
                            <>

                              <DropdownItem
                                href="/"
                                onClick={(e) =>
                                  returnCancelIssue(e, info)
                                }
                              >
                                {/* <Edit3 className="me-50" size={15} />{" "} */}
                                <span className="align-middle">
                                  Cancel
                                </span>
                              </DropdownItem>


                              <DropdownItem
                                href="/"
                                onClick={(e) =>
                                  confirmReturn(e, info)
                                }
                              >
                                {/* <Edit3 className="me-50" size={15} />{" "} */}
                                <span className="align-middle">
                                  Return
                                </span>
                              </DropdownItem>

                            </>
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

            <CancelReasonModal
              cancelModalState={cancelModalState}
              setCancelModalState={setCancelModalState}
              taskInfo={selectedInfo}
            // fetchReturnOrderData={fetchReturnOrderData}
            />
          </Card>
        ))}
    </>
  )
}

export default ReturnView
