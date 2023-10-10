
import { Link } from "react-router-dom"
import Select from "react-select"
import classNames from "classnames"






import React, { Fragment, useEffect, useState, useRef } from "react"
// ** Reactstrap Imports
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, RIDER_SEARCH_CREATE_ORDER_FILTER, ORDER_STATISTICS } from "../../../constants/apiUrls"

import * as qs from 'qs'
import { OrderStatusOptions, colorSwitch } from '../../../components/orderRelatedData'
import { GENERAL_ROW_SIZE } from "../../../constants/tableConfig"
import { Checkbox, DatePicker, Input, Typography, Tag, Table } from "antd"
import {
  UncontrolledDropdown,
  DropdownToggle,
  Card, CardBody, Row, Col,Button,
} from "reactstrap"
import { EyeOutlined } from '@ant-design/icons'


import { MoreVertical } from "react-feather"

import OrderDetailsDrawer from '../../order/OrderDetailsDrawer'

function CurrentTaskList() {
  const { Search } = Input
  const [orderStatus, setOrderStatus] = useState("")
  const [orderID, setorderID] = useState("")
  const [receipientName, setReceipientName] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")
  const [selectedDate, setSelectedDate] = useState(null)
  const datePickerRef = useRef(null)
  const [selectedValue, setSelectedValue] = useState('')

  // const [orderStatistics, setOrderStatistics] = useState({
  //   pickup_orders: 0,
  //   delivery_orders: 0,
  // })
  const [currentTask, setCurrentTask] = useState([])

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

  const [orderid, setOrderId] = useState()
  const [open, setOpen] = useState(false)

  const showOrderDetailsDrawer = () => {
    setOpen(true)
  }
  const onCloseOrderDetailsDrawer = () => {
    setOpen(false)
  }


  const fetchCreateOrderData = () => {

    return useJwt
      .axiosGet(getApi(RIDER_SEARCH_CREATE_ORDER_FILTER) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setCurrentTask(res?.data?.results)
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

  function updateFilterQUery(term, value) {
    let filters = { ...filterQuery }
    if (term != 'page') {
      filters['page'] = 1
    }

    if (value) {
      filters[term] = value
    } else {
      filters.hasOwnProperty(term) && delete filters[term]
    }
    setFilterQuery(filters)
  }



  const columns = [

    {

      render: (_, info) =>

        <Card className='invoice-preview-card'>
          <CardBody>
            <Row >
              <Col xl='9'>
                <h5 className='mb-25'><b>Parcel Id :{info?.parcel_id} </b> </h5>
                <h9 className='mb-25'>Created: {info.created_at}</h9>
              </Col>
              <Col xl='3'>
                <div className='button-wrapper'>
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
                  </UncontrolledDropdown>
                </div>
              </Col>
            </Row>
            <Row className='mt-2' >
              <Col xl='7'>
                <h6 className='mb-25'><b>Recipient Name :{info?.recipient_name}</b>  </h6>
                <h6 className='mb-25'>Phone Number : {info?.phone_number}</h6>
                <h6 className='mb-25'>Delivary Address : {info?.delivary_address}</h6>
                <h6 className='mb-25 '>Order Status : 
                <span className="highlight-status" >
                    <Tag color={colorSwitch(info.status)}>{info.status.toUpperCase()}</Tag>
                  </span>
                  </h6>

                <h6 className='mb-25'>Pickup Status :<span className='highlight-pickup-status'>{info.pickup_status == true ? 'True' : 'False'}</span></h6>
                <h6 className='mb-25'>Delivery Status :<span className='highlight-pickup-status'>{info.delivery_status == true ? 'True' : 'False'}</span></h6>
              </Col>
              <Col xl='5'>
                <h6 className='mb-25'>Warehouse Status :<span className='highlight-pickup-status'>{info.warehouse_status == true ? 'True' : 'False'}</span></h6>
                <h6 className='mb-25'>Product type : {info.product_type.product_type}</h6>
                <h6 className='mb-25'>Shipment type : {info.shipment_type.shipment_type}</h6>
                <h6 className='mb-25'>Delivary Charge: {info?.delivary_charge}</h6>
                <h6 className='mb-25'>Collection Amount : {info?.amount_to_be_collected}</h6>
                <h6 className='mb-25'>Total Amount : {Number(info?.amount_to_be_collected) + Number(info?.delivary_charge)}</h6>
              </Col>
            </Row>
          </CardBody>
        </Card >

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
    fetchCreateOrderData()
  }, [JSON.stringify(filterQuery)])


  const clearFilter = () => {
    setOrderStatus("")
    setorderID('')
    setReceipientName('')
    setphoneNumber('')
    setSelectedValue('')
    fetchCreateOrderData()
    setSelectedDate(null)
    setFilterQuery({})
  }


  return (
    <Fragment>
      {/* <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Total Pickup"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{orderStatistics?.pickup_orders}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Total Delivery"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{orderStatistics?.delivery_orders}</h3>}
          />
        </Col>
      </Row> */}

      <Row>
      <Col sm="4">
        <Card title="Bordered">
          <CardBody>
            <div>
              <div className="invoice-title-card">
                <h3>Filter : </h3>
                <Button type="primary" color="primary" onClick={clearFilter}>Clear</Button>
              </div>
              <div className="mt-2">
                <h6>Filter by Order Status</h6>
                <Select
                  id="status"
                  name="status"
                  placeholder="Select Order Status"
                  isClearable={true}
                  className={classNames("react-select")}
                  classNamePrefix="select"
                  onChange={(e) => {
                    // filterHandle(e, "status")
                    updateFilterQUery('status', e?.value)
                    setOrderStatus(e)
                  }}
                  options={OrderStatusOptions}
                  value={orderStatus}
                />
              </div>

              <div className=" mt-2">
                <h6>Search Order ID </h6>
                <Search
                  placeholder="eg. ODR23031301d6"
                  onChange={(e) => {
                    // filterHandle(e, "order_id"), setorderID(e.target.value)
                    updateFilterQUery("parcel_id", e.target.value)
                    setorderID(e.target.value)
                  }}
                  value={orderID}
                />
              </div>
              <div className=" mt-2">
                <h6>Search Receipient Name</h6>
                <Search
                  placeholder="eg. Jhon Doe"
                  onChange={(e) => {
                    updateFilterQUery("recipient_name", e.target.value)
                    setReceipientName(e.target.value)
                    // filterHandle(e, "receipient_name"), setReceipientName(e.target.value)
                  }}
                  value={receipientName}
                />
              </div>
              <div className=" mt-2">
                <h6>Phone Number </h6>
                <Search
                  placeholder="eg. 01793912259"
                  onChange={(e) => {
                    updateFilterQUery("phone_number", e.target.value)
                    setphoneNumber(e.target.value)
                    // filterHandle(e, "phone_number"), setphoneNumber(e.target.value)
                  }}
                  value={phoneNumber}
                />
              </div>
              <div className=" mt-2">
                <h6>Filter by Order Type</h6>
                <Checkbox checked={selectedValue === 'pickedup'} value="pickedup" onChange={(e) => { updateFilterQUery("status", e.target.value), setSelectedValue(e.target.value) }}>
                  Pickup
                </Checkbox>
                <Checkbox checked={selectedValue === 'in_warehouse'} value="in_warehouse" onChange={(e) => { updateFilterQUery("status", e.target.value), setSelectedValue(e.target.value) }}>
                  Warehouse
                </Checkbox>
                <Checkbox checked={selectedValue === 'delivered'} value="delivered" onChange={(e) => { updateFilterQUery("status", e.target.value), setSelectedValue(e.target.value) }}>
                  Delivery
                </Checkbox>
              </div>

              <div className=" mt-2">
                <h6>Search Order Date</h6>
                <DatePicker
                  ref={datePickerRef}
                  style={{
                    width: '100%',
                  }}
                  value={selectedDate}
                  onChange={(date) => { updateFilterQUery("created_at", date.format('YYYY-MM-DD')), setSelectedDate(date) }}
                />
              </div>
            </div>

          </CardBody>
        </Card>
      </Col>
        <Col sm="8">
          <Card title="Bordered">
            <CardBody>
              <div className='invoice-title-card'>
                <h4>Task History </h4>
              </div>
              <hr></hr>
              <OrderDetailsDrawer open={open} orderid={orderid} showOrderDetailsDrawer={showOrderDetailsDrawer} onCloseOrderDetailsDrawer={onCloseOrderDetailsDrawer} />
              <Table scroll={{ x: true }} columns={columns} dataSource={currentTask} onChange={handleTableChange} pagination={tableParams.pagination} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default CurrentTaskList