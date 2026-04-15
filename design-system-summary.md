# Design System Summary

## Colors
| Value | Used For |
| --- | --- |
| #04060f / rgb(4, 6, 15) | background |
| #080c18 / rgb(8, 12, 24) | surface |
| #0d1424 / rgb(13, 20, 36) | cards |
| #121b30 / rgb(18, 27, 48) | elevated surface |
| #5b7eff / rgb(91, 126, 255) | accent |
| #a78bfa / rgb(167, 139, 250) | secondary accent |
| #2eb9ff / rgb(46, 185, 255) | highlight |
| #16539b / rgb(22, 83, 155) | buttons |
| #eef2ff / rgb(238, 242, 255) | primary text |
| #7086b8 / rgb(112, 134, 184) | body text |
| #6b7fa8 / rgb(107, 127, 168) | muted text |
| #2e3a52 / rgb(46, 58, 82) | dim text |
| rgba(99, 130, 255, 0.1) | border |
| rgba(99, 130, 255, 0.22) | strong border |

## Fonts
| Value | Used For |
| --- | --- |
| Montserrat | titles |
| IBM Plex Sans | body |
| Geist Mono | monospace |

## Font Sizes
| Value | Used For |
| --- | --- |
| clamp(48px, 6vw, 80px) | display |
| clamp(34px, 4.4vw, 62px) | hero |
| clamp(24px, 3vw, 40px) | section heading |
| 20px | subsection heading |
| 18px | card title |
| 16px | body |
| 14px | small text |
| 12px | label |
| 11px | footer/meta |
| 10px | tiny label |

## Buttons
| Value | Used For |
| --- | --- |
| #16539b / rgb(22, 83, 155) | primary buttons |
| #1e68c0 / rgb(30, 104, 192) | hover state |
| rgba(22, 83, 155, 0.08) | outline hover |
| rgba(22, 83, 155, 0.12) | social pill background |
| rgba(22, 83, 155, 0.22) | social pill border |

## Font Weights
| Value | Used For |
| --- | --- |
| 300 | body light |
| 400 | body |
| 500 | links/buttons |
| 600 | subheads |
| 700 | headings |
| 800 | hero/display |

## Spacing
| Value | Used For |
| --- | --- |
| 60px | navbar height |
| calc(100svh - 72px) | shared hero shell minimum height |
| 112px 3rem 28px | shared hero shell padding |
| 56px 3rem 64px | shared second-section top/bottom spacing |
| 64px | shared hero column gap |
| 84px 3rem | what-we-do padding |
| 20px 18px | pillar card padding |
| 10px 22px | button padding |
| 8px 14px | footer pill padding |
| 2.5rem | navbar horizontal padding |
| 3rem | section horizontal padding |

## Page Patterns
| Pattern | Rule |
| --- | --- |
| First section alignment | The first visible section on every page should start at the same height and use the same width/margin rules as the shared hero shell |
| Shared hero shell | Use the same max width, minimum height, top padding, and top-aligned columns on Home/About |
| Shared second section | Keep first-to-second section spacing consistent across pages |
| About hero | Left copy plus right live signal board, no shaded card grid; signals auto-cycle and can be hovered to focus |
| About organigram | External network is separate from the club core; President sits beside Board, Board coordinates committees, members live below the core |
| Committee nodes | Compact button-like tiles with centered icon and text, no arrow affordance |

## Implementation Notes
| Rule | Use |
| --- | --- |
| Shared first-section shell | Reuse the same max width, `calc(100svh - 72px)` min-height, `112px 3rem 28px` padding, and `align-items: start` |
| Do not diverge | New pages must reuse the shared hero shell and shared second-section spacing; page-specific hero offsets are not allowed |
