import { 
  SiTypescript, SiJavascript, SiPython, SiOpenjdk, SiCplusplus, SiRust, SiGo, 
  SiReact, SiJson, SiMarkdown, SiYaml, SiDocker, SiGnubash, SiCss3, SiHtml5,
  SiNodedotjs, SiPhp, SiKotlin, SiSwift, SiDart, SiElixir, SiHaskell,
  SiScala, SiPerl, SiLua, SiR, SiJulia, SiMysql, SiPostgresql, SiMongodb, SiRedis,
  SiGraphql, SiVim, SiNeovim, SiGit
} from "react-icons/si"

export interface User {
  userId: string
  name: string
  githubUsername: string | null
  twitterUsername: string | null
  image: string
  totalTimeToday: number // Time in seconds
  languageWiseTime: Record<string, number> // Time in seconds per language
  lastPing?: string | null
  isOnline: boolean
}

export interface LeaderboardResponse {
  leaderboard: User[]
  pagination: {
    currentPage: number
    totalPages: number
    totalUsers: number
    usersPerPage: number
  }
}

export interface TopCoderWithPosition extends User {
  position: number
}

export interface LeaderboardUser extends User {
  place: number
}

export const formatTime = (seconds: number) => {
  // Handle case where seconds might be undefined, null, or NaN
  if (!seconds || isNaN(seconds) || seconds < 0) {
    return '0h 0m'
  }
  
  const hours = Math.floor(seconds / (60 * 60))
  const minutes = Math.floor((seconds % (60 * 60)) / 60)
  
  return `${hours}h ${minutes}m`
}

export const getTopLanguage = (languageWiseTime: Record<string, number>) => {
  const entries = Object.entries(languageWiseTime)
  if (entries.length === 0) return "None"
  const topEntry = entries.reduce((max, current) => current[1] > max[1] ? current : max)
  return topEntry[0]
}

export const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    typescript: "text-blue-400",
    javascript: "text-yellow-400", 
    python: "text-green-400",
    java: "text-red-400",
    cpp: "text-purple-400",
    rust: "text-orange-400",
    go: "text-cyan-400",
    typescriptreact: "text-blue-300",
    json: "text-gray-400",
    markdown: "text-indigo-400",
    yaml: "text-pink-400",
    dockerfile: "text-blue-600",
    shellscript: "text-green-300",
    css: "text-blue-500",
    html: "text-orange-500",
  }
  return colors[language.toLowerCase()] || "text-gray-400"
}

export const getLanguageIcon = (language: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
    typescript: SiTypescript,
    javascript: SiJavascript,
    python: SiPython,
    java: SiOpenjdk,
    cpp: SiCplusplus,
    "c++": SiCplusplus,
    rust: SiRust,
    go: SiGo,
    golang: SiGo,
    typescriptreact: SiReact,
    javascriptreact: SiReact,
    react: SiReact,
    json: SiJson,
    markdown: SiMarkdown,
    yaml: SiYaml,
    yml: SiYaml,
    dockerfile: SiDocker,
    docker: SiDocker,
    shellscript: SiGnubash,
    bash: SiGnubash,
    shell: SiGnubash,
    css: SiCss3,
    html: SiHtml5,
    nodejs: SiNodedotjs,
    node: SiNodedotjs,
    php: SiPhp,
    kotlin: SiKotlin,
    swift: SiSwift,
    dart: SiDart,
    elixir: SiElixir,
    haskell: SiHaskell,
    scala: SiScala,
    perl: SiPerl,
    lua: SiLua,
    r: SiR,
    julia: SiJulia,
    mysql: SiMysql,
    postgresql: SiPostgresql,
    postgres: SiPostgresql,
    mongodb: SiMongodb,
    mongo: SiMongodb,
    redis: SiRedis,
    graphql: SiGraphql,
    vim: SiVim,
    neovim: SiNeovim,
    git: SiGit,
  }
  
  const normalizedLanguage = language.toLowerCase().replace(/[^a-z0-9]/g, '')
  return iconMap[normalizedLanguage] || null
}

export const formatLanguages = (languageWiseTime: Record<string, number>) => {
  const entries = Object.entries(languageWiseTime)
    .sort(([, a], [, b]) => b - a) // Sort by time spent (descending)
    .slice(0, 5) // Show top 5 languages to avoid clutter
  
  return entries.map(([language, timeInSeconds]) => ({
    language,
    time: timeInSeconds,
    formattedTime: formatTime(timeInSeconds)
  }))
}

export const getRankHighlight = (position: number) => {
  switch (position) {
    case 1:
      return {
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        textColor: '#FFD700'
      }
    case 2:
      return {
        borderColor: '#C0C0C0',
        backgroundColor: 'rgba(192, 192, 192, 0.1)',
        textColor: '#C0C0C0'
      }
    case 3:
      return {
        borderColor: '#CD7F32',
        backgroundColor: 'rgba(205, 127, 50, 0.1)',
        textColor: '#CD7F32'
      }
    default:
      return {
        borderColor: '#30363D',
        backgroundColor: '#161B22',
        textColor: '#8B949E'
      }
  }
}

// API functions
export const fetchLeaderboard = async (page: number = 1, timeframe: 'daily' | 'weekly' = 'daily'): Promise<LeaderboardResponse> => {
  try {
    const endpoint = timeframe === 'weekly' ? 'weekly' : 'leaderboard'
    const response = await fetch(`/api/${endpoint}?currentPage=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || 'Unknown error'}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    throw error
  }
} 