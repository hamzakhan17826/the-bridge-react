import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  verifyChangeEmail,
  type VerifyChangeEmailState,
} from '../services/verify-change-email';
import { CheckCircle, XCircle, Sparkles } from 'lucide-react';

export default function VerifyChangeEmailPage() {
  const [params] = useSearchParams();
  const userId = params.get('userId') || '';
  const token = params.get('token') || '';
  const newEmail = params.get('newEmail') || '';
  const [result, setResult] = useState<VerifyChangeEmailState | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const hasVerified = useRef(false);

  useEffect(() => {
    if (!hasVerified.current) {
      hasVerified.current = true;
      const verify = async () => {
        if (!userId || !token || !newEmail) {
          setResult({
            success: false,
            message: 'Invalid verification link. Missing required parameters.',
          });
          setLoading(false);
          return;
        }

        const res = await verifyChangeEmail(userId, token, newEmail);
        setResult(res);
        setLoading(false);
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      };
      verify();
    }
  }, [userId, token, newEmail, navigate]);

  if (loading) {
    return (
      <section className="relative py-16 md:py-24 bg-linear-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-200 rounded-full opacity-25 animate-pulse"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="mx-auto max-w-2xl">
            <div className="bg-white rounded-3xl shadow-2xl border border-primary-100 p-8 md:p-12 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Verifying Email Change
              </h2>
              <p className="text-gray-600">
                Please wait while we update your email address...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 md:py-24 bg-linear-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-200 rounded-full opacity-25 animate-pulse"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mx-auto max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl border border-primary-100 p-8 md:p-12 text-center">
            {/* Header */}
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Email Verification
            </div>

            {result?.success ? (
              <>
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Email Updated Successfully!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your email address has been changed to{' '}
                  <strong>{newEmail}</strong>.
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-linear-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 transform hover:scale-105"
                >
                  Go to Login
                </button>
              </>
            ) : (
              <>
                <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Verification Failed
                </h2>
                <p className="text-gray-600 mb-6">{result?.message}</p>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-all duration-200"
                >
                  Back to Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
