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
import { updateAllowance, updateStoreItems } from "../../utils/firestore"
import { selectAllowance } from "../../features/allowance/allowanceSlice"
import { AiOutlineEdit } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"

export default function StoreCard({ storeItem }) {
  const pType = useSelector(selectPointsType)
  const userId = useSelector(selectUserId)
  const allowance = useSelector(selectAllowance)
  const activeFamilyMember = useSelector(selectActiveFamilyMember)
  const [showModal, setShowModal] = useState(false)
  const { itemName, itemPrice, itemDescription, itemLink, itemImageUrl, purchasedOn, lastPurchasedBy, itemId } = storeItem
  const navigate = useNavigate()

  function handleBuy() {
    if (!activeFamilyMember) {
      alert("You must select a family member to buy this item!")
      return
    }
    if (itemPrice > allowance[activeFamilyMember].currentTotal) {
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
    const spent = Number(itemPrice * -1)
    navigate("/main/allowance")
    updateAllowance(activeFamilyMember, spent, userId)
    const updatedStoreItem = { ...storeItem, lastPurchasedBy: activeFamilyMember, purchasedOn: new Date().toDateString().slice(0, -5) }
    updateStoreItems(updatedStoreItem).then((results) => {
      if (results === "success") {
        console.log("Item Updated!")
      } else {
        alert(results.message)
      }
    })
  }

  return (
    <div className="store-card">
      <div className="w-100">
        <a href={itemLink} className="item-image-container" target="_blank" rel="noreferrer">
          <img className="item-image" src={itemImageUrl ? itemImageUrl : defaultStoreImage} alt="sky" />
        </a>
      </div>

      <div className="store-info-container">
        <div>{itemName}</div>
        <div style={{ fontSize: "1.25rem" }}>{itemDescription}</div>
        {itemPrice ? (
          pType?.type === "money" ? (
            <div>
              {/* Check if numVal is a whole number or decimal */}
              {Number(itemPrice) % 1 === 0 ? `$${itemPrice}` : `${convertDecimalsToDollarsAndCents(Number(itemPrice))}`}
            </div>
          ) : (
            <div>
              <div>{itemPrice + " " + pType.icon}</div>
            </div>
          )
        ) : null}

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
          {itemPrice ? (
            pType?.type === "money" ? (
              <div className="chore-value">
                {/* Check if numVal is a whole number or decimal */}
                {Number(itemPrice) % 1 === 0 ? `$${itemPrice}` : `${convertDecimalsToDollarsAndCents(Number(itemPrice))}`}
              </div>
            ) : (
              <div>
                <div>{itemPrice + " " + pType.icon}</div>
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
