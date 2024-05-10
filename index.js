const express = require("express");
const app = express();
const port = 3000;

const fs = require("fs");

const customers = JSON.parse(fs.readFileSync("customers.json"));

//get all customers
app.get("/", (req, res) => {
  res.status(200).json(customers);
});

//get customer by id
app.get("/customer/:id", (req, res) => {
  const id = req.params.id;
  const customer = customers.find((customer) => customer.id == id);
  if (customer) {
    res.status(200).json(customer);
  } else {
    res.status(404).json({ message: "customer not found" });
  }
});

//get customer by name
app.get("/customer/:name", (req, res) => {
  const name = req.params.name;
  const customer = customers.find((customer) => customer.name == name);
  if (customer) {
    res.status(200).json(customer);
  } else {
    res.status(404).json({ message: "customer not found" });
  }
});

//get customer by total amount
app.get("/customer/:totalAmount", (req, res) => {
  const totalAmount = req.params.totalAmount;
  const customer = customers.find(
    (customer) => customer.totalAmount == totalAmount
  );
  if (customer) {
    res.status(200).json(customer);
  } else {
    res.status(404).json({ message: "customer not found" });
  }
});

//get customer by category
app.get("/customer/:category", (req, res) => {
  const category = req.params.category;
  const customer = customers.find((customer) => customer.category == category);
  if (customer) {
    res.status(200).json(customer);
  } else {
    res.status(404).json({ message: "customer not found" });
  }
});

//get customer by tamwen
app.get("/customer/:tamwen", (req, res) => {
  const tamwen = req.params.tamwen;
  const customer = customers.find((customer) => customer.tamwen == tamwen);
  if (customer) {
    res.status(200).json(customer);
  } else {
    res.status(404).json({ message: "customer not found" });
  }
});

//add new customer
app.post("/", (req, res) => {
  const newCustomer = req.body;
  newCustomer.id = customers.length + 1;
  customers.push(newCustomer);
  fs.writeFileSync("customers.json", JSON.stringify(customers));
  res.status(201).json(newCustomer);
});

//update customer
app.put("/:id", (req, res) => {
  const id = req.params.id;
  const customer = customers.find((customer) => customer.id == id);
  if (customer) {
    const index = customers.indexOf(customer);
    customers[index] = req.body;
    fs.writeFileSync("customers.json", JSON.stringify(customers));
    res.status(200).json(customers[index]);
  } else {
    res.status(404).json({ message: "customer not found" });
  }
});

//delete customer
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const customer = customers.find((customer) => customer.id == id);
  if (customer) {
    const index = customers.indexOf(customer);
    customers.splice(index, 1);
    fs.writeFileSync("customers.json", JSON.stringify(customers));
    res.status(200).json(customers);
  } else {
    res.status(404).json({ message: "customer not found" });
  }
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
