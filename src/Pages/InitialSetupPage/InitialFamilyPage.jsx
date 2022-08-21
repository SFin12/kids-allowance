import React, { useState } from 'react'
import arrowDown from '../../assets/arrowDown.svg'
import EditFamily from '../../components/Settings/EditFamily'

export default function InititialFamilyPage() {
  const [showTip, setShowTip] = useState(false)


  function memberCount(count){
    if(count){
      setShowTip(true)
    }
    else {
      setShowTip(false)
    }
  }

  return (
    <>
    <div className='p-4'>
    <h1>Who's Participating?</h1>
    <p>Enter your family or any one that will be participating. Seperate each name with a comma.</p>
     <br/>
      <EditFamily memberCount={memberCount}/>
  
      <br/>
      {showTip && <><p>You can always remove a family member by clicking the "x" on their name (Just in case they start talking back!)</p>
      <br/>
      <p>You'll notice the names are now added below. This is how you'll switch between family members for chores or other information.</p>
      <img src={arrowDown} alt='Arrow down' style={{height:200, width:200, color:'aquamarine' }}/></>}
 
      </div>
    </>
  )
}
