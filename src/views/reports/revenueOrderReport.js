

import { Table } from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { getApi, ADMIN_GET_ORDER_REVENUE_REPORT_APIVIEW, ADMIN_GET_ORDER_REVENUE_REPORT_GENERATE_PDF_APIVIEW } from "../../constants/apiUrls"
import React from 'react'
import { DatePicker, Select, Button, Input, Card, Form, Col, Row, Space, Divider } from 'antd'
import classNames from "classnames"
import { FilePptOutlined } from '@ant-design/icons'
import * as qs from 'qs'

const AdminOrderRevenueReport = () => {
	const [order, setOrder] = useState([])
	const [selectYear, setSelectYear] = useState([])
	const [selectMonth, setSelectMonth] = useState([])
	const [filterQuery, setFilterQuery] = useState({})


	const handleSearchQuery = searchTerm => {
		console.log('yes i am workgin searchTerm', searchTerm)
		return useJwt
				.axiosGet(getApi(ADMIN_GET_ORDER_REVENUE_REPORT_APIVIEW) + '?' + searchTerm)
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


	useEffect(() => {
    console.log(qs.stringify(filterQuery))
  }, [filterQuery])

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

  function submitFilter(e) {
    e.preventDefault()
    handleSearchQuery(qs.stringify(filterQuery))
  }

  function submitPDFFilter(e) {
    e.preventDefault()
    handleSearchQuery(qs.stringify(filterQuery))
    handlePDFQuery(qs.stringify(filterQuery))
  }

	

	useEffect(() => {
		const currentYear = new Date().getFullYear()

		let yearArr = []
		for (let i = 0; i < 10; i++) {
			yearArr.push({ value: currentYear - i, label: currentYear - i })
		}
		setSelectYear(yearArr)

		let monthArr = []

		const date = new Date()


		for (let i = 1; i < 13; i++) {
			date.setMonth(i - 1)
			monthArr.push({ value: i, label: date.toLocaleString('en-US', { month: 'long' }) })
		}
		setSelectMonth(monthArr)

	}, [])


	const defaultFetchData = () => {
		return useJwt.axiosGet(getApi(ADMIN_GET_ORDER_REVENUE_REPORT_APIVIEW))
			.then((res) => {
				console.log('response data', res.data)
				setOrder(res.data)
			}).catch((err) => {
				console.log(err)
			})
	}





	useEffect(() => {
		defaultFetchData()
	}, [])





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
			.axiosGet(getApi((ADMIN_GET_ORDER_REVENUE_REPORT_GENERATE_PDF_APIVIEW) + '?' + searchTerm))
			.then((res) => {
				if (res.data?.length > 0) {
					// setOrder(res.data)
					console.log('response file', res.data)
					var file = new Blob([res.data], { type: 'application/pdf' })
					var fileName = 'revenue_report.pdf'
					downloadPDFFile(file, fileName)
				} else {
					// setOrder('')
				}
				return res.data
			})
			.catch((err) => console.log(err))

	}




	return (
		<>

			<div className='report_head_wrapper mt-1'>
				<Card
					title="Revenue Report"
					bordered={false}
				>
					<Form>
						<Row gutter={24}>
							<Col span={12}>
								<Form.Item label="Select Year" name="year">
									<Select
										style={{
											width: '100%',
										}}

										id="year"
										name="year"
										placeholder="Year"
										isClearable={true}
										className={classNames("react-select")}
										classNamePrefix="select"
										options={selectYear}
										allowClear={true}
										onChange={(e) => {
											updateFilterQUery('year', e)
										}}
									/>
								</Form.Item>
							</Col>

							<Col span={12}>



								<Form.Item label="Select Month" name="month">
									<Select
										allowClear={true}
										showSearch
										placeholder="Month"
										optionFilterProp="children"
										filterOption={(input, option) =>
											(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
										}
										options={selectMonth}
									onChange={(e) => {
										updateFilterQUery('month', e)

									}}
									/>
								</Form.Item>
								<Space>
                <Button type="primary" onClick={submitFilter} size={20}>
                  Filter
                </Button>
                {/* <Button type="primary" onClick={propsData?.defaultFetchData} danger size={20}>
                  Reset
                </Button> */}
              </Space>
							</Col>

						</Row>


					</Form>
				</Card>
				<Divider ></Divider>
				<Row justify={'end'}>
					<Col>
						<Space style={{ 'padding': '10px 0px' }}>
							<Button type="primary" onClick={submitPDFFilter} icon={<FilePptOutlined />} size={20}>
								Export To PDF
							</Button>
						</Space>
					</Col>
				</Row>
								
			</div>


			<div id="my-table" class="table-responsive">
				<Table bordered>
					<thead>
						<tr>
							<th>Date</th>
							<th>Order ID</th>
							<th>Delivery Charge</th>
							<th>COD Charge</th>
							<th>Deducted Amount</th>
						</tr>
					</thead>
					<tbody>
						{order &&
							order.map((info) => (
								<tr key={info.id}>
									<td>
										<span className="align-middle fw-bold">{info.delivery_date}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.parcel_id}</span>
									</td>

									<td>
										<span className="align-middle fw-bold">{info.delivary_charge}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.cash_on_delivery_charge}</span>
									</td>
									<td>
										<span className="align-middle fw-bold">{info.deducted_amount}</span>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			</div>
		</>
	)
}

export default AdminOrderRevenueReport



