/* eslint-disable no-unused-vars */
import { useEffect } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import StoreCard from "../../components/Cards/StoreCard"
import { selectStoreItems, setStoreItems } from "../../features/user/userSlice"
import { getStoreItems } from "../../utils/firestore"

// WIP

export default function ShopPage() {
  const storeItems = useSelector(selectStoreItems)
  const dispatch = useDispatch()

  useEffect(() => {
    getStoreItems().then((results) => {
      dispatch(setStoreItems(results))
    })
  }, [])

  return (
    <div className="w-100">
      <Container className="d-flex justify-content-center pt-3">
        <Row xs={1} md={2} lg={3} xl={3} xxl={4} className={"w-100"}>
          {storeItems &&
            Object.keys(storeItems).map((key, i) => {
              return (
                <Col key={i + key} className="d-flex justify-content-center">
                  <StoreCard storeItem={storeItems[key]} key={storeItems[key]} />
                </Col>
              )
            })}
        </Row>
      </Container>
      <div className="p-4">
        <Link to={"/main/addStoreItem"} className="mb-5 p-5">
          <FaPlus size="2rem" color="darkgrey" className="add-item-button" />
        </Link>
      </div>
    </div>
  )
}
