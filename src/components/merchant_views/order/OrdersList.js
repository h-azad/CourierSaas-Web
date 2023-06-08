import { useEffect, useState } from 'react'
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
  console.log("statusValxx", statusVal)

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

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Accepted" },
    { value: "pickedup", label: "Picked Up" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "hold", label: "Hold" },
    { value: "returned", label: "Returned" },
    { value: "cancelled", label: "Cancelled" },
    { value: "completed", label: "Completed" },
  ]



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


  const handleSearch = (e,property)=>{
    let searchTerm
    if (e?.target?.value){
      searchTerm = e.target?.value
    }else{
      searchTerm = e?.value
    }
    if (searchTerm?.length > 0) {
      fetchSearchFilterMerchant(property,searchTerm)
        .then(data => {
          if (data?.length > 0) {
            setOrders(data)
          } else {
            console.log("No data")
          }
        })
    }else{
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

  


  return (

    <div>
      <div>
        <div className='invoice-title-card'>
          <h3>Filter : </h3>
        </div>
        <div className="mt-2">
          <h6>
            Filter by Order Status
          </h6>
          <Select
            id="status"
            name="status"
            placeholder="Select Order Status"
            isClearable={true}
            className={classNames('react-select')}
            classNamePrefix='select'
            onChange={(e) => { handleSearch(e, 'status') }}
            options={statusOptions}
            // onChange={val => val && handleSearch(val)}
          />
        </div>

        <div className=" mt-2">
          <h6>Search Order ID </h6>
          <Search
            placeholder="eg. ODR23031301d6"
            onChange={(e) => { handleSearch(e, 'order_id') }}
            style={{
              width: 280,
            }}
          />
        </div>
        <div className=" mt-2">
          <h6>Search Receipient Name</h6>
          <Search
            placeholder="eg. Jhon Doe"
            onChange={(e) => { handleSearch(e, 'receipient_name') }}
            style={{
              width: 280,
            }}
          />
        </div>
        <div className=" mt-2">
          <h6>Phone Number </h6>
          <Search
            placeholder="eg. 01793912259"
            
            onChange={(e) => { handleSearch(e,'phone')}}
            style={{
              width: 280,
            }}
          />
        </div>
        <div className=" mt-2">
          <h6>
            Filter by Order Type
          </h6>
          <ConfigProvider
            theme={{
              components: {
                Checkbox: {
                  colorPrimary: '#ff4d4f',
                },
              },
            }}
          >
            <Checkbox onClick={(e) => { handleSearch(e, 'pickup') }}>Picked Up Order</Checkbox>
            <Checkbox onClick={(e) => { handleSearch(e, 'delivery') }}>Delivered Order</Checkbox>
            <Checkbox onClick={(e) => { handleSearch(e, 'warehouse') }}>WareHouse</Checkbox>
          </ConfigProvider>
        </div>
        

        <div className=" mt-2">
          <h6>Search Order Date</h6>
          <DatePicker onChange={changeDate} onOk={onOk}
          
            style={{
              width: 280,
            }} />
        </div>

      </div>
    </div>
  )
}

export default OrdersList
