import React from "react"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import RiderDeliveryConfirmSwalAlert from "../../../RiderDeliveryConfirmSwalAlert"
import {
  getApi,
  RIDER_DELIVARY_STATUS_UPDATE,
  RIDER_DELIVERY_CREATE_ORDER_FILTER,
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
import { MoreVertical, Edit3 } from "react-feather"
import CancelReasonModal from "./CancelReasonModal"
import OrderDetailsDrawer from "../../../order/OrderDetailsDrawer"
import HoldReasonModal from "./HoldReasonModal"
import ReturnReasonModal from "./ReturnReasonModal"


import { GENERAL_ROW_SIZE } from "../../../../constants/tableConfig"
import * as qs from 'qs'
import { Table } from "antd"

const DelivaryView = ({ }) => {
  const [delivaryData, setDelivaryData] = useState([])
  const [cancelModalState, setCancelModalState] = useState(false)
  const [holdModalState, setHoldModalState] = useState(false)
  const [returnModalState, setReturnModalState] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState(null)

  const [orderid, setOrderId] = useState(0)
  const [open, setOpen] = useState(false)
  const showOrderDetailsDrawer = () => {
    setOpen(true)
  }
  const onCloseOrderDetailsDrawer = () => {
    setOpen(false)
  }

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: GENERAL_ROW_SIZE,
    },
  })

  const [filterQuery, setFilterQuery] = useState({
    page: 1,
    page_size: GENERAL_ROW_SIZE,
  })


  const fetchDelivaryData = () => {
    return useJwt
      // .axiosGet(getApi(RIDER_DELIVERY_CREATE_ORDER_FILTER))
      .axiosGet(getApi(RIDER_DELIVERY_CREATE_ORDER_FILTER) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setDelivaryData(res?.data?.results)
        updatePagination({
          current: res?.data?.page_number,
          pageSize: res?.data?.page_size,
          total: res?.data?.count,
        })

      })
      .catch((err) => console.log(err))
  }

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sorter,
    })

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
  }

  const updatePagination = (info) => {
    const _tableParams = { ...tableParams }

    _tableParams.pagination = info

    setTableParams(_tableParams)
  }


  const columns = [

    {

      render: (_, info) =>

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
                                deliveryCancelIssue(e, info)
                              }
                            >
                              <Edit3 className="me-50" size={15} />{" "}
                              <span className="align-middle">
                                Cancel
                              </span>
                            </DropdownItem>
                            <DropdownItem
                              href="/"
                              onClick={(e) =>
                                deliveryHoldIssue(e, info)
                              }
                            >
                              <Edit3 className="me-50" size={15} />{" "}
                              <span className="align-middle">
                                Hold
                              </span>
                            </DropdownItem>
                            <DropdownItem
                              href="/"
                              onClick={(e) =>
                                deliveryReturnIssue(e, info)
                              }
                            >
                              <Edit3 className="me-50" size={15} />{" "}
                              <span className="align-middle">
                                Return
                              </span>
                            </DropdownItem>
                            <DropdownItem
                              href="/"
                              onClick={(e) =>
                                confirmDelivery(e, info)
                              }
                            >
                              <Edit3 className="me-50" size={15} />{" "}
                              <span className="align-middle">
                                Confirm Delivery
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
            fetchDelivaryData={fetchDelivaryData}
          />

          <HoldReasonModal
            holdModalState={holdModalState}
            setHoldModalState={setHoldModalState}
            taskInfo={selectedInfo}
            fetchDelivaryData={fetchDelivaryData}
          />

          <ReturnReasonModal
            returnModalState={returnModalState}
            setReturnModalState={setReturnModalState}
            taskInfo={selectedInfo}
            fetchDelivaryData={fetchDelivaryData}
          />

        </Card>

    },
  ]

  useEffect(() => {
    const _tableParams = tableParams
    const _filters = { ...filterQuery }

    if (_tableParams) {
      _filters['page'] = _tableParams.pagination?.current
      _filters['page_size'] = _tableParams.pagination?.pageSize
      // _filters['ordering'] = _tableParams?.sorter?.order == 'ascend' ? _tableParams?.sorter?.field : `-${_tableParams?.sorter?.field}`
    }

    setFilterQuery(_filters)

  }, [JSON.stringify(tableParams)])

  useEffect(() => {
    fetchDelivaryData()
  }, [JSON.stringify(filterQuery)])

  useEffect(() => {
    fetchDelivaryData()
  }, [])

  useEffect(() => {
    if (!cancelModalState) {
      clearData()
    }
    if (!holdModalState) {
      clearData()
    }
    if (!returnModalState) {
      clearData()
    }
    fetchDelivaryData()
  }, [])


  const clearData = () => {
    setSelectedInfo(null)
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
        fetchDelivaryData()
      })
      .catch((err) => {
        toast.success("Delivary Status Updated Failed!")
      })
  }




  const confirmDelivery = (e, info) => {
    e.preventDefault()
    return RiderDeliveryConfirmSwalAlert(info?.delivary_address, info?.recipient_name, info?.phone_number, `Confirm Delivery ?`).then(
      function (result) {
        if (result.value) {
          useJwt
            .axiosPost(
              getApi(`${DELIVERY_ASSIGNMENT}/${info.id}/confirm_delivery/`),
              { details: info }
            )
            .then((res) => {
              toast.success('Delivery Confirm')
              fetchDelivaryData()
            })
            .catch((err) => console.log(err))
        }
      }
    )
  }


  const deliveryCancelIssue = (e, info) => {
    e.preventDefault()
    setCancelModalState(true)
    setSelectedInfo(info)
  }

  const deliveryHoldIssue = (e, info) => {
    e.preventDefault()
    setHoldModalState(true)
    setSelectedInfo(info)
  }

  const deliveryReturnIssue = (e, info) => {
    e.preventDefault()
    setReturnModalState(true)
    setSelectedInfo(info)
  }



  return (
    <>
      <div className="invoice-title-card">
        <h3> Delivary Task </h3>
      </div>
      <hr></hr>
      <OrderDetailsDrawer open={open} orderID={orderid} showOrderDetailsDrawer={showOrderDetailsDrawer} onCloseOrderDetailsDrawer={onCloseOrderDetailsDrawer} />

      <Table scroll={{ x: true }} columns={columns} dataSource={delivaryData} onChange={handleTableChange} pagination={tableParams.pagination} />

      {/* {delivaryData &&
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
                                  deliveryCancelIssue(e, info)
                                }
                              >
                                <Edit3 className="me-50" size={15} />{" "}
                                <span className="align-middle">
                                  Cancel
                                </span>
                              </DropdownItem>


                              <DropdownItem
                                href="/"
                                onClick={(e) =>
                                  deliveryHoldIssue(e, info)
                                }
                              >
                                <Edit3 className="me-50" size={15} />{" "}
                                <span className="align-middle">
                                  Hold
                                </span>
                              </DropdownItem>


                              <DropdownItem
                                href="/"
                                onClick={(e) =>
                                  deliveryReturnIssue(e, info)
                                }
                              >
                                <Edit3 className="me-50" size={15} />{" "}
                                <span className="align-middle">
                                  Return
                                </span>
                              </DropdownItem>



                              <DropdownItem
                                href="/"
                                onClick={(e) =>
                                  confirmDelivery(e, info)
                                }
                              >
                                <Edit3 className="me-50" size={15} />{" "}
                                <span className="align-middle">
                                  Confirm Delivery
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
              fetchDelivaryData={fetchDelivaryData}
            />

            <HoldReasonModal
              holdModalState={holdModalState}
              setHoldModalState={setHoldModalState}
              taskInfo={selectedInfo}
              fetchDelivaryData={fetchDelivaryData}
            />

            <ReturnReasonModal
              returnModalState={returnModalState}
              setReturnModalState={setReturnModalState}
              taskInfo={selectedInfo}
              fetchDelivaryData={fetchDelivaryData}
            />

          </Card>
        ))} */}
    </>
  )
}

export default DelivaryView
