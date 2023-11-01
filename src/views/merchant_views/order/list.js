// import React, { Fragment, useEffect, useState } from "react"
// // ** Reactstrap Imports
// import { Row, Col, Card, CardBody} from "reactstrap"
// import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
// import { Home, Box, Truck, CornerDownLeft } from 'react-feather'
// import useJwt from '@src/auth/jwt/useJwt'
// import OrdersList from "../../../components/merchant_views/order/OrdersList"
// import OrderView from "../../../components/merchant_views/order/OrderView"
// import { getApi, MARCHANT_ORDER_LIST, ORDER_STATISTICS, MARCHANT_SEARCH_CREATE_ORDER_FILTER } from "../../../constants/apiUrls"
// import * as qs from 'qs'

// function MerchantOrdersList() {

//   const [orders, setOrders] = useState([])
//   const [orderCount, setOrderCount] = useState(0)
// 	const [filterQuery, setFilterQuery] = useState({})

//   const [orderStatistics, setOrderStatistics] = useState({
//     pending_orders: 0,
//     in_warehouse_orders: 0,
//     shipped_orders: 0,
//     return_orders: 0
//   })



//   const fetchOrderStatisticsData = () => {
//     return useJwt
//       .axiosGet(getApi(ORDER_STATISTICS))
//       .then((res) => {
//         setOrderStatistics(
//           {
//             pending_orders: res.data.pending_orders,
//             in_warehouse_orders: res.data.in_warehouse_orders,
//             shipped_orders: res.data.shipped_orders,
//             return_orders: res.data.return_orders,
//           })
//       })
//       .catch((err) => console.log(err))
//   }


//   useEffect(() => {
//     fetchOrderStatisticsData()
//   }, [])


//   const handleSearchQuery = searchTerm => {
// 		return useJwt
// 			.axiosGet(getApi(MARCHANT_SEARCH_CREATE_ORDER_FILTER) + '?' + searchTerm)
// 			.then((res) => {
// 				if (res.data?.results) {
// 					setOrders(res?.data?.results)
// 					setOrderCount(res?.data?.count)
// 				}
// 			})
// 			.catch((err) => console.log(err))
// 	}

// 	function updateFilterQUery(term, value) {
// 		let filters = { ...filterQuery }
// 		if (term != 'page') {
// 			filters['page'] = 1
// 		}

// 		if (value) {
// 			filters[term] = value
// 		} else {
// 			filters.hasOwnProperty(term) && delete filters[term]
// 		}
// 		setFilterQuery(filters)
// 	}

// 	useEffect(() => {
// 		handleSearchQuery(qs.stringify(filterQuery))
// 	}, [filterQuery])

// 	const paginationUpdate = (page) => {
// 		updateFilterQUery("page", page)
// 	}

//   const currentOrderData={
//     paginationUpdate: paginationUpdate,
//     handleSearchQuery: handleSearchQuery,
//     orderCount: orderCount,
//     orders: orders,
//   }


//   return (
//     <Fragment>
//       <Row>
//         <Col lg="3" sm="6">
//           <StatsHorizontal
//             color="danger"
//             statTitle="Pending"
//             icon={<Box size={20} />}
//             renderStats={<h3 className="fw-bolder mb-75">{orderStatistics?.pending_orders}</h3>}
//           />
//         </Col>
//         <Col lg="3" sm="6">
//           <StatsHorizontal
//             color="success"
//             statTitle="WireHouse"
//             icon={<Home size={20} />}
//             renderStats={<h3 className="fw-bolder mb-75">{orderStatistics?.in_warehouse_orders}</h3>}
//           />
//         </Col>
//         <Col lg="3" sm="6">
//           <StatsHorizontal
//             color="primary"
//             statTitle="Shipped"
//             icon={<Truck size={20} />}
//             renderStats={<h3 className="fw-bolder mb-75">{orderStatistics?.shipped_orders}</h3>}
//           />
//         </Col>
//         <Col lg="3" sm="6">
//           <StatsHorizontal
//             color="warning"
//             statTitle="Return"
//             icon={<CornerDownLeft size={20} />}
//             renderStats={<h3 className="fw-bolder mb-75">{orderStatistics?.return_orders}</h3>}
//           />
//         </Col>
//       </Row>

