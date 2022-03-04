import React from 'react'
import NavBar from '../components/NavBar'
import { useState, useEffect } from 'react'
import { cloneDeep } from 'lodash'
import SmallPostPreview from '../components/SmallPostPreview'
import ReactPaginate from 'react-paginate'
import env from 'react-dotenv'

const ExplorePage = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [newestPosts, setNewestPosts] = useState([])
    const [oldestPosts, setOldestPosts] = useState([])
    const [popularPosts, setPopularPosts] = useState([])
    const [leastPopularPosts, setLeastPopularPosts] = useState([])
    const [currentlyDisplaying, setCurrentlyDisplaying] = useState("Newest")

    const [pageNumber, setPageNumber] = useState(0)
    const postsPerPage = 6
    const pagesVisited = pageNumber * postsPerPage
    const pageCount = Math.ceil(newestPosts.length/postsPerPage)

    useEffect(() => {
        document.title = 'Explore | PluggedIn'
        getLoggedIn()
        getBlogPosts()
    }, [])

    const displayNewestPosts = newestPosts.slice(pagesVisited, pagesVisited + postsPerPage).map((blogPost, index) => {
        return (
            <SmallPostPreview blogPost={blogPost} key={index} />
        )
    })

    const displayOldestPosts = oldestPosts.slice(pagesVisited, pagesVisited + postsPerPage).map((blogPost, index) => {
        return (
            <SmallPostPreview blogPost={blogPost} key={index} />
        )
    })

    const displayPopularPosts = popularPosts.slice(pagesVisited, pagesVisited + postsPerPage).map((blogPost, index) => {
        return (
            <SmallPostPreview blogPost={blogPost} key={index} />
        )
    })

    const displayNotPopularPosts = leastPopularPosts.slice(pagesVisited, pagesVisited + postsPerPage).map((blogPost, index) => {
        return (
            <SmallPostPreview blogPost={blogPost} key={index} />
        )
    })

    const changePage = ({ selected }) => {
        setPageNumber(selected)
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

    const getBlogPosts = async () => {
        const response = await fetch(`${env.API_URL}/blogposts`)
        const data = await response.json()

        setNewestPosts(cloneDeep(data).reverse())
        setOldestPosts(cloneDeep(data))
        setPopularPosts(cloneDeep(data).sort((a, b) => b.likeCount - a.likeCount))
        setLeastPopularPosts(cloneDeep(data).sort((a, b) => a.likeCount - b.likeCount))
    }

    return (
        <div className="h-full min-h-screen bg-gray-lines bg-top-right">
            <NavBar currentlyLoggedIn={loggedIn} activePage="explore" />

            <div className="w-4/5 lg:w-3/4 mx-auto">
                <h2 className="font-poppins tracking-tight text-5xl lg:text-6xl font-black text-center text-dark-gray-color mt-12 mb-4">Explore</h2>
                <div className="flex justify-center items-center">
                    <h4 className="font-poppins text-gray-800 mr-2">Sort By :</h4>
                    <select className="ml-2 bg-gray-300 p-1" onChange={e => setCurrentlyDisplaying(e.target.value)}>
                        <option>Newest</option>
                        <option>Oldest</option>
                        <option>Most Popular</option>
                        <option>Least Popular</option>
                    </select>
                </div>

                {currentlyDisplaying === 'Newest'?
                    <div className="lg:grid lg:grid-cols-3 lg:gap-10 mt-10">
                        {displayNewestPosts}
                    </div>:
                    null
                }
                
                {currentlyDisplaying === 'Oldest'?
                    <div className="lg:grid lg:grid-cols-3 lg:gap-10 mt-10">
                        {displayOldestPosts}
                    </div>:
                    null
                }
                
                {currentlyDisplaying === 'Most Popular'?
                    <div className="lg:grid lg:grid-cols-3 lg:gap-10 mt-10">
                        {displayPopularPosts}
                    </div>:
                    null
                }

                {currentlyDisplaying === 'Least Popular'?
                    <div className="lg:grid lg:grid-cols-3 lg:gap-10 mt-10">
                        {displayNotPopularPosts}
                    </div>:
                    null
                }
                
                <ReactPaginate previousLabel="Prev" nextLabel="Next" pageCount={pageCount} onPageChange={changePage} containerClassName="flex justify-center items-center pt-8 pb-12" previousClassName="bg-dark-gray-color hover:bg-gray-400 text-white font-bold py-2 px-4 rounded mr-2" nextClassName="bg-dark-gray-color hover:bg-gray-400 text-white font-bold py-2 px-4 rounded ml-2" disabledClassName="bg-gray-400 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed" pageClassName="border-2 box-border border-dark-gray-color rounded py-2 px-3 mx-2 font-bold hover:bg-dark-gray-color hover:text-white" activeClassName="bg-dark-gray-color text-white"></ReactPaginate>
            </div>
        </div>
    )
}

export default ExplorePage
