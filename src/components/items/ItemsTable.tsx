"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type ItemStatus = "in-stock" | "low-stock" | "out-of-stock";

export type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  minimum_quantity: number;
  vendor: string;
  bin_location: string;
  status: ItemStatus;
};

type ItemsTableProps = {
  items: InventoryItem[];
  isLoading?: boolean;
  page?: number;
  totalPages?: number;
  limit?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
};

function StatusBadge({ status }: { status: ItemStatus }) {
  const styles: Record<ItemStatus, { bg: string; text: string }> = {
    "in-stock": { bg: "bg-green-100", text: "text-green-800" },
    "low-stock": { bg: "bg-yellow-100", text: "text-yellow-800" },
    "out-of-stock": { bg: "bg-slate-100", text: "text-slate-700" },
  };

  const labels: Record<ItemStatus, string> = {
    "in-stock": "In Stock",
    "low-stock": "Low Stock",
    "out-of-stock": "Out of Stock",
  };

  const style = styles[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.bg} ${style.text}`}
    >
      {labels[status]}
    </span>
  );
}

function PaginationButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={disabled}
      className="h-9 gap-2 px-3"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default function ItemsTable({
  items,
  isLoading = false,
  page = 1,
  totalPages = 1,
  limit = 20,
  totalItems = 0,
  onPageChange,
}: ItemsTableProps) {
  if (isLoading) {
    return (
      <Card className="rounded-[12px] border border-border p-0 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-center p-12">
          <p className="text-muted-foreground">Loading items...</p>
        </div>
      </Card>
    );
  }

  if (!items || items.length === 0) {
    return (
      <Card className="rounded-[12px] border border-border p-0 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col items-center justify-center p-12">
          <p className="text-muted-foreground">No items found</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-[12px] border border-border p-0 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="overflow-hidden rounded-md bg-card shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-background shadow-sm [&_tr]:border-b">
              <TableRow className="border-b transition-colors hover:bg-[#F8FAFC] dark:hover:bg-muted">
                <TableHead className="sticky top-0 z-10 bg-background p-2 whitespace-nowrap text-foreground has-[[role=checkbox]]:pr-0">
                  SKU
                </TableHead>
                <TableHead className="sticky top-0 z-10 bg-background p-2 whitespace-nowrap text-foreground has-[[role=checkbox]]:pr-0">
                  Item Name
                </TableHead>
                <TableHead className="sticky top-0 z-10 bg-background p-2 whitespace-nowrap text-foreground has-[[role=checkbox]]:pr-0">
                  Category
                </TableHead>
                <TableHead className="sticky top-0 z-10 bg-background p-2 whitespace-nowrap text-foreground has-[[role=checkbox]]:pr-0 text-right">
                  QTY
                </TableHead>
                <TableHead className="sticky top-0 z-10 bg-background p-2 whitespace-nowrap text-foreground has-[[role=checkbox]]:pr-0 text-right">
                  MIN
                </TableHead>
                <TableHead className="sticky top-0 z-10 bg-background p-2 whitespace-nowrap text-foreground has-[[role=checkbox]]:pr-0">
                  Vendor
                </TableHead>
                <TableHead className="sticky top-0 z-10 bg-background p-2 whitespace-nowrap text-foreground has-[[role=checkbox]]:pr-0">
                  Bin Location
                </TableHead>
                <TableHead className="sticky top-0 z-10 bg-background p-2 whitespace-nowrap text-foreground has-[[role=checkbox]]:pr-0">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  className="cursor-pointer border-b transition-colors hover:bg-[#F8FAFC] dark:hover:bg-muted"
                  onClick={() => {
                    window.location.href = `/inventory/${item.id}`;
                  }}
                >
                  <TableCell className="p-2 align-middle whitespace-nowrap has-[[role=checkbox]]:pr-0 font-mono text-xs font-semibold text-primary">
                    {item.sku}
                  </TableCell>
                  <TableCell className="p-2 align-middle whitespace-nowrap has-[[role=checkbox]]:pr-0">
                    <div className="font-semibold text-foreground">
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell className="p-2 align-middle whitespace-nowrap has-[[role=checkbox]]:pr-0 text-sm text-muted-foreground">
                    {item.category}
                  </TableCell>
                  <TableCell className="p-2 align-middle whitespace-nowrap has-[[role=checkbox]]:pr-0 text-right font-mono font-semibold text-foreground">
                    {item.quantity.toLocaleString()}
                  </TableCell>
                  <TableCell className="p-2 align-middle whitespace-nowrap has-[[role=checkbox]]:pr-0 text-right font-mono text-sm text-muted-foreground">
                    {item.minimum_quantity.toLocaleString()}
                  </TableCell>
                  <TableCell className="p-2 align-middle whitespace-nowrap has-[[role=checkbox]]:pr-0 text-sm text-muted-foreground">
                    {item.vendor}
                  </TableCell>
                  <TableCell className="p-2 align-middle whitespace-nowrap has-[[role=checkbox]]:pr-0 font-mono text-xs text-foreground">
                    {item.bin_location}
                  </TableCell>
                  <TableCell className="p-2 align-middle whitespace-nowrap has-[[role=checkbox]]:pr-0">
                    <StatusBadge status={item.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-3 border-t border-border bg-background px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing page {page} of {totalPages} • {totalItems} total items •{" "}
            {limit} per page
          </p>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <PaginationButton
              disabled={page <= 1}
              onClick={() => onPageChange?.(page - 1)}
            >
              <ChevronLeft className="size-4" />
              Previous
            </PaginationButton>

            <PaginationButton
              disabled={page >= totalPages}
              onClick={() => onPageChange?.(page + 1)}
            >
              Next
              <ChevronRight className="size-4" />
            </PaginationButton>
          </div>
        </div>
      </div>
    </Card>
  );
}
