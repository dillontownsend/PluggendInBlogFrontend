import React from 'react'
import NavBar from '../components/NavBar'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordStrengthBar from 'react-password-strength-bar'
import env from 'react-dotenv'

const MyAccountPage = () => {
    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(false)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [emptyUsername, setEmptyUsername] = useState(false)
    const [wrongOldPassword, setWrongOldPassword] = useState(false)
    const [emptyPassword, setEmptyPassword] = useState(false)
    const [score, setScore] = useState(0)
    const [feedback, setfeedBack] = useState({})

    useEffect(() => {
        document.title = 'My Account | PluggedIn'
        getLoggedIn()
        getUser()
    }, [])

    const getLoggedIn = async () => {
        const response = await fetch(`${env.API_URL}/users/loggedin`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        })
        const data = await response.json()
        setLoggedIn(data.loggedIn)

        if (await data.loggedIn === false) {
            localStorage.clear()
            console.log('cleared storage')
        }
    }

    const getUser = async () => {
        const response = await fetch(`${env.API_URL}/users/account`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        })
        const data = await response.json()

        setUsername(data.username)
        setEmail(data.email)
    }

    const submit = async () => {
        setEmptyUsername(false)
        setEmptyPassword(false)
        setWrongOldPassword(false)
        if (username.length < 1) {
            setEmptyUsername(true)
        } else if (username.length > 0 && oldPassword.length < 1 && newPassword.length < 1) {
            await fetch(`${env.API_URL}/users/update/username`, {
                method: "PUT",
                headers: {
                    "x-access-token": `${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": `${username}`
                })
            })
            localStorage.setItem('username', username)
            navigate('/')
        } else if (oldPassword.length < 1 || newPassword.length < 1) {
            setEmptyPassword(true)
        } else if (username.length > 0 && oldPassword.length > 0 && newPassword.length > 0) {
            const response = await fetch(`${env.API_URL}/users/update/all`, {
                method: "PUT",
                headers: {
                    "x-access-token": `${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": `${username}`,
                    "oldPassword": `${oldPassword}`,
                    "newPassword": `${newPassword}`
                })
            })
            const data = await response.json()
            console.log(data)
            
            if (data.wrongOldPassword === true) {
                setWrongOldPassword(true)
            }
            
            if (data.success === true) {
                localStorage.setItem('username', username)
                navigate('/')
            }
        }
    }

    return (
        <div className="h-screen bg-mayer bg-cover bg-center overflow-y-hidden">
            <NavBar currentlyLoggedIn={loggedIn} activePage="my account" />
    
            <div className="w-4/5 lg:w-2/3 h-full mx-auto bg-gray-100 rounded">
                <div className="w-4/5 mx-auto pt-16 lg:pt-24">
                    <h2 className="font-poppins font-bold text-gray-900 text-3xl">Account</h2>
                    <p className="font-poppins text-gray-600">Update My Information</p>

                    {emptyUsername?
                    <p className="font-poppins text-red-500">Username cannot be blank.</p>:
                    null
                    }
                    
                    {emptyPassword?
                    <p className="font-poppins text-red-500">Please fill out both password fields.</p>:
                    null
                    }
                    
                    {wrongOldPassword?
                    <p className="font-poppins text-red-500">The current password you have entered is incorrect.</p>:
                    null
                    }

                    <div className="flex flex-col lg:flex-row w-full lg:justify-between items-center my-10">
                        <div className="flex flex-col w-full lg:w-2/5 mb-4 lg:mb-0">
                            <p className="font-poppins pb-2 text-gray-800">Username</p>
                            <input className="font-poppins p-2 border border-gray-500 rounded-md w-full" type="text" placeholder="Username..." value={username} onChange={e => setUsername(e.target.value)}/>
                        </div>

                        <div className="flex flex-col w-full lg:w-2/5">
                            <p className="font-poppins pb-2 text-gray-800">Email</p>
                            <p className="font-poppins text-gray-500">{email}</p>
                        </div>
                    </div>
                    

                    <p className="font-poppins text-gray-900 font-semibold mb-3">Change Password</p>
                    <div className="flex flex-col lg:flex-row w-full lg:justify-between items-start mb-8">
                        <div className="flex flex-col w-full lg:w-2/5 mb-4 lg:mb-0">
                            <p className="font-poppins pb-2 text-gray-800">Enter Your Current Password</p>
                            <input className="font-poppins p-2 border border-gray-500 rounded-md w-full" type="password" placeholder="Current Password..." onChange={e => setOldPassword(e.target.value)} />
                        </div>

                        <div className="flex flex-col w-full lg:w-2/5">
                            <p className="font-poppins pb-2 text-gray-800">Enter Your New Password</p>
                            {feedback.warning?
                            <p className="font-poppins text-sm pb-3 text-red-500">{feedback.warning}</p>:
                            null
                            }
                            <input className="font-poppins p-2 border border-gray-500 rounded-md w-full" type="password" placeholder="New Password..." onChange={e => setNewPassword(e.target.value)} />
                            <PasswordStrengthBar className="mt-2" password={newPassword} barColors={['#777777', '#ef4836', '#f6b44d', '#2b90ef', '#25c281']} scoreWordClassName="font-poppins" scoreWordStyle={{"color":"#777777"}} onChangeScore={(score, feedback) => {
                                setScore(score)
                                setfeedBack(feedback)
                            }} />
                        </div>
                    </div>
                    
                    <hr className="mb-10 hidden lg:block" />

                    <div className="w-full flex flex-col lg:flex-row lg:justify-center items-center">
                        <Link className="w-full lg:w-max" to="/"><button className="w-full border-2 border-dark-gray-color font-poppins bg-dark-gray-color hover:bg-gray-100 text-white hover:text-dark-gray-color py-2 px-4 rounded lg:mr-3">Cancel</button></Link>
                        <button className="w-full lg:w-max border-2 border-mayer-color font-poppins bg-mayer-color hover:bg-gray-100 text-white hover:text-mayer-color py-2 px-4 rounded lg:ml-3 my-4 lg:my-0" onClick={() => submit()}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAccountPage
