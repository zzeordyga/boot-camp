import React from 'react';

function App() {
  const handleClick = () => {
    alert('Clicked');
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default App;