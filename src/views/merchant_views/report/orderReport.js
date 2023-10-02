

import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, MARCHANT_GET_ORDER_REPORT, MARCHANT_GET_ORDER_REPORT_PDF } from "../../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import * as qs from 'qs'
import { Table, Tag } from "antd"
import { colorSwitch, OrderStatusOptions } from "../../../components/orderRelatedData"
import { handlePDFQuery, handleSearchQuery } from "../../../components/reportRelatedData"

import { GENERAL_ROW_SIZE } from '../../../constants/tableConfig'


const OrderReport = () => {
	const [order, setOrder] = useState([])

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
		return useJwt.axiosGet(getApi(MARCHANT_GET_ORDER_REPORT))
			.then((res) => {
				setOrder(res?.data?.results)
				setFilterQuery({})
			}).catch((err) => {
				setOrder([])
				setFilterQuery({})
			})
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

		reportApi: MARCHANT_GET_ORDER_REPORT_PDF,
		getDataApiUrl: MARCHANT_GET_ORDER_REPORT,
		

		updateFilterQUery: updateFilterQUery,
		filterQuery: filterQuery,
		statusOptions: OrderStatusOptions,
		fetchDefalutData: fetchDefalutData,

		selectOptionKey: "status",
		reportTitle: 'Orders Report',
		reportFileName: 'Order Report',
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
			title: 'Total Amount',
			dataIndex: 'total_amount',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (text, record) => (
				<Tag color={colorSwitch(record.status)}>{text.toUpperCase()}</Tag>
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
		handleSearchQuery(MARCHANT_GET_ORDER_REPORT, qs.stringify(filterQuery))
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
			{/* <div id="my-table" class="table-responsive">
				<Table bordered>
					<thead>
						<tr>
							<th>Date</th>
							<th>Order ID</th>
							<th>Status</th>
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
										<span className="align-middle fw-bold">{info.created_at}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.parcel_id}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.status}</span>
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
				<Pagination onChange={paginationUpdate} total={orderCount} defaultPageSize={50} />
			</div> */}

		</>
	)
}

export default OrderReport

