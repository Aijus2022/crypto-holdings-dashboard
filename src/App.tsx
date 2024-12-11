import React from 'react'; // Import React
import Dashboard from './pages/Dashboard'; // Import the Dashboard component

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col">
      {/* Header */}
      <header className="w-full bg-indigo-600 py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-white">Portfolio Tracker</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Dashboard />
      </main>

      {/* Footer */}
      <footer className="w-full bg-neutral-800 py-4 text-center text-neutral-400">
        <p>
          Built with <span className="text-indigo-500">Vite</span> and{' '}
          <span className="text-indigo-500">React</span>.
        </p>
      </footer>
    </div>
  );
};

export default App;


