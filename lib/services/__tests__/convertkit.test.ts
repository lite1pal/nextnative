import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/env", () => ({
  env: {
    CONVERTKIT_API_KEY: "convertkit-key",
    CONVERTKIT_FORM_ID: "convertkit-form-id",
  },
}));

const email_address = "email@gmail.com";
const wrong_email = "emailgmail.com";

beforeEach(() => {
  vi.clearAllMocks();

  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    text: () => Promise.resolve(""),
    json: () => Promise.resolve({}),
  }) as any;
});

describe("/lib/services/convertkit.ts", () => {
  describe("postToKit(path, body)", () => {
    it("makes a POST request", async () => {
      const { postToKit } = await import("../convertkit");

      await postToKit("/path", { email_address });

      expect(fetch).toHaveBeenCalledOnce();
      expect(fetch).toHaveBeenCalledWith(
        "https://api.kit.com/v4/path",
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Kit-Api-Key": "convertkit-key",
          },
          body: JSON.stringify({ email_address }),
        }),
      );
    });
  });

  describe("assertEmail(email)", () => {
    it("throws error if email doesn't include @", async () => {
      const { assertEmail } = await import("../convertkit");

      expect(() => assertEmail(wrong_email)).toThrow(
        expect.objectContaining({
          code: "INVALID_EMAIL",
          httpStatus: 400,
          safeMessage: "Invalid email address.",
        }),
      );
    });
  });

  describe("ensureSubscriber(email)", () => {
    it("throws for invalid email", async () => {
      const { ensureSubscriber } = await import("../convertkit");

      await expect(ensureSubscriber(wrong_email)).rejects.toMatchObject({
        code: "INVALID_EMAIL",
        httpStatus: 400,
        safeMessage: "Invalid email address.",
      });

      expect(fetch).not.toHaveBeenCalled();
    });

    it("invokes postToKit", async () => {
      const { ensureSubscriber } = await import("../convertkit");

      await ensureSubscriber(email_address);

      expect(fetch).toHaveBeenCalledWith(
        "https://api.kit.com/v4/subscribers",
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Kit-Api-Key": "convertkit-key",
          },
          body: JSON.stringify({ email_address }),
        }),
      );
    });
  });

  describe("addSubscriberToForm(email)", () => {
    it("throws for invalid email", async () => {
      const { addSubscriberToForm } = await import("../convertkit");

      await expect(addSubscriberToForm(wrong_email)).rejects.toMatchObject({
        code: "INVALID_EMAIL",
        httpStatus: 400,
        safeMessage: "Invalid email address.",
      });

      expect(fetch).not.toHaveBeenCalled();
    });

    it("invokes postToKit", async () => {
      const { addSubscriberToForm } = await import("../convertkit");

      await addSubscriberToForm(email_address);

      expect(fetch).toHaveBeenCalledWith(
        "https://api.kit.com/v4/forms/convertkit-form-id/subscribers",
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Kit-Api-Key": "convertkit-key",
          },
          body: JSON.stringify({ email_address }),
        }),
      );
    });
  });
});
