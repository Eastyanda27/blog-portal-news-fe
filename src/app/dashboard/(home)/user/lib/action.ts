import axiosInstance from "../../../../../../lib/axios"

export const updatePassword = async (updatePassword: any) => {
    try {
        const response = await axiosInstance.put("/admin/users/update-password", updatePassword);
        return response.data;
    } catch (error) {
        throw error;
    }
}