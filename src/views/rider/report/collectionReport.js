

import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, RIDER_GET_DELIVERY_COLLECTION_REPORT, RIDER_GET_DELIVERY_REPORT_PDF } from "../../../constants/apiUrls"
import ReportHead from "./RiderReportHead"
import React from 'react'



const MarchantCollectionReport = () => {
    const [order, setOrder] = useState([])

    const defaultFetchOrderData = () => {
        return useJwt.axiosGet(getApi(RIDER_GET_DELIVERY_COLLECTION_REPORT))
            .then((res) => {
                console.log('response data', res.data)
                setOrder(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        defaultFetchOrderData()
    }, [])


    const handleSearchQuery = searchTerm => {
        return useJwt
            .axiosGet(getApi(RIDER_GET_DELIVERY_COLLECTION_REPORT) + '?' + searchTerm)
            .then((res) => {
                if (res.data?.length > 0) {
                    setOrder(res.data)
                } else {
                    setOrder('')
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
            .axiosGet(getApi((RIDER_GET_DELIVERY_REPORT_PDF) + '?' + searchTerm))
            .then((res) => {
                if (res.data?.length > 0) {
                    // setOrder(res.data)
                    console.log('response file', res.data)
                    var file = new Blob([res.data], { type: 'application/pdf' })
                    var fileName = 'orders_report.pdf'
                    downloadPDFFile(file, fileName)
                } else {
                    // setOrder('')
                }
                return res.data
            })
            .catch((err) => console.log(err))

    }

    const statusOptions = [
        { value: true, label: "Delivered" },
        { value: 'false', label: "UnDelivered" },
    ]


    return (
        <>

            <ReportHead
                handleSearchQuery={handleSearchQuery} handlePDFQuery={handlePDFQuery} defaultFetchOrderData={defaultFetchOrderData} statusOptions={statusOptions} selectOptionKey="delivery_status" reportTitle='Delivery Report'
            />

            <div id="my-table" class="table-responsive">
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Total Delivery</th>
                            <th>Total COD</th>
                            <th>Total Pre-Paid</th>
                            <th>Total Delivery Charge</th>
                            <th>Total COD</th>
                            <th>Total Collected Amount</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order &&
                            order.map((info) => (
                                <tr key={info.id}>
                                    <td>
                                        <span className="align-middle fw-bold">{info.date}</span>
                                    </td>
                                    <td>
                                        <span className="align-middle fw-bold">{info.total_delivery}</span>
                                    </td>
                                    <td>
                                        <span className="align-middle fw-bold">{info.total_cod}</span>
                                    </td>
                                    <td>
                                        <span className="align-middle fw-bold">{info.total_pre_paid}</span>
                                    </td>
                                    <td>
                                        <span className="align-middle fw-bold">{info.total_delivery_charge}</span>
                                    </td>
                                    <td>
                                        <span className="align-middle fw-bold">{info.cash_on_delivery_charge}</span>
                                    </td>
                                    <td>
                                        <span className="align-middle fw-bold">{info.total_collect_amount}</span>
                                    </td>
                                    <td>
                                        <span className="align-middle fw-bold">{info.total}</span>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default MarchantCollectionReport

