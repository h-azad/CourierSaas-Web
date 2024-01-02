import { MoreVertical, Edit3 } from "react-feather"
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
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
import { getApi, CREATE_ORDER_DELETE, DELIVERY_RIDER_TASK, CREATE_ORDER_EDIT, DELIVERY_ASSIGNMENT, DELIVERY_RIDER_TASK_SEARCH_FILTER, CREATE_ORDER_DETAILS } from "../../../constants/apiUrls"
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

const DeliveryRiderTask = () => {
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




  const adminConfirmDelivery = (e, id) => {
    e.preventDefault()
    useJwt
      .axiosGet(getApi(`${CREATE_ORDER_DETAILS}${id}/admin_confirm_delivery/`))
      .then((res) => {
        
        if( res?.data?.error){
          toast.error(res?.data?.message)
        }else{
          toast.success(res?.data?.message)
          SwalAlert(res?.data?.message)
          fetchCreateOrderData()
        }

      }).catch((err)=>{
        toast.error(err?.response?.data?.message) 
      })
  }



  const fetchCreateOrderData = () => {
    return useJwt
      .axiosGet(getApi(DELIVERY_RIDER_TASK + "/" + id) + `?${qs.stringify(filterQuery)}`)
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
                      {info.status === "delivered" && <DropdownItem href="/" onClick={e => adminConfirmDelivery(e, info?.id)}>
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
    fetchCreateOrderData()
  }, [])

  useEffect(() => {
    if (!statusModalState) {
      clearData()
    }
    fetchCreateOrderData()
  }, [statusModalState])


  return (
    <>
      <OrderDetailsDrawer open={open} orderid={orderid} showOrderDetailsDrawer={showOrderDetailsDrawer} onCloseOrderDetailsDrawer={onCloseOrderDetailsDrawer} />

      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="d-flex align-items-center">

            </div>
          </div>
          <div className="col-lg-5">

          </div>
        </div>
      </CardText>

      <Table scroll={{ x: true }} columns={columns} dataSource={createOrder} onChange={handleTableChange} pagination={tableParams.pagination} />

    </>

  )
}

export default DeliveryRiderTask
