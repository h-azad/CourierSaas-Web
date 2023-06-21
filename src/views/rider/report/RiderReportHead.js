import { React, useState, useEffect } from 'react'
import { DatePicker, Select, Button, Input } from 'antd'
import { FilePptOutlined, FileExcelOutlined } from '@ant-design/icons'
const { RangePicker } = DatePicker
import { useForm } from "react-hook-form"
import classNames from "classnames"
import * as qs from 'qs'
import dayjs from 'dayjs'

const ReportHead = ({ handleSearchQuery, handlePDFQuery, defaultFetchOrderData, statusOptions, selectOptionKey, reportTitle }) => {
	const [filterQuery, setFilterQuery] = useState({})
	const { watch } = useForm()
	const { Search } = Input


	useEffect(() => {
		console.log(qs.stringify(filterQuery))
	}, [filterQuery])

	function onSelectDate(date, dateString) {

		console.log(date, dateString)
		if (dateString.find(x => x != '')){
			updateFilterQUery('date', dateString.toString())
		}else{
			updateFilterQUery('date', '')
		}
	}

	function updateFilterQUery(term, value) {
		let filters = { ...filterQuery }
		
		if (value){
			filters[term] = value
		}else{
		 	filters.hasOwnProperty(term) && delete filters[term]
		}

		console.log(filters)


		setFilterQuery(filters)
	}


	
	
	function submitFilter(e){
		e.preventDefault()
		handleSearchQuery(qs.stringify(filterQuery))
	}

	function submitPDFFilter(e) {
		e.preventDefault()
		handleSearchQuery(qs.stringify(filterQuery))
		handlePDFQuery(qs.stringify(filterQuery))
	}

	const rangePresets = [
		{
			label: 'Last 7 Days',
			value: [dayjs().add(-7, 'd'), dayjs()],
		},
		{
			label: 'Last 14 Days',
			value: [dayjs().add(-14, 'd'), dayjs()],
		},
		{
			label: 'Last 30 Days',
			value: [dayjs().add(-30, 'd'), dayjs()],
		},
		{
			label: 'Last 90 Days',
			value: [dayjs().add(-90, 'd'), dayjs()],
		},
	]


	return (
		<div className='report_head_wrapper mt-1'>

			<div className='row'>
				<div className='col-lg-3'>{ reportTitle }</div>
				<div className='col-lg-9'>

					<div className='row g-1'>
						<div className='col-lg-4'>
							<Search
								placeholder="eg. ODR23031301d6"
								onChange={(e) => {
									updateFilterQUery("search", e.target.value)

								}}
								allowClear={true}
							/>
						</div>

						<div className="col-lg-4">
							<Select
								style={{
									width: '100%',
								}}
								
								id="status"
								name="status"
								placeholder="Select Order Status"
								isClearable={true}
								className={classNames("react-select")}
								classNamePrefix="select"
								onChange={(e) => {
									updateFilterQUery(selectOptionKey, e)
								}}
								options={statusOptions}
								allowClear={true}
							/>
						</div>

						<div className='col-lg-4'>
							<RangePicker presets={rangePresets} onChange={onSelectDate} />
						</div>
					</div>
				</div>
			</div>
			<div className='row mt-3'>
				<div className='row'>
					<div className='col-6'>

					</div>
					<div className='d-flex justify-content-end align-items-center gap-1 mb-2 col-6'>
						<div className=''><Button type="primary" onClick={submitFilter} size={20}>
							Filter
						</Button></div>
						<div className=''><Button type="primary" onClick={defaultFetchOrderData} danger size={20}>
							Reset
						</Button></div>
						<div className=''><Button type="primary" onClick={submitPDFFilter} icon={<FilePptOutlined />} size={20}>
							Export To PDF
						</Button></div>
						{/* <div className=''><Button type="primary" icon={<FileExcelOutlined />} size={20}>
							Export To Excel
						</Button></div> */}
					</div>
				</div>

			</div>
		</div>
	)
}

export default ReportHead
