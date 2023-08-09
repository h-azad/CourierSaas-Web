

import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, RIDER_GET_PICKUP_REPORT, RIDER_GET_PICKUP_REPORT_PDF } from "../../../constants/apiUrls"
import ReportHead from "./RiderReportHead"
import React from 'react'
import * as qs from 'qs'
import { Pagination } from "antd"

const RiderPickupReport = () => {
	const [order, setOrder] = useState([])
	const [filterQuery, setFilterQuery] = useState({})
	const [orderCount, setOrderCount] = useState(0)


	const defaultFetchOrderData = () => {
		return useJwt.axiosGet(getApi(RIDER_GET_PICKUP_REPORT))
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
			.axiosGet(getApi(RIDER_GET_PICKUP_REPORT) + '?' + searchTerm)
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
			.axiosGet(getApi((RIDER_GET_PICKUP_REPORT_PDF) + '?' + searchTerm))
			.then((res) => {
				if (res.data) {
					var file = new Blob([res.data], { type: 'application/pdf' })
					var fileName = 'pickup_report.pdf'
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
		{ value: true, label: "Picked" },
		{ value: 'false', label: "Unpicked" },
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

		selectOptionKey: "pickup_status",
		reportTitle: 'Pickup Report'
	}


	return (
		<>

			<ReportHead propsData={propsData} />

			<div id="my-table" class="table-responsive">
				<Table bordered>
					<thead>
						<tr>
							<th>Pickup Date</th>
							<th>Order ID</th>
							<th>Status</th>
							<th>Pickup</th>
							<th>Phone</th>
							<th>Address</th>
						</tr>
					</thead>
					<tbody>
						{order &&
							order.map((info) => (
								<tr key={info.id}>
									<td>
										<span className="align-middle fw-bold">{info.pickup_date}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.parcel_id}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.status}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.pickup_status}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.phone}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.pickup_address}</span>
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

export default RiderPickupReport

