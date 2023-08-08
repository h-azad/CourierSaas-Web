
import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, ADMIN_GET_DELIVERY_COLLECTION_REPORT_APIVIEW, ADMIN_GET_DELIVERY_REPORT_GENERATE_PDF_APIVIEW, RIDER_LIST } from "../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import { Pagination } from "antd"
import * as qs from 'qs'


const AdminGetCollectionReport = () => {
    const [order, setOrder] = useState([])
    const [rider, setRider] = useState([])
    const [collectedCount, setCollectedCount] = useState(0)
	const [filterQuery, setFilterQuery] = useState({})
	const [defaultPage, setDefalutPage] = useState(1)

    const defaultFetchData = () => {
        return useJwt.axiosGet(getApi(ADMIN_GET_DELIVERY_COLLECTION_REPORT_APIVIEW))
            .then((res) => {
                console.log('response data', res?.data?.results)
                setOrder(res?.data?.results)
                setFilterQuery({})
				setDefalutPage(1)
				setCollectedCount(res?.data?.count)
            }).catch((err) => {
                console.log(err)
            })
    }

    const fetchRiderData = () => {
        return useJwt
            .axiosGet(getApi(RIDER_LIST))
            .then((res) => {
                console.log('RIDER_LIST', res)
                let riderData = []

                res.data.data.map((data) => {
                    riderData.push({ value: data.id, label: data.full_name })
                })

                setRider(riderData)
                return res.data.data
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        defaultFetchData()
        fetchRiderData()
    }, [])


    const handleSearchQuery = searchTerm => {
        return useJwt
            .axiosGet(getApi(ADMIN_GET_DELIVERY_COLLECTION_REPORT_APIVIEW) + '?' + searchTerm)
            .then((res) => {
                if (res.data?.results?.length > 0) {
                    setOrder(res.data?.results)
                    setCollectedCount(res?.data?.count)
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
            .axiosGet(getApi((ADMIN_GET_DELIVERY_COLLECTION_REPORT_APIVIEW_PDF) + '?' + searchTerm))
            .then((res) => {
                if (res.data?.length > 0) {
                    // setOrder(res.data)
                    console.log('response file', res.data)
                    var file = new Blob([res.data], { type: 'application/pdf' })
                    var fileName = 'collection_report.pdf'
                    downloadPDFFile(file, fileName)
                } else {
                    // setOrder('')
                }
                return res.data
            })
            .catch((err) => console.log(err))

    }

    const statusOptions = [
        { value: 'pre-paid', label: "Pre-Paid" },
        { value: 'COD', label: "COD" },
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

        statusOptionPlaceholder: "Delivery Type",
        selectOptionKey: "order_type",
        reportTitle: 'Delivery Report',
        selectboxDataPlaceholder: 'Select Rider',
        filterTable: 'delivary_rider',

    }


    return (
        <>

            <ReportHead propsData={propsData} />

            <div id="my-table" class="table-responsive">
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Total Delivery</th>
                            <th>Total COD</th>
                            <th>Total Pre-Paid</th>
                            <th>Total Delivery Charge</th>
                            {/* <th>Total COD Charge</th> */}
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
                                    {/* <td>
                                        <span className="align-middle fw-bold">{info.total_cash_on_delivery_charge}</span>
                                    </td> */}
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
                <Pagination onChange={paginationUpdate} defaultCurrent={defaultPage} total={collectedCount} defaultPageSize={50} />
            </div>
        </>
    )
}

export default AdminGetCollectionReport

