

import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, RIDER_GET_DELIVERY_REPORT, RIDER_GET_DELIVERY_REPORT_PDF } from "../../../constants/apiUrls"
import ReportHead from "./RiderReportHead"
import React from 'react'



const DeliveryReport = () => {
	const [order, setOrder] = useState([])

	const defaultFetchOrderData = () => {
		return useJwt.axiosGet(getApi(RIDER_GET_DELIVERY_REPORT))
			.then((res) => {
				console.log('response data', res.data)
				setOrder(res.data)
			}).catch((err) => {
				console.log(err)
			})
	}

	useEffect(() => {
		defaultFetchOrderData()
	}, [])


	const handleSearchQuery = searchTerm => {
		return useJwt
			.axiosGet(getApi(RIDER_GET_DELIVERY_REPORT) + '?' + searchTerm)
			.then((res) => {
				if (res.data?.length > 0) {
					setOrder(res.data)
				} else {
					setOrder('')
				}
				return res.data
			})
			.catch((err) => console.log(err))
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
			.axiosGet(getApi((RIDER_GET_DELIVERY_REPORT_PDF) + '?' + searchTerm))
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
		{ value: true, label: "Delivered" },
		{ value: 'false', label: "UnDelivered" },
	]


	return (
		<>

			<ReportHead
				handleSearchQuery={handleSearchQuery} handlePDFQuery={handlePDFQuery} defaultFetchOrderData={defaultFetchOrderData} statusOptions={statusOptions} selectOptionKey="delivery_status" reportTitle='Delivery Report'
			/>

			<div id="my-table" class="table-responsive">
				<Table bordered>
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Status</th>
							<th>Delivery Status</th>
							<th>Phone</th>
							<th>Address</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{order &&
							order.map((info) => (
								<tr key={info.id}>
									<td>
										<span className="align-middle fw-bold">{info.parcel_id}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.status}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.delivery_status}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.phone_number}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.delivary_address}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.created_at}</span>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			</div>
		</>
	)
}

export default DeliveryReport

