import PropTypes from 'prop-types';

const NodeCounter = ({ counter, id, title, type, description, onIncrement, onReset, onDecrement }) => {
  return (
    <div className={type}>
      <span className='title'>{title}:</span>
      <span className='counter' data-testid={id}>{counter}</span>
      <button onClick={onIncrement}>+</button>
      <button onClick={onReset}>Reset</button>
      <button onClick={onDecrement}>-</button>
      <span className='description'>{description}</span>
    </div>
  );
};

NodeCounter.propTypes = {
  counter: PropTypes.number,
  id: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
  onIncrement: PropTypes.func,
  onReset: PropTypes.func,
  onDecrement: PropTypes.func
};

export default NodeCounter;