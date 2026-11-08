import {
  handleInversion,
  getNotesFromChordType,
  seperateChordNameAndBassNote, 
  getRootNoteAndChordTypeFromName,
  getAllChordTypes,
} from '../src/util';

test('test inversions', () => {
  expect(handleInversion(['A', 'B', 'C', 'D'], 1)).toEqual(['B', 'C', 'D', 'A']);
  expect(handleInversion(['A', 'B', 'C', 'D'], 2)).toEqual(['C', 'D', 'A', 'B']);
  expect(handleInversion(['A', 'B', 'C', 'D'], 3)).toEqual(['D', 'A', 'B', 'C']);
});

test('test chord name and bass note parsing', () => {
  expect(seperateChordNameAndBassNote('Cmaj7/G')).toEqual({ chordName: 'Cmaj7', bassNote: 'G' });
  expect(seperateChordNameAndBassNote('Bb9/F')).toEqual({ chordName: 'Bb9', bassNote: 'F' });
  expect(seperateChordNameAndBassNote('F#/C#')).toEqual({ chordName: 'F#', bassNote: 'C#' });
  expect(seperateChordNameAndBassNote('Eb6/9/G')).toEqual({ chordName: 'Eb6/9', bassNote: 'G' });
});

test('test root note and chord type parsing', () => {
  expect(getRootNoteAndChordTypeFromName('Cmaj7')).toEqual({ rootNote: 'C', quality: 'maj7' });
  expect(getRootNoteAndChordTypeFromName('D#7')).toEqual({ rootNote: 'D#', quality: '7' });
  expect(getRootNoteAndChordTypeFromName('Eb6/9')).toEqual({ rootNote: 'Eb', quality: '6/9' });
});

test('test note retrieval', () => {
  expect(getNotesFromChordType('C', 'maj7')).toEqual(['C', 'E', 'G', 'B']);
  expect(getNotesFromChordType('C', '6/9')).toEqual(['C', 'E', 'G', 'A', 'D']);
  expect(getNotesFromChordType('C', '')).toEqual(['C', 'E', 'G']);
});

test('test all chord types', () => {
  expect(getAllChordTypes()).toContain('maj');
});