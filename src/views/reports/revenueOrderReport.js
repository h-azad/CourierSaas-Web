

// import { Table } from "reactstrap"
// import { useEffect, useState } from "react"
// import useJwt from "@src/auth/jwt/useJwt"
// import { getApi, ORDER_REVENUE_REPORT_APIVIEW, ADMIN_GET_ORDER_REVENUE_REPORT_GENERATE_PDF_APIVIEW } from "../../constants/apiUrls"
// import React from 'react'
// import { DatePicker, Select, Button, Input, Card, Form, Col, Row, Space, Divider } from 'antd'
// import classNames from "classnames"

// import * as qs from 'qs'


import { useEffect, useState } from "react"
import { Table, Select, Button, Tag, Card, Form, Col, Row, Space, Divider } from 'antd'
import { FilePptOutlined } from '@ant-design/icons'
import classNames from "classnames"
import * as qs from 'qs'

import useJwt from "@src/auth/jwt/useJwt"
import {
	getApi,
	ORDER_REVENUE_REPORT_APIVIEW,
	PDF_ORDER_REVENUE_REPORT_APIVIEW,
} from "@src/constants/apiUrls"

import { GENERAL_ROW_SIZE } from "@src/constants/tableConfig"

import ReportHead from "./ReportHead"
import { DownloadPDFOrderReport } from "@src/components/reportRelatedData"


const OrderRevenueReport = () => {
	const [order, setOrder] = useState([])
	const [selectYear, setSelectYear] = useState([])
	const [selectMonth, setSelectMonth] = useState([])
	// const [filterQuery, setFilterQuery] = useState({})

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


	const OrderReportData = () => {

		return useJwt
			.axiosGet(getApi(ORDER_REVENUE_REPORT_APIVIEW) + `?${qs.stringify(filterQuery)}`)
			.then((res) => {
				console.log('res.data.results', res.data.results)
				setOrder(res.data.results)
				updatePagination({
					current: res?.data?.page_number,
					pageSize: res?.data?.page_size,
					total: res?.data?.count,
				})
			})
			.catch((err) => console.log(err))
	}

	const resetFunction = () => {
		setFilterQuery({
			page: 1,
			page_size: GENERAL_ROW_SIZE,
			ordering: '-created_at'
		})
		OrderReportData()
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
		OrderReportData()
	}, [JSON.stringify(filterQuery)])




	function submitPDFFilter(e) {
		e.preventDefault()
		handleSearchQuery(qs.stringify(filterQuery))
		handlePDFQuery(qs.stringify(filterQuery))
	}

	function DownloadPDF(e) {
		e.preventDefault()
		DownloadPDFOrderReport(
			PDF_ORDER_REVENUE_REPORT_APIVIEW,
			qs.stringify(filterQuery),
			'Order Revenue'
		)
	}



	useEffect(() => {
		const currentYear = new Date().getFullYear()

		let yearArr = []
		for (let i = 0; i < 10; i++) {
			yearArr.push({ value: currentYear - i, label: currentYear - i })
		}
		setSelectYear(yearArr)

		let monthArr = []

		const date = new Date()


		for (let i = 1; i < 13; i++) {
			date.setMonth(i - 1)
			monthArr.push({ value: i, label: date.toLocaleString('en-US', { month: 'long' }) })
		}
		setSelectMonth(monthArr)

	}, [])


	const columns = [
		{
			title: 'Date',
			dataIndex: 'delivery_date',
		},
		{
			title: 'Order ID',
			dataIndex: 'parcel_id',
		},
		{
			title: 'Delivery Charge',
			dataIndex: 'delivary_charge',
		},

		{
			title: 'COD Charge',
			dataIndex: 'cash_on_delivery_charge',
		},
		{
			title: 'Deducted Amount',
			dataIndex: 'deducted_amount',
		},

	]




	return (
		<>

			<div className='report_head_wrapper mt-1'>
				<Card
					title="Revenue Report"
					bordered={false}
				>
					<Form>
						<Row gutter={24}>
							<Col span={12}>
								<Form.Item label="Select Year" name="year">
									<Select
										style={{
											width: '100%',
										}}

										id="year"
										name="year"
										placeholder="Year"
										isClearable={true}
										className={classNames("react-select")}
										classNamePrefix="select"
										options={selectYear}
										allowClear={true}
										onChange={(e) => {
											updateFilterQUery('year', e)
										}}
									/>
								</Form.Item>
							</Col>

							<Col span={12}>
								<Form.Item label="Select Month" name="month">
									<Select
										allowClear={true}
										showSearch
										placeholder="Month"
										optionFilterProp="children"
										filterOption={(input, option) =>
											(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
										}
										options={selectMonth}
										onChange={(e) => {
											updateFilterQUery('month', e)
										}}
									/>
								</Form.Item>
								<Space>
								</Space>
							</Col>
						</Row>
					</Form>
				</Card>
				<Divider ></Divider>
				<Row justify={'end'}>
					<Col>
						<Space style={{ 'padding': '10px 0px' }}>
							<Button type="primary" onClick={DownloadPDF} icon={<FilePptOutlined />} size={20}>
								Export To PDF
							</Button>
						</Space>
					</Col>
				</Row>
			</div>

			<div id="my-table" class="table-responsive">
				<Table scroll={{ x: true }} columns={columns} dataSource={order} onChange={handleTableChange} pagination={tableParams.pagination} />
			</div>
		</>
	)
}

export default OrderRevenueReport



