import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash, Search, ArrowLeft } from "react-feather"
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  CardText,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, ROUTE, UNRIDER_ROUTE } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import { Descriptions } from 'antd'

import { Table } from "antd"
import * as qs from 'qs'
import { GENERAL_ROW_SIZE } from "../../../constants/tableConfig"

const ListTable = () => {
  const [route, setRoute] = useState([])
  const [statusModalState, setStatusModalState] = useState(false)



  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: GENERAL_ROW_SIZE,
    },
  })

  const [filterQuery, setFilterQuery] = useState({
    page: 1,
    page_size: GENERAL_ROW_SIZE,
  })


  const deleteAction = (e, id) => {
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

        useJwt
          .axiosDelete(getApi(ROUTE + id + '/'))
          .then((res) => {
            SwalAlert("Deleted Successfully")
          })
          .finally(() => fetchRouteData())

      }
    })

  }




  const fetchRouteData = () => {
    return useJwt
      .axiosGet(getApi(ROUTE) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setRoute(res?.data?.results)
        updatePagination({
          current: res?.data?.page_number,
          pageSize: res?.data?.page_size,
          total: res?.data?.count,
        })
      })
      .catch(err => console.log(err))
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


  const fetchUnAssignData = () => {
    // return useJwt.axiosGet(getApi(`${ROUTE}un_assign_rider/${1}`))
    return useJwt.axiosGet(getApi(`${ROUTE}assign_rider/`))
      .then((res) => {
        console.log(res.data)
        setOrder(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }


  const RouteRiderAssign = (e, info) => {
    e.preventDefault()
    fetchUnAssignData()
    setStatusModalState(true)

  }


  // const delivaryHandler = (e) => {

  //   e.preventDefault()
  //   useJwt
  //     .axiosPost(getApi(DELIVERY_ASSIGNMENT + "/"), {
  //       riderId: riderId,
  //       selectedOrderIds: selectedOrderIds
  //     })
  //     .then((res) => {
  //       setStatusModalState(false)
  //     })
  //   //   .finally(() => fetchRiderData())
  // }

 





  const columns = [

    {

      render: (_, record) =>

        <tr key={record.id}>
          <td>
            <Descriptions>
              <Descriptions.Item label="Title">{record?.title}</Descriptions.Item>
              <Descriptions.Item label="Start Time">{record?.start_time}</Descriptions.Item>
              <Descriptions.Item label="Start Location">{record?.start_location}</Descriptions.Item>
              <Descriptions.Item label="Areas">
                {record?.route_area.map((data, index) => (
                  <ul key={index}>
                    <li> {data?.area?.area_name}</li>
                  </ul>
                ))}
              </Descriptions.Item>
            </Descriptions>
            
            <Descriptions>
              <Descriptions.Item label="Rider">
                {record?.rider.map((riderData, index) => (
                  <ul key={index}>
                    <li> {riderData?.rider?.full_name}</li>
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
                <DropdownItem href={"/route/edit/" + record.id}>
                  <Edit className="me-50" size={15} />{" "}
                  <span className="align-middle">Edit</span>
                </DropdownItem>

                <DropdownItem href="/" onClick={e => RouteRiderAssign(e, record.id)}>
                  <ArrowLeft className="me-50" size={15} />{" "}
                  <span className="align-middle">Assign Rider</span>
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
              <Link to={'/route/add'}>
                <Button.Ripple color="primary">Add Route</Button.Ripple>
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
      <div className="table-responsive">
        <Table scroll={{ x: true }} columns={columns} dataSource={route} onChange={handleTableChange} pagination={tableParams.pagination} />
      </div>


      <Modal isOpen={statusModalState} toggle={() => setStatusModalState(!statusModalState)} className='modal-dialog-centered'>
        <ModalHeader toggle={() => setStatusModalState(!statusModalState)}>{'Rider Assign'}</ModalHeader>
        <ModalBody>
          {/* <div class="table-responsive">
            {orders &&
              <Table scroll={{ x: true }} columns={columnsOrders} dataSource={orders} onChange={handleTableChange} pagination={false} />
            }
          </div> */}
        </ModalBody>
        <ModalFooter>
          {/* <Button color='primary' loading={loadings[1]} onClick={delivaryHandler}>Assign</Button> */}
          {/* <Button color='primary' onClick={delivaryHandler}>Assign</Button> */}
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ListTable
