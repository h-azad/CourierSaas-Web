

// import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, ADMIN_GET_TRANSECTION_REPORT_APIVIEW, ADMIN_GET_TRANSECTION_REPORT_GENERATE_PDF_APIVIEW, ACCOUNT_WALLET_LIST } from "../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import { Table, Tag } from "antd"
import * as qs from 'qs'

import { handlePDFQuery, handleSearchQuery } from "../../components/reportRelatedData"

import { GENERAL_ROW_SIZE } from "../../constants/tableConfig"

const AdminGetTransectionReport = () => {
  const [transections, setTransections] = useState([])
  const [selectBoxUser, setSelectBoxUser] = useState([])
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
		return useJwt.axiosGet(getApi(ADMIN_GET_TRANSECTION_REPORT_APIVIEW))
			.then((res) => {
				setTransections(res?.data?.results)
				setFilterQuery({})
			}).catch((err) => {
				setTransections([])
				setFilterQuery({})
			})
	}

  const fetchUserData = () => {
    return useJwt
      .axiosGet(getApi(ACCOUNT_WALLET_LIST))
      .then((res) => {
        let userData = []

        res.data.map((data) => {
          userData.push({ value: data.id, label: data.account_name })
        })

        setSelectBoxUser(userData)
        return res.data.data
      })
      .catch((err) => console.log(err))
  }

 

  const statusOptions = [
    { value: "Cash-Out", label: "Cash-Out" },
    { value: "Cash-In", label: "Cash-In" },
  ]

  function colorSwitch(status) {
		switch (status) {
			case 'Cash-Out':
				return 'yellow'
	
			case 'Cash-In':
				return 'green'

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


  const propsData = {
    handleSearchQuery: handleSearchQuery,
    handlePDFQuery: handlePDFQuery,
    fetchDefalutData: fetchDefalutData,

    getDataApiUrl: ADMIN_GET_TRANSECTION_REPORT_APIVIEW,
		fetchReportPDF: ADMIN_GET_TRANSECTION_REPORT_GENERATE_PDF_APIVIEW,

    updateFilterQUery: updateFilterQUery,
    filterQuery: filterQuery,

    statusOptions: statusOptions,
    selectboxData: selectBoxUser,

    statusOptionPlaceholder: "Transaction Type",
    selectOptionKey: "type",
    reportTitle: 'Transactions Report',
    reportFileName: 'Transactions Report',
    selectboxDataPlaceholder: 'Select Wallet Account',
    filterTable: 'wallet',

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
			title: 'Account',
			dataIndex: 'user_name',

		},
		{
			title: 'Transactions ID',
			dataIndex: 'transection_id',
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
		},
		{
			title: 'Type',
			dataIndex: 'type',
			render: (text, record) => (
				<Tag color={colorSwitch(record.type)}>{text.toUpperCase()}</Tag>
			),
		},
		{
			title: 'Remark',
			dataIndex: 'remark',
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
    fetchUserData()
  }, [])

  useEffect(() => {
    handleSearchQuery(ADMIN_GET_TRANSECTION_REPORT_APIVIEW, qs.stringify(filterQuery))
			.then(res => {
				if (res?.results?.length > 0) {
					setTransections(res?.results)
          updatePagination({
						current: res?.page_number,
						pageSize: res?.page_size,
						total: res?.count,
					})
				} else {
					setTransections([])
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

  return (
    <>
      <ReportHead propsData={propsData} />
      <Table scroll={{ x: true }} columns={columns} dataSource={transections} onChange={handleTableChange} pagination={tableParams.pagination} />
      {/* <div id="my-table" class="table-responsive">
        <Table bordered>
          <thead>
            <tr>
              <th>Date</th>
              <th>Account</th>
              <th>Transactions ID</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {transections &&
              transections.map((info) => (
                <tr key={info.id}>
                  <td>{info?.created_at}</td>
                  <td>
                    <span className="align-middle fw-bold">{info?.user_name}</span>
                  </td>
                  <td>{info?.transection_id}</td>
                  <td>{info?.amount}</td>
                  <td>{info?.type}</td>
                  <td>{info?.remark}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Pagination onChange={paginationUpdate} defaultCurrent={defaultPage} total={transactionCount} defaultPageSize={50} />
      </div> */}
    </>
  )
}

export default AdminGetTransectionReport



