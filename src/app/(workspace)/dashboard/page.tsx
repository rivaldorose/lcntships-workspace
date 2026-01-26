'use client'

import {
  DollarSign,
  Calendar,
  Users,
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Building2,
  UserPlus,
  CreditCard,
  FileText,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock data
const metrics = [
  {
    label: 'Total Revenue',
    value: '$124,500',
    change: '+12.5%',
    trend: 'up' as const,
    icon: DollarSign,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    label: 'Active Bookings',
    value: '1,240',
    change: '+8.2%',
    trend: 'up' as const,
    icon: Calendar,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    label: 'New Partners',
    value: '842',
    change: '-2.4%',
    trend: 'down' as const,
    icon: Users,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    label: 'System Health',
    value: '99.9%',
    change: 'Operational',
    trend: 'neutral' as const,
    icon: Activity,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
]

const recentActivity = [
  {
    id: 1,
    type: 'booking',
    icon: Calendar,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    title: 'New booking confirmed',
    description: 'Studio A - Downtown Creative Hub',
    time: '2 minutes ago',
  },
  {
    id: 2,
    type: 'partner',
    icon: UserPlus,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    title: 'New partner onboarded',
    description: 'SoundWave Studios joined the platform',
    time: '15 minutes ago',
  },
  {
    id: 3,
    type: 'payment',
    icon: CreditCard,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Payment processed',
    description: '$2,450.00 from Premium Package booking',
    time: '1 hour ago',
  },
  {
    id: 4,
    type: 'document',
    icon: FileText,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Contract signed',
    description: 'Annual partnership agreement - LA Studios',
    time: '3 hours ago',
  },
]

const studioOccupancy = [
  { name: 'Downtown Creative Hub', occupancy: 87, color: 'bg-indigo-500' },
  { name: 'Westside Recording Co.', occupancy: 72, color: 'bg-emerald-500' },
  { name: 'Sunset Sound Studios', occupancy: 95, color: 'bg-amber-500' },
  { name: 'Echo Park Audio', occupancy: 64, color: 'bg-purple-500' },
]

const pendingTasks = [
  {
    id: 1,
    title: 'Review partner applications',
    count: 5,
    priority: 'high',
    icon: Users,
  },
  {
    id: 2,
    title: 'Approve pending bookings',
    count: 12,
    priority: 'medium',
    icon: Calendar,
  },
  {
    id: 3,
    title: 'Process payout requests',
    count: 3,
    priority: 'high',
    icon: DollarSign,
  },
]

// Revenue chart data points (simplified SVG path)
const revenueData = [40, 65, 45, 80, 55, 90, 70, 85, 95, 75, 88, 100]
const payoutData = [30, 45, 35, 60, 40, 70, 55, 65, 75, 60, 68, 80]

function RevenueChart() {
  const width = 600
  const height = 200
  const padding = 20

  const maxValue = 120
  const xStep = (width - padding * 2) / (revenueData.length - 1)

  const createPath = (data: number[]) => {
    return data
      .map((value, index) => {
        const x = padding + index * xStep
        const y = height - padding - (value / maxValue) * (height - padding * 2)
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
      })
      .join(' ')
  }

  const createArea = (data: number[]) => {
    const path = data
      .map((value, index) => {
        const x = padding + index * xStep
        const y = height - padding - (value / maxValue) * (height - padding * 2)
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
      })
      .join(' ')

    const lastX = padding + (data.length - 1) * xStep
    const firstX = padding

    return `${path} L ${lastX} ${height - padding} L ${firstX} ${height - padding} Z`
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} ${height + 30}`} className="w-full h-auto">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((value) => {
          const y = height - padding - (value / maxValue) * (height - padding * 2)
          return (
            <g key={value}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <text x={padding - 5} y={y + 4} textAnchor="end" className="fill-gray-400 text-[10px]">
                ${value}k
              </text>
            </g>
          )
        })}

        {/* Area fills */}
        <path d={createArea(revenueData)} fill="url(#revenueGradient)" opacity="0.3" />
        <path d={createArea(payoutData)} fill="url(#payoutGradient)" opacity="0.3" />

        {/* Lines */}
        <path
          d={createPath(revenueData)}
          fill="none"
          stroke="#6366f1"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={createPath(payoutData)}
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {revenueData.map((value, index) => {
          const x = padding + index * xStep
          const y = height - padding - (value / maxValue) * (height - padding * 2)
          return <circle key={`revenue-${index}`} cx={x} cy={y} r="4" fill="#6366f1" />
        })}
        {payoutData.map((value, index) => {
          const x = padding + index * xStep
          const y = height - padding - (value / maxValue) * (height - padding * 2)
          return <circle key={`payout-${index}`} cx={x} cy={y} r="4" fill="#10b981" />
        })}

        {/* X-axis labels */}
        {months.map((month, index) => {
          const x = padding + index * xStep
          return (
            <text
              key={month}
              x={x}
              y={height + 15}
              textAnchor="middle"
              className="fill-gray-400 text-[10px]"
            >
              {month}
            </text>
          )
        })}

        {/* Gradients */}
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="payoutGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default function DashboardPage() {
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Welcome back, Rivaldo
          </h1>
          <p className="text-gray-500 mt-1 font-medium">{formattedDate}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Last updated: Just now</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div
              key={metric.label}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center',
                    metric.iconBg
                  )}
                >
                  <Icon className={cn('h-6 w-6', metric.iconColor)} />
                </div>
                <div
                  className={cn(
                    'flex items-center gap-1 text-sm font-semibold',
                    metric.trend === 'up'
                      ? 'text-emerald-600'
                      : metric.trend === 'down'
                        ? 'text-rose-600'
                        : 'text-gray-500'
                  )}
                >
                  {metric.trend === 'up' && <TrendingUp className="h-4 w-4" />}
                  {metric.trend === 'down' && <TrendingDown className="h-4 w-4" />}
                  {metric.trend === 'neutral' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                  <span>{metric.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-black text-gray-900">{metric.value}</p>
                <p className="text-sm text-gray-500 font-medium mt-1">{metric.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Revenue Chart */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Revenue vs Payouts</h2>
              <p className="text-sm text-gray-500 mt-1">Monthly comparison for 2024</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-sm text-gray-600 font-medium">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-sm text-gray-600 font-medium">Payouts</span>
              </div>
            </div>
          </div>
          <RevenueChart />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1">
              View all <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                      activity.iconBg
                    )}
                  >
                    <Icon className={cn('h-5 w-5', activity.iconColor)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500 truncate">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Studio Occupancy */}
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Studio Occupancy</h2>
              <p className="text-sm text-gray-500 mt-1">Current booking utilization</p>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-semibold text-gray-600">4 Studios</span>
            </div>
          </div>
          <div className="space-y-5">
            {studioOccupancy.map((studio) => (
              <div key={studio.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{studio.name}</span>
                  <span
                    className={cn(
                      'text-sm font-bold',
                      studio.occupancy >= 90
                        ? 'text-amber-600'
                        : studio.occupancy >= 70
                          ? 'text-emerald-600'
                          : 'text-gray-600'
                    )}
                  >
                    {studio.occupancy}%
                  </span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-500', studio.color)}
                    style={{ width: `${studio.occupancy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Pending Tasks</h2>
              <p className="text-sm text-gray-500 mt-1">Items requiring your attention</p>
            </div>
            <span className="bg-rose-100 text-rose-700 text-sm font-bold px-3 py-1 rounded-full">
              {pendingTasks.reduce((acc, task) => acc + task.count, 0)} Total
            </span>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task) => {
              const Icon = task.icon
              return (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center',
                        task.priority === 'high' ? 'bg-rose-100' : 'bg-amber-100'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-5 w-5',
                          task.priority === 'high' ? 'text-rose-600' : 'text-amber-600'
                        )}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{task.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {task.priority === 'high' ? (
                          <AlertCircle className="h-3.5 w-3.5 text-rose-500" />
                        ) : (
                          <Clock className="h-3.5 w-3.5 text-amber-500" />
                        )}
                        <span
                          className={cn(
                            'text-xs font-medium',
                            task.priority === 'high' ? 'text-rose-500' : 'text-amber-500'
                          )}
                        >
                          {task.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-white px-3 py-1 rounded-full text-sm font-bold text-gray-700 shadow-sm">
                      {task.count}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="flex items-center justify-center gap-4 text-gray-400 pt-4">
        <span className="text-sm">🔒</span>
        <span className="text-xs font-medium uppercase tracking-widest">
          Executive Dashboard • Real-time data
        </span>
      </div>
    </div>
  )
}
