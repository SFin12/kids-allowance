import React from "react"
import { Link } from "react-router-dom"
import { MdOutlineIosShare } from "react-icons/md"
import { BsThreeDotsVertical } from "react-icons/bs"
import { CgAddR } from "react-icons/cg"
import { Button, FormLabel, FormSelect } from "react-bootstrap"
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
            <p>Chorzy is a simple chores app for families. It uses a points system to motivate your children to perform tasks with good attitudes.</p>
            <p>Chorzy is designed to work as a web app on your phone or tablet and will not work as intended unless it is saved as a web app. Follow the steps below to add it to your device</p>
            <FormLabel htmlFor="select-device">Select your device</FormLabel>
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
                    Click on the share <MdOutlineIosShare style={{ fontSize: 25 }} />
                    <span> icon</span>
                  </li>
                  <li>
                    Scroll down to the Add to home screen <CgAddR style={{ fontSize: 25 }} />
                    <span> icon</span>
                  </li>
                  <li>
                    You can now close Safari and click on the{" "}
                    <span className="chorzy-icon">
                      <img src={chorzyIcon} alt="Chorzy Icon" />
                    </span>
                    <span> icon</span>
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
                    Tap the menu <BsThreeDotsVertical style={{ fontSize: 25 }} />
                    <span> icon</span>
                  </li>
                  <li>Tap Add to Home Screen</li>
                  <li>
                    You can now close Chrome and click on the{" "}
                    <span className="chorzy-icon">
                      <img src={chorzyIcon} alt="Chorzy Icon" />
                    </span>
                    <span> icon</span>
                  </li>
                </ol>
              </div>
            )}
            <br />
          </section>
        ) : (
          <section>
            <p>Lets get started.</p>
            <Link to={"/main/initialFamily"} className="d-flex justify-content-center pt-4">
              <Button>Next</Button>
            </Link>
          </section>
        )}
      </main>
    </div>
  )
}
