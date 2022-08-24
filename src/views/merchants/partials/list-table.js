import AvatarGroup from '@components/avatar-group'
import { Link } from 'react-router-dom'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'


const ListTable = () => {

  const deleteAction = (e) => {
    e.preventDefault()
    console.log("Deleted")
  }

  return (
    <Table bordered>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span className='align-middle fw-bold'>Angular Project</span>
          </td>
          <td>Peter Charles</td>
          <td>
            <Badge pill color='light-primary' className='me-1'>
              Active
            </Badge>
          </td>
          <td>
            <UncontrolledDropdown>
              <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href='/merchants/edit'>
                   <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                </DropdownItem>
                <DropdownItem href='/' onClick={deleteAction}>
                  <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default ListTable