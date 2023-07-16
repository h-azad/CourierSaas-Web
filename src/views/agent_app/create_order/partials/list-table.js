import { Link } from "react-router-dom"
import Select from "react-select"
import classNames from "classnames"
import { MoreVertical, Edit, Trash, Edit3 } from "react-feather"
import { Checkbox, DatePicker, Input, Typography } from "antd"
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
  CREATE_ORDER_BY_AGENT,
  CREATE_ORDER_BY_AGENT_FILTER,
  CREATE_ORDER_DELETE,
  ADMIN_SEARCH_CREATE_ORDER_FILTER,
} from "../../../../constants/apiUrls"
import SwalAlert from "../../../../components/SwalAlert"
import SwalConfirm from "../../../../components/SwalConfirm"
import ChangeStatusModal from "../../../create_order/partials/ChangeStatusModal"

const CreateOrderList = () => {
  const { Search } = Input
  const [createOrder, setCreateOrder] = useState([])
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState(null)
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
      .axiosGet(getApi(CREATE_ORDER_BY_AGENT))
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


  const fetchOrderSearchFilterByAgent = (val, input) => {
    console.log('val', val, 'input', input)
    return useJwt
      .axiosGet(
        getApi(CREATE_ORDER_BY_AGENT_FILTER) +
          `?${input}=${val}`
      )
      .then((res) => {
        setCreateOrder(res.data)
        console.log("response", res)
        return res.data
      })
      .catch((err) => console.log(err))
  }
  
  const clearFilter = () => {
    setSelectedDate(null)
    fetchCreateOrderData()
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
                  // onChange={(e) => {
                  //   filterHandle(e, "status")
                  // }}
                  onChange={(e) => {
                    fetchOrderSearchFilterByAgent(e.value, "status")
                  }}
                  options={statusOptions}
                  // value={orderStatus}
                />
              </div>

              <div className=" mt-2">
                <h6>Search Order ID </h6>
                <Search
                  placeholder="eg. ODR23031301d6"
                  onChange={(e) => {
                    fetchOrderSearchFilterByAgent(e.target.value, "parcel_id")
                  }}
                />
              </div>
              <div className=" mt-2">
                <h6>Search Receipient Name</h6>
                <Search
                  placeholder="eg. Jhon Doe"
                  onChange={(e) => {
                    fetchOrderSearchFilterByAgent(e.target.value, "recipient_name")
                  }}
                />
              </div>
              <div className=" mt-2">
                <h6>Phone Number </h6>
                <Search
                  placeholder="eg. 01793912259"
                  onChange={(e) => {
                    fetchOrderSearchFilterByAgent(e.target.value, "phone_number")
                  }}
                />
              </div>
              <div className=" mt-2">
                <h6>Filter by Order Type</h6>
                <Checkbox checked={selectedValue === 'pickedup'} value="pickedup" onChange={(e) => { fetchOrderSearchFilterByAgent(e.target.value, "status"), setSelectedValue(e.target.value) }}>
                  Pickup
                </Checkbox>
                <Checkbox checked={selectedValue === 'in_warehouse'} value="in_warehouse" onChange={(e) => { fetchOrderSearchFilterByAgent(e.target.value, "status"), setSelectedValue(e.target.value) }}>
                  Warehouse
                </Checkbox>
                <Checkbox checked={selectedValue === 'delivered'} value="delivered" onChange={(e) => { fetchOrderSearchFilterByAgent(e.target.value, "status"), setSelectedValue(e.target.value) }}>
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
                  onChange={(date) => { setSelectedDate(date), fetchOrderSearchFilterByAgent(date.format('YYYY-MM-DD'), "created_at") }}
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
              <Link to={"/agent/add-order"}>
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
                                href={"/agent/create_order/edit/" + info.id}
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
