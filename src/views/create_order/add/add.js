import { Steps } from 'antd'
import React, {useEffect, useState} from 'react'
import ParcelInfo from './ParcelInfo'
import RecipientInfo from './RecipientInfo'
import ParcelItems from './ParcelItems'
import Overview from './Overview'




const AddOrder = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [recipientName, setRecipientName] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [delivaryAddress, setDelivaryAddress] = useState()
  const [stepsData, setStepsData] = useState()

  const [orderType, setOrderType] = useState()

  const [marchant, setMarchant] = useState()
  const [city, setCity] = useState()
  const [area, setArea] = useState()
  const [amountCollected, setAmountCollected] = useState()
  const [deliveryCharge, setDeliveryCharge] = useState()

  const [productTypeData, setProductTypeData] = useState()
  const [percellTypeData, setPricingPolicyData] = useState()
  const [shipmentData, setShipmentTypeData] = useState()

  const [parcelItems, setParcelItems] = useState([{
    'item_details': '',
    'item_quantity': ''
  }])
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


    setMarchant: setMarchant,
    marchant: marchant,
    setCity: setCity,
    city: city,
    setArea: setArea,
    area: area,
    setAmountCollected: setAmountCollected,
    amountCollected: amountCollected,
    setDeliveryCharge: setDeliveryCharge,
    deliveryCharge: deliveryCharge,
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

    setParcelItems: setParcelItems,
    parcelItems: parcelItems,
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

    marchant: marchant,
    city: city,
    area: area,
    amountCollected: amountCollected,
    deliveryCharge: deliveryCharge,
    orderType: orderType,
    productTypeData: productTypeData,
    percellTypeData: percellTypeData,
    shipmentData: shipmentData,

    parcelItems: parcelItems,
    itemQuentity: itemQuentity,

    next: next,
    prev: prev,
  }

  const steps = [

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

  ]



  const items = steps.map((item, idx) => ({
    key: idx,
    title: item.title,
  }))


  useEffect(() => { setStepsData(steps) }, [])

  return (
    <>
      <Steps labelPlacement="vertical" current={currentStep} items={items} />
      <div style={{ marginTop: '40px' }}>{steps[currentStep].content}</div>
    </>
  )
}
export default AddOrder






