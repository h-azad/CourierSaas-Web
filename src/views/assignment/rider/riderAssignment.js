
import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash, Search, Edit3, Truck, Check, DollarSign } from "react-feather"
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
  RIDER_PICKED_ASSIGNMENT,
  RIDER_DELETE,
  UNPICKUP_ORDER_LIST,
  ACTIVE_RIDER,
  UNDELIVERY_ORDER_LIST,
  DELIVERY_ASSIGNMENT,
  CREATE_ORDER_LIST,
} from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"

import OrderDetailsDrawer from "../../../components/order/OrderDetailsDrawer"

import { Table, Tag, Menu, Dropdown, Button as AntdButton } from "antd"
import { DownOutlined } from '@ant-design/icons'
import { TbTruck } from 'react-icons/tb'
import { TfiTruck } from 'react-icons/tfi'

import * as qs from 'qs'
import { GENERAL_ROW_SIZE } from "../../../constants/tableConfig"

import toast from 'react-hot-toast'

const RiderAssignmentList = () => {
  const [rider, setRider] = useState([])
  const [statusModalState, setStatusModalState] = useState(false)
  const [orders, setOrder] = useState([])

  const [orderid, setOrderId] = useState()
  const [open, setOpen] = useState(false)

  const [selectedOrderIds, setselectedOrderid] = useState([])
  const [riderId, setRiderId] = useState()
  const [assignType, setAssignType] = useState()
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
    ordering: 'full_name'
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
    enterLoading(true)
    e.preventDefault()
    useJwt
      .axiosPost(getApi(RIDER_PICKED_ASSIGNMENT + "/"), {
        riderId: riderId,
        selectedOrderIds: selectedOrderIds
      })
      .then((res) => {
        enterLoading(false)
        toast.success('Rider Assignment Successfully!') 
        setStatusModalState(false)
      })
    //   .finally(() => fetchRiderData())
  }


  const delivaryHandler = (e) => {
    e.preventDefault()
    enterLoading(true)
    useJwt
      .axiosPost(getApi(DELIVERY_ASSIGNMENT + "/"), {
        riderId: riderId,
        selectedOrderIds: selectedOrderIds
      })
      .then((res) => {
        enterLoading(false)
        toast.success('Rider Assignment Successfully!')
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


  const pickedAssignToRider = (e, id) => {
    e.preventDefault()
    setselectedOrderid([])
    setAssignType('pickup')
    setRiderId(id)
    fetchOrderData()
    setStatusModalState(true)
  }


  const deliveryAssign = (e, id) => {
    e.preventDefault()
    setselectedOrderid([])
    setAssignType('delivery')
    setRiderId(id)
    fetchUnDeliveryData()
    setStatusModalState(true)
  }



  const fetchRiderData = () => {
    return useJwt
      .axiosGet(getApi(ACTIVE_RIDER) + `?${qs.stringify(filterQuery)}`)
      
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
        console.log('UNPICKUP_ORDER_LIST', res?.data)
        setOrder(res?.data)
      }).catch((err) => {
        console.log(err)
      })
  }

    const fetchUnDeliveryData = () => {
      return useJwt.axiosGet(getApi(UNDELIVERY_ORDER_LIST))
        .then((res) => {
          console.log(res.data)
          setOrder(res.data)
        }).catch((err) => {
          console.log(err)
        })
    }


  const filterUnPickupOrderData = (value) => {
    return useJwt
      .axiosGet(getApi(UNPICKUP_ORDER_LIST) + `?parcel_id=${value}`)
      .then((res) => {
        setOrder(res.data)
      })
      .catch((err) => console.log(err))
  }


  const filterUnDeliveryOrderData = (value) => {
    return useJwt
      .axiosGet(getApi(UNDELIVERY_ORDER_LIST) + `?parcel_id=${value}`)
      .then((res) => {
        setOrder(res.data)
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

  const updateFilterQUery = (term, value) => {
    let filters = { ...filterQuery }

    if (value) {
      filters[term] = value
    } else {
      filters.hasOwnProperty(term) && delete filters[term]
    }
    setFilterQuery(filters)
  }

  

  const renderDropDownItems = (id) => {
    const item = [
      {
        key: '1',
        label: (
          <a onClick={e => pickedAssignToRider(e, id)}><TfiTruck className="me-20" size={16} />{" "}Pickup</a>
        ),
      },
      {
        key: '2',
        label: (
          <a onClick={e => deliveryAssign(e, id)} ><TbTruck className="me-20" size={18} />{" "}Delivary</a>
        ),
      },
      {
        key: '3',
        label: (
          <Link to={"/assignment/task/" + id}><Check className="me-20" size={15} />{" "}Pickup Tasks</Link>
        ),
      },
      {
        key: '4',
        label: (
          <Link to={"/assignment/delivery/" + id}><Check className="me-20" size={15} />{" "}Delivery Tasks</Link>
        ),
      },

      {
        key: '5',
        label: (
          <Link to={"/assignment/pending-cod/collection/" + id}><DollarSign className="me-20" size={15} />{" "}Collection</Link>
        ),
      },
    ]

    return item
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
          menu={{
            items: renderDropDownItems(info?.id)
          }}
          trigger={['click']}
        >
          <a onClick={(e) => e.preventDefault()} href="">
            More <DownOutlined />
          </a>
        </Dropdown>
    },
  ]

 

  const columnsOrders = [
    {
      title: 'Parcel ID',
      dataIndex: 'parcel_id',
    },
    {
      title: 'Address',
      dataIndex: 'pickup_status' == true ? 'delivary_address' :  ['pickup_address', 'street_address'],
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
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Order ID"
                name="user_name"
                type="text"
                class="form-control"
                // value=""
                onChange={(e) => { assignType === "pickup" ? filterUnPickupOrderData(e.target.value) : filterUnDeliveryOrderData(e.target.value) }}
              />
              <Button.Ripple className="btn-icon ms-1" outline color="primary">
                <Search size={16} />
              </Button.Ripple>
            </div>
            
            {orders &&
              <Table scroll={{ x: true }} columns={columnsOrders} dataSource={orders} onChange={handleTableChange} pagination={false} />
            }
          </div>
        </ModalBody>
        <ModalFooter>
          <AntdButton type="primary" loading={loadings[1]} onClick={assignType === "pickup" ? updateStatusAction : delivaryHandler}>Assign</AntdButton>
        </ModalFooter>
        <OrderDetailsDrawer open={open} orderid={orderid} showOrderDetailsDrawer={showOrderDetailsDrawer} onCloseOrderDetailsDrawer={onCloseOrderDetailsDrawer} />
      </Modal>
    </>
  )
}


export default RiderAssignmentList


