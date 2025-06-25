jest.mock("../config/mongodb.js", () => jest.fn());

import request from "supertest";
import app from "../server";

let server;

describe("Root Route", () => {
  it("Should return 'API Working'", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("API Working");
  });
});
