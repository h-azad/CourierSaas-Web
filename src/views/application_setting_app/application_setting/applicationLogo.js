import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Modal, Upload } from 'antd'

import { PlusOutlined } from '@ant-design/icons'




const ApplicationLogo = ({ propsData }) => {

  const [form] = Form.useForm()

  const normFile = (e, any) => {
    if (Array.isArray(e)) {
      console.log('e', e)
      return e
    }
    propsData?.setApplicationLogo(e?.fileList[0].originFileObj)
    console.log('e?.fileList', e?.fileList[0].originFileObj)
    return e?.fileList
  }


  const onSubmit = async (values) => {


    // if (values?.application_logo) {
    //   propsData?.setApplicationLogo(values?.application_logo[0].originFileObj)
    //   // formData.append("application_logo", values?.application_logo[0].originFileObj)
    // }
    propsData.onSubmit()

  }

  return <>

    <Form
      name="basic"
      style={{
        maxWidth: "100",
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onSubmit}
      encType='multipart/form-data'
      autoComplete="off"
    >

      <Form.Item label="left Image" valuePropName="fileList" name='application_logo' getValueFromEvent={normFile}>
        <Upload listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  
  </>


//   const getBase64 = (file) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader()
//       reader.readAsDataURL(file)
//       reader.onload = () => resolve(reader.result)
//       reader.onerror = (error) => reject(error)
//     })

//   const onFinish = (values) => {

//     propsData.onSubmit()

//   }


//   const [previewOpen, setPreviewOpen] = useState(false)
//   const [previewImage, setPreviewImage] = useState('')
//   const [previewTitle, setPreviewTitle] = useState('')
//   // const [fileList, setFileList] = useState([])
//   const handleCancel = () => setPreviewOpen(false)
//   const handlePreview = async (file) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj)
//     }
//     setPreviewImage(file.url || file.preview)
//     setPreviewOpen(true)
//     setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
//   }
  
//   const handleChange = ({ fileList: newFileList }) => propsData?.setApplicationLogo(newFileList)
//   const uploadButton = (
//     <div>
//       <PlusOutlined />
//       <div
//         style={{
//           marginTop: 8,
//         }}
//       >
//         Upload
//       </div>
//     </div>
//   )



//   // useEffect(() => {
//   //   if (propsData) {
//   //     form.setFieldValue("google_key", propsData?.googleKey)
//   //   }
//   // }, [])

//   const normFile = (e, any) => {
//     if (Array.isArray(e)) {
//       return e
//     }
//     return e?.fileList
//   }


//   return (
//     <>

//       <Form
//         name="Host Email Setting"
//         form={form}
//         labelCol={{
//           span: 8,
//         }}
//         wrapperCol={{
//           span: 16,
//         }}
//         style={{
//           maxWidth: 600,
//         }}
//         initialValues={{
//           remember: true,
//         }}
//         onFinish={onFinish}
//         // onFinishFailed={onFinishFailed}
//         autoComplete="off"
//       >

//         <Form.Item label="Company Logo" valuePropName="fileList" name='application_logo' getValueFromEvent={normFile}>
//           <Upload listType="picture-card" onChange={(e) => { propsData?.setApplicationLogo(e.file?.originFileObj), console.log(e.file?.originFileObj)}}>
//             <div>
//               <PlusOutlined />
//               <div style={{ marginTop: 8 }}>Upload</div>
//             </div>
//           </Upload>
//         </Form.Item>

//         <Form.Item
//           wrapperCol={{
//             offset: 8,
//             span: 16,
//           }}
//         >
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>

//       <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
//         <img
//           alt="example"
//           style={{
//             width: '100%',
//           }}
//           src={previewImage}
//         />
//       </Modal>
//     </>
//   )

}


export default ApplicationLogo