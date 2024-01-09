
import { useEffect, useState } from "react"
import { Table, Tag } from "antd"
import * as qs from 'qs'

import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  DELIVERY_ORDER_REPORT_APIVIEW,
  PDF_DELIVERY_ORDER_REPORT_APIVIEW,
  RIDER_FORM_LIST
} from "@src/constants/apiUrls"

import { GENERAL_ROW_SIZE } from "@src/constants/tableConfig"

import ReportHead from "./ReportHead"
import { DownloadPDFOrderReport } from "@src/components/reportRelatedData"


const DeliveryReport = () => {
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
    ordering: '-delivery_date'
  })


  const OrderReportData = () => {

    return useJwt
      .axiosGet(getApi(DELIVERY_ORDER_REPORT_APIVIEW) + `?${qs.stringify(filterQuery)}`)
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
      ordering: '-delivery_date'
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

    reportURL: PDF_DELIVERY_ORDER_REPORT_APIVIEW,

    statusOptions: statusOptions,
    selectboxData: rider,

    filterBy: 'parcel_id',
    filterByFieldName: 'Parcel ID',
    filterByDate: 'delivery_date',

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
        compare: (a, b) => a.delivery_date - b.delivery_date,
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

export default DeliveryReport



