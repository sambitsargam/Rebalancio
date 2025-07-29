import { useState } from 'react';
import LandingPage from './components/LandingPage';
import TestInterface from './components/TestInterface';

function App() {
  const [showDApp, setShowDApp] = useState(false);

  return (
    <div className="App">
      {!showDApp ? (
        <LandingPage onEnterApp={() => setShowDApp(true)} />
      ) : (
        <TestInterface />
      )}
    </div>
  );
}

export default App;