import { React, useState, useEffect } from 'react'
import { DatePicker, Select, Button, Input } from 'antd'
import { FilePptOutlined } from '@ant-design/icons'
const { RangePicker } = DatePicker
import { useForm } from "react-hook-form"
import classNames from "classnames"
import * as qs from 'qs'
import dayjs from 'dayjs'
// import Select from "react-select"

// const ReportHead = ({pageValue, propsData.handleSearchQuery, propsData.handlePDFQuery, propsData.defaultFetchData, propsData.statusOptions, propsData.selectOptionKey, propsData.reportTitle, propsData.selectboxData, propsData.propsData.selectboxDataPlaceholder, propsData.propsData.propsData.statusOptionPlaceholder, propsData.statusOptionPlaceholder, propsData.filterTable }) => {

const ReportHead = ({propsData}) => {
	const [filterQuery, setFilterQuery] = useState({})

	const pageInfo = ["trsanction report" ,"Account Wallet"]
	console.log('propsData',propsData)

	const { watch } = useForm()
	const { Search } = Input
	const {
		formState: { errors },
	} = useForm({
		defaultValues: {

		},
	})


	useEffect(() => {
		console.log(qs.stringify(filterQuery))
	}, [filterQuery])

	function onSelectDate(date, dateString) {

		console.log(date, dateString)
		if (dateString.find(x => x != '')) {
			updateFilterQUery('date', dateString.toString())
		} else {
			updateFilterQUery('date', '')
		}
	}

	function updateFilterQUery(term, value) {
		let filters = { ...filterQuery }

		if (value) {
			filters[term] = value
		} else {
			filters.hasOwnProperty(term) && delete filters[term]
		}

		console.log(filters)


		setFilterQuery(filters)
	}




	function submitFilter(e) {
		e.preventDefault()
		propsData.handleSearchQuery(qs.stringify(filterQuery))
	}

	function submitPDFFilter(e) {
		e.preventDefault()
		propsData.handleSearchQuery(qs.stringify(filterQuery))
		propsData.handlePDFQuery(qs.stringify(filterQuery))
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

	// const onChange = (value) => {
	// 	console.log(`selected ${value}`)
	//   }
	//   const onSearch = (value) => {
	// 	console.log('search:', value)
	//   }


	return (
		<div className='report_head_wrapper mt-1'>

			<div className='row'>
				<div className='col-lg-3'>{propsData?.reportTitle}</div>
				<div className='col-lg-9'>

					<div className='row'>


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
								placeholder={propsData?.statusOptionPlaceholder}
								isClearable={true}
								className={classNames("react-select")}
								classNamePrefix="select"
								onChange={(e) => {
									updateFilterQUery(propsData.selectOptionKey, e)
								}}
								options={propsData?.statusOptions}
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
					<div className="col-lg-3 d-flex justify-content-end align-items-center gap-1 mb-2">
						<Select
							allowClear={true}
							showSearch
							placeholder="Select a Rider"
							optionFilterProp="children"
							// onChange={onChange}
							// onSearch={onSearch}
							filterOption={(input, option) =>
								(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
							}
							options={propsData?.selectboxRider}
							onChange={(e) => {
								updateFilterQUery("delivary_rider", e)

							}}
						/>
						{errors && errors.marchant && (
							<span className="invalid-feedback">
								{errors.marchant.message}
							</span>
						)}
					</div>
					<div className="col-lg-3 d-flex justify-content-end align-items-center gap-1 mb-2">
						<Select
							allowClear={true}
							showSearch
							placeholder={propsData?.selectboxDataPlaceholder}
							optionFilterProp="children"
							// onChange={onChange}
							// onSearch={onSearch}
							filterOption={(input, option) =>
								(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
							}
							options={propsData?.selectboxData}
							onChange={(e) => {
								// updateFilterQUery("marchant", e)
								updateFilterQUery(propsData.filterTable, e)

							}}
						/>
						{errors && errors.marchant && (
							<span className="invalid-feedback">
								{errors.marchant.message}
							</span>
						)}

					</div>
				</div>
				<div className='row'>

					<div className='col-6'>

					</div>
					<div className='d-flex justify-content-end align-items-center gap-1 mb-2 col-6'>
						<div className=''><Button type="primary" onClick={submitFilter} size={20}>
							Filter
						</Button></div>
						<div className=''><Button type="primary" onClick={propsData?.defaultFetchData} danger size={20}>
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
