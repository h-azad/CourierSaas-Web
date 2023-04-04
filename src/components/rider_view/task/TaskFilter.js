import { useEffect, useState } from 'react'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, MARCHANT_ORDER_LIST, MARCHANT_SEARCH_FILTER, } from "@src/constants/apiUrls"
import { Input, Space } from 'antd'
import { DatePicker, Button } from 'antd'
const handleStatus = (value) => {
    console.log(`selected ${value}`)
}

const TaskFilter = ({ setActiveOrderData, orders, setOrders, activeOrder, setActiveOrder }) => {
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
        
        const searchTerm = e.target.value
        if (searchTerm.length > 2) {
            fetchSearchFilterMerchant(searchTerm)
                .then(data => {
                    if (data.length > 0) {
                        
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
            
                </div>
                <div className=" mt-2">
                    <h6>Search Parcel </h6>
                    <Search
                        placeholder="ODR23031301d6"
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
                <div className=" mt-2">
                    <h6>Phone Number </h6>
                    <Search
                        placeholder="01793912259"
                        onChange={handleSearch}
                        style={{
                            width: 280,
                        }}
                    />
                </div>
                <div className=" mt-2">
                    <h6>Search by Status  </h6>
                    <Search
                        placeholder="pending"
                        onChange={handleSearch}
                        style={{
                            width: 280,
                        }}
                    />
                </div>
                <div className=" mt-2">
                    <h6>Search by Pickup Status  </h6>
                    <Search
                        placeholder="true"
                        onChange={handleSearch}
                        style={{
                            width: 280,
                        }}
                    />
                </div>
                <div className=" mt-2">
                    <h6>Search Order Date</h6>
              
                    <Search
                        placeholder="2023-03-13"
                        onChange={handleSearch}
                        style={{
                            width: 280,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default TaskFilter
