// hooks/useScreenSetup.ts
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import stateStore, { type ScreenInformation } from '@/state/store';

const useScreenInformation = (screenInformation: ScreenInformation) => {
  const setScreenInformation = stateStore(
    (state) => state.setScreenInformation
  );

  useFocusEffect(
    useCallback(() => {
      setScreenInformation(screenInformation);
    }, [])
  );
};

export default useScreenInformation;
