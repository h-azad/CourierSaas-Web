import { Button, message, Steps, theme } from 'antd'
import React, {useEffect, useState} from 'react'
import ParcelInfo from './ParcelInfo'
import RecipientInfo from './RecipientInfo'
import ParcelItems from './ParcelItems'
import Shipment from './Shipment'
import Overview from './Overview'




const AddOrder = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [recipientName, setRecipientName] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [delivaryAddress, setDelivaryAddress] = useState()
  const [stepsData, setStepsData] = useState()

  const [orderType, setOrderType] = useState()
  const [productTypeData, setProductTypeData] = useState()
  const [percellTypeData, setPricingPolicyData] = useState()
  const [shipmentData, setShipmentTypeData] = useState()

  const [productDetails, setProductDetails] = useState()
  const [itemQuentity, setItemQuentiry] = useState()


  const next = () => {
    setCurrentStep(currentStep + 1)
  }
  const prev = () => {
    setCurrentStep(currentStep - 1)
  }

  const recipienInfoPropsData = {
    setCurrentStep: setCurrentStep,
    currentStep: currentStep,
    stepsData: stepsData,
    setRecipientName: setRecipientName,
    recipientName: recipientName,
    setPhoneNumber: setPhoneNumber,
    phoneNumber: phoneNumber,
    setDelivaryAddress: setDelivaryAddress,
    delivaryAddress: delivaryAddress,
    next: next,
    prev: prev,
  }

  const parcellInfoPropsData = {
    setCurrentStep: setCurrentStep,
    currentStep: currentStep,
    stepsData: stepsData,

    // setMarchantData: setMarchantData,
    // marchantData: marchantData,
    setOrderType: setOrderType,
    orderType: orderType,
    setProductTypeData: setProductTypeData,
    productTypeData: productTypeData,
    setPricingPolicyData: setPricingPolicyData,
    percellTypeData: percellTypeData,
    setShipmentTypeData: setShipmentTypeData,
    shipmentData: shipmentData,
    next: next,
    prev: prev,
  }

  const parcellItemPropsData = {
    setCurrentStep: setCurrentStep,
    currentStep: currentStep,
    stepsData: stepsData,

    setProductDetails: setProductDetails,
    productDetails: productDetails,
    setItemQuentiry: setItemQuentiry,
    itemQuentity: itemQuentity,

    next: next,
    prev: prev,
  }


  const overViewData = {
    setCurrentStep: setCurrentStep,
    currentStep: currentStep,
    stepsData: stepsData,

    recipientName: recipientName,
    phoneNumber: phoneNumber,
    delivaryAddress: delivaryAddress,

    orderType: orderType,
    productTypeData: productTypeData,
    percellTypeData: percellTypeData,
    shipmentData: shipmentData,

    productDetails: productDetails,
    itemQuentity: itemQuentity,

    next: next,
    prev: prev,
  }

  const steps = [
    {
      title: 'Parcel Items',
      content: <ParcelItems parcellItemPropsData={parcellItemPropsData} />,
    },
    {
      title: 'Recipient Info',
      content: <RecipientInfo recipienInfoPropsData={recipienInfoPropsData} />,
    },
    {
      title: 'Parcel Info',
      content: <ParcelInfo parcellInfoPropsData={parcellInfoPropsData} />,
    },

    {
      title: 'Parcel Items',
      content: <ParcelItems parcellItemPropsData={parcellItemPropsData} />,
    },
    {
      title: 'Overview',
      content: <Overview overViewData={overViewData} />,
    },

    // {
    //   title: 'Last',
    //   content: <Shipment />,
    // },
    // {
    //   title: 'Last',
    //   content: <Overview />,
    // },
  ]



  const items = steps.map((item, idx) => ({
    key: idx,
    title: item.title,
  }))


  useEffect(() => { setStepsData(steps) }, [])

  console.log(currentStep)
  return (
    <>
      <Steps labelPlacement="vertical" current={currentStep} items={items} />
      <div style={{ marginTop: '40px' }}>{steps[currentStep].content}</div>
    </>
  )
}
export default AddOrder






