import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import stateStore, { type ScreenInformation } from '@/state/store';

const useScreenInformation = (screenInformation: ScreenInformation) => {
  const setScreenInformation = stateStore(
    (state) => state.setScreenInformation
  );

  useEffect(() => {
    setScreenInformation(screenInformation);
  }, [screenInformation, setScreenInformation]);

  useFocusEffect(
    useCallback(() => {
      setScreenInformation(screenInformation);
    }, [screenInformation, setScreenInformation])
  );
};

export default useScreenInformation;
