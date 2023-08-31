// ** React Imports
import { useContext } from 'react'
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'
import { TrendingUp, User, Box, DollarSign, CheckCircle, Users, Truck, CornerDownLeft } from 'react-feather'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Demo Components
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'

import {
  getApi,
  ADMIN_DASHBOARD,
  ADMIN_FILTER_ORDER_OVERVIEW,
} from '../constants/apiUrls'

import useJwt from "@src/auth/jwt/useJwt"

import { useEffect, useState } from "react"
const Home = () => {
  const [responseData, setResponseData] = useState({})
  const [comparisonEarningData, setComparisonEarningData] = useState({ comparisonEarningData: [0, 0], currentMonth: 0, labels: [] })
  const [orderOverView, setOrderOverView] = useState({ currentYearOrders: { January: 0 }, currentYearDelivery: { January: 0 }, currentYearEarning: 0 }, { walletBalance: 0 })

  const { colors } = useContext(ThemeColors)





  const fetchCompleteOrderList = () => {
    return useJwt.axiosGet(getApi(ADMIN_DASHBOARD))
      .then((res) => {
        console.log('res', res.data)
        setResponseData(res.data)
        setComparisonEarningData({
          comparisonEarningData: [res.data.comparison_earning.current_month_earning, res.data.comparison_earning.privious_month_earning],
          currentMonth: res.data.comparison_earning.current_month_earning,
          labels: ['Current Month', ['Privious Month']]
        })

        setOrderOverView({
          currentYearOrders: res.data.current_year_orders,
          currentYearDelivery: res.data.current_year_delivery,
          currentYearEarning: res.data.current_year_earning,
          walletBalance: res.data.wallet_balance
        })
        return true
      })
      .catch((err) => console.log(err))
  }


  const fetchOrderOverViewFilterData = (year) => {
    return useJwt
      .axiosGet(getApi(ADMIN_FILTER_ORDER_OVERVIEW) + '/' + year + "/")
      .then((res) => {
        setOrderOverView({
          currentYearOrders: res.data.get_year_orders,
          currentYearDelivery: res.data.get_year_delivery,
          currentYearEarning: res.data.get_year_earning,
          walletBalance: res.data.wallet_balance
        })
      })
      .catch((err) => console.log(err))
  }


  useEffect(() => {
    fetchCompleteOrderList()
  }, [])



  return (
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
        <Col lg='4' md='12'>
        <Row className='match-height'>
            <Col xl='6' md='6' xs='6'>
              <StatsHorizontal
                color="primary"
                statTitle="Complete"
                icon={<CheckCircle size={20} />}
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
                statTitle="Marchant"
                icon={<Users size={20} />}
                renderStats={<h3 className="fw-bolder mb-75">{responseData.approve_marchant}</h3>}
              />
            </Col>
            <Col lg='6' md='6' xs='12'>
              <StatsHorizontal
                color="success"
                statTitle="Rider"
                icon={<Users size={24} />}
                renderStats={<h3 className="fw-bolder mb-75">{responseData.active_rider}</h3>}
              />
            </Col>
          </Row>
        </Col>
        <Col xl='8' md='6' xs='12'>
          <StatsCard responseData={responseData} cols={{ xl: '3', sm: '6' }} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='4' md='12'>
          <Row className='match-height'>
            <Col lg='12' md='6' xs='12'>
              <Earnings success={colors.success.main} data={comparisonEarningData} />
            </Col>
          </Row>
        </Col>
        <Col lg='8' md='12'>
          <RevenueReport fetchOrderOverViewFilterData={fetchOrderOverViewFilterData} orderOverViewSeriesData={orderOverView} primary={colors.primary.main} warning={colors.warning.main} />
        </Col>
      </Row>
    </div>
  )
}

export default Home
