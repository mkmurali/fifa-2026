export type MatchStatus = "scheduled" | "live" | "finished"

export interface Match {
  id: string
  round: string
  group?: string
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  date: string
  time: string
  venue: string
  status: MatchStatus
}

const J = (d: number) => `2026-06-${String(d).padStart(2, "0")}`
const JL = (d: number) => `2026-07-${String(d).padStart(2, "0")}`

export const matches: Match[] = [
  // ===== GROUP STAGE =====

  // --- Group A ---
  { id: "a1", round: "Group Stage", group: "A", homeTeam: "mexico", awayTeam: "south-africa", date: J(11), time: "17:00", venue: "azteca", status: "scheduled" },
  { id: "a2", round: "Group Stage", group: "A", homeTeam: "south-korea", awayTeam: "czechia", date: J(11), time: "22:00", venue: "akron", status: "scheduled" },
  { id: "a3", round: "Group Stage", group: "A", homeTeam: "czechia", awayTeam: "south-africa", date: J(18), time: "13:00", venue: "mercedes", status: "scheduled" },
  { id: "a4", round: "Group Stage", group: "A", homeTeam: "mexico", awayTeam: "south-korea", date: J(18), time: "23:00", venue: "akron", status: "scheduled" },
  { id: "a5", round: "Group Stage", group: "A", homeTeam: "czechia", awayTeam: "mexico", date: J(24), time: "23:00", venue: "azteca", status: "scheduled" },
  { id: "a6", round: "Group Stage", group: "A", homeTeam: "south-africa", awayTeam: "south-korea", date: J(24), time: "23:00", venue: "bbva", status: "scheduled" },

  // --- Group B ---
  { id: "b1", round: "Group Stage", group: "B", homeTeam: "canada", awayTeam: "bosnia", date: J(12), time: "16:00", venue: "bmofield", status: "scheduled" },
  { id: "b2", round: "Group Stage", group: "B", homeTeam: "qatar", awayTeam: "switzerland", date: J(13), time: "19:00", venue: "levis", status: "scheduled" },
  { id: "b3", round: "Group Stage", group: "B", homeTeam: "switzerland", awayTeam: "bosnia", date: J(18), time: "19:00", venue: "sofi", status: "scheduled" },
  { id: "b4", round: "Group Stage", group: "B", homeTeam: "canada", awayTeam: "qatar", date: J(18), time: "22:00", venue: "bcplace", status: "scheduled" },
  { id: "b5", round: "Group Stage", group: "B", homeTeam: "switzerland", awayTeam: "canada", date: J(24), time: "19:00", venue: "bcplace", status: "scheduled" },
  { id: "b6", round: "Group Stage", group: "B", homeTeam: "bosnia", awayTeam: "qatar", date: J(24), time: "19:00", venue: "lumen", status: "scheduled" },

  // --- Group C ---
  { id: "c1", round: "Group Stage", group: "C", homeTeam: "brazil", awayTeam: "morocco", date: J(13), time: "19:00", venue: "metlife", status: "scheduled" },
  { id: "c2", round: "Group Stage", group: "C", homeTeam: "haiti", awayTeam: "scotland", date: J(13), time: "22:00", venue: "gillette", status: "scheduled" },
  { id: "c3", round: "Group Stage", group: "C", homeTeam: "scotland", awayTeam: "morocco", date: J(19), time: "19:00", venue: "gillette", status: "scheduled" },
  { id: "c4", round: "Group Stage", group: "C", homeTeam: "brazil", awayTeam: "haiti", date: J(19), time: "22:00", venue: "linc", status: "scheduled" },
  { id: "c5", round: "Group Stage", group: "C", homeTeam: "scotland", awayTeam: "brazil", date: J(24), time: "19:00", venue: "hardrock", status: "scheduled" },
  { id: "c6", round: "Group Stage", group: "C", homeTeam: "morocco", awayTeam: "haiti", date: J(24), time: "19:00", venue: "mercedes", status: "scheduled" },

  // --- Group D ---
  { id: "d1", round: "Group Stage", group: "D", homeTeam: "usa", awayTeam: "paraguay", date: J(12), time: "21:00", venue: "sofi", status: "scheduled" },
  { id: "d2", round: "Group Stage", group: "D", homeTeam: "australia", awayTeam: "turkiye", date: J(13), time: "22:00", venue: "bcplace", status: "scheduled" },
  { id: "d3", round: "Group Stage", group: "D", homeTeam: "turkiye", awayTeam: "paraguay", date: J(19), time: "22:00", venue: "levis", status: "scheduled" },
  { id: "d4", round: "Group Stage", group: "D", homeTeam: "usa", awayTeam: "australia", date: J(19), time: "19:00", venue: "lumen", status: "scheduled" },
  { id: "d5", round: "Group Stage", group: "D", homeTeam: "turkiye", awayTeam: "usa", date: J(25), time: "02:00", venue: "sofi", status: "scheduled" },
  { id: "d6", round: "Group Stage", group: "D", homeTeam: "paraguay", awayTeam: "australia", date: J(25), time: "02:00", venue: "levis", status: "scheduled" },

  // --- Group E ---
  { id: "e1", round: "Group Stage", group: "E", homeTeam: "germany", awayTeam: "curacao", date: J(14), time: "15:00", venue: "nrg", status: "scheduled" },
  { id: "e2", round: "Group Stage", group: "E", homeTeam: "ivory-coast", awayTeam: "ecuador", date: J(14), time: "20:00", venue: "linc", status: "scheduled" },
  { id: "e3", round: "Group Stage", group: "E", homeTeam: "germany", awayTeam: "ivory-coast", date: J(20), time: "17:00", venue: "bmofield", status: "scheduled" },
  { id: "e4", round: "Group Stage", group: "E", homeTeam: "ecuador", awayTeam: "curacao", date: J(20), time: "20:00", venue: "arrowhead", status: "scheduled" },
  { id: "e5", round: "Group Stage", group: "E", homeTeam: "ecuador", awayTeam: "germany", date: J(25), time: "17:00", venue: "metlife", status: "scheduled" },
  { id: "e6", round: "Group Stage", group: "E", homeTeam: "curacao", awayTeam: "ivory-coast", date: J(25), time: "17:00", venue: "linc", status: "scheduled" },

  // --- Group F ---
  { id: "f1", round: "Group Stage", group: "F", homeTeam: "netherlands", awayTeam: "japan", date: J(14), time: "18:00", venue: "att", status: "scheduled" },
  { id: "f2", round: "Group Stage", group: "F", homeTeam: "sweden", awayTeam: "tunisia", date: J(14), time: "22:00", venue: "bbva", status: "scheduled" },
  { id: "f3", round: "Group Stage", group: "F", homeTeam: "netherlands", awayTeam: "sweden", date: J(20), time: "15:00", venue: "nrg", status: "scheduled" },
  { id: "f4", round: "Group Stage", group: "F", homeTeam: "tunisia", awayTeam: "japan", date: J(20), time: "23:00", venue: "bbva", status: "scheduled" },
  { id: "f5", round: "Group Stage", group: "F", homeTeam: "japan", awayTeam: "sweden", date: J(25), time: "21:00", venue: "att", status: "scheduled" },
  { id: "f6", round: "Group Stage", group: "F", homeTeam: "tunisia", awayTeam: "netherlands", date: J(25), time: "21:00", venue: "arrowhead", status: "scheduled" },

  // --- Group G ---
  { id: "g1", round: "Group Stage", group: "G", homeTeam: "belgium", awayTeam: "egypt", date: J(15), time: "19:00", venue: "lumen", status: "scheduled" },
  { id: "g2", round: "Group Stage", group: "G", homeTeam: "iran", awayTeam: "new-zealand", date: J(15), time: "21:00", venue: "sofi", status: "scheduled" },
  { id: "g3", round: "Group Stage", group: "G", homeTeam: "belgium", awayTeam: "iran", date: J(21), time: "19:00", venue: "sofi", status: "scheduled" },
  { id: "g4", round: "Group Stage", group: "G", homeTeam: "new-zealand", awayTeam: "egypt", date: J(21), time: "22:00", venue: "bcplace", status: "scheduled" },
  { id: "g5", round: "Group Stage", group: "G", homeTeam: "egypt", awayTeam: "iran", date: J(26), time: "22:00", venue: "lumen", status: "scheduled" },
  { id: "g6", round: "Group Stage", group: "G", homeTeam: "new-zealand", awayTeam: "belgium", date: J(26), time: "22:00", venue: "bcplace", status: "scheduled" },

  // --- Group H ---
  { id: "h1", round: "Group Stage", group: "H", homeTeam: "spain", awayTeam: "cape-verde", date: J(15), time: "13:00", venue: "mercedes", status: "scheduled" },
  { id: "h2", round: "Group Stage", group: "H", homeTeam: "saudi-arabia", awayTeam: "uruguay", date: J(15), time: "19:00", venue: "hardrock", status: "scheduled" },
  { id: "h3", round: "Group Stage", group: "H", homeTeam: "spain", awayTeam: "saudi-arabia", date: J(21), time: "13:00", venue: "mercedes", status: "scheduled" },
  { id: "h4", round: "Group Stage", group: "H", homeTeam: "uruguay", awayTeam: "cape-verde", date: J(21), time: "19:00", venue: "hardrock", status: "scheduled" },
  { id: "h5", round: "Group Stage", group: "H", homeTeam: "cape-verde", awayTeam: "saudi-arabia", date: J(26), time: "22:00", venue: "nrg", status: "scheduled" },
  { id: "h6", round: "Group Stage", group: "H", homeTeam: "uruguay", awayTeam: "spain", date: J(26), time: "22:00", venue: "akron", status: "scheduled" },

  // --- Group I ---
  { id: "i1", round: "Group Stage", group: "I", homeTeam: "france", awayTeam: "senegal", date: J(16), time: "16:00", venue: "metlife", status: "scheduled" },
  { id: "i2", round: "Group Stage", group: "I", homeTeam: "iraq", awayTeam: "norway", date: J(16), time: "19:00", venue: "gillette", status: "scheduled" },
  { id: "i3", round: "Group Stage", group: "I", homeTeam: "france", awayTeam: "iraq", date: J(22), time: "18:00", venue: "linc", status: "scheduled" },
  { id: "i4", round: "Group Stage", group: "I", homeTeam: "norway", awayTeam: "senegal", date: J(22), time: "21:00", venue: "metlife", status: "scheduled" },
  { id: "i5", round: "Group Stage", group: "I", homeTeam: "norway", awayTeam: "france", date: J(26), time: "16:00", venue: "gillette", status: "scheduled" },
  { id: "i6", round: "Group Stage", group: "I", homeTeam: "senegal", awayTeam: "iraq", date: J(26), time: "16:00", venue: "bmofield", status: "scheduled" },

  // --- Group J ---
  { id: "j1", round: "Group Stage", group: "J", homeTeam: "argentina", awayTeam: "algeria", date: J(16), time: "21:00", venue: "arrowhead", status: "scheduled" },
  { id: "j2", round: "Group Stage", group: "J", homeTeam: "austria", awayTeam: "jordan", date: J(16), time: "23:00", venue: "levis", status: "scheduled" },
  { id: "j3", round: "Group Stage", group: "J", homeTeam: "argentina", awayTeam: "austria", date: J(22), time: "15:00", venue: "att", status: "scheduled" },
  { id: "j4", round: "Group Stage", group: "J", homeTeam: "jordan", awayTeam: "algeria", date: J(22), time: "23:00", venue: "levis", status: "scheduled" },
  { id: "j5", round: "Group Stage", group: "J", homeTeam: "algeria", awayTeam: "austria", date: J(27), time: "20:00", venue: "arrowhead", status: "scheduled" },
  { id: "j6", round: "Group Stage", group: "J", homeTeam: "jordan", awayTeam: "argentina", date: J(27), time: "20:00", venue: "att", status: "scheduled" },

  // --- Group K ---
  { id: "k1", round: "Group Stage", group: "K", homeTeam: "portugal", awayTeam: "dr-congo", date: J(17), time: "15:00", venue: "nrg", status: "scheduled" },
  { id: "k2", round: "Group Stage", group: "K", homeTeam: "uzbekistan", awayTeam: "colombia", date: J(17), time: "22:00", venue: "azteca", status: "scheduled" },
  { id: "k3", round: "Group Stage", group: "K", homeTeam: "portugal", awayTeam: "uzbekistan", date: J(23), time: "15:00", venue: "akron", status: "scheduled" },
  { id: "k4", round: "Group Stage", group: "K", homeTeam: "colombia", awayTeam: "dr-congo", date: J(23), time: "22:00", venue: "akron", status: "scheduled" },
  { id: "k5", round: "Group Stage", group: "K", homeTeam: "colombia", awayTeam: "portugal", date: J(27), time: "22:30", venue: "hardrock", status: "scheduled" },
  { id: "k6", round: "Group Stage", group: "K", homeTeam: "dr-congo", awayTeam: "uzbekistan", date: J(27), time: "22:30", venue: "mercedes", status: "scheduled" },

  // --- Group L ---
  { id: "l1", round: "Group Stage", group: "L", homeTeam: "england", awayTeam: "croatia", date: J(17), time: "18:00", venue: "att", status: "scheduled" },
  { id: "l2", round: "Group Stage", group: "L", homeTeam: "ghana", awayTeam: "panama", date: J(17), time: "20:00", venue: "bmofield", status: "scheduled" },
  { id: "l3", round: "Group Stage", group: "L", homeTeam: "england", awayTeam: "ghana", date: J(23), time: "17:00", venue: "gillette", status: "scheduled" },
  { id: "l4", round: "Group Stage", group: "L", homeTeam: "panama", awayTeam: "croatia", date: J(23), time: "20:00", venue: "bmofield", status: "scheduled" },
  { id: "l5", round: "Group Stage", group: "L", homeTeam: "panama", awayTeam: "england", date: J(27), time: "18:00", venue: "metlife", status: "scheduled" },
  { id: "l6", round: "Group Stage", group: "L", homeTeam: "croatia", awayTeam: "ghana", date: J(27), time: "18:00", venue: "linc", status: "scheduled" },

  // ===== KNOCKOUT STAGE =====

  // Round of 32 (June 28 - July 3)
  // Match 73: RU A vs RU B
  { id: "r32-73", round: "Round of 32", homeTeam: "runner-up-a", awayTeam: "runner-up-b", date: J(28), time: "17:00", venue: "sofi", status: "scheduled" },
  // Match 74: W E vs 3rd A/B/C/D/F
  { id: "r32-74", round: "Round of 32", homeTeam: "winner-e", awayTeam: "3rd-ab-cdf", date: J(29), time: "17:00", venue: "gillette", status: "scheduled" },
  // Match 75: W F vs RU C
  { id: "r32-75", round: "Round of 32", homeTeam: "winner-f", awayTeam: "runner-up-c", date: J(29), time: "20:00", venue: "bbva", status: "scheduled" },
  // Match 76: W C vs RU F
  { id: "r32-76", round: "Round of 32", homeTeam: "winner-c", awayTeam: "runner-up-f", date: J(29), time: "20:00", venue: "nrg", status: "scheduled" },
  // Match 77: W I vs 3rd C/D/F/G/H
  { id: "r32-77", round: "Round of 32", homeTeam: "winner-i", awayTeam: "3rd-cd-fgh", date: J(30), time: "17:00", venue: "metlife", status: "scheduled" },
  // Match 78: RU E vs RU I
  { id: "r32-78", round: "Round of 32", homeTeam: "runner-up-e", awayTeam: "runner-up-i", date: J(30), time: "20:00", venue: "arrowhead", status: "scheduled" },
  // Match 79: W A vs 3rd C/E/F/H/I
  { id: "r32-79", round: "Round of 32", homeTeam: "winner-a", awayTeam: "3rd-ce-fhi", date: JL(1), time: "17:00", venue: "linc", status: "scheduled" },
  // Match 80: W L vs 3rd E/H/I/J/K
  { id: "r32-80", round: "Round of 32", homeTeam: "winner-l", awayTeam: "3rd-eh-ijk", date: JL(1), time: "20:00", venue: "lumen", status: "scheduled" },
  // Match 81: W D vs 3rd B/E/F/I/J
  { id: "r32-81", round: "Round of 32", homeTeam: "winner-d", awayTeam: "3rd-be-fij", date: JL(1), time: "17:00", venue: "levis", status: "scheduled" },
  // Match 82: W G vs 3rd A/E/H/I/J
  { id: "r32-82", round: "Round of 32", homeTeam: "winner-g", awayTeam: "3rd-ae-hij", date: JL(1), time: "20:00", venue: "mercedes", status: "scheduled" },
  // Match 83: RU K vs RU L
  { id: "r32-83", round: "Round of 32", homeTeam: "runner-up-k", awayTeam: "runner-up-l", date: JL(2), time: "17:00", venue: "hardrock", status: "scheduled" },
  // Match 84: W H vs RU J
  { id: "r32-84", round: "Round of 32", homeTeam: "winner-h", awayTeam: "runner-up-j", date: JL(2), time: "20:00", venue: "att", status: "scheduled" },
  // Match 85: W B vs 3rd E/F/G/I/J
  { id: "r32-85", round: "Round of 32", homeTeam: "winner-b", awayTeam: "3rd-ef-gij", date: JL(2), time: "17:00", venue: "nrg", status: "scheduled" },
  // Match 86: W J vs RU H
  { id: "r32-86", round: "Round of 32", homeTeam: "winner-j", awayTeam: "runner-up-h", date: JL(2), time: "20:00", venue: "lumen", status: "scheduled" },
  // Match 87: W K vs 3rd D/E/I/J/L
  { id: "r32-87", round: "Round of 32", homeTeam: "winner-k", awayTeam: "3rd-de-ijl", date: JL(3), time: "17:00", venue: "levis", status: "scheduled" },
  // Match 88: RU D vs RU G
  { id: "r32-88", round: "Round of 32", homeTeam: "runner-up-d", awayTeam: "runner-up-g", date: JL(3), time: "20:00", venue: "azteca", status: "scheduled" },

  // --- Round of 16 (July 4-7) ---
  // Match 89: W 73 vs W 75
  { id: "r16-89", round: "Round of 16", homeTeam: "winner-r32-73", awayTeam: "winner-r32-75", date: JL(4), time: "17:00", venue: "hardrock", status: "scheduled" },
  // Match 90: W 74 vs W 77
  { id: "r16-90", round: "Round of 16", homeTeam: "winner-r32-74", awayTeam: "winner-r32-77", date: JL(4), time: "20:00", venue: "nrg", status: "scheduled" },
  // Match 91: W 76 vs W 78
  { id: "r16-91", round: "Round of 16", homeTeam: "winner-r32-76", awayTeam: "winner-r32-78", date: JL(5), time: "17:00", venue: "att", status: "scheduled" },
  // Match 92: W 79 vs W 80
  { id: "r16-92", round: "Round of 16", homeTeam: "winner-r32-79", awayTeam: "winner-r32-80", date: JL(5), time: "20:00", venue: "sofi", status: "scheduled" },
  // Match 93: W 83 vs W 84
  { id: "r16-93", round: "Round of 16", homeTeam: "winner-r32-83", awayTeam: "winner-r32-84", date: JL(6), time: "17:00", venue: "mercedes", status: "scheduled" },
  // Match 94: W 81 vs W 82
  { id: "r16-94", round: "Round of 16", homeTeam: "winner-r32-81", awayTeam: "winner-r32-82", date: JL(6), time: "20:00", venue: "metlife", status: "scheduled" },
  // Match 95: W 86 vs W 88
  { id: "r16-95", round: "Round of 16", homeTeam: "winner-r32-86", awayTeam: "winner-r32-88", date: JL(7), time: "17:00", venue: "arrowhead", status: "scheduled" },
  // Match 96: W 85 vs W 87
  { id: "r16-96", round: "Round of 16", homeTeam: "winner-r32-85", awayTeam: "winner-r32-87", date: JL(7), time: "20:00", venue: "linc", status: "scheduled" },

  // --- Quarter-finals (July 9-11) ---
  { id: "qf-97", round: "Quarter-finals", homeTeam: "winner-r16-89", awayTeam: "winner-r16-90", date: JL(9), time: "17:00", venue: "sofi", status: "scheduled" },
  { id: "qf-98", round: "Quarter-finals", homeTeam: "winner-r16-91", awayTeam: "winner-r16-92", date: JL(9), time: "20:00", venue: "att", status: "scheduled" },
  { id: "qf-99", round: "Quarter-finals", homeTeam: "winner-r16-93", awayTeam: "winner-r16-94", date: JL(10), time: "17:00", venue: "mercedes", status: "scheduled" },
  { id: "qf-100", round: "Quarter-finals", homeTeam: "winner-r16-95", awayTeam: "winner-r16-96", date: JL(10), time: "20:00", venue: "metlife", status: "scheduled" },

  // --- Semi-finals (July 14-15) ---
  { id: "sf-101", round: "Semi-finals", homeTeam: "winner-qf-97", awayTeam: "winner-qf-98", date: JL(14), time: "17:00", venue: "att", status: "scheduled" },
  { id: "sf-102", round: "Semi-finals", homeTeam: "winner-qf-99", awayTeam: "winner-qf-100", date: JL(15), time: "17:00", venue: "mercedes", status: "scheduled" },

  // --- Third Place (July 18) ---
  { id: "3p-103", round: "Third Place", homeTeam: "loser-sf-101", awayTeam: "loser-sf-102", date: JL(18), time: "17:00", venue: "hardrock", status: "scheduled" },

  // --- Final (July 19) ---
  { id: "fin-104", round: "Final", homeTeam: "winner-sf-101", awayTeam: "winner-sf-102", date: JL(19), time: "15:00", venue: "metlife", status: "scheduled" },
]

export function getMatch(id: string): Match | undefined {
  return matches.find((m) => m.id === id)
}

export function getMatchesByRound(round: string): Match[] {
  return matches.filter((m) => m.round === round)
}

export function getMatchesByGroup(group: string): Match[] {
  return matches.filter((m) => m.group === group)
}
