import Image from "next/image"
import { Github, Twitter, Crown, Flame } from "lucide-react"
import { 
  formatTime, 
  getLanguageColor, 
  getLanguageIcon, 
  formatLanguages 
} from "@/lib/leaderboard-utils"

import { User } from "@/lib/leaderboard-utils"

interface LeaderboardHeroProps {
  topCoder: User | null
}

export default function LeaderboardHero({ topCoder }: LeaderboardHeroProps) {
  if (!topCoder) return null

  return (
    <div className="relative overflow-hidden border-b border-app-divider">
      
      <div className="relative z-10 pt-4 px-4 pb-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-8">
          {/* Left Section - User Info */}
          <div className="flex flex-col  items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6 flex-1 w-full">
            
            {/* Mobile Layout - Image with Title/Badge */}
            <div className="flex items-center space-x-4 lg:hidden w-full">
              <div className="relative flex-shrink-0">
                {/* Crown Icon */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                  <Crown className="w-4 h-4 text-white" />
                </div>
                
                {/* Profile Image */}
                <div className="w-16 h-16 rounded-2xl overflow-hidden ring ring-gradient-to-br from-yellow-400 to-yellow-600 p-1">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src={topCoder.image}
                      alt={topCoder.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Online Status */}
                {topCoder.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-app-green rounded-full border-2 border-app-surface flex items-center justify-center animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              
              {/* Title and Badge for Mobile */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold text-app-text-primary">{topCoder.name}</h1>
                  <div className="px-3 py-1.5 bg-orange-500 rounded-full flex items-center justify-center space-x-2 shadow-lg self-start">
                    <Flame className="w-3 h-3 text-white" />
                    <span className="text-xs font-bold text-white">TOP CODER</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex lg:items-start lg:space-x-6 flex-1 w-full">
              <div className="relative flex-shrink-0">
                {/* Crown Icon */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                
                {/* Profile Image */}
                <div className="w-24 h-24 rounded-3xl overflow-hidden ring-2 ring-gradient-to-br from-yellow-400 to-yellow-600 p-1">
                  <div className="w-full h-full rounded-3xl overflow-hidden">
                    <Image
                      src={topCoder.image}
                      alt={topCoder.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Online Status */}
                {topCoder.isOnline && (
                  <div className="hidden absolute -bottom-2 -right-2 w-8 h-8 bg-app-green rounded-full border-4 border-app-surface  items-center justify-center animate-pulse">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                {/* Title and Badge */}
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-3xl lg:text-4xl font-bold text-app-text-primary">{topCoder.name}</h1>
                  <div className="px-4 py-2 bg-orange-500 rounded-full flex items-center space-x-2 shadow-lg">
                    <Flame className="w-4 h-4 text-white" />
                    <span className="text-sm font-bold text-white">TOP CODER</span>
                  </div>
                </div>
                
                {/* Description - Hidden on mobile */}
                <p className="text-lg text-app-text-secondary mb-4 leading-relaxed">
                  <span className="font-semibold text-app-text-primary">Crushing it with </span>
                  <span className="font-bold text-app-blue">{formatTime(topCoder.totalTimeToday)}</span>
                  <span className="font-semibold text-app-text-primary"> of pure coding today</span>
                </p>
              </div>
            </div>
            
            {/* Social Links and Languages - Shared for both layouts */}
            <div className="w-full flex lg:px-24 ">
              {/* Social Links */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 lg:gap-4 mb-4">
                <div>
                  
                </div>
                {topCoder.githubUsername && (
                  <a 
                    href={`https://github.com/${topCoder.githubUsername}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 lg:px-4 lg:py-2 bg-app-background/50 rounded-lg hover:bg-app-background transition-all duration-200 hover:scale-105"
                  >
                    <Github className="w-4 h-4 lg:w-5 lg:h-5 text-app-text-secondary" />
                    <span className="text-sm text-app-text-secondary font-medium">@{topCoder.githubUsername}</span>
                  </a>
                )}
                {topCoder.twitterUsername && (
                  <a 
                    href={`https://twitter.com/${topCoder.twitterUsername}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 lg:px-4 lg:py-2 bg-app-background/50 rounded-lg hover:bg-app-background transition-all duration-200 hover:scale-105"
                  >
                    <Twitter className="w-4 h-4 lg:w-5 lg:h-5 text-app-text-secondary" />
                    <span className="text-sm text-app-text-secondary font-medium">@{topCoder.twitterUsername}</span>
                  </a>
                )}
              </div>
              
              {/* Languages */}
              <div>
                <div className="flex mt-1 md:mt-0 flex-wrap gap-2 justify-center lg:justify-start">
                  {formatLanguages(topCoder.languageWiseTime).slice(0, 6).map(({ language, formattedTime }, langIndex) => {
                    const IconComponent = getLanguageIcon(language)
                    return (
                      <span
                        key={`hero-${topCoder.userId}-${language}-${langIndex}`}
                        className={`text-xs lg:text-sm px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg lg:rounded-xl ${getLanguageColor(language)} whitespace-nowrap font-medium flex items-center gap-1.5 lg:gap-2 transition-all duration-200 hover:scale-105 shadow-sm`}
                        title={`${language}: ${formattedTime}`}
                      >
                        {IconComponent && <IconComponent className="w-3 h-3 lg:w-4 lg:h-4" />}
                        {language}
                      </span>
                    )
                  })}
                  {formatLanguages(topCoder.languageWiseTime).length > 6 && (
                    <span className="text-xs lg:text-sm px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg lg:rounded-xl bg-app-background/50 text-app-text-secondary font-medium">
                      +{formatLanguages(topCoder.languageWiseTime).length - 6} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Section - Status Card */}
          <div className="hidden lg:block lg:w-64">
            <div className="bg-app-background/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-app-divider/50">
              <div className="text-center">
                <div className="mb-4">
                  <p className="text-sm text-app-text-secondary mb-2">Current Status</p>
                  <div className={`inline-flex items-center space-x-2 sm:space-x-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full ${topCoder.isOnline ? 'bg-app-green/10 text-app-green' : 'bg-app-text-secondary/10 text-app-text-secondary'}`}>
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${topCoder.isOnline ? 'bg-app-green animate-pulse' : 'bg-app-text-secondary'}`}></div>
                    <span className="text-sm font-semibold">{topCoder.isOnline ? 'Coding Now' : 'Offline'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 