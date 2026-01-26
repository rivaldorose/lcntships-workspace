'use client'

import { useState } from 'react'
import { Search, Plus, ExternalLink, Building2, MapPin, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/layout/PageHeader'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Mock Apollo prospects
const mockProspects = [
  {
    id: '1',
    name: 'Luminous Photo Studio',
    contact: 'Jennifer Adams',
    email: 'jennifer@luminousphoto.com',
    phone: '+1 (415) 555-1234',
    city: 'San Francisco',
    type: 'Photo Studio',
    employees: '5-10',
    website: 'luminousphoto.com',
  },
  {
    id: '2',
    name: 'SoundWave Recording',
    contact: 'Marcus Thompson',
    email: 'marcus@soundwave.com',
    phone: '+1 (323) 555-5678',
    city: 'Los Angeles',
    type: 'Music Studio',
    employees: '10-20',
    website: 'soundwaverecording.com',
  },
  {
    id: '3',
    name: 'Velocity Video Productions',
    contact: 'Samantha Park',
    email: 'sam@velocityvideo.com',
    phone: '+1 (206) 555-9012',
    city: 'Seattle',
    type: 'Video Studio',
    employees: '5-10',
    website: 'velocityvideo.com',
  },
  {
    id: '4',
    name: 'The Podcast Room',
    contact: 'Brandon Lee',
    email: 'brandon@podcastroom.com',
    phone: '+1 (720) 555-3456',
    city: 'Denver',
    type: 'Podcast Studio',
    employees: '1-5',
    website: 'podcastroom.co',
  },
  {
    id: '5',
    name: 'Artisan Event Space',
    contact: 'Michelle Rivera',
    email: 'michelle@artisanevents.com',
    phone: '+1 (602) 555-7890',
    city: 'Phoenix',
    type: 'Event Space',
    employees: '10-20',
    website: 'artisanevents.com',
  },
]

export default function ApolloPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cityFilter, setCityFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredProspects = mockProspects.filter((prospect) => {
    const matchesSearch = prospect.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prospect.contact.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCity = cityFilter === 'all' || prospect.city.toLowerCase().includes(cityFilter.toLowerCase())
    const matchesType = typeFilter === 'all' || prospect.type.toLowerCase().includes(typeFilter.toLowerCase())
    return matchesSearch && matchesCity && matchesType
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Apollo Integration"
        description="Find and import studio leads from Apollo.io"
        actions={
          <Button variant="outline" asChild>
            <a href="https://apollo.io" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Apollo.io
            </a>
          </Button>
        }
      />

      {/* Integration Notice */}
      <Card className="bg-blue-50 border-blue-100">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <Search className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-blue-900">Apollo.io Integration</h3>
              <p className="text-sm text-blue-700 mt-1">
                Search results below are sample data. Connect your Apollo.io account to import real studio leads.
              </p>
              <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700">
                Connect Apollo Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search & Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search Studios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by studio name or contact..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Studio Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="photo">Photo Studio</SelectItem>
                <SelectItem value="video">Video Studio</SelectItem>
                <SelectItem value="podcast">Podcast Studio</SelectItem>
                <SelectItem value="music">Music Studio</SelectItem>
                <SelectItem value="event">Event Space</SelectItem>
              </SelectContent>
            </Select>
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                <SelectItem value="los angeles">Los Angeles</SelectItem>
                <SelectItem value="new york">New York</SelectItem>
                <SelectItem value="san francisco">San Francisco</SelectItem>
                <SelectItem value="seattle">Seattle</SelectItem>
                <SelectItem value="denver">Denver</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProspects.map((prospect) => (
          <Card key={prospect.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-50">
                    <Building2 className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{prospect.name}</h3>
                    <p className="text-sm text-gray-500">{prospect.contact}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{prospect.city}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{prospect.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{prospect.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{prospect.type}</Badge>
                <Badge variant="outline">{prospect.employees} employees</Badge>
              </div>

              <Button className="w-full" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add to Pipeline
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProspects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No prospects found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}
