import { useState } from "react";
import axios from "axios";
// react query
import { useQuery } from "react-query";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

// async function fetchPosts() {
//     const response = await fetch(
//         "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
//     );
//     return response.json();
// }

const fetchPosts2 = async (pageNum) => {
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export function Posts() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPost, setSelectedPost] = useState(null);

    // replace with useQuery
    // const data = [];
    // useQuery takes a user supplied key name, "posts", and an async function that returns the data as a promise
    // the base react query has a bunch of properties we can destructure off of and use in our code
    // like isError and isLoading
    //
    // notice we are using state variables as parameters in our queries

    const { data, isError, error, isLoading } = useQuery(
        ["posts", currentPage],
        () => fetchPosts2(currentPage),
        {
            staleTime: 2000,
        }
    );
    if (isLoading) return <h3>Loading...</h3>;
    if (isError)
        return (
            <>
                <h3>oops something went wrong</h3>
                <p>{error.toString()}</p>
            </>
        );

    return (
        <>
            <ul>
                {data.map((post) => (
                    <li
                        key={post.id}
                        className="post-title"
                        onClick={() => setSelectedPost(post)}
                    >
                        {post.title}
                    </li>
                ))}
            </ul>
            <div className="pages">
                <button
                    disabled={currentPage <= 1}
                    onClick={() => {
                        setCurrentPage((previousValue) => previousValue - 1);
                    }}
                >
                    Previous page
                </button>
                <span>Page {currentPage}</span>
                <button
                    disabled={currentPage >= maxPostPage}
                    onClick={() => {
                        setCurrentPage((previousValue) => previousValue + 1);
                    }}
                >
                    Next page
                </button>
            </div>
            <hr />
            {selectedPost && <PostDetail post={selectedPost} />}
        </>
    );
}
