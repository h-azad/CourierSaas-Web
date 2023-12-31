import { Link } from "react-router-dom"
import { Search } from "react-feather"
import {
  Button,
  CardText,
} from "reactstrap"
import { useEffect, useState } from "react"
import { Table } from "antd"
import * as qs from 'qs'

import {
  getApi,
  ADJUSTMENT
} from "@src/constants/apiUrls"
import useJwt from '@src/auth/jwt/useJwt'

import { GENERAL_ROW_SIZE } from "@src/constants/tableConfig"



const WalletAdjustmentMerchantIndex = () => {

  const [adjustmentData, setAdjustmentData] = useState([])

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



  const fetchAdjustmentData = () => {
    return useJwt
      .axiosGet(getApi(ADJUSTMENT) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        console.log("res", res.data)
        setAdjustmentData(res?.data?.results)
        updatePagination({
          current: res?.data?.page_number,
          pageSize: res?.data?.page_size,
          total: res?.data?.count,
        })
        return res.data
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
      title: 'Marchant',
      dataIndex: 'wallet'
    },

    {
      title: 'Receiver Admin',
      dataIndex: 'receiver',
    },

    {
      title: 'Amount',
      dataIndex: 'amount',
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
    fetchAdjustmentData()
  }, [JSON.stringify(filterQuery)])

  return (
    <>
      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            {/* <div className="d-flex align-items-center">
              <Link to={'/wallet-adjustment/add'}>
                <Button.Ripple color="primary">Adjustment Wallet</Button.Ripple>
              </Link>
            </div> */}
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Adjustment Amount"
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
      <div class="table-responsive">

        <Table scroll={{ x: true }} columns={columns} dataSource={adjustmentData} onChange={handleTableChange} pagination={tableParams.pagination} />

      </div>
    </>
  )
}

export default WalletAdjustmentMerchantIndex
