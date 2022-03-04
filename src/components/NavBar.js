import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const NavBar = (props) => {
    const [loggedIn, setLoggedIn] = useState(true)
    const [menuActive, setMenuActive] = useState(false)
    const [activePage, setActivePage] = useState("")

    useEffect(() => {
        setLoggedIn(props.currentlyLoggedIn)
        setActivePage(props.activePage)
    }, [props.currentlyLoggedIn, props.activePage])

    const logOut = async () => {
        localStorage.clear()
        setLoggedIn(false)
    }

    return (
        <div className="w-full h-20 bg-dark-gray-color relative">
            <nav className="h-full w-11/12 flex justify-between items-center mx-auto">
                <Link to="/" className="w-max lg:w-1/6"><h2 className="font-poppins font-black tracking-tight text-2xl text-white">PluggedIn</h2></Link>

                <ul className="hidden lg:flex w-2/6 justify-center">
                    {loggedIn?
                    <li>
                        {activePage==="create"?
                        <Link to="/create" className="font-poppins text-sm text-white font-light px-6 transition-all hover:tracking-widest border-b pb-1 border-white">Create</Link>:
                        <Link to="/create" className="font-poppins text-sm text-white font-light px-6 transition-all hover:tracking-widest">Create</Link>
                        }
                    </li>:
                    null    
                    }
                    {loggedIn?
                    <li>
                        {activePage==="my posts"?
                        <Link to="/myposts" className="font-poppins text-sm text-white font-light w-max px-6 transition-all hover:tracking-widest border-b pb-1 border-white">My Posts</Link>:
                        <Link to="/myposts" className="font-poppins text-sm text-white font-light w-max px-6 transition-all hover:tracking-widest">My Posts</Link>    
                        }
                    </li>:
                    null    
                    }
                    <li>
                        {activePage==="explore"?
                        <Link to="/explore" className="font-poppins text-sm text-white font-light px-6 transition-all hover:tracking-widest border-b pb-1 border-white">Explore</Link>:
                        <Link to="/explore" className="font-poppins text-sm text-white font-light px-6 transition-all hover:tracking-widest">Explore</Link>    
                        }
                    </li>
                </ul>

                {loggedIn?
                <ul className="hidden lg:flex w-1/6 justify-evenly">
                    <li>
                        {activePage==="my account"?
                        <Link to="/myaccount" className="font-poppins text-sm text-white font-light transition-all hover:tracking-widest border-b pb-1 border-white">My Account</Link>:
                        <Link to="/myaccount" className="font-poppins text-sm text-white font-light transition-all hover:tracking-widest">My Account</Link>    
                        }
                    </li>
                    <li>
                        <Link to="/" className="font-poppins text-sm bg-dark-gray-color border-2 border-white px-4 py-2 rounded-3xl text-white font-light hover:bg-white hover:text-dark-gray-color" onClick={() => logOut()}>Sign Out</Link>
                    </li>
                </ul>:
                <ul className="hidden lg:flex w-1/6 justify-evenly">
                    <li>
                        <Link to="/login" className="font-poppins text-sm text-white font-light">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup" className="font-poppins text-sm bg-dark-gray-color border-2 border-white px-4 py-2 rounded-3xl text-white font-light hover:bg-white hover:text-dark-gray-color">Sign Up</Link>
                    </li>
                </ul>
                }
                
                {menuActive?
                <div className="block lg:hidden bg-multiply-icon bg-no-repeat bg-cover filter invert h-10 w-10 transform scale-125 cursor-pointer bg-color-red-200" onClick={() => setMenuActive(false)}></div>:
                <div className="block lg:hidden bg-menu-icon bg-no-repeat bg-cover filter invert h-10 w-10 cursor-pointer" onClick={() => setMenuActive(true)}></div>
                }
            </nav>

            {menuActive?
            <div className="absolute w-4/6 bg-gray-700 border-t border-l border-white h-screen right-0">
                <div className="w-5/6 h-full mx-auto flex flex-col justify-start">
                    <ul className="mx-auto flex flex-col justify-around my-10">
                        {loggedIn?
                        <li className="my-4">
                            <Link to="/create" className="font-poppins text-lg text-white">Create</Link>
                        </li>:
                        null    
                        }
                        {loggedIn?
                        <li className="my-4">
                            <Link to="/myposts" className="font-poppins text-lg text-white">My Posts</Link>
                        </li>:
                        null    
                        }
                        <li className="my-4">
                            <Link to="/explore" className="font-poppins text-lg text-white">Explore</Link>
                        </li>
                    </ul>

                    <hr />

                    {loggedIn?
                    <ul className="mx-auto my-10 flex flex-col justify-around">
                        <li className="my-4">
                            <Link to="/myaccount" className="font-poppins text-lg text-white">My Account</Link>
                        </li>
                        <li className="my-4">
                            <Link to="/" className="font-poppins text-lg text-white" onClick={() => logOut()}>Sign Out</Link>
                        </li>
                    </ul>:
                    <ul className="mx-auto my-10 flex flex-col justify-around">
                        <li className="my-4">
                            <Link to="/login" className="font-poppins text-lg text-white">Login</Link>
                        </li>
                        <li className="my-4">
                            <Link to="/signup" className="font-poppins text-lg text-white">Sign Up</Link>
                        </li>
                    </ul>  
                    }
                </div>
            </div>:
            null
            }
        </div>
    )
}

export default NavBar
