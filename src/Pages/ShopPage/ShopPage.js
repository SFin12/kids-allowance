import { useSelector } from "react-redux"
import { selectActiveFamilyMember, selectPointsType, selectStoreItems } from "../../features/user/userSlice"
import { capitalizeFirstLetter } from "../../utils/helper"

// WIP

export default function ShopPage() {
  const pointsType = useSelector(selectPointsType)
  const storeItems = useSelector(selectStoreItems)

  return (
    <div className="d-flex justify-content-center w-100 flex-column align-items-center" style={{ height: "70vh" }}>
      <h4 className="title">Coming Soon </h4>
      <p className="w-75">You will soon be able to add items or rewards to the shop page for family members to look through.</p>

      <p className="w-75">Rewards may include things like screen time, video games, or actual items that can be linked to online stores. You will be able to set a cost for each item and allow family members to spend their {pointsType.type} on items in the shop.</p>
      {/* <details>
        <p>{capitalizeFirstLetter(pointsType.type)} will be deducted automatically but items must be purchased outside the app.</p>
      </details> */}
    </div>
  )
}
