const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");

jest.setTimeout(10000);

let mongoServer;
let adminToken;
let basicToken;
let productId;

describe("E-Commerce API Integration Test", () => {
   beforeAll(async () => {
      // Connect to the in-memory MongoDB database before running the tests
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
   });

   // Clean up database and close the connection after all tests are done
   afterAll(async () => {
      if (mongoServer) {
         await mongoose.connection.dropDatabase();
         await mongoose.connection.close();
         await mongoServer.stop();
      }
   });

   describe("Authentication", () => {
      it("should register an admin user successfully", async () => {
         const res = await request(app).post("/api/users/register").send({
            username: "admin1",
            email: "admin1@email.com",
            password: "password123",
            role: "admin",
         });
         expect(res.statusCode).toBe(201);
         expect(res.body).toHaveProperty("message");
      });

      it("should register a basic user successfully", async () => {
         const res = await request(app).post("/api/users/register").send({
            username: "basic1",
            email: "basic1@email.com",
            password: "password123",
            role: "basic",
         });
         expect(res.statusCode).toBe(201);
         expect(res.body).toHaveProperty("message");
      });

      it("should login an admin user & receive a token", async () => {
         const res = await request(app).post("/api/users/login").send({
            email: "admin1@email.com",
            password: "password123",
         });
         expect(res.statusCode).toBe(200);
         expect(res.body).toHaveProperty("token");
         adminToken = res.body.token;
      });

      it("should login a basic user & receive a token", async () => {
         const res = await request(app).post("/api/users/login").send({
            email: "basic1@email.com",
            password: "password123",
         });
         expect(res.statusCode).toBe(200);
         expect(res.body).toHaveProperty("token");
         basicToken = res.body.token;
      });

      it("should get all users", async () => {
         const res = await request(app).get("/api/users");
         expect(res.statusCode).toBe(200);
         expect(Array.isArray(res.body)).toBe(true);
      });
   });

   describe("Product Management", () => {
      it("should allow admin user to create a new product successfully", async () => {
         const res = await request(app)
            .post("/api/products")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
               name: "Test Product",
               category: "Test category",
               price: 7.99,
               attributes: {
                  brand: "Test Brand",
                  color: ["Test Color1", "Test Color2"],
                  battery_life: "Test Years",
               },
               related_products: [],
            });
         expect(res.statusCode).toBe(201);
         expect(res.body.product).toHaveProperty("_id");
         productId = res.body.product._id;
      });

      it("should not allow basic user to create a new product", async () => {
         const res = await request(app)
            .post("/api/products")
            .set("Authorization", `Bearer ${basicToken}`)
            .send({
               name: "Unauthorized Product",
               category: "Unauthorized category",
               price: 7.99,
               attributes: {
                  brand: "Unauthorized Brand",
                  color: ["Unauthorized Color1", "Unauthorized Color2"],
                  battery_life: "Unauthorized Years",
               },
               related_products: [],
            });
         expect(res.statusCode).toBe(403);
         expect(res.body.message).toBe(
            "Access denied. Insufficient permissions."
         );
      });

      it("should get all products", async () => {
         const res = await request(app).get("/api/products");
         expect(res.statusCode).toBe(200);
         expect(Array.isArray(res.body)).toBe(true);
      });

      it("should get a specific product by ID", async () => {
         const res = await request(app).get(`/api/products/${productId}`);
         expect(res.statusCode).toBe(200);
         expect(res.body).toHaveProperty("_id");
         expect(res.body._id.toString()).toBe(productId.toString());
      });

      it("should allow admin user to update a product successfully", async () => {
         const res = await request(app)
            .patch(`/api/products/${productId}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
               name: "Updated Product",
               category: "Updated category",
               price: 7.99,
            });
         expect(res.statusCode).toBe(200);
         expect(res.body.message).toBe("Product updated successfully");
      });

      it("should allow basic user to add a review to a product successfully", async () => {
         const res = await request(app)
            .post(`/api/products/${productId}/reviews`)
            .set("Authorization", `Bearer ${basicToken}`)
            .send({
               rating: 4.2,
               comment: "Test Comment",
            });
         expect(res.statusCode).toBe(201);
         expect(res.body.message).toBe("Review added");
      });

      it("should get all reviews for a product", async () => {
         const res = await request(app)
            .get(`/api/products/${productId}/reviews`)
            .set("Authorization", `Bearer ${basicToken || adminToken}`);
         expect(res.statusCode).toBe(200);
         expect(Array.isArray(res.body.reviews)).toBe(true);
      });

      it("should allow admin user to delete a product successfully", async () => {
         const res = await request(app)
            .delete(`/api/products/${productId}`)
            .set("Authorization", `Bearer ${adminToken}`);
         expect(res.statusCode).toBe(200);
         expect(res.body.message).toBe("Product deleted successfully");
      });
   });
});
