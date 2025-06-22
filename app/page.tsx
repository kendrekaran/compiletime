"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Clock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import LeaderboardHero from "@/components/LeaderboardHero"
import TopCodersGrid from "@/components/TopCodersGrid"
import LeaderboardTable from "@/components/LeaderboardTable"
import { 
  User, 
  TopCoderWithPosition, 
  LeaderboardUser, 
  fetchLeaderboard 
} from "@/lib/leaderboard-utils"



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
  const topCoders: TopCoderWithPosition[] = (users || []).slice(0, 3).map((user, index) => ({
    ...user,
    position: index + 1
  }))

  // Get remaining users for the table (starting from rank 4)
  const leaderboardData: LeaderboardUser[] = (users || []).slice(3).map((user, index) => ({
    ...user,
    place: index + 4
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
      <div className="min-h-screen text-white flex items-center justify-center" style={{ backgroundColor: '#0D1117' }}>
        <div className="flex items-center space-x-3">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#2F81F7' }} />
          <span className="text-lg">Loading leaderboard...</span>
        </div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center" style={{ backgroundColor: '#0D1117' }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Failed to load leaderboard</h2>
          <p className="mb-4" style={{ color: '#8B949E' }}>Please try refreshing the page</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700"
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#0D1117' }}>
      {/* Navigation Tabs */}
      <div className="border-b" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-6">
              <div className="flex items-center mr-6">
                <Clock className="w-5 h-5 text-blue-400 mr-2" />
                <span className="font-bold text-lg text-white">CompileTime</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              {["Today", "This Week"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className="text-sm font-medium transition-colors border-b-2"
                  style={{ 
                    color: activeTab === tab ? '#FFFFFF' : '#8B949E',
                    borderColor: activeTab === tab ? '#2F81F7' : 'transparent'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-32 border" style={{ backgroundColor: '#0D1117', borderColor: '#30363D', color: '#8B949E' }}>
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="online">Online Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Debug Information */}
        {!loading && users.length === 0 && !hasError && (
          <div className="mb-8 p-6 rounded-lg border" style={{ backgroundColor: '#161B22', borderColor: '#DAA520' }}>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#DAA520' }}>🔍 Debug Information</h3>
            <p style={{ color: '#8B949E' }}>No users loaded. Check the browser console for API response details.</p>
            <p className="text-sm mt-2" style={{ color: '#8B949E' }}>
              Current state: Loading={loading.toString()}, Error={hasError.toString()}, Users count={users.length}
            </p>
          </div>
        )}

        {/* Hero Section - Top Coder */}
        <LeaderboardHero topCoder={topCoders[0] || null} />

        {/* Top 3 Coders */}
        <TopCodersGrid topCoders={topCoders} />

        {/* Leaderboard Table */}
        <LeaderboardTable 
          leaderboardData={leaderboardData}
          loadingMore={loadingMore}
          currentPage={currentPage}
          totalPages={totalPages}
          users={users}
          loadMoreRef={loadMoreRef}
        />
      </div>
    </div>
  )
}
