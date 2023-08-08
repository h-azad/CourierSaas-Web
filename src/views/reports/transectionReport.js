

import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, ADMIN_GET_TRANSECTION_REPORT_APIVIEW, ADMIN_GET_TRANSECTION_REPORT_GENERATE_PDF_APIVIEW, ACCOUNT_WALLET_LIST } from "../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import { Pagination } from "antd"
import * as qs from 'qs'

const AdminGetTransectionReport = () => {
    const [transections, setTransections] = useState([])
    const [selectBoxUser, setSelectBoxUser] = useState([])
    const [transactionCount, setTransactionCount] = useState(0)
	const [filterQuery, setFilterQuery] = useState({})
	const [defaultPage, setDefalutPage] = useState(1)

    const defaultFetchData = () => {
        return useJwt.axiosGet(getApi(ADMIN_GET_TRANSECTION_REPORT_APIVIEW))
            .then((res) => {
                setFilterQuery({})
				setDefalutPage(1)
				setTransections(res?.data?.results)
				setTransactionCount(res?.data?.count)
            }).catch((err) => {
                setTransections([])
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

    useEffect(() => {
		defaultFetchData()
		fetchUserData()
	}, [])


    const handleSearchQuery = searchTerm => {
        return useJwt
            .axiosGet(getApi(ADMIN_GET_TRANSECTION_REPORT_APIVIEW) + '?' + searchTerm)
            .then((res) => {
                if (res.data.results?.length > 0) {
                    setTransections(res?.data?.results)
                    setTransactionCount(res?.data?.count)
                } else {
                    setTransections([])
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
            .axiosGet(getApi((ADMIN_GET_TRANSECTION_REPORT_GENERATE_PDF_APIVIEW) + '?' + searchTerm))
            .then((res) => {
                if (res.data?.length > 0) {
                    var file = new Blob([res.data], { type: 'application/pdf' })
                    var fileName = 'transactions_report.pdf'
                    downloadPDFFile(file, fileName)
                } else {
                }
                return res.data
            })
            .catch((err) => console.log(err))
    }

    const statusOptions = [
        { value: "Cash-Out", label: "Cash-Out" },
        { value: "Cash-In", label: "Cash-In" },
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
        selectboxData: selectBoxUser,

        statusOptionPlaceholder: "Transaction Type",
        selectOptionKey: "type",
        reportTitle: 'Transactions Report',
        selectboxDataPlaceholder: 'Select Wallet Account',
        filterTable: 'wallet',

    }

    
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
            </div>
        </>
    )
}

export default AdminGetTransectionReport



