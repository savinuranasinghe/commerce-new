import request from "supertest";
import app from "../server"; // Adjust the path if needed
import jwt from "jsonwebtoken";

// Mock dependencies
jest.mock("jsonwebtoken");

describe("POST /api/user/admin", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it("should login successfully with valid admin credentials", async () => {
    process.env.ADMIN_EMAIL = "admin@example.com";
    process.env.ADMIN_PASSWORD = "admin123";
    process.env.JWT_SECRET = "secret";

    jwt.sign.mockReturnValue("fakeAdminToken"); // Mock JWT token generation

    const res = await request(app)
      .post("/api/user/admin")
      .send({ email: "admin@example.com", password: "admin123" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, token: "fakeAdminToken" });
    expect(jwt.sign).toHaveBeenCalledWith(
      "admin@example.comadmin123",
      "secret"
    );
  });

  it("should return an error for invalid credentials", async () => {
    process.env.ADMIN_EMAIL = "admin@example.com";
    process.env.ADMIN_PASSWORD = "admin123";

    const res = await request(app)
      .post("/api/user/admin")
      .send({ email: "wrong@example.com", password: "wrongPassword" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Invalid credentials",
    });
    expect(jwt.sign).not.toHaveBeenCalled(); // Ensure no token is generated
  });

  it("should handle server errors gracefully", async () => {
    delete process.env.ADMIN_EMAIL; // Simulate missing environment variable
    delete process.env.ADMIN_PASSWORD;

    const res = await request(app)
      .post("/api/user/admin")
      .send({ email: "admin@example.com", password: "admin123" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Invalid credentials",
    });
  });
});
