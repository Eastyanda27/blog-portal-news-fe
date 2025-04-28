import axiosInstance from "../../../../../../lib/axios"

export const createCategory = async (categoryData: any) => {
    try {
        const response = await axiosInstance.post("/admin/categories", categoryData);
        return response.data
    } catch (error) {
        throw error;
    }
}