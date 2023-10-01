

// import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, ADMIN_GET_CANCEL_ISSUE_REPORT_APIVIEW, ADMIN_GET_CANCEL_ISSUE_REPORT_GENERATE_PDF_APIVIEW, RIDER_LIST } from "../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import { Table, Tag } from "antd"
import * as qs from 'qs'

import { handlePDFQuery, handleSearchQuery } from "../../components/reportRelatedData"

import { GENERAL_ROW_SIZE } from "../../constants/tableConfig"

const GetAdminCencelIssue = () => {
  const [cancelIssueData, setCancelIssueData] = useState([])
  const [rider, setRider] = useState([])

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
    return useJwt.axiosGet(getApi(ADMIN_GET_CANCEL_ISSUE_REPORT_APIVIEW))
      .then((res) => {
        setCancelIssueData(res?.data?.results)
        setFilterQuery({})
      }).catch((err) => {
        setCancelIssueData([])
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

    getDataApiUrl: ADMIN_GET_CANCEL_ISSUE_REPORT_APIVIEW, 
		fetchReportPDF: ADMIN_GET_CANCEL_ISSUE_REPORT_GENERATE_PDF_APIVIEW,

    updateFilterQUery: updateFilterQUery,
    filterQuery: filterQuery,

    statusOptions: statusOptions,
    selectboxData: rider,
    // selectboxRider: selectboxRider,
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
    handleSearchQuery(ADMIN_GET_CANCEL_ISSUE_REPORT_APIVIEW, qs.stringify(filterQuery))
      .then(res => {
        if (res?.results?.length > 0) {
          setCancelIssueData(res?.results)
          updatePagination({
						current: res?.page_number,
						pageSize: res?.page_size,
						total: res?.count,
					})
        } else {
          setCancelIssueData([])
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
      <Table scroll={{ x: true }} columns={columns} dataSource={cancelIssueData} onChange={handleTableChange} pagination={tableParams.pagination} />

      {/* <div id="my-table" class="table-responsive">
        <Table bordered>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Date</th>
              <th style={{ textAlign: "center" }}>Order</th>
              <th style={{ textAlign: "center" }}>Type</th>
              <th style={{ textAlign: "center" }}>Rider</th>
              <th style={{ textAlign: "center" }}>Reason</th>
            </tr>
          </thead>
          <tbody>
            {cancelIssueData &&
              cancelIssueData.map((info) => (
                <tr key={info.id}>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info?.created_at}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info?.order}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info?.cancel_type}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info?.rider}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info?.reason}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Pagination onChange={paginationUpdate} defaultCurrent={defaultPage} total={cancelOrderCount} defaultPageSize={50} />
      </div> */}
    </>
  )
}

export default GetAdminCencelIssue



