import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '@/components/colors';

type ModifierMultiSelectVarients = 'regions' | 'quizType';

type ModifierMultiSelectProps = {
  varient: ModifierMultiSelectVarients;
  modifier: string[];
};

const ModifierMultiSelect: React.FC<ModifierMultiSelectProps> = ({
  varient,
  modifier,
}) => {
  // TODO - test responsive screen size scaling using dynamic equal height
  // const [maxHeight, setMaxHeight] = React.useState(50);

  return (
    <FlatList
      data={Object.entries(modifier)}
      keyExtractor={([modifierKey]) => modifierKey}
      numColumns={2}
      style={{ flexGrow: 0 }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
      renderItem={({ item }) => {
        const [modifierKey, modifierData] = item;
        return (
          <TouchableOpacity
            // onLayout={(e) => {
            //   const { height } = e.nativeEvent.layout;
            //   setMaxHeight((prev) => Math.max(prev, height));
            // }}
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => console.log('Press')}
            accessibilityLabel="Continue to difficulty selection"
            accessibilityRole="button"
          >
            <Text style={{ textAlign: 'center' }}>{modifierData}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: '48%',
    backgroundColor: colors.offWhite,
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
});

export default ModifierMultiSelect;
