const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "njk");

const middleWare = (req, res, next) => {
  if (req.query.age) return next();
  else return res.redirect("/");
};

// Rota inicial
app.get("/", (req, res) => {
  return res.render("entrada");
});

// Rota Check
app.post("/check", (req, res) => {
  const age = req.body.age;

  if (age >= 18) return res.redirect(`/major?age=${age}`);
  else return res.redirect(`/minor?age=${age}`);
});

// Rota major
app.get("/major", middleWare, (req, res) => {
  return res.render("major", {
    age: req.query.age
  });
});

// Rota minor
app.get("/minor", middleWare, (req, res) => {
  return res.render("minor", {
    age: req.query.age
  });
});

app.listen(3000);
