// import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, ADMIN_GET_ORDER_REPORT_APIVIEW, MARCHANT_LIST, RIDER_LIST, ADMIN_GET_ORDER_REPORT_GENERATE_PDF_APIVIEW } from "../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import { Table, Tag } from "antd"
import * as qs from 'qs'

import { colorSwitch, OrderStatusOptions } from "../../components/orderRelatedData"
import { handlePDFQuery, handleSearchQuery } from "../../components/reportRelatedData"


const AdminOrderReport = () => {
	const [order, setOrder] = useState([])
	const [selectboxMarchant, setSelectboxMarchant] = useState([])
	const [selectboxRider, setSelectboxRider] = useState([])
	const [orderCount, setOrderCount] = useState(0)
	const [filterQuery, setFilterQuery] = useState({})
	const [defaultPage, setDefalutPage] = useState(1)


	const fetchDefalutData = () => {
		return useJwt.axiosGet(getApi(ADMIN_GET_ORDER_REPORT_APIVIEW))
			.then((res) => {
				setOrder(res?.data?.results)
				setFilterQuery({})
			}).catch((err) => {
				setOrder([])
				setFilterQuery({})
			})
	}

	const fetchMarchantData = () => {
		return useJwt
			.axiosGet(getApi(MARCHANT_LIST))
			.then((res) => {
				let marchantData = []

				res.data.data.map((data) => {
					marchantData.push({ value: data.id, label: data.full_name })
				})

				setSelectboxMarchant(marchantData)
				return res.data.data
			})
			.catch((err) => console.log(err))
	}

	const fetchRiderData = () => {
		return useJwt
			.axiosGet(getApi(RIDER_LIST))
			.then((res) => {
				let riderData = []

				res.data.data.map((data) => {
					riderData.push({ value: data.id, label: data.full_name })
				})

				setSelectboxRider(riderData)
				return res.data
			})
			.catch((err) => console.log(err))
	}

	useEffect(() => {
		fetchMarchantData()
		fetchRiderData()
	}, [])


	// const handleSearchQuery = searchTerm => {
	// 	return useJwt
	// 		.axiosGet(getApi(ADMIN_GET_ORDER_REPORT_APIVIEW) + '?' + searchTerm)
	// 		.then((res) => {
	// 			if (res.data?.results?.length > 0) {
	// 				setOrder(res?.data?.results)
	// 				setOrderCount(res.data?.count)
	// 			} else {
	// 				setOrder('')
	// 			}
	// 			return res.data
	// 		})
	// 		.catch((err) => console.log(err))
	// }


	// function downloadPDFFile(file, fileName) {
	// 	var blob = new Blob([file], { type: 'application/pdf' })
	// 	var url = URL.createObjectURL(blob)
	// 	var link = document.createElement('a')
	// 	link.href = url
	// 	link.download = fileName
	// 	document.body.appendChild(link)
	// 	link.click()
	// 	document.body.removeChild(link)
	// 	URL.revokeObjectURL(url)
	// }

	// const handlePDFQuery = (searchTerm) => {
  //       const regex = /&([^&]+)/g 
  //       const pageRemoveToQuery = searchTerm.match(regex)
  //       const filterPerameter = pageRemoveToQuery ? pageRemoveToQuery.join('') : ''
	// 	searchTerm = filterPerameter.startsWith("&") ? filterPerameter: filterPerameter.replace('$', '')

	// 	return useJwt
	// 		.axiosGet(getApi((ADMIN_GET_ORDER_REPORT_GENERATE_PDF_APIVIEW) + '?' + searchTerm))
	// 		.then((res) => {
	// 			if (res.data?.length > 0) {
	// 				var file = new Blob([res.data], { type: 'application/pdf' })
	// 				var fileName = 'orders_report.pdf'
	// 				downloadPDFFile(file, fileName)
	// 			} else {
	// 				// setOrder('')
	// 			}
	// 			return res.data
	// 		})
	// 		.catch((err) => console.log(err))
	// }

	// const statusOptions = [
	// 	{ value: "pending", label: "Pending" },
	// 	{ value: "accepted", label: "Accepted" },
	// 	{ value: "pickedup", label: "Picked Up" },
	// 	{ value: "in_warehouse", label: "In Warehouse" },
	// 	{ value: "shipped", label: "Shipped" },
	// 	{ value: "delivered", label: "Delivered" },
	// 	{ value: "hold", label: "Hold" },
	// 	{ value: "returned", label: "Returned" },
	// 	{ value: "cancelled", label: "Cancelled" },
	// 	{ value: "completed", label: "Completed" },
	// ]

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

	const propsData = {
		handleSearchQuery: handleSearchQuery,
		handlePDFQuery: handlePDFQuery,
		fetchDefalutData: fetchDefalutData,

		updateFilterQUery: updateFilterQUery,
		filterQuery: filterQuery,

		getDataApiUrl: ADMIN_GET_ORDER_REPORT_APIVIEW,
		fetchReportPDF: ADMIN_GET_ORDER_REPORT_GENERATE_PDF_APIVIEW,
		
		statusOptions: OrderStatusOptions,
		selectboxData: selectboxMarchant,
		selectboxRider: selectboxRider,

		statusOptionPlaceholder: "Order Status",
		selectOptionKey: "status",
		reportTitle: 'Orders Report',
		reportFileName: 'Order Report',
		selectboxDataPlaceholder: 'Select Marchant',
		filterTable: 'marchant',
		isOrderPageIsRider: true

	}

	useEffect(() => {
		handleSearchQuery(ADMIN_GET_ORDER_REPORT_APIVIEW, qs.stringify(filterQuery))
			.then(res => {
				if (res?.results?.length > 0) {
					setOrder(res?.results)
				} else {
					setOrder([])
				}
			})
	}, [filterQuery])

	const paginationUpdate = (page) => {
		updateFilterQUery("page", page)
	}

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
			title: 'Marchant',
			dataIndex: ['marchant', 'full_name'],
		},
		{
			title: 'Delivery Rider',
			dataIndex: ['delivary_rider', 'full_name'],
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (text, record) => (
				<Tag color={colorSwitch(record.status)}>{text.toUpperCase()}</Tag>
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
			title: 'Deducted Amount',
			dataIndex: 'deducted_amount',
		},
	]

	const onChangeSorter = (pagination, filters, sorter, extra) => {
		if (sorter.order === 'ascend') {
			updateFilterQUery("ordering", sorter.field)
		} else if (sorter.order === 'descend') {
			updateFilterQUery("ordering", '-' + sorter.field)
		}
		else {
			setFilterQuery({})
		}
	}


	return (
		<>

			<ReportHead propsData={propsData} />
			<Table scroll={{ x: true }} columns={columns} dataSource={order} onChange={onChangeSorter} pagination={{ defaultPageSize: 50 }} />
			{/* <div id="my-table" class="table-responsive">
				<Table bordered>
					<thead>
						<tr>
							<th>Date</th>
							<th>Order ID</th>
							<th>Marchant</th>
							<th>Delivery Rider</th>
							<th>Status</th>
							<th>Delivery Charge</th>
							<th>COD Charge</th>
							<th>COD Amount</th>
							<th>Accumutated Amount</th>
							<th>Deducted Amount</th>
						</tr>
					</thead>
					<tbody>
						{order &&
							order.map((info) => (
								<tr key={info.id}>
									<td>
										<span className="align-middle fw-bold">{info?.created_at}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info?.parcel_id}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info?.marchant?.full_name}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info?.delivary_rider?.full_name}</span>
									</td>

									<td>
										<span className="align-middle fw-bold">{info?.status}</span>
									</td>

									<td>
										<span className="align-middle fw-bold">{info?.delivary_charge}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info?.cash_on_delivery_charge}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info?.amount_to_be_collected}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info?.accumulated}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info?.deducted_amount}</span>
									</td>
								</tr>
							))}
					</tbody>

				</Table>
				<Pagination onChange={paginationUpdate} defaultCurrent={defaultPage} total={orderCount} defaultPageSize={50} />
			</div> */}
		</>
	)
}

export default AdminOrderReport



