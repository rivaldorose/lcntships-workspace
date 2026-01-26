'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/layout/PageHeader'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts'

// Mock data
const bookingsData = [
  { month: 'Jul', bookings: 45 },
  { month: 'Aug', bookings: 62 },
  { month: 'Sep', bookings: 58 },
  { month: 'Oct', bookings: 71 },
  { month: 'Nov', bookings: 85 },
  { month: 'Dec', bookings: 79 },
  { month: 'Jan', bookings: 92 },
]

const studioTypeData = [
  { name: 'Photo', value: 42, color: '#6366F1' },
  { name: 'Video', value: 28, color: '#F97316' },
  { name: 'Podcast', value: 35, color: '#10B981' },
  { name: 'Music', value: 15, color: '#F59E0B' },
  { name: 'Event', value: 7, color: '#EC4899' },
]

const topStudios = [
  { name: 'Sunlight Studios', bookings: 128, revenue: 32450 },
  { name: 'Echo Sound Studio', bookings: 95, revenue: 28920 },
  { name: 'Podcast Pro Studio', bookings: 156, revenue: 24560 },
  { name: 'The Creative Loft', bookings: 72, revenue: 21450 },
  { name: 'Urban Beat Studio', bookings: 48, revenue: 18340 },
]

const ratingTrend = [
  { month: 'Jul', rating: 4.6 },
  { month: 'Aug', rating: 4.7 },
  { month: 'Sep', rating: 4.7 },
  { month: 'Oct', rating: 4.8 },
  { month: 'Nov', rating: 4.8 },
  { month: 'Dec', rating: 4.8 },
  { month: 'Jan', rating: 4.9 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Analytics" description="Platform performance metrics and insights" />

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bookings Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bookings Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                    }}
                  />
                  <Bar dataKey="bookings" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Studio Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Studios by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={studioTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {studioTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-3">
                {studioTypeData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Studios */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Performing Studios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStudios.map((studio, index) => (
                <div key={studio.name} className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-medium text-gray-600">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{studio.name}</p>
                    <p className="text-sm text-gray-500">{studio.bookings} bookings</p>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ${studio.revenue.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rating Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average Rating Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ratingTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis
                    domain={[4.0, 5.0]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="#F59E0B"
                    strokeWidth={3}
                    dot={{ fill: '#F59E0B', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
