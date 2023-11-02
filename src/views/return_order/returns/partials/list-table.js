import { Link } from "react-router-dom"
import { MoreVertical, Search as IconSearch } from "react-feather"
import { DatePicker, Input, Typography, Button as AntdButton } from "antd"
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
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap"
import { useEffect, useState, useRef } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  ORDER_RETURN,
  RIDER_ASSIGNMENT,
  DELIVERY_ASSIGNMENT,
} from "../../../../constants/apiUrls"
import ChangeStatusModal from "../../../create_order/partials/ChangeStatusModal"

import OrderDetailsDrawer from "../../../../components/order/OrderDetailsDrawer"
import * as qs from 'qs'

import { Table } from "antd"
import { GENERAL_ROW_SIZE } from "../../../../constants/tableConfig"
import RiderDeliveryConfirmSwalAlert from "@src/components/RiderDeliveryConfirmSwalAlert"
import toast from 'react-hot-toast'

const CreateOrderList = () => {
  const { Search } = Input
  const [createOrder, setCreateOrder] = useState([])
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const datePickerRef = useRef(null)
  const [orderID, setorderID] = useState("")
  const [receipientName, setReceipientName] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")
  const [orderid, setOrderId] = useState()
  const [open, setOpen] = useState(false)

  const [riders, setRiders] = useState([])
  const [selectedRiderIds, setSelectedRiderId] = useState([])
  const [orderIdInFo, setOrderIdInFo] = useState()

  const [loadings, setLoadings] = useState([])

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


  const enterLoading = (index) => {
    if (index === true) {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings]
        newLoadings[1] = true
        return newLoadings
      })
    } else {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings]
        newLoadings[1] = false
        return newLoadings
      })
    }
  }


  const fetchCreateOrderData = () => {
    return useJwt
      .axiosGet(getApi(ORDER_RETURN) + `?${qs.stringify(filterQuery)}`)
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

  const fetchRiderData = (value) => {
    return useJwt.axiosGet(getApi(RIDER_ASSIGNMENT + `?search=${value}`))
      .then((res) => {
        setRiders(res?.data)
      }).catch((err) => {
        console.log(err)
      })
  }


  const clearFilter = () => {
    setorderID('')
    setReceipientName('')
    setphoneNumber('')
    fetchCreateOrderData()
    setSelectedDate(null)
    setFilterQuery({})
  }


  const riderAssign = (e, info) => {
    e.preventDefault()
    fetchRiderData('')
    setSelectedRiderId()
    setOrderIdInFo(info.id)
    setStatusModalState(true)
    setSelectedInfo(info)
  }

  const assignHandler = (e) => {
    e.preventDefault()
    enterLoading(true)
    useJwt
      .axiosPost(getApi(DELIVERY_ASSIGNMENT) + `/${selectedInfo.id}/return_order/`, { orderIdInFo: orderIdInFo, selectedRiderIds: selectedRiderIds })
      .then((res) => {
        enterLoading(false)
        setStatusModalState(false)
        toast.success('Order Rider Assignment Successfully!')
        fetchCreateOrderData()
        
      }).catch((error)=>{
        enterLoading(false)
      })
  }


  const handleSelectedRiderId = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setSelectedRiderId(value)
    }
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

                      <DropdownItem href="/" onClick={e => riderAssign(e, info)}>
                        <span className="align-middle">Rider Assign</span>
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

  const columns2 = [
    {
      title: 'Rider',
      dataIndex: 'full_name',
    },
    {
      title: 'Phone',
      // dataIndex: 'account_wallet',
      dataIndex: 'contact_no'
    },

    {
      title: 'Actions',

      render: (_, record) =>
        <td>
          <Input type='checkbox' value={record.id} onClick={(e) => { handleSelectedRiderId(e) }} name="order_id" id='remember-me' />
        </td>

    },
  ]


  useEffect(() => {
    const _tableParams = tableParams
    const _filters = { ...filterQuery }

    if (_tableParams) {
      _filters['page'] = _tableParams.pagination?.current
      _filters['page_size'] = _tableParams.pagination?.pageSize
      _filters['ordering'] = _tableParams?.sorter?.order == 'ascend' ? _tableParams?.sorter?.field : `-${_tableParams?.sorter?.field}`
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

            <ChangeStatusModal
              statusModalState={statusModalState}
              setStatusModalState={setStatusModalState}
              orderInfo={selectedInfo}
              fetchCreateOrderData={fetchCreateOrderData}
            />

            <Modal isOpen={statusModalState} toggle={() => setStatusModalState(!statusModalState)} className='modal-dialog-centered'>
              <ModalHeader toggle={() => setStatusModalState(!statusModalState)}>Rider Assign</ModalHeader>
              <ModalBody>
                <div class="table-responsive">
                  <div className="d-flex align-items-center ">
                    <input
                      placeholder="Search Order ID"
                      name="user_name"
                      type="text"
                      class="form-control"
                      // value=""
                      onChange={(e) => { fetchRiderData(e.target.value) }}
                    />
                    <Button.Ripple className="btn-icon ms-1" outline color="primary">
                      <IconSearch size={16} />
                    </Button.Ripple>
                  </div>
                  <Table scroll={{ x: true }} columns={columns2} dataSource={riders} onClick={(e) => { handleSelectedRiderId(e) }} />
                </div>
              </ModalBody>
              <ModalFooter>
                <AntdButton type="primary" loading={loadings[1]} onClick={assignHandler}>Assign</AntdButton>
                {/* <Button color='primary' onClick={assignHandler}>Assign</Button> */}
              </ModalFooter>
            </Modal>

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
