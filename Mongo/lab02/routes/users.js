const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({})
    console.log(users)
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  try {
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
