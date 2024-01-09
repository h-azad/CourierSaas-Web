


import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import {
	getApi,
	WITHDRAW_REQUEST_REPORT_APIVIEW,
	PDF_WITHDRAW_REQUEST_REPORT_APIVIEW,
} from "@src/constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import { Table, Tag } from "antd"
import * as qs from 'qs'

import { DownloadPDFOrderReport } from "@src/components/reportRelatedData"

import { GENERAL_ROW_SIZE } from "@src/constants/tableConfig"

const WithdrawBalanceReport = () => {
	const [withdrawRequest, setWithdrawRequest] = useState([])

	const [tableParams, setTableParams] = useState({
		pagination: {
			current: GENERAL_ROW_SIZE,
			pageSize: 2,
		},
	})

	const [filterQuery, setFilterQuery] = useState({
		page: 1,
		page_size: GENERAL_ROW_SIZE,
		ordering: '-created_at'
	})


	const fetchDefalutData = () => {

		return useJwt
			.axiosGet(getApi(WITHDRAW_REQUEST_REPORT_APIVIEW) + `?${qs.stringify(filterQuery)}`)
			.then((res) => {
				setWithdrawRequest(res.data.results)
				updatePagination({
					current: res?.data?.page_number,
					pageSize: res?.data?.page_size,
					total: res?.data?.count,
				})
			})
			.catch((err) => {
				setWithdrawRequest([])
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


	const statusOptions = [
		{ value: "Pending", label: "Pending" },
		{ value: "Accept", label: "Accept" },
		{ value: "Complete", label: "Complete" },
		{ value: "Cancel", label: "Cancel" },
	]

	function colorSwitch(status) {
		switch (status) {
			case 'Pending':
				return 'yellow'

			case 'Accept':
				return 'green'

			case 'Complete':
				return 'green'

			case 'Cancel':
				return 'red'

			default:
				return 'orange'
		}
	}

	function updateFilterQUery(term, value) {
		let filters = { ...filterQuery }

		if (value) {
			filters[term] = value
		} else {
			filters.hasOwnProperty(term) && delete filters[term]
		}
		setFilterQuery(filters)
	}



	const propsData = {
		DownloadPDFOrderReport: DownloadPDFOrderReport,
		resetFunction: resetFunction,

		updateFilterQUery: updateFilterQUery,
		filterQuery: filterQuery,

		reportURL: PDF_WITHDRAW_REQUEST_REPORT_APIVIEW,

		statusOptions: statusOptions,
		// selectboxData: selectBoxUser,

		filterBy: 'transection_id',
		filterByFieldName: 'Transection ID',

		statusOptionPlaceholder: "Status Type",
		selectboxDataPlaceholder: 'Select Wallet Account',

		selectOptionKey: "withdraw_status",
		reportTitle: 'Withdraw Request Report',
		reportFileName: 'Withdraw Request Report',

	}


	const columns = [
		{
			title: 'Date',
			dataIndex: 'created_at',

			sorter: {
				compare: (a, b) => a.created_at - b.created_at,
				multiple: 2,
			},
		},

		{
			title: 'Previous Balance',
			dataIndex: 'balance',
		},


		{
			title: 'Withdraw Balance',
			dataIndex: 'withdraw_balance',
		},
		{
			title: 'Current Balance',
			dataIndex: 'current_balance',
		},
		{
			title: 'Status',
			dataIndex: 'withdraw_status',
			render: (text, record) => (
				<Tag color={colorSwitch(record.withdraw_status)}>{text.toUpperCase()}</Tag>
			),
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


	return (
		<>
			<ReportHead propsData={propsData} />
			<Table scroll={{ x: true }} columns={columns} dataSource={withdrawRequest} onChange={handleTableChange} pagination={tableParams.pagination} />
		</>

	)
}

export default WithdrawBalanceReport

