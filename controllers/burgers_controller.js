var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

//load page and display any burgers ordered
router.get("/", (req, res) => {
  burger.selectAll((burgers) => {
    var hbsObject = {
      burger: burgers
    };
    res.render("index", hbsObject);
  });
});

//order a burger
router.post("/order", (req, res) => {
  var toInsert = req.body.burger_name;
  if (toInsert === "") {
  } else {
    console.log(toInsert);
    burger.insertOne(toInsert, (response) => {
      console.log(`Successfully ordered ${toInsert}, ID = ${response.insertId}`);
    });
  }
    res.redirect("/");
  
});

//put to update burger (as devoured)
router.put("/devour", (req, res) => {
  var devoured = req.body.id;
  burger.updateOne(devoured, (response) => {
    console.log(response);
  });
  res.redirect("/");
});

//delete order
router.delete("/cancel", (req, res) => {
  var canceled = req.body.id;
  burger.deleteOne(canceled, (response) => {
    console.log(response);
  });
  res.redirect("/");
});

//delete any devoured burgers
router.delete("/clear", (req, res) => {
  burger.deleteDevoured((response) => {
    console.log("Cleared!");
    console.log(response);
  });
  res.redirect("/");
});

// Export routes for server.js to use.
module.exports = router;
