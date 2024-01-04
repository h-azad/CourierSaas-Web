import { Link } from "react-router-dom"
import { Search, } from "react-feather"
import { Button, CardText } from "reactstrap"
import { useEffect, useState } from "react"

import { Table, Tag, Button as AntdButton, Dropdown } from "antd"
import { DownOutlined } from '@ant-design/icons'
import * as qs from 'qs'

import useJwt from '@src/auth/jwt/useJwt'
import { getApi, FUND_TRANSFER } from "@src/constants/apiUrls"

import FundTransferConfirm from "@src/components/FundTransferConfirm"
import SwalAlert from "@src/components/SwalAlert"
import toast from 'react-hot-toast'

import { GENERAL_ROW_SIZE } from "@src/constants/tableConfig"

const ListTable = () => {

  const [fundTransderData, setFundTransferData] = useState([])

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



  const isFundTransfer = (e, id, status) => {
    e.preventDefault()
    return FundTransferConfirm(`${status} fund transfer!`, status, 'Yes').then(function (result) {

      let formData = {
        status: status
      }

      if (result.value) {
        useJwt
          .axiosPatch(getApi(FUND_TRANSFER) + id + '/', formData)
          .then((res) => {
            if (res?.data?.error === true) {
              toast.error(`Fund Transfer ${err?.response?.data.status} Failed!`)
            } else {
              SwalAlert(`Fund Transfer ${res?.data?.status} Successfully`)
              toast.success(`Fund Transfer ${res?.data?.status} Successfully!`)
            }

          }).catch((err) => {
            toast.error(`Fund Transfer ${err?.response?.data.status} Successfully!`)
          })
          .finally(() => fetchFundTransferData())
      }
    })

  }


  const fetchFundTransferData = () => {
    return useJwt
      .axiosGet(getApi(FUND_TRANSFER) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setFundTransferData(res?.data?.results)
        updatePagination({
          current: res?.data?.page_number,
          pageSize: res?.data?.page_size,
          total: res?.data?.count,
        })
      })
      .catch(err => {
        toast.error('Fund Transfer Response Error')
      })
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
      case 'Accepted':
        return 'green'

      case 'Cancel':
        return 'red'

      default:
        return 'orange'
    }
  }



  const renderDropDownItems = (id) => {
    const it = [
      {
        key: '1',
        label: (
          <p style={{ fontSize: "15px" }}
            onClick={(e) => { isFundTransfer(e, id, 'Accepted') }}
          >{" "}Accepted</p>
        ),
      },
      {
        key: '2',
        label: (
          <p style={{ fontSize: "15px" }}
            onClick={(e) => { isFundTransfer(e, id, 'Cancel') }}
          >{" "}Cancel</p>
        ),
      },

    ]

    return it
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
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Sender',
      dataIndex: 'sender',
    },
    {
      title: 'Receiver',
      dataIndex: 'receiver',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <Tag color={colorSwitch(record.status)}>{text}</Tag>
      ),
    },
    {
      title: 'Action',
      render: (text, record) => (
        <>
          {record?.status === 'Pending' &&
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
          }

        </>
      ),
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
    fetchFundTransferData()
  }, [JSON.stringify(filterQuery)])


  return (
    <>
      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="d-flex align-items-center">
              <Link to={'/fund-transfer/add/'}>
                <Button.Ripple color="primary">Fund Transfer</Button.Ripple>
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search "
                name="marchant_name"
                type="text"
                class="form-control"
                onChange={(e) => { updateFilterQUery('search', e.target.value) }}
              />
              <Button.Ripple className="btn-icon ms-1" outline color="primary">
                <Search size={16} />
              </Button.Ripple>
            </div>
          </div>
        </div>
      </CardText>
      <Table scroll={{ x: true }} columns={columns} dataSource={fundTransderData} onChange={handleTableChange} pagination={tableParams.pagination} />
    </>
  )
}

export default ListTable
