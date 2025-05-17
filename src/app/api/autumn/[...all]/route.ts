import { autumnHandler } from "autumn-js/next";

export const { GET, POST } = autumnHandler({
  identify: async (request) => {
    console.log(request);
    //this should come from your auth provider
    return { customerId: "user_1234", customerData: { name: "John" } };
  },
});
