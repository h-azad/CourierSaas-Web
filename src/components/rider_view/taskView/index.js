import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useJwt from '@src/auth/jwt/useJwt'
import { Row, Col, Alert } from 'reactstrap'
import UserTabs from './Tabs'
import '@styles/react/apps/app-users.scss'
import { getApi, CREATE_ORDER_DETAILS } from '../../../constants/apiUrls'

const TaskView = () => {
  const { id } = useParams()
  const [taskInfo, setTaskInfo] = useState(null)
  const [active, setActive] = useState('1')
  console.log("taskInfo", taskInfo)

  useEffect(() => {
    console.log(id)
    useJwt
      .axiosGet(getApi(CREATE_ORDER_DETAILS) + id + "/")
      .then((res) => {
        setTaskInfo(res.data)
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
      {taskInfo &&
      <Row>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <UserTabs active={active} toggleTab={toggleTab} userInfo={taskInfo} />
        </Col>
      </Row>
      }
    </div>
  )
}
export default TaskView
