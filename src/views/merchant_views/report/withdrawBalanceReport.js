

import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, MARCHANT_GET_WITHDRAW_REQUEST_REPORT, MARCHANT_GET_WITHDRAW_REQUEST_REPORT_PDF } from "../../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'



const WithdrawBalanceReport = () => {
	const [withdrawRequest, setWithdrawRequestBalance] = useState([])

	const defaultFetchOrderData = () => {
		return useJwt.axiosGet(getApi(MARCHANT_GET_WITHDRAW_REQUEST_REPORT))
			.then((res) => {
				console.log('response data', res.data)
				setWithdrawRequestBalance(res.data)
			}).catch((err) => {
				console.log(err)
			})
	}

	useEffect(() => {
		defaultFetchOrderData()
	}, [])


	const handleSearchQuery = searchTerm => {
		return useJwt
			.axiosGet(getApi(MARCHANT_GET_WITHDRAW_REQUEST_REPORT) + '?' + searchTerm)
			.then((res) => {
				if (res.data?.length > 0) {
					setWithdrawRequestBalance(res.data)
				} else {
					setWithdrawRequestBalance('')
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
			.axiosGet(getApi((MARCHANT_GET_WITHDRAW_REQUEST_REPORT_PDF) + '?' + searchTerm))
			.then((res) => {
				if (res.data?.length > 0) {
					var file = new Blob([res.data], { type: 'application/pdf' })
					var fileName = 'Withdraw_Balance_report.pdf'
					downloadPDFFile(file, fileName)
				} else {
					// setWithdrawRequestBalance('')
				}
				return res.data
			})
			.catch((err) => console.log(err))

	}

	const statusOptions = [
		{ value: "Pending", label: "Pending" },
		{ value: "Accept", label: "Accept" },
		{ value: "Complete", label: "Complete" },
		{ value: "Cancel", label: "Cancel" },
	]


	return (
		<>

			<ReportHead
				handleSearchQuery={handleSearchQuery} handlePDFQuery={handlePDFQuery} defaultFetchOrderData={defaultFetchOrderData} statusOptions={statusOptions} selectOptionKey="withdraw_status" reportTitle = 'Withdraw Request Report'
			/>

			<div class="table-responsive">
				<Table bordered>
					<thead>
						<tr>
							<th style={{ textAlign: "center" }}>PREVIOUS BALANCE</th>
							<th style={{ textAlign: "center" }}>WITHDRAW BALANCE</th>
							<th style={{ textAlign: "center" }}>CURRENT BALANCE</th>
							<th style={{ textAlign: "center" }}>STATUS</th>
							<th style={{ textAlign: "center" }}>Date</th>
						</tr>
					</thead>
					<tbody>
						{withdrawRequest &&
							withdrawRequest.map((info) => (
								<tr key={info.id}>
									<td style={{textAlign: "center"}}>{info.balance}</td>
									<td style={{ textAlign: "center" }}>{info.withdraw_balance}</td>
									<td style={{ textAlign: "center" }}>{info.current_balance}</td>
									<td style={{ textAlign: "center" }}>{info.withdraw_status}</td>
									<td style={{ textAlign: "center" }}>{info.created_at}</td>
								</tr>
							))}
					</tbody>
				</Table>
			</div>
		</>
	)
}

export default WithdrawBalanceReport

