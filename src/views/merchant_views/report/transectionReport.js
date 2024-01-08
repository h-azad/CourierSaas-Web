

// import { useEffect, useState } from "react"
// import useJwt from "@src/auth/jwt/useJwt"
// import { getApi, MARCHANT_GET_TRANSICTION_REPORT, MARCHANT_GET_TRANSICTION_REPORT_PDF } from "../../../constants/apiUrls"
// import ReportHead from "./ReportHead"
// import React from 'react'
// import { Table, Tag } from "antd"
// import * as qs from 'qs'
// import { handlePDFQuery, handleSearchQuery } from "../../../components/reportRelatedData"

// import { GENERAL_ROW_SIZE } from '../../../constants/tableConfig'

// const OrderReport = () => {
// 	const [transections, setTransections] = useState([])
// 	// const [filterQuery, setFilterQuery] = useState({})

// 	const [tableParams, setTableParams] = useState({
//     pagination: {
//       current: GENERAL_ROW_SIZE	,
//       pageSize: 2,
//     },
//   })

//   const [filterQuery, setFilterQuery] = useState({
//     page: 1,
//     page_size: GENERAL_ROW_SIZE,
//     ordering: '-created_at'
//   })

// 	const fetchDefalutData = () => {
// 		return useJwt.axiosGet(getApi(MARCHANT_GET_TRANSICTION_REPORT))
// 			.then((res) => {
// 				setTransections(res?.data?.results)
// 				setFilterQuery({})
// 			}).catch((err) => {
// 				setTransections([])
// 				setFilterQuery({})
// 			})
// 	}


// 	const statusOptions = [
// 		{ value: "Cash-Out", label: "Cash-Out" },
// 		{ value: "Cash-In", label: "Cash-In" },
// 	]

// function colorSwitch(status) {
// 		switch (status) {
// 			case 'Cash-Out':
// 				return 'yellow'
	
// 			case 'Cash-In':
// 				return 'green'

// 			default:
// 				return 'orange'
// 		}
// 	}

// 	function updateFilterQUery(term, value) {
// 		let filters = { ...filterQuery }

// 		if (value) {
// 			filters[term] = value
// 		} else {
// 			filters.hasOwnProperty(term) && delete filters[term]
// 		}
// 		setFilterQuery(filters)
// 	}

	


// 	const onChangeSorter = (pagination, filters, sorter, extra) => {
// 		if (sorter.order === 'ascend') {
// 			updateFilterQUery("ordering", sorter.field)
// 		} else if (sorter.order === 'descend') {
// 			updateFilterQUery("ordering", '-' + sorter.field)
// 		}
// 		else {
// 			setFilterQuery({})
// 		}
// 	}

// 	const propsData = {
// 		handleSearchQuery: handleSearchQuery,
// 		handlePDFQuery: handlePDFQuery,

// 		reportApi: MARCHANT_GET_TRANSICTION_REPORT_PDF,
// 		getDataApiUrl: MARCHANT_GET_TRANSICTION_REPORT,

// 		updateFilterQUery: updateFilterQUery,
// 		filterQuery: filterQuery,
// 		statusOptions: statusOptions,
// 		fetchDefalutData: fetchDefalutData,

// 		selectOptionKey: "type",
// 		reportTitle: 'Transections Report',
// 		reportFileName: 'Transactions Report',
// 	}



// 	const columns = [
// 		{
// 			title: 'Transections ID',
// 			dataIndex: 'transection_id',

// 		},
// 		{
// 			title: 'Date',
// 			dataIndex: 'created_at',

// 			sorter: {
// 				compare: (a, b) => a.created_at - b.created_at,
// 				multiple: 2,
// 			},
// 		},
		
// 		{
// 			title: 'Amount',
// 			dataIndex: 'amount',
// 		},
// 		{
// 			title: 'Type',
// 			dataIndex: 'type',
// 			render: (text, record) => (
// 				<Tag color={colorSwitch(record.type)}>{text.toUpperCase()}</Tag>
// 			),
// 		},
		
// 		{
// 			title: 'Remark',
// 			dataIndex: 'remarks',
// 		},
// 	]

// 	const handleTableChange = (pagination, filters, sorter) => {
//     setTableParams({
//       pagination,
//       filters,
//       sorter,
//     })
//     if (pagination.pageSize !== tableParams.pagination?.pageSize) {
//       setData([])
//     }
//   }

// 	const updatePagination = (info) => {
//     const _tableParams = { ...tableParams }

//     _tableParams.pagination = info

//     setTableParams(_tableParams)
//   }


// 	useEffect(() => {
//     const _tableParams = tableParams
//     const _filters = { ...filterQuery }

//     if (_tableParams) {
//       _filters['page'] = _tableParams.pagination?.current
//       _filters['page_size'] = _tableParams.pagination?.pageSize
//       _filters['ordering'] = _tableParams?.sorter?.order == 'ascend' ? _tableParams?.sorter?.field : `-${_tableParams?.sorter?.field}`
//     }

//     setFilterQuery(_filters)

//   }, [JSON.stringify(tableParams)])

// 	useEffect(() => {
// 		handleSearchQuery(MARCHANT_GET_TRANSICTION_REPORT, qs.stringify(filterQuery))
// 			.then(res => {
// 				if (res?.results?.length > 0) {
// 					setTransections(res?.results)
// 					updatePagination({
// 						current: res?.page_number,
// 						pageSize: res?.page_size,
// 						total: res?.count,
// 					})
// 				} else {
// 					setTransections([])
// 				}
// 			})
// 	}, [filterQuery])


// 	return (
		
// 		<>
// 		<ReportHead propsData={propsData} />
// 			<Table scroll={{ x: true }} columns={columns} dataSource={transections} onChange={handleTableChange} pagination={tableParams.pagination} />

