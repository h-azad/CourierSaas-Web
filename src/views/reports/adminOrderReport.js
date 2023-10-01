// import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, ADMIN_GET_ORDER_REPORT_APIVIEW, MARCHANT_LIST, RIDER_LIST, ADMIN_GET_ORDER_REPORT_GENERATE_PDF_APIVIEW } from "../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import { Table, Tag } from "antd"
import * as qs from 'qs'

import { colorSwitch, OrderStatusOptions } from "../../components/orderRelatedData"
import { handlePDFQuery, handleSearchQuery } from "../../components/reportRelatedData"

import { GENERAL_ROW_SIZE } from "../../constants/tableConfig"

const AdminOrderReport = () => {
	const [order, setOrder] = useState([])
	const [selectboxMarchant, setSelectboxMarchant] = useState([])
	const [selectboxRider, setSelectboxRider] = useState([])
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
	// const [filterQuery, setFilterQuery] = useState({})


	const fetchDefalutData = () => {
		return useJwt.axiosGet(getApi(ADMIN_GET_ORDER_REPORT_APIVIEW))
			.then((res) => {
				setOrder(res?.data?.results)
				setFilterQuery({})
			}).catch((err) => {
				setOrder([])
				setFilterQuery({})
			})
	}

	const fetchMarchantData = () => {
		return useJwt
			.axiosGet(getApi(MARCHANT_LIST))
			.then((res) => {
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
				let riderData = []

				res.data.data.map((data) => {
					riderData.push({ value: data.id, label: data.full_name })
				})

				setSelectboxRider(riderData)
				return res.data
			})
			.catch((err) => console.log(err))
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
		fetchDefalutData: fetchDefalutData,

		updateFilterQUery: updateFilterQUery,
		filterQuery: filterQuery,

		getDataApiUrl: ADMIN_GET_ORDER_REPORT_APIVIEW,
		fetchReportPDF: ADMIN_GET_ORDER_REPORT_GENERATE_PDF_APIVIEW,
		
		statusOptions: OrderStatusOptions,
		selectboxData: selectboxMarchant,
		selectboxRider: selectboxRider,

		statusOptionPlaceholder: "Order Status",
		selectOptionKey: "status",
		reportTitle: 'Orders Report',
		reportFileName: 'Order Report',
		selectboxDataPlaceholder: 'Select Marchant',
		filterTable: 'marchant',
		isOrderPageIsRider: true

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
			title: 'Order ID',
			dataIndex: 'parcel_id',

		},
		{
			title: 'Marchant',
			dataIndex: ['marchant', 'full_name'],
		},
		{
			title: 'Delivery Rider',
			dataIndex: ['delivary_rider', 'full_name'],
			render: (text, record) => (
				record?.delivary_rider?.full_name ? record?.delivary_rider?.full_name : 'N/A'
			),
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
			title: 'COD Amount',
			dataIndex: 'amount_to_be_collected',
		},
		{
			title: 'Accumutated Amount',
			dataIndex: 'accumulated',
		},
		{
			title: 'Deducted Amount',
			dataIndex: 'deducted_amount',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (text, record) => (
				<Tag color={colorSwitch(record.status)}>{text.toUpperCase()}</Tag>
			),
		},
	]


	useEffect(() => {
		handleSearchQuery(ADMIN_GET_ORDER_REPORT_APIVIEW, qs.stringify(filterQuery))
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
					updatePagination({
						current: 1,
						pageSize: GENERAL_ROW_SIZE,
						total: 0,
					})
				}
			})
	}, [filterQuery])

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
		fetchMarchantData()
		fetchRiderData()
	}, [])


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

  // useEffect(() => {
  //   handleSearchQuery()
  // }, [JSON.stringify(filterQuery)])


	


	return (
		<>

			<ReportHead propsData={propsData} />
			<Table scroll={{ x: true }} columns={columns} dataSource={order} onChange={handleTableChange} pagination={tableParams.pagination} />
		</>
	)
}

export default AdminOrderReport



