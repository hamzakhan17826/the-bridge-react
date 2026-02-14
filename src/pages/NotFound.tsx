import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui';

const NotFound = () => {
  const error = useRouteError();
  let title = '404 - Page Not Found';
  let message = "The page you are looking for doesn't exist or has been moved.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      title = 'Unauthorized';
      message = "You don't have permission to access this page.";
    } else if (error.status === 503) {
      title = 'Service Unavailable';
      message = 'Looks like our API is down.';
    } else if (error.status === 418) {
      title = "I'm a teapot";
      message = '���';
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="p-4 bg-primary-100 rounded-full">
            <AlertCircle className="w-12 h-12 text-primary-600" />
          </div>
        </div>

        <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-4">
          {title}
        </h1>

        <p className="text-gray-600 font-lato text-lg mb-10">{message}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400">
            If you believe this is a technical error, please contact our support
            team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
