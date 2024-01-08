

import { useEffect, useState } from "react"
import { Table, Tag } from "antd"
import * as qs from 'qs'

import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi, 
  PICKUP_ORDER_REPORT_APIVIEW, 
  ADMIN_GET_PICKUP_REPORT_GENERATE_PDF_APIVIEW, 
  RIDER_LIST
} from "@src/constants/apiUrls"

import { AdminOrderStatusOptions, colorSwitch } from '@src/components/orderRelatedData'

import { GENERAL_ROW_SIZE } from "@src/constants/tableConfig"

import ReportHead from "./ReportHead"
import { DownloadPDFOrderReport } from "@src/components/reportRelatedData"



const GetAdminPickupReport = () => {
  const [pickup, setPickup] = useState([])
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
      ordering: '-created_at'
    })
    OrderReportData()
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

  // const propsData = {
  //   handleSearchQuery: handleSearchQuery,
  //   handlePDFQuery: handlePDFQuery,
  //   fetchDefalutData: fetchDefalutData,

  //   getDataApiUrl: ADMIN_GET_PICKUP_REPORT_APIVIEW, 
	// 	fetchReportPDF: ADMIN_GET_PICKUP_REPORT_GENERATE_PDF_APIVIEW,

  //   updateFilterQUery: updateFilterQUery,
  //   filterQuery: filterQuery,

  //   statusOptions: statusOptions,
  //   selectboxData: rider,

  //   statusOptionPlaceholder: "Status",
  //   selectOptionKey: "pickup_status",
  //   reportTitle: 'Pickup Report',
  //   reportFileName: 'Pickup Report',
  //   selectboxDataPlaceholder: 'Select Rider',
  //   filterTable: 'pickup_rider',

  // }


  const propsData = {
    DownloadPDFOrderReport: DownloadPDFOrderReport,
    resetFunction: resetFunction,

    updateFilterQUery: updateFilterQUery,
    filterQuery: filterQuery,

    // reportURL: PDF_WITHDRAW_REQUEST_REPORT_APIVIEW,

    statusOptions: statusOptions,
    selectboxData: rider,

    filterBy: 'transection_id',
    filterByFieldName: 'Transection ID',
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
				compare: (a, b) => a.created_at - b.created_at,
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

		// {
		// 	title: 'Status',
		// 	dataIndex: 'status',
		// 	render: (text, record) => (
		// 		<Tag color={colorSwitch(record.status)}>{text.toUpperCase()}</Tag>
		// 	),
		// },
		
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

      {/* <div id="my-table" class="table-responsive">
        <Table bordered>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Pickup Date</th>
              <th style={{ textAlign: "center" }}>Rider</th>
              <th style={{ textAlign: "center" }}>Order ID</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "center" }}>Phone</th>
              <th style={{ textAlign: "center" }}>Address</th>
            </tr>
          </thead>
          <tbody>
            {pickup &&
              pickup.map((info) => (
                <tr key={info.id}>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info.pickup_date}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info.pickup_rider}</span>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info.parcel_id}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info.pickup_status}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info.phone}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info.pickup_address}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Pagination onChange={paginationUpdate} defaultCurrent={defaultPage} total={pickupCount} defaultPageSize={50} />
      </div> */}
    </>
  )
}

export default GetAdminPickupReport



