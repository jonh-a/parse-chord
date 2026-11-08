# Parse-chord

A small library for parsing chords by name or by piano/guitar voicing.

## Usage

### Getting chord by name/notation

Use the `getChordByName` function to get an object containing the chord notes
and bass note (if it's a slash chord).

Accepts either:

- A string reflecting the chord name, or
- An object containing the chord `name` and `inversion`.

```typescript
import { getChordByName } from "parse-chord";

/*
Chord {
  name: 'Cmaj7',
  notes: [ 'G', 'C', 'E', 'G', 'B' ],
  rootNote: 'C',
  bassNote: 'G',
  quality: 'maj7',
  inversion: null
}
*/
getChordByName("Cmaj7/G");

/*
Chord {
  name: 'D#7sus4',
  notes: [ 'D#', 'G#', 'A#', 'C#' ],
  rootNote: 'D#',
  bassNote: null,
  quality: '7sus4',
  inversion: null
}
*/
getChordByName("D#7sus4");

/*
Chord {
  name: 'Cmaj7',
  notes: [ 'G', 'G', 'B', 'C', 'E' ],
  rootNote: 'C',
  bassNote: 'G',
  quality: 'maj7',
  inversion: 2
}
*/
getChordByName({ name: "Cmaj7/G", inversion: 2 });
```

### Getting a chord from a set of notes

Use the `getChordByNotes` function to get an object containing best, exact, and
possible matches given a set of notes.

Accepts an array of notes.

```typescript
import { getChordByNotes } from "parse-chord";

/*
Chord {
  name: 'Cmaj7',
  notes: [ 'C', 'E', 'G', 'B' ],
  rootNote: 'C',
  bassNote: null,
  quality: 'maj7',
  inversion: null
}
*/
getChordByNotes(["G", "C", "E", "G", "B"]).bestMatch;

/*
Chord {
  name: 'D#add9/G',
  notes: [ 'G', 'D#', 'A#', 'F' ],
  rootNote: 'D#',
  bassNote: 'G',
  quality: 'add9',
  inversion: null
}
*/
getChordByNotes(["G", "A#", "D#", "F"]).bestMatch;
```

### Getting a chord from a guitar voicing

Use the `getChordByGuitarVoicing` function to get an object containing best,
exact, and possible matches given a set of notes.

Accepts either:

- An array of `notes` reflecting the fret played (null if muted), or
- An object containing a `tuning` (array of notes from low to high), a `capo`
  (integer or null), and a `notes` array.

```typescript
import { getChordByGuitarVoicing } from "parse-chord";

/*
Chord {
  name: 'Em',
  notes: [ 'E', 'G', 'B' ],
  rootNote: 'E',
  bassNote: null,
  quality: 'm',
  inversion: null
}
*/
getChordByGuitarVoicing([0, 2, 2, 0, 0, 0]).bestMatch;

/*
Chord {
  name: 'Cadd9',
  notes: [ 'C', 'E', 'G', 'D' ],
  rootNote: 'C',
  bassNote: null,
  quality: 'add9',
  inversion: null
}
*/
getChordByGuitarVoicing([null, 3, 2, 0, 3, null]).bestMatch;

/*
Chord {
  name: 'Gadd9',
  notes: [ 'G', 'B', 'D', 'A' ],
  rootNote: 'G',
  bassNote: null,
  quality: 'add9',
  inversion: null
}
*/
getChordByGuitarVoicing({
  tuning: ["D", "A", "D", "G", "A", "D"],
  notes: [5, 5, 0, 4, 0, 5],
}).bestMatch;
```
