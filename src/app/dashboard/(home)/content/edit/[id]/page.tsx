"use client";

import { FC, useEffect, useState } from "react"
import axiosInstance, { setupInterceptor } from "../../../../../../../lib/axios"
import { Category } from "@/model/Category"
import { ApiResponse } from "@/model/ApiResponse"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Content } from "@/model/Content";
import FormContentPage from "../../components/form-content";

type Params = {
    id: number
}

interface EditContentPageProps {
    params: Params
}

const EditCategoryPage: FC<EditContentPageProps> = ({ params }) => {
    setupInterceptor();

    const [content, setContent] = useState<Content | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [category, setCategory] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get<ApiResponse<Content>>(`/admin/contents/${params.id}`);
                setContent(response.data.data);
            } catch (error: any) {
                setError(error.message || "Error Fetching Data");
            } finally {
                setLoading(false);
            }
        }

        const fetchDataCategory = async () => {
            try {
                const response = await axiosInstance.get<ApiResponse<Category[]>>("/admin/categories")
                setCategory(response.data.data)
            } catch (error) {
                console.log("Error Fetching Data")
            }
        }
        

        fetchDataCategory();
        fetchData();
    }, [params.id])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4"/>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {error}
            </AlertDescription>
        </Alert>
    )

    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <div className="my-5 text-2xl font-bold">Edit Konten</div>
            </div>
            <FormContentPage type="EDIT" categoryList={category} defaultValues={content}/>
        </div>
    );
}

export default EditCategoryPage;