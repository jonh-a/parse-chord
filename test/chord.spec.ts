import { Chord } from '../src/chord';

test('test chord inversions', () => {
  expect(new Chord({
    notes: ['C', 'E', 'G', 'B'],
    name: 'Cmaj7',
    bassNote: null,
    inversion: null,
    quality: 'maj7',
    rootNote: 'C',
  }).invert(1))
  .toEqual(new Chord({
    notes: ['E', 'G', 'B', 'C'],
    name: 'Cmaj7',
    bassNote: null,
    inversion: 1,
    quality: 'maj7',
    rootNote: 'C',
  }));

  expect(new Chord({
    notes: ['C', 'E', 'G', 'B'],
    name: 'Cmaj7',
    bassNote: null,
    inversion: null,
    quality: 'maj7',
    rootNote: 'C',
  }).invert(1).invert(1))
  .toEqual(new Chord({
    notes: ['E', 'G', 'B', 'C'],
    name: 'Cmaj7',
    bassNote: null,
    inversion: 1,
    quality: 'maj7',
    rootNote: 'C',
  }));
});

test('test chord transpositions', () => {
  expect(new Chord({
    notes: ['C', 'E', 'G', 'B'],
    name: 'Cmaj7',
    bassNote: null,
    inversion: null,
    quality: 'maj7',
    rootNote: 'C',
  }).transpose(2))
  .toEqual(new Chord({
    notes: ['D', 'F#', 'A', 'C#'],
    name: 'Dmaj7',
    bassNote: null,
    inversion: null,
    quality: 'maj7',
    rootNote: 'D',
  }));
  expect(new Chord({
    notes: ['G', 'C', 'E', 'G', 'B'],
    name: 'Cmaj7/G',
    bassNote: 'G',
    inversion: null,
    quality: 'maj7',
    rootNote: 'C',
  }).transpose(2))
  .toEqual(new Chord({
    notes: ['A', 'D', 'F#', 'A', 'C#'],
    name: 'Dmaj7/A',
    bassNote: 'A',
    inversion: null,
    quality: 'maj7',
    rootNote: 'D',
  }));
  expect(new Chord({
    notes: ['G', 'E', 'G', 'B', 'C'],
    name: 'Cmaj7/G',
    bassNote: 'G',
    inversion: 1,
    quality: 'maj7',
    rootNote: 'C',
  }).transpose(2))
  .toEqual(new Chord({
    notes: ['A', 'F#', 'A', 'C#', 'D'],
    name: 'Dmaj7/A',
    bassNote: 'A',
    inversion: 1,
    quality: 'maj7',
    rootNote: 'D',
  }));
  expect(new Chord({
    notes: ['G', 'E', 'G', 'B', 'C'],
    name: 'Cmaj7/G',
    bassNote: 'G',
    inversion: 1,
    quality: 'maj7',
    rootNote: 'C',
  }).transpose(2).transpose(2))
  .toEqual(new Chord({
    notes: ['B', 'G#', 'B', 'D#', 'E'],
    name: 'Emaj7/B',
    bassNote: 'B',
    inversion: 1,
    quality: 'maj7',
    rootNote: 'E',
  }));
});
