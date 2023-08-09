import { useState, useRef } from 'react'
import Select from "react-select"
import classNames from "classnames"
import { Checkbox, DatePicker, Input, Button } from "antd"

const TaskFilter = ({ updateFilterQUery, handleSearchQuery, setFilterQuery }) => {
	const { Search } = Input

	const [orderStatus, setOrderStatus] = useState("")
	const [orderID, setorderID] = useState("")
	const [receipientName, setReceipientName] = useState("")
	const [phoneNumber, setphoneNumber] = useState("")
	const [selectedDate, setSelectedDate] = useState(null)
	const datePickerRef = useRef(null)
	const [selectedValue, setSelectedValue] = useState('')

	const statusOptions = [
		{ value: "accepted", label: "Accepted" },
		{ value: "pickedup", label: "Picked Up" },
		{ value: "in_warehouse", label: "In Warehouse" },
		{ value: "shipped", label: "Shipped" },
		{ value: "delivered", label: "Delivered" },
		{ value: "cancelled", label: "Cancelled" },
		{ value: "completed", label: "Completed" },
	]

	const clearFilter = () => {
		setOrderStatus("")
		setorderID('')
		setReceipientName('')
		setphoneNumber('')
		setSelectedValue('')
		setSelectedDate(null)
		handleSearchQuery()
		setFilterQuery({})
	}


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
						// filterHandle(e, "status")
						updateFilterQUery('status', e?.value)
						setOrderStatus(e)
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
						updateFilterQUery("parcel_id", e.target.value)
						setorderID(e.target.value)
					}}
					value={orderID}
				/>
			</div>
			<div className=" mt-2">
				<h6>Search Receipient Name</h6>
				<Search
					placeholder="eg. Jhon Doe"
					onChange={(e) => {
						updateFilterQUery("recipient_name", e.target.value)
						setReceipientName(e.target.value)
					}}
					value={receipientName}
				/>
			</div>
			<div className=" mt-2">
				<h6>Phone Number </h6>
				<Search
					placeholder="eg. 01793912259"
					onChange={(e) => {
						updateFilterQUery("phone_number", e.target.value)
						setphoneNumber(e.target.value)
					}}
					value={phoneNumber}
				/>
			</div>
			<div className=" mt-2">
				<h6>Filter by Order Type</h6>
				<Checkbox checked={selectedValue === 'pickedup'} value="pickedup" onChange={(e) => { updateFilterQUery("status", e.target.value), setSelectedValue(e.target.value) }}>
					Pickup
				</Checkbox>
				<Checkbox checked={selectedValue === 'in_warehouse'} value="in_warehouse" onChange={(e) => { updateFilterQUery("status", e.target.value), setSelectedValue(e.target.value) }}>
					Warehouse
				</Checkbox>
				<Checkbox checked={selectedValue === 'delivered'} value="delivered" onChange={(e) => { updateFilterQUery("status", e.target.value), setSelectedValue(e.target.value) }}>
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
					onChange={(e) => {
						updateFilterQUery("created_at", e.format('YYYY-MM-DD'))
						setSelectedDate(e)
					}}
				/>
			</div>
		</div>
	)
}

export default TaskFilter
