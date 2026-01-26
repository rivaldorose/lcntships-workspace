'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  Upload,
  FolderPlus,
  FilePlus,
  Pin,
  Clock,
  Grid3X3,
  List,
  MoreHorizontal,
  FileText,
  Image,
  FileSpreadsheet,
  Video,
  Music,
  File,
  Folder,
  Star,
  Download,
  Trash2,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// Mock data
const pinnedDocuments = [
  {
    id: 'p1',
    name: 'Partner Agreement Template.pdf',
    type: 'pdf',
    icon: FileText,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    starred: true,
  },
  {
    id: 'p2',
    name: 'Brand Guidelines 2024.pdf',
    type: 'pdf',
    icon: FileText,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    starred: true,
  },
  {
    id: 'p3',
    name: 'Commission Structure.xlsx',
    type: 'spreadsheet',
    icon: FileSpreadsheet,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    starred: true,
  },
  {
    id: 'p4',
    name: 'Onboarding Checklist.pdf',
    type: 'pdf',
    icon: FileText,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    starred: true,
  },
]

const recentDocuments = [
  {
    id: 'r1',
    name: 'Studio Zenith Contract.pdf',
    type: 'pdf',
    icon: FileText,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    modified: '2 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200',
  },
  {
    id: 'r2',
    name: 'Invoice_Dec_2024.pdf',
    type: 'pdf',
    icon: FileText,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    modified: '5 hours ago',
    thumbnail: null,
  },
  {
    id: 'r3',
    name: 'Marketing Assets.zip',
    type: 'archive',
    icon: File,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    modified: 'Yesterday',
    thumbnail: null,
  },
  {
    id: 'r4',
    name: 'Studio Photos.jpg',
    type: 'image',
    icon: Image,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    modified: '2 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200',
  },
  {
    id: 'r5',
    name: 'Promo Video.mp4',
    type: 'video',
    icon: Video,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    modified: '3 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1574717024453-354056aafa98?w=200',
  },
]

const folders = [
  {
    id: 'f1',
    name: 'Contracts',
    itemCount: 24,
    color: 'bg-blue-500',
  },
  {
    id: 'f2',
    name: 'Invoices',
    itemCount: 156,
    color: 'bg-emerald-500',
  },
  {
    id: 'f3',
    name: 'Templates',
    itemCount: 12,
    color: 'bg-purple-500',
  },
  {
    id: 'f4',
    name: 'Marketing',
    itemCount: 45,
    color: 'bg-orange-500',
  },
]

const files = [
  {
    id: 'd1',
    name: 'Lumina_Yoga_Contract.pdf',
    type: 'pdf',
    icon: FileText,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    size: '2.4 MB',
    modified: 'Dec 15, 2024',
  },
  {
    id: 'd2',
    name: 'Core_Pilates_Invoice.pdf',
    type: 'pdf',
    icon: FileText,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    size: '1.1 MB',
    modified: 'Dec 12, 2024',
  },
  {
    id: 'd3',
    name: 'Revenue_Report_Q4.xlsx',
    type: 'spreadsheet',
    icon: FileSpreadsheet,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    size: '856 KB',
    modified: 'Dec 10, 2024',
  },
  {
    id: 'd4',
    name: 'Studio_Promo_Video.mp4',
    type: 'video',
    icon: Video,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    size: '124 MB',
    modified: 'Dec 8, 2024',
  },
  {
    id: 'd5',
    name: 'Brand_Assets.zip',
    type: 'archive',
    icon: File,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    size: '45 MB',
    modified: 'Dec 5, 2024',
  },
  {
    id: 'd6',
    name: 'Podcast_Episode_12.mp3',
    type: 'audio',
    icon: Music,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    size: '32 MB',
    modified: 'Dec 1, 2024',
  },
]

const documentTemplates = [
  { id: 't1', name: 'Blank Document', icon: FileText, description: 'Start from scratch' },
  { id: 't2', name: 'Contract Template', icon: FileText, description: 'Partner agreement' },
  { id: 't3', name: 'Invoice Template', icon: FileSpreadsheet, description: 'Billing document' },
  { id: 't4', name: 'Proposal Template', icon: FileText, description: 'Business proposal' },
]

