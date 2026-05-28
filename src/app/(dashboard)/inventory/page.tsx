"use client";

import { useState } from "react";

import ItemsHeader from "@/components/items/ItemsHeader";
import ItemsFilters, { type FilterValues } from "@/components/items/ItemsFilters";
import ItemsTable, { type InventoryItem } from "@/components/items/ItemsTable";

// Sample data - replace with actual API call
const SAMPLE_ITEMS: InventoryItem[] = [
  {
    id: "item-001",
    sku: "SL-9920-E",
    name: "Circuit Board v2.4",
    category: "Electronics",
    quantity: 1240,
    minimum_quantity: 500,
    vendor: "Nexus Systems Ltd.",
    bin_location: "A-12-04",
    status: "in-stock",
  },
  {
    id: "item-002",
    sku: "SL-1044-P",
    name: "Pneumatic Actuator",
    category: "Industrial",
    quantity: 42,
    minimum_quantity: 100,
    vendor: "Precision Parts Inc.",
    bin_location: "C-01-11",
    status: "low-stock",
  },
  {
    id: "item-003",
    sku: "SL-5512-C",
    name: "Copper Wire 12AWG",
    category: "Raw Materials",
    quantity: 850,
    minimum_quantity: 300,
    vendor: "Global Logistics Corp",
    bin_location: "B-04-22",
    status: "in-stock",
  },
  {
    id: "item-004",
    sku: "SL-0019-X",
    name: "Heatsink Medium",
    category: "Electronics",
    quantity: 0,
    minimum_quantity: 50,
    vendor: "Nexus Systems Ltd.",
    bin_location: "A-14-02",
    status: "out-of-stock",
  },
  {
    id: "item-005",
    sku: "SL-8843-R",
    name: "Resin Adhesive 1L",
    category: "Raw Materials",
    quantity: 112,
    minimum_quantity: 100,
    vendor: "ChemGlobal Corp",
    bin_location: "D-09-01",
    status: "low-stock",
  },
];

const CATEGORIES = ["Electronics", "Industrial", "Raw Materials", "Packaging"];
const VENDORS = [
  "Nexus Systems Ltd.",
  "Precision Parts Inc.",
  "Global Logistics Corp",
  "ChemGlobal Corp",
];

export default function InventoryPage() {
  const [filters, setFilters] = useState<FilterValues>({
    category: "",
    vendor: "",
  });
  const [page, setPage] = useState(1);

  // Filter items based on selected filters
  const filteredItems = SAMPLE_ITEMS.filter((item) => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.vendor && item.vendor !== filters.vendor) return false;
    return true;
  });

  const pageSize = 20;
  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const paginatedItems = filteredItems.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const handleAddNew = () => {
    // TODO: Implement add new item modal or redirect to form
    console.log("Add new item");
  };

  const handleExportCsv = () => {
    // TODO: Implement CSV export
    console.log("Export CSV");
  };

  return (
    <div className="space-y-6">
      <ItemsHeader
        totalItems={SAMPLE_ITEMS.length}
        onAddNew={handleAddNew}
      />

      <ItemsFilters
        categories={CATEGORIES}
        vendors={VENDORS}
        filters={filters}
        onFilterChange={setFilters}
        onExportCsv={handleExportCsv}
      />

      <ItemsTable
        items={paginatedItems}
        page={page}
        totalPages={totalPages}
        limit={pageSize}
        totalItems={filteredItems.length}
        onPageChange={setPage}
      />
    </div>
  );
}
