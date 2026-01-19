import express from "express";
import { addTransaction, deleteTransaction, getAllTransactions, updateTransaction } from "../controllers/transaction.controller.js";

const router = express.Router();

router.route("/addTransaction").post(addTransaction);

router.route("/getTransaction").post(getAllTransactions);

router.route("/deleteTransaction/:id").delete(deleteTransaction);

router.route('/updateTransaction/:id').put(updateTransaction);

export default router;