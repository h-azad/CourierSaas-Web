import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash, Search, Edit3, Eye } from "react-feather"
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  CardText,
  Label,
  Input,
} from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  RIDER_DELETE,
  RIDER_SEARCH_FILTER,
  RIDER_UPDATE_STATUS
} from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"

import { Table, Tag, Button as AntdButton } from "antd"
import * as qs from 'qs'
import { GENERAL_ROW_SIZE } from "../../../constants/tableConfig"

const ListTable = () => {
  const [rider, setRider] = useState([])
  const [statusModalState, setStatusModalState] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedInfo, setSelectedInfo] = useState(null)

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: GENERAL_ROW_SIZE,
    },
  })

  const [filterQuery, setFilterQuery] = useState({
    page: 1,
    page_size: GENERAL_ROW_SIZE,
    ordering: 'full_name'
  })



  const changeStatusAction = (e, info) => {
    e.preventDefault()
    setStatusModalState(true)
    setSelectedStatus(info.status)
    setSelectedInfo(info)
  }

  const clearData = () => {
    setSelectedInfo(null)
    setSelectedStatus(null)
  }



  const deleteAction = (e, id) => {
    e.preventDefault()

    return SwalConfirm(`You won't be able to revert this!`, "Delete").then(
      function (result) {
        if (result.value) {
          useJwt
            .axiosDelete(getApi(RIDER_DELETE + id + "/"))
            .then((res) => {
              SwalAlert("Deleted Successfully")
            })
            .finally(() => fetchRiderData())
        }
      }
    )
  }



  const updateStatusAction = (e) => {
    e.preventDefault()
    useJwt
      .axiosPatch(getApi(RIDER_UPDATE_STATUS) + "/" + selectedInfo.id + "/", selectedStatus === 'active' ? { status: selectedStatus, get_user_id: selectedInfo.user_id } : { status: selectedStatus })
      .then((res) => {
        setStatusModalState(false)
      })
      .finally(() => fetchRiderData())
  }



  const fetchRiderData = () => {
    return useJwt
      .axiosGet(getApi(RIDER_SEARCH_FILTER) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setRider(res?.data?.results)
        updatePagination({
          current: res?.data?.page_number,
          pageSize: res?.data?.page_size,
          total: res?.data?.count,
        })
      })
      .catch((err) => console.log(err))
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

    if (value) {
      filters[term] = value
    } else {
      filters.hasOwnProperty(term) && delete filters[term]
    }
    setFilterQuery(filters)
  }



  function colorSwitch(status) {
    switch (status) {
      case 'active':
        return 'green'

      case 'inactive':
        return 'red'

      default:
        return 'green'
    }
  }



  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      sorter: true,
      defaultSortOrder: 'ascend'

    },

    {
      title: 'Contact Number',
      dataIndex: 'contact_no',
    },

    {
      title: 'Email',
      dataIndex: 'email',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <AntdButton type="primary">{text.toUpperCase()}</AntdButton>
        // <Tag color={colorSwitch(record.status)}>{text.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Action',

      render: (_, info) =>

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
            <DropdownItem href={"/rider/view/" + info.id} >
              <Eye className="me-50" size={15} />{" "}
              <span className="align-middle">View</span>
            </DropdownItem>
            <DropdownItem href={"/rider/edit/" + info.id}>
              <Edit className="me-50" size={15} />{" "}
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              href="/"
              onClick={(e) => deleteAction(e, info.id)}
            >
              <Trash className="me-50" size={15} />{" "}
              <span className="align-middle">Delete</span>
            </DropdownItem>
            <DropdownItem href="/" onClick={e => changeStatusAction(e, info)}>
              <Edit3 className="me-50" size={15} />{" "}
              <span className="align-middle">Change Status</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
    },
  ]



  useEffect(() => {
    const _tableParams = tableParams
    const _filters = { ...filterQuery }

    if (_tableParams) {
      _filters['page'] = _tableParams.pagination?.current
      _filters['page_size'] = _tableParams.pagination?.pageSize
      _filters['ordering'] = _tableParams?.sorter?.order == 'ascend' ? _tableParams?.sorter?.field : `-${_tableParams?.sorter?.field}`
    }

    setFilterQuery(_filters)

  }, [JSON.stringify(tableParams)])



  useEffect(() => {
    fetchRiderData()
  }, [JSON.stringify(filterQuery)])

  useEffect(() => {
    if (!statusModalState) {
      clearData()
    }
    fetchRiderData()
  }, [statusModalState])

  return (
    <>
      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="d-flex align-items-center">
              <Link to={"/rider/add"}>
                <Button.Ripple color="primary">Add Rider</Button.Ripple>
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Rider"
                name="user_name"
                type="text"
                class="form-control"
                // value=""
                onChange={(e) => { updateFilterQUery('search', e.target.value) }}
              />
              <Button.Ripple className="btn-icon ms-1" outline color="primary">
                <Search size={16} />
              </Button.Ripple>
            </div>
          </div>
        </div>
      </CardText>
      <div class="table-responsive">
        <Table scroll={{ x: true }} columns={columns} dataSource={rider} onChange={handleTableChange} pagination={tableParams.pagination} />

        {/* <Table bordered>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Contact Number 1*</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rider &&
              rider.map((info) => (
                <tr key={info.id}>
                  <td>
                    <span className="align-middle fw-bold">{info.full_name}</span>
                  </td>
                  <td>{info.contact_no}</td>
                  <td>{info.email}</td>
                  <td>
                    <Badge pill color="light-primary" className="me-1">
                      {info.status}
                    </Badge>
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
                        <DropdownItem href={"/rider/view/" + info.id} >
                          <Eye className="me-50" size={15} />{" "}
                          <span className="align-middle">View</span>
                        </DropdownItem>
                        <DropdownItem href={"/rider/edit/" + info.id}>
                          <Edit className="me-50" size={15} />{" "}
                          <span className="align-middle">Edit</span>
                        </DropdownItem>
                        <DropdownItem
                          href="/"
                          onClick={(e) => deleteAction(e, info.id)}
                        >
                          <Trash className="me-50" size={15} />{" "}
                          <span className="align-middle">Delete</span>
                        </DropdownItem>
                        <DropdownItem href="/" onClick={e => changeStatusAction(e, info)}>
                          <Edit3 className="me-50" size={15} />{" "}
                          <span className="align-middle">Change Status</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table> */}
      </div>

      <StatusModal
        statusModalState={statusModalState}
        setStatusModalState={setStatusModalState}
        updateStatusAction={updateStatusAction}
        title={"Change Rider Status"}
      >
        <div className='demo-inline-spacing'>
          <div className='form-check'>
            <Input type='radio' id='ex1-active' name='ex1' checked={selectedStatus == "active" ? true : false} onChange={() => setSelectedStatus("active")} />
            <Label className='form-check-label' for='ex1-active'>
              Active
            </Label>
          </div>
          <div className='form-check'>
            <Input type='radio' name='ex1' id='ex1-inactive' checked={selectedStatus == "inactive" ? true : false} onChange={() => setSelectedStatus("inactive")} />
            <Label className='form-check-label' for='ex1-inactive'>
              Inactive
            </Label>
          </div>
          <div className='form-check'>
            <Input type='radio' name='ex1' id='ex1-pending' checked={selectedStatus == "pending" ? true : false} onChange={() => setSelectedStatus("pending")} />
            <Label className='form-check-label' for='ex1-pending'>
              Pending
            </Label>
          </div>
        </div>
      </StatusModal>
    </>
  )
}

export default ListTable

