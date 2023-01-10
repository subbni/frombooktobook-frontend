import { useEffect, useState } from 'react';
import TestService from '../service/TestService';

const TestPage = () => {
  const [msg, setMsg] = useState('');
  useEffect(() => {
    TestService.testRequest().then((response) => {
      setMsg(response.message);
    });
  }, []);
  return <>{msg}</>;
};

export default TestPage;
