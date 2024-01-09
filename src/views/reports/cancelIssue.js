import { useEffect, useState } from "react"
import { Table, Tag } from "antd"
import * as qs from 'qs'

import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  CANCEL_ISSUE_ORDER_REPORT_APIVIEW,
  PDF_CANCEL_ISSUE_ORDER_REPORT_APIVIEW,
  RIDER_FORM_LIST
} from "@src/constants/apiUrls"

import { GENERAL_ROW_SIZE } from "@src/constants/tableConfig"

import ReportHead from "./ReportHead"
import { DownloadPDFOrderReport } from "@src/components/reportRelatedData"




const OrderCancelIssueReport = () => {
  const [cancelIssueData, setCancelIssueData] = useState([])
  const [rider, setRider] = useState([])

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
      .axiosGet(getApi(CANCEL_ISSUE_ORDER_REPORT_APIVIEW) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setCancelIssueData(res.data.results)
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
    { value: 'Pickup', label: 'Pickup' },
    { value: 'Delivery', label: "Delivery" },
    { value: 'Returned', label: "Returned" },
    { value: 'Hold', label: "Hold" },
  ]

  function statusOptionsColorSwitch(option) {
    switch (option) {
      case 'Returned':
        return 'orange'

      case 'Hold':
        return 'yellow'

      default:
        return 'red'
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

    reportURL: PDF_CANCEL_ISSUE_ORDER_REPORT_APIVIEW,

    statusOptions: statusOptions,
    selectboxData: rider,

    filterBy: 'order__parcel_id',
    filterByFieldName: 'Parcel ID',
    filterByDate: 'created_at',

    statusOptionPlaceholder: "Status",
    selectOptionKey: "cancel_type",
    reportTitle: 'Cancel Issue Report',
    reportFileName: 'Cancel Issue Report',
    selectboxDataPlaceholder: 'Select Rider',
    filterTable: 'rider',

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
      title: 'Order',
      dataIndex: 'order',

    },

    {
      title: 'Rider',
      dataIndex: 'rider',

    },
    {
      title: 'Reason',
      dataIndex: 'reason',
    },

    {
      title: 'Cancel Type',
      dataIndex: 'cancel_type',
      render: (text, record) => (
        <Tag color={statusOptionsColorSwitch(record.cancel_type)}>{text.toUpperCase()}</Tag>
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
      <Table scroll={{ x: true }} columns={columns} dataSource={cancelIssueData} onChange={handleTableChange} pagination={tableParams.pagination} />
    </>
  )
}

export default OrderCancelIssueReport



