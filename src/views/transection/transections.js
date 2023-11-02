

import { Search } from "react-feather"
import {
  Button,
  CardText,

} from "reactstrap"
import { useEffect, useState } from "react"

import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  TRANSECTIONS,
  TRANSECTIONS_FILTER,
} from "../../constants/apiUrls"

import { Table, Tag } from "antd"
import * as qs from 'qs'

import { GENERAL_ROW_SIZE } from "../../constants/tableConfig"



const Transections = () => {
  const [transections, setTransections] = useState([])

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



  useEffect(() => {
    fetchTransectionsData()
  }, [])



  const fetchTransectionsData = () => {
    const _queries = {
      page: tableParams.pagination.current,
      page_size: tableParams.pagination.pageSize,
    }
    return useJwt
      .axiosGet(getApi(TRANSECTIONS) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setTransections(res?.data?.results)
        updatePagination({
          current: res?.data?.page_number,
          pageSize: res?.data?.page_size,
          total: res?.data?.count,
        })
        return res.data
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


  const fetchSearchsetTransectionsData = searchTerm => {
    return useJwt
      // .axiosGet(getApi(RIDER_SEARCH)+'?search='+ searchTerm) //after line
      .axiosGet(getApi(TRANSECTIONS_FILTER) + '?search=' + searchTerm)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = debounce(e => {
    const searchTerm = e.target.value
    if (searchTerm?.length > 0) {
      fetchSearchsetTransectionsData(searchTerm)
        .then(data => {
          if (data?.length > 0) {
            setTransections(data)
          }
        })
    } else {
      fetchTransectionsData()
    }

  }, 300)


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

  function colorSwitch(status) {
    switch (status) {
      case 'Cash-Out':
        return 'geekblue'

      case 'Cash-In':
        return 'green'

      default:
        return 'geekblue'
    }
  }


  const columns = [
    {
      title: 'Date',
      dataIndex: 'created_at',
      sorter: true,
      defaultSortOrder: 'descend'
    },
    {
      title: 'Account',
      dataIndex: 'user_name',

    },
    {
      title: 'Transactions ID',
      dataIndex: 'transection_id',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (text, record) => (
        <Tag color={colorSwitch(record.type)}>{text.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
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
    fetchTransectionsData()
  }, [JSON.stringify(filterQuery)])

  return (
    <>
      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="d-flex align-items-center">
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Transections"
                name="user_name"
                type="text"
                class="form-control"
                // value=""
                // onChange={fetchTransectionsData}
                onChange={(e)=>{updateFilterQUery('search', e.target.value)}}
                // onChange={handleSearch}
              />
              <Button.Ripple className="btn-icon ms-1" outline color="primary">
                <Search size={16} />
              </Button.Ripple>
            </div>
          </div>
        </div>
      </CardText>
      <Table scroll={{ x: true }} columns={columns} dataSource={transections} onChange={handleTableChange} pagination={tableParams.pagination} />
      {/* <div class="table-responsive">
        <Table bordered>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Amount</th>
              <th>Transactions ID</th>
              <th>Remark</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transections &&
              transections.map((info) => (
                <tr key={info.id}>
                  <td>
                    <span className="align-middle fw-bold">{info.user_name}</span>
                  </td>
                  <td>{info.amount}</td>
                  <td>{info.transection_id}</td>
                  <td>{info.remark}</td>
                  <td>{info.type}</td>
                  <td>{info.created_at}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div> */}
    </>
  )
}

export default Transections

