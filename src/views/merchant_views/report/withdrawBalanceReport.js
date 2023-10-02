

import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, MARCHANT_GET_WITHDRAW_REQUEST_REPORT, MARCHANT_GET_WITHDRAW_REQUEST_REPORT_PDF } from "../../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import { Table, Tag } from "antd"
import * as qs from 'qs'
import { handlePDFQuery, handleSearchQuery } from "../../../components/reportRelatedData"

import { GENERAL_ROW_SIZE } from '../../../constants/tableConfig'

const WithdrawBalanceReport = () => {
	const [withdrawRequest, setWithdrawRequestBalance] = useState([])
	// const [filterQuery, setFilterQuery] = useState({})

	const [tableParams, setTableParams] = useState({
    pagination: {
      current: GENERAL_ROW_SIZE	,
      pageSize: 2,
    },
  })

  const [filterQuery, setFilterQuery] = useState({
    page: 1,
    page_size: GENERAL_ROW_SIZE,
    ordering: '-created_at'
  })

	const fetchDefalutData = () => {
		return useJwt.axiosGet(getApi(MARCHANT_GET_WITHDRAW_REQUEST_REPORT))
			.then((res) => {
				setWithdrawRequestBalance(res?.data?.results)
				setFilterQuery({})
			}).catch((err) => {
				setWithdrawRequestBalance([])
				setFilterQuery({})
			})
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
		handleSearchQuery: handleSearchQuery,
		handlePDFQuery: handlePDFQuery,

		reportApi: MARCHANT_GET_WITHDRAW_REQUEST_REPORT_PDF,
		getDataApiUrl: MARCHANT_GET_WITHDRAW_REQUEST_REPORT,

		updateFilterQUery: updateFilterQUery,
		filterQuery: filterQuery,
		statusOptions: statusOptions,
		fetchDefalutData: fetchDefalutData,

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
		handleSearchQuery(MARCHANT_GET_WITHDRAW_REQUEST_REPORT, qs.stringify(filterQuery))
			.then(res => {
				if (res?.results?.length > 0) {
					setWithdrawRequestBalance(res?.results)
					updatePagination({
						current: res?.page_number,
						pageSize: res?.page_size,
						total: res?.count,
					})
				} else {
					setWithdrawRequestBalance([])
				}
			})
	}, [filterQuery])

	return (
		<>
			<ReportHead propsData={propsData} />
			<Table scroll={{ x: true }} columns={columns} dataSource={withdrawRequest} onChange={handleTableChange} pagination={tableParams.pagination} />
			{/* <ReportHead propsData={propsData} />
			<div class="table-responsive">
				<Table bordered>
					<thead>
						<tr>
							<th style={{ textAlign: "center" }}>DATE</th>
							<th style={{ textAlign: "center" }}>STATUS</th>
							<th style={{ textAlign: "center" }}>PREVIOUS BALANCE</th>
							<th style={{ textAlign: "center" }}>WITHDRAW BALANCE</th>
							<th style={{ textAlign: "center" }}>CURRENT BALANCE</th>
						</tr>
					</thead>
					<tbody>
						{withdrawRequest &&
							withdrawRequest.map((info) => (
								<tr key={info.id}>
									<td style={{ textAlign: "center" }}>{info.created_at}</td>
									<td style={{ textAlign: "center" }}>{info.withdraw_status}</td>
									<td style={{ textAlign: "center" }}>{info.balance}</td>
									<td style={{ textAlign: "center" }}>{info.withdraw_balance}</td>
									<td style={{ textAlign: "center" }}>{info.current_balance}</td>
								</tr>
							))}
					</tbody>
				</Table>
			</div>
			<Pagination onChange={paginationUpdate} total={orderCount} defaultPageSize={50} /> */}
		</>

	)
}

export default WithdrawBalanceReport

