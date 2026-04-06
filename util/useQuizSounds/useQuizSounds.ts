import { useAudioPlayer } from 'expo-audio';

const useQuizSounds = () => {
  const correctSound = useAudioPlayer(
    require('../../assets/audio/correct.mp3')
  );
  const incorrectSound = useAudioPlayer(
    require('../../assets/audio/incorrect.mp3')
  );

  const playCorrect = async () => {
    await correctSound.seekTo(0);
    correctSound.play();
  };

  const playIncorrect = async () => {
    await incorrectSound.seekTo(0);
    incorrectSound.play();
  };

  return { playCorrect, playIncorrect };
};

export default useQuizSounds;
