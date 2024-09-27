import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"


const tableCellVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "p-4 align-middle [&:has([role=checkbox])]:pr-0",
        emptyClass: ""
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const tableHeadVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "h-12 px-4 text-center align-middle font-medium [&:has([role=checkbox])]:pr-0",
        emptyClass: ""
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface TableCellProps
  extends React.ThHTMLAttributes<HTMLTableDataCellElement>,
    VariantProps<typeof tableCellVariants> {
  asChild?: boolean
}

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableDataCellElement>,
    VariantProps<typeof tableHeadVariants> {
  asChild?: boolean
}

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className={cn("relative w-full overflow-auto", className)}>
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm")}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-primary font-medium text-primary-foreground", className)}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableDataCellElement, TableHeadProps
>(({ className, variant, size, ...props }, ref) => (
  <th
    ref={ref}
    className={tableHeadVariants({ variant, size, className })}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableDataCellElement, TableCellProps
>(({ className, variant, size, ...props }, ref) => (
  <td
    ref={ref}
    className={tableCellVariants({ variant, size, className })}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
HTMLTableDataCellElement,
  React.HTMLAttributes<HTMLTableDataCellElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
