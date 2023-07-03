

import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, RIDER_GET_PICKUP_REPORT, RIDER_GET_PICKUP_REPORT_PDF } from "../../../constants/apiUrls"
import ReportHead from "./RiderReportHead"
import React from 'react'



const RiderPickupReport = () => {
	const [order, setOrder] = useState([])

	const defaultFetchOrderData = () => {
		return useJwt.axiosGet(getApi(RIDER_GET_PICKUP_REPORT))
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
			.axiosGet(getApi(RIDER_GET_PICKUP_REPORT) + '?' + searchTerm)
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
			.axiosGet(getApi((RIDER_GET_PICKUP_REPORT_PDF) + '?' + searchTerm))
			.then((res) => {
				if (res.data?.length > 0) {
					// setOrder(res.data)
					console.log('response file', res.data)
					var file = new Blob([res.data], { type: 'application/pdf' })
					var fileName = 'pickup_report.pdf'
					downloadPDFFile(file, fileName)
				} else {
					// setOrder('')
				}
				return res.data
			})
			.catch((err) => console.log(err))

	}

	const statusOptions = [
		{ value: true, label: "Picked" },
		{ value: 'false', label: "Unpicked" },
	]


	return (
		<>

			<ReportHead
				handleSearchQuery={handleSearchQuery} handlePDFQuery={handlePDFQuery} defaultFetchOrderData={defaultFetchOrderData} statusOptions={statusOptions} selectOptionKey="pickup_status" reportTitle='Pickup Report'
			/>

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
			</div>
		</>
	)
}

export default RiderPickupReport
