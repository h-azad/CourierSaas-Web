import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash, Search, Edit3 } from "react-feather"
import {
  // Table,
  Badge,
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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, AREAS_LIST, AREAS_DELETE, AREAS_SEARCH, AREAS_UPDATE_STATUS } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"

import { Table, Tag, Dropdown } from "antd"
import { DownOutlined } from '@ant-design/icons'
import * as qs from 'qs'
import { GENERAL_ROW_SIZE } from "../../../constants/tableConfig"

const ListTable = () => {
  const [areas, setAreas] = useState([])
  const MySwal = withReactContent(Swal)
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
    ordering: '-created_at'
  })


  const deleteAction = (e, id) => {
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

        useJwt
          .axiosDelete(getApi(AREAS_DELETE + id + '/'))
          .then((res) => {
            SwalAlert("Deleted Successfully")
          })
          .finally(() => fetchAreasData())

      }
    })

  }


  const updateStatusAction = (e) => {
    e.preventDefault()
    useJwt
      .axiosPatch(getApi(AREAS_UPDATE_STATUS) + selectedInfo.id + "/", {
        status: selectedStatus,
      })
      .then((res) => {
        setStatusModalState(false)
      })
  }


  const changeStatusAction = (e, info) => {
    e.preventDefault()
    setStatusModalState(true)
    setSelectedStatus(info.status)
    setSelectedInfo(info)
  }

  useEffect(() => {
    fetchAreasData()
  }, [])

  useEffect(() => {
    if (!statusModalState) {
      clearData()
    }
    fetchAreasData()
  }, [statusModalState])

  const fetchAreasData = () => {
    return useJwt
      // .axiosGet(getApi(AREAS_LIST))
      .axiosGet(getApi(AREAS_LIST) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setAreas(res?.data?.results)
        updatePagination({
          current: res?.data?.page_number,
          pageSize: res?.data?.page_size,
          total: res?.data?.count,
        })
        return res.data
      })
      .catch(err => console.log(err))
  }

  const fetchSearchAreaData = searchTerm => {
    return useJwt
      .axiosGet(getApi(AREAS_SEARCH) + '?search=' + searchTerm)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = debounce(e => {
    const searchTerm = e.target.value
    if (searchTerm.length > 0) {
      fetchSearchAreaData(searchTerm)
        .then(data => {
          if (data?.length > 0) {
            setAreas(data)
          }
        })
    } else {
      fetchAreasData()
    }

  }, 300)

  const clearData = () => {
    setSelectedInfo(null)
    setSelectedStatus(null)
  }

  function debounce(fn, time) {
    let timeoutId
    return wrapper
    function wrapper(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        timeoutId = null
        fn(...args)
      }, time)
    }
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


  const renderDropDownItems = (info) => {
    const item = [
      {
        key: '2',
        label: (
          <Link to={"/areas/edit/" + info.id}><Edit className="me-20" size={15} />{" "}Edit</Link>
        ),
      },
      {
        key: '3',
        label: (
          <a href='/' onClick={(e) => deleteAction(e, info.id)}><Trash className="me-20" size={15} />{" "}Delete</a>
        ),
      },
      {
        key: '4',
        label: (
          <a href="/" onClick={e => changeStatusAction(e, info)}><Edit3 className="me-20" size={15} />{" "}Change Status</a>
        ),
      },
    ]

    return item
  }

  const columns = [
    {
      title: 'City Name',
      dataIndex: ['city', 'city_name'],
      sorter: true,
      defaultSortOrder: 'descend'
    },
    {
      title: 'Area Name',
      dataIndex: 'area_name',
      sorter: true,
      defaultSortOrder: 'descend'

    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <Tag color={colorSwitch(record.status)}>{text.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Action',

      render: (_, record) =>

        <Dropdown
          menu={{
            items: renderDropDownItems(record)
          }}
          trigger={['click']}
        >
          <a onClick={(e) => e.preventDefault()} href="">
            More <DownOutlined />
          </a>
        </Dropdown>

        // <UncontrolledDropdown>
        //   <DropdownToggle
        //     className="icon-btn hide-arrow"
        //     color="transparent"
        //     size="sm"
        //     caret
        //   >
        //     <MoreVertical size={15} />
        //   </DropdownToggle>
        //   <DropdownMenu>
        //     <DropdownItem href={"/areas/edit/" + record.id}>
        //       <Edit className="me-50" size={15} />{" "}
        //       <span className="align-middle">Edit</span>
        //     </DropdownItem>
        //     <DropdownItem href="/" onClick={e => deleteAction(e, record.id)}>
        //       <Trash className="me-50" size={15} />{" "}
        //       <span className="align-middle">Delete</span>
        //     </DropdownItem>
        //     <DropdownItem href="/" onClick={e => changeStatusAction(e, record)}>
        //       <Edit3 className="me-50" size={15} />{" "}
        //       <span className="align-middle">Change Status</span>
        //     </DropdownItem>
        //   </DropdownMenu>
        // </UncontrolledDropdown>

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
    fetchAreasData()
  }, [JSON.stringify(filterQuery)])





  return (
    <>
      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="d-flex align-items-center">
              <Link to={'/areas/add'}>
                <Button.Ripple color="primary">Add Area</Button.Ripple>
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Area"
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
      {/* <Table bordered>
        <thead>
          <tr>
            <th>Area Name</th>
            <th>City Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {areas &&
            areas.map((info) => (
              <tr key={info.id}>
                <td>
                  <span className="align-middle fw-bold">{info.area_name}</span>
                </td>
                <td>
                  <span className="align-middle fw-bold">{info.city.city_name}</span>
                </td>
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
                      <DropdownItem href={"/areas/edit/" + info.id}>
                        <Edit className="me-50" size={15} />{" "}
                        <span className="align-middle">Edit</span>
                      </DropdownItem>
                      <DropdownItem href="/" onClick={e=>deleteAction(e, info.id)}>
                        <Trash className="me-50" size={15} />{" "}
                        <span className="align-middle">Delete</span>
                      </DropdownItem>
                      <DropdownItem href="/" onClick={e=>changeStatusAction(e, info)}>
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

      <Table scroll={{ x: true }} columns={columns} dataSource={areas} onChange={handleTableChange} pagination={tableParams.pagination} />

      <StatusModal
        statusModalState={statusModalState}
        setStatusModalState={setStatusModalState}
        updateStatusAction={updateStatusAction}
        title={"Change Area Status"}
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

        </div>
      </StatusModal>
    </>
  )
}

export default ListTable
