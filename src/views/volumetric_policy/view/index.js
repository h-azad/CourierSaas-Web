// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useJwt from '@src/auth/jwt/useJwt'
// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
// import PlanCard from './PlanCard'
import UserInfoCard from './UserInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { getApi, PRICING_POLICY_DETAILS } from '../../../constants/apiUrls'

const PricingPolicyView = () => {

  // ** Hooks
  const { id } = useParams()

  const [pricingPolicyInfo, setpricingPolicyInfo] = useState(null)
  
  const [active, setActive] = useState('1')

  useEffect(() => {
    console.log(id)
    useJwt
      .axiosGet(getApi(PRICING_POLICY_DETAILS) + id + "/")
      .then((res) => {
        console.log("res", res.data)
        setpricingPolicyInfo(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }, [])

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return  (
    <div className='app-user-view'>
      {pricingPolicyInfo &&
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
            <UserInfoCard selectedUser={pricingPolicyInfo} />
          {/* <PlanCard /> */}
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <UserTabs active={active} toggleTab={toggleTab} userInfo={pricingPolicyInfo} />
        </Col>
      </Row>
      }
    </div>
  )
}
export default PricingPolicyView
