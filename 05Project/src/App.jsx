import { useState, useCallback, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  
  const passwordGenerator = useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "`~!@#$%^&*()-_=+[{]}\\|;:',<.>/?"

    for(let i=1; i<=length; i++){ 
      let char = Math.floor(Math.random()*str.length )
      pass += str.charAt(char)

    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed])

  useEffect(( ) => { passwordGenerator(); },[length, numberAllowed, charAllowed, passwordGenerator])
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  }


  
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-md px-12 my-8 text-black font-extrabold bg-slate-500'>
      <h1 className="text-4xl text-center text-black">Password Generator</h1><br />
        <div className='flex shadow rounded-lg overflow-hidden md-4 justify-center'>
          <input type="text" value={password} placeholder="password" className='outline-none rounded-md px-3 py-1' readOnly ></input>
          <button onClick={copyToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'> COPY </button>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => setLength(Number(e.target.value))}></input>
          <label htmlFor="numberCheckbox">Length</label>
          </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberAllowed} id="numberInput"  onChange={() =>{setNumberAllowed((prev) => !prev);}}></input>
          <label htmlFor="charCheckbox">Numerical</label>
          </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={charAllowed} id="numberInput"  onChange={() =>{setCharAllowed((prev) => !prev);}}></input>
          <label>Special Characters</label>
        </div>
      </div>
    </>
  )
}
export default App
