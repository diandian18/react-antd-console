import { useState } from 'react';

export default function usePrevious<T>(currentState: T) {
  const [previousState, setPreviousState] = useState<T>(currentState);
  if (currentState !== previousState) {
    setPreviousState(currentState);
  }
  return previousState;
}

