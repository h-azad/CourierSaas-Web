

import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash, Search, Edit3, Eye } from "react-feather"
import {
  Card,
  // Table,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  CardText,
  Input,
  Modal, ModalHeader, ModalBody, ModalFooter, CardHeader, CardBody
} from "reactstrap"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import useJwt from "@src/auth/jwt/useJwt"
import { Table, Checkbox, Divider } from "antd"

import {
  getApi,
  RIDER_ASSIGNMENT,
  RIDER_DELETE,
  UNPICKUP_ORDER_LIST,
  RIDER_SEARCH_FILTER,
} from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"
import StatusModal from "../../../components/StatusModal"
import toast from 'react-hot-toast'

const PendingCODCollectionList = () => {
  const [order, setOrder] = useState()

  

  const checkData = []
  const checkAll = order?.length === checkData?.length

  const [selectedorderID, setSelectedorderID] = useState([])

  const handleSelectedOrderId = (orderID) => {
    const index = selectedorderID.indexOf(orderID)

    if (index === -1) {
      setSelectedorderID([...selectedorderID, orderID])
      console.log(orderID)
    } else {
      setSelectedorderID(selectedorderID.filter(id => id !== orderID))
      console.log(orderID)
    }
  }

  console.log('selectedorderID', selectedorderID)

  const fetchOrderData = () => {
    return useJwt.axiosGet(getApi('/rider_app/pending-cod/collection/'+1))
      .then((res) => {
        setOrder(res?.data?.results)
      }).catch((err) => {
      })
  }


  const columns = [
    {
      title: 'Parcel ID',
      dataIndex: 'parcel_id',
      sorter: true,
      defaultSortOrder: 'ascend'

    },

    {
      title: 'Delivery Address',
      dataIndex: 'delivary_address',
    },

    {
      title: 'Total',
      dataIndex: 'total',
      render: (text, record) => (
        Number(record?.amount_to_be_collected) +
        Number(record?.delivary_charge)
      ),
    },
    {
      title: 'Action',

      render: (_, info) =>

      <>
         
          <Checkbox value={info.id} onChange={(e) => { handleSelectedOrderId(e.target.value)}}></Checkbox>
      </>

    },
  ]


  useEffect(()=>{
    fetchOrderData()
  }, [])

  return (
    <>
      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="d-flex align-items-center">
              <Card title="Bordered">
                <CardBody>
                  <div className="d-flex gap-1">
                    <span className="align-middle fw-bold">Checked All</span>
                    
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardText>
                    Total: 2000
                  </CardText>
                </CardBody>
              </Card>
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
              />
              <Button.Ripple className="btn-icon ms-1" outline color="primary">
                <Search size={16} />
              </Button.Ripple>
            </div>
          </div>
          <Table scroll={{ x: true }} columns={columns} dataSource={order} />
        </div>
      </CardText>
 
    </>
  )
}

export default PendingCODCollectionList

