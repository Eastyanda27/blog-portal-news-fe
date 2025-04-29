import axiosInstance from "../../../../../../lib/axios"

export const createContent = async (contentData: any) => {
    try {
        const response = await axiosInstance.post("/admin/contents", contentData);
        return response.data
    } catch (error) {
        throw error;
    }
}