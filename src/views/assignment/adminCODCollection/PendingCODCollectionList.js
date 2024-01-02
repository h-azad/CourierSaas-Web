

import { Search } from "react-feather"
import { useParams } from "react-router-dom"
import {
  Card,
  CardText,
  Button,
  Input,
  CardBody
} from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import { Button as AntdButton, Table, Checkbox } from "antd"

import {
  getApi,
  PENDING_COD,
} from "../../../constants/apiUrls"

import * as qs from 'qs'

import { GENERAL_ROW_SIZE } from "../../../constants/tableConfig"


import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"
import toast from 'react-hot-toast'



const PendingCODCollectionList = () => {
  let { id } = useParams()

  const [order, setOrder] = useState()
  const [allOrderSelectStatus, setAllOrderSelectStatus] = useState(false)
  const [selectedorderID, setSelectedorderID] = useState([])
  const [sumAmount, setSumAmount] = useState(0)

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



  const handleSelectedOrderId = (orderID, amount) => {

    const index = selectedorderID.indexOf(orderID)

    if (index === -1) {
      setSumAmount(sumAmount + amount)
      setSelectedorderID([...selectedorderID, orderID])
    } else {
      setSumAmount(sumAmount - amount)
      setSelectedorderID(selectedorderID.filter(id => id !== orderID))
    }
  }



  const handleSelectedOrderAllID = () => {

    if (order?.length !== selectedorderID?.length && allOrderSelectStatus === false) {
      let allOrderIDArr = []
      let amountOfArry = 0
      order.map(data => {
        allOrderIDArr.push(data.id)

        if (selectedorderID?.includes(data.id) === false) {
          amountOfArry = amountOfArry + sumAmount + Number(data?.amount_to_be_collected) + Number(data?.delivary_charge)
        }

      })

      setSelectedorderID(allOrderIDArr)
      setSumAmount(amountOfArry)
      setAllOrderSelectStatus(true)

    }
    else {
      setSelectedorderID([])
      setSumAmount(0)
      setAllOrderSelectStatus(false)
    }

  }



  const fetchOrderData = () => {
    return useJwt.axiosGet(getApi(`${PENDING_COD}${id}?${qs.stringify(filterQuery)}`))
      .then((res) => {
        setOrder(res?.data?.results)
        updatePagination({
          current: res?.data?.page_number,
          pageSize: res?.data?.page_size,
          total: res?.data?.count,
        })
      }).catch((err) => {
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


  const ConfirmAmountCollection = () => {
    // e.preventDefault()
    return SwalConfirm(`Collection Amount Is ${sumAmount} !`, "Collection").then(
      function (result) {
        let formData = {
          orderID: selectedorderID,
        }
        if (result.value) {
          useJwt
            .axiosPost(getApi(`${PENDING_COD}${id}/`), formData)
            .then((res) => {
              if(res?.data?.error){
                toast.error(res?.data?.message)
              }else{
                toast.success(res?.data?.message)
                SwalAlert(res?.data?.message)
                fetchOrderData()
              }
            }).catch((err)=>{
              toast.error(err?.response?.data?.message)
            })
        }
      }
    )
  }


  const columns = [
    {
      title: <Input type='checkbox'
        checked={order?.length === selectedorderID?.length && order.length !== 0}
        onClick={handleSelectedOrderAllID}
        id='remember-me'
      />,

      render: (_, order) =>

        <Checkbox
          checked={selectedorderID.includes(order.id)}
          value={order.id}
          onChange={(e) => {
            handleSelectedOrderId(
              e.target.value,
              Number(order?.amount_to_be_collected) +
              Number(order?.delivary_charge))
          }}>
        </Checkbox>

    },

    {
      title: 'Parcel ID',
      dataIndex: 'parcel_id',
    },

    {
      title: 'Delivery Address',
      dataIndex: 'delivary_address',
    },

    {
      title: 'COD Amount',
      dataIndex: 'amount_to_be_collected',
    },

    {
      title: 'Delivery Charge',
      dataIndex: 'delivary_charge',
    },

    {
      title: 'Total',
      dataIndex: 'total',
      render: (text, record) => (
        Number(record?.amount_to_be_collected) +
        Number(record?.delivary_charge)
      ),
    },
  ]



  useEffect(() => {
    const _tableParams = tableParams
    const _filters = { ...filterQuery }

    if (_tableParams) {
      _filters['page'] = _tableParams.pagination?.current
      _filters['page_size'] = _tableParams.pagination?.pageSize
    }

    setFilterQuery(_filters)

  }, [JSON.stringify(tableParams)])

  useEffect(() => {
    fetchOrderData()
  }, [JSON.stringify(filterQuery)])

  return (
    <>

      <div className="row justify-content-between">
        <div className="col-lg-5">
          <div className="d-flex align-items-center gap-2">

            <p style={{ margin: "0" }}>
              Total: {sumAmount}
            </p>



            <AntdButton disabled={selectedorderID.length === 0 ? true : false} onClick={ConfirmAmountCollection} type="primary">Collection Confirm</AntdButton>

          </div>
        </div>
        <div className="col-lg-5">
          <div className="d-flex align-items-center ">
            <input
              placeholder="Search Rider"
              name="user_name"
              type="text"
              class="form-control"
              // value=""
              // onChange={handleSearch}
              onChange={(e) => { updateFilterQUery('search', e.target.value) }}
            />
            <Button.Ripple className="btn-icon ms-1" outline color="primary">
              <Search size={16} />
            </Button.Ripple>
          </div>
        </div>
        {/* <Table scroll={{ x: true }} columns={columns} dataSource={order} /> */}
        <Table scroll={{ x: true }} columns={columns} dataSource={order} onChange={handleTableChange} pagination={tableParams.pagination} />
      </div>


    </>
  )
}

export default PendingCODCollectionList

