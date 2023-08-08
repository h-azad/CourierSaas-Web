import { React, useState, useEffect } from 'react'
import { DatePicker, Select, Button, Input, Card, Form, Col, Row, Space, Divider } from 'antd'
import { FilePptOutlined } from '@ant-design/icons'
const { RangePicker } = DatePicker
import { useForm } from "react-hook-form"
import classNames from "classnames"
import * as qs from 'qs'
import dayjs from 'dayjs'


const ReportHead = ({ propsData }) => {

  const [filterQuery, setFilterQuery] = useState({})

  const { Search } = Input
  const {
    formState: { errors },
  } = useForm({
    defaultValues: {

    },
  })


  // useEffect(() => {
  //   console.log(qs.stringify(filterQuery))
  // }, [filterQuery])

  function onSelectDate(date, dateString) {

    console.log(date, dateString)
    if (dateString.find(x => x != '')) {
      propsData.updateFilterQUery('date', dateString.toString())
    } else {
      propsData.updateFilterQUery('date', '')
    }
  }

  // function updateFilterQUery(term, value) {
  //   let filters = { ...filterQuery }

  //   if (value) {
  //     filters[term] = value
  //   } else {
  //     filters.hasOwnProperty(term) && delete filters[term]
  //   }
  //   setFilterQuery(filters)
  // }

  function submitFilter(e) {
    e.preventDefault()
    propsData.handleSearchQuery(qs.stringify(propsData.filterQuery))
  }

  function submitPDFFilter(e) {
    e.preventDefault()
    propsData.handleSearchQuery(qs.stringify(propsData.filterQuery))
    propsData.handlePDFQuery(qs.stringify(propsData.filterQuery))
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
              <Form.Item label="Search" name="search">
                <Search
                  placeholder="eg. ODR23031301d6"
                  onChange={(e) => {
                    propsData.updateFilterQUery("search", e.target.value)

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
              <Form.Item label={propsData?.selectboxDataPlaceholder} name="marchants">
                <Select
                  allowClear={true}
                  showSearch
                  placeholder={propsData?.selectboxDataPlaceholder}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={propsData?.selectboxData}
                  onChange={(e) => {
                    propsData.updateFilterQUery(propsData.filterTable, e)

                  }}
                />
              </Form.Item>

            </Col>

            <Col span={12}>
              <Form.Item label="Filter by Date" name="date_filter">
                <RangePicker presets={rangePresets} onChange={onSelectDate} />
              </Form.Item>

              {propsData.isOrderPageIsRider > 0 &&
                <Form.Item label="Select Rider" name="select_rider">
                  <Select
                    allowClear={true}
                    showSearch
                    placeholder="Select a Rider"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={propsData?.selectboxRider}
                    onChange={(e) => {
                      propsData.updateFilterQUery("delivary_rider", e)

                    }}
                  />
                </Form.Item>
              }

              <Space>
                <Button type="primary" onClick={submitFilter} size={20}>
                  Filter
                </Button>
                <Button type="primary" onClick={propsData?.defaultFetchData} danger size={20}>
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
            <Button type="primary" onClick={submitPDFFilter} icon={<FilePptOutlined />} size={20}>
              Export To PDF
            </Button>
          </Space>
        </Col>
      </Row>

    </div>
  )
}

export default ReportHead
