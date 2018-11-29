import ReactDOM from 'react-dom';

import LoginForm from './login-form';
// import Dashboard from './dashboard';

const App = () => {
  return (
    <LoginForm />
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
