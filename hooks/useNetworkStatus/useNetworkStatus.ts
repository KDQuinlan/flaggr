import stateStore from '@/state/store';
import * as Network from 'expo-network';
import { useEffect } from 'react';

const useNetworkStatus = () => {
  const { setIsInternetAvailable } = stateStore.getState();

  useEffect(() => {
    const init = async () => {
      const state = await Network.getNetworkStateAsync();
      setIsInternetAvailable(
        !!state.isConnected && !!state.isInternetReachable
      );
    };
    init();

    const subscription = Network.addNetworkStateListener((state) => {
      setIsInternetAvailable(
        !!state.isConnected && !!state.isInternetReachable
      );
    });

    return () => subscription.remove();
  }, []);
};

export default useNetworkStatus;
