

// import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, RIDER_GET_DELIVERY_COLLECTION_REPORT, RIDER_GET_DELIVERY_COLLECTION_REPORT_PDF } from "../../../constants/apiUrls"
import ReportHead from "./RiderReportHead"
import React from 'react'
import * as qs from 'qs'
import { Table, Tag } from "antd"

import { GENERAL_ROW_SIZE } from '../../../constants/tableConfig'

import { handlePDFQuery, handleSearchQuery } from "../../../components/reportRelatedData"


const MarchantCollectionReport = () => {
	const [order, setOrder] = useState([])
	
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
		return useJwt.axiosGet(getApi(RIDER_GET_DELIVERY_COLLECTION_REPORT))
			.then((res) => {
				setOrder(res?.data?.results)
				setFilterQuery({})
			}).catch((err) => {
				setOrder([])
				setFilterQuery({})
			})
	}



	const statusOptions = [
		{ value: 'pre-paid', label: "Pre-Paid" },
		{ value: 'COD', label: "COD" },
	]


	function updateFilterQUery(term, value) {
		let filters = { ...filterQuery }

		if (value) {
			filters[term] = value
		} else {
			filters.hasOwnProperty(term) && delete filters[term]
		}
		setFilterQuery(filters)
	}



	const onChangeSorter = (pagination, filters, sorter, extra) => {
		if (sorter.order === 'ascend') {
			updateFilterQUery("ordering", sorter.field)
		} else if (sorter.order === 'descend') {
			updateFilterQUery("ordering", '-' + sorter.field)
		}
		else {
			setFilterQuery({})
		}
	}

	const propsData = {
		handleSearchQuery: handleSearchQuery,
		handlePDFQuery: handlePDFQuery,

		reportApi: RIDER_GET_DELIVERY_COLLECTION_REPORT_PDF,
		getDataApiUrl: RIDER_GET_DELIVERY_COLLECTION_REPORT,

		updateFilterQUery: updateFilterQUery,
		filterQuery: filterQuery,
		statusOptions: statusOptions,
		fetchDefalutData: fetchDefalutData,

		selectOptionKey: "order_type",
		reportTitle: 'Delivery Collection Report',
		reportFileName: 'Delivery Collection Report',
	}

	const columns = [
		{
			title: 'Date',
			dataIndex: 'date',

			sorter: {
				compare: (a, b) => a.created_at - b.created_at,
				multiple: 2,
			},
		},
		{
			title: 'Total Delivery',
			dataIndex: 'total_delivery',

		},

		// {
		// 	title: 'Status',
		// 	dataIndex: 'status',
		// 	render: (text, record) => (
		// 		<Tag color={colorSwitch(record.status)}>{text.toUpperCase()}</Tag>
		// 	),
		// },
		// {
		// 	title: 'Delivery Status',
		// 	dataIndex: 'delivery_status',
		// 	render: (text, record) => (
		// 		<Tag color={statusOptionsColorSwitch(record.delivery_status)}>{text.toUpperCase()}</Tag>
		// 	),
			
		// },
		{
			title: 'Total COD',
			dataIndex: 'total_cod',
		},
		{
			title: 'Total Pre-Paid',
			dataIndex: 'total_pre_paid',
		},
		{
			title: 'Total Delivery Charge',
			dataIndex: 'total_delivery_charge',
		},
		{
			title: 'Total Collected Amount',
			dataIndex: 'total_collect_amount',
		},
		{
			title: 'Total Amount',
			dataIndex: 'total',
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
		handleSearchQuery(RIDER_GET_DELIVERY_COLLECTION_REPORT, qs.stringify(filterQuery))
			.then(res => {
				if (res?.results?.length > 0) {
					setOrder(res?.results)
					updatePagination({
						current: res?.page_number,
						pageSize: res?.page_size,
						total: res?.count,
					})
				} else {
					setOrder([])
				}
			})
	}, [filterQuery])

	return (
		<>
			<ReportHead propsData={propsData} />			
			<Table scroll={{ x: true }} columns={columns} dataSource={order} onChange={handleTableChange} pagination={tableParams.pagination} />
		</>
	)
}

export default MarchantCollectionReport

