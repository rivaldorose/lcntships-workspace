import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect to the workspace dashboard
  redirect('/dashboard')
}
