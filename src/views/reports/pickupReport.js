

// import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, ADMIN_GET_PICKUP_REPORT_APIVIEW, ADMIN_GET_PICKUP_REPORT_GENERATE_PDF_APIVIEW, RIDER_LIST } from "../../constants/apiUrls"
import ReportHead from "./ReportHead"
import React from 'react'
import { Table, Tag } from "antd"
import * as qs from 'qs'
import { colorSwitch } from "../../components/orderRelatedData"
import { handlePDFQuery, handleSearchQuery } from "../../components/reportRelatedData"


const GetAdminPickupReport = () => {
  const [pickup, setPickup] = useState([])
  const [rider, setRider] = useState([])
  const [filterQuery, setFilterQuery] = useState({})

  const fetchDefalutData = () => {
    return useJwt.axiosGet(getApi(ADMIN_GET_PICKUP_REPORT_APIVIEW))
      .then((res) => {
        setPickup(res?.data?.results)
        setFilterQuery({})
      }).catch((err) => {
        setPickup([])
        setFilterQuery({})
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

  useEffect(() => {
    fetchRiderData()
  }, [])


  const statusOptions = [
    { value: true, label: "Picked" },
    { value: 'false', label: "Pendding" },
  ]

  function statusOptionsColorSwitch(option) {
    switch (option) {
      case 'Picked':
        return 'green'

      case 'Unpicked':
        return 'yellow'

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

  useEffect(() => {
    handleSearchQuery(ADMIN_GET_PICKUP_REPORT_APIVIEW, qs.stringify(filterQuery))
      .then(res => {
        if (res?.results?.length > 0) {
          setPickup(res?.results)
        } else {
          setPickup([])
        }
      })
  }, [filterQuery])


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


  const propsData = {
    handleSearchQuery: handleSearchQuery,
    handlePDFQuery: handlePDFQuery,
    fetchDefalutData: fetchDefalutData,

    getDataApiUrl: ADMIN_GET_PICKUP_REPORT_APIVIEW, 
		fetchReportPDF: ADMIN_GET_PICKUP_REPORT_GENERATE_PDF_APIVIEW,

    updateFilterQUery: updateFilterQUery,
    filterQuery: filterQuery,

    statusOptions: statusOptions,
    selectboxData: rider,

    statusOptionPlaceholder: "Status",
    selectOptionKey: "pickup_status",
    reportTitle: 'Pickup Report',
    reportFileName: 'Pickup Report',
    selectboxDataPlaceholder: 'Select Rider',
    filterTable: 'pickup_rider',

  }

  const columns = [
		{
			title: 'Date',
			dataIndex: 'pickup_date',

			sorter: {
				compare: (a, b) => a.created_at - b.created_at,
				multiple: 2,
			},
		},
    {
			title: 'Rider',
			dataIndex: 'pickup_rider',

		},
		{
			title: 'Order ID',
			dataIndex: 'parcel_id',

		},

		{
			title: 'Status',
			dataIndex: 'status',
			render: (text, record) => (
				<Tag color={colorSwitch(record.status)}>{text.toUpperCase()}</Tag>
			),
		},
		{
			title: 'Pickup',
			dataIndex: 'pickup_status',
			render: (text, record) => (
				<Tag color={statusOptionsColorSwitch(record.pickup_status)}>{text.toUpperCase()}</Tag>
			),
			
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
		},
		{
			title: 'Address',
			dataIndex: 'pickup_address',
		},
	]


  

  return (
    <>
      <ReportHead propsData={propsData} />
      <Table scroll={{ x: true }} columns={columns} dataSource={pickup} onChange={onChangeSorter} pagination={{ defaultPageSize: 50 }} />

      {/* <div id="my-table" class="table-responsive">
        <Table bordered>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Pickup Date</th>
              <th style={{ textAlign: "center" }}>Rider</th>
              <th style={{ textAlign: "center" }}>Order ID</th>
              <th style={{ textAlign: "center" }}>Status</th>
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
      </div> */}
    </>
  )
}

export default GetAdminPickupReport



