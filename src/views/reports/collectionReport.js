
import { useEffect, useState } from "react"
import { Table, Tag } from "antd"
import * as qs from 'qs'

import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  DELIVERY_ORDER_COLLECTION_REPORT_APIVIEW,
  PDF_DELIVERY_ORDER_COLLECTION_REPORT_APIVIEW,
  RIDER_FORM_LIST
} from "@src/constants/apiUrls"

import { GENERAL_ROW_SIZE } from "@src/constants/tableConfig"

import ReportHead from "./ReportHead"
import { DownloadPDFOrderReport } from "@src/components/reportRelatedData"


const CollectionReport = () => {
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

  const OrderReportData = () => {

    return useJwt
      .axiosGet(getApi(DELIVERY_ORDER_COLLECTION_REPORT_APIVIEW) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
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


  const fetchRiderData = () => {
    return useJwt
      .axiosGet(getApi(RIDER_FORM_LIST))
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
    { value: 'pre-paid', label: "Pre-Paid" },
    { value: 'COD', label: "COD" },
  ]


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


  const propsData = {
    DownloadPDFOrderReport: DownloadPDFOrderReport,
    resetFunction: resetFunction,

    updateFilterQUery: updateFilterQUery,
    filterQuery: filterQuery,

    reportURL: PDF_DELIVERY_ORDER_COLLECTION_REPORT_APIVIEW,

    statusOptions: statusOptions,
    selectboxData: rider,

    filterBy: 'parcel_id',
    filterByFieldName: 'Parcel ID',
    filterByDate: 'created_at',

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

  useEffect(() => {
    fetchRiderData()
  }, [])


  return (
    <>
      <ReportHead propsData={propsData} />
      <Table scroll={{ x: true }} columns={columns} dataSource={order} onChange={handleTableChange} pagination={tableParams.pagination} />
    </>
  )
}

export default CollectionReport

