// ** React Imports
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
// ** Icons Imports
import { AlignJustify, Rss, Info, Image, Users, Edit } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button } from 'reactstrap'

const ProfileHeader = ({ data }) => {
  // ** States
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const toggle = () => setIsOpen(!isOpen)

  return (
    <Card className='profile-header mb-2'>
      <div className='profile-header-nav'>
        <Navbar container={false} className='justify-content-end justify-content-md-between w-100' expand='md' light>
          <Collapse isOpen={isOpen} navbar>
            <div className='profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0'>
              <Button onClick={(e) => {
                  {
                    e.preventDefault(),
                      navigate('/profile/edit')
                    return true
                  }
                }} color='primary'>
                <Edit className='d-block d-md-none' size={14} />
                <span className='fw-bold d-none d-md-block'>Edit</span>
              </Button>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </Card>
  )
}

export default ProfileHeader
