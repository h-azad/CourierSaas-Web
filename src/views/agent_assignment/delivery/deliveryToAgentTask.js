import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash, Search, Edit3, Eye } from "react-feather"
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  CardText,
  Label,
  Input,
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, CREATE_ORDER_DELETE, DELIVERY_ASSIGN_TO_AGENT, CREATE_ORDER_EDIT, DELIVERY_RIDER_TASK_SEARCH_FILTER } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"
import ChangeStatusModal from "../../create_order/partials/ChangeStatusModal"
import { EyeOutlined } from '@ant-design/icons'
import { useParams } from "react-router-dom"

import OrderDetailsDrawer from "../../../components/order/OrderDetailsDrawer"

const DeliveryToAgentTask = () => {
  const [createOrder, setCreateOrder] = useState([])
  const MySwal = withReactContent(Swal)
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedInfo, setSelectedInfo] = useState(null)
  let { id } = useParams()

  const [orderid, setOrderId] = useState(0)
  const [open, setOpen] = useState(false)
  const showOrderDetailsDrawer = () => {
    setOpen(true)
  }
  const onCloseOrderDetailsDrawer = () => {
    setOpen(false)
  }

  const deleteAction = (e, id) => {
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

        useJwt
          .axiosDelete(getApi(CREATE_ORDER_DELETE + id + '/'))
          .then((res) => {
            SwalAlert("Deleted Successfully")
          })
          .finally(() => fetchCreateOrderData())

      }
    })

  }

  const updateStatusAction = (e) => {
    e.preventDefault()
    console.log("selectedInfo", selectedInfo)
    console.log("selectedStatus", selectedStatus)
    useJwt
      .axiosPatch(getApi(CREATE_ORDER_EDIT + selectedInfo.id + '/'), {
        status: "in_warehouse",
        warehouse_status: true
      })
      .then((res) => {
        SwalAlert("Deleted Successfully")
      })

  }


  const changeStatusAction = (e, info) => {
    e.preventDefault()
    useJwt
      .axiosPost(getApi(`${DELIVERY_ASSIGN_TO_AGENT}/${info.id}/admin_confirm_delivery/`), { details: info, status: "completed", })
      .then((res) => {
        SwalAlert("Delivery Confirm")
        fetchCreateOrderData()
      })
  }

  useEffect(() => {
    fetchCreateOrderData()
  }, [])

  const fetchCreateOrderData = () => {
    return useJwt
      .axiosGet(getApi(DELIVERY_ASSIGN_TO_AGENT + "/" + id))
      .then((res) => {
        console.log("res", res.data)
        setCreateOrder(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (!statusModalState) {
      clearData()
    }
    fetchCreateOrderData()
  }, [statusModalState])

  const fetchSearchCreateOrderData = searchTerm => {
    return useJwt
      .axiosGet(getApi(DELIVERY_RIDER_TASK_SEARCH_FILTER) + `?delivery_rider=${id}&search_query=${searchTerm}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = debounce(e => {
    console.log(e.target.value)
    const searchTerm = e.target.value
    if (searchTerm.length > 0) {
      fetchSearchCreateOrderData(searchTerm)
        .then(data => {
          if (data?.length > 0) {
            console.log('res', data)
            setCreateOrder(data)
          } else {
            console.log("No data")
          }
        })
    } else {
      fetchCreateOrderData()
    }

  }, 300)

  const clearData = () => {
    setSelectedInfo(null)
    setSelectedStatus(null)
  }

  function debounce(fn, time) {
    let timeoutId
    return wrapper
    function wrapper(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        timeoutId = null
        fn(...args)
      }, time)
    }
  }
  return (

    <>
      <OrderDetailsDrawer open={open} orderID={orderid} showOrderDetailsDrawer={showOrderDetailsDrawer} onCloseOrderDetailsDrawer={onCloseOrderDetailsDrawer} />

      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="d-flex align-items-center">

            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Order "
                name="user_name"
                type="text"
                class="form-control"
                onChange={handleSearch}
              />
              <Button.Ripple className="btn-icon ms-1" outline color="primary">
                <Search size={16} />
              </Button.Ripple>
            </div>
          </div>
        </div>
      </CardText>
      <div className='invoice-title-card'>
        {/* <h4> List Current Task </h4> */}


      </div>
      <hr></hr>
      {createOrder &&
        createOrder.map((info) => (
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
                      <DropdownMenu>
                        {<DropdownItem href="/" onClick={e => changeStatusAction(e, info)}>
                          <Edit3 className="me-50" size={15} />{" "}
                          <span className="align-middle">Delivery Confirm</span>
                        </DropdownItem>}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </Col>
              </Row>
              <Row className='mt-2' >
                <Col xl='7'>
                  <h6 className='mb-25'><b>Recipient Name :{info?.recipient_name}</b>  </h6>
                  <h6 className='mb-25'>Phone Number : {info?.phone_number}</h6>
                  <h6 className='mb-25'>Delivary Address : {info?.delivary_address}</h6>
                  <h6 className='mb-25 '>Order Status : <span className='highlight-status'>{info.status === "in_warehouse" ? "In Warehouse" : info.status}</span></h6>
                  <h6 className='mb-25'>Pickup Status :<span className='highlight-pickup-status'>{info.pickup_status == true ? 'True' : 'False'}</span></h6>
                </Col>
                <Col xl='5'>
                  <h6 className='mb-25'>Warehouse Status :<span className='highlight-pickup-status'>{info.warehouse_status == true ? 'True' : 'False'}</span></h6>
                  <h6 className='mb-25'>Product type : {info.product_type.product_type}</h6>
                  <h6 className='mb-25'>Shipment type : {info.shipment_type.shipment_type}</h6>

                  <h6 className='mb-25'>Delivary Charge: {info?.delivary_charge}</h6>
                  <h6 className='mb-25'>Cash On Delivery Charge : {info?.cash_on_delivery_charge}</h6>
                  <h6 className='mb-25'>Collection Amount : {info?.amount_to_be_collected}</h6>
                  <h6 className='mb-25'>Total Amount : {Number(info?.amount_to_be_collected) + Number(info?.delivary_charge)}</h6>
                </Col>
              </Row>
            </CardBody>

            <ChangeStatusModal
              statusModalState={statusModalState}
              setStatusModalState={setStatusModalState}
              orderInfo={selectedInfo}
              fetchCreateOrderData={fetchCreateOrderData}
            />

            <StatusModal
              statusModalState={statusModalState}
              setStatusModalState={setStatusModalState}
              updateStatusAction={updateStatusAction}
              title={"Change Pricing Policy Status"}
            >
              <div className='demo-inline-spacing'>
                <div className='form-check'>
                  <Input type='radio' id='ex1-active' name='ex1' checked={selectedStatus == "accepted" ? true : false} onChange={() => setSelectedStatus("accepted")} />
                  <Label className='form-check-label' for='ex1-active'>
                    Accepted
                  </Label>
                </div>
                <div className='form-check'>
                  <Input type='radio' name='ex1' id='ex1-inactive' checked={selectedStatus == "pending" ? true : false} onChange={() => setSelectedStatus("pending")} />
                  <Label className='form-check-label' for='ex1-inactive'>
                    Pending
                  </Label>
                </div>
                <div className='form-check'>
                  <Input type='radio' name='ex1' id='ex1-inactive' checked={selectedStatus == "delivered" ? true : false} onChange={() => setSelectedStatus("delivered")} />
                  <Label className='form-check-label' for='ex1-inactive'>
                    Delivered
                  </Label>
                </div>
              </div>
            </StatusModal>
          </Card >
        ))}
    </>

  )
}

export default DeliveryToAgentTask
