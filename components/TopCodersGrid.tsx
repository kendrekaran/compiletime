import Image from "next/image"
import { Github, Twitter } from "lucide-react"
import { 
  TopCoderWithPosition,
  formatTime, 
  getLanguageColor, 
  getLanguageIcon, 
  formatLanguages,
  getRankHighlight
} from "@/lib/leaderboard-utils"

interface TopCodersGridProps {
  topCoders: TopCoderWithPosition[]
}

export default function TopCodersGrid({ topCoders }: TopCodersGridProps) {
  return (
    <div className="grid grid-cols-3 gap-6 mb-12">
      {topCoders.map((coder, index) => {
        const rankHighlight = getRankHighlight(coder.position);
        return (
          <div 
            key={coder.userId} 
            className="rounded-lg p-6 border"
            style={{ 
              backgroundColor: rankHighlight.backgroundColor,
              borderColor: rankHighlight.borderColor,
              borderWidth: coder.position <= 3 ? '2px' : '1px'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={coder.image}
                    alt={coder.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  {coder.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2" style={{ backgroundColor: '#238636', borderColor: rankHighlight.backgroundColor }}></div>
                  )}
                </div>
                <span className="font-semibold text-white">{coder.name}</span>
              </div>
              <div className="text-2xl" style={{ color: rankHighlight.textColor }}>
                {index === 0 ? "🏆" : index === 1 ? "🥈" : "🥉"}
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              {coder.githubUsername && (
                <a href={`https://github.com/${coder.githubUsername}`} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 hover:text-white" style={{ color: '#8B949E' }} />
                </a>
              )}
              {coder.twitterUsername && (
                <a href={`https://twitter.com/${coder.twitterUsername}`} target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4 hover:text-white" style={{ color: '#8B949E' }} />
                </a>
              )}
              {coder.githubUsername && (
                <span className="text-sm" style={{ color: '#8B949E' }}>@{coder.githubUsername}</span>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="mb-1" style={{ color: '#8B949E' }}>Time Today</div>
                  <div className="font-medium" style={{ color: '#2F81F7' }}>{formatTime(coder.totalTimeToday)}</div>
                </div>
                <div>
                  <div className="mb-1" style={{ color: '#8B949E' }}>Status</div>
                  <div className="font-medium flex items-center space-x-2" style={{ color: coder.isOnline ? '#238636' : '#8B949E' }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: coder.isOnline ? '#238636' : '#8B949E' }}></div>
                    <span>{coder.isOnline ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="mb-2 text-sm" style={{ color: '#8B949E' }}>Languages</div>
                <div className="flex flex-wrap gap-1">
                  {formatLanguages(coder.languageWiseTime).slice(0, 4).map(({ language, formattedTime }) => {
                    const IconComponent = getLanguageIcon(language)
                    return (
                      <span
                        key={language}
                        className={`text-xs px-2 py-1 rounded-full ${getLanguageColor(language)} whitespace-nowrap flex items-center gap-1`}
                        style={{ backgroundColor: '#0D1117' }}
                        title={`${language}: ${formattedTime}`}
                      >
                        {IconComponent && <IconComponent className="w-3 h-3" />}
                        {language}
                      </span>
                    )
                  })}
                  {formatLanguages(coder.languageWiseTime).length > 4 && (
                    <span 
                      className="text-xs px-2 py-1 rounded-full whitespace-nowrap"
                      style={{ backgroundColor: '#161B22', color: '#8B949E' }}
                    >
                      +{formatLanguages(coder.languageWiseTime).length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
} 