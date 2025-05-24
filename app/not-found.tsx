import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pizza, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader className="pb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Pizza className="h-24 w-24 text-orange-600" />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                !
              </div>
            </div>
          </div>
          <CardTitle className="text-6xl font-bold text-gray-900 mb-4">404</CardTitle>
          <CardDescription className="text-xl text-gray-600">
            Oops! This pizza slice seems to have been delivered to the wrong address.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-gray-500">
            <p className="mb-2">The page you're looking for doesn't exist.</p>
            <p>It might have been moved, deleted, or you entered the wrong URL.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/dashboard">
                <Pizza className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </div>

          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Pages</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/dashboard"
                className="flex items-center p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <Home className="h-5 w-5 text-gray-400 group-hover:text-orange-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Dashboard</div>
                  <div className="text-sm text-gray-500">Main dashboard overview</div>
                </div>
              </Link>

              <Link
                href="/dashboard/pizza-orders"
                className="flex items-center p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <Search className="h-5 w-5 text-gray-400 group-hover:text-orange-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Pizza Orders</div>
                  <div className="text-sm text-gray-500">View and manage orders</div>
                </div>
              </Link>
            </div>
          </div>

          <div className="text-sm text-gray-400 pt-4">Error Code: 404 | Page Not Found</div>
        </CardContent>
      </Card>
    </div>
  )
}
