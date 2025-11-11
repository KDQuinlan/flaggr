import { useEffect, useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Purchases, {
  PurchasesStoreProduct,
  PRODUCT_CATEGORY,
} from 'react-native-purchases';

import stateStore from '@/state/store';
import persistUserSettings from '@/util/persistState/persistUserSettings';
import { colors } from '../colors';

// TODO - Remove revoke premium when going to PROD

const PurchasePremiumButton = () => {
  const userSettings = stateStore((s) => s.userSettings);
  const { setUserSettings, setEnergyModalVisible } = stateStore.getState();
  const { t } = useTranslation('energy');
  const [product, setProduct] = useState<PurchasesStoreProduct | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await Purchases.getProducts(
        ['premium'],
        PRODUCT_CATEGORY.NON_SUBSCRIPTION
      );
      setProduct(result[0]);
    };

    fetchProducts();
  }, []);

  const handlePurchase = async () => {
    if (!product) return;
    try {
      await Purchases.purchaseStoreProduct(product);
      setUserSettings({ ...userSettings, isPremiumUser: true });
      persistUserSettings({ ...userSettings, isPremiumUser: true });
      setEnergyModalVisible(false);
    } catch (error) {
      console.log('ERROR:', error);
    }
  };

  const handleRevokePurchase = () => {
    setUserSettings({ ...userSettings, isPremiumUser: false });
    persistUserSettings({ ...userSettings, isPremiumUser: false });
  };

  return (
    <Pressable
      onPress={
        !userSettings.isPremiumUser ? handlePurchase : handleRevokePurchase
      }
      style={({ pressed }) => [
        styles.button,
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      accessibilityLabel={t('continue', { ns: 'settings' })}
      accessibilityRole="button"
    >
      <Text style={styles.buttonText}>
        {!userSettings.isPremiumUser ? t('purchase') : t('revoke')}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.legendaryOrange,
    padding: 10,
    width: '100%',
    maxWidth: 240,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: 'DMSansBold',
  },
});

export default PurchasePremiumButton;
