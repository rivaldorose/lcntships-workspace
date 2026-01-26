'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  Inbox,
  Send,
  FileText,
  Trash2,
  Users,
  UserCheck,
  AlertCircle,
  AtSign,
  Settings,
  Filter,
  Edit,
  Archive,
  Flag,
  Clock,
  Folder,
  MoreVertical,
  Sparkles,
  Download,
  Building2,
  ExternalLink,
  Plus,
  Paperclip,
  Smile,
  ChevronDown,
  SendHorizontal,
  X,
  Minus,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Image,
  RefreshCw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// Mock email data
const mockEmails = [
  {
    id: '1',
    sender: 'Alex Johnson',
    senderEmail: 'alex.johnson@example.com',
    avatar: null,
    avatarInitials: 'AJ',
    subject: 'Partnership Proposal: Q4 Campaign',
    preview: "Hi team, I've attached the draft for our upcoming influencer partnership program for review...",
    time: '10:45 AM',
    date: 'Today',
    isRead: false,
    isSelected: true,
    tags: [
      { label: 'Assigned', color: 'bg-indigo-100 text-indigo-600' },
      { label: 'High Priority', color: 'bg-orange-100 text-orange-600' },
    ],
    body: `<p>Hi Team,</p>
<p>I hope you're all having a great week. Following up on our last strategy call, I've put together a comprehensive draft for our Q4 influencer partnership program.</p>
<p>The primary focus for this quarter will be on "Authentic Growth" – highlighting how our platform empowers creators to build sustainable communities rather than just chasing metrics.</p>
<p>Key highlights of the proposal include:</p>
<ul>
<li>Collaboration with 15 tier-1 tech creators.</li>
<li>Integrated dashboard preview feature for multi-platform analytics.</li>
<li>Co-branded educational content series.</li>
</ul>
<p>I've attached the full breakdown and financial estimates in the PDF below. Looking forward to your thoughts!</p>
<p>Best regards,<br/><strong>Alex Johnson</strong><br/>Head of Growth, Global Connect</p>`,
    attachments: [
      { name: 'Q4_Campaign_v2.pdf', size: '2.4 MB', type: 'pdf' },
    ],
    contact: {
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      company: 'Global Connect',
      companyType: 'Tech & Growth Agency',
      isVip: true,
      lifetimeValue: '$12,450',
      renewalDate: 'Dec 12, 2023',
      documents: [
        { name: 'Contract_2023_Final.docx', type: 'doc' },
        { name: 'Invoice_Sept_23.pdf', type: 'invoice' },
      ],
    },
  },
  {
    id: '2',
    sender: 'Dribbble Feedback',
    senderEmail: 'notifications@dribbble.com',
    avatar: null,
    avatarInitials: 'DF',
    subject: 'New Comment on "Workspace UI"',
    preview: 'Someone just left a comment on your latest shot. "This looks incredibly clean and functional!"',
    time: 'Yesterday',
    date: 'Yesterday',
    isRead: true,
    isSelected: false,
    tags: [],
    body: '<p>Someone just left a comment on your latest shot. "This looks incredibly clean and functional!"</p>',
    attachments: [],
    contact: null,
  },
  {
    id: '3',
    sender: 'Marcus Thorne',
    senderEmail: 'marcus@company.com',
    avatar: null,
    avatarInitials: 'MT',
    subject: 'Technical specification for API v2',
    preview: "I've updated the documentation for the new endpoints we discussed during the standup.",
    time: 'Yesterday',
    date: 'Yesterday',
    isRead: true,
    isSelected: false,
    tags: [
      { label: 'Engineering', color: 'bg-slate-100 text-slate-600' },
    ],
    body: '<p>I\'ve updated the documentation for the new endpoints we discussed during the standup.</p>',
    attachments: [],
    contact: null,
  },
  {
    id: '4',
    sender: 'Amazon AWS',
    senderEmail: 'billing@aws.amazon.com',
    avatar: null,
    avatarInitials: 'AW',
    subject: 'Your monthly billing statement is ready',
    preview: 'Your October invoice for account 992-XXXX has been processed. Total amount due: $142.50.',
    time: 'Oct 22',
    date: 'Oct 22',
    isRead: true,
    isSelected: false,
    tags: [],
    body: '<p>Your October invoice for account 992-XXXX has been processed. Total amount due: $142.50.</p>',
    attachments: [],
    contact: null,
  },
  {
    id: '5',
    sender: 'Elena Rodriguez',
    senderEmail: 'elena@company.com',
    avatar: null,
    avatarInitials: 'ER',
    subject: 'Client Meeting: Design Review',
    preview: "Can we move tomorrow's meeting to 3 PM? The client has a conflict in their morning schedule.",
    time: 'Oct 21',
    date: 'Oct 21',
    isRead: true,
    isSelected: false,
    tags: [],
    body: '<p>Can we move tomorrow\'s meeting to 3 PM? The client has a conflict in their morning schedule.</p>',
    attachments: [],
    contact: null,
  },
]

