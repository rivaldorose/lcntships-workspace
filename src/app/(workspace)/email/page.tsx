'use client'

import {
  Mail,
  Settings,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function EmailPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] -m-6 animate-fade-in">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <Mail className="h-10 w-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Email integratie nog niet geconfigureerd
        </h2>
        <p className="text-gray-500 mb-8">
          Koppel je e-mailaccount in de instellingen om e-mails te versturen en ontvangen vanuit je workspace.
        </p>
        <Link href="/settings">
          <Button className="gap-2">
            <Settings className="h-4 w-4" />
            Ga naar Instellingen
          </Button>
        </Link>
      </div>
    </div>
  )
}
