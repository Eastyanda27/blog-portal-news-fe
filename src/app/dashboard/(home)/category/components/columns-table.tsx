"use client"

import { Button } from "@/components/ui/button"
import { Category } from "@/model/Category"
import { ColumnDef } from "@tanstack/react-table"
import { Pencil } from "lucide-react"
import Link from "next/link"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "title",
    header: "Judul",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "actions",
    cell: ({row}) => {
        const category = row.original;

        return (
            <div className="inline-flex gap-5 items-center">
                <Button variant="secondary" size="sm" asChild>
                    <Link href={`/dashboard/category/edit/${category.id}`}>
                        <Pencil className="mr-2 h-4 w-4"/>
                        Edit
                    </Link>
                </Button>
            </div>
        )
    },
  },
]
