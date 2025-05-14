import { Loader2, MessageSquare } from "lucide-react";
import { useAutumn, useCustomer } from "autumn-js/next";
import { useState } from "react";
import { Button } from "./ui/button";
import PaywallDialog from "@/components/autumn/paywall-dialog";

export default function Application() {
  const [message, setMessage] = useState("");
  const { check, track } = useAutumn();
  const { customer, refetch, isLoading } = useCustomer();

  const sendMessageClicked = async () => {
    const { data } = await check({
      featureId: "chat_messages",
      dialog: PaywallDialog,
    });

    if (data.allowed) {
      track({
        featureId: "chat_messages",
      });
      refetch();
      setMessage("");
    }
  };

  return (
    <div className="border rounded-xs bg-white overflow-hidden flex max-w-sm flex-col h-fit">
      <div className="border-b p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">AI Chatbot Example</h2>
            <p className="text-sm text-muted-foreground">
              See how Autumn&apos;s feature access and tracking works
            </p>
          </div>
          <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center">
            <MessageSquare className="h-4 w-4 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="p-6 flex-1">
        <div className="space-y-2">
          <div className="text-sm font-medium">How it works:</div>
          <ol className="text-sm space-y-2 text-muted-foreground list-decimal list-inside">
            <li>First calls /check to check message allowance</li>
            <li>If allowed, calls /track to record the message</li>
            <li>Updates remaining message count</li>
          </ol>
        </div>
      </div>

      <div className="p-6 pt-0 flex gap-2">
        <input
          type="text"
          placeholder="Hi chatbot!"
          className="flex-1 border !rounded-xs px-2 text-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          className="bg-purple-600 hover:bg-purple-700 rounded-xs shadow-sm whitespace-nowrap cursor-pointer"
          variant="default"
          onClick={async () => {
            await sendMessageClicked();
          }}
        >
          Send Message
        </Button>
        <div className="flex whitespace-nowrap items-center justify-center w-16 text-sm">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-purple-500" />
          ) : (
            <>
              {customer?.features.chat_messages.balance} /{" "}
              {customer?.features.chat_messages.included_usage}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
