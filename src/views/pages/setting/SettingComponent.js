import { Radio, Space, Tabs } from 'antd'
import React, { useState } from 'react'
import EditCompanySetting from './CompanySetting'
const SettingComponent = () => {
  return (
    <>
      <Space
        style={{
          marginBottom: 24,
        }}
      >
        
      </Space>
      <Tabs
        tabPosition='left'
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1)
          return {
            label: 'Company Setting',
            key: id,
            children: <EditCompanySetting/>,
            
          }
          
        })}
      />
    </>
  )
}
export default SettingComponent