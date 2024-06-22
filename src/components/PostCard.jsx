import React from 'react'
import service from '../appwrite/config'
import { Link } from "react-router-dom"

const PostCard = ({$id, title, featuredImage}) => {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full min-h-[280px] bg-gray-100 rounded-xl'>
                <div className='w-full justify-center mb-4'>
                    <img src={service.getFilePreview(featuredImage)} alt={title}
                        className='rounded-xl  aspect-video w-full object-contain' />

                </div>
                <h2
                    className='text-xl font-bold p-4'
                >{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
