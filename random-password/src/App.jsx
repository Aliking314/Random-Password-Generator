// First I Import All Hooks

import { useCallback, useEffect, useState, useRef } from 'react'

// Then I Made An App Function 

function App() {
  // here i collect data using UseState method
  const [length, setLength] = useState(0);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef =useRef(null);

  // Here i make a Function no generate Password using useCall and Effect Hook
  const passwordGenerator = useCallback(()=>{
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllow) str += "1234567890"
    if (charAllow) str += "!@#$%^&*-_+=|?/"
   
    for (let i = 1; i <= length; i++) {
     let char = Math.floor(Math.random() * str.length + 1);
     pass += str.charAt(char); 
    }
    setPassword(pass);

  },[length,numAllow,charAllow,setPassword]);

  useEffect(()=>{
  passwordGenerator();
  },[length,numAllow,charAllow,passwordGenerator])

  // Here I added A finctionality to copy the Password
 const copyPassword =useCallback(
   () => {
    // Acces Reference from input Field
    passwordRef.current?.select();
     window.navigator.clipboard.writeText(password);
   
   },
   [password],
 )
 


  return (
    // Main div 
    <div className='w-full  max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
      {/* Heading */}
      <h1 className='text-center text-white my-3 text-lg'>Password Generator</h1>
      {/* input field  */}
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
   <input type="text" 
    value={password}
     className='outline-none w-full py-1 px-3 '
    placeholder='Password'
    readOnly
    // created reference
    ref={passwordRef}
   />
   {/* Button To copy Password */}
   <button className='bg-blue-700 hover:bg-blue-900
 active:bg-blue-700  outline-none text-white px-3 py-0.5 shrink-0' onClick={copyPassword}
   >Copy</button>
     </div>
     {/* Input Range to Set The Password Length */}
     <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" onChange={(e)=>{setLength(e.target.value)}}
         min={8}
         max={50}
        value={length}
        className='cursor-pointer'
        />
        {/* Calculating Length of Characters */}
        <label>Length:{length}</label>
      </div>
      {/* Checkbox for Adding Numbers to The Password */}
        <div className='flex items-center gap-x-1'>
      <input type="checkbox" 
      defaultChecked={numAllow}
      id="numberInput"
      onChange={()=>{
        setNumAllow((prev)=>!prev)
      }}      
      />
      <label htmlFor="">Number</label>
        </div>
     {/* Checkbox for Adding Characters to The Password */}
        <div className='flex items-center gap-x-1'>
      <input type="checkbox" 
      defaultChecked={charAllow}
      id="charInput"
      onChange={()=>{
        setCharAllow((prev)=>!prev)
      }}      
      />
      <label htmlFor="">Symbols</label>
        </div>
         </div>
     </div>
  )
}

export default App
