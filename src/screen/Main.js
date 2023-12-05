import SideNav from '../component/common/side-nav/SideNav';
import { MainContainer } from '../component/common/MainComponent';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/token';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { refresh } from '../axios/Login';
import Sales from './Sales';


const Main = () => {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    if (
      sessionStorage.getItem(ACCESS_TOKEN) == null &&
      localStorage.getItem(REFRESH_TOKEN) != null
    ) {
      refresh();
    } else if (
      sessionStorage.getItem(ACCESS_TOKEN) == null &&
      localStorage.getItem(REFRESH_TOKEN) == null
    ) {
      navigate('/login');
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <MainContainer>
             <Sales />
        </MainContainer>
      )}
    </>
  );
};

export default Main;