import { useState } from 'react';

export function useChangeStateObject(constructor, { Klass, object } = {}) {
  if (typeof Klass === 'undefined' && typeof object === 'undefined') {
    throw new ReferenceError('"Klass" or "object" params should be defined');
  }
  if (Klass && typeof Klass !== 'function') {
    throw new TypeError('"Klass" param should be a class constructor');
  }
  if (object && typeof object !== 'object') {
    throw new TypeError('"object" param sould be of type "object"');
  }

  const [stateObject, setStateObject] = useState(constructor);

  function changeStates(newState) {
    if (Klass) {
      setStateObject((prevState) => new Klass({ ...prevState, ...newState }));
    }
    if (object) {
      setStateObject((prevState) => ({ ...prevState, ...newState }));
    }
  }

  function resetStates() {
    setStateObject(constructor);
  }

  return [stateObject, setStateObject, changeStates, resetStates];
}
