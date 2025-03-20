"use server";

export const getOrCreateCustomer = async (customerId: string) => {
  const response = await fetch(`https://api.useautumn.com/v1/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.AUTUMN_SECRET_KEY}`,
    },
    body: JSON.stringify({
      id: customerId,
    }),
  });

  const data = await response.json();
  return data;
};

export const attachProduct = async ({
  customerId,
  productId,
}: {
  customerId: string;
  productId: string;
}) => {
  const response = await fetch(`https://api.useautumn.com/v1/attach`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.AUTUMN_SECRET_KEY}`,
    },
    body: JSON.stringify({
      customer_id: customerId,
      product_id: productId,
    }),
  });

  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.message || "Failed to attach pro product");
  }
  return data;
};
