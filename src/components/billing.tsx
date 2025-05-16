"use client";

import { CreditCard, Loader2 } from "lucide-react";
import { useCustomer } from "autumn-js/next";
import { PricingTable } from "@/components/autumn/pricing-table";
import { cn } from "@/lib/utils";

export default function CustomerDetailsExample() {
  const { customer, isLoading } = useCustomer();

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col min-h-52 bg-white border">
        <div className="border-b p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Customer Details</h2>
              <p className="text-sm text-muted-foreground">
                Current subscription and feature access
              </p>
            </div>
            <div className="h-8 w-8 rounded-xs bg-stone-50 flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-stone-600" />
            </div>
          </div>
        </div>
        {!customer ? (
          <div className="flex items-center justify-center p-6 h-full w-full">
            <Loader2 className="h-4 w-4 animate-spin text-purple-500" />
          </div>
        ) : (
          <div className="p-6 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Customer name</span>
              <span className="text-sm">{customer?.name}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Messages used</span>
              <span className="text-sm font-mono bg-stone-50 px-2 py-1 rounded">
                {customer?.features.chat_messages.usage || 0}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className={cn("hidden space-y-2", !isLoading && "block")}>
        <PricingTable />
        <p className="text-xs text-muted-foreground text-center">
          Make a purchase with Stripe&apos;s test card (4242 42...), then test
          how Autumn handles upgrades, downgrades, renewals etc
        </p>
      </div>
    </div>
  );
}
