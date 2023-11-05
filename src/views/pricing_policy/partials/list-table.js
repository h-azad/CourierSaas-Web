import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash, Search, Edit3, Eye } from "react-feather"
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
import { getApi, PRICING_POLICY_LIST, PRICING_POLICY_DELETE, SEARCH_PRICING_POLICY, PRICING_POLICY_UPDATE_STATUS } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"

import { Table, Tag, Dropdown } from "antd"
import { DownOutlined } from '@ant-design/icons'
import * as qs from 'qs'
import { GENERAL_ROW_SIZE } from "../../../constants/tableConfig"


const ListTable = () => {
  const [pricingpolicy, setPricingPolicy] = useState([])
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
  })

  const deleteAction = (e, id) => {
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

        useJwt
          .axiosDelete(getApi(PRICING_POLICY_DELETE + id + '/'))
          .then((res) => {
            SwalAlert("Deleted Successfully")
          })
          .finally(() => fetchPricingPolicyData())

      }
    })

  }

  const updateStatusAction = (e) => {
    e.preventDefault()
    useJwt
      .axiosPatch(getApi(PRICING_POLICY_UPDATE_STATUS) + selectedInfo.id + "/", {
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
    fetchPricingPolicyData()
  }, [])

  const fetchPricingPolicyData = () => {
    return useJwt
      // .axiosGet(getApi(PRICING_POLICY_LIST))
      .axiosGet(getApi(PRICING_POLICY_LIST) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        // console.log("res", res.data)
        setPricingPolicy(res?.data?.results)
        updatePagination({
          current: res?.data?.page_number,
          pageSize: res?.data?.page_size,
          total: res?.data?.count,
        })
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    if (!statusModalState) {
      clearData()
    }
    fetchPricingPolicyData()
  }, [statusModalState])

  const fetchSearchPricingPolicyData = searchTerm => {
    return useJwt
      .axiosGet(getApi(SEARCH_PRICING_POLICY) + '?search=' + searchTerm)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = debounce(e => {
    console.log(e.target.value)
    const searchTerm = e.target.value
    if (searchTerm.length > 0) {
      fetchSearchPricingPolicyData(searchTerm)
        .then(data => {
          if (data?.length > 0) {
            console.log('res', data)
            setPricingPolicy(data)
          } else {
            console.log("No data")
          }
        })
    } else {
      fetchPricingPolicyData()
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
        key: '1',
        label: (
          <Link to={"/pricing_policy/view/" + info.id}><Eye className="me-20" size={15} />{" "}View</Link>
        ),
      },
      {
        key: '2',
        label: (
          <Link to={"/pricing_policy/edit/" + info.id}><Edit className="me-20" size={15} />{" "}Edit</Link>
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
      title: 'Policy Title',
      dataIndex: 'policy_title',
      sorter: true,
      defaultSortOrder: 'descend'

    },

    {
      title: 'Product Type',
      dataIndex: ['product', 'product_type'],
    },

    {
      title: 'Delivary Charge',
      dataIndex: 'delivary_charge',
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

      render: (_, info) =>

        <td>

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

          {/* <UncontrolledDropdown>
            <DropdownToggle
              className="icon-btn hide-arrow"
              color="transparent"
              size="sm"
              caret
            >
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href={"/pricing_policy/view/" + info.id} >
                <Eye className="me-50" size={15} />{" "}
                <span className="align-middle">View</span>
              </DropdownItem>
              <DropdownItem href={"/pricing_policy/edit/" + info.id}>
                <Edit className="me-50" size={15} />{" "}
                <span className="align-middle">Edit</span>
              </DropdownItem>
              <DropdownItem href="/" onClick={e => deleteAction(e, info.id)}>
                <Trash className="me-50" size={15} />{" "}
                <span className="align-middle">Delete</span>
              </DropdownItem>
              <DropdownItem href="/" onClick={e => changeStatusAction(e, info)}>
                <Edit3 className="me-50" size={15} />{" "}
                <span className="align-middle">Change Status</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </td>

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
    fetchPricingPolicyData()
  }, [JSON.stringify(filterQuery)])

  return (
    <>
      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="d-flex align-items-center">
              <Link to={'/pricing_policy/add'}>
                <Button.Ripple color="primary">Add Pricing Policy</Button.Ripple>
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Volumetric Policy "
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
      <div class="table-responsive">

        <Table scroll={{ x: true }} columns={columns} dataSource={pricingpolicy} onChange={handleTableChange} pagination={tableParams.pagination} />

        {/* <Table bordered>
          <thead>
            <tr>
              <th>Policy Title</th>
              <th>Product Type</th>
              <th>Delivary Charge</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pricingpolicy &&
              pricingpolicy.map((info) => (
                <tr key={info.id}>
                  <td>
                    <span className="align-middle fw-bold">{info.policy_title}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.product.product_type}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.delivary_charge}</span>
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
                        <DropdownItem href={"/pricing_policy/view/" + info.id} >
                          <Eye className="me-50" size={15} />{" "}
                          <span className="align-middle">View</span>
                        </DropdownItem>
                        <DropdownItem href={"/pricing_policy/edit/" + info.id}>
                          <Edit className="me-50" size={15} />{" "}
                          <span className="align-middle">Edit</span>
                        </DropdownItem>
                        <DropdownItem href="/" onClick={e => deleteAction(e, info.id)}>
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
        <StatusModal
          statusModalState={statusModalState}
          setStatusModalState={setStatusModalState}
          updateStatusAction={updateStatusAction}
          title={"Change Pricing Policy Status"}
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
              <Input type='radio' name='ex1' id='ex1-inactive' checked={selectedStatus == "pending" ? true : false} onChange={() => setSelectedStatus("pending")} />
              <Label className='form-check-label' for='ex1-inactive'>
                Pending
              </Label>
            </div>
          </div>
        </StatusModal>
      </div>

    </>
  )
}

export default ListTable
