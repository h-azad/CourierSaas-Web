import React, { Fragment, useEffect, useState } from "react"
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Button } from "reactstrap"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { Cpu, User, UserCheck, UserPlus, UserX } from "react-feather"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, RIDER_SEARCH_CREATE_ORDER_FILTER } from "../../../constants/apiUrls"
import TaskFilter from "./TaskFilter"
import CurrentTaskView from "./CurrentTaskView"
import * as qs from 'qs'

function CurrentTaskList() {
  const [currentTask, setCurrentTask] = useState([])
  const [orderCount, setOrderCount] = useState(0)
	const [filterQuery, setFilterQuery] = useState({})

  const handleSearchQuery = searchTerm => {
		return useJwt
			.axiosGet(getApi(RIDER_SEARCH_CREATE_ORDER_FILTER) + '?' + searchTerm)
			.then((res) => {
				if (res.data?.results) {
					setCurrentTask(res?.data?.results)
					setOrderCount(res?.data?.count)
				}
				return res.data
			})
			.catch((err) => console.log(err))
	}

	function updateFilterQUery(term, value) {
		let filters = { ...filterQuery }
		if (term != 'page') {
			filters['page'] = 1
		}

		if (value) {
			filters[term] = value
		} else {
			filters.hasOwnProperty(term) && delete filters[term]
		}
		setFilterQuery(filters)
	}

	useEffect(() => {
		handleSearchQuery(qs.stringify(filterQuery))
	}, [filterQuery])

	const paginationUpdate = (page) => {
		updateFilterQUery("page", page)
	}

  const currentTaskData={
    paginationUpdate: paginationUpdate,
    orderCount: orderCount,
    currentTask: currentTask,
  }
  
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
              <TaskFilter setFilterQuery={setFilterQuery} handleSearchQuery={handleSearchQuery} updateFilterQUery={updateFilterQUery} /> 
            </CardBody>
          </Card>
        </Col>
        <Col sm="8">
          <Card title="Bordered">
            <CardBody>
              <CurrentTaskView currentTaskData={currentTaskData} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default CurrentTaskList