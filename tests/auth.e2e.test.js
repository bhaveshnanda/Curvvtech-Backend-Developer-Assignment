// tests/auth.e2e.test.js
import request from "supertest";
import app from "../src/app.js";

describe("Auth Routes", () => {
  it("should reject signup with empty body", async () => {
    const res = await request(app).post("/auth/signup").send({});
    expect(res.status).toBe(400); // expect bad request
  });

  it("should signup a new user", async () => {
    const res = await request(app).post("/auth/signup").send({
      email: "testing@example.com",
      password: "mypassword12345",
    });
    expect(res.status).toBe(201); // expect success
    expect(res.body).toHaveProperty("token"); // token must be returned
  });
});
