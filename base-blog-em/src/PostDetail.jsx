import axios from "axios";
// react query
import { useQuery, useMutation } from "react-query";

// async function fetchComments(postId) {
//     const response = await fetch(
//         `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
//     );
//     return response.json();
// }

const fetchComments2 = async (postId) => {
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
        );
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
};

// async function deletePost(postId) {
//     const response = await fetch(
//         `https://jsonplaceholder.typicode.com/postId/${postId}`,
//         { method: "DELETE" }
//     );
//     return response.json();
// }

const deletePost2 = async (postId) => {
    try {
        const response = await axios.delete(
            `https://jsonplaceholder.typicode.com/postId/${postId}`
        );
        console.log("Item successfully deleted");
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
};

// async function updatePost(postId) {
//     const response = await fetch(
//         `https://jsonplaceholder.typicode.com/postId/${postId}`,
//         { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
//     );
//     return response.json();
// }

// full update of item uses 'put'
// partial update of item uses 'patch'
const updatePost2 = async (postId) => {
    try {
        const response = await axios.patch(
            `https://jsonplaceholder.typicode.com/postId/${postId}`,
            { title: "REACT QUERY FOREVER!!!!" }
        );
    } catch (error) {
        console.log(error.message);
    }
};

export function PostDetail({ post }) {
    // replace with useQuery
    // const data = [];

    // fetch comments query
    const { data, isLoading, isError, error } = useQuery(
        ["comments", post.id],
        () => fetchComments2(post.id)
    );

    // delete post mutation
    const deleteMutation = useMutation((postId) => deletePost2(postId));

    // update post mutation
    const updateMutation = useMutation((postId) => updatePost2(postId));

    if (isLoading) return <h3>Loading...</h3>;
    if (isError)
        return (
            <>
                <h3>Error</h3>
                <p>{error.toString()}</p>
            </>
        );

    return (
        <>
            <h3 style={{ color: "blue" }}>{post.title}</h3>
            <button onClick={() => deleteMutation.mutate(post.id)}>
                Delete
            </button>{" "}
            <button onClick={() => updateMutation.mutate(post.id)}>
                Update title
            </button>
            {/* isError, isLoading, isSuccess are properties available on the useMutation hook, can be destructured but we didnt here */}
            {/* deleteMutation response */}
            {deleteMutation.isError && (
                <p style={{ color: "red" }}> Error deleting the post</p>
            )}
            {deleteMutation.isLoading && (
                <p style={{ color: "purple" }}> Deleting the post...</p>
            )}
            {/* note, the jsonplaceholder API does not allow deleting data, but we can imitate a successful call */}
            {deleteMutation.isSuccess && (
                <p style={{ color: "green" }}> Successfully deleted post!</p>
            )}
            {/* updateMutation response */}
            {updateMutation.isError && (
                <p style={{ color: "red" }}> Error updating the post</p>
            )}
            {updateMutation.isLoading && (
                <p style={{ color: "purple" }}> Updating the post...</p>
            )}
            {/* note, the jsonplaceholder API does not allow deleting data, but we can imitate a successful call */}
            {updateMutation.isSuccess && (
                <p style={{ color: "green" }}> Successfully updated post!</p>
            )}
            <p>{post.body}</p>
            <h4>Comments</h4>
            {data.map((comment) => (
                <li key={comment.id}>
                    {comment.email}: {comment.body}
                </li>
            ))}
        </>
    );
}
