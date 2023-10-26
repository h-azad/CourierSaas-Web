import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Label, Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap"
import classnames from 'classnames'
import Select from "react-select"
import { Input, Radio, Space } from 'antd'



// export default function Finished({setRouteFinishing, SubmitDataHandler}) {
export default function Finished({ finishedData }) {
  const [value, setValue] = useState()
  const onChange = (e) => {
    setValue(e.target.value)
    finishedData?.setRouteFinishing(e.target.value)
  }
  return (
    <Card>
      <CardBody>
        <div className='mb-1'>
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={'Return to start location'}>Return to start location</Radio>
              <Radio value={'At the end area'}>At the end area</Radio>
              <Radio value={'No end location'}>No end location</Radio>
            </Space>
          </Radio.Group>
        </div>
        <div className='d-flex'>
          <Button className='me-1' onClick={finishedData?.prev}>
            Prev
          </Button>
          <Button className='me-1' onClick={(e) => { finishedData?.SubmitDataHandler(), console.log('hello') }}>
            Done
          </Button>
        </div>
      </CardBody>
    </Card>

  )
}