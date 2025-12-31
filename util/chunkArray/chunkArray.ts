import { AnswerResult } from '@/types/navigation';

const chunkArray = (array: AnswerResult[], size: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export default chunkArray;
