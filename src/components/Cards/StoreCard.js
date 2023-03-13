/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react"
import { useSelector } from "react-redux"
import { selectActiveFamilyMember, selectPointsType, selectUserId } from "../../features/user/userSlice"
import { convertDecimalsToDollarsAndCents } from "../../utils/helper"
import defaultStoreImage from "../../assets/shop.png"
import { Button } from "react-bootstrap"
import MainModal from "../Modal/MainModal"
import "./Card.css"
import { updateAllowance } from "../../utils/firestore"
import { selectAllowance } from "../../features/allowance/allowanceSlice"
import { AiOutlineEdit } from "react-icons/ai"
import { Link } from "react-router-dom"

export default function StoreCard({ storeItem }) {
  const pType = useSelector(selectPointsType)
  const userId = useSelector(selectUserId)
  const allowance = useSelector(selectAllowance)
  const activeFamilyMember = useSelector(selectActiveFamilyMember)
  const [showModal, setShowModal] = useState(false)
  const { itemName, price, description, link, imageUrl } = storeItem
  // const [name, setName] = useState(itemName)
  // const [itemPrice, setItemPrice] = useState(price)
  // const [itemDescription, setItemDescription] = useState(description)
  // const [itemLink, setItemLink] = useState(link)
  // const [itemImgLink, setItemImgLink] = useState(imageUrl)

  function handleBuy() {
    if (!activeFamilyMember) {
      alert("You must select a family member to buy this item!")
      return
    }
    if (price > allowance[activeFamilyMember].currentTotal) {
      alert("You don't have enough allowance to buy this item!")
      return
    }

    setShowModal(true)
  }

  function handleHide() {
    setShowModal(false)
  }

  function handleConfirmBuy() {
    setShowModal(false)
    const spent = price * -1
    updateAllowance(activeFamilyMember, spent, userId)
  }

  return (
    <div className="store-card">
      <a href={link} className="item-image-container">
        <img className="item-image" src={imageUrl ? imageUrl : defaultStoreImage} alt="sky" />
      </a>

      <div className="store-info-container">
        <div>{itemName}</div>
        {price ? (
          pType?.type === "money" ? (
            <div className="chore-value">
              {/* Check if numVal is a whole number or decimal */}
              {Number(price) % 1 === 0 ? `$${price}` : `${convertDecimalsToDollarsAndCents(Number(price))}`}
            </div>
          ) : (
            <div>
              <div>{price + " " + pType.icon}</div>
            </div>
          )
        ) : null}
        <div>{description}</div>

        <div className="bottom-right">
          <Link to={"/main/editStoreItem"} state={{ storeItem }} style={{ height: 20 }}>
            <AiOutlineEdit style={{ height: "2rem", width: "2rem", color: "teal", marginTop: "1.25rem" }} />
          </Link>
        </div>
      </div>

      <div className="store-buy" onClick={handleBuy}>
        Buy
      </div>
      <MainModal title={"Purchase Item?"} show={showModal} onHide={handleHide}>
        <div className="modal-body">
          <p>Are you sure you want to purchase {itemName}?</p>
          {price ? (
            pType?.type === "money" ? (
              <div className="chore-value">
                {/* Check if numVal is a whole number or decimal */}
                {Number(price) % 1 === 0 ? `$${price}` : `${convertDecimalsToDollarsAndCents(Number(price))}`}
              </div>
            ) : (
              <div>
                <div>{price + " " + pType.icon}</div>
              </div>
            )
          ) : null}
        </div>
        <div className="modal-footer">
          <Button className="main-button btn-shadow" onClick={handleConfirmBuy}>
            Yes
          </Button>
          <Button className="btn-secondary btn-shadow" onClick={handleHide}>
            No
          </Button>
        </div>
      </MainModal>
    </div>
  )
}
