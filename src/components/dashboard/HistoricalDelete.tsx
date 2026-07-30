import React, { useState } from "react";

export const HistoricalDelete = () => {
  // --- STATE MANAGEMENT ---
  const [selectedTable, setSelectedTable] = useState("All Tables");
  const [selectedUser, setSelectedUser] = useState("All Users");
  
  // Default: Last 7 Days Date Range
  const today = new Date();
  const pastSevenDays = new Date();
  pastSevenDays.setDate(today.getDate() - 7);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const [fromDate, setFromDate] = useState(formatDate(pastSevenDays));
  const [toDate, setToDate] = useState(formatDate(today));
  
  const [activeJson, setActiveJson] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock Master Data & Options
  const tableOptions = ["All Tables", "APS_Referral", "APS_CaseStudy", "APS_Client", "APS_Transaction"];
  const userOptions = ["All Users", "Masum Billah", "Anik Aich", "Tanvir Ahmed", "Rahim Uddin"];

  // Mock Historical Delete Records List
  const [records, setRecords] = useState([
    {
      id: 1,
      tableName: "APS_Referral",
      recordId: 104,
      deletedBy: "Masum Billah",
      deletedOn: "2026-07-29 02:30 PM",
      jsonData: {
        id: 104,
        clientName: "Jane Smith",
        status: "Rejected",
        referralFee: 100.00,
        deletionReason: "Duplicate entry submitted by partner.",
        archivedAt: "2026-07-29T14:30:00Z"
      }
    },
    {
      id: 2,
      tableName: "APS_CaseStudy",
      recordId: 189,
      deletedBy: "Anik Aich",
      deletedOn: "2026-07-27 11:10 AM",
      jsonData: {
        id: 189,
        title: "Legacy Q1 Strategy",
        category: "Archived Operations",
        published: false,
        deletionReason: "Superseded by updated Q3 framework guidelines."
      }
    }
  ]);

  // Handle Search Action (Trigger API Reload simulation)
  const handleSearch = () => {
    console.log("Fetching Historical Delete data with filters:", { selectedTable, selectedUser, fromDate, toDate });
    setCurrentPage(1);
    // Real implementation: fetch(`api/historical-deletes?table=${selectedTable}&user=${selectedUser}&from=${fromDate}&to=${toDate}`)
  };

  // Handle Reset Action (Reset to default last 7 days & clear dropdowns)
  const handleReset = () => {
    setSelectedTable("All Tables");
    setSelectedUser("All Users");
    setFromDate(formatDate(pastSevenDays));
    setToDate(formatDate(today));
    setCurrentPage(1);
  };

  // Pagination Logic
  const totalPages = Math.ceil(records.length / itemsPerPage);
  const paginatedData = records.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-50/70 p-6 md:p-10 font-sans text-slate-800 antialiased">
      
      {/* 1. Header Section */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Historical Deletes
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Admin Panel &gt; Audit Logs &gt; View all system historical delete audit logs and inspect deleted record snapshots.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            Delete Audit Stream
          </span>
        </div>
      </div>

      {/* 3. Filter Section */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 mb-6">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <h2 className="text-xs font-bold tracking-wider uppercase text-slate-400">
            Advanced Filters &amp; Date Range
          </h2>
          <span className="text-xs text-slate-400 font-medium">Default: Last 7 Days Applied</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Table Name */}
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
              Table Name
            </label>
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600 transition-all cursor-pointer"
            >
              {tableOptions.map((tbl, idx) => (
                <option key={idx} value={tbl}>{tbl}</option>
              ))}
            </select>
          </div>

          {/* Deleted By */}
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
              Deleted By
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600 transition-all cursor-pointer"
            >
              {userOptions.map((usr, idx) => (
                <option key={idx} value={usr}>{usr}</option>
              ))}
            </select>
          </div>

          {/* Deleted From Date Picker */}
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
              Deleted From
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600 transition-all cursor-pointer"
            />
          </div>

          {/* Deleted To Date Picker */}
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
              Deleted To
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600 transition-all cursor-pointer"
            />
          </div>

          {/* Action Buttons (Search & Reset) */}
          <div className="flex items-end gap-2">
            <button
              onClick={handleSearch}
              className="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-medium text-sm px-4 py-2.5 rounded-xl w-full transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              Search
            </button>
            <button
              onClick={handleReset}
              className="border border-slate-300 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-medium text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>

        </div>
      </div>

      {/* 4. Historical Deletes Table Section */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800 text-base">
            Deletion Audit Records
          </h2>
          <span className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
            Total {records.length} Records Found
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-3.5">#</th>
                <th className="px-6 py-3.5">Table Name</th>
                <th className="px-6 py-3.5">Record ID</th>
                <th className="px-6 py-3.5">JSON Payload</th>
                <th className="px-6 py-3.5">Deleted By</th>
                <th className="px-6 py-3.5">Deleted On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {paginatedData.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-400">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
                      {item.tableName}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs font-medium text-slate-600">
                    #{item.recordId}
                  </td>
                  <td className="px-6 py-4">
                    {/* 5. JSON Column with [ View ] Button */}
                    <button
                      onClick={() => setActiveJson(item.jsonData)}
                      className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 active:bg-black text-white px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all shadow-xs cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                      [ View ]
                    </button>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {item.deletedBy}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                    {item.deletedOn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 9. Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-slate-100 gap-4">
          <span className="text-xs text-slate-500 font-medium">
            Showing <span className="text-slate-700 font-bold">{records.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="text-slate-700 font-bold">{Math.min(currentPage * itemsPerPage, records.length)}</span> of <span className="text-slate-700 font-bold">{records.length}</span> records
          </span>

          <div className="inline-flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border border-slate-300 text-slate-600 hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>
            <span className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold shadow-xs">
              {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="border border-slate-300 text-slate-600 hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* 6. Pretty-Formatted JSON Popup / Modal */}
      {activeJson && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <h3 className="font-bold text-slate-800 text-sm tracking-wide">
                  Deleted Record JSON Inspector (appsettings style)
                </h3>
              </div>
              <button
                onClick={() => setActiveJson(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-200/50 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Pretty Formatted Indented Code Block */}
            <div className="p-6 bg-slate-900 text-rose-400 font-mono text-xs overflow-y-auto flex-1 leading-relaxed shadow-inner">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(activeJson, null, 2)}
              </pre>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Format: Indented &amp; Beautified JSON</span>
              <button
                onClick={() => setActiveJson(null)}
                className="bg-slate-800 hover:bg-slate-900 active:bg-black text-white px-5 py-2 rounded-xl text-xs font-medium transition-colors shadow-xs cursor-pointer"
              >
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default HistoricalDelete;