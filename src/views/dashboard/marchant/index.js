// ** React Imports
import { useContext, useState, useEffect } from 'react'
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'
import { TrendingUp, Home, Send, CheckCircle } from 'react-feather'

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

const MarchantDashboard = () => {
  const [responseData, setResponseData] = useState({})
  const [comparisonEarningData, setComparisonEarningData] = useState({comparisonEarningData:[0, 0], currentMonth:0, labels: []})
  const { colors } = useContext(ThemeColors)
  const [walletBalance, setWalletBalance] = useState([])
  const [totalTransaction, setTotalTransaction] = useState([])
  const [thisYearTransaction, setThisYearTransaction] = useState([])
  const [transactionOverView, setTransactionOverView] = useState({ January: 0 })


 
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


        return true
      })
      .catch((err) => console.log(err))
  }


  const fetchTransactionOverViewFilterData = (year) => {
    return useJwt
      .axiosGet(getApi(FILTER_BY_YEAR_TRANSACTION_OVERVIEW)+'/' + year + "/")
      .then((res) => {
        setTransactionOverView(res?.data?.year_wise_Transection)
        setThisYearTransaction(res.data.this_year_transaction)
      })
      .catch((err) => console.log(err))
  }


  useEffect(() => {
    fetchDashboardData()        
  }, [])

  return (
    <div id='dashboard-analytics'>
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
          <Row className='match-height'>
            <Col lg='12' md='6' xs='12'>
              <Earnings success={colors.success.main} data= {comparisonEarningData} />
            </Col>
          </Row>

        </Col>

        <Col lg='8' md='12'>
        <RiderRevenueReport thisYearTransaction={thisYearTransaction} fetchTransactionOverViewFilterData={fetchTransactionOverViewFilterData} transactionOverViewSeriesData={transactionOverView} primary={colors.primary.main} warning={colors.warning.main} />
        </Col>
      </Row>
    </div>
  )
}

export default MarchantDashboard
