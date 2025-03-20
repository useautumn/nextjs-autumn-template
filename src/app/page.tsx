"use client";

import { toast } from "sonner";
import {
  getOrCreateCustomer,
  attachProduct,
  sendEvent,
  entitled,
} from "./actions";
import { useState } from "react";
import { useEffect } from "react";
import Intro from "@/components/intro";
import EntitledExampleCard from "@/components/entitled-example";
import CustomerDetailsExample from "@/components/billing-example";

const CUSTOMER_ID = "theo";
const FEATURE_ID = "chat-messages";

export default function Home() {
  const [customerData, setCustomerData] = useState<any>(null);

  const fetchCustomer = async () => {
    const customer = await getOrCreateCustomer(CUSTOMER_ID);
    setCustomerData(customer);
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  if (!customerData) {
    return <></>;
  }

  const upgradeClicked = async () => {
    try {
      const res = await attachProduct({
        customerId: CUSTOMER_ID,
        productId: "pro",
      });
      window.open(res.checkout_url, "_blank");
    } catch (error: any) {
      toast.error(`${error}`);
    }
  };

  const sendMessageClicked = async () => {
    const allowed = await entitled({
      customerId: CUSTOMER_ID,
      featureId: FEATURE_ID,
    });

    if (!allowed) {
      toast.error("You're out of messages!");
      return;
    }

    await sendEvent({
      customerId: CUSTOMER_ID,
      featureId: FEATURE_ID,
    });
    toast.success("Message sent!");
  };

  return (
    <div className="min-h-screen w-full p-6 flex flex-col gap-8 max-w-7xl mx-auto">
      <Intro />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EntitledExampleCard
          onSendMessageClicked={async () => {
            await sendMessageClicked();
            await fetchCustomer();
          }}
        />
        <CustomerDetailsExample
          customerData={customerData}
          onUpgradeClicked={upgradeClicked}
        />
      </div>
    </div>
  );
}
