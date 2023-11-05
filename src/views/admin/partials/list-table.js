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
import { getApi, ADMIN_LIST, ADMIN_DELETE } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"

import { Table, Tag, Dropdown } from "antd"
import { DownOutlined } from '@ant-design/icons'
import * as qs from 'qs'
import { GENERAL_ROW_SIZE } from "../../../constants/tableConfig"

const AdminList = () => {
  const [admin, setAdmin] = useState([])

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: GENERAL_ROW_SIZE,
    },
  })

  const [filterQuery, setFilterQuery] = useState({
    page: 1,
    page_size: GENERAL_ROW_SIZE,
    ordering: 'name'
  })



  const deleteAction = (e, id) => {
    console.log('id is ', id)
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {
        useJwt
          .axiosDelete(getApi(ADMIN_DELETE + id + '/'))
          .then((res) => {
            SwalAlert("Deleted Successfully")
          })
          .finally(() => fetchadminData())
      }
    })

  }



  const fetchadminData = () => {
    return useJwt
      .axiosGet(getApi(ADMIN_LIST) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setAdmin(res?.data?.results)
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

    if (value) {
      filters[term] = value
    } else {
      filters.hasOwnProperty(term) && delete filters[term]
    }
    setFilterQuery(filters)
  }



  const renderDropDownItems = (info) => {
    const item = [

      {
        key: '2',
        label: (
          <Link to={"/admin/edit/" + info.id}><Edit className="me-20" size={15} />{" "}Edit</Link>
        ),
      },
      {
        key: '3',
        label: (
          <a href='/' onClick={(e) => deleteAction(e, info.id)}><Trash className="me-20" size={15} />{" "}Delete</a>
        ),
      },

    ]

    return item
  }


  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'name',
      sorter: true,
      defaultSortOrder: 'ascend'

    },

    {
      title: 'Email',
      dataIndex: 'email',
    },

    {
      title: 'Admin Role',
      dataIndex: 'admin_role',
      render: (text, record) => (
        <Tag>{text.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Action',
      render: (_, info) =>

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


      // <div className="p-3">
      //     <UncontrolledDropdown>
      //       <DropdownToggle
      //         className="icon-btn hide-arrow"
      //         color="transparent"
      //         size="sm"
      //         caret
      //       >
      //         <MoreVertical size={15} />
      //       </DropdownToggle>
      //       <DropdownMenu>
      //         <DropdownItem href={"/admin/edit/" + info.id}>
      //           <Edit className="me-50" size={15} />{" "}
      //           <span className="align-middle">Edit</span>
      //         </DropdownItem>
      //         <DropdownItem href="/" onClick={e => deleteAction(e, info.id)}>
      //           <Trash className="me-50" size={15} />{" "}
      //           <span className="align-middle">Delete</span>
      //         </DropdownItem>
      //       </DropdownMenu>
      //     </UncontrolledDropdown>
      // </div>

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
    fetchadminData()
  }, [JSON.stringify(filterQuery)])

  return (
    <>
      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="d-flex align-items-center">
              <Link to={'/admin/add'}>
                <Button.Ripple color="primary">Add Admin</Button.Ripple>
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            {/* <div className="d-flex align-items-center ">
                <input
                  placeholder="Search Admin"
                  name="marchant_name"
                  type="text"
                  class="form-control"
                  // onChange={handleSearch}
                />
                <Button.Ripple className="btn-icon ms-1" outline color="primary">
                  <Search size={16} />
                </Button.Ripple>
              </div> */}
          </div>
        </div>
      </CardText>
      <Table scroll={{ x: true }} columns={columns} dataSource={admin} onChange={handleTableChange} pagination={tableParams.pagination} />
      {/* <Table bordered>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Admin Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admin &&
            admin.map((admin) => (
              <tr key={admin.id}>
                <td>
                  <span className="align-middle fw-bold">{admin?.name}</span>
                </td>
                <td>
                  <span className="align-middle fw-bold">{admin?.email}</span>
                </td>
                <td>
                  <span className="align-middle fw-bold">{admin?.admin_role}</span>
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
                      <DropdownItem href={"/admin/edit/" + admin.id}>
                        <Edit className="me-50" size={15} />{" "}
                        <span className="align-middle">Edit</span>
                      </DropdownItem>
                      <DropdownItem href="/" onClick={e=>deleteAction(e, admin.id)}>
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

export default AdminList
