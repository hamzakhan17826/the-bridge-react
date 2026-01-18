import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { usePaypalWebhook, useOrderStatus } from '../../hooks/useMembership';

export default function PaymentReturn() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>(() =>
    searchParams.get('token') || searchParams.get('pubTrackId')
      ? 'loading'
      : 'failed'
  );
  const [message, setMessage] = useState<string>(() => {
    if (searchParams.get('pubTrackId')) {
      return 'Payment is being processed. Please wait...';
    }
    if (searchParams.get('token')) {
      return '';
    }
    return 'Invalid payment return. Please contact support.';
  });

  const paypalWebhookMutation = usePaypalWebhook();
  const orderStatusMutation = useOrderStatus();

  const pollRef = useRef<number | null>(null);
  useEffect(() => {
    const token = searchParams.get('token');
    const pubTrackId = searchParams.get('pubTrackId');

    if (token) {
      paypalWebhookMutation.mutate(token, {
        onSuccess: () => {
          setStatus('success');
          setMessage('Payment completed successfully!');
        },
        onError: () => {
          setStatus('failed');
          setMessage('Payment verification failed. Please contact support.');
        },
      });
      return;
    }

    if (pubTrackId) {
      // Start polling order status until completed/failed/cancelled
      const startPolling = () => {
        if (pollRef.current) return;
        pollRef.current = window.setInterval(() => {
          orderStatusMutation.mutate(pubTrackId, {
            onSuccess: (response) => {
              const statusNum = response.paymentStatus; // 1 pending, 2 completed, 3 failed, 4 cancelled
              if (response.isPaid && statusNum === 2) {
                setStatus('success');
                setMessage('Payment completed successfully!');
                if (pollRef.current) {
                  clearInterval(pollRef.current);
                  pollRef.current = null;
                }
              } else if (statusNum === 3 || statusNum === 4) {
                setStatus('failed');
                setMessage('Payment failed or cancelled.');
                if (pollRef.current) {
                  clearInterval(pollRef.current);
                  pollRef.current = null;
                }
              } else {
                // Pending or not paid yet; keep polling
                setStatus('loading');
                setMessage('Payment is being processed. Please wait...');
              }
            },
            onError: () => {
              setStatus('failed');
              setMessage(
                'Failed to verify payment status. Please contact support.'
              );
              if (pollRef.current) {
                clearInterval(pollRef.current);
                pollRef.current = null;
              }
            },
          });
        }, 3000);
      };
      startPolling();
      return () => {
        if (pollRef.current) {
          clearInterval(pollRef.current);
          pollRef.current = null;
        }
      };
    }

    // Invalid return; initial state already reflects failure
  }, [searchParams, paypalWebhookMutation, orderStatusMutation]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            {(paypalWebhookMutation.isPending ||
              orderStatusMutation.isPending) && (
              <Loader2 className="h-6 w-6 animate-spin" />
            )}
            {status === 'success' && (
              <CheckCircle className="h-6 w-6 text-green-500" />
            )}
            {status === 'failed' && (
              <XCircle className="h-6 w-6 text-red-500" />
            )}
            Payment Status
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">{message}</p>

          {status === 'loading' &&
            (paypalWebhookMutation.isPending ||
              orderStatusMutation.isPending) && (
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}

          <div className="flex gap-2">
            <Button
              onClick={() => navigate('/dashboard/membership')}
              className="flex-1"
            >
              Back to Membership
            </Button>
            {status === 'success' && (
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="flex-1 btn"
              >
                Go to Dashboard
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
