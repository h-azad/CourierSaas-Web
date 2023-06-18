import { React, useState, useEffect } from 'react'
import { DatePicker, Select, Button } from 'antd'
import { FilePptOutlined, FileExcelOutlined } from '@ant-design/icons'
const { RangePicker } = DatePicker
import { useForm } from "react-hook-form"

const ReportHead = ({ setDates, fetchSearchOrdersDataByDateRange, setDatesNumber, handleSearchReportGeneratePDF }) => {
	const { watch } = useForm()

	// const [dates, setDates] = useState(null)

	// console.log('dates', dates)

	function onSelectDate(date, dateString) {
		console.log(date, dateString)
		setDates(dateString)
	}


	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			// console.log(value, name, type)
			if (name == "date_range_by_number" && type == "change") {
				setDates(null)
			}

		})

		return () => subscription.unsubscribe()
	}, [watch])
	

	return (
		<div className='report_head_wrapper mt-1'>

			<div className='row'>
				<div className='col-lg-5'>Transction Reports</div>
				<div className='col-lg-7'>
					<div className='row g-1'>
						<div className='col-lg-4'>
							<RangePicker style={{
								width: 200,
							}}
								onChange={onSelectDate} 
								name='date_range'

								/>
						</div>

						<div className='col-lg-3'>
							<Select
								id="date_range_by_number"
								name="date_range_by_number"
								showSearch
								style={{
									width: 150,
								}}
								placeholder="Search to Select"
								optionFilterProp="children"
								filterOption={(input, option) => (option?.label ?? '').includes(input)}
								filterSort={(optionA, optionB) =>
									(optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
								}
								onChange={(e) => { setDatesNumber(e), setDates(null)} }
								options={[
									{
										value: '7',
										label: '7 Days',
									},
									{
										value: '15',
										label: '15 Days',
									},
									{
										value: '30',
										label: '30 Days',
									},
									{
										value: '90',
										label: '90 Days',
									},
								]}
							/>
						</div>
						<div className='col-lg-5 d-flex gap-1'>
							<div className=''><Button type="primary" style={{
								width: 100,
							}} onClick={fetchSearchOrdersDataByDateRange}>filter</Button></div>
							<div className=''><Button type="primary" danger style={{
								width: 100,
							}}>Reset</Button></div>
						</div>


					</div>
				</div>
			</div>
			<div className='row mt-3'>
				<div className='d-flex justify-content-end align-items-center gap-1 mb-2'>
					<div className=''><Button type="primary" onClick={handleSearchReportGeneratePDF} icon={<FilePptOutlined />} size={20}>
						Export To PDF
					</Button></div>
					<div className=''><Button type="primary" icon={<FileExcelOutlined />} size={20}>
						Export To Excel
					</Button></div>
				</div>

			</div>
		</div>
	)
}

export default ReportHead
