

import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, ADMIN_GET_WITHDRAW_REQUEST_REPORT_APIVIEW, ADMIN_GET_WITHDRAW_REQUEST_REPORT_GENERATE_PDF_APIVIEW, ACCOUNT_WALLET_LIST } from "../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'




const AdminGetWithdrawRequestReport = () => {
    const [withdrawRequest, setWithdrawRequest] = useState([])
    const [selectAccountWallet, setselectAccountWallet] = useState([])
    console.log("selectAccountWallet", selectAccountWallet)
    // const [selectboxRider, setSelectboxRider] = useState([])

    const defaultFetchData = () => {
        return useJwt.axiosGet(getApi(ADMIN_GET_WITHDRAW_REQUEST_REPORT_APIVIEW))
            .then((res) => {
                console.log('response data', res.data)
                setWithdrawRequest(res.data)
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
        console.log('yes i am workgin searchTerm', searchTerm)
        return useJwt
            .axiosGet(getApi(ADMIN_GET_WITHDRAW_REQUEST_REPORT_APIVIEW) + '?' + searchTerm)
            .then((res) => {
                if (res.data?.length > 0) {
                    setWithdrawRequest(res.data)
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

        return useJwt
            .axiosGet(getApi((ADMIN_GET_WITHDRAW_REQUEST_REPORT_GENERATE_PDF_APIVIEW) + '?' + searchTerm))
            .then((res) => {
                if (res.data?.length > 0) {
                    // setOrder(res.data)
                    console.log('response file', res.data)
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

    const propsData = {
        handleSearchQuery: handleSearchQuery,
        handlePDFQuery: handlePDFQuery,
        defaultFetchData: defaultFetchData,

        statusOptions: statusOptions,
        selectboxData: selectAccountWallet,
        // selectboxRider: selectboxRider,

        statusOptionPlaceholder: "Transection Type",
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
                            <th style={{ textAlign: "center" }}>Account</th>
                            <th style={{ textAlign: "center" }}>PREVIOUS BALANCE</th>
                            <th style={{ textAlign: "center" }}>WITHDRAW BALANCE</th>
                            <th style={{ textAlign: "center" }}>CURRENT BALANCE</th>
                            <th style={{ textAlign: "center" }}>STATUS</th>
                            <th style={{ textAlign: "center" }}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {withdrawRequest &&
                            withdrawRequest.map((info) => (
                                <tr key={info.id}>
                                    <td style={{ textAlign: "center" }}>{info.account_wallet}</td>
                                    <td style={{ textAlign: "center" }}>{info.balance}</td>
                                    <td style={{ textAlign: "center" }}>{info.withdraw_balance}</td>
                                    <td style={{ textAlign: "center" }}>{info.current_balance}</td>
                                    <td style={{ textAlign: "center" }}>{info.withdraw_status}</td>
                                    <td style={{ textAlign: "center" }}>{info.created_at}</td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default AdminGetWithdrawRequestReport



