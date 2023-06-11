import { useEffect, useState, useRef } from 'react'
import Select from "react-select"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, MARCHANT_ORDER_LIST, MARCHANT_SEARCH_CREATE_ORDER_FILTER, } from "@src/constants/apiUrls"
import { Input, Space, Checkbox, ConfigProvider, Radio, Dropdown, Menu } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import {
  AppstoreOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons'

import { DatePicker, Button } from 'antd'
import classNames from 'classnames'
import { Label } from 'reactstrap'
const handleStatus = (value) => {
  console.log(`selected ${value}`)
}


const handleMenuClick = (e) => {
  message.info('Click on menu item.')
  console.log('click', e)
}


const OrdersList = ({ setActiveOrderData, orders, setOrders, activeOrder, setActiveOrder, fetchCreateOrderData }) => {
  const { Search } = Input
  const [searchOrders, setSearchOrders] = useState([])
  const [activeSearchItem, setActiveSearchItem] = useState(null)
  const { RangePicker } = DatePicker
  // ant menu
  const [statusVal, setSelectedStatus] = useState("")
  const [searchFields, setSearchFields] = useState()
  const [value, setValue] = useState("")

  const [orderStatus, setOrderStatus] = useState("")
  const [orderID, setorderID] = useState("")
  const [receipientName, setReceipientName] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")
  const [selectedDate, setSelectedDate] = useState(null)
  const datePickerRef = useRef(null)
  const [selectedValue, setSelectedValue] = useState('')

  const clearFilter = () => {
    setOrderStatus("")
    setorderID('')
    setReceipientName('')
    setphoneNumber('')
    setSelectedValue('')
    fetchCreateOrderData()
    setSelectedDate(null)

  }


  const [date, setDate] = useState(false)

  function onSelectDate(date, dateString) {
    console.log('yes on select date colling')
    handleSearch('date', dateString)
  }

  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    }
  }



  useEffect(() => {
   
  }, [searchFields])


  const fetchSearchFilterMerchant = (val,input) => {
    return useJwt
      .axiosGet(getApi(MARCHANT_SEARCH_CREATE_ORDER_FILTER) + `?search_fields=${val}&search=${input}`)
      .then((res) => {
        console.log("response",res)
        return res.data
      })
      .catch((err) => console.log(err))
  }


  const filterHandle = (e, property) => {
    setValue(e?.target?.value)
    console.log("handle search e", e)
    console.log("handle property", property)

    let searchTerm
    if (property === 'date') {
      searchTerm = e
    }
    else if (e?.target?.value) {
      searchTerm = e.target?.value
    } else {
      searchTerm = e?.value
    }
    if (searchTerm?.length > 0) {
      fetchSearchFilterMerchant(property, searchTerm).then((data) => {
        if (data?.length > 0) {
          setOrders(data)
          return data
        } else {
          console.log("No data")
        }
      })
    } else {
      fetchCreateOrderData()
    }
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

  const onChange = (value) => {
    console.log(`selected ${value}`)
  }
  const onSearch = (value) => console.log(value)

  const changeDate = (value, dateString) => {
    console.log('Selected Time: ', value)
    console.log('Formatted Selected Time: ', dateString)
  }
  const onOk = (value) => {
    console.log('onOk: ', value)
  }

  const reloadPage = () => {
    window.location.reload()
  }

  const checkedFields = [
    { label: "pickup", value: "Pickup" },
    { label: "warehouse", value: "Warehouse" },
    { label: "delivery", value: "Delivery" },
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
  

  return (

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
        // style={{
        //   width: 280,
        // }}
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
        // style={{
        //   width: 280,
        // }}
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
        // style={{
        //   width: 280,
        // }}
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
  )
}

export default OrdersList
