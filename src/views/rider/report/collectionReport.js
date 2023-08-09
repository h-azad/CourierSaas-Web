

import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, RIDER_GET_DELIVERY_COLLECTION_REPORT, RIDER_GET_DELIVERY_COLLECTION_REPORT_PDF } from "../../../constants/apiUrls"
import ReportHead from "./RiderReportHead"
import React from 'react'
import * as qs from 'qs'
import { Pagination } from "antd"


const MarchantCollectionReport = () => {
	const [order, setOrder] = useState([])
	const [filterQuery, setFilterQuery] = useState({})
	const [orderCount, setOrderCount] = useState(0)

	const defaultFetchOrderData = () => {
		return useJwt.axiosGet(getApi(RIDER_GET_DELIVERY_COLLECTION_REPORT))
			.then((res) => {
				setOrder(res?.data?.results)
				setOrderCount(res?.data?.count)
			}).catch((err) => {
				setOrder([])
				setOrderCount(1)
			})
	}

	useEffect(() => {
		defaultFetchOrderData()
	}, [])


	const handleSearchQuery = searchTerm => {
		return useJwt
			.axiosGet(getApi(RIDER_GET_DELIVERY_COLLECTION_REPORT) + '?' + searchTerm)
			.then((res) => {
				if (res.data?.results?.length > 0) {
					setOrder(res?.data?.results)
					setOrderCount(res?.data?.count)
				} else {
					setOrder([])
					setOrderCount(1)
				}
			})
			.catch((err) => {
				setOrder([])
				setOrderCount(1)
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
			.axiosGet(getApi((RIDER_GET_DELIVERY_COLLECTION_REPORT_PDF) + '?' + searchTerm))
			.then((res) => {
				if (res.data?.length > 0) {
					console.log('response file', res.data)
					var file = new Blob([res.data], { type: 'application/pdf' })
					var fileName = 'collection_report.pdf'
					downloadPDFFile(file, fileName)
				} else {
					setOrder([])
					setOrderCount(1)
				}
			})
			.catch((err) => {
				setOrder([])
				setOrderCount(1)
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

		selectOptionKey: "order_type",
		reportTitle: 'Delivery Collection Report'
	}


	return (
		<>
			<ReportHead propsData={propsData} />

			<div id="my-table" class="table-responsive">
				<Table bordered>
					<thead>
						<tr>
							<th>Date</th>
							<th>Total Delivery</th>
							<th>Total COD</th>
							<th>Total Pre-Paid</th>
							<th>Total Delivery Charge</th>
							{/* <th>Total COD Charge</th> */}
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
									{/* <td>
										<span className="align-middle fw-bold">{info.total_cash_on_delivery_charge}</span>
									</td> */}
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
			</div>
		</>
	)
}

export default MarchantCollectionReport

