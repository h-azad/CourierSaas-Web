

import {Search} from "react-feather"
import { Table, Button, CardText } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, MARCHANT_ORDER_REPORT, MARCHANT_ORDER_FILTER_BY_DATE_RANGE_REPORT, MARCHANT_ORDER_FILTER_PDF } from "../../../constants/apiUrls"
import ReportHead from "./ReportHead"
import { number } from "prop-types"
import React from 'react'
// import { renderToString } from 'react-dom/server'
// import html2pdf from "html2pdf.js"


const OrderReport = () => {
	const [order, setOrder] = useState([])
	const [dates, setDates] = useState(null)
	const [datesNumber, setDatesNumber] = useState(null)
	console.log('datesNumber', datesNumber)
	console.log('date is ', dates)

	// const generatePDF = () => {
	// 	const table = document.getElementById('my-table') // Replace 'my-table' with the ID of your table element
	// 	const tableHTML = table.outerHTML

	// 	html2pdf()
	// 		.set({
	// 			filename: 'table_data.pdf',
	// 			// margin: [15, 15, 15, 15], // Optional: Set the PDF margins
	// 			image: { type: 'jpeg', quality: 0.98 }, // Optional: Set the image quality
	// 			html2canvas: { dpi: 192, letterRendering: true },
	// 			jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
	// 		})
	// 		.from(tableHTML)
	// 		.save()
	// }


	const defaultFetchOrderData = () => {
		return useJwt.axiosGet(getApi(MARCHANT_ORDER_FILTER_BY_DATE_RANGE_REPORT))
			.then((res) => {
				console.log('response data',res.data)
				setOrder(res.data)
			}).catch((err) => {
				console.log(err)
			})
	}

	useEffect(() => {
		defaultFetchOrderData()
	}, [])




	const fetchSearchOrdersDataByDateRange = searchTerm => {
		console.log('click')
		return useJwt
			// .axiosGet(getApi(RIDER_SEARCH)+'?search='+ searchTerm) //after line
			.axiosGet(getApi(MARCHANT_ORDER_FILTER_BY_DATE_RANGE_REPORT) + '?search=' + searchTerm)
			.then((res) => {
				return res.data
			})
			.catch((err) => console.log(err))
	}

	const handleSearch = debounce(e => {
	
		console.log('change value', datesNumber)
		let searchTerm
		if(dates !== null){
		 searchTerm = [dates[0], dates[1]]
		}else{
		 searchTerm = datesNumber
		}
		console.log('searchTerm', searchTerm)
		if (searchTerm?.length > 0) {
			fetchSearchOrdersDataByDateRange(searchTerm)
				.then(data => {
					if (data?.length > 0) {
						console.log('res', data)
						setOrder(data)
					} else {
						console.log("No data")
					}
				})
		} else {
			defaultFetchOrderData()
		}

	}, 300)



	const fetchSearchOrdersDataPDFGenerate = searchTerm => {
		console.log('click pdf')
		return useJwt
			// .axiosGet(getApi(RIDER_SEARCH)+'?search='+ searchTerm) //after line
			.axiosGet(getApi(MARCHANT_ORDER_FILTER_PDF) + '?search=' + searchTerm)
			.then((res) => {
				// console.log('respose pdf file ', res)
				return res
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
	
	const handleSearchReportGeneratePDF = debounce(e => {

		console.log('change value', datesNumber)
		let searchTerm
		if (dates !== null) {
			searchTerm = [dates[0], dates[1]]
		} else if (datesNumber !== null){
			searchTerm = datesNumber
		}else{
			searchTerm = ''
		}
		console.log('searchTerm', searchTerm)
		if (searchTerm?.length > 0) {
			fetchSearchOrdersDataPDFGenerate(searchTerm)
			.then(data =>{
				console.log('response file',data.data)
				var file = new Blob([data.data], { type: 'application/pdf' })
				var fileName = 'orders_report.pdf'
				downloadPDFFile(file, fileName)

			})
				// .then(data => {
				// 	if (data?.length > 0) {
				// 		console.log('res', data)
				// 		setOrder(data)
				// 	} else {
				// 		console.log("No data")
				// 	}
				// })
		} else {
			defaultFetchOrderData()
		}

	}, 300)



	function debounce(fn, time) {
		let timeoutId
		return wrapper
		function wrapper(...args) {
			if (timeoutId) {
				clearTimeout(timeoutId)
			}
			timeoutId = setTimeout(() => {
				timeoutId = null
				fn(...args)
			}, time)
		}
	}

	return (
		<>

			<ReportHead setDates={setDates} fetchSearchOrdersDataByDateRange={handleSearch} setDatesNumber={setDatesNumber} handleSearchReportGeneratePDF={handleSearchReportGeneratePDF} />

			<div id="my-table" class="table-responsive">
				<Table bordered>
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Status</th>
							<th>Date</th>
							<th>Delivery Charge</th>
							<th>COD Charge</th>
							<th>COD Amount</th>
							<th>Accumutated Amount</th>
							<th>Total Amount</th>
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
										<span className="align-middle fw-bold">{info.created_at}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.delivary_charge}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.cash_on_delivery_charge}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.amount_to_be_collected}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.accumulated}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.total_amount}</span>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			</div>
		</>
	)
}

export default OrderReport

