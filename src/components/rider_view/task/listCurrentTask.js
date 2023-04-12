import React, { Fragment, useEffect, useState } from "react"
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Button } from "reactstrap"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { Cpu, User, UserCheck, UserPlus, UserX } from "react-feather"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, RIDER_CURRENT_TASK_LIST, MARCHANT_ORDER_LIST,  } from "../../../constants/apiUrls"
import TaskFilter from "./TaskFilter"
import CurrentTaskView from "./CurrentTaskView"

function CurrentTaskList() {
  const [activeTask, setActiveTask] = useState()
  const [task, setTask] = useState([])
  const [activeTaskData, setActiveTaskData] = useState(null)

  const fetchRiderTaskData = () => {
    return useJwt
      .axiosGet(getApi(RIDER_CURRENT_TASK_LIST))
      .then((res) => {
        console.log("res", res.data)
        setTask(res.data.data)
        setActiveTaskData(res.data.data[0])
        return res.data
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchRiderTaskData()
  }, [])

  useEffect(() => {
    console.log(activeTask)
    if (task && !activeTask) {
      // console.log(orders[0])
      task[0] ? setActiveTask(task[0]?.id) : null
    }
  }, [task])

  useEffect(() => {

    const activeTaskFilter = task.find((item) => item.id === activeTask)
    setActiveTaskData(activeTaskFilter)
  }, [activeTask])


  return (
    <Fragment>
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Total Users"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">21,459</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Paid Users"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">4,567</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Active Users"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">19,860</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending Users"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">237</h3>}
          />
        </Col>
      </Row>

      <Row>
        <Col sm="4">
          <Card title="Bordered">
            <CardBody>
              <TaskFilter setActiveTaskData={setActiveTaskData} task={task} setTask={setTask} activeTask={activeTask} setActiveTask={setActiveTask} /> 
            </CardBody>
          </Card>
        </Col>
        <Col sm="8">
          <Card title="Bordered">
            <CardBody>
              <CurrentTaskView activeTaskData={activeTaskData} task={task} fetchRiderTaskData={fetchRiderTaskData} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default CurrentTaskList