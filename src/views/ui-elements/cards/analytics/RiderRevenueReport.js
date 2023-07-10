// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'
import Chart from 'react-apexcharts'
import { Select } from 'antd'

// ** Reactstrap Imports
import { Row, Col, Card, CardTitle, UncontrolledButtonDropdown } from 'reactstrap'

const RiderRevenueReport = props => {
console.log('props', props.transactionOverViewSeriesData)
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
        name: 'Transaction',
        data: [
          props?.transactionOverViewSeriesData?.January,
          props?.transactionOverViewSeriesData?.February,
          props?.transactionOverViewSeriesData?.March,
          props?.transactionOverViewSeriesData?.April,
          props?.transactionOverViewSeriesData?.May,
          props?.transactionOverViewSeriesData?.June,
          props?.transactionOverViewSeriesData?.July,
          props?.transactionOverViewSeriesData?.August,
          props?.transactionOverViewSeriesData?.September,
          props?.transactionOverViewSeriesData?.October,
          props?.transactionOverViewSeriesData?.November,
          props?.transactionOverViewSeriesData?.December
        ]
      },

    ]


  return (
    <Card className='card-revenue-budget'>
      <Row className='mx-0'>
        <Col className='revenue-report-wrapper' md='9' xs='12'>
          <div className='d-sm-flex justify-content-between align-items-center mb-3'>
            <CardTitle className='mb-50 mb-sm-0'>Transaction</CardTitle>
            <div className='d-flex align-items-center'>
              <div className='d-flex align-items-center me-2'>
                <span className='bullet bullet-primary me-50 cursor-pointer'></span>
                <span>Transaction</span>
              </div>
            </div>
          </div>
          <Chart id='revenue-report-chart' type='bar' height='200' options={revenueOptions} series={revenueSeries} />
        </Col>
        <Col className='budget-wrapper' md='3' xs='12'>
          <UncontrolledButtonDropdown >
            <Select
              labelInValue
              defaultValue={{
                value: currentYear,
                label: currentYear,
              }}
              onChange={(e) => { props.fetchTransactionOverViewFilterData(e.value) }}
              options={selectYear}
            />
          </UncontrolledButtonDropdown>
          <div className='d-flex justify-content-center'>
            {/* <span>This Year:</span> */}
            <span>{props?.thisYearTransaction}</span>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

export default RiderRevenueReport
