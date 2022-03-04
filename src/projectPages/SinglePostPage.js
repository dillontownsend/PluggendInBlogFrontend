import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import heartempty from '../images/heartempty.png'
import heartfull from '../images/heart-full.png'
import NavBar from '../components/NavBar'
import env from 'react-dotenv'

const SinglePostPage = () => {
    const navigate = useNavigate()
    const blogPostId = useParams().id
    const [blogPost, setBlogPost] = useState({})
    const [authName, setAuthName] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const [likedPost, setLikedPost] = useState(false)
    const [likeCount, setLikeCount] = useState(null)
    const [viewerAuth, setViewerAuth] = useState(false)
    const [deleteWarning, setDeleteWarning] = useState(false)

    useEffect(() => {
        getPostInfo()
        getLoggedIn()
    }, [likedPost])

    const getPostInfo = async () => {
        const response = await fetch(`${env.API_URL}/blogposts/info/${blogPostId}`)
        const blogPostInfo = await response.json()

        setBlogPost(blogPostInfo)
        setLikeCount(blogPostInfo.likeCount)
        document.title = `${blogPostInfo.title} | PluggedIn`

        if (localStorage.getItem('userId') === await blogPostInfo.userId) {
            setViewerAuth(true)
        }

        
        const response2 = await fetch(`${env.API_URL}/users/username/${blogPostInfo.userId}`)
        const data2 = await response2.json()
        
        setAuthName(data2.author)
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
            console.log('would turn off storage')
        }


        const response2 = await fetch(`${env.API_URL}/users/likedposts/${localStorage.getItem('userId')}/${blogPostId}`)
        const data2 = await response2.json()

        setLikedPost(data2.likedPost)
    }

    const addLike = async () => {
        await fetch(`${env.API_URL}/blogposts/addlike/${blogPostId}`, {
            method: "POST",
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        })
        
        await fetch(`${env.API_URL}/users/addlike/${localStorage.getItem('userId')}/${blogPostId}`, {
            method: "POST",
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        })

        setLikedPost(true)
    }

    const removeLike = async () => {
        await fetch(`${env.API_URL}/blogposts/removelike/${blogPostId}`, {
            method: "PUT",
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        })

        await fetch(`${env.API_URL}/users/removelike/${localStorage.getItem('userId')}/${blogPostId}`, {
            method: "PUT",
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        })

        setLikedPost(false)
    }

    const deletePost = async () => {
        await fetch(`${env.API_URL}/blogposts/delete/${blogPostId}`, {
            method: "DELETE",
            headers: {
                "x-access-token": `${localStorage.getItem('token')}`
            }
        })

        await fetch(`${env.API_URL}/users/deletedpost/removelike/${blogPostId}`, {
            method: "PUT",
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        })

        navigate('/')
    }
    
    return (
        <div className="bg-gray-100 min-h-screen relative">
            <NavBar currentlyLoggedIn={loggedIn} />

            <img className="w-full object-center object-cover h-64 lg:h-100" src={`${env.API_URL}/blogposts/image/${blogPostId}`} alt="thumbnail" />

            <div className="w-full py-12">
                <div className="w-4/5 lg:w-3/5 mx-auto">
                    <h2 className="font-poppins w-full lg:w-3/5 mx-auto text-center text-4xl font-bold text-gray-900 pb-2">{blogPost.title}</h2>
                    {loggedIn?
                    <div className="w-full flex justify-center items-center pb-8">
                        <p className="font-poppins text-center text-sm text-gray-900 font-light mr-2">Author: {authName}</p>
                        {likedPost?
                        <div className="flex w-24 h-8 justify-around items-center bg-pink-200 p-2 ml-2 cursor-pointer rounded-sm" onClick={() => removeLike()}>
                            <p className="font-poppins text-sm font-medium">{likeCount}</p>
                            <img className="w-4 h-4" src={heartfull} alt="heart" />
                            <p className="font-poppins text-sm font-medium">Unlike</p>
                        </div>:
                        <div className="flex w-24 h-8 justify-around items-center bg-green-200 p-2 ml-2 cursor-pointer rounded-sm" onClick={() => addLike()}>
                            <p className="font-poppins text-sm font-medium">{likeCount}</p>
                            <img className="w-4 h-4" src={heartempty} alt="heart" />
                            <p className="font-poppins text-sm font-medium">Like</p>
                        </div>
                        }
                    </div>:
                    <div className="w-full flex flex-col lg:flex-row justify-center items-center pb-8">
                        <p className="font-poppins text-center text-sm text-gray-900 font-light mr-0 lg:mr-2 mb-2 lg:mb-0">Author: {authName}</p>
                        <Link to='/login'><div className="flex w-48 h-8 justify-around items-center bg-green-200 p-2 ml-2 cursor-pointer rounded-sm">
                            <p className="font-poppins text-sm font-medium">{likeCount}</p>
                            <img className="w-4 h-4" src={heartempty} alt="heart" />
                            <p className="font-poppins text-sm font-medium">Login to leave a like</p>
                        </div></Link>
                    </div>
                    }
                    <p className="font-poppins whitespace-pre-wrap text-black font-light pb-10">{blogPost.body}</p>
                    {viewerAuth?
                    <div className="flex flex-col lg:flex-row w-4/5 justify-between lg:justify-around mx-auto mb-6">
                        <button className="font-poppins p-2 order-2 lg:order-1 w-full lg:w-36 bg-red-500 text-white border-2 border-red-500 rounded-md hover:bg-gray-100 hover:text-red-500" onClick={() => setDeleteWarning(true)}>Delete Post</button>
                        <Link to={`/blogpost/edit/${blogPostId}`} className="order-1 lg:order-2"><button className="font-poppins p-2 mb-4 lg:mb-0 w-full lg:w-36 bg-blue-500 text-white border-2 border-blue-500 rounded-md hover:bg-gray-100 hover:text-blue-500">Edit Post</button></Link>
                    </div>:   
                    null}
                </div>
            </div>

            {deleteWarning?
            <div className="fixed w-4/5 lg:w-1/2 h-60 bg-white left-0 right-0 mx-auto top-1/3 border-red-500 border-8 rounded-xl">
                <div className="w-4/5 h-full flex flex-col justify-evenly items-center mx-auto">
                    <div className="flex flex-col mt-4 lg:mt-0">
                        <p className="font-poppins text-center text-red-500 text-lg lg:text-2xl font-semibold pb-2">Are you sure you want to delete your post?</p>
                        <p className="font-poppins text-center text-red-500 text-lg lg:text-xl">This cannot be undone.</p>
                    </div>
                    
                    <div className="w-full flex flex-col lg:flex-row justify-around my-4 lg:my-0">
                        <button className="font-poppins p-2 mb-2 lg:mb-0 w-full lg:w-36 bg-gray-500 text-white border-2 border-gray-500 rounded-md hover:bg-white hover:text-gray-500" onClick={() => setDeleteWarning(false)}>Cancel</button>
                        <button className="font-poppins p-2 w-full lg:w-36 bg-red-500 text-white border-2 border-red-500 rounded-md hover:bg-white hover:text-red-500" onClick={() => deletePost()}>Delete it</button>
                    </div>
                </div>
            </div>:
            null
            }
        </div>
    )
}

export default SinglePostPage
