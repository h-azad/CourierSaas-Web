import { React } from 'react'
// import { DatePicker, Select, Button, Input } from 'antd'
import { DatePicker, Select, Button, Input, Card, Form, Col, Row, Space, Divider } from 'antd'
import { FilePptOutlined, FileExcelOutlined } from '@ant-design/icons'
const { RangePicker } = DatePicker
import classNames from "classnames"
import * as qs from 'qs'
import dayjs from 'dayjs'

const ReportHead = ({ propsData }) => {
	const { Search } = Input

	function onSelectDate(date, dateString) {
		if (dateString.find(x => x != '')) {
			propsData.updateFilterQUery(propsData?.filterByDate, dateString.toString())
		} else {
			propsData.updateFilterQUery(propsData?.filterByDate, '')
		}
	}

	function DownloadPDF(e) {
		e.preventDefault()
		propsData.DownloadPDFOrderReport(
			propsData.reportURL,
			qs.stringify(propsData.filterQuery),
			propsData.reportFileName
		)
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
			<Card
				title={propsData?.reportTitle}
				bordered={false}
			>
				<Form>
					<Row gutter={24}>
						<Col span={12}>
							<Form.Item label={propsData?.filterByFieldName} name="search">
								<Search
									placeholder="eg. ODR23031301d6"
									onChange={(e) => {
										propsData.updateFilterQUery(propsData?.filterBy, e.target.value)

									}}
									allowClear={true}
								/>
							</Form.Item>

							<Form.Item label={propsData?.statusOptionPlaceholder} name="order_type">
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
										propsData.updateFilterQUery(propsData.selectOptionKey, e)
									}}
									options={propsData?.statusOptions}
									allowClear={true}
								/>
							</Form.Item>
						</Col>

						<Col span={12}>
							<Form.Item label="Filter by Date" name="date_filter">
								<RangePicker presets={rangePresets} onChange={onSelectDate} />
							</Form.Item>

							<Space>
								<Button type='primary' htmlType="reset" onClick={(e) => { propsData?.resetFunction() }} danger size={20}>
									Reset
								</Button>
							</Space>

						</Col>
					</Row>
				</Form>
			</Card>
			<Divider ></Divider>
			<Row justify={'end'}>
				<Col>
					<Space style={{ 'padding': '10px 0px' }}>
						<Button type="primary" onClick={DownloadPDF} icon={<FilePptOutlined />} size={20}>
							Export To PDF
						</Button>
					</Space>
				</Col>
			</Row>

		</div>
	)
}

export default ReportHead
