// helpers.js — Pure utilities (no state dependencies at load time)

// Shared AudioContext — created once on first use to avoid browser limits
let _sharedAudioCtx = null;
function getAudioContext() {
  if (!_sharedAudioCtx) {
    _sharedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Resume if suspended (browser autoplay policy)
  if (_sharedAudioCtx.state === 'suspended') {
    _sharedAudioCtx.resume();
  }
  return _sharedAudioCtx;
}

var _sageOwlId = 0;
function sageOwlSVG(w, h) {
  var id = ++_sageOwlId;
  w = w || 60; h = h || 66;
  var B = 'M22,22 L14,4 L30,17 Q50,11 70,17 L86,4 L78,22 Q92,36 90,57 Q86,78 50,88 Q14,78 10,57 Q8,36 22,22 Z';
  return (
    '<svg viewBox="0 0 100 110" width="' + w + '" height="' + h + '" xmlns="http://www.w3.org/2000/svg" style="display:block;overflow:visible">' +
    '<defs>' +
      '<radialGradient id="sob' + id + '" cx="44" cy="34" r="62" gradientUnits="userSpaceOnUse">' +
        '<stop offset="0%" stop-color="#22eeff"/>' +
        '<stop offset="38%" stop-color="#0070cc"/>' +
        '<stop offset="72%" stop-color="#002c68"/>' +
        '<stop offset="100%" stop-color="#000d22"/>' +
      '</radialGradient>' +
      '<filter id="sgf' + id + '" x="-25%" y="-25%" width="150%" height="150%">' +
        '<feGaussianBlur in="SourceGraphic" stdDeviation="4" result="bl"/>' +
        '<feMerge><feMergeNode in="bl"/><feMergeNode in="SourceGraphic"/></feMerge>' +
      '</filter>' +
      '<filter id="sef' + id + '" x="-80%" y="-80%" width="260%" height="260%">' +
        '<feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="bl"/>' +
        '<feMerge><feMergeNode in="bl"/><feMergeNode in="SourceGraphic"/></feMerge>' +
      '</filter>' +
    '</defs>' +
    '<path d="' + B + '" fill="url(#sob' + id + ')"/>' +
    '<path d="' + B + '" fill="rgba(160,60,255,0.09)"/>' +
    '<path d="' + B + '" fill="none" stroke="rgba(0,210,255,0.65)" stroke-width="2.5" filter="url(#sgf' + id + ')"/>' +
    '<path d="' + B + '" fill="none" stroke="rgba(0,220,255,0.5)" stroke-width="1"/>' +
    '<ellipse cx="50" cy="47" rx="24" ry="22" fill="rgba(0,10,36,0.52)" stroke="rgba(0,150,255,0.15)" stroke-width="0.8"/>' +
    '<circle cx="36" cy="43" r="11" fill="#000800"/>' +
    '<g filter="url(#sef' + id + ')">' +
      '<circle cx="36" cy="43" r="11" fill="none" stroke="#00ff88" stroke-width="1.6"/>' +
      '<circle cx="36" cy="43" r="7.5" fill="none" stroke="#00dd66" stroke-width="1"/>' +
      '<circle cx="36" cy="43" r="4.2" fill="#00cc55"/>' +
    '</g>' +
    '<circle cx="36" cy="43" r="2" fill="#000800"/>' +
    '<circle cx="38.5" cy="40.5" r="1.3" fill="rgba(255,255,255,0.88)"/>' +
    '<circle cx="64" cy="43" r="11" fill="#000800"/>' +
    '<g filter="url(#sef' + id + ')">' +
      '<circle cx="64" cy="43" r="11" fill="none" stroke="#00ff88" stroke-width="1.6"/>' +
      '<circle cx="64" cy="43" r="7.5" fill="none" stroke="#00dd66" stroke-width="1"/>' +
      '<circle cx="64" cy="43" r="4.2" fill="#00cc55"/>' +
    '</g>' +
    '<circle cx="64" cy="43" r="2" fill="#000800"/>' +
    '<circle cx="66.5" cy="40.5" r="1.3" fill="rgba(255,255,255,0.88)"/>' +
    '<polygon points="50,55 44,63 56,63" fill="#cce6f4" stroke="rgba(0,130,200,0.3)" stroke-width="0.5"/>' +
    '<line x1="50" y1="68" x2="50" y2="84" stroke="#00ff88" stroke-width="1.2" stroke-opacity="0.72"/>' +
    '<line x1="50" y1="72" x2="38" y2="72" stroke="#00ff88" stroke-width="1" stroke-opacity="0.62"/>' +
    '<line x1="38" y1="72" x2="33" y2="77" stroke="#00ff88" stroke-width="0.8" stroke-opacity="0.52"/>' +
    '<line x1="50" y1="72" x2="62" y2="72" stroke="#00ff88" stroke-width="1" stroke-opacity="0.62"/>' +
    '<line x1="62" y1="72" x2="67" y2="77" stroke="#00ff88" stroke-width="0.8" stroke-opacity="0.52"/>' +
    '<line x1="50" y1="79" x2="41" y2="79" stroke="#00ff88" stroke-width="0.8" stroke-opacity="0.52"/>' +
    '<line x1="50" y1="79" x2="59" y2="79" stroke="#00ff88" stroke-width="0.8" stroke-opacity="0.52"/>' +
    '<circle cx="50" cy="72" r="2" fill="#00ff88" fill-opacity="0.85"/>' +
    '<circle cx="38" cy="72" r="1.5" fill="#00ff88" fill-opacity="0.72"/>' +
    '<circle cx="62" cy="72" r="1.5" fill="#00ff88" fill-opacity="0.72"/>' +
    '<circle cx="50" cy="79" r="2" fill="#00ff88" fill-opacity="0.85"/>' +
    '<circle cx="41" cy="79" r="1.2" fill="#00ff88" fill-opacity="0.62"/>' +
    '<circle cx="59" cy="79" r="1.2" fill="#00ff88" fill-opacity="0.62"/>' +
    '<circle cx="50" cy="84" r="1.5" fill="#00ff88" fill-opacity="0.72"/>' +
    '</svg>'
  );
}

function controllerSVG(w, h) {
  var id = ++_sageOwlId;
  w = w || 64; h = h || 48;
  var B = 'M15,50 Q8,36 10,22 Q13,10 26,8 L74,8 Q87,10 90,22 Q92,36 85,50 Q79,62 70,63 L60,60 L55,58 L45,58 L40,60 L30,63 Q21,62 15,50 Z';
  return (
    '<svg viewBox="0 0 100 72" width="' + w + '" height="' + h + '" xmlns="http://www.w3.org/2000/svg" style="display:block;overflow:visible">' +
    '<defs>' +
      '<radialGradient id="cob' + id + '" cx="44" cy="28" r="62" gradientUnits="userSpaceOnUse">' +
        '<stop offset="0%" stop-color="#22eeff"/>' +
        '<stop offset="38%" stop-color="#0070cc"/>' +
        '<stop offset="72%" stop-color="#002c68"/>' +
        '<stop offset="100%" stop-color="#000d22"/>' +
      '</radialGradient>' +
      '<filter id="cgf' + id + '" x="-25%" y="-25%" width="150%" height="150%">' +
        '<feGaussianBlur in="SourceGraphic" stdDeviation="4" result="bl"/>' +
        '<feMerge><feMergeNode in="bl"/><feMergeNode in="SourceGraphic"/></feMerge>' +
      '</filter>' +
      '<filter id="cef' + id + '" x="-80%" y="-80%" width="260%" height="260%">' +
        '<feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="bl"/>' +
        '<feMerge><feMergeNode in="bl"/><feMergeNode in="SourceGraphic"/></feMerge>' +
      '</filter>' +
    '</defs>' +
    '<path d="' + B + '" fill="url(#cob' + id + ')"/>' +
    '<path d="' + B + '" fill="rgba(160,60,255,0.09)"/>' +
    '<path d="' + B + '" fill="none" stroke="rgba(0,210,255,0.65)" stroke-width="2.5" filter="url(#cgf' + id + ')"/>' +
    '<path d="' + B + '" fill="none" stroke="rgba(0,220,255,0.5)" stroke-width="1"/>' +
    // Left thumbstick — same green eye treatment as owl
    '<circle cx="30" cy="38" r="9" fill="#000800"/>' +
    '<g filter="url(#cef' + id + ')">' +
      '<circle cx="30" cy="38" r="9" fill="none" stroke="#00ff88" stroke-width="1.6"/>' +
      '<circle cx="30" cy="38" r="6.2" fill="none" stroke="#00dd66" stroke-width="1"/>' +
      '<circle cx="30" cy="38" r="3.5" fill="#00cc55"/>' +
    '</g>' +
    '<circle cx="30" cy="38" r="1.6" fill="#000800"/>' +
    '<circle cx="32.2" cy="35.8" r="1.2" fill="rgba(255,255,255,0.88)"/>' +
    // Right thumbstick
    '<circle cx="64" cy="42" r="9" fill="#000800"/>' +
    '<g filter="url(#cef' + id + ')">' +
      '<circle cx="64" cy="42" r="9" fill="none" stroke="#00ff88" stroke-width="1.6"/>' +
      '<circle cx="64" cy="42" r="6.2" fill="none" stroke="#00dd66" stroke-width="1"/>' +
      '<circle cx="64" cy="42" r="3.5" fill="#00cc55"/>' +
    '</g>' +
    '<circle cx="64" cy="42" r="1.6" fill="#000800"/>' +
    '<circle cx="66.2" cy="39.8" r="1.2" fill="rgba(255,255,255,0.88)"/>' +
    // D-pad — cyan cross
    '<rect x="17" y="22.5" width="11" height="4" rx="1.2" fill="rgba(0,210,255,0.75)"/>' +
    '<rect x="20.5" y="19" width="4" height="11" rx="1.2" fill="rgba(0,210,255,0.75)"/>' +
    // Face buttons — 4 small circles
    '<circle cx="72" cy="22" r="3.2" fill="none" stroke="rgba(0,220,255,0.8)" stroke-width="1.2"/>' +
    '<circle cx="78.5" cy="28" r="3.2" fill="none" stroke="rgba(0,220,255,0.8)" stroke-width="1.2"/>' +
    '<circle cx="72" cy="34" r="3.2" fill="none" stroke="rgba(0,220,255,0.8)" stroke-width="1.2"/>' +
    '<circle cx="65.5" cy="28" r="3.2" fill="none" stroke="rgba(0,220,255,0.8)" stroke-width="1.2"/>' +
    // Center dots — like owl circuit lines
    '<circle cx="44" cy="28" r="2.2" fill="#00ff88" fill-opacity="0.82"/>' +
    '<circle cx="56" cy="28" r="2.2" fill="#00ff88" fill-opacity="0.82"/>' +
    '<line x1="46.2" y1="28" x2="53.8" y2="28" stroke="#00ff88" stroke-width="1" stroke-opacity="0.6"/>' +
    // Shoulder bumpers
    '<ellipse cx="24" cy="9.5" rx="11" ry="3.5" fill="rgba(0,80,180,0.5)" stroke="rgba(0,210,255,0.45)" stroke-width="0.8"/>' +
    '<ellipse cx="76" cy="9.5" rx="11" ry="3.5" fill="rgba(0,80,180,0.5)" stroke="rgba(0,210,255,0.45)" stroke-width="0.8"/>' +
    '</svg>'
  );
}

function toolIconSVG(id, color, w, h) {
  var fid = 'tif' + (++_sageOwlId);
  w = w || 56; h = h || 56;
  var flt = '<defs><filter id="' + fid + '" x="-40%" y="-40%" width="180%" height="180%">' +
    '<feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b"/>' +
    '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
    '</filter></defs>';
  var g  = ' filter="url(#' + fid + ')"';
  var sw = ' stroke="' + color + '" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"';
  var st = ' stroke="' + color + '" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"';
  var fc = ' fill="' + color + '"';
  var dk = ' fill="#07101a"';
  var inner = '';

  if (id === 'vscode') {
    inner =
      '<rect x="10" y="14" width="80" height="68" rx="5"' + sw + g + '/>' +
      '<line x1="10" y1="27" x2="90" y2="27"' + st + g + '/>' +
      '<circle cx="20" cy="20.5" r="2.5"' + fc + g + '/>' +
      '<circle cx="28" cy="20.5" r="2.5"' + fc + ' fill-opacity="0.4"' + g + '/>' +
      '<polyline points="37,42 26,52 37,62"' + sw + g + '/>' +
      '<line x1="56" y1="39" x2="44" y2="65"' + st + g + '/>' +
      '<polyline points="63,42 74,52 63,62"' + sw + g + '/>';
  } else if (id === 'git') {
    inner =
      '<line x1="34" y1="25" x2="34" y2="75"' + sw + g + '/>' +
      '<circle cx="34" cy="20" r="7" stroke="' + color + '" stroke-width="2.5"' + dk + g + '/>' +
      '<circle cx="34" cy="56" r="7" stroke="' + color + '" stroke-width="2.5"' + dk + g + '/>' +
      '<circle cx="34" cy="80" r="7" stroke="' + color + '" stroke-width="2.5"' + dk + g + '/>' +
      '<circle cx="70" cy="36" r="7" stroke="' + color + '" stroke-width="2.5"' + dk + g + '/>' +
      '<path d="M34,27 Q34,18 52,18 Q70,18 70,29"' + st + g + '/>' +
      '<path d="M70,43 Q70,56 52,56 Q34,56 34,56"' + st + g + '/>';
  } else if (id === 'github') {
    inner =
      '<circle cx="50" cy="38" r="22" stroke="' + color + '" stroke-width="2.5"' + dk + g + '/>' +
      '<path d="M36,22 Q33,13 39,11"' + st + g + '/>' +
      '<path d="M64,22 Q67,13 61,11"' + st + g + '/>' +
      '<path d="M36,58 Q30,68 27,78"' + sw + g + '/>' +
      '<path d="M43,62 Q41,71 39,80"' + sw + g + '/>' +
      '<line x1="50" y1="62" x2="50" y2="80"' + sw + g + '/>' +
      '<path d="M57,62 Q59,71 61,80"' + sw + g + '/>' +
      '<path d="M64,58 Q70,68 73,78"' + sw + g + '/>';
  } else if (id === 'devtools') {
    inner =
      '<circle cx="42" cy="42" r="26" stroke="' + color + '" stroke-width="2.5"' + dk + g + '/>' +
      '<line x1="61" y1="61" x2="83" y2="83" stroke="' + color + '" stroke-width="5" stroke-linecap="round"' + g + '/>' +
      '<line x1="42" y1="24" x2="42" y2="60"' + st + g + '/>' +
      '<line x1="24" y1="42" x2="60" y2="42"' + st + g + '/>' +
      '<circle cx="42" cy="42" r="9" stroke="' + color + '" stroke-width="1.5" fill="none"' + g + '/>';
  } else if (id === 'nodejs') {
    inner =
      '<polygon points="50,8 84,27 84,65 50,84 16,65 16,27" stroke="' + color + '" stroke-width="2.5"' + dk + g + '/>' +
      '<polygon points="50,22 72,34 72,58 50,70 28,58 28,34" stroke="' + color + '" stroke-width="1.5" fill="none"' + g + '/>' +
      '<circle cx="50" cy="46" r="9" stroke="' + color + '" stroke-width="2" fill="' + color + '" fill-opacity="0.25"' + g + '/>';
  } else if (id === 'netlify') {
    inner =
      '<polygon points="50,8 88,80 12,80" stroke="' + color + '" stroke-width="2.5"' + dk + g + '/>' +
      '<line x1="50" y1="28" x2="50" y2="63"' + st + g + '/>' +
      '<line x1="37" y1="57" x2="63" y2="57"' + st + g + '/>';
  } else if (id === 'figma') {
    inner =
      '<rect x="26" y="10" width="22" height="22" rx="4"  stroke="' + color + '" stroke-width="2.5"' + dk + g + '/>' +
      '<circle cx="60" cy="21" r="11" stroke="' + color + '" stroke-width="2.5"' + dk + g + '/>' +
      '<rect x="26" y="34" width="22" height="22" rx="4" stroke="' + color + '" stroke-width="2.5"' + dk + g + '/>' +
      '<circle cx="60" cy="45" r="11" stroke="' + color + '" stroke-width="2.5"' + dk + g + '/>' +
      '<rect x="26" y="58" width="22" height="22" rx="4" stroke="' + color + '" stroke-width="2.5"' + dk + g + '/>';
  } else if (id === 'postman') {
    inner =
      '<circle cx="50" cy="50" r="34" stroke="' + color + '" stroke-width="2.5"' + dk + g + '/>' +
      '<line x1="26" y1="50" x2="66" y2="50" stroke="' + color + '" stroke-width="2.5" stroke-linecap="round"' + g + '/>' +
      '<polyline points="57,40 67,50 57,60" stroke="' + color + '" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"' + g + '/>' +
      '<circle cx="32" cy="50" r="3.5"' + fc + g + '/>';
  } else if (id === 'davinci') {
    inner =
      '<rect x="12" y="28" width="76" height="54" rx="4" stroke="' + color + '" stroke-width="2.5"' + dk + g + '/>' +
      '<rect x="12" y="16" width="76" height="16" rx="4" stroke="' + color + '" stroke-width="2.5"' + dk + g + '/>' +
      '<line x1="30" y1="16" x2="26" y2="32"' + st + g + '/>' +
      '<line x1="46" y1="16" x2="42" y2="32"' + st + g + '/>' +
      '<line x1="62" y1="16" x2="58" y2="32"' + st + g + '/>' +
      '<polygon points="40,40 40,68 68,54" fill="' + color + '" fill-opacity="0.55" stroke="' + color + '" stroke-width="2" stroke-linejoin="round"' + g + '/>';
  }

  return '<svg viewBox="0 0 100 100" width="' + w + '" height="' + h + '" xmlns="http://www.w3.org/2000/svg" style="display:block">' +
    flt + inner + '</svg>';
}

function premiumIconSVG(id, w, h) {
  var fid = 'pmf' + (++_sageOwlId);
  var c = '#d4aa6a';
  w = w || 52; h = h || 52;
  var flt = '<defs><filter id="' + fid + '" x="-40%" y="-40%" width="180%" height="180%">' +
    '<feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/>' +
    '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
    '</filter></defs>';
  var g   = ' filter="url(#' + fid + ')"';
  var sw  = ' stroke="' + c + '" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"';
  var st  = ' stroke="' + c + '" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"';
  var dk  = ' fill="#07101a"';
  var fa  = ' fill="' + c + '" fill-opacity="0.22"';
  var fs  = ' fill="' + c + '"';
  var inner = '';

  if (id === 'floors') {
    inner =
      '<circle cx="36" cy="36" r="20"' + sw + dk + g + '/>' +
      '<circle cx="36" cy="36" r="10"' + st + ' fill="none"' + g + '/>' +
      '<line x1="51" y1="51" x2="78" y2="78" stroke="' + c + '" stroke-width="3.5" stroke-linecap="round"' + g + '/>' +
      '<line x1="63" y1="66" x2="70" y2="59" stroke="' + c + '" stroke-width="2" stroke-linecap="round"' + g + '/>' +
      '<line x1="72" y1="75" x2="79" y2="68" stroke="' + c + '" stroke-width="2" stroke-linecap="round"' + g + '/>';
  } else if (id === 'mentorship') {
    inner =
      '<circle cx="34" cy="26" r="13"' + sw + dk + g + '/>' +
      '<path d="M16,68 Q16,50 34,50 Q52,50 52,68"' + sw + g + '/>' +
      '<circle cx="70" cy="34" r="9"' + sw + dk + g + '/>' +
      '<path d="M58,72 Q58,58 70,58 Q82,58 82,72"' + st + g + '/>' +
      '<line x1="52" y1="34" x2="61" y2="34"' + st + g + '/>';
  } else if (id === 'reviews') {
    inner =
      '<rect x="18" y="22" width="58" height="64" rx="4"' + sw + dk + g + '/>' +
      '<rect x="36" y="14" width="22" height="14" rx="3"' + sw + dk + g + '/>' +
      '<line x1="30" y1="44" x2="64" y2="44"' + st + g + '/>' +
      '<line x1="30" y1="54" x2="64" y2="54"' + st + g + '/>' +
      '<line x1="30" y1="64" x2="50" y2="64"' + st + g + '/>' +
      '<polyline points="36,74 42,81 58,66" stroke="' + c + '" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"' + g + '/>';
  } else if (id === 'certificate') {
    inner =
      '<circle cx="50" cy="46" r="28"' + sw + dk + g + '/>' +
      '<circle cx="50" cy="46" r="18"' + st + ' fill="none"' + g + '/>' +
      '<polygon points="50,32 53,42 64,42 55,49 58,59 50,53 42,59 45,49 36,42 47,42" stroke="' + c + '" stroke-width="1.2" stroke-linejoin="round"' + fa + g + '/>' +
      '<line x1="32" y1="80" x2="42" y2="74"' + st + g + '/>' +
      '<line x1="68" y1="80" x2="58" y2="74"' + st + g + '/>' +
      '<path d="M42,74 Q50,84 58,74"' + sw + g + '/>';
  } else if (id === 'community') {
    inner =
      '<path d="M10,12 Q10,6 16,6 L84,6 Q90,6 90,12 L90,56 Q90,62 84,62 L40,62 L26,76 L26,62 L16,62 Q10,62 10,56 Z"' + sw + dk + g + '/>' +
      '<circle cx="32" cy="34" r="4"' + fs + g + '/>' +
      '<circle cx="50" cy="34" r="4"' + fs + g + '/>' +
      '<circle cx="68" cy="34" r="4"' + fs + ' fill-opacity="0.5"' + g + '/>';
  } else if (id === 'career') {
    inner =
      '<circle cx="50" cy="50" r="40"' + sw + dk + g + '/>' +
      '<circle cx="50" cy="50" r="27"' + st + ' fill="none"' + g + '/>' +
      '<circle cx="50" cy="50" r="13"' + st + fa + g + '/>' +
      '<circle cx="50" cy="50" r="3.5"' + fs + g + '/>' +
      '<line x1="10" y1="50" x2="37" y2="50"' + st + g + '/>' +
      '<line x1="63" y1="50" x2="90" y2="50"' + st + g + '/>' +
      '<line x1="50" y1="10" x2="50" y2="37"' + st + g + '/>' +
      '<line x1="50" y1="63" x2="50" y2="90"' + st + g + '/>';
  } else if (id === 'support') {
    inner =
      '<polygon points="57,8 28,50 50,50 43,92 72,42 50,42" stroke="' + c + '" stroke-width="2.5" stroke-linejoin="round"' + fa + g + '/>';
  } else if (id === 'resources') {
    inner =
      '<polygon points="50,10 84,28 84,72 50,90 16,72 16,28"' + sw + dk + g + '/>' +
      '<polygon points="50,10 84,28 50,46 16,28"' + st + fa + g + '/>' +
      '<line x1="50" y1="46" x2="50" y2="90"' + st + g + '/>' +
      '<line x1="16" y1="28" x2="50" y2="46"' + st + g + '/>' +
      '<line x1="84" y1="28" x2="50" y2="46"' + st + g + '/>';
  } else if (id === 'paths') {
    inner =
      '<circle cx="50" cy="50" r="40"' + sw + dk + g + '/>' +
      '<circle cx="50" cy="50" r="30"' + st + ' fill="none"' + g + '/>' +
      '<polygon points="50,20 44,50 50,56 56,50"' + sw + fs + g + '/>' +
      '<polygon points="50,80 44,50 50,44 56,50" stroke="' + c + '" stroke-width="1.5"' + fa + g + '/>' +
      '<line x1="12" y1="50" x2="20" y2="50"' + st + g + '/>' +
      '<line x1="80" y1="50" x2="88" y2="50"' + st + g + '/>';
  } else if (id === 'deepwork') {
    inner =
      '<path d="M18,54 Q18,14 50,14 Q82,14 82,54"' + sw + ' fill="none"' + g + '/>' +
      '<rect x="8" y="50" width="18" height="28" rx="9"' + sw + dk + g + '/>' +
      '<rect x="74" y="50" width="18" height="28" rx="9"' + sw + dk + g + '/>' +
      '<rect x="10" y="56" width="14" height="16" rx="7"' + st + fa + g + '/>' +
      '<rect x="76" y="56" width="14" height="16" rx="7"' + st + fa + g + '/>';
  } else if (id === 'projects') {
    inner =
      '<rect x="22" y="34" width="56" height="52" rx="3"' + sw + dk + g + '/>' +
      '<polygon points="50,10 14,34 86,34"' + sw + dk + g + '/>' +
      '<rect x="30" y="50" width="14" height="12" rx="2"' + st + ' fill="none"' + g + '/>' +
      '<rect x="56" y="50" width="14" height="12" rx="2"' + st + ' fill="none"' + g + '/>' +
      '<rect x="40" y="68" width="20" height="18" rx="2"' + st + fa + g + '/>';
  } else if (id === 'benchmarking') {
    inner =
      '<line x1="8" y1="84" x2="92" y2="84" stroke="' + c + '" stroke-width="2" stroke-linecap="round"' + g + '/>' +
      '<rect x="12" y="62" width="18" height="22" rx="2"' + sw + fa + g + '/>' +
      '<rect x="38" y="42" width="18" height="42" rx="2"' + sw + fa + g + '/>' +
      '<rect x="64" y="20" width="18" height="64" rx="2"' + sw + fa + g + '/>';
  } else if (id === 'ai') {
    inner =
      '<rect x="20" y="28" width="60" height="50" rx="6"' + sw + dk + g + '/>' +
      '<circle cx="36" cy="47" r="7"' + st + ' fill="none"' + g + '/>' +
      '<circle cx="64" cy="47" r="7"' + st + ' fill="none"' + g + '/>' +
      '<circle cx="36" cy="47" r="3"' + fs + ' fill-opacity="0.7"' + g + '/>' +
      '<circle cx="64" cy="47" r="3"' + fs + ' fill-opacity="0.7"' + g + '/>' +
      '<rect x="36" y="63" width="28" height="5" rx="2.5"' + st + fa + g + '/>' +
      '<line x1="50" y1="28" x2="50" y2="16"' + sw + g + '/>' +
      '<circle cx="50" cy="12" r="4"' + sw + fa + g + '/>' +
      '<line x1="20" y1="44" x2="10" y2="44"' + st + g + '/>' +
      '<circle cx="7" cy="44" r="2.5"' + fs + ' fill-opacity="0.6"' + g + '/>' +
      '<line x1="80" y1="44" x2="90" y2="44"' + st + g + '/>' +
      '<circle cx="93" cy="44" r="2.5"' + fs + ' fill-opacity="0.6"' + g + '/>';
  } else if (id === 'momentum') {
    inner =
      '<circle cx="50" cy="50" r="40"' + sw + dk + g + '/>' +
      '<polygon points="56,16 32,52 50,52 44,84 68,48 50,48" stroke="' + c + '" stroke-width="2.5" stroke-linejoin="round"' + fa + g + '/>';
  } else if (id === 'opportunities') {
    inner =
      '<rect x="10" y="38" width="80" height="50" rx="5"' + sw + dk + g + '/>' +
      '<path d="M36,38 Q36,22 50,22 Q64,22 64,38"' + sw + ' fill="none"' + g + '/>' +
      '<line x1="10" y1="60" x2="90" y2="60"' + st + g + '/>' +
      '<rect x="42" y="54" width="16" height="12" rx="3"' + st + fa + g + '/>';
  }

  return '<svg viewBox="0 0 100 100" width="' + w + '" height="' + h + '" xmlns="http://www.w3.org/2000/svg" style="display:block">' +
    flt + inner + '</svg>';
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatTime(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  if (h > 0) return '' + (h) + 'h ' + (m) + 'm';
  return '' + (m) + 'm';
}

// --- AUDIO SYSTEM ---
function playTone(frequency, duration, volume, type = 'sine') {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch(e) {}
}

function playFiveMinuteWarning() {
  // Single soft tone
  playTone(440, 0.6, 0.15);
}

function playOneMinuteWarning() {
  // Two quick tones
  playTone(523, 0.3, 0.2);
  setTimeout(() => playTone(523, 0.3, 0.2), 400);
}

function playCompletionSound() {
  // Three ascending tones — calm and satisfying
  playTone(523, 0.4, 0.2);
  setTimeout(() => playTone(659, 0.4, 0.2), 300);
  setTimeout(() => playTone(784, 0.6, 0.2), 600);
}

function animateCount(elId, from, to, outOf, duration) {
  var el = document.getElementById(elId);
  if (!el) return;
  var start = Date.now();
  var suffix = outOf !== null ? '/' + outOf : '';
  function tick() {
    var elapsed = Date.now() - start;
    var progress = Math.min(elapsed / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = Math.round(from + (to - from) * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function typewriteText(elId, text, msPerChar) {
  var el = document.getElementById(elId);
  if (!el) return;
  var i = 0;
  el.textContent = '';
  function next() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(next, msPerChar);
    }
  }
  next();
}

// ============================================
// SYSTEM 3 — GOLDEN DUST XP PARTICLES
// ============================================
function spawnGoldenDust(x, y) {
  const count = 12;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'xp-particle';
    const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.8;
    const dist  = 30 + Math.random() * 50;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist - 20;
    const dur = 0.6 + Math.random() * 0.5;
    const size = 3 + Math.random() * 4;
    particle.style.cssText =
  "left:" + x + "px; top:" + y + "px;" +
  "width:" + size + "px; height:" + size + "px;";

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), dur * 1000 + 100);
  }
}

// ============================================
// TL;DR SAGE SUMMARY
// ============================================
function sectionTldr(section) {
  if (!section || !section.body) return '';
  var raw = section.body.replace(/<[^>]+>/g, '').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  var m = raw.match(/^.{20,160}?[.!?](?=\s|$)/);
  var text = m ? m[0] : (raw.length > 130 ? raw.slice(0, 130) + '…' : raw);
  return text;
}
