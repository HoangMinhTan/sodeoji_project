import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import  '../app.css';
export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError("Eメールあるいはパスワードがあるかもしれない！");
    }
  };

  useEffect(() => {
    document.title = 'ログイン';
  }, []);

  return (
    <div className="mx-auto max-w-screen-md">
     
      <div className="mx-auto w-3/5 content__box">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded ">
        <h1 className="content__title">ログイン</h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleLogin} method="POST">
            <div class="font-bold">
              <label htmlFor="username">ユーザーメール:</label>
            </div>
            <input
              aria-label="メールを入力"
              type="text"
              placeholder="Enter email here"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <div class="font-bold">
              <label htmlFor="username">パスワード</label>
            </div>
            <input
              aria-label="パスワードを入力"
              type="password"
              placeholder="Enter password here"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold 
            ${isInvalid && 'opacity-50'}`}
            >
              ログインする
            </button>
          </form>
          
          <div className="padding-login">
          <p className="text-sm">
           <label>      or      </label>
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              サインアップ
            </Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
