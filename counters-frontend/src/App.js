import Counter from './components/Counter';
import Environment from './components/Environment';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { nodeInit, nodeIncrement, nodeDecrement, nodeReset } from './reducers/nodeReducer';
import { cookieInit, cookieIncrement, cookieDecrement, cookieReset } from './reducers/cookieReducer';
import { redisInit, redisIncrement, redisDecrement, redisReset } from './reducers/redisReducer';
import { mongoInit, mongoIncrement, mongoDecrement, mongoReset } from './reducers/mongoReducer';

import { setCounter } from './reducers/reactReducer';

const App = () => {
  const dispatch = useDispatch();
  const reactCounter = useSelector(n => n.reactCounter);
  const cookieCounter = useSelector(n => n.cookieCounter);
  const nodeCounter = useSelector(n => n.nodeCounter);
  const redisCounter = useSelector(n => n.redisCounter);
  const mongoCounter = useSelector(n => n.mongoCounter);

  useEffect(() => {
    dispatch(nodeInit());
    dispatch(cookieInit());
    dispatch(redisInit());
    dispatch(mongoInit());
  }, [dispatch]);

  return (
    <>
      <h1>Counters</h1>
      <h2>Different counters in different places</h2>
      <Counter
        counter={reactCounter}
        id='reactCounter'
        title='React'
        type='frontend'
        description='stored in a javascript variable in your browser'
        onIncrement={() => dispatch(setCounter(reactCounter + 1))}
        onReset={() => dispatch(setCounter(0))}
        onDecrement={() => dispatch(setCounter(reactCounter - 1))}
      />
      <Counter
        counter={cookieCounter}
        id='cookieCounter'
        title='Cookie'
        type='frontend'
        description='stored as cookie value in your local storage'
        onIncrement={() => dispatch(cookieIncrement())}
        onReset={() => dispatch(cookieReset())}
        onDecrement={() => dispatch(cookieDecrement())}
      />
      <Counter
        counter={nodeCounter}
        id='nodeCounter'
        title='Node'
        type='backend'
        description='stored in a javascript variable on the server'
        onIncrement={() => dispatch(nodeIncrement())}
        onReset={() => dispatch(nodeReset())}
        onDecrement={() => dispatch(nodeDecrement())}
      />
      <Counter
        counter={redisCounter}
        id='redisCounter'
        title='Redis'
        type='backend'
        description='stored in a Redis cache database'
        onIncrement={() => dispatch(redisIncrement())}
        onReset={() => dispatch(redisReset())}
        onDecrement={() => dispatch(redisDecrement())}
      />
      <Counter
        counter={mongoCounter}
        id='mongoCounter'
        title='Mongo'
        type='backend'
        description='stored in a MongoDB NoSQL database'
        onIncrement={() => dispatch(mongoIncrement())}
        onReset={() => dispatch(mongoReset())}
        onDecrement={() => dispatch(mongoDecrement())}
      />

      <Environment />
    </>
  );
};

export default App;