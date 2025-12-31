import { View, Text } from 'react-native';
import { colors } from '../colors';
import { AnswerResult } from '@/types/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { getSummaryHistoryStyles } from './summaryHistory.styles';

interface ISummaryHistoryProps {
  rows: AnswerResult[][];
  correct: number;
  incorrect: number;
}

const SummaryHistory = ({ rows, correct, incorrect }: ISummaryHistoryProps) => {
  const { t } = useTranslation('summary');
  const { theme } = useTheme();
  const styles = getSummaryHistoryStyles(theme);

  return (
    <View style={styles.historyContainer}>
      <Text style={styles.valueText}>{t('history')}</Text>
      {rows.map((rowItems, rowIndex) => (
        <View
          key={`row-${rowIndex}`}
          accessibilityLabel={t('historyDescription', { correct, incorrect })}
          style={styles.historyItemsContainer}
        >
          {rowItems.map((answer, index) => (
            <View
              key={`item-${rowIndex}-${index}`}
              accessible={false}
              style={{
                ...styles.historyItems,
                backgroundColor:
                  answer === 'Correct'
                    ? colors.correctGreen
                    : colors.incorrectRed,
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default SummaryHistory;
