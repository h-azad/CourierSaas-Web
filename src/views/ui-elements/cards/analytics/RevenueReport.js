// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'
import Chart from 'react-apexcharts'
import { Select } from 'antd'

// ** Reactstrap Imports
import { Row, Col, Card, CardTitle, UncontrolledButtonDropdown } from 'reactstrap'
import { LikeOutlined } from '@ant-design/icons'

import { Statistic } from 'antd'
import React from 'react'
import CountUp from 'react-countup'
const formatter = (value) => <CountUp end={value} separator="," />


const RevenueReport = props => {

  // ** State
  const [selectYear, setSelectYear] = useState([])

  const currentYear = new Date().getFullYear()


  useEffect(() => {
    let yearArr = []
    for (let i = 0; i < 10; i++) {
      yearArr.push({ value: currentYear - i, label: currentYear - i })
    }
    setSelectYear(yearArr)
  }, [])


  const revenueOptions = {
    chart: {
      stacked: true,
      type: 'bar',
      toolbar: { show: false }
    },
    grid: {
      padding: {
        top: -20,
        bottom: -10
      },
      yaxis: {
        lines: { show: false }
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: {
          colors: '#b9b9c3',
          fontSize: '0.86rem'
        }
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    colors: [props.primary, props.warning],
    plotOptions: {
      bar: {
        columnWidth: '17%',
        borderRadius: [5]
      },
      distributed: true
    },
    yaxis: {
      labels: {
        style: {
          colors: '#b9b9c3',
          fontSize: '0.86rem'
        }
      }
    }
  },
    revenueSeries = [
      {
        name: 'Order',
        data: [
          props?.orderOverViewSeriesData?.currentYearOrders?.January,
          props?.orderOverViewSeriesData?.currentYearOrders?.February,
          props?.orderOverViewSeriesData?.currentYearOrders?.March,
          props?.orderOverViewSeriesData?.currentYearOrders?.April,
          props?.orderOverViewSeriesData?.currentYearOrders?.May,
          props?.orderOverViewSeriesData?.currentYearOrders?.June,
          props?.orderOverViewSeriesData?.currentYearOrders?.July,
          props?.orderOverViewSeriesData?.currentYearOrders?.August,
          props?.orderOverViewSeriesData?.currentYearOrders?.September,
          props?.orderOverViewSeriesData?.currentYearOrders?.October,
          props?.orderOverViewSeriesData?.currentYearOrders?.November,
          props?.orderOverViewSeriesData?.currentYearOrders?.December
        ]
      },
      {
        name: 'Delivery',
        data: [
          - props?.orderOverViewSeriesData?.currentYearDelivery?.January,
          - props?.orderOverViewSeriesData?.currentYearDelivery?.February,
          - props?.orderOverViewSeriesData?.currentYearDelivery?.March,
          - props?.orderOverViewSeriesData?.currentYearDelivery?.April,
          - props?.orderOverViewSeriesData?.currentYearDelivery?.May,
          - props?.orderOverViewSeriesData?.currentYearDelivery?.June,
          - props?.orderOverViewSeriesData?.currentYearDelivery?.July,
          - props?.orderOverViewSeriesData?.currentYearDelivery?.August,
          - props?.orderOverViewSeriesData?.currentYearDelivery?.September,
          - props?.orderOverViewSeriesData?.currentYearDelivery?.October,
          - props?.orderOverViewSeriesData?.currentYearDelivery?.November,
          - props?.orderOverViewSeriesData?.currentYearDelivery?.December
        ]
      }
    ]


  return (
    <Card className='card-revenue-budget'>
      <Row className='mx-0'>
        <Col className='revenue-report-wrapper' md='8' xs='12'>
          <div className='d-sm-flex justify-content-between align-items-center mb-3'>
            <CardTitle className='mb-50 mb-sm-0'>Order Overview</CardTitle>
            <div className='d-flex align-items-center'>
              <div className='d-flex align-items-center me-2'>
                <span className='bullet bullet-primary me-50 cursor-pointer'></span>
                <span>Order</span>
              </div>
              <div className='d-flex align-items-center'>
                <span className='bullet bullet-warning me-50 cursor-pointer'></span>
                <span>Delivery</span>
              </div>
            </div>
          </div>
          <Chart id='revenue-report-chart' type='bar' height='230' options={revenueOptions} series={revenueSeries} />
        </Col>
        <Col className='budget-wrapper' md='4' xs='12'>
          {/* <UncontrolledButtonDropdown >
            <Select
              labelInValue
              defaultValue={{
                value: currentYear,
                label: currentYear,
              }}
              onChange={(e) => { props.fetchOrderOverViewFilterData(e.value) }}
              options={selectYear}
            />
          </UncontrolledButtonDropdown>
          <h2 className='me-25'>{props?.orderOverViewSeriesData?.walletBalance}</h2>
          <div className='d-flex justify-content-center'>
            <span className='fw-bolder me-25'>This Year:</span>
            <span>{props?.orderOverViewSeriesData?.currentYearEarning}</span>
          </div> */}

          <Col span={12}>
            <Select
              labelInValue
              defaultValue={{
                value: currentYear,
                label: currentYear,
              }}
              onChange={(e) => { props.fetchOrderOverViewFilterData(e.value) }}
              options={selectYear}
            />
          </Col>
          <Col span={12}>
            <Statistic title="This Year " style={{paddingTop:80}} value={props?.orderOverViewSeriesData?.currentYearEarning} />
          </Col>

        </Col>
      </Row>
    </Card>
  )
}

export default RevenueReport
