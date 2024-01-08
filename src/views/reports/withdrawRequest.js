

// import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { 
  getApi, 
  WITHDRAW_REQUEST_REPORT_APIVIEW,
  PDF_WITHDRAW_REQUEST_REPORT_APIVIEW,
  ACCOUNT_WALLET_FORM_LIST
} from "../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'

import { Table, Tag } from "antd"
import * as qs from 'qs'

import { DownloadPDFOrderReport } from "@src/components/reportRelatedData"

import { GENERAL_ROW_SIZE } from "@src/constants/tableConfig"

const WithdrawRequestReport = () => {
  const [withdrawRequest, setWithdrawRequest] = useState([])
  const [selectAccountWallet, setselectAccountWallet] = useState([])

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

    return useJwt
      .axiosGet(getApi(WITHDRAW_REQUEST_REPORT_APIVIEW) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setWithdrawRequest(res.data.results)
        updatePagination({
          current: res?.data?.page_number,
          pageSize: res?.data?.page_size,
          total: res?.data?.count,
        })
      })
      .catch((err) => {
        setWithdrawRequest([])
      })
  }


  const resetFunction = () => {
    setFilterQuery({
      page: 1,
      page_size: GENERAL_ROW_SIZE,
      ordering: '-created_at'
    })
    fetchDefalutData()
  }



  const fetchWalletData = () => {
    return useJwt
      .axiosGet(getApi(ACCOUNT_WALLET_FORM_LIST))
      .then((res) => {
        console.log('account', res)
        let userData = []

        res.data.map((data) => {
          userData.push({ value: data.id, label: data.account_name })
        })

        setselectAccountWallet(userData)
        return res.data.data
      })
      .catch((err) => console.log(err))
  }

  



  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Accept", label: "Accept" },
    { value: "Complete", label: "Complete" },
    { value: "Cancel", label: "Cancel" },
  ]

  function colorSwitch(status) {
		switch (status) {
			case 'Pending':
				return 'yellow'

			case 'Accept':
				return 'green'

			case 'Complete':
				return 'green'

			case 'Cancel':
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


  // const propsData = {
  //   handleSearchQuery: handleSearchQuery,
  //   handlePDFQuery: handlePDFQuery,
  //   fetchDefalutData: fetchDefalutData,

  //   getDataApiUrl: ADMIN_GET_WITHDRAW_REQUEST_REPORT_APIVIEW,
	// 	fetchReportPDF: ADMIN_GET_WITHDRAW_REQUEST_REPORT_GENERATE_PDF_APIVIEW,

  //   updateFilterQUery: updateFilterQUery,
  //   filterQuery: filterQuery,

  //   statusOptions: statusOptions,
  //   selectboxData: selectAccountWallet,
  //   // selectboxRider: selectboxRider,

  //   statusOptionPlaceholder: "Status",
  //   selectOptionKey: "withdraw_status",
  //   reportTitle: 'Withdraw Request Report',
  //   reportFileName: 'Withdraw Request Report',
  //   selectboxDataPlaceholder: 'Select Wallet Account',
  //   filterTable: 'account_wallet',
    
  // }


  const propsData = {
    DownloadPDFOrderReport: DownloadPDFOrderReport,
    resetFunction: resetFunction,

    updateFilterQUery: updateFilterQUery,
    filterQuery: filterQuery,

    reportURL: PDF_WITHDRAW_REQUEST_REPORT_APIVIEW,

    statusOptions: statusOptions,
    selectboxData: selectAccountWallet,

    filterBy: 'transection_id',
    filterByFieldName: 'Transection ID',

    statusOptionPlaceholder: "Status",
    selectOptionKey: "withdraw_status",
    reportTitle: 'Withdraw Request Report',
    reportFileName: 'Withdraw Request Report',
    selectboxDataPlaceholder: 'Select Wallet Account',
    filterTable: 'account_wallet',

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
			dataIndex: 'account_wallet',
		},
		
		{
			title: 'Previous Balance',
			dataIndex: 'balance',
		},


		{
			title: 'Withdraw Balance',
			dataIndex: 'withdraw_balance',
		},
		{
			title: 'Current Balance',
			dataIndex: 'current_balance',
		},
    {
      title: 'Status',
      dataIndex: 'withdraw_status',
      render: (text, record) => (
        <Tag color={colorSwitch(record.withdraw_status)}>{text.toUpperCase()}</Tag>
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
    fetchDefalutData()
  }, [JSON.stringify(filterQuery)])

  useEffect(() => {
    fetchWalletData()
  }, [])

  
  return (
    <>
      <ReportHead propsData={propsData} />
      <Table scroll={{ x: true }} columns={columns} dataSource={withdrawRequest} onChange={handleTableChange} pagination={tableParams.pagination} />
      {/* <div id="my-table" class="table-responsive">
        <Table bordered>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Date</th>
              <th style={{ textAlign: "center" }}>Account</th>
              <th style={{ textAlign: "center" }}>PREVIOUS BALANCE</th>
              <th style={{ textAlign: "center" }}>WITHDRAW BALANCE</th>
              <th style={{ textAlign: "center" }}>CURRENT BALANCE</th>
              <th style={{ textAlign: "center" }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {withdrawRequest &&
              withdrawRequest.map((info) => (
                <tr key={info.id}>
                  <td style={{ textAlign: "center" }}>{info.created_at}</td>
                  <td style={{ textAlign: "center" }}>{info.account_wallet}</td>
                  <td style={{ textAlign: "center" }}>{info.balance}</td>
                  <td style={{ textAlign: "center" }}>{info.withdraw_balance}</td>
                  <td style={{ textAlign: "center" }}>{info.current_balance}</td>
                  <td style={{ textAlign: "center" }}>{info.withdraw_status}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Pagination onChange={paginationUpdate} defaultCurrent={defaultPage} total={withdrawRequestCount} defaultPageSize={50} />
      </div> */}
    </>
  )
}

export default WithdrawRequestReport



