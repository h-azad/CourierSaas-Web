// ** React Imports
import { useContext } from 'react'
import { Users, Package, Truck, Home, Send } from 'react-feather'
// ** Icons Imports
import { List } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'
import Timeline from '@components/timeline'
import AvatarGroup from '@components/avatar-group'
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { User, UserCheck, UserPlus, UserX } from "react-feather"
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
// ** Utils
import { kFormatter } from '@utils'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

// ** Demo Components
import InvoiceList from '@src/views/apps/invoice/list'
import Sales from '@src/views/ui-elements/cards/analytics/Sales'
import AvgSessions from '@src/views/ui-elements/cards/analytics/AvgSessions'
import CardAppDesign from '@src/views/ui-elements/cards/advance/CardAppDesign'
import SupportTracker from '@src/views/ui-elements/cards/analytics/SupportTracker'
import OrdersReceived from '@src/views/ui-elements/cards/statistics/OrdersReceived'
import SubscribersGained from '@src/views/ui-elements/cards/statistics/SubscribersGained'
import CardCongratulations from '@src/views/ui-elements/cards/advance/CardCongratulations'
import RiderRevenueReport from '@src/views/ui-elements/cards/analytics/RiderRevenueReport'
// ** Images
import jsonImg from '@src/assets/images/icons/json.png'
import ceo from '@src/assets/images/portrait/small/avatar-s-9.jpg'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  RIDER_DASHBOARD,
  FILTER_BY_YEAR_TRANSACTION_OVERVIEW,
} from '../../../constants/apiUrls'

import { useEffect, useState } from "react"
const AnalyticsDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors)

  const [responseData, setResponseData] = useState({})
  const [completeDelivery, setCompleteDelivery] = useState([])
  const [pendingDelivery, setPendingDelivery] = useState([])
  const [completePickup, setCompletePickup] = useState([])
  const [pendingPickup, setPendingPickup] = useState([])
  const [walletBalance, setWalletBalance] = useState([])
  const [totalTransaction, setTotalTransaction] = useState([])
  const [thisYearTransaction, setThisYearTransaction] = useState([])


  const [comparisonEarningData, setComparisonEarningData] = useState({ comparisonEarningData: [0, 0], currentMonth: 0, labels: [] })
  const [transactionOverView, setTransactionOverView] = useState({ January: 0 })



  const fetchTransactionOverViewFilterData = (year) => {
    return useJwt
      .axiosGet(getApi(FILTER_BY_YEAR_TRANSACTION_OVERVIEW)+'/' + year + "/")
      .then((res) => {
        setTransactionOverView(res?.data?.year_wise_Transection)
        setThisYearTransaction(res.data.this_year_transaction)
      })
      .catch((err) => console.log(err))
  }


  const fetchCompleteOrderList = () => {
    return useJwt.axiosGet(getApi(RIDER_DASHBOARD))
      .then((res) => {
        console.log('data', res.data)
        setCompletePickup(res.data.complete_pickup)
        setPendingPickup(res.data.pending_pickup)

        setCompleteDelivery(res.data.complete_delivery)
        setPendingDelivery(res.data.pending_delivery)

        setWalletBalance(res.data.wallet_balance)
        setTotalTransaction(res.data.total_transaction)
        setThisYearTransaction(res.data.total_transaction)

        setComparisonEarningData({
          comparisonEarningData: [res.data.current_month_transaction, res.data.privious_month_transaction], 
          currentMonth: res.data.current_month_transaction, 
          labels: ['Current Month', ['Privious Month']]
        })

        setTransactionOverView(res?.data?.current_year_Transection)
        return true
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchCompleteOrderList()
  }, [])

  // ** Vars
  const avatarGroupArr = [
    {
      imgWidth: 33,
      imgHeight: 33,
      title: 'Billy Hopkins',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: 'Amy Carson',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-6.jpg').default
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: 'Brandon Miles',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-8.jpg').default
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: 'Daisy Weber',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-7.jpg').default
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: 'Jenny Looper',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default
    }
  ]
  const data = [
    {
      title: '12 Invoices have been paid',
      content: 'Invoices have been paid to the company.',
      meta: '',
      metaClassName: 'me-1',
      customContent: (
        <div className='d-flex align-items-center'>
          <img className='me-1' src={jsonImg} alt='data.json' height='23' />
          <span>data.json</span>
        </div>
      )
    },
    {
      title: 'Client Meeting',
      content: 'Project meeting with john @10:15am.',
      meta: '',
      metaClassName: 'me-1',
      color: 'warning',
      customContent: (
        <div className='d-flex align-items-center'>
          <Avatar img={ceo} />
          <div className='ms-50'>
            <h6 className='mb-0'>John Doe (Client)</h6>
            <span>CEO of Infibeam</span>
          </div>
        </div>
      )
    },
    {
      title: 'Create a new project for client',
      content: 'Add files to new design folder',
      color: 'info',
      meta: '',
      metaClassName: 'me-1',
      customContent: <AvatarGroup data={avatarGroupArr} />
    },
    {
      title: 'Create a new project for client',
      content: 'Add files to new design folder',
      color: 'danger',
      meta: '',
      metaClassName: 'me-1'
    }
  ]

  return (
    <div id='dashboard-analytics'>

      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Complete Delivery"
            icon={<Truck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{completeDelivery}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Pending Delivery"
            icon={<Truck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{pendingDelivery}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Complete Pickup"
            icon={<Truck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{completePickup}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending Pickup"
            icon={<Truck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{pendingPickup}</h3>}
          />
        </Col>
      </Row>

      <Row className='match-height'>
        <Col lg='5' md='12'>
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

        <Col lg='7' md='12'>
          <RiderRevenueReport thisYearTransaction={thisYearTransaction} fetchTransactionOverViewFilterData={fetchTransactionOverViewFilterData} transactionOverViewSeriesData={transactionOverView} primary={colors.primary.main} warning={colors.warning.main} />
        </Col>
      </Row>

    </div>
  )
}

export default AnalyticsDashboard
