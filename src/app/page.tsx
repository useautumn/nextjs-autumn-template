"use client";

import { toast } from "sonner";
import { sendMessage } from "./actions";

const CUSTOMER_ID = "theo";

export default function Home() {
  return (
    <div className="h-screen w-full p-6">
      <button
        onClick={async () => {
          const success = await sendMessage(CUSTOMER_ID);
          if (success) {
            toast.success("Message sent");
          } else {
            toast.error("Out of messages, please upgrade");
          }
        }}
      >
        Send Message
      </button>
    </div>
  );
}
