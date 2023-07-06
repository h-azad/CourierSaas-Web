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
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'

import {
  getApi,
  COMPLETE_ORDER_LIST,
} from '../constants/apiUrls'


import useJwt from "@src/auth/jwt/useJwt"

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink
} from "reactstrap"
import { useEffect, useState } from "react"
const Home = () => {
  const [responseData, setResponseData] = useState({})
  const { colors } = useContext(ThemeColors)

  // ** vars
  const trackBgColor = '#e9ecef'

 
  const fetchCompleteOrderList = () => {
    return useJwt.axiosGet(getApi(COMPLETE_ORDER_LIST))
      .then((res) => {
        console.log('response is ', res.data)
        setResponseData(res.data)
        return true
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchCompleteOrderList()
  }, [])

  // console.log(responseData?.last_3_month_credited_amount?.current_month)

  return (
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
        <Col xl='2' md='3' xs='6'>
          {/* <CardMedal /> */}
          <StatsHorizontal
            color="primary"
            statTitle="Complete"
            icon={<CheckCircle size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{responseData.complete_orders}</h3>}
          />
        </Col>
        <Col xl='2' md='3' xs='6'>
          <StatsHorizontal
            color="primary"
            statTitle="Orders"
            icon={<TrendingUp size={24} />}
            renderStats={<h3 className="fw-bolder mb-75">{responseData.orders}</h3>}
          />
        </Col>
        <Col xl='8' md='6' xs='12'>
          <StatsCard responseData={responseData} cols={{ xl: '3', sm: '6' }} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='4' md='12'>
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
          <Row className='match-height'>
            <Col lg='12' md='6' xs='12'>
              {/* {responseData?.last_3_month_credited_amount} */}
              <Earnings data = {responseData?.last_3_month_credited_amount} success={colors.success.main} />
            </Col>
          </Row>

        </Col>

        <Col lg='8' md='12'>
          <RevenueReport primary={colors.primary.main} warning={colors.warning.main} />
        </Col>
      </Row>
    </div>
  )
}

export default Home
