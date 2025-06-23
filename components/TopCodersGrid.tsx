import Image from "next/image"
import { Github, Twitter, Trophy } from "lucide-react"
import { 
  TopCoderWithPosition,
  formatTime, 
  getLanguageColor, 
  getLanguageIcon, 
  formatLanguages,
} from "@/lib/leaderboard-utils"

interface TopCodersGridProps {
  topCoders: TopCoderWithPosition[]
  timeframe?: 'daily' | 'weekly'
}

export default function TopCodersGrid({ topCoders, timeframe = 'daily' }: TopCodersGridProps) {
  const timeLabel = timeframe === 'weekly' ? 'This Week' : 'Time Today'
  
  // Medal configurations for each position
  const getMedalConfig = (index: number) => {
    switch (index) {
      case 0:
        return { 
          icon: Trophy, 
          bg: "from-yellow-400 to-yellow-600", 
          border: "border-yellow-400/30",
          iconColor: "text-yellow-100",
          shadow: "shadow-yellow-500/25"
        }
      case 1:
        return { 
          icon: Trophy, 
          bg: "from-slate-300 to-slate-500", 
          border: "border-slate-400/30",
          iconColor: "text-slate-100",
          shadow: "shadow-slate-500/25"
        }
      case 2:
        return { 
          icon: Trophy, 
          bg: "from-amber-600 to-amber-800", 
          border: "border-amber-600/30",
          iconColor: "text-amber-100",
          shadow: "shadow-amber-500/25"
        }
      default:
        return { 
          icon: Trophy, 
          bg: "from-app-blue to-app-purple", 
          border: "border-app-blue/30",
          iconColor: "text-white",
          shadow: "shadow-app-blue/25"
        }
    }
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
      {topCoders.map((coder, index) => {
        const medalConfig = getMedalConfig(index);
        const IconComponent = medalConfig.icon;
        return (
          <div 
            key={`top-coder-${coder.userId}-${index}`} 
            className={`group relative bg-app-surface rounded-lg md:rounded-2xl p-3 md:p-6 border border-app-divider hover:border-app-blue/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${medalConfig.border}`}
          >
            {/* Trophy Badge */}
            <div className={`absolute -top-2 -right-2 md:-top-3 md:-right-3 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br ${medalConfig.bg} rounded-full flex items-center justify-center shadow-lg ${medalConfig.shadow}`}>
              <IconComponent className={`w-4 h-4 md:w-6 md:h-6 ${medalConfig.iconColor}`} />
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-6">
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl overflow-hidden ring-1 md:ring-2 ring-app-divider">
                  <Image
                    src={coder.image}
                    alt={coder.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                {coder.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 w-3 h-3 md:w-5 md:h-5 bg-app-green rounded-full border-1 md:border-2 border-app-surface animate-pulse"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm md:text-lg text-app-text-primary truncate">{coder.name}</h3>
                <div className="flex items-center space-x-2 mt-0.5 md:mt-1">
                  {coder.githubUsername && (
                    <a 
                      href={`https://github.com/${coder.githubUsername}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-app-text-secondary hover:text-app-blue transition-colors"
                    >
                      <Github className="w-3 h-3 md:w-4 md:h-4" />
                    </a>
                  )}
                  {coder.twitterUsername && (
                    <a 
                      href={`https://twitter.com/${coder.twitterUsername}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-app-text-secondary hover:text-app-blue transition-colors"
                    >
                      <Twitter className="w-3 h-3 md:w-4 md:h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="space-y-2 md:space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-app-text-secondary mb-0.5 md:mb-1">{timeLabel}</p>
                  <p className="text-lg md:text-2xl font-bold text-app-blue">{formatTime(coder.totalTimeToday)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-app-text-secondary mb-0.5 md:mb-1">Status</p>
                  <div className={`flex items-center justify-end space-x-1 md:space-x-2 ${coder.isOnline ? 'text-app-green' : 'text-app-text-secondary'}`}>
                    <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${coder.isOnline ? 'bg-app-green animate-pulse' : 'bg-app-text-secondary'}`}></div>
                    <span className="text-xs font-medium">{coder.isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>
              
              {/* Languages */}
              <div>
                <p className="text-xs text-app-text-secondary mb-1 md:mb-3">Languages</p>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {formatLanguages(coder.languageWiseTime).slice(0, 2).map(({ language, formattedTime }, langIndex) => {
                    const IconComponent = getLanguageIcon(language)
                    return (
                      <span
                        key={`top-${coder.userId}-${language}-${langIndex}`}
                        className={`text-xs px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg ${getLanguageColor(language)} whitespace-nowrap flex items-center gap-1 font-medium transition-all duration-200 hover:scale-105`}
                        title={`${language}: ${formattedTime}`}
                      >
                        {IconComponent && <IconComponent className="w-2.5 h-2.5 md:w-3 md:h-3" />}
                        <span className="hidden sm:inline md:inline">{language}</span>
                      </span>
                    )
                  })}
                  {formatLanguages(coder.languageWiseTime).length > 2 && (
                    <span className="text-xs px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg bg-app-divider/50 text-app-text-secondary font-medium">
                      +{formatLanguages(coder.languageWiseTime).length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Rank Indicator */}
            <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-app-background/80 backdrop-blur-sm rounded-md px-1.5 py-0.5 md:px-2 md:py-1">
              <span className="text-xs font-bold text-app-text-secondary">{coder.position}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
} 