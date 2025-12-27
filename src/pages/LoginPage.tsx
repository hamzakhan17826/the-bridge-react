import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SubmitButton from '../components/ui/SubmitButton';
import { loginUser, type LoginPayload } from '../services/login';

export default function LoginPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const fd = new FormData(formRef.current!);
    const payload: LoginPayload = {
      email: (fd.get('email') as string) || '',
      password: (fd.get('password') as string) || '',
      rememberMe: fd.get('rememberMe') === 'on',
    };
    setSubmitting(true);
    const res = await loginUser(payload);
    setSubmitting(false);
    if (res.success) {
      formRef.current?.reset();
      navigate('/');
    } else {
      toast.error(res.errors?.join(', ') || res.message);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 md:p-8 mt-4">
            <h3 className="text-2xl md:text-3xl font-grotesk-bold mb-6">
              Login to your account
            </h3>
            <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block font-grotesk-light text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block font-grotesk-light text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="rememberCheck"
                  className="rounded border-gray-300"
                  type="checkbox"
                  name="rememberMe"
                />
                <label
                  className="text-sm text-gray-700"
                  htmlFor="rememberCheck"
                >
                  Remember me
                </label>
              </div>

              <SubmitButton
                text={submitting ? 'Logging in…' : 'Login'}
                className="w-full"
              />

              <div className="text-sm text-gray-600 flex gap-4">
                <Link to="/forget-password" className="text-primary">
                  Forgot Password?
                </Link>
                <Link to="/register" className="text-primary">
                  Don't have an account? Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
