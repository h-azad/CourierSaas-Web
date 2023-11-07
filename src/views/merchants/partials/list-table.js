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
  MARCHANT_DELETE,
  MARCHANT_SEARCH_FILTER,
  MARCHANT_UPDATE_STATUS
} from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"

import { DownOutlined } from '@ant-design/icons'
import { Table, Tag, Menu, Dropdown, Draw } from "antd"
import * as qs from 'qs'
import { GENERAL_ROW_SIZE } from "../../../constants/tableConfig"

import toast from 'react-hot-toast'

const ListTable = () => {
  const [merchants, setMerchants] = useState([])
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
    // ordering: 'full_name'
  })


  const changeStatusAction = (e, info) => {
    e.preventDefault()
    setStatusModalState(true)
    setSelectedStatus(info?.status)
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
            .axiosDelete(getApi(MARCHANT_DELETE + id + "/"))
            .then((res) => {
              SwalAlert("Deleted Successfully")
              toast.success('Deleted Successfully!') 
            }).catch((error)=>{
              toast.error(error?.message)
              toast.error("Marchant Delete Not Possible")
            })
            .finally(() => fetchMerchantsData())
        }
      }
    )
  }

  const updateStatusAction = (e) => {
    e.preventDefault()
    useJwt
      .axiosPatch(getApi(MARCHANT_UPDATE_STATUS) + "/" + selectedInfo.id + '/', selectedStatus === 'approved' ? { status: selectedStatus, is_active: true } : { status: selectedStatus, is_active: false })
      .then((res) => {
        setStatusModalState(false)
      })
      .finally(() => fetchMerchantsData())
  }



  const fetchMerchantsData = () => {
    return useJwt
      .axiosGet(getApi(MARCHANT_SEARCH_FILTER) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setMerchants(res?.data?.results)
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
    const it = [
      {
        key: '1',
        label: (
          <Link to={"/merchants/view/" + info.id}><Eye className="me-20" size={15} />{" "}View</Link>
        ),
      },
      {
        key: '2',
        label: (
          <Link to={"/merchants/edit/" + info.id}><Edit className="me-20" size={15} />{" "}Edit</Link>
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

    return it
  }

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      // sorter: true,
      // defaultSortOrder: 'ascend'

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
        // <Tag>{text.toUpperCase()}</Tag>
        <Tag color={colorSwitch(record.status)}>{text.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Action',
      render: (_, info) => (

        <>
          <Dropdown
            menu={{
              items: renderDropDownItems(info)
            }}
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()} href="">
              More <DownOutlined />
            </a>
          </Dropdown>
        </>
        // <div className="pt-3 pb-3">
        //   <UncontrolledDropdown>
        //     <DropdownToggle
        //       className="icon-btn hide-arrow"
        //       color="transparent"
        //       size="sm"
        //       caret
        //     >
        //       <MoreVertical size={15} />
        //     </DropdownToggle>
        //     <DropdownMenu>
        //       <DropdownItem href={"/merchants/view/" + info.id} >
        //         <Eye className="me-50" size={15} />{" "}
        //         <span className="align-middle">View</span>
        //       </DropdownItem>
        //       <DropdownItem href={"/merchants/edit/" + info.id}>
        //         <Edit className="me-50" size={15} />{" "}
        //         <span className="align-middle">Edit</span>
        //       </DropdownItem>
        //       <DropdownItem
        //         href="/"
        //         onClick={(e) => deleteAction(e, info.id)}
        //       >
        //         <Trash className="me-50" size={15} />{" "}
        //         <span className="align-middle">Delete</span>
        //       </DropdownItem>
        //       <DropdownItem href="/" onClick={e => changeStatusAction(e, info)}>
        //         <Edit3 className="me-50" size={15} />{" "}
        //         <span className="align-middle">Change Status</span>
        //       </DropdownItem>
        //     </DropdownMenu>
        //   </UncontrolledDropdown>
        // </div>


        // <Dropdown
        //   overlay={
        //     <Menu>
        //       <Link to={"/merchants/view/" + info.id}>
        //         <Eye className="me-50" size={15} />{" "}
        //         <span className="align-middle">View</span>
        //       </Link>
        //       <br></br>
        //       <Link to={"/merchants/edit/" + info.id}>
        //         <Edit className="me-50" size={15} />{" "}
        //         <span className="align-middle">Edit</span>
        //       </Link>
              
        //       <DropdownItem
        //         href="/"
        //         onClick={(e) => deleteAction(e, info.id)}
        //       >
        //         <Trash className="me-50" size={15} />{" "}
        //         <span className="align-middle">Delete</span>
        //       </DropdownItem>

        //       <DropdownItem onClick={e => changeStatusAction(e, info)}>
        //         <Edit3 className="me-50" size={15} />{" "}
        //         <span className="align-middle">Change Status</span>
        //       </DropdownItem>


        //     </Menu>
        //   }
        // >
        //   <UncontrolledDropdown>
        //     <DropdownToggle
        //       className="icon-btn hide-arrow"
        //       color="transparent"
        //       size="sm"
        //       caret
        //     >
        //       <MoreVertical size={15} />
        //     </DropdownToggle>

        //   </UncontrolledDropdown>
        // </Dropdown>

      )

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
    fetchMerchantsData()
  }, [JSON.stringify(filterQuery)])

  useEffect(() => {
    if (!statusModalState) {
      clearData()
    }
    fetchMerchantsData()
  }, [statusModalState])



  return (
    <>
      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="d-flex align-items-center">
              <Link to={"/merchants/add"}>
                <Button.Ripple color="primary">Add Merchant</Button.Ripple>
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Marchant"
                name="user_name"
                type="text"
                class="form-control"
                // value=""
                onChange={(e) => updateFilterQUery('search', e.target.value)}
              />
              <Button.Ripple className="btn-icon ms-1" outline color="primary">
                <Search size={16} />
              </Button.Ripple>
            </div>
          </div>
        </div>
      </CardText>
      <div class="table-responsive">
        <Table scroll={{ x: true }} columns={columns} dataSource={merchants} onChange={handleTableChange} pagination={tableParams.pagination} />

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
            {merchants &&
              merchants.map((info) => (
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
                        <DropdownItem href={"/merchants/view/" + info.id} >
                          <Eye className="me-50" size={15} />{" "}
                          <span className="align-middle">View</span>
                        </DropdownItem>
                        <DropdownItem href={"/merchants/edit/" + info.id}>
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
        title={"Change Marchant Status"}
      >
        <div className='demo-inline-spacing'>
          <div className='form-check'>
            <Input type='radio' id='ex1-active' name='ex1' checked={selectedStatus == "approved" ? true : false} onChange={() => setSelectedStatus("approved")} />
            <Label className='form-check-label' for='ex1-active'>
              Approved
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
