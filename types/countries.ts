import { z } from 'zod';
import countriesData from '@/assets/data/countries.json';
import { Difficulties } from './secureStore';

const DifficultiesSchema: z.ZodType<Difficulties> = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);

const CountriesSchema = z.array(
  z.object({
    countryCode: z.string(),
    countryName: z.string(),
    continent: z.string(),
    difficulty: DifficultiesSchema,
  })
);

const countries = CountriesSchema.parse(countriesData);

export default countries;
