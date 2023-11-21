import { Link } from "react-router-dom"
import { Edit, Trash, Search, Edit3, Eye } from "react-feather"
import {
  Button,
  CardText,
} from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from "@src/auth/jwt/useJwt"
import {
  getApi,
  HUB,
} from "../../../constants/apiUrls"

import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"

import { Table, Dropdown } from "antd"
import { DownOutlined } from '@ant-design/icons'

import * as qs from 'qs'
import { GENERAL_ROW_SIZE } from "../../../constants/tableConfig"

import toast from 'react-hot-toast'

const HubAdminList = () => {
  const [hubsData, setHubsData] = useState([])

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

    return SwalConfirm(`You won't be able to revert this!`, "Delete").then(
      function (result) {
        if (result.value) {
          useJwt
            .axiosDelete(getApi(HUB + "/" + id))
            .then((res) => {
              SwalAlert("Deleted Successfully")
              toast.success('Deleted Successfully!')
            }).catch((error) => {
              toast.error(error?.message)
              toast.error("Hub Delete Not Possible")
            })
            .finally(() => fetchHubsData())
        }
      }
    )
  }



  const fetchHubsData = () => {
    return useJwt
      .axiosGet(getApi(HUB) + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setHubsData(res?.data?.results)
        updatePagination({
          current: res?.data?.page_number,
          pageSize: res?.data?.page_size,
          total: res?.data?.count,
        })
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


  const renderDropDownItems = (info) => {
    const it = [
      {
        key: '1',
        label: (
          <Link to={"/hub/edit/" + info.id}><Edit className="me-20" size={15} />{" "}Edit</Link>
        ),
      },
      {
        key: '2',
        label: (
          <a href='/' onClick={(e) => deleteAction(e, info.id)}><Trash className="me-20" size={15} />{" "}Delete</a>
        ),
      },
    ]

    return it
  }


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'City Name',
      dataIndex: ['city', 'city_name'],
    },
    {
      title: 'Area',
      dataIndex: ['area', 'area_name'],
    },
    {
      title: 'Address',
      dataIndex: ['address'],
    },
    {
      title: 'Action',
      render: (_, info) => (

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
      )
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
    fetchHubsData()
  }, [JSON.stringify(filterQuery)])



  return (
    <>
      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="d-flex align-items-center">
              <Link to={"/hub/add"}>
                <Button.Ripple color="primary">Add Hub</Button.Ripple>
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Hub"
                name="user_name"
                type="text"
                class="form-control"
                // value=""
                onChange={(e) => updateFilterQUery('search', e.target.value)}
              />
              <Button.Ripple className="btn-icon ms-1" outline color="primary">
                <Search size={16} />
              </Button.Ripple>
            </div>
          </div>
        </div>
      </CardText>
      <div class="table-responsive">
        <Table scroll={{ x: true }} columns={columns} dataSource={hubsData} onChange={handleTableChange} pagination={tableParams.pagination} />
      </div>
    </>
  )
}

export default HubAdminList
