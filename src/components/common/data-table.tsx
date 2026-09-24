import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface ColumnDef<T> {
  header: React.ReactNode | string
  key: string
  className?: string
  render?: (row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  className?: string
  pageSize?: number
  onRowClick?: (row: T) => void
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  className,
  pageSize = 10,
  onRowClick,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = React.useState(1)

  // Reset to page 1 if data length changes (e.g., when filtering)
  React.useEffect(() => {
    setCurrentPage(1)
  }, [data])

  const totalPages = Math.ceil(data.length / pageSize)
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className={cn("w-full flex flex-col", className)}>
      <div className="w-full overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#0A355C]">
              {columns.map((col, index) => (
                <th
                  key={col.key}
                  className={cn(
                    "h-12 px-4 text-left align-middle text-[10px] uppercase tracking-wider text-[#94A3B8] font-semibold",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={cn(
                    "border-b border-[#0A355C] transition-colors hover:bg-[#00152B]/50 data-[state=selected]:bg-[#00152B] last:border-0",
                    onRowClick && "cursor-pointer"
                  )}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={cn("p-4 align-middle", col.className)}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls */}
      {data.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#0A355C]">
          <div className="text-xs text-[#94A3B8]">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, data.length)} of {data.length} entries
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-7 w-7 p-0 bg-transparent border-[#0A355C] text-[#94A3B8] hover:bg-[#0A355C] hover:text-white disabled:opacity-50 mr-1"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-7 w-7 p-0 text-xs font-medium border-[#0A355C] transition-colors ${
                    currentPage === pageNum 
                      ? 'bg-[#0A355C] text-white' 
                      : 'bg-transparent text-[#94A3B8] hover:bg-[#0A355C]/50 hover:text-white'
                  }`}
                >
                  {pageNum}
                </Button>
              )
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-7 w-7 p-0 bg-transparent border-[#0A355C] text-[#94A3B8] hover:bg-[#0A355C] hover:text-white disabled:opacity-50 ml-1"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
