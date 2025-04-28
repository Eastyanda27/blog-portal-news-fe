"use client"

import { Category } from "@/model/Category"
import React, { FC, useState } from "react"
import { setupInterceptor } from "../../../../../../lib/axios"
import { categoryFormSchema } from "../lib/validation"
import { createCategory } from "../lib/action"
import Swal from "sweetalert2"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import SubmitButtonForm from "../../components/submit-button"
import { useRouter } from "next/navigation"

interface FormCategoryProps {
    type?: "ADD" | "EDIT"
    defaultValues?: Category | null
}

const FormCategoryPage: FC<FormCategoryProps> = ({type, defaultValues}) => {
    setupInterceptor();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string[]>([]);

    const handleCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        setError([]);

        try {
            const validation = categoryFormSchema.safeParse({
                title,
            })

            if (!validation.success) {
                const errorMessage = validation.error.issues.map((issue) => issue.message);
                setError(errorMessage);
                return;
            }

            await createCategory({title: title})
            Swal.fire({
                icon: "success",
                title: "success",
                text: "Kategori Berhasil Disimpan",
                toast: true,
                showConfirmButton: false,
                timer: 1500
            });
            router.push("/dashboard/category")
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                toast: true,
                showConfirmButton: false,
                timer: 1500
            });

            setError(error instanceof Error ? [error.message] : ['An unexpected error occured']);
        }
    };

    return (
        <form onSubmit={handleCategory} className="space-y-4">
            {error.length > 0 && (
                <div className="mx-auto my-7 bg-red-500 w-[400px] p-4 round-lg text-white">
                    <div className="font-bold mb-4">
                        <ul className="list-disc list-inside">
                            {error?.map((value, index) => (
                                <li key={index}>{value}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="title">
                    Judul
                </Label>
                <Input placeholder="Judul..." name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value )} required/>
                <SubmitButtonForm/>
            </div>
        </form>
    );
}

export default FormCategoryPage;