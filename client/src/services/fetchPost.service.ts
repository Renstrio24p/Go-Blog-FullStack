import axios from "axios";

export const fetchPost = async (query: string, postId?: string) => {
    if (!postId) {
        postId = ""
    }
    return await axios.get(`http://localhost:3000/${query}/${postId}`);
};