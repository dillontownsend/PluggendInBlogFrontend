import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import env from 'react-dotenv'

const LoginPage = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emptyFields, setEmptyFields] = useState(false)
    const [userNotExist, setUserNotExist] = useState(false)
    const [invalidCredentials, setInvalidCrendentials] = useState(false)

    useEffect(() => {
        document.title = 'Login | PluggedIn'
    }, [])

    const submitUser = async () => {
        setEmptyFields(false)
        setUserNotExist(false)
        setInvalidCrendentials(false)

        if (email.length>0 && password.length>0) {
            const response = await fetch(`${env.API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": `${email}`,
                    "password": `${password}`
                })
            })
            const serverData = await response.json()

            if (serverData.userNotExist === true) {
                setUserNotExist(true)
            }

            if (serverData.invalidCredentials === true) {
                setInvalidCrendentials(true)
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

    console.log(process.env.GOOD)

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="relative bg-jimi h-36 lg:h-screen w-full lg:w-1/2 bg-center bg-no-repeat bg-cover flex items-center justify-center">
                <h3 className="block text-center lg:text-left lg:absolute w-4/5 top-14 font-poppins text-white text-5xl lg:text-4xl font-black tracking-tight"><Link to='/'>PluggedIn</Link></h3>
                <h2 className="text-white hidden lg:block text-left font-poppins font-bold text-8xl w-4/5 tracking-wide">Welcome Back!</h2>
            </div>

            <div className="h-screen w-full lg:w-1/2 flex items-center justify-center bg-gray-200">
                <div className="w-2/3 lg:w-1/2 h-4/5 flex flex-col">
                    <h2 className="font-bold text-4xl font-poppins pb-8 text-gray-800">Login</h2>
                    {emptyFields||userNotExist||invalidCredentials?
                    null:
                    <p className="font-poppins pb-10 text-gray-600">Welcome back! Please login to your account.</p>
                    }

                    {emptyFields?
                    <p className="font-poppins pb-2 text-gray-600">Welcome back! Please login to your account.</p>:
                    null
                    }
                    {emptyFields?
                    <p className="font-poppins pb-10 text-red-500">Enter all fields below.</p>:
                    null
                    }
                    
                    {userNotExist?
                    <p className="font-poppins pb-2 text-gray-600">Welcome back! Please login to your account.</p>:
                    null
                    }
                    {userNotExist?
                    <p className="font-poppins pb-10 text-red-500">There are no accounts with the email that you have entered.</p>:
                    null
                    }
                    
                    {invalidCredentials?
                    <p className="font-poppins pb-2 text-gray-600">Welcome back! Please login to your account.</p>:
                    null
                    }
                    {invalidCredentials?
                    <p className="font-poppins pb-10 text-red-500">The email and password you have entered do not match.</p>:
                    null
                    }
                

                    <p className="font-poppins pb-2 text-gray-600">Email</p>
                    <input className="font-poppins p-4 border border-gray-500 rounded-md w-full mb-6" type="text" placeholder="email@gmail.com" onChange={e => setEmail(e.target.value)} />

                    <p className="font-poppins pb-2 text-gray-600">Password</p>
                    <input className="font-poppins p-4 border border-gray-500 rounded-md w-full mb-8" type="password" placeholder="Password..." onChange={e => setPassword(e.target.value)} />

                    <button className="font-poppins p-4 bg-jimi-color text-white rounded-md mb-10 border-2 border-jimi-color hover:bg-gray-200 hover:text-jimi-color" onClick={submitUser}>Login</button>

                    <div className="flex">
                        <p className="font-poppins text-gray-600 mr-2">New user?</p>
                        <p className="font-poppins text-jimi-color"><Link to='/signup'>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
