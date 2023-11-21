// ** React Imports
import { useContext, useState, useEffect } from 'react'
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
// ** Reactstrap Imports
import { Row, Col, Card } from 'reactstrap'
import { TrendingUp, Home, Send, CheckCircle, Truck, Box, Home as IconHome, CornerDownLeft } from 'react-feather'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Demo Components
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import RiderRevenueReport from '@src/views/ui-elements/cards/analytics/RiderRevenueReport'
// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'

import {
  getApi,
  MARCHANT_DASHBOARD,
  FILTER_BY_YEAR_TRANSACTION_OVERVIEW,
} from '../../../constants/apiUrls'

import useJwt from "@src/auth/jwt/useJwt"
import Chart from 'react-apexcharts'

import 'apexcharts/dist/apexcharts.css'
import '@styles/react/libs/charts/apex-charts.scss'

const MarchantDashboard = () => {
  const [responseData, setResponseData] = useState({})
  const [comparisonEarningData, setComparisonEarningData] = useState({ comparisonEarningData: [0, 0], currentMonth: 0, labels: [] })
  const { colors } = useContext(ThemeColors)
  const [walletBalance, setWalletBalance] = useState([])
  const [totalTransaction, setTotalTransaction] = useState([])
  const [thisYearTransaction, setThisYearTransaction] = useState([])
  const [transactionOverView, setTransactionOverView] = useState({ January: 0 })

  const [perDayOrderData, setPerDayOrderData] = useState({
    per_day_order: 0,
    per_day_pending: 0,
    per_day_picked: 0,
    per_day_warehouse: 0,
    per_day_cancelled: 0,
  })

  const [perDayDeliveryData, setPerDayDeliveryData] = useState({
    per_day_shipped: 0,
    per_day_delivered: 0,
    per_day_completed: 0,
    per_day_hold: 0,
    per_day_returned: 0,
    per_day_returned_compleate: 0,

  })

  const [perWeekData, setPerWeekData] = useState({
    weeks_order_data: [],
    weeks_complete_delivery: [],
    weeks_order_cancelled: [],
    weeks_day: [],

  })



  const fetchDashboardData = () => {
    return useJwt.axiosGet(getApi(MARCHANT_DASHBOARD))
      .then((res) => {
        setResponseData(res.data)
        setComparisonEarningData({
          comparisonEarningData: [res.data.current_month_transaction, res.data.privious_month_transaction],
          currentMonth: res.data.current_month_transaction,
          labels: ['Current Month', ['Privious Month']]
        })

        setTransactionOverView(res?.data?.current_year_Transection)
        setWalletBalance(res.data.wallet_balance)
        setTotalTransaction(res.data.total_transaction)
        setThisYearTransaction(res.data.total_transaction)

        setPerDayOrderData(res.data.per_day_order_data)
        setPerDayDeliveryData(res.data.per_day_delivery_data)

        setPerWeekData(res.data.weeks_data)

      })
      .catch((err) => console.log(err))
  }


  const fetchTransactionOverViewFilterData = (year) => {
    return useJwt
      .axiosGet(getApi(FILTER_BY_YEAR_TRANSACTION_OVERVIEW) + '/' + year + "/")
      .then((res) => {
        setTransactionOverView(res?.data?.year_wise_Transection)
        setThisYearTransaction(res.data.this_year_transaction)
      })
      .catch((err) => console.log(err))
  }



  const pieOrderData = {

    series: [
      perDayOrderData?.per_day_order,
      perDayOrderData?.per_day_pending,
      perDayOrderData?.per_day_picked,
      perDayOrderData?.per_day_warehouse,
      perDayOrderData?.per_day_cancelled
    ],

    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Orders', 'Pending', 'Picked', 'Ware House', 'Cancelled'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  }



  const pieDeliveryData = {

    series: [
      perDayDeliveryData?.per_day_shipped,
      perDayDeliveryData?.per_day_delivered,
      perDayDeliveryData?.per_day_completed,
      perDayDeliveryData?.per_day_hold,
      perDayDeliveryData?.per_day_returned,
      perDayDeliveryData?.per_day_returned_compleate,
    ],

    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Shipped', 'Delivery', 'Completed', 'Hold', 'Return', 'Compleate returned'],

      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  }



  const weekendData = {

    series: [{
      name: 'Order',
      data: perWeekData?.weeks_order_data.reverse()
    }, {
      name: 'Delivery',
      data: perWeekData?.weeks_complete_delivery.reverse()
    }, {
      name: 'Cancelled',
      data: perWeekData?.weeks_order_cancelled.reverse()
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: perWeekData?.weeks_day.reverse(),
      },
      yaxis: {
        title: {
          text: 'Last 7 Days Order Statistics'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val
          }
        }
      }
    },
  }


  useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    <div id='dashboard-analytics'>
      <Row className='match-height'>

        <Col lg='4' md='12'>
          <Row className='match-height'>
            <Col xl='6' md='6' xs='6'>
              <StatsHorizontal
                color="primary"
                statTitle="Complete"
                icon={<CheckCircle size={24} />}
                renderStats={<h3 className="fw-bolder mb-75">{responseData.complete_orders}</h3>}
              />
            </Col>
            <Col xl='6' md='6' xs='6'>
              <StatsHorizontal
                color="primary"
                statTitle="Orders"
                icon={<TrendingUp size={24} />}
                renderStats={<h3 className="fw-bolder mb-75">{responseData.orders}</h3>}
              />
            </Col>
          </Row>

          <Row className='match-height'>
            <Col lg='6' md='6' xs='12'>
              {/* <CardMedal /> */}
              <StatsHorizontal
                color="primary"
                statTitle="Wallet"
                icon={<Home size={20} />}
                renderStats={<h3 className="fw-bolder mb-75">{walletBalance}</h3>}
              />
            </Col>
            <Col lg='6' md='6' xs='12'>
              <StatsHorizontal
                color="success"
                statTitle="Transaction"
                icon={<Send size={24} />}
                renderStats={<h3 className="fw-bolder mb-75">{totalTransaction}</h3>}
              />
            </Col>
          </Row>
        </Col>

        <Col xl='8' md='12' xs='12'>
          <Row className='match-height'>
            <Col xl='3' md='3' xs='6'>
              <StatsHorizontal
                color="danger"
                statTitle="Pending"
                icon={<Box size={24} />}
                renderStats={<h3 className="fw-bolder mb-75">{responseData.pending_orders}</h3>}
              />
            </Col>
            <Col xl='3' md='3' xs='6'>
              <StatsHorizontal
                color="primary"
                statTitle="Assign Pickup"
                icon={<CheckCircle size={24} />}
                renderStats={<h3 className="fw-bolder mb-75">{responseData.assign_pickup_orders}</h3>}
              />
            </Col>
            <Col xl='3' md='3' xs='6'>
              <StatsHorizontal
                color="info"
                statTitle="Picked"
                icon={<Box size={24} />}
                renderStats={<h3 className="fw-bolder mb-75">{responseData.pickup_orders}</h3>}
              />
            </Col>
            <Col xl='3' md='3' xs='6'>
              <StatsHorizontal
                color="success"
                statTitle="WireHouse"
                icon={<IconHome size={24} />}
                renderStats={<h3 className="fw-bolder mb-75">{responseData.in_warehouse_orders}</h3>}
              />
            </Col>

            <Col xl='3' md='3' xs='6'>
              <StatsHorizontal
                color="success"
                statTitle="Shipped"
                icon={<Truck size={24} />}
                renderStats={<h3 className="fw-bolder mb-75">{responseData.shipped_orders}</h3>}
              />
            </Col>
            <Col xl='3' md='3' xs='6'>
              <StatsHorizontal
                color="primary"
                statTitle="Delivered"
                icon={<CheckCircle size={24} />}
                renderStats={<h3 className="fw-bolder mb-75">{responseData.delivered_orders}</h3>}
              />
            </Col>
            <Col xl='3' md='3' xs='6'>
              <StatsHorizontal
                color="info"
                statTitle="Hold"
                icon={<Box size={24} />}
                renderStats={<h3 className="fw-bolder mb-75">{responseData.total_hold}</h3>}
              />
            </Col>
            <Col xl='3' md='3' xs='6'>
              <StatsHorizontal
                color="primary"
                statTitle="Return Warehouse"
                icon={<CheckCircle size={24} />}
                renderStats={<h3 className="fw-bolder mb-75">{responseData.return_to_warehouse_orders}</h3>}
              />
            </Col>
            <Col xl='3' md='3' xs='6'>
              <StatsHorizontal
                color="success"
                statTitle="Returns Order"
                icon={<CornerDownLeft size={24} />}
                renderStats={<h3 className="fw-bolder mb-75">{responseData.return_orders}</h3>}
              />
            </Col>

            <Col xl='3' md='3' xs='6'>
              <StatsHorizontal
                color="info"
                statTitle="Returned Assign Driver"
                icon={<Box size={24} />}
                renderStats={<h3 className="fw-bolder mb-75">{responseData.returned_assign_to_driver}</h3>}
              />
            </Col>
            <Col xl='3' md='3' xs='6'>
              <StatsHorizontal
                color="info"
                statTitle="Returned Marchant"
                icon={<CornerDownLeft size={24} />}
                renderStats={<h3 className="fw-bolder mb-75">{responseData.returned_to_marchant}</h3>}
              />
            </Col>
            <Col xl='3' md='3' xs='6'>
              <StatsHorizontal
                color="success"
                statTitle="Returned Compleate"
                icon={<Box size={24} />}
                renderStats={<h3 className="fw-bolder mb-75">{responseData.returned_compleate}</h3>}
              />
            </Col>
          </Row>
        </Col>
      </Row>


      <Row className='match-height'>
        <Col xl='6' md='6' xs='12'>
          <Card>
            <h3 style={{ paddingTop: '20px', paddingLeft: '20px' }}>Today Order Statistics</h3>
            <Chart options={pieOrderData.options} series={pieOrderData.series} type="donut" height={300} />
          </Card>
        </Col>

        <Col xl='6' md='6' xs='12'>
          <Card>
            <h3 style={{ paddingTop: '20px', paddingLeft: '20px' }}> Today Delivery Statistics</h3>
            <Chart options={pieDeliveryData.options} series={pieDeliveryData.series} type="donut" height={300} />
          </Card>
        </Col>
      </Row>

      <Row className='match-height'>
        <Card>
          <h3 style={{ paddingTop: '20px', paddingLeft: '20px' }}>Last 7 Days Order And Delivered Statistics</h3>
          <Chart options={weekendData.options} series={weekendData.series} type="bar" height={430} />
        </Card>
      </Row>

      <Row className='match-height'>
        <Col lg='12' md='12'>
          <RiderRevenueReport thisYearTransaction={thisYearTransaction} fetchTransactionOverViewFilterData={fetchTransactionOverViewFilterData} transactionOverViewSeriesData={transactionOverView} primary={colors.primary.main} warning={colors.warning.main} />
        </Col>
      </Row>
    </div>
  )
}

export default MarchantDashboard
