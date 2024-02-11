import { useState } from 'react';

export function useChangeStateObject(constructor, { Klass, object } = {}) {
  const [stateObject, setStateObject] = useState(constructor);

  function changeStates(newState) {
    if (Klass) {
      console.log(Klass);
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
