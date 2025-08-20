// tests/devices.e2e.test.js
import request from "supertest";
import app from "../src/app.js";

describe("Devices Routes", () => {
  it("should return usage data for a device", async () => {
    const res = await request(app).get("/devices/123/usage?range=24h").set("Authorization", `Bearer ${token}`);;

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("deviceId", "123");
    expect(res.body).toHaveProperty("totalUnits");
    expect(res.body).toHaveProperty("last23h");
    expect(typeof res.body.totalUnits).toBe("number");
  });
});
