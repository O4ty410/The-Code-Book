// ============================================================
// CHAOS MODE — Glitch Mode level data
// Same format as GlitchLevels but with modifiers field.
// Modifiers: { type: 'reverse'|'corrupt'|'flicker', cells: [[r,c],...] }
//   reverse — pipe logic uses (rot+2)&3; player must compensate
//   corrupt — pipe appears but is logically T_EMPTY (red X shown)
//   flicker — visual-only blink overlay; logic unchanged
// ============================================================
window.ChaosLevels = [

  // GLITCH-01: REVERSE corner — learn reversed rotation
  // Path: [0,0]→[0,1]→[0,2]→[0,3]→[1,3]→[2,3]→[3,3]
  // [0,3] L pipe is REVERSE: to get logical SW(1), set visual NE(3)
  { id: 'GLITCH-01', name: 'GLITCH-01', size: 4,
    start: [0,0], end: [3,3],
    pipes: [
      [0,1,'I',0],   // need EW(1), start NS(0)
      [0,2,'I',0],   // need EW(1), start NS(0)
      [0,3,'L',0],   // REVERSE — need visual NE(3), start ES(0)
      [1,3,'I',1],   // need NS(0), start EW(1)
      [2,3,'I',1]    // need NS(0), start EW(1)
    ],
    modifiers: [
      { type: 'reverse', cells: [[0,3]] }
    ]
  },

  // GLITCH-02: CORRUPT red-herring — broken pipe looks like a shortcut
  // Path: [0,0]→[1,0]→[2,0]→[2,1]→[2,2]→[2,3]→[3,3]
  // [0,1] is CORRUPT: looks like E-path from source but has red X
  { id: 'GLITCH-02', name: 'GLITCH-02', size: 4,
    start: [0,0], end: [3,3],
    pipes: [
      [0,1,'I',1],   // CORRUPT — EW visual, logically dead
      [1,0,'I',1],   // need NS(0), start EW(1)
      [2,0,'L',2],   // need NE(3), start WN(2)
      [2,1,'I',0],   // need EW(1), start NS(0)
      [2,2,'I',0],   // need EW(1), start NS(0)
      [2,3,'L',3]    // need SW(1), start NE(3)
    ],
    modifiers: [
      { type: 'corrupt', cells: [[0,1]] }
    ]
  },

  // GLITCH-03: FLICKER distraction — flickering noise near source
  // Path: [0,0]→[0,1]→[0,2]→[0,3]→[1,3]→[2,3]→[3,3]
  // [1,0] flickers: south of source, visually distracting dead-end
  { id: 'GLITCH-03', name: 'GLITCH-03', size: 4,
    start: [0,0], end: [3,3],
    pipes: [
      [0,1,'I',0],   // need EW(1), start NS(0)
      [0,2,'I',0],   // need EW(1), start NS(0)
      [0,3,'L',0],   // need SW(1), start ES(0)
      [1,3,'I',1],   // need NS(0), start EW(1)
      [2,3,'I',1],   // need NS(0), start EW(1)
      [1,0,'I',0]    // FLICKER — dead-end NS pipe south of source
    ],
    modifiers: [
      { type: 'flicker', cells: [[1,0]] }
    ]
  },

  // GLITCH-04: REVERSE + FLICKER — two modifiers
  // Path: [0,0]→[0,1]→[0,2]→[0,3]→[1,3]→[2,3]→[3,3]
  // [0,3] REVERSE corner; [2,1] flicker noise
  { id: 'GLITCH-04', name: 'GLITCH-04', size: 4,
    start: [0,0], end: [3,3],
    pipes: [
      [0,1,'I',0],   // need EW(1), start NS(0)
      [0,2,'I',0],   // need EW(1), start NS(0)
      [0,3,'L',0],   // REVERSE — need visual NE(3), start ES(0)
      [1,3,'I',1],   // need NS(0), start EW(1)
      [2,3,'I',1],   // need NS(0), start EW(1)
      [2,1,'I',0]    // FLICKER — off-path noise
    ],
    modifiers: [
      { type: 'reverse', cells: [[0,3]] },
      { type: 'flicker', cells: [[2,1]] }
    ]
  },

  // GLITCH-05: REVERSE + CORRUPT + FLICKER — all three modifiers, 5×5
  // Path: [0,0]→[1,0]→[2,0]→[2,1]→[2,2]→[2,3]→[2,4]→[3,4]→[4,4]
  // [2,0] REVERSE L: to get logical NE(3) set visual SW(1)
  // [1,2] CORRUPT L: off-path near center, red X
  // [0,2] FLICKER I: top-center visual noise
  { id: 'GLITCH-05', name: 'GLITCH-05', size: 5,
    start: [0,0], end: [4,4],
    pipes: [
      [1,0,'I',1],   // need NS(0), start EW(1)
      [2,0,'L',2],   // REVERSE — need visual SW(1), start WN(2)
      [2,1,'I',0],   // need EW(1), start NS(0)
      [2,2,'I',0],   // need EW(1), start NS(0)
      [2,3,'I',0],   // need EW(1), start NS(0)
      [2,4,'L',3],   // need SW(1), start NE(3)
      [3,4,'I',1],   // need NS(0), start EW(1)
      [1,2,'L',0],   // CORRUPT — off-path, red X
      [0,2,'I',0]    // FLICKER — top noise
    ],
    modifiers: [
      { type: 'reverse', cells: [[2,0]] },
      { type: 'corrupt', cells: [[1,2]] },
      { type: 'flicker', cells: [[0,2]] }
    ]
  }

];
