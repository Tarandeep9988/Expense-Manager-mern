'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

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

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'food',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/transactions');
      if (response.data.success) {
        const expenseData = response.data.data.filter((t) => t.type === 'expense');
        setExpenses(expenseData);
      }
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
      alert('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        type: 'expense',
        amount: parseFloat(formData.amount),
      };

      if (editingId) {
        const response = await api.patch(`/transactions/${editingId}`, payload);
        if (response.data.success) {
          alert('Expense updated successfully');
        }
      } else {
        const response = await api.post('/transactions', payload);
        if (response.data.success) {
          alert('Expense added successfully');
        }
      }

      resetForm();
      fetchExpenses();
    } catch (error) {
      console.error('Failed to save expense:', error);
      alert(error.response?.data?.message || 'Failed to save expense');
    }
  };

  const handleEdit = (expense) => {
    setFormData({
      title: expense.title,
      amount: expense.amount.toString(),
      category: expense.category,
      description: expense.description || '',
      date: new Date(expense.date).toISOString().split('T')[0],
    });
    setEditingId(expense._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    try {
      const response = await api.delete(`/transactions/${id}`);
      if (response.data.success) {
        alert('Expense deleted successfully');
        fetchExpenses();
      }
    } catch (error) {
      console.error('Failed to delete expense:', error);
      alert('Failed to delete expense');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      amount: '',
      category: 'food',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Expenses</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium"
        >
          {showForm ? 'Cancel' : '+ Add Expense'}
        </button>
      </div>

      {/* Total Expense Card */}
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
        <p className="text-red-800 font-semibold text-sm sm:text-base">Total Expense: ₹{totalExpense.toFixed(2)}</p>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4">{editingId ? 'Edit Expense' : 'Add New Expense'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                placeholder="e.g., Grocery Shopping"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              >
                {EXPENSE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description (Optional)</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                rows="3"
                placeholder="Add details..."
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button type="submit" className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium">
                {editingId ? 'Update' : 'Add'} Expense
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Expenses List */}
      <div className="bg-white rounded-lg shadow">
        {expenses.length === 0 ? (
          <p className="p-6 text-gray-500 text-center">No expenses yet. Add your first expense!</p>
        ) : (
          <div className="divide-y">
            {expenses.map((expense) => (
              <div key={expense._id} className="p-4 hover:bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-base sm:text-lg">{expense.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)} •{' '}
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                    {expense.description && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">{expense.description}</p>
                    )}
                  </div>
                  <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-2">
                    <p className="text-lg sm:text-xl font-bold text-red-600">₹{expense.amount.toFixed(2)}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(expense)}
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(expense._id)}
                        className="text-red-600 hover:underline text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpensesPage;