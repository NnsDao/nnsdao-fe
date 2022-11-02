import { useState } from 'react';
import './App.css';
import AppRouter from './router';

function App() {
  const [count, setCount] = useState(0);
  console.log(`import.meta.env`, import.meta.env);

  return (
    <div className="App">
      <h1>
        {import.meta.env.__APP__name} - {import.meta.env.__APP__canister_type} - {import.meta.env.__APP__canister_id}
      </h1>
      <AppRouter></AppRouter>
    </div>
  );
}

export default App;
