"use client";

import { FileDown, Filter } from "lucide-react";

import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export type FilterValues = {
  category: string;
  vendor: string;
};

type ItemsFiltersProps = {
  categories: string[];
  vendors: string[];
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
  onExportCsv?: () => void;
};

export default function ItemsFilters({
  categories,
  vendors,
  filters,
  onFilterChange,
  onExportCsv,
}: ItemsFiltersProps) {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, category: e.target.value });
  };

  const handleVendorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, vendor: e.target.value });
  };

  return (
    <Card className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Category
          </label>
          <select
            value={filters.category}
            onChange={handleCategoryChange}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none ring-1 ring-transparent transition-ring focus:ring-primary has-[option:checked]:ring-primary min-w-40"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Vendor
          </label>
          <select
            value={filters.vendor}
            onChange={handleVendorChange}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none ring-1 ring-transparent transition-ring focus:ring-primary has-[option:checked]:ring-primary min-w-48"
          >
            <option value="">All Vendors</option>
            {vendors.map((vendor) => (
              <option key={vendor} value={vendor}>
                {vendor}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto flex items-center gap-2 self-end">
          <Button
            variant="outline"
            size="sm"
            className="inline-flex gap-2"
            disabled
          >
            <Filter className="size-4" />
            <span className="hidden sm:inline text-sm">More Filters</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="inline-flex gap-2"
            onClick={onExportCsv}
          >
            <FileDown className="size-4" />
            <span className="hidden sm:inline text-sm">Export CSV</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
