

import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, ADMIN_GET_WITHDRAW_REQUEST_REPORT_APIVIEW, ADMIN_GET_WITHDRAW_REQUEST_REPORT_GENERATE_PDF_APIVIEW, ACCOUNT_WALLET_LIST } from "../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'

import { Pagination } from "antd"
import * as qs from 'qs'

const AdminGetWithdrawRequestReport = () => {
    const [withdrawRequest, setWithdrawRequest] = useState([])
    const [selectAccountWallet, setselectAccountWallet] = useState([])
    const [withdrawRequestCount, setWithdrawRequestCount] = useState(0)
    const [filterQuery, setFilterQuery] = useState({})
    const [defaultPage, setDefalutPage] = useState(1)

    const defaultFetchData = () => {
        return useJwt.axiosGet(getApi(ADMIN_GET_WITHDRAW_REQUEST_REPORT_APIVIEW))
            .then((res) => {
                setWithdrawRequest(res?.data?.results)
                setFilterQuery({})
                setDefalutPage(1)
                setWithdrawRequestCount(res?.data?.count)
            }).catch((err) => {
                console.log(err)
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



    const handleSearchQuery = searchTerm => {
        return useJwt
            .axiosGet(getApi(ADMIN_GET_WITHDRAW_REQUEST_REPORT_APIVIEW) + '?' + searchTerm)
            .then((res) => {
                if (res.data?.results?.length > 0) {
                    setWithdrawRequest(res?.data?.results)
                    setWithdrawRequestCount(res?.data?.count)
                } else {
                    setWithdrawRequest('')
                }
                return res.data
            })
            .catch((err) => console.log(err))
    }


    function downloadPDFFile(file, fileName) {
        var blob = new Blob([file], { type: 'application/pdf' })
        var url = URL.createObjectURL(blob)
        var link = document.createElement('a')
        link.href = url
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    const handlePDFQuery = (searchTerm) => {

        const regex = /&([^&]+)/g 
        const pageRemoveToQuery = searchTerm.match(regex)
        const filterPerameter = pageRemoveToQuery ? pageRemoveToQuery.join('') : ''
		searchTerm = filterPerameter.startsWith("&") ? filterPerameter: filterPerameter.replace('$', '')
        
        return useJwt
            .axiosGet(getApi((ADMIN_GET_WITHDRAW_REQUEST_REPORT_GENERATE_PDF_APIVIEW) + '?' + searchTerm))
            .then((res) => {
                if (res.data?.length > 0) {
                    var file = new Blob([res.data], { type: 'application/pdf' })
                    var fileName = 'withdrawRequest_report.pdf'
                    downloadPDFFile(file, fileName)
                } else {
                    // setOrder('')
                }
                return res.data
            })
            .catch((err) => console.log(err))

    }

    const statusOptions = [
        { value: "Pending", label: "Pending" },
        { value: "Accept", label: "Accept" },
        { value: "Complete", label: "Complete" },
        { value: "Cancel", label: "Cancel" },
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

    useEffect(() => {
        handleSearchQuery(qs.stringify(filterQuery))
    }, [filterQuery])

    const paginationUpdate = (page) => {
        updateFilterQUery("page", page)
    }

    const propsData = {
        handleSearchQuery: handleSearchQuery,
        handlePDFQuery: handlePDFQuery,
        defaultFetchData: defaultFetchData,

        updateFilterQUery: updateFilterQUery,
        filterQuery: filterQuery,

        statusOptions: statusOptions,
        selectboxData: selectAccountWallet,
        // selectboxRider: selectboxRider,

        statusOptionPlaceholder: "Status",
        selectOptionKey: "withdraw_status",
        reportTitle: 'Withdraw Request Report',
        selectboxDataPlaceholder: 'Select Wallet Account',
        filterTable: 'account_wallet',

    }

    useEffect(() => {
        defaultFetchData()
        fetchWalletData()
    }, [])

    return (
        <>
            <ReportHead propsData={propsData} />

            <div id="my-table" class="table-responsive">
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
            </div>
        </>
    )
}

export default AdminGetWithdrawRequestReport



