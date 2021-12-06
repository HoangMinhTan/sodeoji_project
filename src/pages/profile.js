import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';
import "firebase/auth";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();
  

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);
      if (user?.user_id) {
        setUser(user);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
      //console.log(user);
    }

    checkUserExists();
  }, [username, history]);

  return user?.username ? (
    <>
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg" style={{paddingTop: 10 + 'px', paddingBottom: 10 + 'px'}}>
        <UserProfile user={user} />
      </div>
    </div>
    <div style={{
      width: 900 + 'px',
      marginTop: 50 + 'px',
      marginLeft: 300 + 'px',
      padding: 50 + 'px',
      fontSize: 1.2 + 'em',
      boxSizing: 'border-box',
      backgroundColor: 'rgba(0 ,0 ,0 , 0.1)',
    }}>
      <h3 style={{fontSize: 2 + 'em', fontWeight: 'bold'}}>個人情報</h3>
      <h3 style={{
        marginTop: 40 + 'px',
        marginBottom: 20 + 'px',
      }}>名前 <span style={{
        marginLeft: 300 + 'px',
        fontWeight: 'bold',
      }}>{user.username}</span></h3>
      <hr style={{width: 800 + 'px'}} />

      <h3 style={{
        marginTop: 20 + 'px',
        marginBottom: 20 + 'px',
      }}>グループ <span style={{
        marginLeft: 260 + 'px',
        fontWeight: 'bold',
      }}>{user.group}</span></h3>
    </div>
  </>
  ) : null;
}