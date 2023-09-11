import React from "react"
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
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  RIDER_PICKUP_CREATE_ORDER_FILTER,
  RIDER_ASSIGNMENT,
} from "@src/constants/apiUrls"

import toast from "react-hot-toast"
import { EyeOutlined } from "@ant-design/icons"
import { MoreVertical, Edit3 } from "react-feather"
import CancelReasonModal from "./CancelReasonModal"
import SwalConfirm from "../../../SwalConfirm"

import OrderDetailsDrawer from "../../../order/OrderDetailsDrawer"

import { GENERAL_ROW_SIZE } from "../../../../constants/tableConfig"
import * as qs from 'qs'
import { Table } from "antd"

const PickupView = ({ orderInfo }) => {
  const [pickupData, setPickupData] = useState([])
  const [cancleModalState, setCancleModalState] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState(null)

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


  const [orderid, setOrderId] = useState(0)
  const [open, setOpen] = useState(false)
  const showOrderDetailsDrawer = () => {
    setOpen(true)
  }
  const onCloseOrderDetailsDrawer = () => {
    setOpen(false)
  }


  const fetchPickupData = () => {
    return useJwt
      // .axiosGet(getApi(RIDER_PICKUP_CREATE_ORDER_FILTER))
      .axiosGet(getApi(RIDER_PICKUP_CREATE_ORDER_FILTER) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setPickupData(res?.data?.results)
        updatePagination({
          current: res?.data?.page_number,
          pageSize: res?.data?.page_size,
          total: res?.data?.count,
        })

        return res.data
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
          <CancelReasonModal
            cancleModalState={cancleModalState}
            setCancleModalState={setCancleModalState}
            taskInfo={selectedInfo}
            fetchPickupData={fetchPickupData}
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
    fetchPickupData()
  }, [JSON.stringify(filterQuery)])





  useEffect(() => {
    if (!cancleModalState) {
      clearData()
    }
    fetchPickupData()
  }, [cancleModalState])


  const clearData = () => {
    setSelectedInfo(null)
  }


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



  return (
    <>
      <div className="invoice-title-card">
        <h3> Pickup Task </h3>
      </div>
      <hr></hr>
      <OrderDetailsDrawer open={open} orderID={orderid} showOrderDetailsDrawer={showOrderDetailsDrawer} onCloseOrderDetailsDrawer={onCloseOrderDetailsDrawer} />

      <Table scroll={{ x: true }} columns={columns} dataSource={pickupData} onChange={handleTableChange} pagination={tableParams.pagination} />

      {/* {pickupData &&
        pickupData.map((info) => (
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

            <CancelReasonModal
              cancleModalState={cancleModalState}
              setCancleModalState={setCancleModalState}
              taskInfo={selectedInfo}
              fetchPickupData={fetchPickupData}
            />

          </Card>
        ))} */}
    </>
  )
}

export default PickupView
