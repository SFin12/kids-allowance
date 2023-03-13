import { useState } from "react"
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectPointsType, setStoreItems } from "../../features/user/userSlice"
import { updateStoreItems } from "../../utils/firestore"
import "./Shop.css"

export default function AddStoreItemPage() {
  const [itemName, setItemName] = useState("")
  const [itemPrice, setItemPrice] = useState()
  const [itemDescription, setItemDescription] = useState("")
  const [itemLink, setItemLink] = useState("")
  const [itemImgLink, setItemImgLink] = useState("")
  const pointsType = useSelector(selectPointsType)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function addStoreItem(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const { itemName, itemPrice, itemDescription, itemLink, itemImgLink } = Object.fromEntries(formData.entries())
    const newItem = { itemName, itemPrice: Number(itemPrice), itemDescription, itemLink, itemImgLink }
    console.log(newItem)
    dispatch(setStoreItems({ [itemName]: newItem }))
    updateStoreItems(newItem)
    setItemName(itemName)
    setItemPrice(itemPrice)
    setItemDescription(itemDescription)
    setItemLink(itemLink)
    setItemImgLink(itemImgLink)
    navigate("/main/shop")
  }

  return (
    <>
      <section className="p-3 w-75">
        <h1>Add Store Item</h1>
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
            <FormControl defaultValue={itemImgLink} name="itemImgLink" type="url" />
          </FormGroup>
          <Button className="m-3" type="submit">
            Save
          </Button>
        </Form>
      </section>
    </>
  )
}
