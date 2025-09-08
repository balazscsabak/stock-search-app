'use client'

import { Badge } from '@/app/(common)/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/(common)/components/ui/card'
import { Separator } from '@/app/(common)/components/ui/separator'

interface CompanyOverviewProps {
  description?: string
  sector?: string
  industry?: string
  country?: string
  currency?: string
}

export function CompanyOverview({
  description,
  sector,
  industry,
  country,
  currency,
}: CompanyOverviewProps) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Company Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {description && (
          <div>
            <h4 className="mb-2 font-semibold">Description</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </div>
        )}

        <Separator />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {sector && (
            <div>
              <h4 className="mb-2 font-semibold">Sector</h4>
              <Badge variant="secondary">{sector}</Badge>
            </div>
          )}
          {industry && (
            <div>
              <h4 className="mb-2 font-semibold">Industry</h4>
              <Badge variant="outline">{industry}</Badge>
            </div>
          )}
          {country && (
            <div>
              <h4 className="mb-2 font-semibold">Country</h4>
              <p className="text-sm">{country}</p>
            </div>
          )}
          {currency && (
            <div>
              <h4 className="mb-2 font-semibold">Currency</h4>
              <p className="text-sm">{currency}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
