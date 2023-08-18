import React, { useState, useRef, useEffect, ChangeEvent } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { TiTick } from 'react-icons/ti'
import { AiFillInfoCircle } from 'react-icons/ai'

const USER_REGEX = /^[a-zA-z][a-zA-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [matchPassword, setMatchPassword] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Focus on the username on the first render
  // useEffect(() => {
  //   userRef.current.focus()
  // }, [])

  // Validate the username
  useEffect(() => {
    const result = USER_REGEX.test(user)
    // console.log({ result, user })
    setValidName(result)
  }, [user])

  // Validate the passwords
  useEffect(() => {
    const result = PWD_REGEX.test(password)
    console.log({ result, password })
    setValidPassword(result)
    const match = password === matchPassword
    setValidMatch(match)
  }, [password, matchPassword])

  useEffect(() => {
    setError('')
    console.log({ user, password, matchPassword })
  }, [user, password, matchPassword])

  const formStructure = [
    { 
      type: 'text', label: 'Username:', name: 'userName', id: 'username', ref: userRef, 
      onFocus: () => setUserFocus(true), 
      onBlur: () => setUserFocus(false), 
      changeEvent: (event: ChangeEvent<HTMLInputElement>) => setUser(event.target.value),
      ariaNote: 'uidnote',
      instructionCondition: userFocus && user && !validName,
      tickIconCondition: validName,
      crossIconCondition: validName || !user,
      instructionText: (
        <>
          <span className='flex flex-row items-center gap-x-1'> <AiFillInfoCircle /> 4 to 24 characters. <br /> </span>
          Must begin with a letter. <br />
          Letters, numbers, underscores, hyphens allowed.
        </>
      )
    },
    { 
      type: 'password', label: 'Password:', name: 'password', id: 'password', 
      onFocus: () => setPasswordFocus(true), 
      onBlur: () => setPasswordFocus(false), 
      changeEvent: (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value),
      ariaNote: 'pwdnote',
      instructionCondition: passwordFocus && !validPassword,
      tickIconCondition: validPassword,
      crossIconCondition: validPassword || !password,
      instructionText: (
        <>
          <span className='flex flex-row items-center gap-x-1'>
            <AiFillInfoCircle />
            8 to 25 characters.
          </span>
          Must include uppercase and lowercase letters, a number and a special character. <br />
          Allowed special characters: ! @ $ % #
        </>
      )
    },
    { 
      type: 'password', label: 'Confirm password:', name: 'passwordConfirm', id: 'confirm', 
      onFocus: () => setMatchFocus(true), 
      onBlur: () => setMatchFocus(false), 
      changeEvent: (event: ChangeEvent<HTMLInputElement>) => setMatchPassword(event.target.value),
      ariaNote: 'matchnote',
      instructionCondition: matchFocus && !validMatch,
      tickIconCondition: validMatch && matchPassword,
      crossIconCondition: validMatch || !matchPassword,
      instructionText: (
        <>
          <span className='flex flex-row items-center gap-x-1'>
            <AiFillInfoCircle />
            Must match the first password input field.
          </span>
        </>
      )
    },
  ]

  return (
    <section className='mx-4 md:mx-0 p-3 w-full md:w-1/2 bg-blue-800 flex flex-col gap-y-4'>
      {error && <p ref={errRef}> { error } </p>}
      <h1 className='text-2xl'>
        Register
      </h1>
      <form className='flex flex-col gap-y-4'>
        {formStructure.map((item, index) => (
          <div className='flex flex-col gap-y-1' key={index}>
            <label htmlFor={item.id} className='flex flex-row items-center gap-x-2'>
              { item.label }
              <span className={item.tickIconCondition ? 'visible' : 'hidden'}>
                <TiTick className='text-green-500' />
              </span>
              <span className={item.crossIconCondition ? 'hidden' : 'visible'}>
                <RxCross1 className='text-red-500' />
              </span>
            </label>
            <input 
              id={item.id}
              type={item.type} 
              name={item.name} 
              ref={item?.ref}
              autoComplete='off'
              className='rounded text-black px-2 py-1'
              required
              onFocus={item.onFocus}
              onBlur={item.onBlur}
              onChange={item.changeEvent}
              aria-invalid={validPassword ? 'false' : 'true'}
              aria-describedby={item.ariaNote}
            />
            <p id={item.ariaNote} className={item?.instructionCondition ? 'bg-black mt-2 p-1 rounded-lg' : 'hidden' }>
              { item?.instructionText }
            </p>
          </div>
        ))} 
      </form>
      <button className='w-full py-1 bg-blue-600 rounded'> Sign up </button>
      <div className='flex flex-col'>
        <span> Already registered? </span>
        <span className='underline cursor-pointer'> Sign in! </span>
      </div>
    </section>
  )
}

export default Register