// 			{/* <ReportHead propsData={propsData} />

// 			<div class="table-responsive">
// 				<Table bordered>
// 					<thead>
// 						<tr>
// 							<th>Date</th>
// 							<th>Transections ID</th>
// 							<th>Amount</th>
// 							<th>Type</th>
// 							<th>Remark</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{transections &&
// 							transections.map((info) => (
// 								<tr key={info.id}>
// 									<td>{info.created_at}</td>
// 									<td>{info.transection_id}</td>
// 									<td>{info.amount}</td>
// 									<td>{info.type}</td>
// 									<td>{info.remark}</td>
// 								</tr>
// 							))}
// 					</tbody>
// 				</Table>
// 			</div>
// 			<Pagination onChange={paginationUpdate} total={orderCount} defaultPageSize={50} /> */}
// 		</>
// 	)
// }

// export default OrderReport






// import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import {
	getApi,
	TRANSECTIONS_REPORT_APIVIEW,
	ACCOUNT_WALLET_FORM_LIST
} from "@src/constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import { Table, Tag } from "antd"
import * as qs from 'qs'

import { DownloadPDFOrderReport } from "@src/components/reportRelatedData"

import { GENERAL_ROW_SIZE } from "@src/constants/tableConfig"


const TransactionaReport = () => {
	const [transections, setTransections] = useState([])
	const [selectBoxUser, setSelectBoxUser] = useState([])

	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: GENERAL_ROW_SIZE,
		},
	})

	const [filterQuery, setFilterQuery] = useState({
		page: 1,
		page_size: GENERAL_ROW_SIZE,
		ordering: '-created_at'
	})


	const fetchDefalutData = () => {

		return useJwt
			.axiosGet(getApi(TRANSECTIONS_REPORT_APIVIEW) + `?${qs.stringify(filterQuery)}`)
			.then((res) => {
				setTransections(res.data.results)
				updatePagination({
					current: res?.data?.page_number,
					pageSize: res?.data?.page_size,
					total: res?.data?.count,
				})
			})
			.catch((err) => {
				setTransections([])
			})
	}


	const resetFunction = () => {
		setFilterQuery({
			page: 1,
			page_size: GENERAL_ROW_SIZE,
			ordering: '-created_at'
		})
		fetchDefalutData()
	}


	const fetchUserData = () => {
		return useJwt
			.axiosGet(getApi(ACCOUNT_WALLET_FORM_LIST))
			.then((res) => {
				let userData = []

				res.data.map((data) => {
					userData.push({ value: data.id, label: data.account_name })
				})

				setSelectBoxUser(userData)
				return res.data.data
			})
			.catch((err) => console.log(err))
	}





	const statusOptions = [
		{ value: "Cash-Out", label: "Cash-Out" },
		{ value: "Cash-In", label: "Cash-In" },
	]


	function colorSwitch(status) {
		switch (status) {
			case 'Cash-Out':
				return 'yellow'

			case 'Cash-In':
				return 'green'

			default:
				return 'orange'
		}
	}






	const propsData = {
		DownloadPDFOrderReport: DownloadPDFOrderReport,
		resetFunction: resetFunction,

		updateFilterQUery: updateFilterQUery,
		filterQuery: filterQuery,

		// reportURL: PDF_ORDER_REPORT_APIVIEW,

		statusOptions: statusOptions,
		selectboxData: selectBoxUser,

		filterBy: 'transection_id',
		filterByFieldName: 'Transection ID',

		statusOptionPlaceholder: "Transaction Type",
		selectOptionKey: "type",
		reportTitle: 'Transactions Report',
		reportFileName: 'Transactions Report',
		selectboxDataPlaceholder: 'Select Wallet Account',
		filterTable: 'wallet',

	}


	const columns = [
		{
			title: 'Transactions ID',
			dataIndex: 'transection_id',
		},
		{
			title: 'Date',
			dataIndex: 'created_at',

			sorter: {
				compare: (a, b) => a.created_at - b.created_at,
				multiple: 2,
			},
		},
		{
			title: 'Account Name',
			dataIndex: 'user_name',

		},

		{
			title: 'Amount',
			dataIndex: 'amount',
		},
		{
			title: 'Type',
			dataIndex: 'type',
			render: (text, record) => (
				<Tag color={colorSwitch(record.type)}>{text.toUpperCase()}</Tag>
			),
		},
		{
			title: 'Remark',
			dataIndex: 'remark',
		},
	]


	const handleTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			sorter,
		})

		if (pagination.pageSize !== tableParams.pagination?.pageSize) {
			setData([])
		}
	}


	const updatePagination = (info) => {
		const _tableParams = { ...tableParams }

		_tableParams.pagination = info

		setTableParams(_tableParams)
	}

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
		const _tableParams = tableParams
		const _filters = { ...filterQuery }

		if (_tableParams) {
			_filters['page'] = _tableParams.pagination?.current
			_filters['page_size'] = _tableParams.pagination?.pageSize
			_filters['ordering'] = _tableParams?.sorter?.order == 'ascend' ? _tableParams?.sorter?.field : `-${_tableParams?.sorter?.field}`
		}

		setFilterQuery(_filters)

	}, [JSON.stringify(tableParams)])



	useEffect(() => {
		fetchDefalutData()
	}, [JSON.stringify(filterQuery)])

	useEffect(() => {
		fetchUserData()
	}, [])

	return (
		<>
			<ReportHead propsData={propsData} />
			<Table scroll={{ x: true }} columns={columns} dataSource={transections} onChange={handleTableChange} pagination={tableParams.pagination} />
		</>
	)
}

export default TransactionaReport



