"use client";

import { Plus } from "lucide-react";

import Button from "@/components/ui/button";

type ItemsHeaderProps = {
  totalItems?: number;
  onAddNew?: () => void;
};

export default function ItemsHeader({
  totalItems,
  onAddNew,
}: ItemsHeaderProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Item Inventory
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Manage warehouse stock levels and SKU locations.
        </p>
        {totalItems !== undefined && (
          <p className="text-xs text-muted-foreground">
            Total items: {totalItems.toLocaleString()}
          </p>
        )}
      </div>

      <Button
        className="inline-flex h-10 items-center gap-2 bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 self-start sm:self-auto"
        onClick={onAddNew}
      >
        <Plus className="size-4" />
        Add New Item
      </Button>
    </div>
  );
}
