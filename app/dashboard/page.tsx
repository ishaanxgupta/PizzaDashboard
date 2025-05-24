"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pizza, ShoppingCart, Clock, CheckCircle } from "lucide-react"
import { GridBackgroundDemo } from "@/components/custom/background"
import SpotlightCard from "@/components/custom/cards"
import { WorldMapDemo } from "@/components/custom/map"

export default function DashboardPage() {
  const { data: session } = useSession()

  const stats = [
    {
      title: "Total Orders",
      value: "156",
      description: "This month",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Pending Orders",
      value: "12",
      description: "Awaiting preparation",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Completed Orders",
      value: "144",
      description: "Successfully delivered",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Popular Pizza",
      value: "Margherita",
      description: "Most ordered this week",
      icon: Pizza,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="relative z-0">
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10">
        <GridBackgroundDemo />
      </div>

      {/* Foreground Content */}
      <div className="relative px-8 py-4 sm:px-0">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hello, {session?.user?.name}! 👋</h1>
          <p className="mt-2 text-orange-500 dark:text-orange-600">
            Welcome back to your pizza dashboard. Here's what's Cooking today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  {stats.map((stat) => (
    <SpotlightCard
      key={stat.title}
      className="rounded-xl" // remove extra padding here, since Card has its own
      spotlightColor="rgba(255, 85, 0, 0.3)"
    >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">{stat.title}</CardTitle>
          <stat.icon className={`h-6 w-6 ${stat.color}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stat.value}</div>
          <p className="text-xs text-white">{stat.description}</p>
        </CardContent>
    </SpotlightCard>
  ))}
</div>


        {/* Quick Actions */}
        <WorldMapDemo/>
      </div>
    </div>
  )
}
