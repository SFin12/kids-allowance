import { useState } from "react"
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectPointsType, setStoreItems } from "../../features/user/userSlice"
// import { uploadImageToBucket } from "../../utils/firebaseStorage"
import { updateStoreItems } from "../../utils/firestore"
import "./Shop.css"

export default function AddStoreItemPage() {
  // const [itemName, setItemName] = useState("")
  // const [itemPrice, setItemPrice] = useState()
  // const [itemDescription, setItemDescription] = useState("")
  // const [itemLink, setItemLink] = useState("")
  // const [itemImgLink, setItemImgLink] = useState("")
  const [uploadedImage, setUploadedImage] = useState(null)
  const pointsType = useSelector(selectPointsType)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function addStoreItem(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    console.log(Object.fromEntries(formData.entries()))
    const { itemName, itemPrice, itemDescription, itemLink, itemImgLink } = Object.fromEntries(formData.entries())
    const itemId = Date.now()
    const newItem = { itemName, itemPrice: Number(itemPrice), itemDescription, itemLink, itemImgLink, itemId }
    updateStoreItems(newItem).then((results) => {
      if (results === "success") {
        dispatch(setStoreItems({ [itemId]: newItem }))
        navigate("/main/shop")
      } else {
        alert(results.message)
      }
    })
    // setItemName(itemName)
    // setItemPrice(itemPrice)
    // setItemDescription(itemDescription)
    // setItemLink(itemLink)
    // setItemImgLink(itemImgLink)
  }

  return (
    <>
      <section className="p-3 w-75">
        <h1>Add Store Item</h1>
        <Form onSubmit={addStoreItem}>
          <FormGroup className="mb-3">
            <FormLabel>Item Name</FormLabel>
            <FormControl defaultValue={""} type="text" name="itemName" required maxLength={75} />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Item Price</FormLabel>
            <div className="d-flex align-items-center">
              <span style={{ fontSize: 30, paddingRight: 5 }}>{pointsType?.icon}</span>

              <FormControl type="number" max={10000} maxLength={5} placeholder={pointsType?.type !== "money" ? `${pointsType.type}` : "Item Price ( .25 or 1.50 )"} name="itemPrice" defaultValue={""} min={0} step={pointsType?.type !== "money" ? 1 : 0.25} required />
            </div>
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Brief Description</FormLabel>
            <FormControl defaultValue={""} name="itemDescription" type="text" maxLength={100} />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Link</FormLabel>
            <FormControl defaultValue={""} name="itemLink" type="url" />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Image Url</FormLabel>
            <FormControl defaultValue={""} name="itemImgLink" type="url" />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Upload Image</FormLabel>
            <FormControl defaultValue={uploadedImage} name="itemImage" type="file" onChange={(e) => setUploadedImage(e.target.files[0])} />
          </FormGroup>
          <Button className="m-3" type="submit">
            Save
          </Button>
        </Form>
      </section>
    </>
  )
}
