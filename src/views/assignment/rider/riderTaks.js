import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash, Search, Edit3, Eye } from "react-feather"
import {
  // Table,
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
import { getApi, CREATE_ORDER_DELETE, PICKUP_RIDER_TASK, CREATE_ORDER_EDIT, PICKUP_RIDER_TASK_SEARCH_FILTER } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"
import ChangeStatusModal from "../../create_order/partials/ChangeStatusModal"
import { EyeOutlined } from '@ant-design/icons'
import { useParams } from "react-router-dom"
import OrderDetailsDrawer from "../../../components/order/OrderDetailsDrawer"

import { GENERAL_ROW_SIZE } from "../../../constants/tableConfig"
import * as qs from 'qs'
import { Table, Tag } from "antd"

import toast from 'react-hot-toast'

const ListTable = () => {
  let { id } = useParams()
  const [createOrder, setCreateOrder] = useState([])
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
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

  const [orderid, setOrderId] = useState()

  const [open, setOpen] = useState(false)

  const showOrderDetailsDrawer = () => {
    setOpen(true)

  }
  const onCloseOrderDetailsDrawer = () => {
    setOpen(false)
  }


  const clearData = () => {
    setSelectedInfo(null)
    setSelectedStatus(null)
  }


  const updateStatusAction = (e) => {
    e.preventDefault()

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
      .axiosPatch(getApi(CREATE_ORDER_EDIT + info.id + '/'), {
        status: "in_warehouse",
        warehouse_status: true
      })
      .then((res) => {
        SwalAlert("Receive Confirm")
        toast.success('Received Confirm!') 
        fetchCreateOrderData()
      })
  }


  const fetchCreateOrderData = () => {
    return useJwt
      .axiosGet(getApi(PICKUP_RIDER_TASK + "/" + id) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setCreateOrder(res?.data?.results)
        updatePagination({
          current: res?.data?.page_number,
          pageSize: res?.data?.page_size,
          total: res?.data?.count,
        })
      })

      .catch(err => console.log(err))
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
                      {info.warehouse_status == false && <DropdownItem href="/" onClick={e => changeStatusAction(e, info)}>
                        <Edit3 className="me-50" size={15} />{" "}
                        <span className="align-middle">Receive Confirm</span>
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
                <h6 className='mb-25 '>Order Status : <span className='highlight-status'>{info.status === "in_warehouse" ? "In Warehouse" : info.status.toUpperCase()}</span></h6>
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


  useEffect(() => {
    if (!statusModalState) {
      clearData()
    }
    fetchCreateOrderData()
  }, [statusModalState])


  useEffect(() => {
    fetchCreateOrderData()
  }, [])



  return (

    <>

      <OrderDetailsDrawer open={open} orderid={orderid} showOrderDetailsDrawer={showOrderDetailsDrawer} onCloseOrderDetailsDrawer={onCloseOrderDetailsDrawer} />

      <hr></hr>

      <Table scroll={{ x: true }} columns={columns} dataSource={createOrder} onChange={handleTableChange} pagination={tableParams.pagination} />

    </>

  )
}

export default ListTable
