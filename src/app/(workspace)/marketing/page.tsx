'use client'

import { useState } from 'react'
import { Plus, Instagram, Music2, Linkedin, Twitter, Calendar, Clock, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/layout/PageHeader'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatDate } from '@/lib/utils'
import type { MarketingPost } from '@/types'

const platformIcons = {
  instagram: { icon: Instagram, color: 'text-pink-600 bg-pink-50' },
  tiktok: { icon: Music2, color: 'text-gray-900 bg-gray-100' },
  linkedin: { icon: Linkedin, color: 'text-blue-600 bg-blue-50' },
  twitter: { icon: Twitter, color: 'text-sky-500 bg-sky-50' },
}

// Mock data
const mockPosts: MarketingPost[] = [
  {
    id: '1',
    title: 'New Partner Spotlight: Sunlight Studios',
    content: 'Excited to welcome @sunlightstudios to the lcntships family! Beautiful natural light studio in LA.',
    platform: 'instagram',
    scheduled_at: new Date(Date.now() + 86400000 * 2).toISOString(),
    published_at: null,
    status: 'scheduled',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: '5 Tips for Studio Shoots',
    content: 'Here are our top 5 tips for making the most of your studio rental...',
    platform: 'linkedin',
    scheduled_at: new Date(Date.now() + 86400000 * 3).toISOString(),
    published_at: null,
    status: 'scheduled',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Behind the Scenes at Echo Sound',
    content: 'Take a peek behind the scenes at one of our favorite podcast studios!',
    platform: 'tiktok',
    scheduled_at: null,
    published_at: new Date(Date.now() - 86400000).toISOString(),
    status: 'published',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Creative Studio Deals This Week',
    content: 'Special pricing on video production studios this week only!',
    platform: 'twitter',
    scheduled_at: null,
    published_at: null,
    status: 'draft',
    created_at: new Date().toISOString(),
  },
]

const statusColors = {
  draft: 'secondary',
  scheduled: 'warning',
  published: 'success',
} as const

export default function MarketingPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<MarketingPost | null>(null)

  const scheduledPosts = mockPosts.filter((p) => p.status === 'scheduled')
  const draftPosts = mockPosts.filter((p) => p.status === 'draft')
  const publishedPosts = mockPosts.filter((p) => p.status === 'published')

  const handleEdit = (post: MarketingPost) => {
    setSelectedPost(post)
    setIsFormOpen(true)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Marketing"
        description="Manage social media content and campaigns"
        actions={
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-100">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{scheduledPosts.length}</p>
                <p className="text-sm text-gray-500">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-100">
                <Edit className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{draftPosts.length}</p>
                <p className="text-sm text-gray-500">Drafts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-50">
                <Clock className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{publishedPosts.length}</p>
                <p className="text-sm text-gray-500">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-50">
                <Instagram className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4</p>
                <p className="text-sm text-gray-500">Platforms</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Scheduled Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Scheduled Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {scheduledPosts.length > 0 ? (
              scheduledPosts.map((post) => {
                const platform = platformIcons[post.platform as keyof typeof platformIcons]
                const Icon = platform?.icon || Calendar
                return (
                  <div key={post.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${platform?.color || 'bg-gray-100'}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium capitalize">{post.platform}</span>
                      </div>
                      <Badge variant="warning">Scheduled</Badge>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">{post.title}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {post.scheduled_at && formatDate(post.scheduled_at)}
                      </span>
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(post)}>
                        Edit
                      </Button>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-center py-8 text-gray-500">No scheduled posts</p>
            )}
          </CardContent>
        </Card>

        {/* Drafts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Drafts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {draftPosts.length > 0 ? (
              draftPosts.map((post) => {
                const platform = platformIcons[post.platform as keyof typeof platformIcons]
                const Icon = platform?.icon || Calendar
                return (
                  <div key={post.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${platform?.color || 'bg-gray-100'}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium capitalize">{post.platform}</span>
                      </div>
                      <Badge variant="secondary">Draft</Badge>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">{post.title}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{post.content}</p>
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(post)}>
                        Edit
                      </Button>
                      <Button size="sm">Schedule</Button>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-center py-8 text-gray-500">No drafts</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create/Edit Post Dialog */}
      <Dialog open={isFormOpen} onOpenChange={(open) => {
        setIsFormOpen(open)
        if (!open) setSelectedPost(null)
      }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedPost ? 'Edit Post' : 'Create Post'}</DialogTitle>
            <DialogDescription>
              {selectedPost ? 'Update your marketing post.' : 'Create a new social media post.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select defaultValue={selectedPost?.platform || ''}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="Post title" defaultValue={selectedPost?.title || ''} />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                placeholder="Write your post content..."
                rows={4}
                defaultValue={selectedPost?.content || ''}
              />
            </div>

            <div className="space-y-2">
              <Label>Schedule Date (optional)</Label>
              <Input type="datetime-local" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button>
              {selectedPost ? 'Save Changes' : 'Create Post'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
