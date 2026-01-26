import { Building2, Calendar, DollarSign, Star } from 'lucide-react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { TodayBookings } from '@/components/dashboard/TodayBookings'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { GoalProgress } from '@/components/dashboard/GoalProgress'

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your platform today.</p>
      </div>

      {/* Goal Progress */}
      <GoalProgress currentStudios={127} goalStudios={1000} />

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Studios"
          value={127}
          change="+8 this month"
          changeType="positive"
          icon={Building2}
          iconColor="text-indigo-600 bg-indigo-50"
        />
        <StatsCard
          title="Bookings This Week"
          value={48}
          change="+12% vs last week"
          changeType="positive"
          icon={Calendar}
          iconColor="text-emerald-600 bg-emerald-50"
        />
        <StatsCard
          title="Revenue MTD"
          value="$24,580"
          change="+18% vs last month"
          changeType="positive"
          icon={DollarSign}
          iconColor="text-amber-600 bg-amber-50"
        />
        <StatsCard
          title="Avg Rating"
          value="4.8"
          change="Based on 342 reviews"
          changeType="neutral"
          icon={Star}
          iconColor="text-pink-600 bg-pink-50"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TodayBookings />
        <RecentActivity />
      </div>
    </div>
  )
}
