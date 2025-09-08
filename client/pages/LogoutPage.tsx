
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Heart, CheckCircle } from 'lucide-react';

export default function LogoutPage() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(true);

  useEffect(() => {
    // Simulate logout process
    const logoutTimer = setTimeout(() => {
      setIsLoggingOut(false);
      console.log('User logged out successfully');
    }, 1500);

    // Redirect to login after showing success message
    const redirectTimer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => {
      clearTimeout(logoutTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logout Card */}
        <div className="bg-white rounded-2xl shadow-xl p-12 backdrop-blur-sm bg-opacity-90 text-center">
          {isLoggingOut ? (
            <>
              {/* Logo with animation */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6 shadow-lg animate-pulse">
                <LogOut className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mb-3">Logging Out...</h1>
              <p className="text-gray-600 mb-8">Please wait while we securely log you out</p>

              {/* Animated Loading Spinner */}
              <div className="flex justify-center">
                <div className="relative w-16 h-16">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Success Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mb-3">Logged Out Successfully</h1>
              <p className="text-gray-600 mb-6">Thank you for using HealthCare Management System</p>

              {/* Healthcare Icon */}
              <div className="inline-flex items-center gap-2 text-blue-600 mb-4">
                <Heart className="w-5 h-5 fill-blue-600" />
                <span className="text-sm font-medium">Stay healthy!</span>
              </div>

              <p className="text-sm text-gray-500">Redirecting to login page...</p>
            </>
          )}
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-500">
          © 2024 HealthCare Management System. All rights reserved.
        </p>
      </div>
    </div>
  );
}