import React from 'react'
import NavBar from '../components/NavBar'
import BigPostPreview from '../components/BigPostPreview'
import SmallPostPreview from '../components/SmallPostPreview'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import env from "react-dotenv";

const LandingPage = () => {
    const [bigBlogPost, setBigBlogPost] = useState({})
    const [smallBlogPosts, setSmallBlogPosts] = useState([])
    const [mobilePosts, setMobilePosts] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        document.title = 'Home | PluggedIn'
        getBlogPosts()
        getLoggedIn()
    }, [])

    const getBlogPosts = async () => {
        const response = await fetch(`${env.API_URL}/blogposts/latest`)
        const data = await response.json()

        setBigBlogPost(data.slice(-1)[0])
        setSmallBlogPosts(data.slice(0, 6).reverse())
        setMobilePosts(data.slice(4, 7).reverse())
    }

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

    return (
        <div className="h-full min-h-screen bg-gray-lines bg-top-right">
            <NavBar currentlyLoggedIn={loggedIn} />

            <div className="w-4/5 lg:w-3/4 mx-auto">
                <h2 className="font-poppins tracking-tight text-5xl lg:text-7xl font-black text-center text-dark-gray-color mt-12 mb-4">PluggedIn</h2>
                <p className="mx-auto text-center mb-8 font-poppins text-xl text-gray-800">Latest Posts</p>

                <div className="hidden lg:block">
                    <BigPostPreview blogPost={bigBlogPost} />

                    <div className="grid grid-cols-3 gap-10 mt-10">
                        {smallBlogPosts.map((blogPost, index) => {
                            return <SmallPostPreview blogPost={blogPost} key={index} />
                        })}
                    </div>
                </div>

                <div className="block lg:hidden">
                    {mobilePosts.map((blogPost, index) => {
                        return <div className="my-6">
                                <SmallPostPreview blogPost={blogPost} key={index} />
                            </div>
                    })}
                </div>

                <div className="w-full flex justify-center">
                    <button className="w-full lg:w-max font-poppins px-4 py-2 bg-dark-gray-color text-white border-2 border-dark-gray-color rounded-md mt-4 mb-16 hover:bg-gray-200 hover:text-dark-gray-color"><Link to="/explore">Explore More Posts</Link></button>
                </div>
                
            </div>        
        </div>
    )
}

export default LandingPage