//       <Row>
//         <Col sm="4">
//           <Card title="Bordered">
//             <CardBody>
//               <OrdersList setFilterQuery={setFilterQuery} handleSearchQuery={handleSearchQuery} updateFilterQUery={updateFilterQUery} />
//               {/* <TaskFilter setFilterQuery={setFilterQuery} handleSearchQuery={handleSearchQuery} updateFilterQUery={updateFilterQUery} />  */}
//               {/* <ListTable /> */}
//             </CardBody>
//           </Card>
//         </Col>
//         <Col sm="8">
//           <Card title="Bordered">
//             <CardBody>
//               {/* <ListTable /> */}
//               <OrderView currentOrderData={currentOrderData} />
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </Fragment>
//   )
// }

// export default MerchantOrdersList











import { Link } from "react-router-dom"
import Select from "react-select"
import classNames from "classnames"
import { MoreVertical, Edit, Trash, Edit3, Eye, Book } from "react-feather"
import { Checkbox, DatePicker, Input, Typography, Tag, Table } from "antd"
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
import { EyeOutlined } from "@ant-design/icons"
// import {
//   getApi,
//   MARCHANT_ORDER_LIST,
//   CREATE_ORDER_DELETE,
// } from "../../../constants/apiUrls"

import { getApi, MARCHANT_ORDER_LIST, ORDER_STATISTICS, CREATE_ORDER_DELETE, ORDER_INVOICE, } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import ChangeStatusModal from "../../create_order/partials/ChangeStatusModal"

import OrderDetailsDrawer from "../../../components/order/OrderDetailsDrawer"
import * as qs from 'qs'

import { MarchantOrderStatusOptions, colorSwitch } from '../../../components/orderRelatedData'
import { GENERAL_ROW_SIZE } from "../../../constants/tableConfig"


const MerchantOrdersList = () => {
  const { Search } = Input
  const [createOrder, setCreateOrder] = useState([])
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState(null)
  const [orderStatus, setOrderStatus] = useState("")
  const [orderID, setorderID] = useState("")
  const [receipientName, setReceipientName] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")
  const [selectedDate, setSelectedDate] = useState(null)
  const datePickerRef = useRef(null)
  const [selectedValue, setSelectedValue] = useState('')
  const [orderid, setOrderId] = useState()
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


  const deleteOrderAction = (e, id) => {
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, "Delete").then(
      function (result) {
        if (result.value) {
          useJwt
            .axiosDelete(getApi(CREATE_ORDER_DELETE + id + "/"))
            .then((res) => {
              SwalAlert("Deleted Successfully")
            })
            .finally(() => fetchCreateOrderData())
        }
      }
    )
  }


  const fetchCreateOrderData = () => {

    return useJwt
      .axiosGet(getApi(MARCHANT_ORDER_LIST) + `?${qs.stringify(filterQuery)}`)
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

  const invoiceDownloadToPDF = (info) => {
    return useJwt
      .axiosGetFile(getApi(ORDER_INVOICE) + info.id + "/")
      .then((res) => {
        if (res.data) {
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `parcel ${info.recipient_name}.pdf`)
          document.body.appendChild(link)
          link.click()
        }
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
    setOrderStatus("")
    setorderID('')
    setReceipientName('')
    setphoneNumber('')
    setSelectedValue('')
    fetchCreateOrderData()
    setSelectedDate(null)
    setFilterQuery({})
  }





  // function colorSwitch(status) {
  //   switch (status) {
  //     case 'active':
  //       return 'green'

  //     case 'inactive':
  //       return 'red'

  //     default:
  //       return 'green'
  //   }
  // }

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
                      <DropdownItem onClick={() => invoiceDownloadToPDF(info)}>
                        <Book className="me-50" size={15} />{" "}
                        <span className="align-middle">Invoice</span>
                      </DropdownItem>
                      {info.status === 'pending' &&
                        <>
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
                        </>

                      }
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
                    {/* {info.status} */}
                    <Tag color={colorSwitch(info.status)}>{info.status.toUpperCase()}</Tag>
                  </span>
                </h6>
                <h6 className="mb-25">
                  Pickup Status :
                  <span className="highlight-pickup-status">
                    {info.pickup_status == true ? "True" : "False"}
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
      // _filters['ordering'] = _tableParams?.sorter?.order == 'ascend' ? _tableParams?.sorter?.field : `-${_tableParams?.sorter?.field}`
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
                  options={MarchantOrderStatusOptions}
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
            <div className="invoice-title-card">
              <h3> Orders </h3>
              <Link to={"/marchant-orders/add"}>
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
            <>
              <OrderDetailsDrawer open={open} orderid={orderid} showOrderDetailsDrawer={showOrderDetailsDrawer} onCloseOrderDetailsDrawer={onCloseOrderDetailsDrawer} />
            </>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default MerchantOrdersList

