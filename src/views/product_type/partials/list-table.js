import { Link } from "react-router-dom"
import { MoreVertical, Edit, Trash,Search } from "react-feather"
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  CardText,
} from "reactstrap"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, PRODUCT_TYPE_LIST, PRODUCT_TYPE_DELETE,SEARCH_PRODUCT } from "../../../constants/apiUrls"
import SwalAlert from "../../../components/SwalAlert"
import SwalConfirm from "../../../components/SwalConfirm"

const ListTable = () => {
  const [product, setProduct] = useState([])
  const MySwal = withReactContent(Swal)

  const deleteAction = (e, id) => {
    e.preventDefault()
    return SwalConfirm(`You won't be able to revert this!`, 'Delete').then(function (result) {
      if (result.value) {

      useJwt
        .axiosDelete(getApi(PRODUCT_TYPE_DELETE+id+'/'))
        .then((res) => {
          SwalAlert("Deleted Successfully")
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

  const fetchSearchProductData = searchTerm => {
    return useJwt
      .axiosGet(getApi(SEARCH_PRODUCT)+'?search='+ searchTerm)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.log(err))
  }

  const handleSearch = debounce(e => {
    console.log(e.target.value)
    const searchTerm = e.target.value
    if (searchTerm.length > 2) {
      fetchSearchProductData(searchTerm)
        .then(data => {
          if (data.length > 0) {
            console.log('res', data)
            setProduct(data)
          }else{
            console.log("No data")
          }
        })
    }
    
  }, 300)

  function debounce (fn, time) {
    let timeoutId
    return wrapper
    function wrapper (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        timeoutId = null
        fn(...args)
      }, time)
    }
  }

  return (
    <>
      <CardText>
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="d-flex align-items-center">
                <Link to={'/product_type/add'}>
                  <Button.Ripple color="primary">Add Product Type</Button.Ripple>
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="d-flex align-items-center ">
                <input
                  placeholder="Search Product "
                  name="user_name"
                  type="text"
                  class="form-control"
                  onChange={handleSearch}
                />
                <Button.Ripple className="btn-icon ms-1" outline color="primary">
                  <Search size={16} />
                </Button.Ripple>
              </div>
            </div>
          </div>
        </CardText>
      <Table bordered>
        <thead>
          <tr>
            <th>Product Type</th>
            <th>Volume Unit</th>
            <th>Weight Unit</th>
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
                  <span className="align-middle fw-bold">{info.volume_unit}</span>
                </td>             
                <td>
                  <span className="align-middle fw-bold">{info.weight_unit}</span>
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
    </>
  )
}

export default ListTable
