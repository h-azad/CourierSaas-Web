import { Link } from "react-router-dom"
import { Search } from "react-feather"
import {
  Button,
  CardText,
} from "reactstrap"
import { useEffect, useState } from "react"
import { Table, Tag, Dropdown } from "antd"
import { DownOutlined } from '@ant-design/icons'
import * as qs from 'qs'
import toast from "react-hot-toast"

import {
  getApi, WITHDRAW_REQUEST_LIST,
  WITHDRAW_REQUEST_UPDATE_STATUS
} from "@src/constants/apiUrls"
import useJwt from '@src/auth/jwt/useJwt'

import { GENERAL_ROW_SIZE } from "@src/constants/tableConfig"
import SwalAlert from "@src/components/SwalAlert"
import SweetAlartConfirm from "@src/components/SweetAlartConfirm"


const ListTable = () => {

  const [withdrawRequest, setWithdrawRequest] = useState([])

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


  const isWithdrawRequestModify = (e, id, status) => {
    let color = undefined
    if (status == 'Accept' || status == 'Complete') {
      color = 'green'
    } else {
      color = 'red'
    }
    e.preventDefault()
    return SweetAlartConfirm(`${status} Withdraw Request!`, color, 'Yes').then(function (result) {

      let formData = {
        withdraw_status: status
      }

      if (result.value) {
        useJwt
          .axiosPatch(getApi(WITHDRAW_REQUEST_UPDATE_STATUS) + id + '/', formData)
          .then((res) => {
            if (res?.data?.error === true) {
              toast.error(`Withdraw Request ${err?.response?.data.status} Failed!`)
            } else {
              SwalAlert(`Withdraw Request ${res?.data?.status} Successfully`)
              toast.success(`Withdraw Request ${res?.data?.status} Successfully!`)
            }

          }).catch((err) => {
            toast.error(`Withdraw Request ${err?.response?.data.status} Failed!`)
          })
          .finally(() => fetchWithdrawRequestData())
      }
    })

  }



  const renderDropDownItems = (id) => {
    const it = [
      {
        key: '1',
        label: (
          <p style={{ fontSize: "15px" }}
            onClick={(e) => { isWithdrawRequestModify(e, id, 'Accept') }}
          >{" "}Accept</p>
        ),
      },

      {
        key: '2',
        label: (
          <p style={{ fontSize: "15px" }}
            onClick={(e) => { isWithdrawRequestModify(e, id, 'Complete') }}
          >{" "}Complete</p>
        ),
      },
      {
        key: '3',
        label: (
          <p style={{ fontSize: "15px" }}
            onClick={(e) => { isWithdrawRequestModify(e, id, 'Cancel') }}
          >{" "}Cancel</p>
        ),
      },

    ]

    return it
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
        <>

          <Dropdown
            menu={{
              items: renderDropDownItems(record.id)
            }}
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()} href="">
              More <DownOutlined />
            </a>
          </Dropdown>
        </>
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

    </>
  )
}

export default ListTable
