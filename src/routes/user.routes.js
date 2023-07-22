const express = require("express");
const router = express.Router();
const users = require("../models/users");

// Route untuk menambahkan user baru
router.post("/", async (req, res) => {
  const user = new users({
    nama: req.body.nama,
    umur: req.body.umur,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const usersToSave = await user.save();
    res.status(200).json(usersToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route untuk mendapatkan semua user
router.get("/", async (req, res) => {
  try {
    const user = await users.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route untuk mendapatkan detail user berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route untuk menghapus user berdasarkan ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUserData = await users.findByIdAndDelete(id);
    res.send(`user with ${deleteUserData.nama} has been deleted.`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route untuk memperbarui informasi user berdasarkan ID
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateUserData = req.body;
    const options = { new: true };

    const result = await users.findByIdAndUpdate(id, updateUserData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
