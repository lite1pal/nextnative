import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

const hoisted = vi.hoisted(() => {
  const searchParamsGetMock = vi.fn<(key: string) => string | null>();

  const useSearchParamsMock = vi.fn(() => ({
    get: searchParamsGetMock,
  }));

  const fetchMock = vi.fn();

  return {
    searchParamsGetMock,
    useSearchParamsMock,
    fetchMock,
  };
});

vi.mock("next/navigation", () => ({
  useSearchParams: hoisted.useSearchParamsMock,
}));

vi.mock("framer-motion", async () => {
  const React = (await import("react")) as any;

  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) => {
        return ({ children, ...props }: any) =>
          React.createElement(tag, props, children);
      },
    },
  );

  return {
    motion,
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

vi.mock("lucide-react", () => ({
  CheckCircleIcon: (props: any) => <svg data-testid="check" {...props} />,
  XCircleIcon: (props: any) => <svg data-testid="x" {...props} />,
}));

async function loadComponent() {
  vi.resetModules();
  process.env.NEXT_PUBLIC_NEXTNATIVE_ALL_IN_ID = "all_in_product";
  process.env.NEXT_PUBLIC_IOS_PUBLISHING_GUIDE_URL = "https://example.com/ios";
  process.env.NEXT_PUBLIC_ANDROID_PUBLISHING_GUIDE_URL =
    "https://example.com/android";

  // window.fbq is called unconditionally inside useEffect
  (globalThis as any).window = globalThis.window ?? ({} as any);
  (globalThis.window as any).fbq = vi.fn();

  globalThis.fetch = hoisted.fetchMock as any;

  return await import("../app/thank-you/form");
}

describe("/thank-you form", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    hoisted.searchParamsGetMock.mockReset().mockImplementation((key) => {
      if (key === "payment_id") return "pay_1";
      return null;
    });
    hoisted.useSearchParamsMock.mockClear();
    hoisted.fetchMock.mockReset();
  });

  it("renders invited message when isInvited=true", async () => {
    const { default: ThankYouPage } = await loadComponent();

    render(
      <ThankYouPage
        paymentData={{ product_cart: [{ product_id: "starter" }] }}
        isInvited={true}
      />,
    );

    expect(
      screen.getByText("You're in! Your GitHub invite is on the way 🚀"),
    ).toBeTruthy();
    expect(screen.queryByLabelText("GitHub Username")).not.toBeTruthy();
  });

  it("renders extra guide links for All-in invited customers", async () => {
    const { default: ThankYouPage } = await loadComponent();

    render(
      <ThankYouPage
        paymentData={{ product_cart: [{ product_id: "all_in_product" }] }}
        isInvited={true}
      />,
    );

    const ios = screen.getByText("iOS Publishing Guide").closest("a");
    const android = screen.getByText("Android Publishing Guide").closest("a");

    expect(ios?.getAttribute("href")).toBe("https://example.com/ios");
    expect(android?.getAttribute("href")).toBe("https://example.com/android");
  });

  it("shows validation error if username is missing", async () => {
    const { default: ThankYouPage } = await loadComponent();

    const { container } = render(
      <ThankYouPage
        paymentData={{ settlement_amount: 10000, payment_id: "pay_1" }}
        isInvited={false}
      />,
    );

    const form = container.querySelector("form");
    expect(form).toBeTruthy();
    fireEvent.submit(form!);

    expect(
      screen.getByText("GitHub username and payment ID are required"),
    ).toBeTruthy();

    expect(hoisted.fetchMock).not.toHaveBeenCalled();
  });

  it("shows validation error if paymentId is missing in URL", async () => {
    const { default: ThankYouPage } = await loadComponent();

    hoisted.searchParamsGetMock.mockImplementation((key) => {
      if (key === "payment_id") return null;
      return null;
    });

    render(
      <ThankYouPage
        paymentData={{ settlement_amount: 10000, payment_id: "pay_1" }}
        isInvited={false}
      />,
    );

    fireEvent.change(screen.getByLabelText("GitHub Username"), {
      target: { value: "octocat" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      screen.getByText("GitHub username and payment ID are required"),
    ).toBeTruthy();

    expect(hoisted.fetchMock).not.toHaveBeenCalled();
  });

  it("submits username successfully and shows success UI", async () => {
    const { default: ThankYouPage } = await loadComponent();

    hoisted.fetchMock.mockResolvedValueOnce({ ok: true });

    render(
      <ThankYouPage
        paymentData={{ settlement_amount: 9900, payment_id: "pay_1" }}
        isInvited={false}
      />,
    );

    fireEvent.change(screen.getByLabelText("GitHub Username"), {
      target: { value: "octocat" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(hoisted.fetchMock).toHaveBeenCalledWith("/api/submit-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: "pay_1",
          githubUsername: "octocat",
          amount: 99,
        }),
      });
    });

    expect(
      await screen.findByText("You're in! Your GitHub invite is on the way 🚀"),
    ).toBeTruthy();

    expect(
      screen.getByText("documentation").closest("a")?.getAttribute("href"),
    ).toBe("https://nextnative.dev/docs");

    expect(screen.getByText("Go to the NextNative repository")).toBeTruthy();
  });

  it("shows loading state while submitting", async () => {
    const { default: ThankYouPage } = await loadComponent();

    let resolveFetch: (val: any) => void = () => undefined;
    hoisted.fetchMock.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        }),
    );

    render(
      <ThankYouPage
        paymentData={{ settlement_amount: 9900, payment_id: "pay_1" }}
        isInvited={false}
      />,
    );

    fireEvent.change(screen.getByLabelText("GitHub Username"), {
      target: { value: "octocat" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      screen.getByRole("button", { name: /Submitting\.{3}/ }),
    ).toBeTruthy();
    expect(screen.getByRole("button")).toHaveProperty("disabled", true);

    resolveFetch({ ok: true });

    await screen.findByText("You're in! Your GitHub invite is on the way 🚀");
  });

  it("shows error message when submit API returns non-ok", async () => {
    const { default: ThankYouPage } = await loadComponent();

    hoisted.fetchMock.mockResolvedValueOnce({ ok: false });

    render(
      <ThankYouPage
        paymentData={{ settlement_amount: 9900, payment_id: "pay_1" }}
        isInvited={false}
      />,
    );

    fireEvent.change(screen.getByLabelText("GitHub Username"), {
      target: { value: "octocat" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByText("Something went wrong. Please try again."),
    ).toBeTruthy();

    expect(
      screen.queryByText("Username submitted successfully"),
    ).not.toBeTruthy();
  });

  it("shows error message when fetch throws", async () => {
    const { default: ThankYouPage } = await loadComponent();

    hoisted.fetchMock.mockRejectedValueOnce(new Error("network"));

    render(
      <ThankYouPage
        paymentData={{ settlement_amount: 9900, payment_id: "pay_1" }}
        isInvited={false}
      />,
    );

    fireEvent.change(screen.getByLabelText("GitHub Username"), {
      target: { value: "octocat" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByText("Something went wrong. Please try again."),
    ).toBeTruthy();
  });
});
