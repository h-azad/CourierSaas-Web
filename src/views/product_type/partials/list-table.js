import AvatarGroup from "@components/avatar-group"
import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash } from "react-feather"
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap"
import { useEffect, useState } from "react"
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ToastContent from "../../../components/ToastContent"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, PRODUCT_TYPE_LIST, PRODUCT_TYPE_DELETE } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"

const ListTable = () => {
  const [product, setProduct] = useState([])
  const MySwal = withReactContent(Swal)

  const deleteAction = (e, id) => {
    e.preventDefault()
    // console.log("Deleted", id)
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

      useJwt
        .axiosDelete(getApi(PRODUCT_TYPE_DELETE+id+'/'))
        .then((res) => {
          // console.log("res", res.data)
          SwalAlert("Deleted Successfully")
          
          // return res.data
        })
        .finally(() => fetchProductData())
        
      }
    })
   
  }

  useEffect(() => {
    fetchProductData()
  }, [])

  const fetchProductData = () => {
    return useJwt
      .axiosGet(getApi(PRODUCT_TYPE_LIST))
      .then((res) => {
        console.log("res", res.data)
        setProduct(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }

  return (
    <Table bordered>
      <thead>
        <tr>
          <th>Product Type</th>
          <th>Shipment Type</th>
          <th>Service Type</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {product &&
          product.map((info) => (
            <tr key={info.id}>
              <td>
                <span className="align-middle fw-bold">{info.product_type}</span>
              </td>
              <td>
                <span className="align-middle fw-bold">{info.shipment.shipment_type}</span>
              </td>
              <td>
                <span className="align-middle fw-bold">{info.service.service_type}</span>
              </td>
              <td>
                <Badge pill color="light-primary" className="me-1">
                  {info.status}
                </Badge>
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
                    <DropdownItem href={"/product_type/edit/" + info.id}>
                      <Edit className="me-50" size={15} />{" "}
                      <span className="align-middle">Edit</span>
                    </DropdownItem>
                    <DropdownItem href="/" onClick={e=>deleteAction(e, info.id)}>
                      <Trash className="me-50" size={15} />{" "}
                      <span className="align-middle">Delete</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  )
}

export default ListTable
