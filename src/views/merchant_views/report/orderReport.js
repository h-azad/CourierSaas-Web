

// import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, MARCHANT_GET_ORDER_REPORT, MARCHANT_GET_ORDER_REPORT_PDF } from "../../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import * as qs from 'qs'
import { Pagination, Table, Responsive, Tag, Card } from "antd"
import { Overlay } from "antd/es/popconfirm/PurePanel"
// import { Table } from 'antd'


const OrderReport = () => {
	const [order, setOrder] = useState([])
	const [filterQuery, setFilterQuery] = useState({})
	const [orderCount, setOrderCount] = useState(0)

	const defaultFetchOrderData = () => {
		return useJwt.axiosGet(getApi(MARCHANT_GET_ORDER_REPORT))
			.then((res) => {
				setOrder(res?.data?.results)
				setOrderCount(res?.data?.count)
				setFilterQuery({})
			}).catch((err) => {
				setOrder([])
				setOrderCount(0)
				setFilterQuery({})
			})
	}

	useEffect(() => {
		defaultFetchOrderData()
	}, [])


	const handleSearchQuery = searchTerm => {
		return useJwt
			.axiosGet(getApi(MARCHANT_GET_ORDER_REPORT) + '?' + searchTerm)
			.then((res) => {
				if (res.data?.results?.length > 0) {
					setOrder(res?.data?.results)
					setOrderCount(res?.data?.count)
				} else {
					setOrder([])
					setOrderCount(0)
				}
			})
			.catch((err) => {
				setOrder([])
				setOrderCount(0)
			})
	}


	function downloadPDFFile(file, fileName) {
		var blob = new Blob([file], { type: 'application/pdf' })
		var url = URL.createObjectURL(blob)
		var link = document.createElement('a')
		link.href = url
		link.download = fileName
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		URL.revokeObjectURL(url)
	}

	const handlePDFQuery = (searchTerm) => {

		return useJwt
			.axiosGet(getApi((MARCHANT_GET_ORDER_REPORT_PDF) + '?' + searchTerm))
			.then((res) => {
				if (res.data?.length > 0) {
					// setOrder(res.data)
					console.log('response file', res.data)
					var file = new Blob([res.data], { type: 'application/pdf' })
					var fileName = 'orders_report.pdf'
					downloadPDFFile(file, fileName)
				} else {
					// setOrder('')
				}
				return res.data
			})
			.catch((err) => console.log(err))

	}

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


	function colorSwitch(status) {
		switch (status) {
			case 'pending':
				return 'yellow'

			case 'accepted':
				return 'green'

			case 'pickedup':
				return 'blue'

			case 'in_warehouse':
				return 'orange'

			case 'shipped':
				return 'purple'

			case 'delivered':
				return 'green'

			case 'hold':
				return 'red'

			case 'returned':
				return 'orange'

			case 'cancelled':
				return 'red'

			case 'completed':
				return 'green'

			case 'returned to warehouse':
				return 'orange'

			default:
				console.log('This is something else.')
		}
	}



	function updateFilterQUery(term, value) {
		let filters = { ...filterQuery }
		if (term != 'page') {
			filters['page'] = 1
		}

		if (value) {
			filters[term] = value
		} else {
			filters.hasOwnProperty(term) && delete filters[term]
		}
		setFilterQuery(filters)
	}

	useEffect(() => {
		handleSearchQuery(qs.stringify(filterQuery))
	}, [filterQuery])

	const paginationUpdate = (page) => {
		updateFilterQUery("page", page)
	}

	const propsData = {
		handleSearchQuery: handleSearchQuery,
		handlePDFQuery: handlePDFQuery,

		updateFilterQUery: updateFilterQUery,
		filterQuery: filterQuery,
		statusOptions: statusOptions,
		defaultFetchOrderData: defaultFetchOrderData,

		selectOptionKey: "status",
		reportTitle: 'Orders Report'
	}

	const fruit = 'apple'






	const columns = [
		{
			title: 'Date',
			dataIndex: 'created_at',

			sorter: {
				compare: (a, b) => a.created_at - b.created_at,
				multiple: 2,
			},
		},
		{
			title: 'Order ID',
			dataIndex: 'parcel_id',

		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (text, record) => (
				<Tag color={colorSwitch(record.status)}>{text}</Tag>
				// <span style={{ color: colorSwitch(record.status) }}>
				// <Card>

				// </Card>
				// </span>

			),
		},
		{
			title: 'Delivery Charge',
			dataIndex: 'delivary_charge',
		},
		{
			title: 'COD Charge',
			dataIndex: 'cash_on_delivery_charge',
		},
		{
			title: 'COD Amount',
			dataIndex: 'amount_to_be_collected',
		},
		{
			title: 'Accumutated Amount',
			dataIndex: 'accumulated',
		},
		{
			title: 'Total Amount',
			dataIndex: 'total_amount',
		},
	]

	const data = order
	// const data = [
	// 	{
	// 		key: '1',
	// 		name: 'John Brown',
	// 		chinese: 98,
	// 		math: 60,
	// 		english: 70,
	// 	},
	// 	{
	// 		key: '2',
	// 		name: 'Jim Green',
	// 		chinese: 98,
	// 		math: 66,
	// 		english: 89,
	// 	},
	// 	{
	// 		key: '3',
	// 		name: 'Joe Black',
	// 		chinese: 98,
	// 		math: 90,
	// 		english: 70,
	// 	},
	// 	{
	// 		key: '4',
	// 		name: 'Jim Red',
	// 		chinese: 88,
	// 		math: 99,
	// 		english: 89,
	// 	},
	// ]

	const onChangeSorter = (pagination, filters, sorter, extra) => {
		// console.log('params', pagination, filters, sorter, extra)
		if (sorter.order === 'ascend') {
			setFilterQuery({})
			updateFilterQUery("ordering", sorter.field)
		} else if (sorter.order === 'descend') {
			setFilterQuery({})
			updateFilterQUery("ordering", '-' + sorter.field)
		}
		else {
			setFilterQuery({})
		}
	}

	return (
		<>

			<ReportHead propsData={propsData} />
			<Table scroll={{ x: true }} columns={columns} dataSource={data} onChange={onChangeSorter} pagination={{ defaultPageSize: 5 }} />
			{/* <div id="my-table" class="table-responsive">
				<Table bordered>
					<thead>
						<tr>
							<th>Date</th>
							<th>Order ID</th>
							<th>Status</th>
							<th>Delivery Charge</th>
							<th>COD Charge</th>
							<th>COD Amount</th>
							<th>Accumutated Amount</th>
							<th>Total Amount</th>
						</tr>
					</thead>
					<tbody>
						{order &&
							order.map((info) => (
								<tr key={info.id}>
									<td>
										<span className="align-middle fw-bold">{info.created_at}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.parcel_id}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.status}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.delivary_charge}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.cash_on_delivery_charge}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.amount_to_be_collected}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.accumulated}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.total_amount}</span>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
				<Pagination onChange={paginationUpdate} total={orderCount} defaultPageSize={50} />
			</div> */}

		</>
	)
}

export default OrderReport

