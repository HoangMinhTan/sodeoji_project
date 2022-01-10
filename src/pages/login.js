import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import useAuthListener from '../hooks/use-auth-listener';
import { database } from '../lib/firebase';
import { snapshotToArray } from '../services/firebase';

export default function Login() {
  const history = useHistory();
  const user = useAuthListener();
  const { firebase } = useContext(FirebaseContext);
  

  const [username, serUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || username === '';

  const [current_user, setCurrentUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(username + '@gmail.com', password);
      //console.log(user.user);
      var postList;
      await database.ref(`Users`).once('value', snapshot => {
        if (snapshot.exists()) {
          postList = snapshotToArray(snapshot);
        }
      });
      for (var i = 0; i < postList.length; i += 1){
        if (postList[i].username == username){
          setCurrentUser(postList[i]);
        }
      }
      //console.log(current_user.status);
    } catch (error) {
      //serUsername('');
      //setPassword('');
      setCurrentUser(null);
      setError("このアカウントがない！");
    }
  };

  useEffect(() => {
    if (user.user!=null){
      if (current_user != null){
        if (current_user.status == 1){
          history.push('/');
        }
        else{
          setError('アカウントはロックされています!');
        }
      }
    }
    document.title = 'ログイン';
  },[user]);

  return (
    <div className="mx-auto max-w-screen-md">
     
      <div className="mx-auto w-3/5">

      <div className="mb-4 mt-4">
        <img src="/images/login-back.png"　alt=""/>
      </div>

        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">


          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="ユーザー名を入力"
              type="text"
              placeholder="ユーザー名"
              className="text-sm text-gray-base w-full mr-3 px-4 h-16 border border-gray-primary rounded mb-2"
              onChange={({ target }) => serUsername(target.value)}
              value={username}
            />
            <input
              aria-label="パスワードを入力"
              type="password"
              placeholder="パスワード"
              className="text-sm text-gray-base w-full mr-3 px-4 h-16 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-16 font-bold 
            ${isInvalid && 'opacity-50'}`}
            >
              ログイン
            </button>
          </form>
          
          <div className="padding-login">
          <p className="text-sm">
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