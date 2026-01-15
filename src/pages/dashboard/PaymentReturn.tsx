import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { getOrderStatus, paypalWebhook } from '../../services/membership';

export default function PaymentReturn() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>(
    'loading'
  );
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handlePaymentReturn = async () => {
      const token = searchParams.get('token');
      const pubTrackId = searchParams.get('pubTrackId');

      if (token) {
        // PayPal return with token
        try {
          await paypalWebhook(token);
          setStatus('success');
          setMessage('Payment completed successfully!');
        } catch (error) {
          setStatus('failed');
          setMessage('Payment verification failed. Please contact support.');
        }
      } else if (pubTrackId) {
        // Check order status
        try {
          const response = await getOrderStatus(pubTrackId);
          if (response.isPaid && response.paymentStatus === 'completed') {
            setStatus('success');
            setMessage('Payment completed successfully!');
          } else if (response.isPaid && response.paymentStatus === 'pending') {
            setStatus('loading');
            setMessage('Payment is being processed. Please wait...');
          } else {
            setStatus('failed');
            setMessage('Payment failed or is still processing.');
          }
        } catch (error) {
          setStatus('failed');
          setMessage(
            'Failed to verify payment status. Please contact support.'
          );
        }
      } else {
        setStatus('failed');
        setMessage('Invalid payment return. Please contact support.');
      }
    };

    handlePaymentReturn();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            {status === 'loading' && (
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

          {status === 'loading' && (
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
                className="flex-1"
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
