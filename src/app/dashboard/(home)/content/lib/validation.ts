import { z } from "zod";

export const contentFormSchema = z.object({
    title: z.string({required_error: 'Title Harus Diisi'}),
    excerpt: z.string({required_error: 'Kutipan Harus Diisi'}),
    description: z.string({required_error: 'Deskripsi Harus Diisi'}),
    categoryId: z.string({required_error: 'Kategori Harus Diisi'}),
})