

import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, ADMIN_GET_CANCEL_ISSUE_REPORT_APIVIEW, ADMIN_GET_CANCEL_ISSUE_REPORT_GENERATE_PDF_APIVIEW, RIDER_LIST } from "../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import { Pagination } from "antd"
import * as qs from 'qs'



const GetAdminCencelIssue = () => {
  const [cancelIssueData, setCancelIssueData] = useState([])
  const [rider, setRider] = useState([])
  const [cancelOrderCount, setCancelOrderCount] = useState(0)
  const [filterQuery, setFilterQuery] = useState({})
  const [defaultPage, setDefalutPage] = useState(1)

  const defaultFetchData = () => {
    return useJwt.axiosGet(getApi(ADMIN_GET_CANCEL_ISSUE_REPORT_APIVIEW))
      .then((res) => {
        setCancelIssueData(res?.data?.results)
        setFilterQuery({})
        setDefalutPage(1)
        setCancelOrderCount(res?.data?.count)
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
      .axiosGet(getApi(ADMIN_GET_CANCEL_ISSUE_REPORT_APIVIEW) + '?' + searchTerm)
      .then((res) => {
        if (res.data?.results?.length > 0) {
          setCancelIssueData(res?.data?.results)
          setCancelOrderCount(res?.data?.count)
        } else {
          setCancelIssueData('')
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
    searchTerm = filterPerameter.startsWith("&") ? filterPerameter : filterPerameter.replace('$', '')

    return useJwt
      .axiosGet(getApi((ADMIN_GET_CANCEL_ISSUE_REPORT_GENERATE_PDF_APIVIEW) + '?' + searchTerm))
      .then((res) => {
        if (res.data?.length > 0) {
          console.log('response file', res.data)
          var file = new Blob([res.data], { type: 'application/pdf' })
          var fileName = 'Cancel_Issue_report.pdf'
          downloadPDFFile(file, fileName)
        } else {
          // setOrder('')
        }
        return res.data
      })
      .catch((err) => console.log(err))

  }
  const statusOptions = [
    { value: 'Pickup', label: 'Pickup' },
    { value: 'Delivery', label: "Delivery" },
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
    selectOptionKey: "cancel_type",
    reportTitle: 'Cancel Issue Report',
    selectboxDataPlaceholder: 'Select Rider',
    filterTable: 'rider',

  }

  useEffect(() => {
    fetchRiderData()
  }, [])

  return (
    <>
      <ReportHead propsData={propsData} />

      <div id="my-table" class="table-responsive">
        <Table bordered>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Date</th>
              <th style={{ textAlign: "center" }}>Order</th>
              <th style={{ textAlign: "center" }}>Type</th>
              <th style={{ textAlign: "center" }}>Rider</th>
              <th style={{ textAlign: "center" }}>Reason</th>
            </tr>
          </thead>
          <tbody>
            {cancelIssueData &&
              cancelIssueData.map((info) => (
                <tr key={info.id}>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info?.created_at}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info?.order}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info?.cancel_type}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info?.rider}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="align-middle fw-bold">{info?.reason}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Pagination onChange={paginationUpdate} defaultCurrent={defaultPage} total={cancelOrderCount} defaultPageSize={50} />
      </div>
    </>
  )
}

export default GetAdminCencelIssue



