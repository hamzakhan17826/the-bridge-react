import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import { HelmetProvider } from 'react-helmet-async';

function ErrorFallback({ error }: { error: Error }) {
  return <div>Something went wrong: {error.message}</div>;
}

function App() {
  return (
    <HelmetProvider>
      <QueryErrorResetBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </QueryErrorResetBoundary>
    </HelmetProvider>
  );
}

export default App;
