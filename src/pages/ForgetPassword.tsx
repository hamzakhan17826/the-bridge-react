import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import SubmitButton from '../components/ui/SubmitButton';
import { sendResetLink } from '../services/forget-password';
import { Link } from 'react-router-dom';

export default function ForgetPasswordPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const fd = new FormData(formRef.current!);
    const email = (fd.get('email') as string) || '';
    setSubmitting(true);
    const res = await sendResetLink(email);
    setSubmitting(false);
    if (res.success) {
      toast.success(res.message || 'Password reset link sent!');
      formRef.current?.reset();
    } else {
      toast.error(res.errors?.join(', ') || res.message);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 md:p-8 mt-4">
            <h3 className="text-2xl md:text-3xl  mb-4">Forget Password</h3>
            <p className="mb-6 text-gray-700 ">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block  text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary-400"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <SubmitButton
                text={submitting ? 'Sending…' : 'Send Reset Link'}
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
