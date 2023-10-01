

// import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, ADMIN_GET_DELIVERY_REPORT_APIVIEW, ADMIN_GET_DELIVERY_REPORT_GENERATE_PDF_APIVIEW, RIDER_LIST } from "../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import { Table, Tag } from "antd"
import * as qs from 'qs'

import { colorSwitch } from "../../components/orderRelatedData"
import { handlePDFQuery, handleSearchQuery } from "../../components/reportRelatedData"

import { GENERAL_ROW_SIZE } from "../../constants/tableConfig"

const GetAdminDeliveryReport = () => {
  const [order, setOrder] = useState([])
  const [rider, setRider] = useState([])
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
    return useJwt.axiosGet(getApi(ADMIN_GET_DELIVERY_REPORT_APIVIEW))
      .then((res) => {
        setOrder(res?.data?.results)
        setFilterQuery({})
      }).catch((err) => {
        setOrder([])
        setFilterQuery({})
      })
  }

  const fetchRiderData = () => {
    return useJwt
      .axiosGet(getApi(RIDER_LIST))
      .then((res) => {
        let riderData = []

        res.data.data.map((data) => {
          riderData.push({ value: data.id, label: data.full_name })
        })

        setRider(riderData)
        return res.data.data
      })
      .catch((err) => console.log(err))
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

  

  // const paginationUpdate = (page) => {
  //   updateFilterQUery("page", page)
  // }

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
    fetchDefalutData: fetchDefalutData,

    getDataApiUrl: ADMIN_GET_DELIVERY_REPORT_APIVIEW, 
		fetchReportPDF: ADMIN_GET_DELIVERY_REPORT_GENERATE_PDF_APIVIEW,

    updateFilterQUery: updateFilterQUery,
    filterQuery: filterQuery,

    statusOptions: statusOptions,
    selectboxData: rider,
    // selectboxRider: selectboxRider,

    statusOptionPlaceholder: "Status",
    selectOptionKey: "delivery_status",
    reportTitle: 'Delivery Report',
    reportFileName: 'Delivery Report',
    selectboxDataPlaceholder: 'Select Rider',
    filterTable: 'delivary_rider',
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
			title: 'Rider',
			dataIndex: 'delivery_rider',

		},
		{
			title: 'Order ID',
			dataIndex: 'parcel_id',

		},

		// {
		// 	title: 'Status',
		// 	dataIndex: 'status',
		// 	render: (text, record) => (
		// 		<Tag color={colorSwitch(record.status)}>{text.toUpperCase()}</Tag>
		// 	),
		// },
		
		{
			title: 'Phone',
			dataIndex: 'phone_number',
		},
		{
			title: 'Address',
			dataIndex: 'delivary_address',
		},
    {
      title: 'Delivery Status',
      dataIndex: 'delivery_status',
      render: (text, record) => (
        <Tag color={statusOptionsColorSwitch(record.delivery_status)}>{text.toUpperCase()}</Tag>
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
    handleSearchQuery(ADMIN_GET_DELIVERY_REPORT_APIVIEW, qs.stringify(filterQuery))
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
    fetchRiderData()
  }, [])

  

  return (
    <>
      <ReportHead propsData={propsData} />
      <Table scroll={{ x: true }} columns={columns} dataSource={order} onChange={handleTableChange} pagination={tableParams.pagination} />
      {/* <div id="my-table" class="table-responsive">
        <Table bordered>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Delivery Date</th>
              <th style={{ textAlign: "center" }}>Rider</th>
              <th style={{ textAlign: "center" }}>Order ID</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "center" }}>Phone</th>
              <th style={{ textAlign: "center" }}>Address</th>
            </tr>
          </thead>
          <tbody>
            {order &&
              order.map((info) => (
                <tr key={info.id}>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info.delivery_date}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info.delivery_rider}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info.parcel_id}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info.delivery_status}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info.phone_number}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info.delivary_address}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Pagination onChange={paginationUpdate} defaultCurrent={defaultPage} total={deliveryCount} defaultPageSize={50} />
      </div> */}
    </>
  )
}

export default GetAdminDeliveryReport



