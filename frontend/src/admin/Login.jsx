import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, ShieldAlert, Loader2, ArrowLeft } from 'lucide-react';
import API_URL from '../utils/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'
  const [otpTarget, setOtpTarget] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed.');
      
      if (data.twoFactorRequired) {
        setOtpTarget(data.email);
        setStep('otp');
      } else {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      }
    } catch (err) { 
      setError(err.message); 
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'OTP Verification failed.');

      localStorage.setItem('adminToken', data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 border-t-4 border-t-emerald-500 transition-all duration-300">
        
        {step === 'credentials' ? (
          <>
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-2">
                <KeyRound size={24} />
              </div>
              <h1 className="text-2xl font-bold text-center">Admin Access</h1>
              <p className="text-xs text-neutral-500 mt-1">Please enter your credentials to log in.</p>
            </div>

            {error && (
              <div className="mb-5 text-sm text-red-500 bg-red-50 p-3.5 rounded-xl dark:bg-red-950/30 font-medium flex items-start gap-2 border dark:border-red-900/30">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="Admin Email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="px-4 py-3 border rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-700 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                required 
                disabled={loading}
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="px-4 py-3 border rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-700 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                required 
                disabled={loading}
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-emerald-500 text-white py-3.5 mt-2 rounded-xl font-bold hover:bg-emerald-600 outline-none transition shadow-lg shadow-emerald-500/10 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center mb-6">
              <button 
                onClick={() => { setStep('credentials'); setError(''); setOtp(''); }}
                className="self-start mb-2 text-xs text-neutral-500 hover:text-neutral-700 flex items-center gap-1 transition"
              >
                <ArrowLeft size={12} /> Back to Login
              </button>
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-2">
                <ShieldAlert size={24} />
              </div>
              <h1 className="text-2xl font-bold text-center">Two-Factor OTP</h1>
              <p className="text-xs text-neutral-500 mt-1.5 text-center">
                A verification code was sent to <strong className="text-neutral-800 dark:text-neutral-200">{otpTarget}</strong>.
              </p>
            </div>

            {error && (
              <div className="mb-5 text-sm text-red-500 bg-red-50 p-3.5 rounded-xl dark:bg-red-950/30 font-medium flex items-start gap-2 border dark:border-red-900/30">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="6-digit OTP Code" 
                value={otp} 
                onChange={e => setOtp(e.target.value)} 
                className="px-4 py-3 border rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-700 focus:ring-2 focus:ring-emerald-500 outline-none text-center text-lg tracking-wider font-bold transition"
                maxLength={6}
                required 
                disabled={loading}
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-emerald-500 text-white py-3.5 mt-2 rounded-xl font-bold hover:bg-emerald-600 outline-none transition shadow-lg shadow-emerald-500/10 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
                  </>
                ) : (
                  'Verify & Log In'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

