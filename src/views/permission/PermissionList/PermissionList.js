import React, { Fragment, useEffect, useState } from "react"
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Button, Table, Input, Label, Form } from "reactstrap"
import Select from "react-select"
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Breadcrumbs from "@components/breadcrumbs"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { Send, User, UserCheck, UserPlus, UserX } from "react-feather"
import { getApi, PERMISSION_LIST, ADMIN_ROLE, ROLE_BASAED_PERMISSION } from "@src/constants/apiUrls"
import useJwt from '@src/auth/jwt/useJwt'

import { Tree } from 'antd'

function PermissionList() {
  const [selectedPermissionid, setSelectedPermissionid] = useState([])

  const [permissionData, setPermissionData] = useState([])
  const [roleBasedPermissionData, setRoleBasedPermissionData] = useState([])
  const [adminRoleData, setAdminRoleData] = useState([])
  const {
    control,
    setError,
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({

  })


  // const handleSelectedPermissionId = (e) => {
  //   console.log('e', e)
  //   const { value, checked } = e.target
  //   if (checked) {
  //     let prevFormValues = [...selectedPermissionid, value]
  //     setSelectedPermissionid(prevFormValues)
  //   } else {
  //     let currentFromValues = selectedPermissionid.filter(item => item !== value)
  //     setSelectedPermissionid(currentFromValues)
  //   }

  // }

  const fetchRoleBasedPermissionData = () => {
    return useJwt
      .axiosGet(getApi(ROLE_BASAED_PERMISSION))
      .then((res) => {
        setRoleBasedPermissionData(res.data)
      })
      .catch((err) => console.log(err))
  }

  const fetchPermissionData = () => {
    return useJwt
      .axiosGet(getApi(PERMISSION_LIST))
      .then((res) => {
        console.log('res permission', res.data)
        setPermissionData(res.data)
      })
      .catch((err) => console.log(err))
  }

  const fetchAdminRoleData = () => {
    return useJwt
      .axiosGet(getApi(ADMIN_ROLE))
      .then((res) => {
        let roleData = []
        res.data.map(data => {
          roleData.push({ value: data.id, label: data.name })
        })
        setAdminRoleData(roleData)

      })
      .catch((err) => console.log(err))
  }


  const fetchAdminRolePermissionData = (adminRoleID) => {
    console.log('adminRole ID', adminRoleID)
    return useJwt
      .axiosGet(getApi(ROLE_BASAED_PERMISSION) + adminRoleID + "/")
      .then((res) => {
        console.log('admin', adminRoleID, "res", res.data)
        let roleData = []
        res.data.map(data => {
          roleData.push(data.permission)

        })
        // setAdminRoleData(roleData)
        setSelectedPermissionid(roleData)

      })
      .catch((err) => console.log(err))
  }



  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      // console.log(value, name, type)
      if (name == "admin_role" && type == "change") {
        fetchAdminRolePermissionData(value?.admin_role?.value)
        console.log('pricing_policy is fffffff', value)
      }

    })
    return () => subscription.unsubscribe()
  }, [watch])


  useEffect(() => {
    fetchPermissionData()
    fetchAdminRoleData()
  }, [selectedPermissionid])

  const onSubmit = data => {
    let isFormValid = true

    if (!data.admin_role) {
      setError("admin_role", {
        type: "required",
        message: "Admin role is required",
      })
      isFormValid = false
    }

    if (!data.admin_role) {
      setError("admin_role", {
        type: "required",
        message: "Admin role is required",
      })
      isFormValid = false
    }

    if (!isFormValid) {
      return false
    }

    if (data.admin_role !== null && selectedPermissionid !== null) {

      let formData = {
        role: data.admin_role.value,
        permissionsID: selectedPermissionid
      }
      useJwt
        .axiosPost(getApi(ROLE_BASAED_PERMISSION), formData)
        .then((res) => {
          SwalAlert("Permission Added Successfully")
          navigate("/permission")
        })
        .catch(err => console.log(err))
    }
  }


  const handleSelectedPermissionId = (permissionId) => {
    const index = selectedPermissionid.indexOf(permissionId)

    if (index === -1) {
      setSelectedPermissionid([...selectedPermissionid, permissionId])
    } else {
      setSelectedPermissionid(selectedPermissionid.filter(id => id !== permissionId))
    }
  }


  const groupedData = {}
  permissionData.forEach(item => {
    const { title } = item
    if (!groupedData[item.module_name]) {
      groupedData[item.module_name] = [title]
    } else {
      groupedData[item.module_name].push(title)
    }
  })
  const groupedDataArray = Object.entries(groupedData).map(([module, title]) => ({ module, title }))
  console.log("groupedDataArray", groupedDataArray)
  return (
    <Fragment>

      <Row>
        <Col sm="12">
          <Card title="Bordered">
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-1 col-md-6'>
                  <Label className='form-label' for='admin_role'>
                    Admin Role
                  </Label>
                  <Controller
                    id="admin_role"
                    name="admin_role"
                    control={control}
                    render={({ field }) => <Select
                      isClearable
                      className={classnames('react-select', { 'is-invalid': errors.admin_role && errors.admin_role.value && true })}
                      classNamePrefix='select'
                      options={adminRoleData}
                      {...field}
                    />}
                  />
                  {errors && errors.admin_role && <span className="invalid-feedback">{errors.admin_role.message}</span>}
                </div>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Module Name</th>
                      <th>Permission</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedDataArray &&
                      groupedDataArray.map((permission) => (

                        <tr key={1}>
                          <td>
                            <span className="align-middle fw-bold">{permission.module}</span>
                          </td>


                          {permission.title.map((data) => (
                            <>
                              <td>
                                <span className="align-middle fw-bold">{data}</span>
                              </td>
                              <td>
                                <Input type='checkbox'
                                  checked={selectedPermissionid.includes(permission.id)}
                                  value={permission.id} onClick={(e) => { handleSelectedPermissionId(permission.id) }} id='remember-me' />
                              </td>

                            </>
                          ))}



                        </tr>
                      ))}
                  </tbody>
                </Table>

                <div className='d-flex pt-2'>
                  <Button className='me-1' color='primary' type='submit'>
                    Submit
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default PermissionList