import { Link } from "react-router-dom"
import { MoreVertical, Search, Edit3 } from "react-feather"
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
import useJwt from '@src/auth/jwt/useJwt'

import SwalAlert from "../../../../components/SwalAlert"
import StatusModal from "../../../../components/StatusModal"
import SwalConfirm from "../../../../components/SwalConfirm"
import { getApi, WITHDRAW_REQUEST_LIST, WITHDRAW_REQUEST_DELETE, WITHDRAW_REQUEST_SEARCH, WITHDRAW_REQUEST_UPDATE_STATUS } from "../../../../constants/apiUrls"

import { Table, Tag, Popover } from "antd"
import * as qs from 'qs'
import { GENERAL_ROW_SIZE } from "../../../../constants/tableConfig"



const MarchantBalanceWithrawRequestList = () => {
  const [withdrawRequest, setWithdrawRequest] = useState([])
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
            // console.log("res", res.data)
            SwalAlert("Deleted Successfully")

            // return res.data
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

  // useEffect(() => {
  //   fetchWithdrawRequestData()
  // }, [])

  // useEffect(() => {
  //   if (!statusModalState) {
  //     clearData()
  //   }
  //   fetchWithdrawRequestData()
  // }, [statusModalState])

  const fetchWithdrawRequestData = () => {
    return useJwt
      .axiosGet(getApi(WITHDRAW_REQUEST_LIST) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setWithdrawRequest(res?.data?.results)
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

        record.withdraw_status === "Pending" ? (
          <Popover content={
            <span onClick={e => changeStatusAction(e, record)} className="align-middle">Change Status</span>
          } trigger="click">
            <MoreVertical size={15} />
          </Popover>
        ) : null,

        // record.withdraw_status === "Pending" ? (
        //   <td>
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
        //         <DropdownItem href="/" onClick={e => changeStatusAction(e, record)}>
        //           <Edit3 className="me-50" size={15} />{" "}
        //           <span className="align-middle">Cancel</span>
        //         </DropdownItem>
        //       </DropdownMenu>
        //     </UncontrolledDropdown>
        //   </td>

        // ) : null,

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
              <Link to={'/marchant-withdraw-request/add'}>
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

      <StatusModal
        statusModalState={statusModalState}
        setStatusModalState={setStatusModalState}
        updateStatusAction={updateStatusAction}
        title={"Change Withdraw Request Status"}
      >
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

export default MarchantBalanceWithrawRequestList
