"use client"

import React, { FC, useEffect, useState } from "react"
import { setupInterceptor } from "../../../../../../lib/axios"
import Swal from "sweetalert2"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import SubmitButtonForm from "../../components/submit-button"
import { useRouter } from "next/navigation"
import { User } from "@/model/User"
import { updatePassword } from "../lib/action"
import { deleteCookie } from "cookies-next"

interface FormUserProps {
    defaultValues?: User | null
}

const FormUserPage: FC<FormUserProps> = ({defaultValues}) => {
    setupInterceptor();
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string[]>([]);

    useEffect(() => {
        if (defaultValues) {
            setName(defaultValues.name)
            setEmail(defaultValues.email)
            setPassword(defaultValues.password)
        }
    }, [defaultValues])

    const handleUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setError([]);

        const result = await Swal.fire({
            title: 'Apakah anda yakin?',
            text: "Password ini akan diubah ke yang baru",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iya, silahkan diubah.'
        });

        if (result.isConfirmed) {
            try {
                await updatePassword({
                    current_password: password,
                    new_password: newPassword,
                    confirm_password: confirmPassword,
                })
                Swal.fire({
                    icon: "success",
                    title: "success",
                    text: "Kategori Berhasil Diubah",
                    toast: true,
                    showConfirmButton: false,
                    timer: 1500
                });
                deleteCookie('accessToken')
                window.location.reload();
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
        }
    };

    return (
        <form onSubmit={handleUser} className="w-[100%] space-y-4">
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
                    <Label htmlFor="name">
                        Nama
                    </Label>
                    <Input name="name" id="name" placeholder="Nama..." disabled={true} value={name}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">
                        E-mail
                    </Label>
                    <Input name="email" id="email" placeholder="E-mail..." disabled={true} value={email}/>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="password">
                        Password Saat Ini
                    </Label>
                    <Input name="password" id="password" type="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="newPassword">
                        Password Baru
                    </Label>
                    <Input name="newPassword" id="newPassword" type="password" placeholder="New Password..." value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                        Konfirmasi Password
                    </Label>
                    <Input name="confirmPassword" id="confirmPassword" type="password" placeholder="Konfirmasi Password..." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
            </div>
            <div className="space-y-2">
                <SubmitButtonForm/>
            </div>
        </form>
    );
}

export default FormUserPage;