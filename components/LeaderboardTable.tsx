import Image from "next/image"
import {  Hash, Clock, Code, Activity } from "lucide-react"
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
  timeframe?: 'daily' | 'weekly'
}

export default function LeaderboardTable({ 
  leaderboardData, 
  loadingMore, 
  currentPage, 
  totalPages, 
  users, 
  loadMoreRef,
  timeframe = 'daily'
}: LeaderboardTableProps) {
  const timeLabel = timeframe === 'weekly' ? 'This Week' : 'Time Today'
  
  return (
    <div className="bg-app-surface rounded-lg md:rounded-2xl border border-app-divider overflow-hidden shadow-sm">
      {/* Table Header */}
      <div className="bg-app-background/50 border-b border-app-divider px-3 md:px-6 py-2 md:py-4">
        <div className="hidden md:grid grid-cols-12 gap-4 items-center text-sm font-semibold text-app-text-secondary">
          <div className="col-span-1 flex items-center justify-center">
            <Hash className="w-4 h-4" />
          </div>
          <div className="col-span-4 flex items-center space-x-2">
            <span>Developer</span>
          </div>
          <div className="col-span-2 flex items-center justify-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className="hidden lg:inline">{timeLabel}</span>
            <span className="lg:hidden">Time</span>
          </div>
          <div className="col-span-3 flex items-center space-x-2">
            <Code className="w-4 h-4" />
            <span>Languages</span>
          </div>
          <div className="col-span-2 flex items-center justify-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Status</span>
          </div>
        </div>
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between text-xs font-semibold text-app-text-secondary">
          <span>Developer Leaderboard</span>
          <span className="text-xs">{timeLabel}</span>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-app-divider">
        {leaderboardData.map((coder, index) => (
          <div
            key={`leaderboard-${coder.userId}-${index}`}
            className="p-3 md:px-6 md:py-5 hover:bg-app-background/30 transition-all duration-200 group"
          >
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-12 gap-4 items-center">
              {/* Rank */}
              <div className="col-span-1 flex items-center justify-center">
                <div className="w-8 h-8 rounded-lg bg-app-background flex items-center justify-center text-sm font-bold text-app-text-secondary group-hover:bg-app-blue/10 group-hover:text-app-blue transition-all duration-200">
                  {coder.place}
                </div>
              </div>

              {/* Developer Info */}
              <div className="col-span-4 flex items-center space-x-3 min-w-0">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-app-divider/50 group-hover:ring-app-blue/30 transition-all duration-200">
                    <Image
                      src={coder.image}
                      alt={coder.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {coder.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-app-green rounded-full border-2 border-app-surface animate-pulse"></div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-app-text-primary truncate text-base group-hover:text-app-blue transition-colors duration-200">
                    {coder.name}
                  </h4>
                  {coder.githubUsername && (
                    <p className="text-sm text-app-text-secondary truncate">@{coder.githubUsername}</p>
                  )}
                </div>
              </div>

              {/* Time */}
              <div className="col-span-2 flex items-center justify-center">
                <div className="text-lg font-bold text-app-blue">{formatTime(coder.totalTimeToday)}</div>
              </div>

              {/* Languages */}
              <div className="col-span-3 flex flex-wrap gap-1.5">
                {formatLanguages(coder.languageWiseTime).slice(0, 2).map(({ language, formattedTime }, langIndex) => {
                  const IconComponent = getLanguageIcon(language)
                  return (
                    <span
                      key={`table-${coder.userId}-${language}-${langIndex}`}
                      className={`text-xs px-2.5 py-1 rounded-lg ${getLanguageColor(language)} whitespace-nowrap flex items-center gap-1.5 font-medium transition-all duration-200 hover:scale-105`}
                      title={`${language}: ${formattedTime}`}
                    >
                      {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
                      <span className="hidden lg:inline">{language}</span>
                    </span>
                  )
                })}
                {formatLanguages(coder.languageWiseTime).length > 2 && (
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-app-divider/50 text-app-text-secondary font-medium">
                    +{formatLanguages(coder.languageWiseTime).length - 2}
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="col-span-2 flex items-center justify-center space-x-2">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${coder.isOnline ? 'bg-app-green animate-pulse' : 'bg-app-text-secondary'}`}></div>
                <span className={`text-sm font-medium hidden lg:inline ${coder.isOnline ? 'text-app-green' : 'text-app-text-secondary'}`}>
                  {coder.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-2">
              {/* Top Row - Rank, Avatar, Name, Time */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 rounded-md bg-app-background flex items-center justify-center text-xs font-bold text-app-text-secondary">
                    {coder.place}
                  </div>
                  <div className="relative">
                    <div className="w-8 h-8 rounded-lg overflow-hidden">
                      <Image
                        src={coder.image}
                        alt={coder.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {coder.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-app-green rounded-full border border-app-surface animate-pulse"></div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-app-text-primary truncate text-sm">
                      {coder.name}
                    </h4>
                    {coder.githubUsername && (
                      <p className="text-xs text-app-text-secondary truncate">@{coder.githubUsername}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-app-blue">{formatTime(coder.totalTimeToday)}</div>
                  <div className={`flex items-center justify-end space-x-1 mt-0.5 ${coder.isOnline ? 'text-app-green' : 'text-app-text-secondary'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${coder.isOnline ? 'bg-app-green animate-pulse' : 'bg-app-text-secondary'}`}></div>
                    <span className="text-xs font-medium">{coder.isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Row - Languages */}
              <div className="flex flex-wrap gap-1 pl-8">
                {formatLanguages(coder.languageWiseTime).slice(0, 3).map(({ language, formattedTime }, langIndex) => {
                  const IconComponent = getLanguageIcon(language)
                  return (
                    <span
                      key={`mobile-table-${coder.userId}-${language}-${langIndex}`}
                      className={`text-xs px-2 py-1 rounded-md ${getLanguageColor(language)} whitespace-nowrap flex items-center gap-1 font-medium`}
                      title={`${language}: ${formattedTime}`}
                    >
                      {IconComponent && <IconComponent className="w-2.5 h-2.5" />}
                      <span>{language}</span>
                    </span>
                  )
                })}
                {formatLanguages(coder.languageWiseTime).length > 3 && (
                  <span className="text-xs px-2 py-1 rounded-md bg-app-divider/50 text-app-text-secondary font-medium">
                    +{formatLanguages(coder.languageWiseTime).length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Loading/End State */}
      <div 
        ref={loadMoreRef}
        className="p-4 md:p-8 bg-app-background/20"
      >
        {loadingMore && (
          <div className="flex flex-col items-center justify-center space-y-2 md:space-y-3">
            <div className="relative">
              <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-app-divider border-t-app-blue rounded-full animate-spin"></div>
            </div>
            <div className="text-center">
              <p className="font-medium text-app-text-primary text-sm md:text-base">Loading more developers...</p>
              <p className="text-xs md:text-sm text-app-text-secondary">Hang tight while we fetch more stats</p>
            </div>
          </div>
        )}
        {!loadingMore && currentPage >= totalPages && users && users.length > 0 && (
          <div className="text-center">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-app-green/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Hash className="w-5 h-5 md:w-8 md:h-8 text-app-green" />
            </div>
            <h3 className="text-base md:text-lg font-bold text-app-text-primary mb-1 md:mb-2">🎉 That&apos;s everyone!</h3>
            <p className="text-app-text-secondary mb-1 text-sm">You&apos;ve reached the end of the leaderboard</p>
            <p className="text-xs md:text-sm text-app-text-secondary">
              {users.length} total developers loaded
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 