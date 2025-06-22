import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const currentPage = searchParams.get('currentPage') || '1'
    
    console.log('🔥 Weekly API called with page:', currentPage)
    
    const response = await fetch(`https://forkyou.dev/api/leaderboard/weekly?page=${currentPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('❌ External weekly API error:', response.status, response.statusText)
      throw new Error(`External API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('✅ Weekly API response received:', {
      leaderboardCount: data.leaderboard?.length || 0,
      pagination: data.pagination
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('❌ Weekly API route error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weekly leaderboard data' },
      { status: 500 }
    )
  }
} 