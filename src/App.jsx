import { useState, useEffect } from "react";
import { Wallet, ArrowDownRight, ArrowUpRight, Plus, Receipt, Search, Filter, History } from 'lucide-react';

function App() {
const [transactions, setTransactions] = useState(() => {

  const savedTransactions =
    localStorage.getItem("transactions");

  return savedTransactions
    ? JSON.parse(savedTransactions)
    : [
        {
          id:1,
          description:"Salary",
          amount:5000,
          type:"income"
        },
        {
          id:2,
          description:"Pizza",
          amount:250,
          type:"expense"
        }
      ];

});
 const [description, setDescription] = useState("");
const [amount, setAmount] = useState("");
const [type, setType] = useState("expense");
const [error, setError] = useState("");
const addTransaction = () => {
  if (!description) {
   setError("Please enter a description");
   return;
}

if (!amount) {
   setError("Please enter an amount");
   return;
}

setError("");

  const newTransaction = {
    id: Date.now(),
    description: description,
    amount: Number(amount),
    type: type
  };

  setTransactions([
    ...transactions,
    newTransaction
  ]);
  setDescription("");
setAmount("");
setType("expense");
  

};
const deleteTransaction = (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this transaction?"
  );

  if (!confirmDelete) {
    return;
  }

  const updatedTransactions = transactions.filter(
    (transaction) => transaction.id !== id
  );

  setTransactions(updatedTransactions);

};
const income = transactions
  .filter(t => t.type === "income")
  .reduce((total, t) => total + t.amount, 0);

const expense = transactions

  .filter(t => t.type === "expense")
  .reduce((total, t) => total + t.amount, 0);

const balance = income - expense;

useEffect(() => {

  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );

}, [transactions]);

return(
<>
  
    <div className="min-h-screen p-4 md:p-8 lg:p-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <Wallet className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">NexTrack</h1>
              <p className="text-sm text-slate-400 font-medium">Personal Finance</p>
            </div>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-dark-800 border border-dark-600/50 flex items-center justify-center overflow-hidden">
            {/* User Avatar Placeholder */}
            <div className="w-full h-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Dashboard & Actions */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Balance Card */}
            <div className="glass-panel p-8 relative overflow-hidden group">
              {/* Card Decoration */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors duration-500" />
              
              <p className="text-slate-400 font-medium mb-2 flex items-center gap-2">
                Total Balance
              </p>
              <h2 className="text-5xl font-bold text-white tracking-tight mb-8">
                ₹{balance}
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Income Mini-Card */}
                <div className="bg-dark-900/40 rounded-xl p-4 border border-dark-600/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-success-500-alpha-10 flex items-center justify-center">
                      <ArrowDownRight className="w-4 h-4 text-success-500" />
                    </div>
                    <span className="text-sm text-slate-400 font-medium">Income</span>
                  </div>
                  <p className="text-xl font-semibold text-white">₹{income}</p>
                </div>
                
                {/* Expense Mini-Card */}
                <div className="bg-dark-900/40 rounded-xl p-4 border border-dark-600/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-danger-500-alpha-10 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-danger-500" />
                    </div>
                    <span className="text-sm text-slate-400 font-medium">Expense</span>
                  </div>
                  <p className="text-xl font-semibold text-white">₹{expense}</p>
                </div>
              </div>
            </div>

            {/* Add Transaction Form */}
            <div className="glass-panel p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary-500" />
                New Transaction
              </h3>
              
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
                 <input
                   type="text"
                   placeholder="e.g. Groceries, Salary"
  className="glass-input"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                      <input
  type="number"
  placeholder="0.00"
  className="glass-input"
  style={{ paddingLeft: "30px" }}
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
/>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Type</label>
                    <select
  className="glass-input appearance-none text-slate-300"
  value={type}
  onChange={(e) => setType(e.target.value)}
>
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                </div>
{
  error && (
    <p className="text-red-400 text-sm">
      {error}
    </p>
  )
}
                <button type="button" onClick={addTransaction}  className="btn-primary w-full mt-2 flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add Transaction
                </button>
              </form>
            </div>
          </div>
          

          {/* Right Column - Transaction List */}
          <div className="lg:col-span-7">
            <div className="glass-panel h-full min-h-[500px] flex flex-col p-6 sm:p-8">
              
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-dark-600/50">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-primary-500" />
                  Recent Transactions
                </h3>
                
                <div className="flex items-center gap-3">
                  <button type="button" className="p-2 rounded-lg bg-dark-900/50 text-slate-400 hover:text-white hover:bg-dark-600 transition-colors border border-dark-600/50">
                    <Search className="w-4 h-4" />
                  </button>
                  <button type="button" className="p-2 rounded-lg bg-dark-900/50 text-slate-400 hover:text-white hover:bg-dark-600 transition-colors border border-dark-600/50">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Transaction List Area (Empty State) */}
             <div className="space-y-3">

{transactions.map((transaction) => (

<div
 key={transaction.id}
 className="p-4 rounded-xl bg-slate-800 flex justify-between items-center"
>

<span>{transaction.description}</span>

<div className="flex items-center">

  <span>
    {transaction.type === "income" ? "+" : "-"}₹
    {transaction.amount}
  </span>

  <button
    onClick={() => deleteTransaction(transaction.id)}
    className="text-red-400 ml-4"
  >
    🗑️
  </button>

</div>

</div>

))}

</div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
