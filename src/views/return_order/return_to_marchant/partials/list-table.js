import { Link } from "react-router-dom"
import { MoreVertical } from "react-feather"
import { DatePicker, Input, Typography } from "antd"
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap"
import { useEffect, useState, useRef } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  RETURN_TO_MARCHANT,
  DELIVERY_ASSIGNMENT,
} from "../../../../constants/apiUrls"

import OrderDetailsDrawer from "../../../../components/order/OrderDetailsDrawer"
import * as qs from 'qs'

import { Table } from "antd"
import { GENERAL_ROW_SIZE } from "../../../../constants/tableConfig"
import RiderPickupConfirmSwalAlert from "@src/components/RiderPickupConfirmSwalAlert"
import toast from 'react-hot-toast'

const CreateOrderList = () => {
  const { Search } = Input
  const [createOrder, setCreateOrder] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const datePickerRef = useRef(null)
  const [orderID, setorderID] = useState("")
  const [receipientName, setReceipientName] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")

  const [orderid, setOrderId] = useState()
  const [open, setOpen] = useState(false)


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

  const showOrderDetailsDrawer = () => {
    setOpen(true)

  }
  const onCloseOrderDetailsDrawer = () => {
    setOpen(false)
  }


  const comfirmReturn = (e, info) => {
    e.preventDefault()
    return RiderPickupConfirmSwalAlert(info?.pickup_address?.street_address, info?.marchant?.full_name, info?.pickup_address?.phone, `Return Confirm ?`).then(
      function (result) {
        if (result.value) {
          useJwt
            .axiosGet(
              getApi(`${DELIVERY_ASSIGNMENT}/${info.id}/return_to_marchant_complete/`),
            )
            .then((res) => {
              fetchCreateOrderData()
              toast.success('Order Return Confirm Successfully')

            })
            .catch((err) => console.log(err))
        }
      }
    )
  }



  const fetchCreateOrderData = () => {

    return useJwt
      .axiosGet(getApi(RETURN_TO_MARCHANT) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setCreateOrder(res.data.results)
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


  const clearFilter = () => {
    setorderID('')
    setReceipientName('')
    setphoneNumber('')
    fetchCreateOrderData()
    setSelectedDate(null)
    setFilterQuery({})
  }


  const columns = [

    {

      render: (_, info) =>

        <Card className="invoice-preview-card">
          <CardBody>
            <Row>
              <Col xl="9">
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
                <h9 className="mb-25">Created: {info.created_at}</h9>
              </Col>
              <Col xl="3">
                <div className="button-wrapper">
                  <button className="action-view" type="primary" onClick={() => { setOrderId(info?.id), showOrderDetailsDrawer() }}>
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

                      <DropdownItem href="/" onClick={e => comfirmReturn(e, info)}>
                        <span className="align-middle">Return Comfirm</span>
                      </DropdownItem>

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
                <h6 className="mb-25">
                  Phone Number : {info?.phone_number}
                </h6>
                <h6 className="mb-25">
                  Delivary Address : {info?.delivary_address}
                </h6>
                <h6 className="mb-25 ">
                  Order Status :{" "}
                  <span
                    className="highlight-status"
                    style={{ textTransform: "capitalize" }}
                  >
                    {info.status}
                  </span>
                </h6>
                <h6 className="mb-25">
                  Pickup Status :
                  <span className="highlight-pickup-status">
                    {info.pickup_status == true ? "True" : "False"}
                  </span>
                </h6>
                <h6 className="mb-25">
                  Reason :{" "}
                  <span className="highlight-pickup-status">
                    {info?.cancel_issue?.reason}
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
                  Cash On Delivery Charge :{" "}
                  {info?.cash_on_delivery_charge}
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
        </Card>

    },
  ]



  useEffect(() => {
    const _tableParams = tableParams
    const _filters = { ...filterQuery }

    if (_tableParams) {
      _filters['page'] = _tableParams.pagination?.current
      _filters['page_size'] = _tableParams.pagination?.pageSize
    }

    setFilterQuery(_filters)

  }, [JSON.stringify(tableParams)])


  useEffect(() => {
    fetchCreateOrderData()
  }, [JSON.stringify(filterQuery)])


  return (
    <Row>
      <Col sm="4">
        <Card title="Bordered">
          <CardBody>
            <div>
              <div className="invoice-title-card">
                <h3>Filter : </h3>
                <Button type="primary" color="primary" onClick={clearFilter}>Clear</Button>
              </div>

              <div className=" mt-2">
                <h6>Search Order ID </h6>
                <Search
                  placeholder="eg. ODR23031301d6"
                  onChange={(e) => {
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
                  }}
                  value={phoneNumber}
                />
              </div>

              <div className=" mt-2">
                <h6>Search Return Date</h6>
                <DatePicker
                  ref={datePickerRef}
                  style={{
                    width: '100%',
                  }}
                  value={selectedDate}
                  onChange={(date) => { updateFilterQUery("return_date", date.format('YYYY-MM-DD')), setSelectedDate(date) }}
                />
              </div>
            </div>

          </CardBody>
        </Card>
      </Col>
      <Col sm="8">
        <Card title="Bordered">
          <CardBody>
            <div className="invoice-title-card">
              <h3> Orders </h3>
              <Link to={"/create_order/add"}>
                <Button type="primary" color="primary">
                  {" "}
                  + Create Order
                </Button>
              </Link>
            </div>
            <hr></hr>

            <Table scroll={{ x: true }} columns={columns} dataSource={createOrder} onChange={handleTableChange} pagination={tableParams.pagination} />

            <>
              <OrderDetailsDrawer open={open} orderid={orderid} showOrderDetailsDrawer={showOrderDetailsDrawer} onCloseOrderDetailsDrawer={onCloseOrderDetailsDrawer} />
            </>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default CreateOrderList
