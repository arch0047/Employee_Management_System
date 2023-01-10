
const dotenv = require("dotenv");

const request = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const db = require("../connector/db");

const config = {
  verbose: true,
};


// define reusable password value
const password = "12345678";
const adminEmail = "arch@stud.kea.dk";
const employeeEmail = "maria@gmail.com";

describe("Test route for login", () => {
  beforeEach(async () => {
    jest.setTimeout(10000);
    // define reusable password value
    const hashed_password = await bcrypt.hash(password, 10);
    // create admin
    await db.sequelize.models.admin.create({
      name: "Admin",
      email: adminEmail,
      password: hashed_password,
    });
    // create employee
    await db.sequelize.models.employees.create({
      name: "Employee",
      email: employeeEmail,
      password: hashed_password,
      employee_phone: 12345678,
      employee_location: "DK",
      role_id: 1,
      department_id: 1,
      employee_salary: "30,000",
    });
  });

  afterEach(async () => {
    jest.setTimeout(10000);
    await db.sequelize.models.admin.destroy({
      where: { email: adminEmail },
    });
    await db.sequelize.models.employees.destroy({
      where: { email: employeeEmail },
    });
  });

  afterAll(async () => {
    try {
      jest.setTimeout(10000);
      await db.sequelize.models.admin.destroy({
        where: { email: adminEmail },
      });
      await db.sequelize.models.employees.destroy({
        where: { email: employeeEmail },
      });
    } catch (e) {}
  }); app.close()


  
    afterAll(async () => {
      await db.sequelize.close();
      await new Promise((res) => setTimeout(res, 500)); // avoid jest open handle error
    });



  test("Login: Test for valid inputs should redirect", (done) => {
    request(app)
      .post("/login")
      .send({
        email:employeeEmail,
        password:"12345678",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("Login: Test for invalid email", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "invalid@test.com",
        password: password,
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
  test("Login: Test for invalid password", (done) => {
    request(app)
      .post("/login")
      .send({
        email: employeeEmail,
        password: "wrongPassword123",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
});
