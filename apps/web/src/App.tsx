import React from 'react';
import './App.css';
import Layout from './components/Layout';
import LoginForm from './components/LoginForm';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <Layout>
        <LoginForm />
        <TodoList />
      </Layout>
    </div>
  );
}

export default App;
