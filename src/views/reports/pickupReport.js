

import { useEffect, useState } from "react"
import { Table, Tag } from "antd"
import * as qs from 'qs'

import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  PICKUP_ORDER_REPORT_APIVIEW,
  PDF_PICKUP_ORDER_REPORT_APIVIEW,
  RIDER_FORM_LIST
} from "@src/constants/apiUrls"

import { GENERAL_ROW_SIZE } from "@src/constants/tableConfig"

import ReportHead from "./ReportHead"
import { DownloadPDFOrderReport } from "@src/components/reportRelatedData"



const OrderPickupReport = () => {
  const [pickup, setPickup] = useState([])
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
    ordering: '-pickup_date'
  })


  const OrderReportData = () => {

    return useJwt
      .axiosGet(getApi(PICKUP_ORDER_REPORT_APIVIEW) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setPickup(res.data.results)
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
      ordering: '-pickup_date'
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
    { value: true, label: "Picked" },
    { value: 'false', label: "Pendding" },
  ]

  function statusOptionsColorSwitch(option) {
    switch (option) {
      case 'Picked':
        return 'green'

      case 'Unpicked':
        return 'yellow'

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

    reportURL: PDF_PICKUP_ORDER_REPORT_APIVIEW,

    statusOptions: statusOptions,
    selectboxData: rider,

    filterBy: 'parcel_id',
    filterByFieldName: 'Parcel ID',
    filterByDate: 'pickup_date',

    statusOptionPlaceholder: "Status",
    selectOptionKey: "pickup_status",
    reportTitle: 'Pickup Report',
    reportFileName: 'Pickup Report',
    selectboxDataPlaceholder: 'Select Rider',
    filterTable: 'pickup_rider',

  }



  const columns = [
    {
      title: 'Date',
      dataIndex: 'pickup_date',

      sorter: {
        compare: (a, b) => a.pickup_date - b.pickup_date,
        multiple: 2,
      },
    },
    {
      title: 'Rider',
      dataIndex: 'pickup_rider',

    },
    {
      title: 'Order ID',
      dataIndex: 'parcel_id',

    },

    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'pickup_address',
    },
    {
      title: 'Pickup Status',
      dataIndex: 'pickup_status',
      render: (text, record) => (
        <Tag color={statusOptionsColorSwitch(record.pickup_status)}>{text.toUpperCase()}</Tag>
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
      <Table scroll={{ x: true }} columns={columns} dataSource={pickup} onChange={handleTableChange} pagination={tableParams.pagination} />
    </>
  )
}

export default OrderPickupReport



