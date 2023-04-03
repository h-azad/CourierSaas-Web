import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useJwt from '@src/auth/jwt/useJwt'
import { Row, Col, Alert } from 'reactstrap'
import UserTabs from './Tabs'
import '@styles/react/apps/app-users.scss'
import { getApi, CREATE_ORDER_DETAILS } from '../../../../constants/apiUrls'

const MarchantOrderView = () => {
  const { id } = useParams()

  const [createOrderInfo, setCreateOrderInfo] = useState(null)
  
  const [active, setActive] = useState('1')

  useEffect(() => {
    console.log(id)
    useJwt
      .axiosGet(getApi(CREATE_ORDER_DETAILS) + id + "/")
      .then((res) => {
        setCreateOrderInfo(res.data)
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
      {createOrderInfo &&
      <Row>
          
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <UserTabs active={active} toggleTab={toggleTab} userInfo={createOrderInfo} />
        </Col>
      </Row>
      }
    </div>
  )
}
export default MarchantOrderView
