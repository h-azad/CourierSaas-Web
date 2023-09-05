

// import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, ADMIN_GET_WITHDRAW_REQUEST_REPORT_APIVIEW, ADMIN_GET_WITHDRAW_REQUEST_REPORT_GENERATE_PDF_APIVIEW, ACCOUNT_WALLET_LIST } from "../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'

import { Table, Tag } from "antd"
import * as qs from 'qs'

import { handlePDFQuery, handleSearchQuery } from "../../components/reportRelatedData"

const AdminGetWithdrawRequestReport = () => {
  const [withdrawRequest, setWithdrawRequest] = useState([])
  const [selectAccountWallet, setselectAccountWallet] = useState([])
  const [withdrawRequestCount, setWithdrawRequestCount] = useState(0)
  const [filterQuery, setFilterQuery] = useState({})
  const [defaultPage, setDefalutPage] = useState(1)



  const fetchDefalutData = () => {
    return useJwt.axiosGet(getApi(ADMIN_GET_WITHDRAW_REQUEST_REPORT_APIVIEW))
      .then((res) => {
        setWithdrawRequest(res?.data?.results)
        setFilterQuery({})
      }).catch((err) => {
        setWithdrawRequest([])
        setFilterQuery({})
      })
  }

  const fetchWalletData = () => {
    return useJwt
      .axiosGet(getApi(ACCOUNT_WALLET_LIST))
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

  useEffect(() => {
    handleSearchQuery(ADMIN_GET_WITHDRAW_REQUEST_REPORT_APIVIEW, qs.stringify(filterQuery))
			.then(res => {
				if (res?.results?.length > 0) {
					setWithdrawRequest(res?.results)
				} else {
					setWithdrawRequest([])
				}
			})
  }, [filterQuery])

  useEffect(() => {
    fetchDefalutData()
    fetchWalletData()
  }, [])



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

  const onChangeSorter = (pagination, filters, sorter, extra) => {
		if (sorter.order === 'ascend') {
			updateFilterQUery("ordering", sorter.field)
		} else if (sorter.order === 'descend') {
			updateFilterQUery("ordering", '-' + sorter.field)
		}
		else {
			setFilterQuery({})
		}
	}
  

  const paginationUpdate = (page) => {
    updateFilterQUery("page", page)
  }

  const propsData = {
    handleSearchQuery: handleSearchQuery,
    handlePDFQuery: handlePDFQuery,
    fetchDefalutData: fetchDefalutData,

    getDataApiUrl: ADMIN_GET_WITHDRAW_REQUEST_REPORT_APIVIEW,
		fetchReportPDF: ADMIN_GET_WITHDRAW_REQUEST_REPORT_GENERATE_PDF_APIVIEW,

    updateFilterQUery: updateFilterQUery,
    filterQuery: filterQuery,

    statusOptions: statusOptions,
    selectboxData: selectAccountWallet,
    // selectboxRider: selectboxRider,

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
			title: 'Status',
			dataIndex: 'withdraw_status',
			render: (text, record) => (
				<Tag color={colorSwitch(record.withdraw_status)}>{text.toUpperCase()}</Tag>
			),
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
	]

  
  return (
    <>
      <ReportHead propsData={propsData} />
      <Table scroll={{ x: true }} columns={columns} dataSource={withdrawRequest} onChange={onChangeSorter} pagination={{ defaultPageSize: 50 }} />
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

export default AdminGetWithdrawRequestReport



