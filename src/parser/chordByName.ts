import { ChordT } from '../types';
import { Chord } from '../chord';
import { constructChord } from '../chord';
import { 
  changeAccidential,
  chordTypes,
  getNotesInScale,
  getNotesFromChordType,
  handleInversion,
  seperateChordNameAndBassNote,
  getRootNoteAndChordTypeFromName,
} from '../util';

export const getChordByName = (chordInput: ChordT | string): Chord => {
  const chord: ChordT = typeof chordInput === 'string' ? { name: chordInput } : chordInput;
  if (!chord.name || chord.name === '') return new Chord({ notes: [], name: '' });

  const { chordName, bassNote } = seperateChordNameAndBassNote(chord.name);
  const { rootNote, quality } = getRootNoteAndChordTypeFromName(chordName);
  const { notes, scale } = getNotesInScale(rootNote, quality);
  const transformedBassNote = changeAccidential(bassNote, scale);

  if (!Object.keys(chordTypes).includes(quality)) return new Chord({ notes: [], name: '' });
  let chordNotes = getNotesFromChordType(rootNote, quality);

  if (chord.inversion) chordNotes = handleInversion(chordNotes, chord.inversion);
  if (transformedBassNote && notes.indexOf(transformedBassNote) > -1) {
    chordNotes.unshift(transformedBassNote);
  }

  return constructChord({
    name: chord.name,
    notes: chordNotes,
    bassNote: transformedBassNote ?? null,
    inversion: chord.inversion ?? null,
    rootNote,
    quality,
  });
};