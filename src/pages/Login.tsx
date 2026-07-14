import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate(); // এটি নেভিগেশনের জন্য

  const handleLogin = () => {
    // এখানে ভবিষ্যতে API ভেরিফিকেশন হবে
    // আপাতত সরাসরি ড্যাশবোর্ডে নিয়ে যাবে
    navigate('/dashboard'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm border border-slate-200">
        <h2 className="text-2xl font-bold mb-6 text-center">Foster Portal Login</h2>
        <input className="w-full p-3 mb-4 border rounded-lg" placeholder="Email" />
        <input className="w-full p-3 mb-6 border rounded-lg" type="password" placeholder="Password" />
        
        {/* এখানে onClick ইভেন্ট যোগ করেছি */}
        <button 
          onClick={handleLogin} 
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}