import supertest from "supertest";
import app from "../../index";

const request = supertest(app);

describe("photo-router", () => {
  describe("POST /photos", () => {
    it("should return 400", async () => {
      // Arrange and Act
      const response = await request
        .post("/photos")
        .set("Content-Type", "application/json")
        .send({});

      // Assert
      expect(response.status).toBe(400);
      expect(response.text).toBe("PhotoUrl is required");
    });

    it("should return 201", async () => {
      // Arrange and Act
      const response = await request
        .post("/photos")
        .set("Content-Type", "application/json")
        .send({ photoUrl: "https://www.google.com" });

      // Assert
      expect(response.status).toBe(201);
      expect(response.body.insertedId).toBeDefined();
    });
  });

  describe("GET /photos", () => {
    fit("should return 200", async () => {
      // Arrange and Act
      const response = await request.get("/photos");

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
