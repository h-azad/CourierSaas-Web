import { Link } from "react-router-dom"
import { Search, Trash, Edit } from "react-feather"
import {
  Table,
  Button,
  CardText,
  DropdownItem,
} from "reactstrap"
import { useEffect, useState } from "react"
import useJwt from '@src/auth/jwt/useJwt'
import { getApi, AGENT_TYPE_LIST, AGENT_TYPE_DELETE } from "../../../../constants/apiUrls"

import SwalAlert from "../../../../components/SwalAlert"
import SwalConfirm from "../../../../components/SwalConfirm"

const AgentTypeList = () => {

  const [agentType, setAgentType] = useState(null)


  const deleteAction = (e, id) => {
    e.preventDefault()

    return SwalConfirm(`You won't be able to revert this!`, "Delete").then(
      function (result) {
        if (result.value) {
          useJwt
            .axiosDelete(getApi(AGENT_TYPE_DELETE + id + "/"))
            .then((res) => {
              SwalAlert("Deleted Successfully")
            })
            .finally(() => fetchAgentTypeData())
        }
      }
    )
  }




  useEffect(() => {
    fetchAgentTypeData()
  }, [])

  useEffect(() => {
    // if (!statusModalState) {
    //   clearData()
    // }
    fetchAgentTypeData()
  }, [])

  const fetchAgentTypeData = () => {
    return useJwt
      .axiosGet(getApi(AGENT_TYPE_LIST))
      .then((res) => {
        console.log("res", res.data)
        setAgentType(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <CardText>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="d-flex align-items-center">
              <Link to={'/agent-type/add'}>
                <Button.Ripple color="primary">Add Agent Type</Button.Ripple>
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex align-items-center ">
              <input
                placeholder="Search Agent Type"
                name="marchant_name"
                type="text"
                class="form-control"
              // onChange={handleSearch}
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
            <th>Name</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {agentType &&
            agentType.map((type) => (
              <tr key={type.id}>
                <td>
                  <span className="align-middle fw-bold">{type?.name}</span>
                </td>
                <td>
                
                    <Trash href="/" onClick={(e) => deleteAction(e, type.id)} className="me-50" size={15} />{" "}

                        <Edit href={"/areas/edit/" + type.id} className="me-50" size={15} />{" "}


                </td>
              </tr>
            ))}
        </tbody>
      </Table>

    </>
  )
}

export default AgentTypeList
