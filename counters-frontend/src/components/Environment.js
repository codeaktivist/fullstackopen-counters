import { getFrontend, getBackend, getIp, getVersion } from '../reducers/infoReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Environment = () => {
  const dispatch = useDispatch();
  const info = useSelector(n => n.env);

  useEffect(() => {
    dispatch(getFrontend());
    dispatch(getBackend());
    dispatch(getIp());
    dispatch(getVersion());
  },[]);

  return (
    <>
      <div>&nbsp;</div>
      <div><span className='frontend'>Frontend Environment:</span> {info.frontend}</div>
      <div><span className='backend'>Backend Environment:</span> {info.backend}</div>
      <div>Backend IP address: {info.ip}</div>
      <div>Release: {info.version}</div>
    </>
  );
};

export default Environment;