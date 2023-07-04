

import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, ADMIN_GET_ORDER_REPORT_APIVIEW, MARCHANT_LIST, RIDER_LIST, ADMIN_GET_ORDER_REPORT_GENERATE_PDF_APIVIEW } from "../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'




const AdminOrderReport = () => {
	const [order, setOrder] = useState([])
	const [selectboxMarchant, setSelectboxMarchant] = useState([])
	const [selectboxRider, setSelectboxRider] = useState([])

	const defaultFetchData = () => {
		return useJwt.axiosGet(getApi(ADMIN_GET_ORDER_REPORT_APIVIEW))
			.then((res) => {
				console.log('response data',res.data)
				setOrder(res.data)
			}).catch((err) => {
				console.log(err)
			})
	}

	const fetchMarchantData = () => {
		return useJwt
		  .axiosGet(getApi(MARCHANT_LIST))
		  .then((res) => {
			console.log(res)
			let marchantData = []
	
			res.data.data.map((data) => {
			  marchantData.push({ value: data.id, label: data.full_name })
			})
	
			setSelectboxMarchant(marchantData)
			return res.data.data
		  })
		  .catch((err) => console.log(err))
	  }

	  const fetchRiderData = () => {
		return useJwt
		  .axiosGet(getApi(RIDER_LIST))
		  .then((res) => {
			console.log('RIDER_LIST', res.data.data)
			let riderData = []
	
			res.data.data.map((data) => {
			  riderData.push({ value: data.id, label: data.full_name })
			})
	
			setSelectboxRider(riderData)
			return res.data
		  })
		  .catch((err) => console.log(err))
	  }

	useEffect(() => {
		defaultFetchData()
		fetchMarchantData()
		fetchRiderData()
	}, [])


	const handleSearchQuery = searchTerm => {
		console.log('yes i am workgin searchTerm', searchTerm)
		return useJwt
			.axiosGet(getApi(ADMIN_GET_ORDER_REPORT_APIVIEW) + '?' + searchTerm)
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
			.axiosGet(getApi((ADMIN_GET_ORDER_REPORT_GENERATE_PDF_APIVIEW) + '?' + searchTerm))
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
		{ value: "pending", label: "Pending" },
		{ value: "accepted", label: "Accepted" },
		{ value: "pickedup", label: "Picked Up" },
		{ value: "in_warehouse", label: "In Warehouse" },
		{ value: "shipped", label: "Shipped" },
		{ value: "delivered", label: "Delivered" },
		{ value: "hold", label: "Hold" },
		{ value: "returned", label: "Returned" },
		{ value: "cancelled", label: "Cancelled" },
		{ value: "completed", label: "Completed" },
	]

	const propsData = {
        handleSearchQuery: handleSearchQuery,
        handlePDFQuery: handlePDFQuery,
        defaultFetchData: defaultFetchData,

        statusOptions: statusOptions,
        selectboxData: selectboxMarchant,
        selectboxRider: selectboxRider,

        statusOptionPlaceholder: "Order Status",
        selectOptionKey:"status",
        reportTitle: 'Orders Report',
        selectboxDataPlaceholder: 'Select Marchant',
        filterTable: 'marchant',
		isOrderPageIsRider: true
        
    }

	return (
		<>

			<ReportHead propsData={propsData} />

			<div id="my-table" class="table-responsive">
				<Table bordered>
					<thead>
						<tr>
							<th>Marchant</th>
							<th>Delivery Rider</th>
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
										<span className="align-middle fw-bold">{info.marchant.full_name}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info?.delivary_rider?.full_name}</span>
									</td>
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

export default AdminOrderReport



