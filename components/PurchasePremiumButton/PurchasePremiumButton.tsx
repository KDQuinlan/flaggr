import { useEffect, useMemo, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import Purchases, {
  PurchasesStoreProduct,
  PRODUCT_CATEGORY,
} from 'react-native-purchases';

import stateStore from '@/state/store';
import persistUserSettings from '@/util/persistState/persistUserSettings';
import { getPurchasePremiumButtonStyles } from './purchasePremiumButton.styles';
import { useTheme } from '@/context/ThemeContext';

const PurchasePremiumButton = () => {
  const userSettings = stateStore((s) => s.userSettings);
  const { setEnergyModalVisible } = stateStore.getState();
  const { t } = useTranslation('energy');
  const { theme } = useTheme();
  const styles = useMemo(() => getPurchasePremiumButtonStyles(theme), [theme]);
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
      persistUserSettings({ ...userSettings, isPremiumUser: true });
      setEnergyModalVisible(false);
    } catch (error) {
      console.log('ERROR:', error);
    }
  };

  return (
    <Pressable
      onPress={handlePurchase}
      style={({ pressed }) => [
        styles.button,
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      accessibilityLabel={t('continue', { ns: 'settings' })}
      accessibilityRole="button"
    >
      <Text style={styles.buttonText}>{t('purchase')}</Text>
    </Pressable>
  );
};

export default PurchasePremiumButton;
