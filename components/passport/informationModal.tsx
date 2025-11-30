import { useMemo } from 'react';
import { Modal, Pressable, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/context/ThemeContext';
import { getPassportStyles } from '@/styles/passport';

interface IInformationModal {
  informationModal: boolean;
  closeInformationModal: () => void;
}

const InformationModal = ({
  informationModal,
  closeInformationModal,
}: IInformationModal) => {
  const { t } = useTranslation('passport');
  const { theme } = useTheme();
  const styles = useMemo(() => getPassportStyles(theme), [theme]);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={informationModal}
      onRequestClose={closeInformationModal}
    >
      <Pressable onPress={closeInformationModal} style={styles.modalBackdrop}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={styles.modalContainer}
        >
          <Text style={styles.titleText}>{t('title')}</Text>
          <Text style={styles.text}>{t('informationModalUnlock')}</Text>
          <Text style={styles.text}>{t('informationModalFilter')}</Text>
          <Pressable
            onPress={closeInformationModal}
            style={({ pressed }) => [
              styles.closeButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Text style={styles.closeButtonText}>{t('close')}</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default InformationModal;
