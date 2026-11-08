import { ChordT } from '../types';
import { Chord } from '../chord';
import { constructChord } from '../chord';
import {
  changeAccidential,
  generateAllPossiblePermutationsFromNotesArray,
  removeDuplicateAndNullNotes,
  handleBassNoteIfNotRootNote,
  doesArrayContainSubset,
} from '../util';

export const getChordByNotes = (notes: string[]): {
  bestMatch: Chord,
  exactMatches: Chord[],
  possibleMatches: Chord[],
} => {
  const normalizedNotes = removeDuplicateAndNullNotes(notes.map(
    (note: string) => changeAccidential(note, 'sharps'),
  ));

  let allPossibleChordTypes = generateAllPossiblePermutationsFromNotesArray(normalizedNotes);

  let possibleMatches = allPossibleChordTypes
    .filter((quality: ChordT) => doesArrayContainSubset(quality.notes, normalizedNotes));

  let exactMatches = possibleMatches
    .filter((chord: ChordT) => (
      JSON.stringify([...chord.notes].sort()) === JSON.stringify([...normalizedNotes].sort())),
    )
    .map((chord: ChordT) => {
      const { name, notes, bassNote } = handleBassNoteIfNotRootNote(
        normalizedNotes[0],
        chord.rootNote,
        chord.notes,
        chord.name,
      );
      return { ...chord, name, notes, bassNote };
    });

  /*
    If no exact matches are found, strip the bass note and treat the notes array 
    like a slash chord.

    Messy implementation but gets the job done for now.
  */
  if (exactMatches.length === 0) {
    const [bassNote, ...chordNotes] = normalizedNotes;
    allPossibleChordTypes = generateAllPossiblePermutationsFromNotesArray(chordNotes);

    possibleMatches = allPossibleChordTypes
      .filter((quality: ChordT) => doesArrayContainSubset(quality.notes, chordNotes))
      .map((chord: ChordT) => ({ ...chord, bassNote }));

    exactMatches = possibleMatches
      .filter((chord: ChordT) => (
        JSON.stringify([...chord.notes].sort()) === JSON.stringify([...chordNotes].sort())),
      )
      .map((chord: ChordT) => {
        const { name, notes, bassNote } = handleBassNoteIfNotRootNote(
          normalizedNotes[0],
          chord.rootNote,
          chord.notes,
          chord.name,
        );
        return { ...chord, name, notes, bassNote };
      });
  };

  const bestMatch = exactMatches?.[0] || findBestChordMatch(normalizedNotes, [...possibleMatches]);

  const possibleChords = possibleMatches.map((chord: ChordT) => constructChord(chord));
  const exactChords = exactMatches.map((chord: ChordT) => constructChord(chord));
  const bestChord = constructChord(bestMatch);

  return { 
    bestMatch: bestChord,
    exactMatches: exactChords, 
    possibleMatches: possibleChords,
  };
};

const findBestChordMatch = (notes: string[], possibleChords: ChordT[]): ChordT => {
  const inputSet = new Set(notes);

  let bestMatch: ChordT | null = null;
  let bestScore = -Infinity;

  for (const chord of possibleChords) {
    const chordSet = new Set(chord.notes);

    let matches = 0;
    let extra = 0;

    chordSet.forEach((note: string) => {
      if (inputSet.has(note)) matches++;
      else extra++;
    });

    const score = matches - extra;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = chord;
    }
  }

  return bestMatch;
};
