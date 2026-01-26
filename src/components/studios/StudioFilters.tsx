'use client'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'

interface StudioFiltersProps {
  onSearchChange?: (value: string) => void
  onTypeChange?: (value: string) => void
  onStatusChange?: (value: string) => void
  onCityChange?: (value: string) => void
}

const studioTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'photo', label: 'Photo Studio' },
  { value: 'video', label: 'Video Studio' },
  { value: 'podcast', label: 'Podcast Studio' },
  { value: 'music', label: 'Music Studio' },
  { value: 'event', label: 'Event Space' },
]

const studioStatuses = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'draft', label: 'Draft' },
  { value: 'inactive', label: 'Inactive' },
]

const cities = [
  { value: 'all', label: 'All Cities' },
  { value: 'los-angeles', label: 'Los Angeles' },
  { value: 'new-york', label: 'New York' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'austin', label: 'Austin' },
  { value: 'miami', label: 'Miami' },
]

export function StudioFilters({
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onCityChange,
}: StudioFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search studios..."
          className="pl-10"
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <Select onValueChange={onTypeChange} defaultValue="all">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {studioTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={onCityChange} defaultValue="all">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.value} value={city.value}>
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={onStatusChange} defaultValue="all">
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {studioStatuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
