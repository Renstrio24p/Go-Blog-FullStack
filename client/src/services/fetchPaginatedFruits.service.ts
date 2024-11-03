import axios from "axios";

export const fetchPaginatedFruits = async (query: string, pageId: number, limit: number) => {
    return await axios.get(`http://localhost:3000/${query}/?_page=${pageId}&limit=${limit}`);
}