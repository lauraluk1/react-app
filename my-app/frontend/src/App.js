import React from 'react';
import './App.css';
import PostList from './PostList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Blog</h1>
      </header>
      <main>
        <p>This is my blog built with React.</p>
        <PostList />
      </main>
    </div>
  );
}

export default App;
