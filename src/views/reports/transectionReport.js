

import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, ADMIN_GET_TRANSECTION_REPORT_APIVIEW, ADMIN_GET_TRANSECTION_REPORT_GENERATE_PDF_APIVIEW, ACCOUNT_WALLET_LIST } from "../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'




const AdminGetTransectionReport = () => {
    const [transections, setTransections] = useState([])
    const [selectBoxUser, setSelectBoxUser] = useState([])
    console.log("selectBoxUser", selectBoxUser)
    // const [selectboxRider, setSelectboxRider] = useState([])

    const defaultFetchData = () => {
        return useJwt.axiosGet(getApi(ADMIN_GET_TRANSECTION_REPORT_APIVIEW))
            .then((res) => {
                console.log('response data', res.data)
                setTransections(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    const fetchUserData = () => {
        return useJwt
            .axiosGet(getApi(ACCOUNT_WALLET_LIST))
            .then((res) => {
                console.log('account', res)
                let userData = []

                res.data.map((data) => {
                    userData.push({ value: data.id, label: data.account_name })
                })

                setSelectBoxUser(userData)
                return res.data.data
            })
            .catch((err) => console.log(err))
    }



    const handleSearchQuery = searchTerm => {
        console.log('yes i am workgin searchTerm', searchTerm)
        return useJwt
            .axiosGet(getApi(ADMIN_GET_TRANSECTION_REPORT_APIVIEW) + '?' + searchTerm)
            .then((res) => {
                if (res.data?.length > 0) {
                    setTransections(res.data)
                } else {
                    setTransections('')
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
            .axiosGet(getApi((ADMIN_GET_TRANSECTION_REPORT_GENERATE_PDF_APIVIEW) + '?' + searchTerm))
            .then((res) => {
                if (res.data?.length > 0) {
                    // setOrder(res.data)
                    console.log('response file', res.data)
                    var file = new Blob([res.data], { type: 'application/pdf' })
                    var fileName = 'transactions_report.pdf'
                    downloadPDFFile(file, fileName)
                } else {
                    // setOrder('')
                }
                return res.data
            })
            .catch((err) => console.log(err))

    }

    const statusOptions = [
        { value: "Cash-Out", label: "Cash-Out" },
        { value: "Cash-In", label: "Cash-In" },
    ]

    const propsData = {
        handleSearchQuery: handleSearchQuery,
        handlePDFQuery: handlePDFQuery,
        defaultFetchData: defaultFetchData,

        statusOptions: statusOptions,
        selectboxData: selectBoxUser,
        // selectboxRider: selectboxRider,

        statusOptionPlaceholder: "Transaction Type",
        selectOptionKey: "type",
        reportTitle: 'Transactions Report',
        selectboxDataPlaceholder: 'Select Wallet Account',
        filterTable: 'wallet',

    }

    useEffect(() => {
        defaultFetchData()
        fetchUserData()
    }, [])

    return (
        <>
            <ReportHead propsData={propsData} />

            <div id="my-table" class="table-responsive">
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
                                    <td>{info.created_at}</td>
                                    <td>
                                        <span className="align-middle fw-bold">{info.user_name}</span>
                                    </td>
                                    <td>{info.transection_id}</td>
                                    <td>{info.amount}</td>
                                    <td>{info.type}</td>
                                    <td>{info.remark}</td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default AdminGetTransectionReport



