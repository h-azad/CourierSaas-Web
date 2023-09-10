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
import { getApi, ADJUSTMENT_LIST, MARCHANT_ORDER_STATUS_UPDATE, CREATE_ORDER_DELETE, SEARCH_CREATE_ORDER } from "../../../constants/apiUrls"

import SwalAlert from "../../../components/SwalAlert"

import SwalConfirm from "../../../components/SwalConfirm"
// import ChangeStatusModal from "../../../../components/merchant_views/order/ChangeStatusModal"

import { Table, Popconfirm } from "antd"
import * as qs from 'qs'
import { GENERAL_ROW_SIZE } from "../../../constants/tableConfig"


const WalletAdjustment = () => {
  const [adjustmentData, setAdjustmentData] = useState([])
  console.log("adjustmentData", adjustmentData)
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
          .axiosDelete(getApi(ADJUSTMENT_LIST + id + '/'))
          .then((res) => {
            SwalAlert("Deleted Successfully")
          })
          .finally(() => fetchAdjustmentData())

      }
    })

  }


  const defaultAddress = (e, info) => {
    e.preventDefault()
    useJwt
      .axiosPatch(getApi(ADJUSTMENT_LIST + info.id + '/'), {
        id: info.id
      })
      .then((res) => {
        // SwalConfirm("Default Address Set")
        fetchAdjustmentData()
      })
  }

  useEffect(() => {
    fetchAdjustmentData()
  }, [])

  const fetchAdjustmentData = () => {
    return useJwt
      // .axiosGet(getApi(ADJUSTMENT_LIST))
      .axiosGet(getApi(ADJUSTMENT_LIST) + `?${qs.stringify(filterQuery)}`)
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
			title: 'Marchant',
			// dataIndex: 'account_wallet',
			dataIndex: 'username'
		},
		// {
		// 	title: 'Status',
		// 	dataIndex: 'withdraw_status',
		// 	render: (text, record) => (
		// 		<Tag color={colorSwitch(record.withdraw_status)}>{text.toUpperCase()}</Tag>
		// 	),
		// },
		{
			title: 'Receiver Admin',
			dataIndex: 'receiver',
		},


		{
			title: 'Adjust Amount',
			dataIndex: 'adjust_amount',
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
            <div className="d-flex align-items-center">
              <Link to={'/wallet-adjustment/add'}>
                <Button.Ripple color="primary">Adjustment Wallet</Button.Ripple>
              </Link>
            </div>
          </div>
        </div>
      </CardText>
      <div class="table-responsive">

      <Table scroll={{ x: true }} columns={columns} dataSource={adjustmentData} onChange={handleTableChange} pagination={tableParams.pagination} />

        {/* <Table bordered>
          <thead>
            <tr>
              <th>Date</th>
              <th>Marchant</th>
              <th>Receiver Admin</th>
              <th>Adjust Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adjustmentData &&
              adjustmentData.map((info) => (
                <tr key={info.id}>
                  <td>
                    <span className="align-middle fw-bold">{info.created_at}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.username}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.receiver}</span>
                  </td>
                  <td>
                    <span className="align-middle fw-bold">{info.adjust_amount}</span>
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
                        <DropdownItem href={"/wallet-adjustment/edit/" + info.id}>
                          <Edit className="me-50" size={15} />{" "}
                          <span className="align-middle">Edit</span>
                        </DropdownItem>
                        <DropdownItem href="/" onClick={e => deleteAction(e, info.id)}>
                          <Trash className="me-50" size={15} />{" "}
                          <span className="align-middle">Delete</span>
                        </DropdownItem>
                        <DropdownItem href="/" onClick={e => defaultAddress(e, info)}>
                          <Edit3 className="me-50" size={15} />{" "}
                          <span className="align-middle">Default</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table> */}
{/* 
        <ChangeStatusModal
          statusModalState={statusModalState}
          setStatusModalState={setStatusModalState}
          orderInfo={selectedInfo}
          fetchAdjustmentData={fetchAdjustmentData}
        /> */}

      </div>

    </>
  )
}

export default WalletAdjustment