const folders = [
  { id: 'inbox', label: 'Inbox', icon: Inbox, count: 12, active: true },
  { id: 'sent', label: 'Sent', icon: Send, count: 0, active: false },
  { id: 'drafts', label: 'Drafts', icon: FileText, count: 0, active: false },
  { id: 'trash', label: 'Trash', icon: Trash2, count: 0, active: false },
]

const sharedFolders = [
  { id: 'all-shared', label: 'All Shared', icon: Users },
  { id: 'assigned', label: 'Assigned to me', icon: UserCheck },
  { id: 'unassigned', label: 'Unassigned', icon: AlertCircle },
  { id: 'mentions', label: 'Mentions', icon: AtSign },
]

// Email Sidebar Component
function EmailSidebar({
  activeFolder,
  setActiveFolder,
}: {
  activeFolder: string
  setActiveFolder: (folder: string) => void
}) {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex-shrink-0 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Folders
          </p>
          {folders.map((folder) => {
            const Icon = folder.icon
            const isActive = activeFolder === folder.id
            return (
              <button
                key={folder.id}
                onClick={() => setActiveFolder(folder.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-colors',
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Icon className={cn('h-5 w-5', isActive && 'fill-current')} />
                <span className="text-sm font-medium">{folder.label}</span>
                {folder.count > 0 && (
                  <span
                    className={cn(
                      'ml-auto text-xs font-bold px-2 py-0.5 rounded-full',
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    )}
                  >
                    {folder.count}
                  </span>
                )}
              </button>
            )
          })}

          <div className="my-6">
            <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Shared
            </p>
            {sharedFolders.map((folder) => {
              const Icon = folder.icon
              return (
                <button
                  key={folder.id}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{folder.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
          <Settings className="h-5 w-5" />
          <span className="text-sm font-medium">Settings</span>
        </button>
      </div>
    </aside>
  )
}

// Email List Component
function EmailList({
  emails,
  selectedEmailId,
  onSelectEmail,
  onCompose,
}: {
  emails: typeof mockEmails
  selectedEmailId: string | null
  onSelectEmail: (id: string) => void
  onCompose: () => void
}) {
  return (
    <div className="w-96 flex-shrink-0 border-r border-gray-100 flex flex-col bg-white">
      <header className="h-16 flex items-center justify-between px-6 border-b border-gray-100 shrink-0">
        <h2 className="text-lg font-bold text-gray-900">Inbox</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-500">
            <Filter className="h-5 w-5" />
          </button>
          <button
            onClick={onCompose}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Edit className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {emails.map((email) => (
          <div
            key={email.id}
            onClick={() => onSelectEmail(email.id)}
            className={cn(
              'p-4 border-b border-gray-100 cursor-pointer transition-colors',
              selectedEmailId === email.id
                ? 'bg-indigo-50/50 border-l-4 border-l-indigo-600'
                : 'hover:bg-gray-50'
            )}
          >
            <div className="flex justify-between items-start mb-1">
              <span
                className={cn(
                  'text-sm',
                  !email.isRead || selectedEmailId === email.id
                    ? 'font-bold text-gray-900'
                    : 'font-medium text-gray-900'
                )}
              >
                {email.sender}
              </span>
              <span className="text-[11px] text-gray-400 font-medium">
                {email.time}
              </span>
            </div>
            <h3
              className={cn(
                'text-sm mb-1 truncate',
                selectedEmailId === email.id
                  ? 'font-semibold text-indigo-600'
                  : 'font-semibold text-gray-800'
              )}
            >
              {email.subject}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
              {email.preview}
            </p>
            {email.tags.length > 0 && (
              <div className="mt-3 flex gap-2">
                {email.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={cn(
                      'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase',
                      tag.color
                    )}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Email Detail Component
function EmailDetail({
  email,
  showAiDraft,
  setShowAiDraft,
}: {
  email: typeof mockEmails[0]
  showAiDraft: boolean
  setShowAiDraft: (show: boolean) => void
}) {
  const [aiPrompt, setAiPrompt] = useState(
    'Thank Alex for the proposal and mention we will review the PDF by Friday.'
  )
  const [selectedStyle, setSelectedStyle] = useState('professional')

  const styles = ['Professional', 'Casual', 'Shorten', 'Elaborate']

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white">
      {/* Toolbar */}
      <header className="h-16 flex items-center justify-between px-8 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-600">
            <Archive className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-600">
            <Flag className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-lg text-red-500">
            <Trash2 className="h-5 w-5" />
          </button>
          <div className="h-6 w-px bg-gray-200" />
          <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-600">
            <Clock className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-600">
            <Folder className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAiDraft(!showAiDraft)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all',
              showAiDraft
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
            )}
          >
            <Sparkles className="h-4 w-4" />
            <span>{showAiDraft ? 'AI Draft Active' : 'AI Draft'}</span>
          </button>
          <Button variant="outline" className="rounded-xl">
            Reply
          </Button>
          <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-600">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Email Content */}
      <div className="flex-1 flex overflow-hidden relative">
        <div
          className={cn(
            'flex-1 overflow-y-auto p-10',
            showAiDraft && 'pb-96'
          )}
        >
          <div className="max-w-3xl mx-auto">
            {/* Email Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                  {email.avatarInitials}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {email.sender}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {email.senderEmail}{' '}
                    <span className="mx-1 text-gray-300">•</span> to Workspace
                    Team
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-400">{email.time} (2 hours ago)</p>
            </div>

            {/* Email Subject */}
            <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
              {email.subject}
            </h1>

            {/* Email Body */}
            <div
              className="prose prose-slate max-w-none text-gray-600 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: email.body }}
            />

            {/* Attachments */}
            {email.attachments.length > 0 && (
              <div className="mt-12 p-4 border border-gray-200 rounded-2xl flex items-center justify-between bg-gray-50/30">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {email.attachments[0].name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {email.attachments[0].size}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white rounded-lg text-gray-400 transition-colors">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* AI Draft Panel */}
        {showAiDraft && (
          <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 p-6 z-10 shadow-2xl">
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="space-y-3">
                <div className="relative">
                  <Input
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="How should I reply?"
                    className="w-full pl-12 pr-4 py-4 h-14 bg-white border-gray-200 rounded-2xl text-sm shadow-sm"
                  />
                  <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-600" />
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-2">
                    Style
                  </span>
                  {styles.map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style.toLowerCase())}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-semibold transition-colors',
                        selectedStyle === style.toLowerCase()
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-300'
                      )}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Generated Response */}
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 relative">
                <div className="absolute top-4 right-4 flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse [animation-delay:200ms]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse [animation-delay:400ms]" />
                </div>
                <div className="prose prose-sm text-gray-700 leading-relaxed">
                  <p className="font-medium">Hi Alex,</p>
                  <p>
                    Thank you for sending over the Q4 partnership proposal and
                    the "Authentic Growth" strategy. It looks like a great
                    direction for the upcoming quarter.
                  </p>
                  <p>
                    I've received the PDF with the financial estimates and the
                    tier-1 creator list. Our team will review the full breakdown
                    in detail and we'll get back to you with our feedback by
                    this Friday.
                  </p>
                  <p>Best regards,</p>
                </div>
              </div>

              {/* AI Actions */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-3">
                  <Button className="px-5 py-2.5 rounded-xl shadow-md shadow-indigo-200">
                    Insert to Reply
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-xl flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Regenerate
                  </Button>
                </div>
                <button
                  onClick={() => setShowAiDraft(false)}
                  className="px-5 py-2.5 text-gray-400 hover:text-gray-600 text-sm font-bold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Sidebar */}
        {email.contact && (
          <aside className="w-80 border-l border-gray-100 bg-white overflow-y-auto">
            <div className="p-6">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-2xl mb-4 border-4 border-white shadow-xl">
                  {email.avatarInitials}
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {email.contact.name}
                </h3>
                {email.contact.isVip && (
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mt-2">
                    VIP Customer
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {/* Company */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Company
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {email.contact.company}
                      </p>
                      <p className="text-xs text-gray-500">
                        {email.contact.companyType}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Finance Status */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Finance Status
                  </p>
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-emerald-600 font-bold">
                        Lifetime Value
                      </span>
                      <span className="text-xs font-bold text-emerald-700">
                        {email.contact.lifetimeValue}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-emerald-600 font-bold">
                        Renewal Date
                      </span>
                      <span className="text-xs font-bold text-emerald-700">
                        {email.contact.renewalDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Related Documents */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Related Documents
                  </p>
                  <div className="space-y-2">
                    {email.contact.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
                      >
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-xs font-medium text-gray-700 flex-1 truncate">
                          {doc.name}
                        </span>
                        <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-indigo-600" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add CRM Note */}
                <div className="pt-4 border-t border-gray-100">
                  <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:text-indigo-600 hover:border-indigo-300 transition-all">
                    <Plus className="h-4 w-4" />
                    <span>Add CRM Note</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

// Compose Modal Component
interface ComposeModalProps {
  isOpen: boolean
  onClose: () => void
}

function ComposeModal({ isOpen, onClose }: ComposeModalProps) {
  const [mounted, setMounted] = useState(false)
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isOpen || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-[2px] z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 max-h-[90vh] animate-fade-in">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <h3 className="font-bold text-gray-900">New Message</h3>
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
              <Minus className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* To/Subject */}
        <div className="px-6 py-1">
          <div className="flex items-center border-b border-gray-100 py-2.5">
            <span className="text-sm font-medium text-gray-500 w-16">To</span>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Recipients"
              className="flex-1 border-none focus:ring-0 bg-transparent text-sm p-0 placeholder-gray-400"
            />
            <button className="text-xs font-semibold text-gray-400 hover:text-indigo-600 transition-colors">
              Cc/Bcc
            </button>
          </div>
          <div className="flex items-center border-b border-gray-100 py-2.5">
            <span className="text-sm font-medium text-gray-500 w-16">
              Subject
            </span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter message subject"
              className="flex-1 border-none focus:ring-0 bg-transparent text-sm p-0 placeholder-gray-400 font-medium"
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-2 bg-gray-50 flex items-center gap-1 border-b border-gray-100">
          <button className="p-1.5 hover:bg-white rounded-md text-gray-600 transition-all">
            <Bold className="h-5 w-5" />
          </button>
          <button className="p-1.5 hover:bg-white rounded-md text-gray-600 transition-all">
            <Italic className="h-5 w-5" />
          </button>
          <button className="p-1.5 hover:bg-white rounded-md text-gray-600 transition-all">
            <Underline className="h-5 w-5" />
          </button>
          <div className="w-px h-5 bg-gray-300 mx-1" />
          <button className="p-1.5 hover:bg-white rounded-md text-gray-600 transition-all">
            <List className="h-5 w-5" />
          </button>
          <button className="p-1.5 hover:bg-white rounded-md text-gray-600 transition-all">
            <ListOrdered className="h-5 w-5" />
          </button>
          <div className="w-px h-5 bg-gray-300 mx-1" />
          <button className="p-1.5 hover:bg-white rounded-md text-gray-600 transition-all">
            <Link className="h-5 w-5" />
          </button>
          <button className="p-1.5 hover:bg-white rounded-md text-gray-600 transition-all">
            <Image className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 p-6 min-h-[300px] overflow-y-auto">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your message here..."
            className="w-full h-full border-none focus:ring-0 bg-transparent text-gray-700 resize-none p-0 text-sm leading-relaxed"
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors border border-indigo-100">
              <Sparkles className="h-4 w-4" />
              <span>AI Generate</span>
            </button>
            <button
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              title="Attach Files"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <button
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              title="Insert Emoji"
            >
              <Smile className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Discard
            </button>
            <div className="flex">
              <Button className="rounded-l-xl rounded-r-none px-5 py-2.5 flex items-center gap-2">
                <span>Send</span>
                <SendHorizontal className="h-4 w-4" />
              </Button>
              <div className="w-px bg-white/20" />
              <Button className="rounded-r-xl rounded-l-none px-2">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

// Main Email Page Component
export default function EmailPage() {
  const [activeFolder, setActiveFolder] = useState('inbox')
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>('1')
  const [showAiDraft, setShowAiDraft] = useState(false)
  const [showCompose, setShowCompose] = useState(false)

  const selectedEmail = mockEmails.find((e) => e.id === selectedEmailId)

  return (
    <div className="h-[calc(100vh-64px)] -m-6 flex animate-fade-in">
      {/* Email Sidebar */}
      <EmailSidebar activeFolder={activeFolder} setActiveFolder={setActiveFolder} />

      {/* Email List */}
      <EmailList
        emails={mockEmails}
        selectedEmailId={selectedEmailId}
        onSelectEmail={setSelectedEmailId}
        onCompose={() => setShowCompose(true)}
      />

      {/* Email Detail */}
      {selectedEmail ? (
        <EmailDetail
          email={selectedEmail}
          showAiDraft={showAiDraft}
          setShowAiDraft={setShowAiDraft}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <Inbox className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Select an email
            </h3>
            <p className="text-gray-500">
              Choose an email from the list to view its contents
            </p>
          </div>
        </div>
      )}

      {/* Compose Modal */}
      <ComposeModal isOpen={showCompose} onClose={() => setShowCompose(false)} />
    </div>
  )
}
