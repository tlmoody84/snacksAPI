// Import Dotenv
require("dotenv").config();

const request = require("supertest");
const { app, server } = require("../api/index");

describe("Snacks API", () => {
  // Test GET all snacks
  it("should return all snacks", async () => {
    const response = await request(app)
      .get("/snacks")
      .set("api-key", process.env.ADMIN_API_KEY);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Test GET a single snack by id
  it("should return a snack by ID", async () => {
    const snackId = 10; // Change this ID based on your testing data
    const response = await request(app)
      .get(`/snacks/${snackId}`)
      .set("api-key", process.env.ADMIN_API_KEY);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", snackId);
  });

  // Test POST a new snack
  it("should add a new snack", async () => {
    const newSnack = {
      name: "Chips",
      description: "Crunchy and salty",
      price: 1.5,
      category: "Salty Snacks",
      inStock: true,
    };
    const response = await request(app)
      .post("/snacks")
      .set("api-key", process.env.ADMIN_API_KEY)
      .send(newSnack);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", "Chips");
    expect(response.body).toHaveProperty("description", "Crunchy and salty");
    expect(response.body).toHaveProperty("price", 1.5);
  });

  // Test DELETE a snack by id
  it("should delete a snack by ID", async () => {
    const snackId = 1; // Change this ID for testing purposes
    const response = await request(app)
      .delete(`/snacks/${snackId}`)
      .set("api-key", process.env.ADMIN_API_KEY);
    expect(response.status).toBe(204);
  });

  // Test PUT to update a snack by id
  it("should update a snack by ID", async () => {
    const snackId = 1; // Use a valid ID
    const updatedSnack = {
      name: "Chips - Updated",
      description: "Updated description",
      price: 2.0,
      category: "Updated Snacks",
      inStock: false,
    };
    const response = await request(app)
      .put(`/snacks/${snackId}`)
      .set("api-key", process.env.ADMIN_API_KEY)
      .send(updatedSnack);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Chips - Updated");
    expect(response.body).toHaveProperty("description", "Updated description");
    expect(response.body).toHaveProperty("price", 2.0);
    expect(response.body).toHaveProperty("category", "Updated Snacks");
    expect(response.body).toHaveProperty("inStock", false);
  });

  // Close the server after all tests
  afterAll((done) => {
    server.close(done); // Ensure server is closed after tests
  });
});
