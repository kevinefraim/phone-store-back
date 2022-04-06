import { Router } from "express";

const router = Router();

router.post("/create", (req, res) => res.send("post"));
router.get("/", (req, res) => res.send("get"));
router.get("/:id", (req, res) => res.send("getId"));
router.put("/update/:id", (req, res) => res.send("update"));
router.delete("/delete/:id", (req, res) => res.send("delete"));
