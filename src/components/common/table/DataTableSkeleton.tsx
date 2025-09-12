import { Skeleton, TableCell, TableRow } from "@mui/material"

type DataTableSkeletonProps = {
  cols: number
  rows?: number
}

export const DataTableSkeleton = ({
  cols,
  rows = 10,
}: DataTableSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={`sk-${i}`}>
          <TableCell padding="normal" align="left">
            <Skeleton variant="circular" width={24} height={24} />
          </TableCell>
          {Array.from({ length: cols }).map((_, j) => (
            <TableCell key={`sk-${i}-${j}`}>
              <Skeleton />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}
