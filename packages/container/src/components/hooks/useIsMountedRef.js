import { useRef, useEffect } from 'react';
import React from 'react'


// ----------------------------------------------------------------------

export default function useIsMountedRef() {
  const isMounted = useRef(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  return isMounted;
}
