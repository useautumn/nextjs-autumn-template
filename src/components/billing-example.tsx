"use client";

import { CreditCard } from "lucide-react";

export default function CustomerDetailsExample({
  customerData,
  onUpgradeClicked,
}: {
  customerData: any;
  onUpgradeClicked: () => void;
}) {
  const { customer, entitlements, products } = customerData;
  const getEntitlement = (featureId: string) => {
    return entitlements.find(
      (entitlement: any) => entitlement.feature_id === featureId
    );
  };

  const chatMessages = getEntitlement("chat-messages");
  const proAnalytics = getEntitlement("pro-analytics");
  const hasPro = products.length > 0 && products[0].id === "pro";

  return (
    <div className="border rounded-lg bg-white overflow-hidden flex flex-col">
      <div className="border-b p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Customer Details</h2>
            <p className="text-sm text-muted-foreground">
              Current subscription and feature access
            </p>
          </div>
          <div className="h-8 w-8 rounded-lg bg-stone-50 flex items-center justify-center">
            <CreditCard className="h-4 w-4 text-stone-600" />
          </div>
        </div>
      </div>

      <div className="p-6 flex-1">
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm font-medium">Customer ID</span>
            <span className="text-sm font-mono bg-stone-50 px-2 py-1 rounded">
              {customer.id}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm font-medium">Messages Remaining</span>
            <span className="text-sm font-mono bg-stone-50 px-2 py-1 rounded">
              {chatMessages.unlimited ? "∞" : chatMessages.balance}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm font-medium">Pro Analytics</span>
            <span
              className={`text-sm font-medium ${
                proAnalytics ? "text-green-600" : "text-red-600"
              }`}
            >
              {proAnalytics ? "Enabled" : "Disabled"}
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium">Current Plan</span>
            <span className="text-sm font-medium">
              {hasPro ? (
                <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                  Pro
                </span>
              ) : (
                <span className="bg-stone-50 text-stone-600 px-2 py-1 rounded-full">
                  Free
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        {!hasPro && (
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 transition-colors"
            onClick={onUpgradeClicked}
          >
            Upgrade to Pro
          </button>
        )}
      </div>
    </div>
  );
}