const folderColors = [
  { id: 'blue', color: 'bg-blue-500' },
  { id: 'emerald', color: 'bg-emerald-500' },
  { id: 'purple', color: 'bg-purple-500' },
  { id: 'orange', color: 'bg-orange-500' },
  { id: 'pink', color: 'bg-pink-500' },
  { id: 'indigo', color: 'bg-indigo-500' },
]

// Modal Components
function CreateDocumentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'template' | 'upload'>('template')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [documentName, setDocumentName] = useState('')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Create New Document</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('template')}
            className={cn(
              'flex-1 py-4 text-sm font-bold transition-colors',
              activeTab === 'template'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-400 hover:text-gray-600'
            )}
          >
            Choose Template
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={cn(
              'flex-1 py-4 text-sm font-bold transition-colors',
              activeTab === 'upload'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-400 hover:text-gray-600'
            )}
          >
            Upload File
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'template' ? (
            <div className="space-y-6">
              {/* Document Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Document Name</label>
                <Input
                  placeholder="Enter document name..."
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>

              {/* Templates Grid */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Select Template</label>
                <div className="grid grid-cols-2 gap-4">
                  {documentTemplates.map((template) => {
                    const Icon = template.icon
                    return (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={cn(
                          'p-4 rounded-2xl border-2 text-left transition-all',
                          selectedTemplate === template.id
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'
                        )}
                      >
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
                          <Icon className="h-6 w-6 text-gray-600" />
                        </div>
                        <p className="font-bold text-gray-900">{template.name}</p>
                        <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-indigo-600" />
                </div>
                <p className="text-lg font-bold text-gray-900 mb-2">Drop files here or click to upload</p>
                <p className="text-sm text-gray-500">
                  Support for PDF, DOCX, XLSX, PNG, JPG, MP4 up to 100MB
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
          <Button variant="outline" onClick={onClose} className="rounded-xl h-11 px-6">
            Cancel
          </Button>
          <Button className="rounded-xl h-11 px-6">
            {activeTab === 'template' ? 'Create Document' : 'Upload'}
          </Button>
        </div>
      </div>
    </div>
  )
}

function NewFolderModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [folderName, setFolderName] = useState('')
  const [selectedColor, setSelectedColor] = useState('blue')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">New Folder</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Folder Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Folder Name</label>
            <Input
              placeholder="Enter folder name..."
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Folder Color</label>
            <div className="flex gap-3">
              {folderColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={cn(
                    'w-10 h-10 rounded-full transition-all flex items-center justify-center',
                    color.color,
                    selectedColor === color.id ? 'ring-4 ring-offset-2 ring-gray-300' : ''
                  )}
                >
                  {selectedColor === color.id && <Check className="h-5 w-5 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Preview</label>
            <div className="bg-gray-50 rounded-2xl p-6 flex items-center gap-4">
              <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center', folderColors.find(c => c.id === selectedColor)?.color)}>
                <Folder className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">{folderName || 'Untitled Folder'}</p>
                <p className="text-sm text-gray-500">0 items</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
          <Button variant="outline" onClick={onClose} className="rounded-xl h-11 px-6">
            Cancel
          </Button>
          <Button className="rounded-xl h-11 px-6" disabled={!folderName}>
            Create Folder
          </Button>
        </div>
      </div>
    </div>
  )
}

function UploadProgressOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [uploadProgress, setUploadProgress] = useState(65)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Uploading Files</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* File 1 - Completed */}
          <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Check className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">Contract_Studio_A.pdf</p>
              <p className="text-sm text-emerald-600">Completed</p>
            </div>
            <span className="text-sm font-bold text-emerald-600">2.4 MB</span>
          </div>

          {/* File 2 - In Progress */}
          <div className="p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">Invoice_Dec_2024.pdf</p>
                <p className="text-sm text-gray-500">{uploadProgress}% uploaded</p>
              </div>
              <span className="text-sm font-bold text-gray-500">1.8 MB</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>

          {/* File 3 - Queued */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl opacity-60">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <Image className="h-6 w-6 text-gray-400" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">Studio_Photos.zip</p>
              <p className="text-sm text-gray-400">Queued</p>
            </div>
            <span className="text-sm font-bold text-gray-400">45 MB</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">2 of 3 files uploaded</p>
          <Button variant="outline" onClick={onClose} className="rounded-xl h-11 px-6">
            Cancel All
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [folderFilter, setFolderFilter] = useState('All Folders')
  const [showCreateDocModal, setShowCreateDocModal] = useState(false)
  const [showNewFolderModal, setShowNewFolderModal] = useState(false)
  const [showUploadProgress, setShowUploadProgress] = useState(false)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Documents</h1>
          <p className="text-gray-500 mt-1">Manage and organize all your files and documents.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/upload">
            <Button
              variant="outline"
              className="rounded-xl h-11 px-5"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </Link>
          <Button
            variant="outline"
            className="rounded-xl h-11 px-5"
            onClick={() => setShowNewFolderModal(true)}
          >
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
          <Button
            className="rounded-xl h-11 px-5 shadow-lg shadow-indigo-200"
            onClick={() => setShowCreateDocModal(true)}
          >
            <FilePlus className="h-4 w-4 mr-2" />
            New Document
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search documents, folders..."
              className="pl-12 h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>All Types</option>
              <option>PDF</option>
              <option>Spreadsheet</option>
              <option>Image</option>
              <option>Video</option>
              <option>Audio</option>
            </select>
            <select
              value={folderFilter}
              onChange={(e) => setFolderFilter(e.target.value)}
              className="h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>All Folders</option>
              <option>Contracts</option>
              <option>Invoices</option>
              <option>Templates</option>
              <option>Marketing</option>
            </select>

            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2.5 rounded-lg transition-colors',
                  viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'
                )}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2.5 rounded-lg transition-colors',
                  viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'
                )}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pinned Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Pin className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-bold text-gray-900">Pinned</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pinnedDocuments.map((doc) => {
            const Icon = doc.icon
            return (
              <div
                key={doc.id}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', doc.iconBg)}>
                    <Icon className={cn('h-5 w-5', doc.iconColor)} />
                  </div>
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                </div>
                <p className="font-bold text-gray-900 text-sm truncate">{doc.name}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Recent Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-bold text-gray-900">Recent</h2>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
          {recentDocuments.map((doc) => {
            const Icon = doc.icon
            return (
              <div
                key={doc.id}
                className="flex-shrink-0 w-48 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="h-28 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {doc.thumbnail ? (
                    <img src={doc.thumbnail} alt={doc.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', doc.iconBg)}>
                      <Icon className={cn('h-6 w-6', doc.iconColor)} />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-bold text-gray-900 text-sm truncate">{doc.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{doc.modified}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Files & Folders Section */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Files & Folders</h2>

        {/* Folders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', folder.color)}>
                  <Folder className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate">{folder.name}</p>
                  <p className="text-sm text-gray-400">{folder.itemCount} items</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-all">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Files Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => {
              const Icon = file.icon
              return (
                <div
                  key={file.id}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', file.iconBg)}>
                      <Icon className={cn('h-6 w-6', file.iconColor)} />
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-all">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="font-bold text-gray-900 text-sm truncate mb-1">{file.name}</p>
                  <p className="text-xs text-gray-400">{file.size} • {file.modified}</p>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 px-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Size</th>
                  <th className="text-left py-3 px-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Modified</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => {
                  const Icon = file.icon
                  return (
                    <tr key={file.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', file.iconBg)}>
                            <Icon className={cn('h-5 w-5', file.iconColor)} />
                          </div>
                          <span className="font-medium text-gray-900">{file.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-sm text-gray-500">{file.size}</td>
                      <td className="py-4 px-5 text-sm text-gray-500">{file.modified}</td>
                      <td className="py-4 px-5">
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Modals */}
      <CreateDocumentModal isOpen={showCreateDocModal} onClose={() => setShowCreateDocModal(false)} />
      <NewFolderModal isOpen={showNewFolderModal} onClose={() => setShowNewFolderModal(false)} />
      <UploadProgressOverlay isOpen={showUploadProgress} onClose={() => setShowUploadProgress(false)} />
    </div>
  )
}
