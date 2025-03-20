"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { attachProduct, getOrCreateCustomer } from "./actions";

const CUSTOMER_ID = "theo";

export default function BillingPage() {
  const [customerData, setCustomerData] = useState<any>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      const customer = await getOrCreateCustomer(CUSTOMER_ID);
      setCustomerData(customer);
    };
    fetchCustomer();
  }, []);

  if (!customerData) {
    return <div></div>;
  }

  const { customer, products, entitlements } = customerData;

  const getEntitlement = (featureId: string) => {
    return entitlements.find(
      (entitlement: any) => entitlement.feature_id === featureId
    );
  };

  const hasPro = products.length > 0 && products[0].id === "pro";

  return (
    <div className="h-screen w-full p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Hello, {customer.id}</h1>
      <p>
        Number of chat messages left:{" "}
        {getEntitlement("chat-messages").unlimited
          ? "Unlimited"
          : getEntitlement("chat-messages").balance}
      </p>
      <p>
        Access to pro analytics:{" "}
        {getEntitlement("pro-analytics") !== undefined ? "✅" : "❌"}
      </p>

      {!hasPro ? (
        <button
          className="w-fit"
          onClick={async () => {
            try {
              const res = await attachProduct({
                customerId: CUSTOMER_ID,
                productId: "pro",
              });
              window.open(res.checkout_url, "_blank");
            } catch (error: any) {
              toast.error(`${error}`);
            }
          }}
        >
          Upgrade to Pro
        </button>
      ) : (
        <p>
          Current plan: <span className="font-bold">Pro</span>
        </p>
      )}
    </div>
  );
}
