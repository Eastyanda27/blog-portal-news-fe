"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Delete, Pencil } from "lucide-react"
import Link from "next/link"
import { Content } from "@/model/Content"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Content>[] = [
  {
    accessorKey: "title",
    header: "Judul",
  },
  {
    accessorKey: "excerpt",
    header: "Kutipan",
  },
  {
    accessorKey: "category_name",
    header: "Kategori",
  },
  {
    accessorKey: "author",
    header: "Pembuat",
  },
  {
    accessorKey: "actions",
    cell: ({row}) => {
        const content = row.original;

        return (
            <div className="inline-flex gap-5 items-end">
                <Button variant="secondary" size="sm" asChild>
                    <Link href={`/dashboard/content/edit/${content.id}`}>
                        <Pencil className="mr-2 h-4 w-4"/>
                        Edit
                    </Link>
                </Button>
                {/*<DeleteContent id={content.id}/>*/}
            </div>
        )
    },
  },
]
