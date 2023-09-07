

// import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, RIDER_GET_DELIVERY_REPORT, RIDER_GET_DELIVERY_REPORT_PDF } from "../../../constants/apiUrls"
import ReportHead from "./RiderReportHead"
import React from 'react'
import { Table, Tag } from "antd"
import * as qs from 'qs'
import { colorSwitch } from "../../../components/orderRelatedData"
import { handlePDFQuery, handleSearchQuery } from "../../../components/reportRelatedData"

import { GENERAL_ROW_SIZE } from '../../../constants/tableConfig'

const DeliveryReport = () => {
	const [order, setOrder] = useState([])
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
		return useJwt.axiosGet(getApi(RIDER_GET_DELIVERY_REPORT))
			.then((res) => {
				setOrder(res?.data?.results)
				setFilterQuery({})
			}).catch((err) => {
				setOrder([])
				setFilterQuery({})
			})
	}


	const statusOptions = [
		{ value: true, label: "Delivered" },
		{ value: 'false', label: "UnDelivered" },
		{ value: 'failed_delivery', label: "Delivery Failed" },
	]

	function statusOptionsColorSwitch(option) {
		switch (option) {
			case 'Delivered':
				return 'green'
	
			case 'UnDelivered':
				return 'yellow'
			
			case 'Delivery Failed':
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

		reportApi: RIDER_GET_DELIVERY_REPORT_PDF,
		getDataApiUrl: RIDER_GET_DELIVERY_REPORT,

		updateFilterQUery: updateFilterQUery,
		filterQuery: filterQuery,
		statusOptions: statusOptions,
		fetchDefalutData: fetchDefalutData,

		selectOptionKey: "delivery_status",
		reportTitle: 'Delivery Report',
		reportFileName: 'Delivery Report',
	}

	const columns = [
		{
			title: 'Date',
			dataIndex: 'delivery_date',

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
			title: 'Status',
			dataIndex: 'status',
			render: (text, record) => (
				<Tag color={colorSwitch(record.status)}>{text.toUpperCase()}</Tag>
			),
		},
		{
			title: 'Delivery Status',
			dataIndex: 'delivery_status',
			render: (text, record) => (
				<Tag color={statusOptionsColorSwitch(record.delivery_status)}>{text.toUpperCase()}</Tag>
			),
			
		},
		{
			title: 'Phone',
			dataIndex: 'phone_number',
		},
		{
			title: 'Address',
			dataIndex: 'delivary_address',
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
		handleSearchQuery(RIDER_GET_DELIVERY_REPORT, qs.stringify(filterQuery))
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
							<th>Delivery Date</th>
							<th>Order ID</th>
							<th>Status</th>
							<th>Delivery Status</th>
							<th>Phone</th>
							<th>Address</th>
						</tr>
					</thead>
					<tbody>
						{order &&
							order.map((info) => (
								<tr key={info.id}>
									<td>
										<span className="align-middle fw-bold">{info.delivery_date}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.parcel_id}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.status}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.delivery_status}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.phone_number}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.delivary_address}</span>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
				<Pagination onChange={paginationUpdate} defaultCurrent={1} total={orderCount} defaultPageSize={50} />
			</div> */}
		</>
	)
}

export default DeliveryReport

