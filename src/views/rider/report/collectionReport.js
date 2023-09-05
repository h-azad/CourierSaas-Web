

// import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, RIDER_GET_DELIVERY_COLLECTION_REPORT, RIDER_GET_DELIVERY_COLLECTION_REPORT_PDF } from "../../../constants/apiUrls"
import ReportHead from "./RiderReportHead"
import React from 'react'
import * as qs from 'qs'
import { Table, Tag } from "antd"

import { colorSwitch, OrderStatusOptions } from "../../../components/orderRelatedData"
import { handlePDFQuery, handleSearchQuery } from "../../../components/reportRelatedData"


const MarchantCollectionReport = () => {
	const [order, setOrder] = useState([])
	const [filterQuery, setFilterQuery] = useState({})
	const [orderCount, setOrderCount] = useState(0)


	const fetchDefalutData = () => {
		return useJwt.axiosGet(getApi(RIDER_GET_DELIVERY_COLLECTION_REPORT))
			.then((res) => {
				setOrder(res?.data?.results)
				setFilterQuery({})
			}).catch((err) => {
				setOrder([])
				setFilterQuery({})
			})
	}



	const statusOptions = [
		{ value: 'pre-paid', label: "Pre-Paid" },
		{ value: 'COD', label: "COD" },
	]


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
		handleSearchQuery(RIDER_GET_DELIVERY_COLLECTION_REPORT, qs.stringify(filterQuery))
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

	const propsData = {
		handleSearchQuery: handleSearchQuery,
		handlePDFQuery: handlePDFQuery,

		reportApi: RIDER_GET_DELIVERY_COLLECTION_REPORT_PDF,
		getDataApiUrl: RIDER_GET_DELIVERY_COLLECTION_REPORT,

		updateFilterQUery: updateFilterQUery,
		filterQuery: filterQuery,
		statusOptions: statusOptions,
		fetchDefalutData: fetchDefalutData,

		selectOptionKey: "order_type",
		reportTitle: 'Delivery Collection Report',
		reportFileName: 'Delivery Collection Report',
	}

	const columns = [
		{
			title: 'Date',
			dataIndex: 'date',

			sorter: {
				compare: (a, b) => a.created_at - b.created_at,
				multiple: 2,
			},
		},
		{
			title: 'Total Delivery',
			dataIndex: 'total_delivery',

		},

		// {
		// 	title: 'Status',
		// 	dataIndex: 'status',
		// 	render: (text, record) => (
		// 		<Tag color={colorSwitch(record.status)}>{text.toUpperCase()}</Tag>
		// 	),
		// },
		// {
		// 	title: 'Delivery Status',
		// 	dataIndex: 'delivery_status',
		// 	render: (text, record) => (
		// 		<Tag color={statusOptionsColorSwitch(record.delivery_status)}>{text.toUpperCase()}</Tag>
		// 	),
			
		// },
		{
			title: 'Total COD',
			dataIndex: 'total_cod',
		},
		{
			title: 'Total Pre-Paid',
			dataIndex: 'total_pre_paid',
		},
		{
			title: 'Total Delivery Charge',
			dataIndex: 'total_delivery_charge',
		},
		{
			title: 'Total Collected Amount',
			dataIndex: 'total_collect_amount',
		},
		{
			title: 'Total Amount',
			dataIndex: 'total',
		},
	]


	return (
		<>
			<ReportHead propsData={propsData} />
			<Table scroll={{ x: true }} columns={columns} dataSource={order} onChange={onChangeSorter} pagination={{ defaultPageSize: 50 }} />
			

			{/* <div id="my-table" class="table-responsive">
				<Table bordered>
					<thead>
						<tr>
							<th>Date</th>
							<th>Total Delivery</th>
							<th>Total COD</th>
							<th>Total Pre-Paid</th>
							<th>Total Delivery Charge</th>
							<th>Total Collected Amount</th>
							<th>Total Amount</th>
						</tr>
					</thead>
					<tbody>
						{order &&
							order.map((info) => (
								<tr key={info.id}>
									<td>
										<span className="align-middle fw-bold">{info.date}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.total_delivery}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.total_cod}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.total_pre_paid}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.total_delivery_charge}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.total_collect_amount}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.total}</span>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
				<Pagination onChange={paginationUpdate} defaultCurrent={1} total={orderCount} defaultPageSize={50} />
			</div> */}
		</>
	)
}

export default MarchantCollectionReport

