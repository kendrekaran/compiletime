import Image from "next/image"
import { Github, Twitter } from "lucide-react"
import { 
  formatTime, 
  getTopLanguage, 
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
    <div className="mb-12">
      <div 
        className="rounded-lg p-8 border-2 relative overflow-hidden"
        style={{ 
          backgroundColor: 'rgba(191, 64, 191, 0.1)',
          borderColor: '#8A2BE2'
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{ 
            backgroundImage: 'radial-gradient(circle at 20% 50%, #8A2BE2 1px, transparent 1px), radial-gradient(circle at 80% 50%, #8A2BE2 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4" style={{ borderColor: '#8A2BE2' }}>
                  <Image
                    src={topCoder.image}
                    alt={topCoder.name}
                    width={80}
                    height={80}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                {topCoder.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4" style={{ backgroundColor: '#238636', borderColor: 'rgba(255, 215, 0, 0.1)' }}></div>
                )}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8A2BE2' }}>
                  <span className="text-xl">🏆</span>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-4xl font-bold text-white">{topCoder.name}</h1>
                  <span className="px-3 py-1 rounded-full text-sm font-bold" style={{ backgroundColor: '#8A2BE2', color: '#ffffff' }}>
                    🔥 CRACKED
                  </span>
                </div>
                <p className="text-lg mb-3" style={{ color: '#8B949E' }}>
                  <span className="font-bold" style={{ color: '#8A2BE2' }}>This week&apos;s absolute beast</span> with <span style={{ color: '#2F81F7' }} className="font-semibold">{formatTime(topCoder.totalTimeToday)}</span> of pure grinding today
                  <br />
                  Absolutely dominating in {getTopLanguage(topCoder.languageWiseTime)} and {Object.keys(topCoder.languageWiseTime).length - 1} other languages like a machine 🚀
                </p>
                <div className="flex items-center space-x-4">
                  {topCoder.githubUsername && (
                    <a 
                      href={`https://github.com/${topCoder.githubUsername}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                    >
                      <Github className="w-5 h-5" style={{ color: '#8B949E' }} />
                      <span style={{ color: '#8B949E' }}>@{topCoder.githubUsername}</span>
                    </a>
                  )}
                  {topCoder.twitterUsername && (
                    <a 
                      href={`https://twitter.com/${topCoder.twitterUsername}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                    >
                      <Twitter className="w-5 h-5" style={{ color: '#8B949E' }} />
                      <span style={{ color: '#8B949E' }}>@{topCoder.twitterUsername}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm mb-1" style={{ color: '#8B949E' }}>Status</div>
                <div className="flex items-center justify-end space-x-2" style={{ color: topCoder.isOnline ? '#238636' : '#8B949E' }}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: topCoder.isOnline ? '#238636' : '#8B949E' }}></div>
                  <span className="font-medium">{topCoder.isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6" style={{ borderColor: 'rgba(255, 215, 0, 0.2)' }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm mb-2" style={{ color: '#8B949E' }}>Week&apos;s Dominated Languages 💪</div>
                <div className="flex flex-wrap gap-2">
                  {formatLanguages(topCoder.languageWiseTime).slice(0, 6).map(({ language, formattedTime }) => {
                    const IconComponent = getLanguageIcon(language)
                    return (
                      <span
                        key={language}
                        className={`text-sm px-3 py-2 rounded-full ${getLanguageColor(language)} whitespace-nowrap font-medium flex items-center gap-2`}
                        style={{ backgroundColor: '#0D1117' }}
                        title={`${language}: ${formattedTime} - Absolutely crushing it!`}
                      >
                        {IconComponent && <IconComponent className="w-4 h-4" />}
                        {language}
                      </span>
                    )
                  })}
                  {formatLanguages(topCoder.languageWiseTime).length > 6 && (
                    <span 
                      className="text-sm px-3 py-2 rounded-full whitespace-nowrap font-medium"
                      style={{ backgroundColor: '#161B22', color: '#8B949E' }}
                    >
                      +{formatLanguages(topCoder.languageWiseTime).length - 6} more conquered
                    </span>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm mb-1" style={{ color: '#8B949E' }}>Weekly crown expires in</div>
                <div className="flex space-x-1">
                  <span className="px-2 py-1 rounded text-sm font-mono" style={{ backgroundColor: '#161B22' }}>2</span>
                  <span className="px-2 py-1 rounded text-sm font-mono" style={{ backgroundColor: '#161B22' }}>3</span>
                  <span className="px-2 py-1 rounded text-sm font-mono" style={{ backgroundColor: '#161B22' }}>4</span>
                  <span className="px-2 py-1 rounded text-sm font-mono" style={{ backgroundColor: '#161B22' }}>7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 