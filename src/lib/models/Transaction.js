import mongoose from 'mongoose';

const EXPENSE_CATEGORIES = [
  'food',
  'groceries',
  'rent',
  'utilities',
  'transport',
  'shopping',
  'entertainment',
  'medical',
  'education',
  'emi',
  'gifts',
  'other',
];

const INCOME_CATEGORIES = [
  'salary',
  'business',
  'freelance',
  'investment',
  'bonus',
  'gift',
  'refund',
  'other',
];

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required for transaction'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount must be a positive number'],
  },
  type: {
    type: String,
    required: [true, 'Transaction type is required'],
    enum: ['income', 'expense'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(category) {
        if (this.type === 'income') {
          return INCOME_CATEGORIES.includes(category);
        }
        if (this.type === 'expense') {
          return EXPENSE_CATEGORIES.includes(category);
        }
        return false;
      },
      message: "Invalid category for the given transaction type",
    },
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  
}, { timestamps: true });

TransactionSchema.index({ userId: 1, date: -1 });

let Transaction;
try {
  Transaction = mongoose.model('Transaction');
} catch {
  Transaction = mongoose.model('Transaction', TransactionSchema);
}

export default Transaction;
