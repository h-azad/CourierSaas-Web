

import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, MARCHANT_GET_TRANSICTION_REPORT, MARCHANT_GET_ORDER_REPORT_PDF } from "../../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'



const OrderReport = () => {
	const [transections, setTransections] = useState([])

	const defaultFetchOrderData = () => {
		return useJwt.axiosGet(getApi(MARCHANT_GET_TRANSICTION_REPORT))
			.then((res) => {
				console.log('response data', res.data)
				setTransections(res.data)
			}).catch((err) => {
				console.log(err)
			})
	}

	useEffect(() => {
		defaultFetchOrderData()
	}, [])


	const handleSearchQuery = searchTerm => {
		return useJwt
			.axiosGet(getApi(MARCHANT_GET_TRANSICTION_REPORT) + '?' + searchTerm)
			.then((res) => {
				if (res.data?.length > 0) {
					setTransections(res.data)
				} else {
					setTransections('')
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
			.axiosGet(getApi((MARCHANT_GET_ORDER_REPORT_PDF) + '?' + searchTerm))
			.then((res) => {
				if (res.data?.length > 0) {
					// setTransections(res.data)
					console.log('response file', res.data)
					var file = new Blob([res.data], { type: 'application/pdf' })
					var fileName = 'orders_report.pdf'
					downloadPDFFile(file, fileName)
				} else {
					// setTransections('')
				}
				return res.data
			})
			.catch((err) => console.log(err))

	}

	const statusOptions = [
		{ value: "Cash-Out", label: "Cash-Out" },
		{ value: "Cash-In", label: "Cash-In" },
	]


	return (
		<>

			<ReportHead
				handleSearchQuery={handleSearchQuery} handlePDFQuery={handlePDFQuery} defaultFetchOrderData={defaultFetchOrderData} statusOptions={statusOptions} selectOptionKey="type"
			/>

			<div class="table-responsive">
				<Table bordered>
					<thead>
						<tr>
							<th>Amount</th>
							<th>Transections ID</th>
							<th>Remark</th>
							<th>Type</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{transections &&
							transections.map((info) => (
								<tr key={info.id}>
									<td>{info.amount}</td>
									<td>{info.transection_id}</td>
									<td>{info.remark}</td>
									<td>{info.type}</td>
									<td>{info.created_at}</td>
								</tr>
							))}
					</tbody>
				</Table>
			</div>
		</>
	)
}

export default OrderReport

