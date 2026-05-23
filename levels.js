// ============================================================
// GLITCH MODE — Level data
// Format: { id, name, size, start:[r,c], end:[r,c],
//           pipes:[[r,c,'type',startRot], ...] }
// Types: 'I' straight  'L' elbow  'T' tee  'X' cross
// startRot is intentionally wrong so the player must fix it.
// ============================================================
window.GlitchLevels = [

  // 1 — Top row then right column (tutorial)
  { id: 'LINK-01', name: 'LINK-01', size: 4,
    start: [0,0], end: [3,3],
    pipes: [
      [0,1,'I',0], [0,2,'I',0], [0,3,'L',3],
      [1,3,'I',3],
      [2,3,'I',3]
    ]
  },

  // 2 — Left column then bottom row
  { id: 'LINK-02', name: 'LINK-02', size: 4,
    start: [0,0], end: [3,3],
    pipes: [
      [1,0,'I',3],
      [2,0,'I',3],
      [3,0,'L',2], [3,1,'I',0], [3,2,'I',0]
    ]
  },

  // 3 — Diagonal zigzag with L-pipes only
  { id: 'LINK-03', name: 'LINK-03', size: 4,
    start: [0,0], end: [3,3],
    pipes: [
      [0,1,'L',3],
      [1,1,'L',1], [1,2,'L',3],
      [2,2,'L',2], [2,3,'L',3]
    ]
  },

  // 4 — S-shape through middle row
  { id: 'LINK-04', name: 'LINK-04', size: 4,
    start: [0,0], end: [3,3],
    pipes: [
      [1,0,'L',1], [1,1,'I',0], [1,2,'I',0], [1,3,'L',3],
      [2,3,'I',3]
    ]
  },

  // 5 — Introduces T-pipe (junction with harmless branch)
  { id: 'LINK-05', name: 'LINK-05', size: 4,
    start: [0,0], end: [3,3],
    pipes: [
      [0,1,'I',0], [0,2,'T',3], [0,3,'L',3],
      [1,3,'I',3],
      [2,3,'I',3]
    ]
  },

  // 6 — First 5×5: U-path down, across, up
  { id: 'LINK-06', name: 'LINK-06', size: 5,
    start: [0,0], end: [4,4],
    pipes: [
      [1,0,'I',3],
      [2,0,'L',1], [2,1,'I',0], [2,2,'I',0], [2,3,'I',0], [2,4,'L',3],
      [3,4,'I',3]
    ]
  },

  // 7 — 5×5: column path with L turn at bottom
  { id: 'LINK-07', name: 'LINK-07', size: 5,
    start: [0,0], end: [4,4],
    pipes: [
      [0,1,'I',0], [0,2,'I',0], [0,3,'L',3],
      [1,3,'I',3],
      [2,3,'I',3],
      [3,3,'I',3],
      [4,3,'L',1]
    ]
  },

  // 8 — 5×5: snake fills most of the grid
  { id: 'LINK-08', name: 'LINK-08', size: 5,
    start: [0,0], end: [4,4],
    pipes: [
      [0,1,'I',0], [0,2,'I',0], [0,3,'I',0], [0,4,'L',3],
      [1,0,'L',2], [1,1,'I',0], [1,2,'I',0], [1,3,'I',0], [1,4,'L',0],
      [2,0,'I',3],
      [3,0,'I',3],
      [4,0,'L',1], [4,1,'I',0], [4,2,'I',0], [4,3,'I',0]
    ]
  },

  // 9 — 5×5: T-junction creates a visible dead branch
  { id: 'LINK-09', name: 'LINK-09', size: 5,
    start: [0,0], end: [4,4],
    pipes: [
      [1,0,'I',3],
      [2,0,'L',1], [2,1,'I',0], [2,2,'T',3], [2,3,'I',0], [2,4,'L',3],
      [3,2,'I',0], [3,4,'I',3]
    ]
  },

  // 10 — 5×5: X cross-pipe with misdirection branches
  { id: 'LINK-10', name: 'LINK-10', size: 5,
    start: [0,0], end: [4,4],
    pipes: [
      [0,1,'I',0], [0,2,'L',3],
      [1,2,'I',3],
      [2,1,'I',0], [2,2,'X',0], [2,3,'I',0],
      [3,2,'I',3],
      [4,2,'L',1], [4,3,'I',0]
    ]
  }

];
