// import React, { useEffect, useMemo, useState } from "react"
// import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
// import { FaPlus, FaPlusCircle } from "react-icons/fa"
// import { useDispatch, useSelector } from "react-redux"
// import { selectPointsType, selectStoreItems, setStoreItems } from "../../features/user/userSlice"
// import { getStoreItems, updateStoreItems } from "../../utils/firestore"
// import MainModal from "../Modal/MainModal"
// import "./AddStoreItem.css"

// export default function AddStoreItem() {
//   const [showModal, setShowModal] = useState(false)
//   const [itemName, setItemName] = useState("")
//   const [itemPrice, setItemPrice] = useState()
//   const [itemDescription, setItemDescription] = useState("")
//   const [itemLink, setItemLink] = useState("")
//   const [itemImgLink, setItemImgLink] = useState("")
//   const pointsType = useSelector(selectPointsType)
//   const dispatch = useDispatch()

//   function handlSubmit(e) {
//     e.preventDefault()
//     const formData = new FormData(e.target)
//     const { itemName, itemPrice, itemDescription, itemLink, itemImgLink } = Object.fromEntries(formData.entries())
//     const newItem = { itemName, itemPrice: Number(itemPrice), itemDescription, itemLink, itemImgLink }
//     console.log(newItem)
//     dispatch(setStoreItems({ [itemName]: newItem }))
//     updateStoreItems(newItem)
//     setItemName(itemName)
//     setItemPrice(itemPrice)
//     setItemDescription(itemDescription)
//     setItemLink(itemLink)
//     setItemImgLink(itemImgLink)
//     setShowModal(false)
//   }

//   function handleModal() {
//     console.log("modal")
//     setShowModal(!showModal)
//   }

//   return (
//     <>
//       <MainModal show={showModal} title="Add Item" onHide={handleModal}>
//         {console.log("showModalTrue")}
//         <Form onSubmit={handlSubmit}>
//           <FormGroup className="mb-3">
//             <FormLabel>Item Name</FormLabel>
//             <FormControl defaultValue={itemName} type="text" name="itemName" required />
//           </FormGroup>
//           <FormGroup className="mb-3">
//             <FormLabel>Item Price</FormLabel>
//             <div className="d-flex align-items-center">
//               <span style={{ fontSize: 30, paddingRight: 5 }}>{pointsType?.icon}</span>

//               <FormControl type="number" max={10000} maxLength={5} placeholder={pointsType?.type !== "money" ? `${pointsType.type}` : "Item Price ( .25 or 1.50 )"} name="itemPrice" defaultValue={itemPrice} min={0} step={pointsType?.type !== "money" ? 1 : 0.25} required />
//             </div>
//           </FormGroup>
//           <FormGroup className="mb-3">
//             <FormLabel>Brief Description</FormLabel>
//             <FormControl defaultValue={itemDescription} name="itemDescription" type="text" />
//           </FormGroup>
//           <FormGroup className="mb-3">
//             <FormLabel>Link</FormLabel>
//             <FormControl defaultValue={itemLink} name="itemLink" type="url" />
//           </FormGroup>
//           <FormGroup className="mb-3">
//             <FormLabel>Image Url</FormLabel>
//             <FormControl defaultValue={itemImgLink} name="itemImgLink" type="url" />
//           </FormGroup>
//           <Button className="m-3" type="submit">
//             Save
//           </Button>
//         </Form>
//       </MainModal>
//       <div className="add-item-button-container">
//         <FaPlus size="2rem" color="darkgrey" className="add-item-button" onClick={handleModal} />
//       </div>
//     </>
//   )
// }
