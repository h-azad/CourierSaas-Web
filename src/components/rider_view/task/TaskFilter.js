import { useEffect, useState, useRef } from 'react'
import { Link } from "react-router-dom"
import Select from "react-select"
import classNames from "classnames"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, RIDER_SEARCH_FILTER, RIDER_SEARCH_CREATE_ORDER_FILTER } from "@src/constants/apiUrls"
import { Checkbox, DatePicker, Input, Typography, Button } from "antd"
const handleStatus = (value) => {
    console.log(`selected ${value}`)
}

const TaskFilter = ({ setCurrentTask, fetchCurrentTaskData }) => {
	const { Search } = Input
	const [activeSearchItem, setActiveSearchItem] = useState(null)
	const { RangePicker } = DatePicker
	const [createOrder, setCreateOrder] = useState([])
	const [statusModalState, setStatusModalState] = useState(false)
	const [selectedInfo, setSelectedInfo] = useState(null)
	const [value, setValue] = useState("")
	const [orderStatus, setOrderStatus] = useState("")
	const [orderID, setorderID] = useState("")
	const [receipientName, setReceipientName] = useState("")
	const [phoneNumber, setphoneNumber] = useState("")
	const [selectedDate, setSelectedDate] = useState(null)
	const datePickerRef = useRef(null)
	const [selectedValue, setSelectedValue] = useState('')


	const statusOptions = [
		{ value: "pickedup_assign", label: "Picked Up" },
		{ value: "deliverey_assign", label: "Delivered" },
		{ value: "hold", label: "Hold" },
		{ value: "returned", label: "Returned" },
		{ value: "cancelled", label: "Cancelled" },
		{ value: "completed", label: "Completed" },
	]

	const filterHandle = (e, property) => {
		setOrderStatus(e?.target?.value)
		setValue(e?.target?.value)

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
			fetchSearchFilterRIder(property, searchTerm).then((data) => {
				if (data?.length > 0) {
					setCurrentTask(data)
				} else {
					console.log("No data")
				}
			})
		} else {
			fetchCurrentTaskData()
		}
	}

	const fetchSearchFilterRIder = (val, input) => {
		return useJwt
			.axiosGet(
				getApi(RIDER_SEARCH_CREATE_ORDER_FILTER) +
				`?search_fields=${val}&search=${input}`
			)
			.then((res) => {
				console.log("response", res)
				return res.data
			})
			.catch((err) => console.log(err))
	}

	const clearFilter = () => {
		setOrderStatus("")
		setorderID('')
		setReceipientName('')
		setphoneNumber('')
		setSelectedValue('')
		fetchCurrentTaskData()
		setSelectedDate(null)

	}

    const fetchSearchFilterRider = searchTerm => {
        return useJwt
            .axiosGet(getApi(RIDER_SEARCH_FILTER) + '?search=' + searchTerm)
            .then((res) => {
                return res.data 
            })
            .catch((err) => console.log(err))
    }

    const handleSearch = debounce(e => {
        
        const searchTerm = e.target.value
        if (searchTerm.length > 2) {
            fetchSearchFilterRider(searchTerm)
                .then(data => {
                    if (data.length > 0) {
                        
                        // setSearchTask(data)
                        setCurrentTask(data)
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
				<div className="invoice-title-card">
					<h3>Filter : </h3>
					<Button type="primary" color="primary" onClick={clearFilter}>Clear</Button>
				</div>
				<div className="mt-2">
					<h6>Filter by Assignment Status</h6>
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

export default TaskFilter
