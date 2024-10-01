import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'


interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({
  pageIndex,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <Button onClick={() => onPageChange(pageIndex - 1)} variant="outline" size="xs" disabled={pageIndex === 0}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button onClick={() => onPageChange(pageIndex + 1)} variant="outline" size="xs">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}