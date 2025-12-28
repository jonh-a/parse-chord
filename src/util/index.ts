import { doesArrayContainSubset, areArraysEqual } from './misc';
import {
  chordTypes,
  notesAsFlats,
  notesAsSharps,
  notateSlashChord,
  changeAccidential,
  generateAllPossibleChordsFromRootNote,
  generateAllPossiblePermutationsFromNotesArray,
  getNotesFromChordType,
  getNotesInChordType,
  removeDuplicateAndNullNotes,
  transposeRootNote,
  handleBassNoteIfNotRootNote,
  handleInversion,
  getAllChordTypes,
  getAllMatchingScalesForChord,
} from './notes';
import {
  seperateChordNameAndBassNote,
  getRootNoteAndChordTypeFromName,
} from './parsing';

export {
  doesArrayContainSubset,
  chordTypes,
  notesAsFlats,
  notesAsSharps,
  notateSlashChord,
  changeAccidential,
  generateAllPossibleChordsFromRootNote,
  generateAllPossiblePermutationsFromNotesArray,
  getNotesFromChordType,
  getNotesInChordType,
  removeDuplicateAndNullNotes,
  transposeRootNote,
  handleBassNoteIfNotRootNote,
  seperateChordNameAndBassNote,
  getRootNoteAndChordTypeFromName,
  handleInversion,
  getAllChordTypes,
  areArraysEqual,
  getAllMatchingScalesForChord,
};