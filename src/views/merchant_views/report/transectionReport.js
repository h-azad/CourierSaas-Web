

import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, MARCHANT_GET_TRANSICTION_REPORT, MARCHANT_GET_TRANSICTION_REPORT_PDF } from "../../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import { Pagination } from "antd"
import * as qs from 'qs'

const OrderReport = () => {
	const [transections, setTransections] = useState([])
	const [filterQuery, setFilterQuery] = useState({})
	const [orderCount, setOrderCount] = useState(0)

	const defaultFetchOrderData = () => {
		return useJwt.axiosGet(getApi(MARCHANT_GET_TRANSICTION_REPORT))
			.then((res) => {
				setTransections(res?.data?.results)
				setOrderCount(res?.data?.count)
				setFilterQuery({})
			}).catch((err) => {
				setTransections([])
				setOrderCount(0)
				setFilterQuery({})
			})
	}

	useEffect(() => {
		defaultFetchOrderData()
	}, [])


	const handleSearchQuery = searchTerm => {
		return useJwt
			.axiosGet(getApi(MARCHANT_GET_TRANSICTION_REPORT) + '?' + searchTerm)
			.then((res) => {
				if (res.data?.results?.length > 0) {
					setTransections(res?.data?.results)
					setOrderCount(res?.data?.count)
				} else {
					setTransections([])
					setOrderCount(0)
				}
			})
			.catch((err) => {
				setTransections([])
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
			.axiosGet(getApi((MARCHANT_GET_TRANSICTION_REPORT_PDF) + '?' + searchTerm))
			.then((res) => {
				if (res.data?.length > 0) {
					// setTransections(res.data)
					console.log('response file', res.data)
					var file = new Blob([res.data], { type: 'application/pdf' })
					var fileName = 'transection_report.pdf'
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

		selectOptionKey: "type",
		reportTitle: 'Transections Report'
	}

	return (
		<>

			<ReportHead propsData={propsData} />

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
			<Pagination onChange={paginationUpdate} total={orderCount} defaultPageSize={50} />
		</>
	)
}

export default OrderReport

