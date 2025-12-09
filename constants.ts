import { Cat } from './types';

export const CAT_BREEDS = ['Siamese', 'Persian', 'Maine Coon', 'Bengal', 'Sphynx', 'British Shorthair', 'Ragdoll', 'Scottish Fold'];

// Generating a rich dataset of cats
export const MOCK_CATS: Cat[] = [
  {
    id: 'c1',
    name: 'Luna',
    breed: 'Siamese',
    age: 12,
    price: 350,
    gender: 'Female',
    description: 'Luna is a vocal and affectionate Siamese who loves to be the center of attention. She enjoys puzzle toys and warm laps.',
    image: 'https://picsum.photos/id/40/800/800',
    tags: ['Vocal', 'Intelligent', 'Playful'],
    personality: 'Outgoing'
  },
  {
    id: 'c2',
    name: 'Simba',
    breed: 'Maine Coon',
    age: 24,
    price: 500,
    gender: 'Male',
    description: 'A gentle giant, Simba loves outdoor adventures (on a leash!) and grooming sessions. Great with kids.',
    image: 'https://picsum.photos/id/219/800/800',
    tags: ['Large', 'Gentle', 'Family-friendly'],
    personality: 'Calm'
  },
  {
    id: 'c3',
    name: 'Mochi',
    breed: 'Scottish Fold',
    age: 6,
    price: 600,
    gender: 'Female',
    description: 'Tiny folded ears and big round eyes. Mochi is a quiet observer who loves sunny spots.',
    image: 'https://picsum.photos/id/237/800/800', // Classic puppy? No, picsum id 237 is a dog. Let's use random seeds for variety to ensure cats (conceptually)
    tags: ['Quiet', 'Indoor', 'Cute'],
    personality: 'Shy'
  },
  {
    id: 'c4',
    name: 'Oreo',
    breed: 'British Shorthair',
    age: 36,
    price: 400,
    gender: 'Male',
    description: 'Oreo is independent but loving on his own terms. He has a dense, plush coat that requires minimal grooming.',
    image: 'https://picsum.photos/seed/oreo/800/800',
    tags: ['Independent', 'Low-maintenance'],
    personality: 'Independent'
  },
  {
    id: 'c5',
    name: 'Bella',
    breed: 'Ragdoll',
    age: 18,
    price: 550,
    gender: 'Female',
    description: 'True to her breed, Bella goes limp when picked up. She is essentially a living plush toy.',
    image: 'https://picsum.photos/seed/bella/800/800',
    tags: ['Fluffy', 'Cuddly', 'Relaxed'],
    personality: 'Affectionate'
  },
  {
    id: 'c6',
    name: 'Leo',
    breed: 'Bengal',
    age: 10,
    price: 800,
    gender: 'Male',
    description: 'Leo is high energy! He needs lots of vertical space and interactive play. Beautiful rosette markings.',
    image: 'https://picsum.photos/seed/leo/800/800',
    tags: ['Energetic', 'Exotic', 'Active'],
    personality: 'Energetic'
  },
  {
    id: 'c7',
    name: 'Cleo',
    breed: 'Sphynx',
    age: 15,
    price: 900,
    gender: 'Female',
    description: 'Hairless and heat-seeking. Cleo will sleep under your covers. Requires weekly baths.',
    image: 'https://picsum.photos/seed/cleo/800/800',
    tags: ['Hairless', 'Clingy', 'Warm'],
    personality: 'Clingy'
  },
  {
    id: 'c8',
    name: 'Shadow',
    breed: 'Persian',
    age: 48,
    price: 450,
    gender: 'Male',
    description: 'Shadow is a dignified gentleman. He prefers a quiet home without too much chaos.',
    image: 'https://picsum.photos/seed/shadow/800/800',
    tags: ['Fluffy', 'Quiet', 'Senior'],
    personality: 'Calm'
  },
];
