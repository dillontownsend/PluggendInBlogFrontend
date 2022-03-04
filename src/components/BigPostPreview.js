import React from 'react'
import { Link } from 'react-router-dom'
import env from 'react-dotenv'

const BigPostPreview = ({ blogPost }) => {

    return (
        <div className="w-full h-80">
            <Link className="flex justify-between w-full h-full" to={`/blogpost${blogPost._id}`}>
                <img className="w-7/12 h-full object-cover rounded-lg" src={`${env.API_URL}/blogposts/image/${blogPost._id}`} alt="thumbnail" />

                <div className="w-5/12 h-full">
                    <div className="w-5/6 mx-auto h-full flex flex-col justify-center">
                        <h2 className="font-poppins text-5xl font-semibold pb-2 text-gray-900">{blogPost.title}</h2>
                        <p className="font-poppins pt-2 text-gray-700 w-full">{blogPost.description}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default BigPostPreview
