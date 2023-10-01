
// import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, ADMIN_GET_DELIVERY_COLLECTION_REPORT_APIVIEW, ADMIN_GET_DELIVERY_COLLECTION_REPORT_GENERATE_PDFAPIVIEW, RIDER_LIST } from "../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import { Table, Tag } from "antd"
import * as qs from 'qs'

import { GENERAL_ROW_SIZE } from "../../constants/tableConfig"
import { handlePDFQuery, handleSearchQuery } from "../../components/reportRelatedData"

const AdminGetCollectionReport = () => {
  const [order, setOrder] = useState([])
  const [rider, setRider] = useState([])
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

  const fetchDefalutData = () => {
		return useJwt.axiosGet(getApi(ADMIN_GET_DELIVERY_COLLECTION_REPORT_APIVIEW))
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
        console.log('RIDER_LIST', res)
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




  const propsData = {
    handleSearchQuery: handleSearchQuery,
    handlePDFQuery: handlePDFQuery,
    fetchDefalutData: fetchDefalutData,

    getDataApiUrl: ADMIN_GET_DELIVERY_COLLECTION_REPORT_APIVIEW,
		fetchReportPDF: ADMIN_GET_DELIVERY_COLLECTION_REPORT_GENERATE_PDFAPIVIEW,

    updateFilterQUery: updateFilterQUery,
    filterQuery: filterQuery,

    statusOptions: statusOptions,
    selectboxData: rider,

    statusOptionPlaceholder: "Delivery Type",
    selectOptionKey: "order_type",
    reportTitle: 'Collection Report',
    reportFileName: 'Collection Report',
    selectboxDataPlaceholder: 'Select Rider',
    filterTable: 'delivary_rider',

  }


  const columns = [
		{
			title: 'Date',
			dataIndex: 'date',
		},
		{
			title: 'Total Delivery',
			dataIndex: 'total_delivery',
		},

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


  useEffect(() => {
    handleSearchQuery(ADMIN_GET_DELIVERY_COLLECTION_REPORT_APIVIEW, qs.stringify(filterQuery))
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


  return (
    <>
      <ReportHead propsData={propsData} />
      <Table scroll={{ x: true }} columns={columns} dataSource={order} onChange={handleTableChange} pagination={tableParams.pagination} />
    </>
  )
}

export default AdminGetCollectionReport

