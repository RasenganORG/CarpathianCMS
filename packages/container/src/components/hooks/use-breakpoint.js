import useWindowDimensions from './use-window-dimensions';
import { useEffect, useState } from 'react';

export default function useBreakpoint() {
  const { height, width } = useWindowDimensions();
  if (width < 480) {
    return('xs')
  }
  if (480 < width && width <= 576) {
    return('sm')
  }
  if (576 < width && width <= 768) {
    return('md');
  }
  if (768 < width && width <= 992) {
    return('lg')
  }
  if (992 < width && width <= 1200) {
    return('xl')
  }
  if (1200 < width && width < 1600) {
    return('xxl')
  }

}

