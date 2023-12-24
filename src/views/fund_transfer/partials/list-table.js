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
import { getApi, WITHDRAW_REQUEST_LIST, WITHDRAW_REQUEST_DELETE, WITHDRAW_REQUEST_SEARCH, WITHDRAW_REQUEST_UPDATE_STATUS } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"

import { Table, Tag, Popover } from "antd"
import * as qs from 'qs'
import { GENERAL_ROW_SIZE } from "../../../constants/tableConfig"


const ListTable = () => {
  const [withdrawRequest, setWithdrawRequest] = useState([])

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
          .axiosDelete(getApi(WITHDRAW_REQUEST_DELETE + id + '/'))
          .then((res) => {
            SwalAlert("Deleted Successfully")
          })
          .finally(() => fetchWithdrawRequestData())

      }
    })

  }




  const updateStatusAction = (e) => {
    e.preventDefault()
    useJwt
      .axiosPatch(getApi(WITHDRAW_REQUEST_UPDATE_STATUS) + selectedInfo.id + "/", {
        withdraw_status: selectedStatus, info: selectedInfo
      })
      .then((res) => {
        setStatusModalState(false)
      })
  }


  const changeStatusAction = (e, info) => {
    e.preventDefault()
    setStatusModalState(true)
    setSelectedStatus(info.withdraw_status)
    setSelectedInfo(info)
  }

  useEffect(() => {
    fetchWithdrawRequestData()
  }, [])

  useEffect(() => {
    if (!statusModalState) {
      clearData()
    }
    fetchWithdrawRequestData()
  }, [statusModalState])

  const fetchWithdrawRequestData = () => {
    return useJwt
      // .axiosGet(getApi(WITHDRAW_REQUEST_LIST))
      .axiosGet(getApi(WITHDRAW_REQUEST_LIST) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setWithdrawRequest(res?.data?.results)
        updatePagination({
          current: res?.data?.page_number,
          pageSize: res?.data?.page_size,
          total: res?.data?.count,
        })
        // return res.data
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

  function colorSwitch(status) {
    switch (status) {
      case 'Pending':
        return 'orange'

      case 'Cancel':
        return 'red'

      default:
        return 'green'
    }
  }



  const fetchSearchWithdrawRequestData = searchTerm => {
    return useJwt
      .axiosGet(getApi(WITHDRAW_REQUEST_SEARCH) + '?search=' + searchTerm)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = debounce(e => {
    const searchTerm = e.target.value
    if (searchTerm.length > 0) {
      fetchSearchWithdrawRequestData(searchTerm)
        .then(data => {
          if (data?.length > 0) {
            setWithdrawRequest(data)
          }
        })
    } else {
      fetchWithdrawRequestData()
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


  const columns = [
    {
      title: 'Date',
      dataIndex: 'created_at',

      sorter: {
        compare: (a, b) => a.created_at - b.created_at,
        multiple: 2,
      },
    },
    {
      title: 'Account',
      // dataIndex: 'account_wallet',
      dataIndex: ['account_wallet', 'account_name']
    },
    {
      title: 'Status',
      dataIndex: 'withdraw_status',
      render: (text, record) => (
        <Tag color={colorSwitch(record.withdraw_status)}>{text.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Previous Balance',
      dataIndex: 'balance',
    },


    {
      title: 'Withdraw Balance',
      dataIndex: 'withdraw_balance',
    },
    {
      title: 'Current Balance',
      dataIndex: 'current_balance',
    },
    {
      title: 'Action',

      render: (_, record) =>
        record.withdraw_status === "Pending" || record.withdraw_status === "Accept" ? (
          <Popover content={
            <span onClick={e => changeStatusAction(e, record)} className="align-middle">Change Status</span>
          } trigger="click">
            <MoreVertical size={15} />
          </Popover>
        ) : null,

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
    fetchWithdrawRequestData()
  }, [JSON.stringify(filterQuery)])

  return (
    <>
      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="d-flex align-items-center">
              <Link to={'/withdraw-request/add'}>
                <Button.Ripple color="primary">Add Withdraw Request</Button.Ripple>
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Withdraw Request"
                name="marchant_name"
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
      <Table scroll={{ x: true }} columns={columns} dataSource={withdrawRequest} onChange={handleTableChange} pagination={tableParams.pagination} />
      {/* <Table bordered>
        <thead>
          <tr>
            <th>Marchant Name</th>
            <th>Previous Balance</th>
            <th>Withdraw Balance</th>
            <th>Current Balance</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {withdrawRequest &&
            withdrawRequest.map((wallet) => (
              <tr key={wallet.id}>
                <td>
                  <span className="align-middle fw-bold">{wallet?.account_wallet?.account_name}</span>
                </td>
                <td>
                  <span className="align-middle fw-bold">{wallet.balance}</span>
                </td>
                <td>
                  <span className="align-middle fw-bold">{wallet.withdraw_balance}</span>
                </td>
                <td>
                  <span className="align-middle fw-bold">{wallet.current_balance}</span>
                </td>
                <td>
                  <span className="align-middle fw-bold">{wallet.withdraw_status
                  }</span>
                </td>

                {wallet.withdraw_status !== "Complete" &&
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
                      <DropdownItem href="/" onClick={e => changeStatusAction(e, wallet)}>
                        <Edit3 className="me-50" size={15} />{" "}
                        <span className="align-middle">Change Status</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>}
              </tr>
            ))}
        </tbody>
      </Table> */}
      <StatusModal
        statusModalState={statusModalState}
        setStatusModalState={setStatusModalState}
        updateStatusAction={updateStatusAction}
        title={"Change Withdraw Request Status"}
      >
        <div className='demo-inline-spacing'>
          <div className='form-check'>
            <Input type='radio' id='ex1-active' name='ex1' checked={selectedStatus == "Pending" ? true : false} onChange={() => setSelectedStatus("Pending")} />
            <Label className='form-check-label' for='ex1-active'>
              Pending
            </Label>
          </div>
          <div className='form-check'>
            <Input type='radio' name='ex1' id='ex1-inactive' checked={selectedStatus == "Accept" ? true : false} onChange={() => setSelectedStatus("Accept")} />
            <Label className='form-check-label' for='ex1-inactive'>
              Accept
            </Label>
          </div>
          <div className='form-check'>
            <Input type='radio' name='ex1' id='ex1-inactive' checked={selectedStatus == "Complete" ? true : false} onChange={() => setSelectedStatus("Complete")} />
            <Label className='form-check-label' for='ex1-inactive'>
              Complete
            </Label>
          </div>
        </div>
        <div className='form-check'>
          <Input type='radio' name='ex1' id='ex1-inactive' checked={selectedStatus == "Cancel" ? true : false} onChange={() => setSelectedStatus("Cancel")} />
          <Label className='form-check-label' for='ex1-inactive'>
            Cancel
          </Label>
        </div>
      </StatusModal>
    </>
  )
}

export default ListTable
