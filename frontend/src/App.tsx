import { useState } from 'react';
import LandingPage from './components/LandingPage';
import DAppInterface from './components/DAppInterfaceNew';

function App() {
  const [showDApp, setShowDApp] = useState(false);

  return (
    <div className="App">
      {!showDApp ? (
        <LandingPage onEnterApp={() => setShowDApp(true)} />
      ) : (
        <DAppInterface />
      )}
    </div>
  );
}

export default App;