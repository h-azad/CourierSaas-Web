import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash, Search } from "react-feather"
import {

  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  CardText,

} from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, RIDER_ROUTE } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import { Descriptions } from 'antd'

import { Table } from "antd"
import * as qs from 'qs'
import { GENERAL_ROW_SIZE } from "../../../constants/tableConfig"

const RiderRouteList = () => {
  const [route, setRoute] = useState([])

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: GENERAL_ROW_SIZE,
    },
  })

  const [filterQuery, setFilterQuery] = useState({
    page: 1,
    page_size: GENERAL_ROW_SIZE,
    // ordering: '-created_at'
  })


  const deleteAction = (e, id) => {
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

        useJwt
          .axiosDelete(getApi(RIDER_ROUTE + id + '/'))
          .then((res) => {
            SwalAlert("Deleted Successfully")
          })
          .finally(() => fetchRouteData())

      }
    })

  }




  const fetchRouteData = () => {
    return useJwt
      // .axiosGet(getApi(ROUTE))
      .axiosGet(getApi(RIDER_ROUTE) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setRoute(res?.data?.results)
        updatePagination({
          current: res?.data?.page_number,
          pageSize: res?.data?.page_size,
          total: res?.data?.count,
        })
        // return res.data
      })
      .catch(err => setRoute([]))
  }



  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sorter,
    })

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
  }

  const updatePagination = (info) => {
    const _tableParams = { ...tableParams }

    _tableParams.pagination = info

    setTableParams(_tableParams)
  }

  const updateFilterQUery = (term, value) => {
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



  const columns = [

    {

      render: (_, record) =>

        <tr key={record.id}>
          <td>
            <Descriptions>
              <Descriptions.Item label="Title">{record?.route?.title}</Descriptions.Item>
              <Descriptions.Item label="Start Time">{record.route?.start_time}</Descriptions.Item>
              <Descriptions.Item label="Start Location">{record.route?.start_location}</Descriptions.Item>
              <Descriptions.Item label="Rider">{record?.rider?.full_name}</Descriptions.Item>
              {/* <Descriptions.Item label="Areas">
                {JSON.parse(record?.route?.area).map((data) => (
                  <ul>
                    <li> {data?.label}</li>
                  </ul>
                ))}
              </Descriptions.Item> */}
            </Descriptions>
          </td>

          <td>
            <UncontrolledDropdown>
              <DropdownToggle
                className="icon-btn hide-arrow"
                color="transparent"
                size="sm"
                caret
              >
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href={"/route/edit/" + record.id}>
                  <Edit className="me-50" size={15} />{" "}
                  <span className="align-middle">Edit</span>
                </DropdownItem>
                <DropdownItem href="/" onClick={e => deleteAction(e, record.id)}>
                  <Trash className="me-50" size={15} />{" "}
                  <span className="align-middle">Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>

    },
  ]

  useEffect(() => {
    const _tableParams = tableParams
    const _filters = { ...filterQuery }

    if (_tableParams) {
      _filters['page'] = _tableParams.pagination?.current
      _filters['page_size'] = _tableParams.pagination?.pageSize
      // _filters['ordering'] = _tableParams?.sorter?.order == 'ascend' ? _tableParams?.sorter?.field : `-${_tableParams?.sorter?.field}`
    }

    setFilterQuery(_filters)

  }, [JSON.stringify(tableParams)])

  useEffect(() => {
    fetchRouteData()
  }, [JSON.stringify(filterQuery)])


  return (
    <>
      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="d-flex align-items-center">
              <Link to={'/set-route-rider'}>
                <Button.Ripple color="primary">Set Rider</Button.Ripple>
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Route"
                name="user_name"
                type="text"
                class="form-control"
                // onChange={handleSearch}
                onChange={(e) => { updateFilterQUery('search', e.target.value) }}
              />
              <Button.Ripple className="btn-icon ms-1" outline color="primary">
                <Search size={16} />
              </Button.Ripple>
            </div>
          </div>
        </div>
      </CardText>

      <Table scroll={{ x: true }} columns={columns} dataSource={route} onChange={handleTableChange} pagination={tableParams.pagination} />

      {/* <Table bordered>
        <thead>

        </thead>
        <tbody>
          {route &&
            route.map((info) => (
              <tr key={info.id}>
                <td>
                  <Descriptions>
                    <Descriptions.Item label="Title">{info.title}</Descriptions.Item>
                    <Descriptions.Item label="Start Time">{info.start_time}</Descriptions.Item>
                    <Descriptions.Item label="Start Location">{info.start_location}</Descriptions.Item>
                    <Descriptions.Item label="Areas">
                      {JSON.parse(info.area).map((data)=>(
                        <ul>
                          <li> {data.label}</li>
                        </ul>
                      ))}
                    </Descriptions.Item>
                  </Descriptions>
                </td>

                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="icon-btn hide-arrow"
                      color="transparent"
                      size="sm"
                      caret
                    >
                      <MoreVertical size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href={"/route/edit/" + info.id}>
                        <Edit className="me-50" size={15} />{" "}
                        <span className="align-middle">Edit</span>
                      </DropdownItem>
                      <DropdownItem href="/" onClick={e => deleteAction(e, info.id)}>
                        <Trash className="me-50" size={15} />{" "}
                        <span className="align-middle">Delete</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            ))}
        </tbody>
      </Table> */}
    </>
  )
}

export default RiderRouteList
