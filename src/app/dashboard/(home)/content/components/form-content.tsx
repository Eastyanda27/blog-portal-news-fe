"use client"

import { Category } from "@/model/Category"
import React, { FC, useEffect, useState } from "react"
import { setupInterceptor } from "../../../../../../lib/axios"
import Swal from "sweetalert2"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import SubmitButtonForm from "../../components/submit-button"
import { useRouter } from "next/navigation"
import { Content } from "@/model/Content"
import { contentFormSchema } from "../lib/validation"
import { createContent } from "../lib/action"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface FormContentProps {
    type?: "ADD" | "EDIT"
    defaultValues?: Content | null
    categoryList: Category[]
}

const FormContentPage: FC<FormContentProps> = ({type, defaultValues, categoryList}) => {
    setupInterceptor();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [excerpt, setExcerpt] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(defaultValues?defaultValues.category_id.toString(): '');
    const [tags, setTags] = useState('');
    const [status, setStatus] = useState(defaultValues?defaultValues.status: '');
    const [error, setError] = useState<string[]>([]);

    const statusList = [
        {value: 'PUBLISH', label: 'Publish'},
        {value: 'DRAFT', label: 'Draft'}
    ];

    const handleCategoryChange = (value: string) => {
        setCategoryId(value)
    }

    const handleStatusChange = (value: string) => {
        setStatus(value)
    }
    
    useEffect(() => {
        if (categoryList) {
            setCategories(categoryList);
        }
    }, [categoryList])

    const handleContent = async (e: React.FormEvent) => {
        e.preventDefault();
        setError([]);

        try {
            const validation = contentFormSchema.safeParse({
                title,
                categoryId,
                description, 
                excerpt
            })

            if (!validation.success) {
                const errorMessage = validation.error.issues.map((issue) => issue.message);
                setError(errorMessage);
                return;
            }

            if (type == "ADD") {
                await createContent({
                    title: title,
                    excerpt: excerpt,
                    description: description,
                    category_id: Number(categoryId),
                    tags: tags,
                    status: status,
                })
                Swal.fire({
                    icon: "success",
                    title: "success",
                    text: "Konten Berhasil Disimpan",
                    toast: true,
                    showConfirmButton: false,
                    timer: 1500
                });
                router.push("/dashboard/content")
            } 
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
        <form onSubmit={handleContent} className="space-y-4">
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

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="categoryId">
                        Pilih Kategori
                    </Label>
                    <Select name="categoryId" value={categoryId} onValueChange={handleCategoryChange}>
                        <SelectTrigger id="categoryId" className="w-full">
                            <SelectValue placeholder="Pilih Kategori"/>
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) =>
                                <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.title}
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="title">
                        Judul
                    </Label>
                    <Input placeholder="Judul..." name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value )} required/>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="excerpt">
                        Kutipan
                    </Label>
                    <Input placeholder="Excerpt..." name="excerpt" id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value )} required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="tags">
                        Tag
                    </Label>
                    <Input placeholder="Gunakan separator ( , ) untuk pemisah..." name="tags" id="tags" value={tags} onChange={(e) => setTags(e.target.value )} required/>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="status">
                        Pilih Status
                    </Label>
                    <Select name="status" value={status} onValueChange={handleStatusChange}>
                        <SelectTrigger id="status" className="w-full">
                            <SelectValue placeholder="Pilih Status"/>
                        </SelectTrigger>
                        <SelectContent>
                            {statusList.map((status) =>
                                <SelectItem key={status.value} value={status.value}>
                                    {status.label}
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="description">
                        Deskripsi
                    </Label>
                    <Textarea placeholder="Deskripsi..." name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value )} required/>
                </div>
            </div>
            <div className="space-y-2">
                <SubmitButtonForm/>
            </div>
        </form>
    );
}

export default FormContentPage;