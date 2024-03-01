import { IncomingMessage, ServerResponse } from "http";
import { deleteCookie, setCookie } from "./cookies";

describe("[lib/utils] cookies", () => {
  it("should set a cookie", () => {
    const response = {
      setHeader: vi.fn(),
    } as unknown as ServerResponse<IncomingMessage>;

    setCookie({ response, name: "test", value: "test" });
    expect(response.setHeader).toHaveBeenCalledWith(
      "Set-Cookie",
      "test=test; Max-Age=31536000; Path=/; HttpOnly; SameSite=Lax; Secure"
    );
  });

  it("should set a cookie with a custom Max-Age", () => {
    const response = {
      setHeader: vi.fn(),
    } as unknown as ServerResponse<IncomingMessage>;

    setCookie({ response, name: "test", value: "test", maxAge: 6000 });
    expect(response.setHeader).toHaveBeenCalledWith(
      "Set-Cookie",
      "test=test; Max-Age=6000; Path=/; HttpOnly; SameSite=Lax; Secure"
    );
  });

  it("should set a cookie's SameSite property", () => {
    const response = {
      setHeader: vi.fn(),
    } as unknown as ServerResponse<IncomingMessage>;

    setCookie({ response, name: "test", value: "test", sameSite: "Strict" });
    expect(response.setHeader).toHaveBeenCalledWith(
      "Set-Cookie",
      "test=test; Max-Age=31536000; Path=/; HttpOnly; SameSite=Strict; Secure"
    );
  });

  it("should delete a cookie", () => {
    const response = {
      setHeader: vi.fn(),
    } as unknown as ServerResponse<IncomingMessage>;

    setCookie({ response, name: "test", value: "test" });
    expect(response.setHeader).toHaveBeenCalledWith(
      "Set-Cookie",
      "test=test; Max-Age=31536000; Path=/; HttpOnly; SameSite=Lax; Secure"
    );

    deleteCookie({ response, name: "test" });
    expect(response.setHeader).toHaveBeenCalledWith(
      "Set-Cookie",
      "test=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax; Secure"
    );
  });

  it("should delete a cookie with the given SameSite property", () => {
    const response = {
      setHeader: vi.fn(),
    } as unknown as ServerResponse<IncomingMessage>;

    setCookie({ response, name: "test", value: "test", sameSite: "Strict" });
    expect(response.setHeader).toHaveBeenCalledWith(
      "Set-Cookie",
      "test=test; Max-Age=31536000; Path=/; HttpOnly; SameSite=Strict; Secure"
    );

    deleteCookie({ response, name: "test", sameSite: "Strict" });
    expect(response.setHeader).toHaveBeenCalledWith(
      "Set-Cookie",
      "test=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict; Secure"
    );
  });
});
