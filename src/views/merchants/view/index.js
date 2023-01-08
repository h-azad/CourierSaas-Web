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
import { getApi, MARCHANT_DETAILS } from '../../../constants/apiUrls'

const MarchantView = () => {

  // ** Hooks
  const { id } = useParams()
  const [merchantInfo, setMerchantInfo] = useState(null)
  const [active, setActive] = useState('1')

  useEffect(() => {
    console.log(id)
    useJwt
      .axiosGet(getApi(MARCHANT_DETAILS) + id + "/")
      .then((res) => {
        console.log("res", res.data)
        setMerchantInfo(res.data.data)
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
      {merchantInfo &&
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={merchantInfo} />
          {/* <PlanCard /> */}
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} userInfo={merchantInfo} />
        </Col>
      </Row>
      }
    </div>
  )
}
export default MarchantView
