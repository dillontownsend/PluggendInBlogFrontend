import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordStrengthBar from 'react-password-strength-bar'
import env from 'react-dotenv'

const SignUpPage = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [score, setScore] = useState(0)
    const [feedback, setfeedBack] = useState({})

    const [emptyFields, setEmptyFields] = useState(false)
    const [userExists, setUserExists] = useState(false)

    useEffect(() => {
        document.title = 'Sign Up | PluggedIn'
    })

    const submitUser = async () => {
        setEmptyFields(false)
        setUserExists(false)

        if (username.length>0 && email.length>0 && password.length>0) {
            const response = await fetch(`${env.API_URL}/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": `${username}`,
                    "email": `${email}`,
                    "password": `${password}`
                })
            })
            const serverData = await response.json()

            if (serverData.userExists === true) {
                setUserExists(true)
            }
            
            if (typeof(serverData.token) === 'string') {
                localStorage.setItem('token', serverData.token)
                localStorage.setItem('userId', serverData.userId)
                localStorage.setItem('username', serverData.username)
                localStorage.setItem('admin', serverData.admin)

                navigate('/')
            }

        } else {
            setEmptyFields(true)
        }
    }

    console.log(feedback)

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="relative bg-kurt h-36 lg:h-screen w-full lg:w-1/2 bg-center bg-no-repeat bg-cover flex items-center justify-center">
                <h3 className="block text-center lg:text-left lg:absolute w-4/5 top-14 font-poppins text-white text-5xl lg:text-4xl font-black tracking-tight"><Link to='/'>PluggedIn</Link></h3>
                <h2 className="text-white hidden lg:block text-left font-poppins font-bold text-8xl w-4/5 tracking-wide">Welcome to The Blog!</h2>
            </div>

            <div className="h-screen w-full lg:w-1/2 flex items-center justify-center bg-gray-200">
                <div className="w-2/3 lg:w-1/2 h-4/5 flex flex-col">
                    <h2 className="font-bold text-4xl font-poppins pb-8 text-gray-800">Sign Up</h2>
                    {emptyFields||userExists?
                    null:
                    <p className="font-poppins pb-10 text-gray-600">Welcome! Please create an account below.</p>
                    }

                    {emptyFields?
                    <p className="font-poppins pb-2 text-gray-600">Welcome! Please create an account below.</p>:
                    null
                    }
                    {emptyFields?
                    <p className="font-poppins pb-10 text-red-500">Enter all fields below.</p>:
                    null
                    }
                    
                    {userExists?
                    <p className="font-poppins pb-2 text-gray-600">Welcome! Please create an account below.</p>:
                    null
                    }
                    {userExists?
                    <p className="font-poppins pb-10 text-red-500">There is already an account with that email.</p>:
                    null
                    }

                    <p className="font-poppins pb-2 text-gray-600">User Name</p>
                    <input className="font-poppins p-4 border border-gray-500 rounded-md w-full mb-6" type="text" placeholder="Username..." onChange={e => setUsername(e.target.value)} maxLength="20" />

                    <p className="font-poppins pb-2 text-gray-600">Email</p>
                    <input className="font-poppins p-4 border border-gray-500 rounded-md w-full mb-6" type="text" placeholder="email@gmail.com" onChange={e => setEmail(e.target.value)} />

                    <p className="font-poppins pb-2 text-gray-600">Password</p>
                    {feedback.warning?
                    <p className="font-poppins text-sm pb-3 text-red-500">{feedback.warning}</p>:
                    null
                    }
                    <input className="font-poppins p-4 border border-gray-500 rounded-md w-full" type="password" placeholder="Password..." onChange={e => setPassword(e.target.value)} />
                    <PasswordStrengthBar className="mb-8 mt-2" password={password} barColors={['#777777', '#ef4836', '#f6b44d', '#2b90ef', '#25c281']} scoreWordClassName="font-poppins" scoreWordStyle={{"color":"#777777"}} onChangeScore={(score, feedback) => {
                        setScore(score)
                        setfeedBack(feedback)
                    }} />

                    {score>1?
                    <button className="font-poppins p-4 bg-kurt-color text-white border-2 border-kurt-color rounded-md mb-10 hover:bg-gray-200 hover:text-kurt-color" onClick={submitUser}>Sign Up</button>:
                    <button className="font-poppins p-4 bg-gray-400 text-white border-2 border-gray-400 rounded-md mb-10 cursor-not-allowed">Sign Up</button>
                    }
                    

                    <div className="flex">
                        <p className="font-poppins text-gray-600 mr-2">Already have an account?</p>
                        <p className="font-poppins text-kurt-color"><Link to='/login'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
