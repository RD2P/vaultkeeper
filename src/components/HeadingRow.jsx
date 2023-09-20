import { useState, useEffect } from 'react'
import '../styles/headingrow.css'

const HeadingRow = (props) => {

  const getCurrentDimension = () => {
    return {
        width: window.innerWidth
    }
  }

  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  
  useEffect(() => {
      const updateDimension = () => {
          setScreenSize(getCurrentDimension())
      }
      window.addEventListener('resize', updateDimension);
    
      return(() => {
          window.removeEventListener('resize', updateDimension);
      })
  }, [screenSize])

  console.log(screenSize.width)

  const headingRowTxt = <>
      <div>Site</div>
      <div>Username</div>
      <div>Password</div>
  </>
  

  const { handleAddAccount } = props
  return(
      
    <div className="heading-row">
      {screenSize.width > 370 && headingRowTxt }
      <button onClick={handleAddAccount}>Add an account</button>
    </div>
  )
}

export default HeadingRow