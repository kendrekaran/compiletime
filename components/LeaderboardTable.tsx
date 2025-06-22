import Image from "next/image"
import { Loader2 } from "lucide-react"
import { 
  User,
  LeaderboardUser,
  formatTime, 
  getLanguageColor, 
  getLanguageIcon, 
  formatLanguages
} from "@/lib/leaderboard-utils"

interface LeaderboardTableProps {
  leaderboardData: LeaderboardUser[]
  loadingMore: boolean
  currentPage: number
  totalPages: number
  users: User[]
  loadMoreRef: React.RefObject<HTMLDivElement | null>
}

export default function LeaderboardTable({ 
  leaderboardData, 
  loadingMore, 
  currentPage, 
  totalPages, 
  users, 
  loadMoreRef 
}: LeaderboardTableProps) {
  return (
    <div className="rounded-lg border overflow-x-auto" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
      <div className="min-w-full">
        <div className="grid grid-cols-[80px_1fr_120px_2fr_120px] gap-4 p-4 border-b text-sm font-medium" style={{ borderColor: '#30363D', color: '#8B949E' }}>
          <div>Rank</div>
          <div>Developer</div>
          <div>Time Today</div>
          <div>Languages</div>
          <div>Status</div>
        </div>

        {leaderboardData.map((coder) => (
          <div
            key={coder.userId}
            className="grid grid-cols-[80px_1fr_120px_2fr_120px] gap-4 p-4 border-b last:border-b-0 hover:opacity-80 transition-opacity items-center"
            style={{ borderColor: '#30363D' }}
          >
            <div className="font-medium" style={{ color: '#8B949E' }}>#{coder.place}</div>
            <div className="flex items-center space-x-3 min-w-0">
              <div className="relative flex-shrink-0">
                <Image
                  src={coder.image}
                  alt={coder.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                {coder.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full border" style={{ backgroundColor: '#238636', borderColor: '#161B22' }}></div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-white font-medium truncate">{coder.name}</div>
                {coder.githubUsername && (
                  <div className="text-xs truncate" style={{ color: '#8B949E' }}>@{coder.githubUsername}</div>
                )}
              </div>
            </div>
            <div className="font-medium" style={{ color: '#2F81F7' }}>{formatTime(coder.totalTimeToday)}</div>
            <div className="flex flex-wrap gap-1 py-1">
              {formatLanguages(coder.languageWiseTime).map(({ language, formattedTime }) => {
                const IconComponent = getLanguageIcon(language)
                return (
                  <span
                    key={language}
                    className={`text-xs md:text-sm px-4 py-1 rounded-full ${getLanguageColor(language)} whitespace-nowrap flex items-center gap-2`}
                    style={{ backgroundColor: '#0D1117' }}
                    title={`${language}: ${formattedTime}`}
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                    {language}
                  </span>
                )
              })}
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: coder.isOnline ? '#238636' : '#8B949E' }}></div>
              <span className="text-sm" style={{ color: coder.isOnline ? '#238636' : '#8B949E' }}>
                {coder.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Loading more indicator and infinite scroll trigger */}
      <div 
        ref={loadMoreRef}
        className="flex items-center justify-center p-8"
      >
        {loadingMore && (
          <div className="flex items-center space-x-3">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#2F81F7' }} />
            <span style={{ color: '#8B949E' }}>Loading more developers...</span>
          </div>
        )}
        {!loadingMore && currentPage >= totalPages && users && users.length > 0 && (
          <div className="text-center">
            <p style={{ color: '#8B949E' }}>🎉 You&apos;ve reached the end of the leaderboard!</p>
            <p className="text-sm mt-1" style={{ color: '#8B949E' }}>
              {users.length} total developers loaded
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 