import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const ensureSubscriberMock = vi.fn().mockResolvedValue({});
const addSubscriberToFormMock = vi.fn().mockResolvedValue({});
const sendMessageToTelegramMock = vi.fn().mockResolvedValue({});

vi.mock("@/lib/services/convertkit", () => ({
  ensureSubscriber: ensureSubscriberMock,
  addSubscriberToForm: addSubscriberToFormMock,
}));

vi.mock("@/services/telegram", () => ({
  sendMessageToTelegram: sendMessageToTelegramMock,
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetConfig();
});

describe("/lib/services/playground-access.ts", () => {
  it("creates ConvertKit subscriber and adds him to the form", async () => {
    const email = "email@gmail.com";

    const { grantPlaygroundAccess } = await import("../playground-access");

    await grantPlaygroundAccess(email);

    expect(ensureSubscriberMock).toHaveBeenCalledOnce();
    expect(ensureSubscriberMock).toHaveBeenCalledWith(email);
    expect(addSubscriberToFormMock).toHaveBeenCalledOnce();
    expect(addSubscriberToFormMock).toHaveBeenCalledWith(email);
    expect(sendMessageToTelegramMock).toHaveBeenCalledOnce();
    expect(sendMessageToTelegramMock).toHaveBeenCalledWith(
      `✅ New playground access request: ${email}`,
    );
  });
});
