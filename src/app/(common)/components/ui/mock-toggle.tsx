'use client'

import { Card } from '@/app/(common)/components/ui/card'
import { Label } from '@/app/(common)/components/ui/label'
import { Switch } from '@/app/(common)/components/ui/switch'

interface MockToggleProps {
  isMock: boolean
  onToggle: (isMock: boolean) => void
}

export function MockToggle({ isMock, onToggle }: MockToggleProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center space-x-2">
        <Switch id="mock-toggle" checked={isMock} onCheckedChange={onToggle} />
        <Label htmlFor="mock-toggle" className="text-sm font-medium">
          Use Mock Data
        </Label>
      </div>
      <p className="text-muted-foreground mt-1 text-xs">
        {isMock
          ? 'Using sample data for development'
          : 'Using live Alpha Vantage API data'}
      </p>
    </Card>
  )
}
