import { useRef, useState } from 'react';

// this custom hook is a combination of the useRef and useState hooks
// it can trigger a rerender and also persist during the unmount of the component

// Normally if you want to handle huge data and only trigger the ui once on mount then you can just use the useRef and it pessist on cleanup
// If you need to change the ui on every change with small data then just use the useState is for you
// if you want to do both then you can use this custom hook
export default function useListenerState(initialValue) {
  const [_data, _setData] = useState(initialValue)
  const data = useRef(_data)
  const setData = (value) => {
    data.current = value;
    _setData(value) 
  }
  
  return [data, setData];
}