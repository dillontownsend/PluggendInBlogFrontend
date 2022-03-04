import React from 'react'
import { Link } from 'react-router-dom'
import env from 'react-dotenv'

const SmallPostPreview = ({ blogPost }) => {
    return (
        <div className="h-96 w-full rounded-lg">
            <Link className="flex flex-col h-full" to={`/blogpost${blogPost._id}`}>
                <img className="w-full h-1/2 object-center object-cover rounded-lg" src={`${env.API_URL}/blogposts/image/${blogPost._id}`} alt="thumbnail" />

                <div className="flex flex-col h-1/2 justify-center pb-4">
                    <h2 className="font-poppins text-2xl font-semibold text-gray-900 truncate mb-2">{blogPost.title}</h2>
                    <p className="font-poppins text-gray-700 overflow-ellipsis overflow-hidden w-full text-sm mt-2">{blogPost.description}</p>
                </div>
            </Link>
        </div>
    )
}

export default SmallPostPreview
