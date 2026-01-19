import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";


export const addTransaction = async (req, res) => {
  try {
    const {
      title,
      amount,
      description,
      date,
      category,
      userId,
      transactionType,
    } = req.body;

    // console.log(title, amount, description, date, category, userId, transactionType);

    if (
      !title ||
      !amount ||
      !description ||
      !date ||
      !category ||
      !transactionType
    ) {
      return res.status(400).json({
        success: false,
        messages: "One or more fields are missing",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    let newTransaction = await Transaction.create({
      title: title,
      amount: amount,
      category: category,
      description: description,
      date: date,
      user: userId,
      transactionType: transactionType,
    });

    user.transactions.push(newTransaction);

    user.save();

    return res.status(200).json({
      success: true,
      message: "Transaction Added Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      messages: err.message,
    });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const { userId, type, frequency, startDate, endDate } = req.body;

    // console.log(userId, type, frequency, startDate, endDate);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Create a query object with the user and type conditions
    const query = {
      user: userId,
    };

    if (type !== 'all') {
      query.transactionType = type;
    }

    // Add date conditions based on 'frequency' and 'custom' range
    if (frequency !== 'custom') {
      query.date = {
        $gt: new Date(Date.now() - Number(frequency) * 24 * 60 * 60 * 1000),
      };
    } else if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // console.log(query);

    const transactions = await Transaction.find(query);

    // console.log(transactions);

    return res.status(200).json({
      success: true,
      transactions: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      messages: err.message,
    });
  }
};


export const deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const userId = req.body.userId;

    // console.log(transactionId, userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const transactionElement = await Transaction.findByIdAndDelete(
      transactionId
    );

    if (!transactionElement) {
      return res.status(400).json({
        success: false,
        message: "transaction not found",
      });
    }


    user.transactions = user.transactions.filter(
      (transaction) => transaction._id !== transactionId
    );
    
    user.save();

    // await transactionElement.remove();

    return res.status(200).json({
      success: true,
      message: `Transaction successfully deleted`,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;

    const { title, amount, description, date, category, transactionType } =
      req.body;

    console.log(title, amount, description, date, category, transactionType);

    const transactionElement = await Transaction.findById(transactionId);

    if (!transactionElement) {
      return res.status(400).json({
        success: false,
        message: "transaction not found",
      });
    }

    if (title) {
      transactionElement.title = title;
    }

    if (description) {
      transactionElement.description = description;
    }

    if (amount) {
      transactionElement.amount = amount;
    }

    if (category) {
      transactionElement.category = category;
    }
    if (transactionType) {
      transactionElement.transactionType = transactionType;
    }

    if (date) {
      transactionElement.date = date;
    }

    await transactionElement.save();

    // await transactionElement.remove();

    return res.status(200).json({
      success: true,
      message: `Transaction Updated Successfully`,
      transaction: transactionElement,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      messages: err.message,
    });
  }
};
