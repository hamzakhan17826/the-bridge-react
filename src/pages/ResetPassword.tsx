import { useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SubmitButton from '../components/ui/SubmitButton';
import { resetPassword, type ResetPayload } from '../services/reset-password';

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const email = params.get('email') || '';
  const token = params.get('token') || '';
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  if (!email || !token) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 text-yellow-800 shadow-sm p-6 md:p-8 mt-4">
              Invalid reset link. Missing email or token.
            </div>
          </div>
        </div>
      </section>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const fd = new FormData(formRef.current!);
    const payload: ResetPayload = {
      email,
      token,
      newPassword: (fd.get('newPassword') as string) || '',
      confirmPassword: (fd.get('confirmPassword') as string) || '',
    };
    setSubmitting(true);
    const res = await resetPassword(payload);
    setSubmitting(false);
    if (res.success) {
      toast.success(res.message || 'Password reset successful!');
      formRef.current?.reset();
      setTimeout(() => navigate('/login'), 1500);
    } else {
      toast.error(res.errors?.join(', ') || res.message);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 md:p-8 mt-4">
            <h3 className="text-2xl md:text-3xl  mb-4">Reset Password</h3>
            <p className="mb-6 text-gray-700 ">
              Enter your new password below.
            </p>
            <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block  text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary-400"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div>
                <label className="block  text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary-400"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              <SubmitButton
                text={submitting ? 'Resetting…' : 'Reset Password'}
                className="w-full"
              />
              <div className="text-sm text-gray-600">
                <Link to="/login" className="text-primary-400">
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
