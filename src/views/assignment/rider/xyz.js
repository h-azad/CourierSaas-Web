

import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash, Search, Edit3, Eye } from "react-feather"
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  CardText,
  Input,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  RIDER_ASSIGNMENT,
  RIDER_DELETE,
  UNPICKUP_ORDER_LIST,
  RIDER_SEARCH_FILTER,
  UNDELIVERY_ORDER_LIST,
  DELIVERY_ASSIGNMENT,
} from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"

import OrderDetailsDrawer from "../../../components/order/OrderDetailsDrawer"

import { Table, Tag, Menu, Dropdown } from "antd"
import * as qs from 'qs'
import { GENERAL_ROW_SIZE } from "../../../constants/tableConfig"

const RiderAssignmentList = () => {
  const [rider, setRider] = useState([])
  const [statusModalState, setStatusModalState] = useState(false)
  const [orders, setOrder] = useState([])

  const [selectedOrderIds, setselectedOrderid] = useState([])
  const [riderId, setRiderId] = useState()
  const [assignType, setAssignType] = useState()

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: GENERAL_ROW_SIZE,
    },
  })

  const [filterQuery, setFilterQuery] = useState({
    page: 1,
    page_size: GENERAL_ROW_SIZE,
    ordering: 'full_name'
  })

  const [orderid, setOrderId] = useState()
  const [open, setOpen] = useState(false)

  const showOrderDetailsDrawer = () => {
    setOpen(true)

  }
  const onCloseOrderDetailsDrawer = () => {
    setOpen(false)
  }




  const deleteAction = (e, id) => {
    e.preventDefault()

    return SwalConfirm(`You won't be able to revert this!`, "Delete").then(
      function (result) {
        if (result.value) {
          useJwt
            .axiosDelete(getApi(RIDER_DELETE + id + "/"))
            .then((res) => {
              SwalAlert("Deleted Successfully")
            })
            .finally(() => fetchRiderData())
        }
      }
    )
  }


  const updateStatusAction = (e) => {

    e.preventDefault()
    useJwt
      .axiosPost(getApi(RIDER_ASSIGNMENT + "/"), {
        riderId: riderId,
        selectedOrderIds: selectedOrderIds
      })
      .then((res) => {
        setStatusModalState(false)
      })
    //   .finally(() => fetchRiderData())
  }


  const delivaryHandler = (e) => {

    e.preventDefault()
    useJwt
      .axiosPost(getApi(DELIVERY_ASSIGNMENT + "/"), {
        riderId: riderId,
        selectedOrderIds: selectedOrderIds
      })
      .then((res) => {
        setStatusModalState(false)
      })
    //   .finally(() => fetchRiderData())
  }


  const handleselectedOrderId = (e) => {
    const { value, checked } = e.target
    if (checked) {
      let prevFormValues = [...selectedOrderIds, value]
      setselectedOrderid(prevFormValues)
    } else {
      let currentFromValues = selectedOrderIds.filter(item => item !== value)
      setselectedOrderid(currentFromValues)
    }

  }


  const changeStatusAction = (e, info) => {
    e.preventDefault()
    setselectedOrderid([])
    setAssignType('pickup')
    setRiderId(info.id)
    fetchOrderData()
    setStatusModalState(true)
  }


  const deliveryAssign = (e, info) => {
    e.preventDefault()
    setselectedOrderid([])
    setAssignType('delivery')
    setRiderId(info.id)
    fetchUnDeliveryData()
    setStatusModalState(true)
    setSelectedStatus(info)
    setSelectedInfo(info)
  }



  const fetchRiderData = () => {
    return useJwt
      .axiosGet(getApi(RIDER_SEARCH_FILTER) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setRider(res?.data?.results)
        updatePagination({
          current: res?.data?.page_number,
          pageSize: res?.data?.page_size,
          total: res?.data?.count,
        })
      })
      .catch((err) => console.log(err))
  }

  const fetchOrderData = () => {
    return useJwt.axiosGet(getApi(UNPICKUP_ORDER_LIST))
      .then((res) => {
        setOrder(res?.data)
      }).catch((err) => {
        console.log(err)
      })
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

  const updateFilterQUery = (term, value) => {
    let filters = { ...filterQuery }

    if (value) {
      filters[term] = value
    } else {
      filters.hasOwnProperty(term) && delete filters[term]
    }
    setFilterQuery(filters)
  }



  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      sorter: true,
      defaultSortOrder: 'ascend'

    },

    {
      title: 'Contact Number',
      dataIndex: 'contact_no',
    },

    {
      title: 'Email',
      dataIndex: 'email',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <Tag color={'green'}>{text.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Action',

      render: (_, info) =>

        <Dropdown
          overlay={
            <Menu>

              <Dropdown.Button onClick={e => changeStatusAction(e, info)}>
                <Edit3 className="me-50" size={15} />{" "}
                <span className="align-middle">Pickup</span>
              </Dropdown.Button>
              <DropdownItem href="/" onClick={e => deliveryAssign(e, info)}>
                <Edit3 className="me-50" size={15} />{" "}
                <span className="align-middle">Delivary</span>
              </DropdownItem>
              <DropdownItem tag={Link} to={"/assignment/task/" + info.id} >
                <Eye className="me-50" size={15} />{" "}
                <span className="align-middle">Pickup Tasks</span>
              </DropdownItem>
              <DropdownItem tag={Link} to={"/assignment/delivery/" + info.id} >
                <Eye className="me-50" size={15} />{" "}
                <span className="align-middle">Delivery Tasks</span>
              </DropdownItem>

            </Menu>
          }
        >
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
        </Dropdown>
    },
  ]


  const columnsOrders = [
    {
      title: 'Address',
      dataIndex: 'delivary_address',

    },

    {
      title: 'Parcel ID',
      dataIndex: 'parcel_id',
    },
    {
      title: 'Action',

      render: (_, order) =>

        <Input type='checkbox' value={order.id} onClick={(e) => { handleselectedOrderId(e) }} name="order_id" id='remember-me' />
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
    fetchRiderData()
  }, [JSON.stringify(filterQuery)])



  useEffect(() => {
    if (!statusModalState) {

    }
    fetchRiderData()
  }, [statusModalState])


  return (
    <>
      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="d-flex align-items-center">
              <Link to={"/rider/add"}>
                <Button.Ripple color="primary">Add Rider</Button.Ripple>
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Rider"
                name="user_name"
                type="text"
                class="form-control"
                // value=""
                onChange={(e) => { updateFilterQUery('search', e.target.value) }}
              />
              <Button.Ripple className="btn-icon ms-1" outline color="primary">
                <Search size={16} />
              </Button.Ripple>
            </div>
          </div>
        </div>
      </CardText>
      <div class="table-responsive">
        <Table scroll={{ x: true }} columns={columns} dataSource={rider} onChange={handleTableChange} pagination={tableParams.pagination} />
      </div>

      <Modal isOpen={statusModalState} toggle={() => setStatusModalState(!statusModalState)} className='modal-dialog-centered'>
        <ModalHeader toggle={() => setStatusModalState(!statusModalState)}>{assignType === "pickup" ? 'Pickup Assign' : 'Delivery Assign'}</ModalHeader>
        <ModalBody>
          <div class="table-responsive">
            {orders &&
              <Table scroll={{ x: true }} columns={columnsOrders} dataSource={orders} onChange={handleTableChange} pagination={false} />
            }
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={assignType === "pickup" ? updateStatusAction : delivaryHandler}>Assign</Button>
        </ModalFooter>
        <OrderDetailsDrawer open={open} orderid={orderid} showOrderDetailsDrawer={showOrderDetailsDrawer} onCloseOrderDetailsDrawer={onCloseOrderDetailsDrawer} />
      </Modal>
    </>
  )
}

export default RiderAssignmentList

