import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyEmail, type VerifyEmailState } from '../services/verify-email';

export default function VerifyEmailPage() {
  const [params] = useSearchParams();
  const userId = params.get('userId') || '';
  const token = params.get('token') || '';
  const [result, setResult] = useState<VerifyEmailState | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      if (!userId || !token) {
        setResult({
          success: false,
          message: 'Invalid verification link. Missing required parameters.',
        });
        setLoading(false);
        return;
      }
      const res = await verifyEmail(userId, token);
      setResult(res);
      setLoading(false);
      if (res.success) {
        toast.success(res.message);
        setTimeout(() => navigate('/login'), 3000);
      } else {
        toast.error(res.message);
      }
    };
    verify();
  }, [userId, token, navigate]);

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 md:p-8 mt-4 text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-4">Verifying your email...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 md:p-8 mt-4 text-center">
            {result?.success ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 15 15"
                  className="mx-auto"
                >
                  <path
                    fill="none"
                    stroke="#008316"
                    d="M4 7.5L7 10l4-5m-3.5 9.5a7 7 0 1 1 0-14a7 7 0 0 1 0 14Z"
                  />
                </svg>
                <h4 className="text-2xl  mt-4">{result.message}</h4>
                <p className="mt-2">Redirecting to login in 3 seconds...</p>
                <button
                  onClick={() => navigate('/login')}
                  className="mt-4 bg-primary text-white px-4 py-2 rounded-lg"
                >
                  Go to Login
                </button>
              </>
            ) : (
              <>
                <h4 className="text-xl  text-red-600">Verification Failed</h4>
                <p className="mt-2">{result?.message}</p>
                <button
                  onClick={() => navigate('/register')}
                  className="mt-4 bg-primary text-white px-4 py-2 rounded-lg"
                >
                  Back to Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
