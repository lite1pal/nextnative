"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  Filter,
  BarChart2,
} from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

type Mode = "list" | "add" | "edit" | "analytics";

const categories = [
  "Food",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Bills",
  "Other",
];

const COLORS = [
  "#6366f1",
  "#4f46e5",
  "#4338ca",
  "#3730a3",
  "#312e81",
  "#1e1b4b",
];

export default function ExpenseApp() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("expenses");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [mode, setMode] = useState<Mode>("list");
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "All",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      filters.category === "All" || expense.category === filters.category;
    const matchesDate =
      (!filters.startDate || expense.date >= filters.startDate) &&
      (!filters.endDate || expense.date <= filters.endDate);
    return matchesCategory && matchesDate;
  });

  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const analytics = useMemo(() => {
    if (expenses.length === 0) return null;
    // Category breakdown
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const categoryData = Object.entries(categoryTotals).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

    // Daily spending for current month
    const currentDate = new Date();
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const dailySpending = daysInMonth.map((date) => {
      const dateStr = format(date, "yyyy-MM-dd");
      const total = expenses
        .filter((e) => e.date === dateStr)
        .reduce((sum, e) => sum + e.amount, 0);
      return {
        date: format(date, "MMM d"),
        amount: total,
      };
    });

    // Monthly total
    const monthlyTotal = dailySpending.reduce(
      (sum, day) => sum + day.amount,
      0
    );
    const dailyAverage = monthlyTotal / daysInMonth.length;

    // Most expensive category
    const mostExpensive = categoryData.reduce((a, b) =>
      a.value > b.value ? a : b
    );

    return {
      categoryData,
      dailySpending,
      monthlyTotal,
      dailyAverage,
      mostExpensive,
    };
  }, [expenses]);

  return (
    <div className="h-full min-h-[1000px] bg-gray-50 text-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Expenses
        </h1>
        <div className="flex gap-2">
          {mode === "list" && (
            <>
              {expenses.length > 0 && (
                <>
                  <button
                    onClick={() => setMode("analytics")}
                    className="p-2 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  >
                    <BarChart2 size={20} />
                  </button>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-2 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  >
                    <Filter size={20} />
                  </button>
                </>
              )}
            </>
          )}
          {mode === "list" ? (
            <button
              onClick={() => setMode("add")}
              className="p-2 rounded-full bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
            >
              <Plus size={20} />
            </button>
          ) : (
            <button
              onClick={() => setMode("list")}
              className="p-2 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
            >
              <ChevronLeft size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {mode === "list" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              {/* Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Category
                        </label>
                        <select
                          value={filters.category}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                        >
                          <option value="All">All Categories</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={filters.startDate}
                            onChange={(e) =>
                              setFilters((prev) => ({
                                ...prev,
                                startDate: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 text-white  rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            End Date
                          </label>
                          <input
                            type="date"
                            value={filters.endDate}
                            onChange={(e) =>
                              setFilters((prev) => ({
                                ...prev,
                                endDate: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Total Amount */}
              <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  ${totalAmount.toFixed(2)}
                </p>
              </div>

              {/* Expense List */}
              <div className="p-4 space-y-4">
                {filteredExpenses.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                      No expenses found
                    </p>
                  </div>
                ) : (
                  filteredExpenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {expense.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {format(new Date(expense.date), "MMM d, yyyy")}
                          </p>
                        </div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          ${expense.amount.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-indigo-600 dark:text-indigo-400">
                          {expense.category}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setCurrentExpense(expense);
                              setMode("edit");
                            }}
                            className="p-1.5 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setExpenses((prev) =>
                                prev.filter((e) => e.id !== expense.id)
                              );
                            }}
                            className="p-1.5 rounded text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {(mode === "add" || mode === "edit") && (
            <ExpenseForm
              expense={currentExpense}
              onSubmit={(data) => {
                if (mode === "edit" && currentExpense) {
                  setExpenses((prev) =>
                    prev.map((e) =>
                      e.id === currentExpense.id ? { ...data, id: e.id } : e
                    )
                  );
                } else {
                  setExpenses((prev) => [
                    ...prev,
                    { ...data, id: Date.now().toString() },
                  ]);
                }
                setMode("list");
              }}
            />
          )}

          {mode === "analytics" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-auto"
            >
              <div className="p-4 space-y-6">
                {/* Monthly Overview */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Monthly Overview
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Spent
                      </p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">
                        ${analytics?.monthlyTotal.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Daily Average
                      </p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">
                        ${analytics?.dailyAverage.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics?.dailySpending}>
                        <XAxis
                          dataKey="date"
                          tick={{ fill: "#9CA3AF" }}
                          tickLine={{ stroke: "#9CA3AF" }}
                        />
                        <YAxis
                          tick={{ fill: "#9CA3AF" }}
                          tickLine={{ stroke: "#9CA3AF" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "none",
                          }}
                        />
                        <Bar dataKey="amount" fill="#6366f1" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Category Breakdown
                  </h2>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Most Expensive Category
                    </p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {analytics?.mostExpensive.name} ($
                      {analytics?.mostExpensive.value.toFixed(2)})
                    </p>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analytics?.categoryData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={(entry) => entry.name}
                        >
                          {analytics?.categoryData.map((entry, index) => (
                            <Cell
                              key={entry.name}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "none",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ExpenseForm({
  expense,
  onSubmit,
}: {
  expense: Expense | null;
  onSubmit: (data: Omit<Expense, "id">) => void;
}) {
  const [name, setName] = useState(expense?.name || "");
  const [amount, setAmount] = useState(expense?.amount.toString() || "");
  const [category, setCategory] = useState(expense?.category || "Other");
  const [date, setDate] = useState(
    expense?.date || format(new Date(), "yyyy-MM-dd")
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      amount: parseFloat(amount),
      category,
      date,
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onSubmit={handleSubmit}
      className="p-4 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Amount
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
      >
        {expense ? "Save Changes" : "Add Expense"}
      </button>
    </motion.form>
  );
}
