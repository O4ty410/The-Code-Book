// ============================================================
// GLITCH MODE — Level data
// Format: { id, name, size, start:[r,c], end:[r,c],
//           pipes:[[r,c,'type',startRot], ...] }
// Types: 'I' straight  'L' elbow  'T' tee  'X' cross
// startRot is intentionally wrong so the player must rotate to solve.
// ============================================================
window.GlitchLevels = [

  // ── TIER 1: 3×3 tutorials ────────────────────────────────

  // 1 — Single pipe: teaches basic rotation
  { id: 'LINK-01', name: 'LINK-01', size: 3,
    start: [0,0], end: [0,2],
    pipes: [
      [0,1,'I',0]                          // need EW(1)
    ]
  },

  // 2 — Down then right: introduces L-pipe
  { id: 'LINK-02', name: 'LINK-02', size: 3,
    start: [0,0], end: [2,2],
    pipes: [
      [1,0,'I',1],                         // need NS(0)
      [2,0,'L',0],                         // need NE(3)
      [2,1,'I',0]                          // need EW(1)
    ]
  },

  // 3 — Diagonal zigzag: chained L-pipes
  { id: 'LINK-03', name: 'LINK-03', size: 3,
    start: [0,0], end: [2,2],
    pipes: [
      [0,1,'L',3],                         // need SW(1)
      [1,1,'L',0],                         // need NE(3)
      [1,2,'L',3]                          // need SW(1)
    ]
  },

  // 4 — Top row then drop: longer 3×3 path
  { id: 'LINK-04', name: 'LINK-04', size: 3,
    start: [0,0], end: [2,2],
    pipes: [
      [0,1,'I',0],                         // need EW(1)
      [0,2,'L',3],                         // need SW(1)
      [1,2,'I',1]                          // need NS(0)
    ]
  },

  // ── TIER 2: 4×4 easy ────────────────────────────────────

  // 5 — Top row + right column
  { id: 'LINK-05', name: 'LINK-05', size: 4,
    start: [0,0], end: [3,3],
    pipes: [
      [0,1,'I',0],                         // need EW(1)
      [0,2,'I',0],                         // need EW(1)
      [0,3,'L',3],                         // need SW(1)
      [1,3,'I',1],                         // need NS(0)
      [2,3,'I',1]                          // need NS(0)
    ]
  },

  // 6 — Left column + mid bottom row (different target corner)
  { id: 'LINK-06', name: 'LINK-06', size: 4,
    start: [0,0], end: [2,3],
    pipes: [
      [1,0,'I',1],                         // need NS(0)
      [2,0,'L',0],                         // need NE(3)
      [2,1,'I',0],                         // need EW(1)
      [2,2,'I',0]                          // need EW(1)
    ]
  },

  // 7 — Diagonal staircase with L-pipes only
  { id: 'LINK-07', name: 'LINK-07', size: 4,
    start: [0,0], end: [3,3],
    pipes: [
      [0,1,'L',3],                         // need SW(1)
      [1,1,'L',0],                         // need NE(3)
      [1,2,'L',3],                         // need SW(1)
      [2,2,'L',0],                         // need NE(3)
      [2,3,'L',3]                          // need SW(1)
    ]
  },

  // 8 — Introduces T-pipe: dead branch goes south off-path
  { id: 'LINK-08', name: 'LINK-08', size: 4,
    start: [0,0], end: [3,3],
    pipes: [
      [0,1,'I',0],                         // need EW(1)
      [0,2,'T',0],                         // need ESW(1); dead S to [1,2]
      [0,3,'L',3],                         // need SW(1)
      [1,3,'I',1],                         // need NS(0)
      [2,3,'I',1]                          // need NS(0)
    ]
  },

  // ── TIER 3: 4×4 medium ──────────────────────────────────

  // 9 — S-curve through the grid
  { id: 'LINK-09', name: 'LINK-09', size: 4,
    start: [0,0], end: [3,3],
    pipes: [
      [1,0,'L',0],                         // need NE(3)
      [1,1,'I',0],                         // need EW(1)
      [1,2,'L',3],                         // need SW(1)
      [2,2,'L',1],                         // need NE(3)
      [2,3,'L',0]                          // need SW(1)
    ]
  },

  // 10 — Longer snake; target at bottom-left
  { id: 'LINK-10', name: 'LINK-10', size: 4,
    start: [0,0], end: [3,0],
    pipes: [
      [0,1,'I',0],                         // need EW(1)
      [0,2,'I',0],                         // need EW(1)
      [0,3,'L',3],                         // need SW(1)
      [1,3,'L',0],                         // need NW(2)
      [1,2,'I',0],                         // need EW(1)
      [1,1,'I',0],                         // need EW(1)
      [1,0,'L',3],                         // need ES(0)
      [2,0,'I',1]                          // need NS(0)
    ]
  },

  // 11 — T-pipe mid-path with meaningful dead branch
  { id: 'LINK-11', name: 'LINK-11', size: 4,
    start: [0,0], end: [3,3],
    pipes: [
      [0,1,'I',0],                         // need EW(1)
      [0,2,'I',0],                         // need EW(1)
      [0,3,'L',3],                         // need SW(1)
      [1,3,'L',0],                         // need NW(2)
      [1,2,'T',3],                         // need ESW(1); dead W to [1,1]
      [2,2,'I',1],                         // need NS(0)
      [3,2,'L',0]                          // need NE(3)
    ]
  },

  // 12 — Near-full grid snake; many pipes to track
  { id: 'LINK-12', name: 'LINK-12', size: 4,
    start: [0,0], end: [3,3],
    pipes: [
      [0,1,'I',0],                         // need EW(1)
      [0,2,'I',0],                         // need EW(1)
      [0,3,'L',3],                         // need SW(1)
      [1,3,'L',0],                         // need NW(2)
      [1,2,'I',0],                         // need EW(1)
      [1,1,'I',0],                         // need EW(1)
      [1,0,'L',2],                         // need ES(0)
      [2,0,'L',1],                         // need NE(3)
      [2,1,'I',0],                         // need EW(1)
      [2,2,'I',0],                         // need EW(1)
      [2,3,'L',3]                          // need SW(1)
    ]
  },

  // 13 — Introduces X cross-pipe with two visible dead branches
  { id: 'LINK-13', name: 'LINK-13', size: 4,
    start: [0,0], end: [3,3],
    pipes: [
      [0,1,'I',0],                         // need EW(1)
      [0,2,'L',3],                         // need SW(1)
      [1,2,'X',0],                         // cross; dead W and E
      [1,3,'L',0],                         // need SW(1)
      [2,3,'I',1]                          // need NS(0)
    ]
  },

  // ── TIER 4: 5×5 medium-hard ─────────────────────────────

  // 14 — U-shape: down left, across bottom, up right
  { id: 'LINK-14', name: 'LINK-14', size: 5,
    start: [0,0], end: [0,4],
    pipes: [
      [1,0,'I',1],                         // need NS(0)
      [2,0,'I',1],                         // need NS(0)
      [3,0,'I',1],                         // need NS(0)
      [4,0,'L',0],                         // need NE(3)
      [4,1,'I',0],                         // need EW(1)
      [4,2,'I',0],                         // need EW(1)
      [4,3,'I',0],                         // need EW(1)
      [4,4,'L',0],                         // need NW(2)
      [3,4,'I',1],                         // need NS(0)
      [2,4,'I',1],                         // need NS(0)
      [1,4,'I',1]                          // need NS(0)
    ]
  },

  // 15 — Staircase entirely built from L-pipes
  { id: 'LINK-15', name: 'LINK-15', size: 5,
    start: [0,0], end: [4,4],
    pipes: [
      [0,1,'L',3],                         // need SW(1)
      [1,1,'L',0],                         // need NE(3)
      [1,2,'L',3],                         // need SW(1)
      [2,2,'L',0],                         // need NE(3)
      [2,3,'L',3],                         // need SW(1)
      [3,3,'L',0],                         // need NE(3)
      [3,4,'L',3]                          // need SW(1)
    ]
  },

  // 16 — Two T-junctions: dead branches test planning
  { id: 'LINK-16', name: 'LINK-16', size: 5,
    start: [0,0], end: [4,4],
    pipes: [
      [0,1,'I',0],                         // need EW(1)
      [0,2,'T',0],                         // need ESW(1); dead S to [1,2]
      [0,3,'I',0],                         // need EW(1)
      [0,4,'L',3],                         // need SW(1)
      [1,4,'I',1],                         // need NS(0)
      [2,4,'L',0],                         // need NW(2)
      [2,3,'I',0],                         // need EW(1)
      [2,2,'T',3],                         // need ESW(1); dead W to [2,1]
      [3,2,'I',1],                         // need NS(0)
      [4,2,'L',0],                         // need NE(3)
      [4,3,'I',0]                          // need EW(1)
    ]
  },

  // 17 — X cross with dead N and S branches visible
  { id: 'LINK-17', name: 'LINK-17', size: 5,
    start: [0,0], end: [4,4],
    pipes: [
      [0,1,'I',0],                         // need EW(1)
      [0,2,'L',3],                         // need SW(1)
      [1,2,'I',1],                         // need NS(0)
      [2,2,'X',0],                         // cross; dead N/S branches
      [2,3,'I',0],                         // need EW(1)
      [2,4,'L',3],                         // need SW(1)
      [3,4,'I',1]                          // need NS(0)
    ]
  },

  // ── TIER 5: 5×5 hard ────────────────────────────────────

  // 18 — Full boustrophedon snake covering all 5 rows
  { id: 'LINK-18', name: 'LINK-18', size: 5,
    start: [0,0], end: [4,0],
    pipes: [
      [0,1,'I',0],                         // need EW(1)
      [0,2,'I',0],                         // need EW(1)
      [0,3,'I',0],                         // need EW(1)
      [0,4,'L',3],                         // need SW(1)
      [1,4,'L',0],                         // need NW(2)
      [1,3,'I',0],                         // need EW(1)
      [1,2,'I',0],                         // need EW(1)
      [1,1,'I',0],                         // need EW(1)
      [1,0,'L',3],                         // need ES(0)
      [2,0,'L',2],                         // need NE(3)
      [2,1,'I',0],                         // need EW(1)
      [2,2,'I',0],                         // need EW(1)
      [2,3,'I',0],                         // need EW(1)
      [2,4,'L',3],                         // need SW(1)
      [3,4,'L',0],                         // need NW(2)
      [3,3,'I',0],                         // need EW(1)
      [3,2,'I',0],                         // need EW(1)
      [3,1,'I',0],                         // need EW(1)
      [3,0,'L',2]                          // need ES(0)
    ]
  },

  // 19 — Two T-junctions on a winding mid-grid path
  { id: 'LINK-19', name: 'LINK-19', size: 5,
    start: [0,0], end: [4,4],
    pipes: [
      [0,1,'I',0],                         // need EW(1)
      [0,2,'I',0],                         // need EW(1)
      [0,3,'I',0],                         // need EW(1)
      [0,4,'L',3],                         // need SW(1)
      [1,4,'I',1],                         // need NS(0)
      [2,4,'L',0],                         // need NW(2)
      [2,3,'I',0],                         // need EW(1)
      [2,2,'T',0],                         // need NEW(3); dead N to [1,2]
      [2,1,'L',2],                         // need ES(0)
      [3,1,'T',2],                         // need NES(0); dead S to [4,1]
      [3,2,'I',0],                         // need EW(1)
      [3,3,'L',0],                         // need SW(1)
      [4,3,'L',1]                          // need NE(3)
    ]
  },

  // 20 — X + two T-junctions; most complex layout
  { id: 'LINK-20', name: 'LINK-20', size: 5,
    start: [0,0], end: [4,4],
    pipes: [
      [1,0,'T',1],                         // need NES(0); dead E to [1,1]
      [2,0,'L',2],                         // need NE(3)
      [2,1,'I',0],                         // need EW(1)
      [2,2,'X',0],                         // cross; dead E and S branches
      [1,2,'I',1],                         // need NS(0)
      [0,2,'T',3],                         // need ESW(1); dead W to [0,1]
      [0,3,'I',0],                         // need EW(1)
      [0,4,'L',3],                         // need SW(1)
      [1,4,'I',1],                         // need NS(0)
      [2,4,'I',1],                         // need NS(0)
      [3,4,'L',1]                          // need NE(3)
    ]
  }

];
