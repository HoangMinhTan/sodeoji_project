import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Timeline from '../components/timeline';
import useUser from '../hooks/use-user';
import LoggedInUserContext from '../context/logged-in-user';
import Sidebar from '../components/sidebar'
import { useParams } from "react-router-dom";

export default function Dashboard({ user: loggedInUser }) {
  const { user, setActiveUser } = useUser(loggedInUser.uid);
  var { type, param2 } = useParams();
  console.log(type, param2);

  useEffect(() => {
    document.title = 'ホーム';
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-3">
          <Sidebar />
          <div className="justify-between mx-auto max-w-screen-lg">
            <Timeline type={type} param2={param2}/>
          </div>
        </div>
      </div>
    </LoggedInUserContext.Provider >
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};