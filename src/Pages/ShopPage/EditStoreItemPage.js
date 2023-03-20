/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { deleteReduxStoreItem, selectPointsType, setStoreItems } from "../../features/user/userSlice"
import { deleteStoreItem, updateStoreItems } from "../../utils/firestore"
// import delete icon from react-icons
import { AiOutlineDelete } from "react-icons/ai"
import "./Shop.css"

export default function EditStoreItemPage() {
  const location = useLocation()
  console.log(location.state.storeItem)
  let { itemName, itemPrice, itemDescription, itemLink, itemImageUrl, itemId } = location.state.storeItem
  // const [itemName, setItemName] = useState(itemName)
  // const [itemPrice, setItemPrice] = useState(itemPrice)
  // const [itemDescription, setItemDescription] = useState(itemDescription)
  // const [itemLink, setItemLink] = useState(itemLink)
  // const [itemImgLink, setItemImgLink] = useState(itemImageUrl)
  const pointsType = useSelector(selectPointsType)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function addStoreItem(e) {
    e.preventDefault()
    const formData = new FormData(e.target)

    const { itemName, itemPrice, itemDescription, itemLink, itemImageUrl } = Object.fromEntries(formData.entries())
    const newItem = { itemName, itemPrice: Number(itemPrice), itemDescription, itemLink, itemImageUrl, itemId }
    updateStoreItems(newItem).then((results) => {
      if (results === "success") {
        dispatch(setStoreItems({ [itemId]: newItem }))
        navigate("/main/shop")
      } else {
        alert(results.message)
      }
    })
  }

  function handleDelete() {
    deleteStoreItem(itemId).then((results) => {
      console.log(results)
      if (results === "success") {
        dispatch(deleteReduxStoreItem(itemId))
        alert("Item Deleted!")
        navigate("/main/shop")
      } else {
        alert(results.message)
      }
    })
  }

  return (
    <>
      <section className="p-3 w-75">
        <h1>Edit Store Item</h1>
        <div className="delete-icon-container" onClick={handleDelete}>
          <AiOutlineDelete size="1.5em" color="red" />
        </div>
        <Form onSubmit={addStoreItem}>
          <FormGroup className="mb-3">
            <FormLabel>Item Name</FormLabel>
            <FormControl defaultValue={itemName} type="text" name="itemName" required maxLength={75} />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Item Price</FormLabel>
            <div className="d-flex align-items-center">
              <span style={{ fontSize: 30, paddingRight: 5 }}>{pointsType?.icon}</span>

              <FormControl type="number" max={10000} maxLength={5} placeholder={pointsType?.type !== "money" ? `${pointsType.type}` : "Item Price ( .25 or 1.50 )"} name="itemPrice" defaultValue={itemPrice} min={0} step={pointsType?.type !== "money" ? 1 : 0.25} required />
            </div>
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Brief Description</FormLabel>
            <FormControl defaultValue={itemDescription} name="itemDescription" type="text" maxLength={100} />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Link</FormLabel>
            <FormControl defaultValue={itemLink} name="itemLink" type="url" />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Image Url</FormLabel>
            <FormControl defaultValue={itemImageUrl} name="itemImageUrl" type="url" />
          </FormGroup>
          <Button className="m-3" type="submit">
            Save
          </Button>
        </Form>
      </section>
    </>
  )
}
