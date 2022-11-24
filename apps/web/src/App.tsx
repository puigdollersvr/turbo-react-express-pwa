import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Authorization from './components/Authorization';
import FullScreenDialog from './components/FullScreenDialog';
import Layout from './components/Layout';
import TodoList from './components/TodoList';
import AddButton from './components/AddButton';

function App() {
  return (
    <div className="App">
      <Layout>
        <Authorization>
            <TodoList />
        </Authorization>
      </Layout>
    </div>
  );
}

export default App;
