import { getFrontend, getBackend, getIp, getVersion, getTimestamp } from '../reducers/infoReducer';
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
    dispatch(getTimestamp());
  },[dispatch]);

  return (
    <>
      <div>&nbsp;</div>
      <div><span className='frontend'>Frontend Environment:</span> {info.frontend}</div>
      <div><span className='backend'>Backend Environment:</span> {info.backend}</div>
      <div>Backend IP address: {info.ip}</div>
      <div>Release: {info.version}</div>
      <div>Started: {info.timestamp}</div>
    </>
  );
};

export default Environment;