import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import env from 'react-dotenv'

const CreateNewPostPage = () => {
    const navigate = useNavigate()
    const [imagePreview, setImagePreview] = useState(null)
    const [emptyFields, setEmptyFields] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const [file, setFile] = useState(null)
    const [title , setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
        document.title = 'Create | PluggedIn'
        getLoggedIn()
    }, [])

    const submitPost = (title, description, file, body) => {
        setEmptyFields(false)
        if (title.length>0 && description.length>0 && file !== null && body.length>0) {
            const data = new FormData()
            data.append('title', title)
            data.append('description', description)
            data.append('file', file)
            data.append('body', body)

            axios.post(`${env.API_URL}/blogposts/create`, data, {
                headers: {
                    "x-access-token": `${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    navigate(`/blogpost${res.data}`)
                })
                .catch(err => console.log(err))
        } else setEmptyFields(true)
    }

    const getLoggedIn = async () => {
        const response = await fetch(`${env.API_URL}/users/loggedin`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        })
        const data = await response.json()
        setLoggedIn(data.loggedIn)
    }

    return (
        <div>
            <NavBar currentlyLoggedIn={loggedIn} activePage="create" />

            <div className="bg-audience bg-right lg:bg-center bg-cover w-full h-full py-4">
                <div className="w-4/5 lg:w-3/5 bg-gray-200 bg-opacity-100 mx-auto rounded-md">
                    <div className="h-24 bg-white-texture w-full bg-cover bg-center flex justify-center items-center rounded-t-md">
                        <h2 className="font-poppins text-gray-900 w-4/5 lg:w-full text-center text-xl lg:text-4xl font-bold">Let the world know what's on your mind.</h2>
                    </div>

                    <div className="w-4/5 mx-auto py-8">
                        {emptyFields?
                        null:
                        <p className="font-poppins text-gray-800 pb-8 text-xl font-semibold">Fill out the fields below to create your post!</p>
                        }

                        {emptyFields?
                        <p className="font-poppins text-gray-800 pb-2 text-xl font-semibold">Fill out the fields below to create your post!</p>:
                        null
                        }
                        {emptyFields?
                        <p className="font-poppins text-red-500 pb-8 text-lg">Please make sure you do not leave any fields empty.</p>:
                        null
                        }
                        
                        

                        <p className="font-poppins text-gray-700 pb-2 text-lg">Post Title</p>
                        <input className="font-poppins p-2 border border-gray-500 rounded-md w-full mb-8" type="text" maxLength="30" placeholder="Post Title..." onChange={e => setTitle(e.target.value)} />

                        <p className="font-poppins text-gray-700 pb-2 text-lg">Post Description</p>
                        <input className="font-poppins p-2 border border-gray-500 rounded-md w-full mb-8" type="text" maxLength="140" placeholder="Post Description..." onChange={e => setDescription(e.target.value)} />

                        <p className="font-poppins text-gray-700 pb-2 text-lg">Add a Thumbnail to Your Post</p>
                        <input className="font-poppins text-gray-900 mb-2 max-w-full" type="file" id="file-upload" onChange={e => setImagePreview(URL.createObjectURL(e.target.files[0]), setFile(e.target.files[0]))} />
                        {imagePreview===null?
                        <div className="h-8"></div>:
                        <img className="max-h-60 max-w-full object-cover object-center pb-8" src={imagePreview} alt="user upload" />
                        }

                        <p className="font-poppins text-gray-700 pb-2 text-lg">Post Body</p>
                        <textarea className="font-poppins p-2 border border-gray-500 rounded-md w-full h-80 min-h mb-8 text-sm" placeholder="Post Body..." onChange={e => setBody(e.target.value)}></textarea>

                        <div className="flex flex-col lg:flex-row justify-around">
                            <Link to='/' className="order-2 lg:order-1"><button className="font-poppins p-2 w-full lg:w-36 bg-red-500 text-white border-2 border-red-500 rounded-md hover:bg-gray-100 hover:text-red-500">Cancel</button></Link>
                            <button className="font-poppins p-2 mb-4 lg:mb-0 w-full lg:w-36 order-1 lg:order-2 bg-blue-500 text-white border-2 border-blue-500 rounded-md hover:bg-gray-100 hover:text-blue-500" onClick={() => submitPost(title, description, file, body)}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewPostPage
