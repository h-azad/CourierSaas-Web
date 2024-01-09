import { useEffect, useState } from "react"
import { Table, Tag } from "antd"
import * as qs from 'qs'

import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  ORDER_REPORT_APIVIEW,
  PDF_ORDER_REPORT_APIVIEW,
  MARCHANT_FORM_LIST,
  RIDER_FORM_LIST,
} from "@src/constants/apiUrls"

import { AdminOrderStatusOptions, colorSwitch } from '@src/components/orderRelatedData'

import { GENERAL_ROW_SIZE } from "@src/constants/tableConfig"

import ReportHead from "./ReportHead"
import { DownloadPDFOrderReport } from "@src/components/reportRelatedData"



const OrderReport = () => {

  const [orderData, setOrderData] = useState([])
  const [selectboxMarchant, setSelectboxMarchant] = useState([])
  const [selectboxRider, setSelectboxRider] = useState([])

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: GENERAL_ROW_SIZE,
    },
  })

  const [filterQuery, setFilterQuery] = useState({
    page: 1,
    page_size: GENERAL_ROW_SIZE,
    ordering: '-created_at'
  })


  const OrderReportData = () => {

    return useJwt
      .axiosGet(getApi(ORDER_REPORT_APIVIEW) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setOrderData(res.data.results)
        updatePagination({
          current: res?.data?.page_number,
          pageSize: res?.data?.page_size,
          total: res?.data?.count,
        })
      })
      .catch((err) => console.log(err))
  }


  const fetchMarchantData = () => {
    return useJwt
      .axiosGet(getApi(MARCHANT_FORM_LIST))
      .then((res) => {
        let marchantData = []

        res.data.map((data) => {
          marchantData.push({ value: data.id, label: data.full_name })
        })

        setSelectboxMarchant(marchantData)
        return res.data.data
      })
      .catch((err) => console.log(err))
  }



  const fetchRiderData = () => {
    return useJwt
      .axiosGet(getApi(RIDER_FORM_LIST))
      .then((res) => {
        let riderData = []

        res.data.map((data) => {
          riderData.push({ value: data.id, label: data.full_name })
        })

        setSelectboxRider(riderData)
        return res.data
      })
      .catch((err) => console.log(err))
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

  const resetFunction = () => {
    setFilterQuery({
      page: 1,
      page_size: GENERAL_ROW_SIZE,
      ordering: '-created_at'
    })
    OrderReportData()
  }




  const propsData = {
    DownloadPDFOrderReport: DownloadPDFOrderReport,
    resetFunction: resetFunction,

    updateFilterQUery: updateFilterQUery,
    filterQuery: filterQuery,

    reportURL: PDF_ORDER_REPORT_APIVIEW,

    statusOptions: AdminOrderStatusOptions,
    selectboxData: selectboxMarchant,
    selectboxRider: selectboxRider,

    filterBy: 'parcel_id',
    filterByFieldName: 'Parcel ID',
    filterByDate: 'created_at',

    statusOptionPlaceholder: "Order Status",
    selectOptionKey: "status",
    reportTitle: 'Orders Report',
    reportFileName: 'Order Report',
    selectboxDataPlaceholder: 'Select Marchant',
    filterTable: 'marchant',
    isOrderPageIsRider: true

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
    fetchMarchantData()
  }, [])


  return (
    <>
      <ReportHead propsData={propsData} />
      <Table scroll={{ x: true }} columns={columns} dataSource={orderData} onChange={handleTableChange} pagination={tableParams.pagination} />
    </>
  )

}

export default OrderReport