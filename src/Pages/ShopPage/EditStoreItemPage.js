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
import { uploadImageToBucket } from "../../utils/firebaseStorage"
import LoadingSpinner from "../../components/Loading/LoadingSpinner"

export default function EditStoreItemPage() {
  const [isLoading, setIsLoading] = useState(false)
  // const [uploadedFile, setUploadedFile] = useState("")
  const location = useLocation()
  const screenWidth = window.innerWidth
  let { itemName, itemPrice, itemDescription, itemLink, itemImageUrl, itemId } = location.state.storeItem
  const pointsType = useSelector(selectPointsType)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function addStoreItem(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    console.log(Object.fromEntries(formData.entries()))
    let { itemName, itemPrice, itemDescription, itemLink, itemImageUrl, itemImage } = Object.fromEntries(formData.entries())

    const waitForImageUpload = async () => {
      let imageUrl
      if (itemImage.name) {
        console.log(itemImage)
        imageUrl = await uploadImageToBucket(itemImage.name, itemImage)
      } else {
        imageUrl = itemImageUrl
      }
      const newItem = { itemName, itemPrice: Number(itemPrice), itemDescription, itemLink, itemImageUrl: imageUrl, itemId }
      updateStoreItems(newItem).then((results) => {
        if (results === "success") {
          dispatch(setStoreItems({ [itemId]: newItem }))
          navigate("/main/shop")
        } else {
          alert(results.message)
        }
      })
      setIsLoading(false)
    }
    setIsLoading(true)
    waitForImageUpload()
  }

  function handleDelete() {
    deleteStoreItem(itemId).then((results) => {
      if (results === "success") {
        dispatch(deleteReduxStoreItem(itemId))
        alert("Item Deleted!")
        navigate("/main/shop")
      } else {
        alert(results.message)
      }
    })
  }

  if (isLoading) return <LoadingSpinner />

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

          <FormGroup className="mb-3" hidden={screenWidth < 1180}>
            <FormLabel>Image Url</FormLabel>
            <FormControl defaultValue={itemImageUrl} name="itemImageUrl" type="url" />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Upload Image</FormLabel>
            <FormControl defaultValue={""} name="itemImage" type="file" accept="image/*" />
          </FormGroup>
          <Button className="m-3" type="submit">
            Save
          </Button>
        </Form>
      </section>
    </>
  )
}
