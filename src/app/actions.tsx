"use server";

const isAllowed = async ({
  customerId,
  featureId,
}: {
  customerId: string;
  featureId: string;
}) => {
  const response = await fetch(`https://api.useautumn.com/v1/entitled`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.AUTUMN_SECRET_KEY}`,
    },
    body: JSON.stringify({
      customer_id: customerId,
      feature_id: featureId,
    }),
  });

  const data = await response.json();
  return data.allowed;
};

const sendEvent = async ({
  customerId,
  featureId,
}: {
  customerId: string;
  featureId: string;
}) => {
  await fetch("https://api.useautumn.com/v1/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.AUTUMN_SECRET_KEY}`,
    },
    body: JSON.stringify({
      customer_id: customerId,
      feature_id: featureId,
    }),
  });
};

export const sendMessage = async (customerId: string) => {
  const featureId = "chat-messages";

  // 1. Check if user has access to feature
  const allowed = await isAllowed({ customerId, featureId });
  if (!allowed) {
    return false;
  }

  // 2. Send event
  await sendEvent({ customerId, featureId });
  return true;
};
