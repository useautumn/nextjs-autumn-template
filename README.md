# Next.js Autumn Starter Template

[Autumn](https://useautumn.com) is an open-source layer between Stripe and your application, allowing you to create any pricing model and embed it with a few lines of code.

This template demonstrates how you can set up pricing for a simple AI chatbot application.

View the example app here: https://nextjs-autumn-template.vercel.app/

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/useautumn/nextjs-autumn-template.git
npm install
npm run dev
```

2. Create an account at [app.useautumn.com](https://app.useautumn.com)

3. Get your Autumn secret key from the [sandbox environment](https://app.useautumn.com/sandbox/dev) and add it to `.env.local`:

```env
AUTUMN_SECRET_KEY=am_sk_test_OAFUOL0meFCjpMMmFeU13gHnrEOGAHWp2YTLECyY7k
```

4. Connect your Stripe account in the [integrations page](https://app.useautumn.com/sandbox/integrations/stripe)

## Understanding the Implementation

This template implements a simple AI chat message app where users can:

- Send messages (with usage limits)
- Upgrade to a pro or ultra plan
- View their usage and subscription details

### Key Endpoints

1. **Check if a user can access a feature** (`/check`)

```typescript
import { useAutumn } from "autumn-js/react";
const { check } = useAutumn();

// Check if user can send a message
const { data } = await check({
  featureId: "messages",
});

if (!allowed) {
  toast.error("You're out of messages!");
  return;
}
```

2. **Track a user's usage of a feature** (`/track`)

```typescript
const { track } = useAutumn();

// Record that a message was sent
await track({
  featureId: "messages",
});
```

3. **Get a Stripe Checkout URL so the customer can purchase a plan** (`/attach`)

```typescript
// Upgrade user to pro plan
const { attach } = useAutumn();

const onCheckoutClicked = async () => {
  await attach({
    productId: "pro",
  });
};
```

Our shadcn/ui components also trigger automatically to handle paywalls, upgrades, downgrades, and renewals. If you change the products in Autumn, they will automatically update too, so you don't need to make any code changes.

<!-- ### Additional Features

The template also includes `getOrCreateCustomer` to fetch customer details, entitlements, and subscription status, which is used in the customer details card in the UI:

```typescript
const customer = await getOrCreateCustomer(CUSTOMER_ID);
// Returns: customer details, product subscriptions, and feature entitlements
``` -->

## Learn More

- [Autumn Documentation](https://docs.useautumn.com)
- [Next.js Documentation](https://nextjs.org/docs)
