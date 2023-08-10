

import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, MARCHANT_GET_WITHDRAW_REQUEST_REPORT, MARCHANT_GET_WITHDRAW_REQUEST_REPORT_PDF } from "../../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import { Pagination } from "antd"
import * as qs from 'qs'

const WithdrawBalanceReport = () => {
	const [withdrawRequest, setWithdrawRequestBalance] = useState([])
	const [filterQuery, setFilterQuery] = useState({})
	const [orderCount, setOrderCount] = useState(0)

	const defaultFetchOrderData = () => {
		return useJwt.axiosGet(getApi(MARCHANT_GET_WITHDRAW_REQUEST_REPORT))
		.then((res) => {
			setWithdrawRequestBalance(res?.data?.results)
			setOrderCount(res?.data?.count)
			setFilterQuery({})
		}).catch((err) => {
			setWithdrawRequestBalance([])
			setOrderCount(0)
			setFilterQuery({})
		})
	}

	useEffect(() => {
		defaultFetchOrderData()
	}, [])


	const handleSearchQuery = searchTerm => {
		return useJwt
			.axiosGet(getApi(MARCHANT_GET_WITHDRAW_REQUEST_REPORT) + '?' + searchTerm)
			.then((res) => {
				if (res.data?.results?.length > 0) {
					setWithdrawRequestBalance(res?.data?.results)
					setOrderCount(res?.data?.count)
				} else {
					setWithdrawRequestBalance([])
					setOrderCount(0)
				}
			})
			.catch((err) => {
				setWithdrawRequestBalance([])
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

		selectOptionKey: "withdraw_status",
		reportTitle: 'Withdraw Request Report'
	}

	return (
		<>
			<ReportHead propsData={propsData} />
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
			<Pagination onChange={paginationUpdate} total={orderCount} defaultPageSize={50} />
		</>
		
	)
}

export default WithdrawBalanceReport

