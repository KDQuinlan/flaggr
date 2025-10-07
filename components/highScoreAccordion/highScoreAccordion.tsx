import { useState } from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';

type HighScoreAccordianProps = {
  score: number;
  regions: string[];
  independentCountriesOnly: boolean;
  timeLimit: number;
  gameLength: number;
  correct: number;
  incorrect: number;
  streak: number;
};

// TODO - Add to custom screen again to utilise reset button

const HighScoreAccordion = ({
  score,
  regions,
  independentCountriesOnly,
  timeLimit,
  gameLength,
  correct,
  incorrect,
  streak,
}: HighScoreAccordianProps) => {
  return (
    <List.Accordion
      title={`High Score: ${score}`}
      left={(props) => <List.Icon {...props} icon="folder" />}
    >
      <List.Item title={`Regions: ${regions}`} />
      <List.Item
        title={`Independent Countries Only: ${independentCountriesOnly ? 'Enabled' : 'Disabled'}`}
      />
      <List.Item title={`Time Limit: ${timeLimit}`} />
      <List.Item title={`Game Length: ${gameLength}`} />
      {/* <TouchableOpacity onPress={() => console.log('Clicked')}>
        <Text>Tap me!</Text>
      </TouchableOpacity> */}
      <List.Accordion
        title={`Stats`}
        left={(props) => <List.Icon {...props} icon="folder" />}
      >
        <List.Item title={`Correct: ${correct}`} />
        <List.Item title={`Incorrect: ${incorrect}`} />
        <List.Item title={`Best Streak: ${streak}`} />
      </List.Accordion>
    </List.Accordion>
  );
};

export default HighScoreAccordion;
