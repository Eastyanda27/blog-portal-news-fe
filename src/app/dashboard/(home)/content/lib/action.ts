import axiosInstance from "../../../../../../lib/axios"

export const createContent = async (contentData: any) => {
    try {
        const response = await axiosInstance.post("/admin/contents", contentData);
        return response.data
    } catch (error) {
        throw error;
    }
}

export const editContent = async (contentData: any, contentID: number) => {
    try {
        const response = await axiosInstance.put(`/admin/contents/${contentID}`, contentData);
        return response.data
    } catch (error) {
        throw error;
    }
}

export const deleteContent = async (contentID: number) => {
    try {
        const response = await axiosInstance.delete(`/admin/contents/${contentID}`);
        return response.data
    } catch (error) {
        throw error;
    }
}