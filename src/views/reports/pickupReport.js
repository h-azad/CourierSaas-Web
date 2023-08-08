

import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, ADMIN_GET_PICKUP_REPORT_APIVIEW, ADMIN_GET_PICKUP_REPORT_GENERATE_PDF_APIVIEW, RIDER_LIST } from "../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import { Pagination } from "antd"
import * as qs from 'qs'



const GetAdminPickupReport = () => {
    const [pickup, setPickup] = useState([])
    const [rider, setRider] = useState([])
    const [pickupCount, setPickupCount] = useState(0)
	const [filterQuery, setFilterQuery] = useState({})
	const [defaultPage, setDefalutPage] = useState(1)

    const defaultFetchData = () => {
        return useJwt.axiosGet(getApi(ADMIN_GET_PICKUP_REPORT_APIVIEW))
            .then((res) => {
                setPickup(res?.data?.results)
                setFilterQuery({})
				setDefalutPage(1)
				setPickupCount(res?.data?.count)
            }).catch((err) => {
                console.log(err)
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
            .axiosGet(getApi(ADMIN_GET_PICKUP_REPORT_APIVIEW) + '?' + searchTerm)
            .then((res) => {
                if (res.data?.results?.length > 0) {
                    setPickup(res?.data?.results)
                    setPickupCount(res?.data?.count)
                } else {
                    setPickup('')
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
            .axiosGet(getApi((ADMIN_GET_PICKUP_REPORT_GENERATE_PDF_APIVIEW) + '?' + searchTerm))
            .then((res) => {
                if (res.data?.length > 0) {
                    // setOrder(res.data)
                    console.log('response file', res.data)
                    var file = new Blob([res.data], { type: 'application/pdf' })
                    var fileName = 'Pickup_report.pdf'
                    downloadPDFFile(file, fileName)
                } else {
                    // setOrder('')
                }
                return res.data
            })
            .catch((err) => console.log(err))

    }

    const statusOptions = [
        { value: true, label: "Picked" },
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
        selectOptionKey: "pickup_status",
        reportTitle: 'Pickup Report',
        selectboxDataPlaceholder: 'Select Rider',
        filterTable: 'pickup_rider',

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
                        <th style={{ textAlign: "center" }}>Pickup Date</th>
                            <th style={{ textAlign: "center" }}>Rider</th>
                            <th style={{ textAlign: "center" }}>Order ID</th>
                            <th style={{ textAlign: "center" }}>Status</th>
                            {/* <th style={{ textAlign: "center" }}>Pickup</th> */}
                            <th style={{ textAlign: "center" }}>Phone</th>
                            <th style={{ textAlign: "center" }}>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pickup &&
                            pickup.map((info) => (
                                <tr key={info.id}>
                                    <td style={{ textAlign: "center" }}>
										<span className="align-middle fw-bold">{info.pickup_date}</span>
									</td>
									<td style={{ textAlign: "center" }}>
										<span className="align-middle fw-bold">{info.pickup_rider}</span>
									</td>
									
									<td style={{ textAlign: "center" }}>
										<span className="align-middle fw-bold">{info.parcel_id}</span>
									</td>
									{/* <td style={{ textAlign: "center" }}>
										<span className="align-middle fw-bold">{info.status}</span>
									</td> */}
									<td style={{ textAlign: "center" }}>
										<span className="align-middle fw-bold">{info.pickup_status}</span>
									</td>
									<td style={{ textAlign: "center" }}>
										<span className="align-middle fw-bold">{info.phone}</span>
									</td>
									<td style={{ textAlign: "center" }}>
										<span className="align-middle fw-bold">{info.pickup_address}</span>
									</td>
								</tr>
                            ))}
                    </tbody>
                </Table>
                <Pagination onChange={paginationUpdate} defaultCurrent={defaultPage} total={pickupCount} defaultPageSize={50} />
            </div>
        </>
    )
}

export default GetAdminPickupReport



