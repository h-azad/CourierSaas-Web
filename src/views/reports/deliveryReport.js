

import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, ADMIN_GET_DELIVERY_REPORT_APIVIEW, ADMIN_GET_DELIVERY_REPORT_GENERATE_PDF_APIVIEW, RIDER_LIST } from "../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import { Pagination } from "antd"
import * as qs from 'qs'



const GetAdminDeliveryReport = () => {
    const [order, setOrder] = useState([])
    const [rider, setRider] = useState([])
    const [deliveryCount, setDeliveryCount] = useState(0)
	const [filterQuery, setFilterQuery] = useState({})
	const [defaultPage, setDefalutPage] = useState(1)

    const defaultFetchData = () => {
        return useJwt.axiosGet(getApi(ADMIN_GET_DELIVERY_REPORT_APIVIEW))
            .then((res) => {
                setOrder(res?.data?.results)
                setFilterQuery({})
				setDefalutPage(1)
				setDeliveryCount(res?.data?.count)
            }).catch((err) => {
                setOrder([])
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



    const handleSearchQuery = searchTerm => {
        return useJwt
            .axiosGet(getApi(ADMIN_GET_DELIVERY_REPORT_APIVIEW) + '?' + searchTerm)
            .then((res) => {
                if (res.data?.results?.length > 0) {
                    setOrder(res?.data?.results)
                    setDeliveryCount(res?.data?.count)
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

        const regex = /&([^&]+)/g 
        const pageRemoveToQuery = searchTerm.match(regex)
        const filterPerameter = pageRemoveToQuery ? pageRemoveToQuery.join('') : ''
		searchTerm = filterPerameter.startsWith("&") ? filterPerameter: filterPerameter.replace('$', '')

        return useJwt
            .axiosGet(getApi((ADMIN_GET_DELIVERY_REPORT_GENERATE_PDF_APIVIEW) + '?' + searchTerm))
            .then((res) => {
                if (res.data?.length > 0) {
                    var file = new Blob([res.data], { type: 'application/pdf' })
                    var fileName = 'Delivery_report.pdf'
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
        { value: 'false', label: "Pendding" },
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
        selectboxData: rider,
        // selectboxRider: selectboxRider,

        statusOptionPlaceholder: "Status",
        selectOptionKey: "delivery_status",
        reportTitle: 'Delivery Report',
        selectboxDataPlaceholder: 'Select Rider',
        filterTable: 'delivary_rider',
    }

    useEffect(() => {
        defaultFetchData()
        fetchRiderData()
    }, [])

    return (
        <>
            <ReportHead propsData={propsData} />

            <div id="my-table" class="table-responsive">
                <Table bordered>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>Delivery Date</th>
                            <th style={{ textAlign: "center" }}>Rider</th>
                            <th style={{ textAlign: "center" }}>Order ID</th>
                            <th style={{ textAlign: "center" }}>Status</th>
                            <th style={{ textAlign: "center" }}>Phone</th>
                            <th style={{ textAlign: "center" }}>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order &&
                            order.map((info) => (
                                <tr key={info.id}>
                                    <td style={{ textAlign: "center" }}>
                                        <span className="align-middle fw-bold">{info.delivery_date}</span>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <span className="align-middle fw-bold">{info.delivery_rider}</span>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <span className="align-middle fw-bold">{info.parcel_id}</span>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <span className="align-middle fw-bold">{info.delivery_status}</span>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <span className="align-middle fw-bold">{info.phone_number}</span>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <span className="align-middle fw-bold">{info.delivary_address}</span>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
                <Pagination onChange={paginationUpdate} defaultCurrent={defaultPage} total={deliveryCount} defaultPageSize={50} />
            </div>
        </>
    )
}

export default GetAdminDeliveryReport



