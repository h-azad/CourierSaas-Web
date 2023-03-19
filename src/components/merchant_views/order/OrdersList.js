import { ListGroup, ListGroupItem } from 'reactstrap'
import { Facebook, Instagram, Twitter } from 'react-feather'
import { useEffect, useState } from 'react'
import { formatDate } from '@utils'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, MARCHANT_ORDER_LIST, MARCHANT_SEARCH_FILTER, } from "@src/constants/apiUrls"
import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash, Search, Edit3, Eye } from "react-feather"
import { AudioOutlined } from '@ant-design/icons'
import { Input, Space } from 'antd'
import { Select } from 'antd'
import { DatePicker, Button } from 'antd'
import {
    Table,
    Badge,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    CardText,
    Label,

} from "reactstrap"

const handleStatus = (value) => {
    console.log(`selected ${value}`)
}

const OrdersList = ({ setActiveOrderData, orders, setOrders, activeOrder, setActiveOrder }) => {
    const { Search } = Input
    const [searchOrders, setSearchOrders] = useState([])
    const [activeSearchItem, setActiveSearchItem] = useState(null)
    const { RangePicker } = DatePicker

    const fetchSearchFilterMerchant = searchTerm => {
        return useJwt
            .axiosGet(getApi(MARCHANT_SEARCH_FILTER) + '?search=' + searchTerm)
            .then((res) => {
                return res.data 
            })
            .catch((err) => console.log(err))
    }

    const handleSearch = debounce(e => {
        // console.log(e.target.value)
        const searchTerm = e.target.value
        if (searchTerm.length > 5) {
            fetchSearchFilterMerchant(searchTerm)
                .then(data => {
                    if (data.length > 0) {
                        // console.log('ffdddydres', data)
                        setOrders(data)
                        // setActiveOrder(data[0].id)
                        // setActiveOrderData(data)
                    } else {
                        console.log("No data")
                    }
                })
        }

    }, 300)

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
                    <Link to={''}>
                        <Button type="primary" color="primary"> Apply </Button>
                    </Link>
                </div>
                {/* <div className="col-lg-5">
                    <div className="d-flex align-items-center ">
                        <input
                            placeholder="Search Agent"
                            name="user_name"
                            type="text"
                            class="form-control"
                            // value=""
                            onChange={handleSearch}
                        />
                        <Button.Ripple className="btn-icon ms-1" outline color="primary">
                            <Search size={16} />
                        </Button.Ripple>
                    </div>
                </div> */}
                <div className=" mt-2">
                    <h6>Search Parcel </h6>
                    <Search
                        placeholder="input parcel id"
                        onChange={handleSearch}
                        style={{
                            width: 280,
                        }}
                    />
                </div>
                <div className=" mt-2">
                    <h6>Search Receipient </h6>
                    <Search
                        placeholder="input Receipient name"
                        onChange={handleSearch}
                        style={{
                            width: 280,
                        }}
                    />
                </div>
                {/* <div className=" mt-2">
                    <h6>Search Receipient </h6>
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        style={{
                            width: 280,
                        }}
                        options={[
                            {
                                value: 'jack',
                                label: 'Jack',
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                            {
                                value: 'tom',
                                label: 'Tom',
                            },
                        ]}
                    />
                </div> */}
                <div className=" mt-2">
                    <h6>Phone Number </h6>
                    <Search
                        placeholder="input Phone Number"
                        onChange={handleSearch}
                        style={{
                            width: 280,
                        }}
                    />
                </div>

                {/* <div className=" mt-2">
                    <h6>Created at</h6>
                    <DatePicker showTime onChange={changeDate} onOk={onOk}
                        style={{
                            width: 280,
                        }} />
                </div> */}

                {/* <div className=" mt-2">
                    <h6>Search Date </h6>
                    <RangePicker
                        showTime={{
                            format: 'HH:mm',
                        }}
                        format="YYYY-MM-DD HH:mm"
                        onChange={changeDate}
                        onOk={onOk}
                    />
                </div> */}
                {/* <div className=" mt-2">
                    <h6>Select Status </h6>
                    <Select
                        defaultValue="Pending"
                        style={{
                            width: 120,

                        }}
                        onChange={handleStatus}
                        options={[
                            {
                                value: 'pending',
                                label: 'Pending',
                            },
                            {
                                value: 'accepted',
                                label: 'Accepted',
                            },
                            {
                                value: 'pickedup',
                                label: 'Pickedup',
                            },
                            {
                                value: 'shipped',
                                label: 'Shipped',
                            },
                            {
                                value: 'delivered',
                                label: 'Delivered',
                            },
                            {
                                value: 'hold',
                                label: 'Hold',
                            },
                            {
                                value: 'returned',
                                label: 'Returned',
                            },
                            {
                                value: 'cancelled',
                                label: 'Cancelled',
                            },
                            {
                                value: 'completed',
                                label: 'Completed',
                            },

                        ]}
                    />
                </div> */}
            </div>
            <ListGroup>
                {orders &&
                    orders.map((info, idx) => (
                        <ListGroupItem active={info.id == activeOrder}>
                            <div className='d-flex justify-content-between w-100' onClick={() =>
                                setActiveOrder(info.id)
                            }>
                                <h5 className={`mb-1`}
                                // >#{activeSearchItem ? activeSearchItem.parcel_id : info.parcel_id}</h5>
                                >#{info.parcel_id}</h5>
                                <small>{info.id == activeOrder ? 'Active' : ''}</small>
                            </div>
                            <p className='mb-1'>
                                <span>{formatDate(info.created_at)}</span>
                            </p>
                        </ListGroupItem>
                    ))
                }
            </ListGroup>
        </div>
    )
}

export default OrdersList
