export interface Team {
  id: string
  name: string
  shortName: string
  flag: string
  group: string
}

export const teams: Team[] = [
  { id: "mexico", name: "Mexico", shortName: "MEX", flag: "🇲🇽", group: "A" },
  { id: "south-africa", name: "South Africa", shortName: "RSA", flag: "🇿🇦", group: "A" },
  { id: "south-korea", name: "South Korea", shortName: "KOR", flag: "🇰🇷", group: "A" },
  { id: "czechia", name: "Czechia", shortName: "CZE", flag: "🇨🇿", group: "A" },

  { id: "canada", name: "Canada", shortName: "CAN", flag: "🇨🇦", group: "B" },
  { id: "switzerland", name: "Switzerland", shortName: "SUI", flag: "🇨🇭", group: "B" },
  { id: "qatar", name: "Qatar", shortName: "QAT", flag: "🇶🇦", group: "B" },
  { id: "bosnia", name: "Bosnia and Herzegovina", shortName: "BIH", flag: "🇧🇦", group: "B" },

  { id: "brazil", name: "Brazil", shortName: "BRA", flag: "🇧🇷", group: "C" },
  { id: "morocco", name: "Morocco", shortName: "MAR", flag: "🇲🇦", group: "C" },
  { id: "haiti", name: "Haiti", shortName: "HAI", flag: "🇭🇹", group: "C" },
  { id: "scotland", name: "Scotland", shortName: "SCO", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C" },

  { id: "usa", name: "United States", shortName: "USA", flag: "🇺🇸", group: "D" },
  { id: "paraguay", name: "Paraguay", shortName: "PAR", flag: "🇵🇾", group: "D" },
  { id: "australia", name: "Australia", shortName: "AUS", flag: "🇦🇺", group: "D" },
  { id: "turkiye", name: "Türkiye", shortName: "TUR", flag: "🇹🇷", group: "D" },

  { id: "germany", name: "Germany", shortName: "GER", flag: "🇩🇪", group: "E" },
  { id: "curacao", name: "Curaçao", shortName: "CUR", flag: "🇨🇼", group: "E" },
  { id: "ivory-coast", name: "Ivory Coast", shortName: "CIV", flag: "🇨🇮", group: "E" },
  { id: "ecuador", name: "Ecuador", shortName: "ECU", flag: "🇪🇨", group: "E" },

  { id: "netherlands", name: "Netherlands", shortName: "NED", flag: "🇳🇱", group: "F" },
  { id: "japan", name: "Japan", shortName: "JPN", flag: "🇯🇵", group: "F" },
  { id: "sweden", name: "Sweden", shortName: "SWE", flag: "🇸🇪", group: "F" },
  { id: "tunisia", name: "Tunisia", shortName: "TUN", flag: "🇹🇳", group: "F" },

  { id: "belgium", name: "Belgium", shortName: "BEL", flag: "🇧🇪", group: "G" },
  { id: "egypt", name: "Egypt", shortName: "EGY", flag: "🇪🇬", group: "G" },
  { id: "iran", name: "Iran", shortName: "IRN", flag: "🇮🇷", group: "G" },
  { id: "new-zealand", name: "New Zealand", shortName: "NZL", flag: "🇳🇿", group: "G" },

  { id: "spain", name: "Spain", shortName: "ESP", flag: "🇪🇸", group: "H" },
  { id: "cape-verde", name: "Cape Verde", shortName: "CPV", flag: "🇨🇻", group: "H" },
  { id: "saudi-arabia", name: "Saudi Arabia", shortName: "KSA", flag: "🇸🇦", group: "H" },
  { id: "uruguay", name: "Uruguay", shortName: "URU", flag: "🇺🇾", group: "H" },

  { id: "france", name: "France", shortName: "FRA", flag: "🇫🇷", group: "I" },
  { id: "senegal", name: "Senegal", shortName: "SEN", flag: "🇸🇳", group: "I" },
  { id: "iraq", name: "Iraq", shortName: "IRQ", flag: "🇮🇶", group: "I" },
  { id: "norway", name: "Norway", shortName: "NOR", flag: "🇳🇴", group: "I" },

  { id: "argentina", name: "Argentina", shortName: "ARG", flag: "🇦🇷", group: "J" },
  { id: "algeria", name: "Algeria", shortName: "ALG", flag: "🇩🇿", group: "J" },
  { id: "austria", name: "Austria", shortName: "AUT", flag: "🇦🇹", group: "J" },
  { id: "jordan", name: "Jordan", shortName: "JOR", flag: "🇯🇴", group: "J" },

  { id: "portugal", name: "Portugal", shortName: "POR", flag: "🇵🇹", group: "K" },
  { id: "dr-congo", name: "DR Congo", shortName: "COD", flag: "🇨🇩", group: "K" },
  { id: "uzbekistan", name: "Uzbekistan", shortName: "UZB", flag: "🇺🇿", group: "K" },
  { id: "colombia", name: "Colombia", shortName: "COL", flag: "🇨🇴", group: "K" },

  { id: "england", name: "England", shortName: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L" },
  { id: "croatia", name: "Croatia", shortName: "CRO", flag: "🇭🇷", group: "L" },
  { id: "ghana", name: "Ghana", shortName: "GHA", flag: "🇬🇭", group: "L" },
  { id: "panama", name: "Panama", shortName: "PAN", flag: "🇵🇦", group: "L" },
]

export function getTeam(id: string): Team | undefined {
  return teams.find((t) => t.id === id)
}

export function getTeamsByGroup(group: string): Team[] {
  return teams.filter((t) => t.group === group)
}

export const groupLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]
