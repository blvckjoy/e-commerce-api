const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");

jest.setTimeout(10000);

let mongoServer;
let adminToken;
let userToken;
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
   });
});
