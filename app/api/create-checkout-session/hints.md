Start by identifying branches:

```txt
valid plan -> 200 + returns session url
invalid plan -> 400
Stripe throws -> 500
```

Big hint: `stripe` is created at module load time:

```ts
const stripe = new Stripe(...)
```

So mocks/env vars must be set **before**:

```ts
const { POST } = await import("../route");
```

For the first test, mock Stripe constructor:

```ts
const createMock = vi.fn().mockResolvedValue({
  url: "https://checkout.stripe.com/test",
});

vi.mock("stripe", () => ({
  default: vi.fn(() => ({
    checkout: {
      sessions: {
        create: createMock,
      },
    },
  })),
}));
```

Then set env before importing route:

```ts
process.env.STRIPE_SECRET_KEY = "sk_test";
process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_STARTER_PRICE_ID = "price_starter";
process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_STARTER_PRODUCT_ID = "prod_starter";
process.env.NEXT_PUBLIC_APP_URL = "https://nextnative.dev";
```

Request shape:

```ts
const req = new Request("http://local/api/checkout", {
  method: "POST",
  body: JSON.stringify({ plan: "starter" }),
});
```

Then assert:

```ts
expect(res.status).toBe(200);
expect(createMock).toHaveBeenCalledWith(
  expect.objectContaining({
    mode: "payment",
    line_items: [{ price: "price_starter", quantity: 1 }],
    metadata: { productId: "prod_starter" },
  }),
);
```

Main thing to learn: this route is mostly testing **“did I translate a plan into the right Stripe checkout config?”**
