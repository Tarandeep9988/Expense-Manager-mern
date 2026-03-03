import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">💰 ExpenseManager</div>
            <div className="flex gap-4">
              <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600 transition">
                Login
              </Link>
              <Link href="/signup" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Manage Your Finances
            <span className="block text-blue-600 mt-2">With Ease</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track your income and expenses, monitor your spending, and take control of your financial future.
          </p>
          
          {/* Demo Credentials */}
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-8">
            <p className="text-sm font-semibold text-gray-700 mb-2">Try Demo Account:</p>
            <p className="text-gray-600">Email: <span className="font-mono text-blue-600">demo@gmail.com</span></p>
            <p className="text-gray-600">Password: <span className="font-mono text-blue-600">Demo@1234</span></p>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/signup" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg">
              Get Started
            </Link>
            <Link href="/login" className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold text-lg">
              Login
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Track Expenses</h3>
            <p className="text-gray-600">Monitor your spending habits and stay on budget</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Manage Income</h3>
            <p className="text-gray-600">Keep track of all your income sources</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
            <p className="text-gray-600">Access your finances anywhere, anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
}