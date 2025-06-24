"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Trophy, Users, Activity,  Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import LeaderboardHero from "@/components/LeaderboardHero"
import TopCodersGrid from "@/components/TopCodersGrid"
import LeaderboardTable from "@/components/LeaderboardTable"
import ThemeToggle from "@/components/ThemeToggle"
import { 
  User, 
  TopCoderWithPosition, 
  LeaderboardUser, 
  fetchLeaderboard 
} from "@/lib/leaderboard-utils"
import Link from "next/link"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Today")
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [hasError, setHasError] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  // Get top 3 users for hero and podium sections
  const topCoders: TopCoderWithPosition[] = (users || []).slice(1, 4).map((user, index) => ({
    ...user,
    position: index + 2
  }))

  // Get remaining users for the table (starting from rank 5)
  const leaderboardData: LeaderboardUser[] = (users || []).slice(4).map((user, index) => ({
    ...user,
    place: index + 5
  }))


  // Fetch initial data
  const loadInitialData = useCallback(async (timeframe: 'daily' | 'weekly') => {
    try {
      setLoading(true)
      setHasError(false)
      console.log(`🚀 Fetching initial ${timeframe} leaderboard data...`)
      const response = await fetchLeaderboard(1, timeframe)
      console.log('📊 API Response:', response)
      console.log('👥 Users data:', response.leaderboard)
      console.log('📄 Pagination:', response.pagination)
      
      if (!response.leaderboard || !Array.isArray(response.leaderboard)) {
        console.error('❌ Invalid data structure received:', response)
        throw new Error('Invalid data structure received from API')
      }
      
      setUsers(response.leaderboard)
      setTotalPages(response.pagination?.totalPages || 1)
      setCurrentPage(1)
      console.log('✅ Data loaded successfully:', response.leaderboard.length, 'users')
    } catch (error) {
      console.error('❌ Failed to load initial data:', error)
      setHasError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  // Load initial data on mount
  useEffect(() => {
    loadInitialData('daily')
  }, [loadInitialData])

  // Handle tab change
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
    const timeframe = tab === "This Week" ? 'weekly' : 'daily'
    loadInitialData(timeframe)
  }, [loadInitialData])

  // Load more data for infinite scroll
  const loadMoreData = useCallback(async () => {
    if (loadingMore || currentPage >= totalPages) return

    try {
      setLoadingMore(true)
      const nextPage = currentPage + 1
      const timeframe = activeTab === "This Week" ? 'weekly' : 'daily'
      const response = await fetchLeaderboard(nextPage, timeframe)
      setUsers(prev => [...prev, ...response.leaderboard])
      setCurrentPage(nextPage)
    } catch (error) {
      console.error('Failed to load more data:', error)
    } finally {
      setLoadingMore(false)
    }
  }, [currentPage, totalPages, loadingMore, activeTab])

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && currentPage < totalPages) {
          loadMoreData()
        }
      },
      { threshold: 0.1 }
    )

    observerRef.current.observe(loadMoreRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loadMoreData, loadingMore, currentPage, totalPages])

  if (loading) {
    return (
      <div className="min-h-screen text-app-text-primary bg-app-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-8 max-w-md mx-auto p-8 bg-app-surface rounded-2xl border border-app-divider shadow-lg">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-app-divider border-t-app-blue rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-app-blue animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-3">Loading Leaderboard</h2>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-app-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-app-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-app-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="min-h-screen text-app-text-primary bg-app-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="mb-6 text-app-text-secondary">We couldn&apos;t load the leaderboard. Please check your connection and try again.</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-app-blue hover:bg-app-blue/90 text-white px-6 py-3"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-app-text-primary bg-app-background">
      {/* Top Banner */}
      <div className="bg-app-blue text-white py-0 sm:py-1.5  px-3 sm:px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex  xs:flex-row items-center justify-center text-center xs:text-left gap-0.5 xs:gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm md:text-base font-medium leading-tight">
              <span className="">FuckYou ForkYou Follow -</span>
            </span>
            <Link
              href="https://x.com/karaan_dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs sm:text-sm md:text-base font-bold hover:underline transition-all duration-200 hover:text-blue-100 active:text-blue-200 min-h-[40px] xs:min-h-[36px] sm:min-h-auto flex items-center justify-center  py-0.5 xs:px-1 xs:py-0 sm:p-0 rounded xs:rounded-none"
            >@karaan_dev
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-app-surface/95 border-b border-app-divider shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex items-center justify-between py-3 sm:py-4">
            {/* Brand Section */}
            <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
              <div className="flex items-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8  bg-app-blue rounded-sm flex items-center justify-center mr-2 sm:mr-3">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-lg sm:text-xl md:text-2xl text-app-text-primary">
                    <span className="hidden sm:inline">CompileTime</span>
                    <span className="sm:hidden">CT</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
              <div className="flex items-center space-x-0.5 sm:space-x-1 bg-app-background rounded-md sm:rounded-lg p-0.5 sm:p-1">
                {["Today", "This Week"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-xs sm:text-sm font-medium rounded-sm sm:rounded-md transition-all duration-200 ${
                      activeTab === tab 
                        ? 'bg-app-blue text-white shadow-sm' 
                        : 'text-app-text-secondary hover:text-app-text-primary hover:bg-app-surface'
                    }`}
                  >
                    <span className="hidden xs:inline">{tab}</span>
                    <span className="xs:hidden">{tab === "Today" ? "1D" : "7D"}</span>
                  </button>
                ))}
              </div>
              <ThemeToggle />
            </div>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Debug Information */}
        {!loading && users.length === 0 && !hasError && (
          <div className="mb-8 p-6 rounded-xl border border-app-yellow/20 bg-app-yellow/5">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-app-yellow/20 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-app-yellow" />
              </div>
              <h3 className="text-lg font-bold text-app-yellow">Debug Information</h3>
            </div>
            <p className="text-app-text-secondary mb-2">No users loaded. Check the browser console for API response details.</p>
            <p className="text-sm text-app-text-secondary">
              Current state: Loading={loading.toString()}, Error={hasError.toString()}, Users count={users.length}
            </p>
          </div>
        )}

        {/* Hero Section - Top Coder */}
        <div className="mb-8">
          <LeaderboardHero topCoder={users[0] || null} />
        </div>

        {/* Top 3 Coders Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-app-text-primary">Top Performers</h2>
            <div className="flex items-center space-x-2 text-sm text-app-text-secondary">
              <Trophy className="w-4 h-4" />
              <span>Podium finishers</span>
            </div>
          </div>
          <TopCodersGrid 
            topCoders={topCoders} 
            timeframe={activeTab === "This Week" ? 'weekly' : 'daily'}
          />
        </div>

        {/* Leaderboard Table Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-app-text-primary">Full Leaderboard</h2>
            <div className="flex items-center space-x-2 text-sm text-app-text-secondary">
              <Users className="w-4 h-4" />
              <span>Ranks 5 - {users.length}</span>
            </div>
          </div>
          <LeaderboardTable 
            leaderboardData={leaderboardData}
            loadingMore={loadingMore}
            currentPage={currentPage}
            totalPages={totalPages}
            users={users}
            loadMoreRef={loadMoreRef}
            timeframe={activeTab === "This Week" ? 'weekly' : 'daily'}
          />
        </div>
      </div>
    </div>
  )
}
