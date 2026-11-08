export const seperateChordNameAndBassNote = (rawChordName: string): {
  chordName: string,
  bassNote: string | null
} => {
  /*
    Parse slash chords into the respective chord name and bass notes.

    seperateChordNameAndBassNote(Cmaj7/G) -> { chordName: 'Cmaj7', bassNote: 'G' }
  */
  let chordName: string = rawChordName;

  /*
    6/9 chords need to be handled specifically so that the 9 isn't parsed 
    as a slash chord.
  */
  const isSixNineChord = rawChordName?.includes('6/9');
  const bassNote = isSixNineChord
    ? rawChordName?.split('/')?.[2]
    : rawChordName?.split('/')?.[1];

  if (bassNote) chordName = isSixNineChord
    ? `${rawChordName?.split('/')?.[0]}/${rawChordName?.split('/')?.[1]}`
    : rawChordName?.split('/')?.[0];

  return { chordName, bassNote };
};

export const getRootNoteAndChordTypeFromName = (chordName: string): {
  quality: string,
  rootNote: string
} => {
  /* 
    Split the chord into root note and chord type either at a space 
    or immediately after the flat/sharp notation. Otherwise just split 
    after first character.
  */
  let splitIdx = 0;
  if (chordName.includes(' ')) splitIdx = chordName.indexOf(' ');
  if (chordName?.[1] === '#' || chordName?.[1] === 'b') splitIdx = 1;

  const quality = chordName?.substring(splitIdx + 1)?.trim();
  const rootNote = chordName?.substring(0, splitIdx + 1)?.trim();

  return { quality, rootNote };
};