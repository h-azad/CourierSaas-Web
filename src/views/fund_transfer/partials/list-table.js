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
import { getApi, FUND_TRANSFER } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"

import { Table, Tag, Popover, Button as AntdButton, Dropdown } from "antd"
import { DownOutlined } from '@ant-design/icons'
import * as qs from 'qs'
import { GENERAL_ROW_SIZE } from "../../../constants/tableConfig"
import FundTransferConfirm from "@src/components/FundTransferConfirm"


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


  const isFundTransfer = (e, id, status) => {
    console.log('isFundTransfer', status)
    e.preventDefault()
    return FundTransferConfirm(`${status} fund transfer!`, status, 'Yes').then(function (result) {

      let formData = {
        status: status
      }

      if (result.value) {
        useJwt
          .axiosPatch(getApi(FUND_TRANSFER) + id + '/', formData)
          .then((res) => {
            SwalAlert("Fund Transfer Canceled Successfully")
          })
          .finally(() => fetchFundTransferData())

      }
    })

  }


  const fetchFundTransferData = () => {
    return useJwt
      // .axiosGet(getApi(WITHDRAW_REQUEST_LIST))
      .axiosGet(getApi(FUND_TRANSFER) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setFundTransferData(res?.data?.results)
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
          <p style={{fontSize: "15px"}} onClick={(e) =>{isFundTransfer(e, id, 'Accepted')}}>{" "}Accepted</p>
        ),
      },
      {
        key: '2',
        label: (
          <p style={{ fontSize: "15px" }} onClick={(e)=>{isFundTransfer(e, id, 'Cancel')}}>{" "}Cancel</p>
        ),
      },
      // {
      //   key: '3',
      //   label: (
      //     <a href='/' onClick={(e) => deleteAction(e, info.id)}><Trash className="me-20" size={15} />{" "}Delete</a>
      //   ),
      // },
      // {
      //   key: '4',
      //   label: (
      //     <a href="/" onClick={e => changeStatusAction(e, info)}><Edit3 className="me-20" size={15} />{" "}Change Status</a>
      //   ),
      // },
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
      title: 'Account',
      // dataIndex: 'account_wallet',
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
        // <>
        //   {
        //     record?.status === 'Pending' &&
        //     <AntdButton onClick={(e) => { isFundTransfer(e, record) }}
        //       type="primary" danger>Cancel</AntdButton>
        //   }
        // </>

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
      <Table scroll={{ x: true }} columns={columns} dataSource={fundTransderData} onChange={handleTableChange} pagination={tableParams.pagination} />
      
    </>
  )
}

export default ListTable
