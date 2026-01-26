'use client'

import { useState } from 'react'
import { Plus, FileText, Search, Download, Trash2, Eye, Upload, File, FileSpreadsheet, FileImage } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/layout/PageHeader'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MoreHorizontal } from 'lucide-react'
import { formatDate } from '@/lib/utils'

// Mock data
const mockDocuments = [
  {
    id: '1',
    name: 'Partner Agreement Template',
    type: 'contract',
    file_url: '/documents/partner-agreement.pdf',
    partner_id: null,
    size: '245 KB',
    created_at: '2024-01-15',
  },
  {
    id: '2',
    name: 'Sunlight Studios - Contract',
    type: 'contract',
    file_url: '/documents/sunlight-contract.pdf',
    partner_id: 'p1',
    size: '312 KB',
    created_at: '2024-06-20',
  },
  {
    id: '3',
    name: 'Invoice #INV-2024-001',
    type: 'invoice',
    file_url: '/documents/inv-2024-001.pdf',
    partner_id: 'p2',
    size: '128 KB',
    created_at: '2024-12-01',
  },
  {
    id: '4',
    name: 'Studio Onboarding Checklist',
    type: 'template',
    file_url: '/documents/onboarding-checklist.pdf',
    partner_id: null,
    size: '89 KB',
    created_at: '2024-03-10',
  },
  {
    id: '5',
    name: 'Echo Sound Studio - Contract',
    type: 'contract',
    file_url: '/documents/echo-contract.pdf',
    partner_id: 'p2',
    size: '298 KB',
    created_at: '2024-09-15',
  },
  {
    id: '6',
    name: 'Invoice #INV-2024-002',
    type: 'invoice',
    file_url: '/documents/inv-2024-002.pdf',
    partner_id: 'p3',
    size: '142 KB',
    created_at: '2025-01-05',
  },
]

const typeIcons = {
  contract: { icon: FileText, color: 'text-blue-600 bg-blue-50' },
  invoice: { icon: FileSpreadsheet, color: 'text-emerald-600 bg-emerald-50' },
  template: { icon: File, color: 'text-purple-600 bg-purple-50' },
}

const typeColors = {
  contract: 'info',
  invoice: 'success',
  template: 'secondary',
} as const

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === 'all' || doc.type === typeFilter
    return matchesSearch && matchesType
  })

  const contracts = mockDocuments.filter((d) => d.type === 'contract').length
  const invoices = mockDocuments.filter((d) => d.type === 'invoice').length
  const templates = mockDocuments.filter((d) => d.type === 'template').length

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Documents"
        description="Manage contracts, invoices, and templates"
        actions={
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{contracts}</p>
                <p className="text-sm text-gray-500">Contracts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-50">
                <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{invoices}</p>
                <p className="text-sm text-gray-500">Invoices</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-50">
                <File className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{templates}</p>
                <p className="text-sm text-gray-500">Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search documents..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Document Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="contract">Contracts</SelectItem>
            <SelectItem value="invoice">Invoices</SelectItem>
            <SelectItem value="template">Templates</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Documents Table */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.map((doc) => {
              const typeConfig = typeIcons[doc.type as keyof typeof typeIcons]
              const Icon = typeConfig?.icon || FileText
              return (
                <TableRow key={doc.id} className="hover:bg-gray-50/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${typeConfig?.color || 'bg-gray-100'}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-gray-900">{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={typeColors[doc.type as keyof typeof typeColors]}>
                      {doc.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">{doc.size}</TableCell>
                  <TableCell className="text-gray-500">{formatDate(doc.created_at)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
