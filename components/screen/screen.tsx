import { SafeAreaView, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { colors } from '@/components/colors';

interface ScreenProps {
  children: React.ReactNode;
  scrollView?: boolean;
  statusBarPadding?: boolean;
}

const Screen: React.FC<ScreenProps> = ({
  children,
  scrollView = false,
  statusBarPadding,
}) => {
  return (
    <SafeAreaView
      style={{
        ...styles.rootContainer,
        paddingTop: statusBarPadding ? StatusBar.currentHeight || 0 : 0,
      }}
    >
      {scrollView ? (
        <ScrollView style={styles.scrollContainer}>{children}</ScrollView>
      ) : (
        children
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
});

export default Screen;
