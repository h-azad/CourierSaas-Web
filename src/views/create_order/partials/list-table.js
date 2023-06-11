import { Link } from "react-router-dom"
import Select from "react-select"
import classNames from "classnames"
import { MoreVertical, Edit, Trash, Edit3 } from "react-feather"
import { Checkbox, ConfigProvider, DatePicker, Input, Typography } from "antd"
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
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  CREATE_ORDER_LIST,
  CREATE_ORDER_DELETE,
  ADMIN_SEARCH_CREATE_ORDER_FILTER,
} from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import ChangeStatusModal from "../../create_order/partials/ChangeStatusModal"
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import locale from 'antd/locale/zh_CN'
import { useRef } from "react"

const moment = require('moment') // If you're using Node.js with npm

const CreateOrderList = () => {
  const { Search } = Input
  const [createOrder, setCreateOrder] = useState([])
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState(null)
  const [value, setValue] = useState("")
  const [orderStatus, setOrderStatus] = useState("")
  const [orderID, setorderID] = useState("")
  const [receipientName, setReceipientName] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")
  const [selectedDate, setSelectedDate] = useState(null)
  const datePickerRef = useRef(null)
  const [selectedValue, setSelectedValue] = useState('')

  const deleteAction = (e, id) => {
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

  const changeStatusAction = (e, info) => {
    e.preventDefault()
    setStatusModalState(true)
    // setSelectedStatus(info.status)
    setSelectedInfo(info)
  }

  useEffect(() => {
    fetchCreateOrderData()
  }, [])

  const fetchCreateOrderData = () => {
    return useJwt
      .axiosGet(getApi(CREATE_ORDER_LIST))
      .then((res) => {
        console.log("res", res.data)
        setCreateOrder(res.data)
        return res.data
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (!statusModalState) {
      clearData()
    }
    fetchCreateOrderData()
  }, [statusModalState])

  const clearData = () => {
    setSelectedInfo(null)
    // setSelectedStatus(null)
  }

  const checkedFields = [
    { value: "pickup", label: "Pickup" },
    { value: "warehouse", label: "Warehouse" },
    { value: "delivery", label: "Delivery" },
  ]


  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Accepted" },
    { value: "pickedup", label: "Picked Up" },
    { value: "in_warehouse", label: "In Warehouse" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "hold", label: "Hold" },
    { value: "returned", label: "Returned" },
    { value: "cancelled", label: "Cancelled" },
    { value: "completed", label: "Completed" },
  ]

  const filterHandle = (e, property) => {
    setOrderStatus(e?.target?.value)
    setValue(e?.target?.value)
 
    let searchTerm
    if (property==='date'){
      searchTerm=e


    }
    else if (e?.target?.value) {
      searchTerm = e.target?.value
    } else {
      searchTerm = e?.value
      
    }
    if (searchTerm?.length > 0) {
      fetchSearchFilterAdmin(property, searchTerm).then((data) => {
        if (data?.length > 0) {
          setCreateOrder(data)
        } else {
          console.log("No data")
        }
      })
    } else {
      fetchCreateOrderData()
    }
  }

  const fetchSearchFilterAdmin = (val, input) => {
    return useJwt
      .axiosGet(
        getApi(ADMIN_SEARCH_CREATE_ORDER_FILTER) +
          `?search_fields=${val}&search=${input}`
      )
      .then((res) => {
        console.log("response", res)
        return res.data
      })
      .catch((err) => console.log(err))
  }



  const reloadPage = () => {
    window.location.reload()
  }
  
  const clearFilter = () => {
    setOrderStatus("")
    setorderID('')
    setReceipientName('')
    setphoneNumber('')
    setSelectedValue('')
    fetchCreateOrderData()
    setSelectedDate(null)

  }

  

  const handleChange = (e) => {
    const { value } = e.target
    setSelectedValue(value)
  }

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
                    filterHandle(e, "status")
                  }}
                  options={statusOptions}
                  value={orderStatus}
                />
              </div>

              <div className=" mt-2">
                <h6>Search Order ID </h6>
                <Search
                  placeholder="eg. ODR23031301d6"
                  onChange={(e) => {
                    filterHandle(e, "order_id"), setorderID(e.target.value)
                  }}
                  value={orderID}
                />
              </div>
              <div className=" mt-2">
                <h6>Search Receipient Name</h6>
                <Search
                  placeholder="eg. Jhon Doe"
                  onChange={(e) => {
                    filterHandle(e, "receipient_name"), setReceipientName(e.target.value)
                  }}
                  value={receipientName}
                />
              </div>
              <div className=" mt-2">
                <h6>Phone Number </h6>
                <Search
                  placeholder="eg. 01793912259"
                  onChange={(e) => {
                    filterHandle(e, "phone"), setphoneNumber(e.target.value)
                  }}
                  value={phoneNumber}
                />
              </div>
              <div className=" mt-2">
                <h6>Filter by Order Type</h6>
                <Checkbox checked={selectedValue === 'pickup'} value="pickup" onChange={(e) => { filterHandle(e, "pickup"), setSelectedValue(e.target.value) }}>
                  Pickup
                </Checkbox>
                <Checkbox checked={selectedValue === 'warehouse'} value="warehouse" onChange={(e) => { filterHandle(e, "warehouse"), setSelectedValue(e.target.value) }}>
                  Warehouse
                </Checkbox>
                <Checkbox checked={selectedValue === 'delivery'} value="delivery" onChange={(e) => { filterHandle(e, "delivery"), setSelectedValue(e.target.value) }}>
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
                  onChange={(date) => { setSelectedDate(date), filterHandle(date.format('YYYY-MM-DD'), 'date') }}
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
            {/* <ListTable /> */}
            {createOrder &&
              createOrder.map((info) => (
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
                          <button className="action-view">
                            {/* <EyeOutlined /> */}
                            <a href={"/create_order/view/" + info?.id}> View</a>
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
                              <DropdownItem
                                href={"/create_order/edit/" + info.id}
                              >
                                <Edit className="me-50" size={15} />{" "}
                                <span className="align-middle">Edit</span>
                              </DropdownItem>
                              <DropdownItem
                                href="/"
                                onClick={(e) => deleteAction(e, info.id)}
                              >
                                <Trash className="me-50" size={15} />{" "}
                                <span className="align-middle">Delete</span>
                              </DropdownItem>
                              <DropdownItem
                                href="/"
                                onClick={(e) => changeStatusAction(e, info)}
                              >
                                <Edit3 className="me-50" size={15} />{" "}
                                <span className="align-middle">
                                  Change Status
                                </span>
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
              ))}
            <ChangeStatusModal
              statusModalState={statusModalState}
              setStatusModalState={setStatusModalState}
              orderInfo={selectedInfo}
              fetchCreateOrderData={fetchCreateOrderData}
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default CreateOrderList
