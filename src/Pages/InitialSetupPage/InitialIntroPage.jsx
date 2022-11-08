import React from "react"
import { Link } from "react-router-dom"
import { MdOutlineIosShare } from "react-icons/md"
import { BsThreeDotsVertical } from "react-icons/bs"
import { CgAddR } from "react-icons/cg"
import { Button, FormSelect } from "react-bootstrap"
import { useState } from "react"
import chorzyIcon from "../../assets/apple-touch-icon.png"
import "./InitialStylePage.css"
import { useEffect } from "react"
import { getPWADisplayMode } from "../../utils/helper"

export default function InitialIntroPage() {
  const [device, setDevice] = useState(null)
  const [displayMode, setDisplayMode] = useState("")

  useEffect(() => {
    setDisplayMode(getPWADisplayMode())
  }, [])

  function handleSelect(e) {
    const device = e.target.value
    setDevice(device)
  }

  return (
    <div className="initial-container p-4">
      <h1 className="text-center">Welcome to Chorzy!</h1>
      <main>
        {!displayMode || displayMode === "browser" ? (
          <section>
            <p>Chorzy is a simple chore app for families. It uses a point system to motivate children to complete chores with good attitudes.</p>
            <p>Chorzy is designed to work as a web app on a phone, tablet, or desktop. Follow the steps below to add it to your device.</p>

            <FormSelect aria-label="Select device" onChange={handleSelect} id="select-device">
              <option value={""}>Choose your device</option>
              <option value={"apple"}>iPhone / iPad</option>
              <option value={"android"}>Android Phone / Tablet</option>
              <option value={"computer"}>Desktop / Laptop</option>
            </FormSelect>
            {device === "apple" && (
              <div className="instructions">
                <ol>
                  <li>Make sure Chorzy is open in Safari</li>
                  <li>
                    Tap on share <MdOutlineIosShare style={{ fontSize: 25 }} />
                  </li>
                  <li>
                    Scroll down to Add to Home Screen <CgAddR style={{ fontSize: 25 }} />
                  </li>
                  <li>
                    Close Safari and tap on{" "}
                    <span className="chorzy-icon mx-1">
                      <img src={chorzyIcon} alt="Chorzy Icon" />
                    </span>
                  </li>
                </ol>
              </div>
            )}
            {device === "computer" && (
              <div className="instructions">
                <p>Great! You don't need to do anything. The display may seem scarce on a big screen since it was designed for smaller screens but it will function the same. You can also use Chorzy from multiple devices once you have an account.</p>

                <p>Lets get started.</p>
                <Link to={"/main/initialFamily"} className="d-flex justify-content-center pt-4">
                  <Button>Next</Button>
                </Link>
              </div>
            )}
            {device === "android" && (
              <div className="instructions">
                <ol>
                  <li>Make sure Chorzy is open in Chrome</li>
                  <li>
                    Tap menu <BsThreeDotsVertical style={{ fontSize: 25 }} />
                  </li>
                  <li>Tap Add to Home Screen</li>
                  <li>
                    Close Chrome and click on{" "}
                    <span className="chorzy-icon">
                      <img src={chorzyIcon} alt="Chorzy Icon" />
                    </span>
                  </li>
                </ol>
              </div>
            )}
            <br />
          </section>
        ) : (
          <section>
            <p>Let's get started.</p>
            <Link to={"/main/initialFamily"} className="d-flex justify-content-center pt-4">
              <Button>Next</Button>
            </Link>
          </section>
        )}
      </main>
    </div>
  )
}
