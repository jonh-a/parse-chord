import { ChordT } from './types';
import {
  handleInversion,
  getNotesFromChordType,
  transposeRootNote,
  generateAllPossibleChordsFromRootNote,
  doesArrayContainSubset,
  handleBassNoteIfNotRootNote,
  areArraysEqual,
} from './util';

export class Chord {
  name: string;
  notes: string[];
  rootNote: string;
  bassNote: string | null;
  quality: string;
  inversion: number | null;
  private opts: ChordT;

  constructor(opts: ChordT) {
    this.name = opts.name;
    this.notes = opts.notes;
    this.rootNote = opts.rootNote;
    this.bassNote = opts?.bassNote || null;
    this.quality = opts?.quality;
    this.inversion = opts?.inversion || null;
    Object.defineProperty(this, 'opts', {
      value: opts,
      writable: true,
      configurable: true,
      enumerable: false,
    });
  }

  public invert(inversion: number = 0) {
    return new Chord({
      ...this.opts,
      inversion,
      notes: handleInversion(
        getNotesFromChordType(this.rootNote, this.quality),
        inversion,
      ),
    });
  }

  public transpose(semitones: number = 0) {
    const transposedRoot = transposeRootNote(this.rootNote, semitones);
    const transposedBass = this.bassNote ? transposeRootNote(this.bassNote, semitones) : null;
    const transposedNotes = handleInversion(
      getNotesFromChordType(transposedRoot, this.quality),
      this.inversion,
    );
    if (transposedBass) transposedNotes.unshift(transposedBass);

    const transposedName = `${transposedRoot}${this.quality}`
      + `${transposedBass ? '/' + transposedBass : ''}`;

    return new Chord({
      ...this.opts,
      rootNote: transposedRoot,
      notes: transposedNotes,
      name: transposedName,
      bassNote: transposedBass,
    });
  }

  public extensions() {
    const notes = getNotesFromChordType(this.rootNote, this.quality);

    return generateAllPossibleChordsFromRootNote(this.rootNote)
      .filter((chord: Chord) => doesArrayContainSubset(chord.notes, notes) 
        && !areArraysEqual(chord.notes, notes))
      .map((chord: Chord) => {
        const {name, notes, bassNote} = handleBassNoteIfNotRootNote(
          this.bassNote, 
          chord.rootNote, 
          chord.notes, 
          chord.name,
        );

        return new Chord({
          ...chord,
          name,
          notes,
          bassNote,
        });
      });
  }
}

export const constructChord = (chord: ChordT): Chord => {
  return new Chord({
    name: chord.name,
    notes: chord.notes,
    rootNote: chord.rootNote,
    bassNote: chord?.bassNote ?? null,
    quality: chord.quality,
    inversion: chord?.inversion ?? null,
  });
};