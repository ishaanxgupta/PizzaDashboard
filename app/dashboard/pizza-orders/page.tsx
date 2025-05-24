"use client"

import React from "react"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Clock,
  MapPin,
  Phone,
  DollarSign,
  TrendingUp,
  Pizza,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Truck,
  ChefHat,
  Star,
  Download,
  RefreshCw,
  Activity,
  Save,
  X,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Enhanced mock data with more details
const initialMockOrders = [
  {
    id: "PZA001",
    customerName: "Rahul Sharma",
    customerPhone: "+91 98765 43210",
    customerAvatar: "/placeholder.jpg?height=32&width=32",
    pizzaType: "Paneer Tikka",
    size: "Large",
    quantity: 2,
    price: 599.0,
    orderDate: "2024-01-15 14:30",
    estimatedDelivery: "2024-01-15 15:15",
    status: "Delivered",
    address: "12 MG Road, Bengaluru",
    rating: 5,
    specialInstructions: "Extra paneer, no capsicum",
    paymentMethod: "UPI",
    deliveryDriver: "Ravi Verma",
    preparationTime: 12,
    priority: "normal",
  },
  {
    id: "PZA002",
    customerName: "Priya Singh",
    customerPhone: "+91 91234 56789",
    customerAvatar: "/placeholderf.jpg?height=32&width=32",
    pizzaType: "Pepper Paneer",
    size: "Medium",
    quantity: 1,
    price: 349.0,
    orderDate: "2024-01-15 15:45",
    estimatedDelivery: "2024-01-15 16:30",
    status: "Out for Delivery",
    address: "88 Nehru Nagar, Mumbai",
    rating: null,
    specialInstructions: "Call when outside",
    paymentMethod: "Cash",
    deliveryDriver: "Sunita Mehra",
    preparationTime: 8,
    priority: "high",
  },
  {
    id: "PZA003",
    customerName: "Amit Patel",
    customerPhone: "+91 99887 66554",
    customerAvatar: "/placeholder.jpg?height=32&width=32",
    pizzaType: "Farmhouse",
    size: "Large",
    quantity: 3,
    price: 899.0,
    orderDate: "2024-01-15 16:20",
    estimatedDelivery: "2024-01-15 17:05",
    status: "Preparing",
    address: "45 CG Road, Ahmedabad",
    rating: null,
    specialInstructions: "Less cheese",
    paymentMethod: "Debit Card",
    deliveryDriver: null,
    preparationTime: 15,
    priority: "normal",
  },
  {
    id: "PZA004",
    customerName: "Sneha Reddy",
    customerPhone: "+91 90909 12345",
    customerAvatar: "/placeholderf.jpg?height=32&width=32",
    pizzaType: "Veggie Delight",
    size: "Medium",
    quantity: 1,
    price: 399.0,
    orderDate: "2024-01-15 17:10",
    estimatedDelivery: "2024-01-15 17:55",
    status: "Pending",
    address: "102 Jubilee Hills, Hyderabad",
    rating: null,
    specialInstructions: "No onion, Jain preparation",
    paymentMethod: "Paytm",
    deliveryDriver: null,
    preparationTime: null,
    priority: "urgent",
  },
  {
    id: "PZA005",
    customerName: "Karan Malhotra",
    customerPhone: "+91 99876 54321",
    customerAvatar: "/placeholder.jpg?height=32&width=32",
    pizzaType: "Chicken Dominator",
    size: "Extra Large",
    quantity: 2,
    price: 1049.0,
    orderDate: "2024-01-15 18:00",
    estimatedDelivery: "2024-01-15 18:45",
    status: "Cancelled",
    address: "56 Civil Lines, Delhi",
    rating: 1,
    specialInstructions: "Order cancelled - refund processed",
    paymentMethod: "Credit Card",
    deliveryDriver: null,
    preparationTime: null,
    priority: "normal",
  },
];


const statusConfig = {
  Pending: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
    progress: 10,
    description: "Order received, waiting to start preparation",
  },
  Preparing: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: ChefHat,
    progress: 40,
    description: "Pizza is being prepared in the kitchen",
  },
  "Out for Delivery": {
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: Truck,
    progress: 80,
    description: "On the way to customer",
  },
  Delivered: {
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle2,
    progress: 100,
    description: "Successfully delivered to customer",
  },
  Cancelled: {
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
    progress: 0,
    description: "Order was cancelled",
  },
}

const priorityConfig = {
  urgent: { color: "bg-red-500", label: "Urgent" },
  high: { color: "bg-orange-500", label: "High" },
  normal: { color: "bg-green-500", label: "Normal" },
}

const pizzaTypes = [
  "Margherita",
  "Pepperoni",
  "Hawaiian",
  "Vegetarian Supreme",
  "Meat Lovers",
  "BBQ Chicken",
  "Four Cheese",
]
const pizzaSizes = ["Small", "Medium", "Large", "Extra Large"]
const paymentMethods = ["Credit Card", "Debit Card", "Cash", "Digital Wallet"]

export default function PizzaOrdersPage() {
  const [orders, setOrders] = useState(initialMockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [sortBy, setSortBy] = useState("orderDate")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [viewMode, setViewMode] = useState<"table" | "cards" | "kanban">("cards")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [editingOrder, setEditingOrder] = useState<any>(null)
  const [orderToCancel, setOrderToCancel] = useState<any>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()

  const filteredAndSortedOrders = useMemo(() => {
    const filtered = orders.filter((order) => {
      const matchesSearch =
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.pizzaType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      const matchesPriority = priorityFilter === "all" || order.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })

    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof typeof a]
      let bValue: any = b[sortBy as keyof typeof b]

      if (sortBy === "orderDate") {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      } else if (sortBy === "quantity" || sortBy === "price") {
        aValue = Number(aValue)
        bValue = Number(bValue)
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [orders, searchTerm, statusFilter, priorityFilter, sortBy, sortOrder])

  const stats = useMemo(() => {
    const total = orders.length
    const pending = orders.filter((o) => o.status === "Pending").length
    const preparing = orders.filter((o) => o.status === "Preparing").length
    const outForDelivery = orders.filter((o) => o.status === "Out for Delivery").length
    const delivered = orders.filter((o) => o.status === "Delivered").length
    const cancelled = orders.filter((o) => o.status === "Cancelled").length
    const totalRevenue = orders.filter((o) => o.status === "Delivered").reduce((sum, o) => sum + o.price, 0)
    const avgOrderValue = totalRevenue / delivered || 0

    return { total, pending, preparing, outForDelivery, delivered, cancelled, totalRevenue, avgOrderValue }
  }, [orders])

  // Export functionality
  const handleExport = async () => {
    setIsExporting(true)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    try {
      const csvContent = [
        [
          "Order ID",
          "Customer Name",
          "Pizza Type",
          "Size",
          "Quantity",
          "Price",
          "Status",
          "Order Date",
          "Address",
        ].join(","),
        ...filteredAndSortedOrders.map((order) =>
          [
            order.id,
            `"${order.customerName}"`,
            `"${order.pizzaType}"`,
            order.size,
            order.quantity,
            order.price,
            order.status,
            order.orderDate,
            `"${order.address}"`,
          ].join(","),
        ),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `pizza-orders-${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Export Successful",
        description: `Exported ${filteredAndSortedOrders.length} orders to CSV file.`,
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the orders.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  // Refresh functionality
  const handleRefresh = async () => {
    setIsRefreshing(true)

    // Simulate refresh process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Data Refreshed",
      description: "Order data has been updated successfully.",
    })

    setIsRefreshing(false)
  }

  // Edit order functionality
  const handleEditOrder = (order: any) => {
    setEditingOrder({ ...order })
  }

  const handleSaveEdit = () => {
    if (!editingOrder) return

    setOrders((prevOrders) => prevOrders.map((order) => (order.id === editingOrder.id ? editingOrder : order)))

    toast({
      title: "Order Updated",
      description: `Order ${editingOrder.id} has been updated successfully.`,
    })

    setEditingOrder(null)
  }

  // Cancel order functionality
  const handleCancelOrder = (order: any) => {
    setOrderToCancel(order)
  }

  const confirmCancelOrder = () => {
    if (!orderToCancel) return

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderToCancel.id
          ? { ...order, status: "Cancelled", specialInstructions: "Order cancelled by admin" }
          : order,
      ),
    )

    toast({
      title: "Order Cancelled",
      description: `Order ${orderToCancel.id} has been cancelled successfully.`,
      variant: "destructive",
    })

    setOrderToCancel(null)
    setSelectedOrder(null)
  }

  const OrderCard = ({ order, index }: { order: any; index: number }) => {
    const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon

    return (
      <div
        className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
        style={{
          animationDelay: `${index * 100}ms`,
          animation: "fadeInUp 0.6s ease-out forwards",
        }}
      >
        <Card
          className="hover:shadow-lg transition-all duration-300 border-l-4 cursor-pointer group"
          style={{ borderLeftColor: priorityConfig[order.priority as keyof typeof priorityConfig].color }}
          onClick={() => setSelectedOrder(order)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 transition-transform duration-200 group-hover:scale-110">
                  <AvatarImage src={order.customerAvatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {order.customerName
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg group-hover:text-orange-600 transition-colors duration-200">
                    {order.customerName}
                  </CardTitle>
                  <CardDescription className="flex items-center">
                    <span className="font-mono text-sm">{order.id}</span>
                    <div
                      className={`ml-2 w-2 h-2 rounded-full transition-all duration-300 ${priorityConfig[order.priority as keyof typeof priorityConfig].color}`}
                    />
                  </CardDescription>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="animate-in slide-in-from-top-2 duration-200">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedOrder(order)
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditOrder(order)
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Order
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation() /* Call customer logic */
                    }}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call Customer
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCancelOrder(order)
                    }}
                    disabled={order.status === "Delivered" || order.status === "Cancelled"}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Cancel Order
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Pizza className="h-4 w-4 text-orange-600" />
                <span className="font-medium">{order.pizzaType}</span>
                <Badge variant="outline" className="transition-colors duration-200 group-hover:bg-orange-50">
                  {order.size}
                </Badge>
              </div>
              <span className="text-lg font-bold text-green-600">${order.price}</span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{order.orderDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>Qty: {order.quantity}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{order.address}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={statusConfig[order.status as keyof typeof statusConfig].color}>
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {order.status}
                </Badge>
                {order.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{order.rating}</span>
                  </div>
                )}
              </div>
              <Progress
                value={statusConfig[order.status as keyof typeof statusConfig].progress}
                className="h-2 transition-all duration-500"
              />
            </div>

            {order.deliveryDriver && (
              <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-2 rounded transition-colors duration-200 group-hover:bg-orange-50">
                <Truck className="h-3 w-3" />
                <span>Driver: {order.deliveryDriver}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  const KanbanColumn = ({ status, orders }: { status: string; orders: any[] }) => {
    const StatusIcon = statusConfig[status as keyof typeof statusConfig].icon

    return (
      <div className="flex-1 min-w-80 animate-in slide-in-from-bottom-4 duration-500">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <StatusIcon className="h-5 w-5" />
              <h3 className="font-semibold">{status}</h3>
              <Badge variant="secondary" className="animate-pulse">
                {orders.length}
              </Badge>
            </div>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className="bg-white p-3 rounded border hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => setSelectedOrder(order)}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInLeft 0.5s ease-out forwards",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{order.customerName}</span>
                  <span className="text-xs text-gray-500">{order.id}</span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {order.pizzaType} ({order.size})
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">${order.price}</span>
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${priorityConfig[order.priority as keyof typeof priorityConfig].color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-0 space-y-6">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between animate-in slide-in-from-top-4 duration-500">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="mt-2 text-orange-500">Here is a List of all the Orders</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={isExporting}
            className="transition-all duration-200 hover:scale-105"
          >
            {isExporting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="transition-all duration-200 hover:scale-105"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters and Controls */}
      <Card className="animate-in slide-in-from-bottom-4 duration-500">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search orders, customers, addresses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 transition-all duration-200 focus:scale-105"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 transition-all duration-200 hover:scale-105">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Preparing">Preparing</SelectItem>
                  <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-48 transition-all duration-200 hover:scale-105">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="w-auto">
              <TabsList className="transition-all duration-200 hover:scale-105">
                <TabsTrigger value="cards">Cards</TabsTrigger>
                <TabsTrigger value="table">Table</TabsTrigger>
                <TabsTrigger value="kanban">Kanban</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Content based on view mode */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedOrders.map((order, index) => (
            <OrderCard key={order.id} order={order} index={index} />
          ))}
        </div>
      )}

      {viewMode === "kanban" && (
        <div className="flex gap-6 overflow-x-auto pb-4">
          {Object.keys(statusConfig).map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              orders={filteredAndSortedOrders.filter((o) => o.status === status)}
            />
          ))}
        </div>
      )}

      {viewMode === "table" && (
        <Card className="animate-in slide-in-from-bottom-4 duration-500">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Order Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedOrders.map((order, index) => {
                    const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
                    return (
                      <TableRow
                        key={order.id}
                        className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                        onClick={() => setSelectedOrder(order)}
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animation: "fadeInUp 0.4s ease-out forwards",
                        }}
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={order.customerAvatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {order.customerName
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{order.customerName}</div>
                              <div className="text-sm text-gray-500">{order.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.pizzaType}</div>
                            <div className="text-sm text-gray-500">
                              {order.size} • Qty: {order.quantity}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={statusConfig[order.status as keyof typeof statusConfig].color}
                          >
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${priorityConfig[order.priority as keyof typeof priorityConfig].color}`}
                            />
                            <span className="text-sm">
                              {priorityConfig[order.priority as keyof typeof priorityConfig].label}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">${order.price}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedOrder(order)
                              }}
                              className="transition-all duration-200 hover:scale-110"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditOrder(order)
                              }}
                              className="transition-all duration-200 hover:scale-110"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {filteredAndSortedOrders.length === 0 && (
        <Card className="animate-in slide-in-from-bottom-4 duration-500">
          <CardContent className="text-center py-12">
            <Pizza className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedOrder.customerAvatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {selectedOrder.customerName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{selectedOrder.customerName}</div>
                    <div className="text-sm text-gray-500 font-normal">Order {selectedOrder.id}</div>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Order Status */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant="outline"
                      className={statusConfig[selectedOrder.status as keyof typeof statusConfig].color}
                    >
                      {React.createElement(statusConfig[selectedOrder.status as keyof typeof statusConfig].icon, {
                        className: "mr-1 h-3 w-3",
                      })}
                      {selectedOrder.status}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${priorityConfig[selectedOrder.priority as keyof typeof priorityConfig].color}`}
                      />
                      <span className="text-sm">
                        {priorityConfig[selectedOrder.priority as keyof typeof priorityConfig].label} Priority
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={statusConfig[selectedOrder.status as keyof typeof statusConfig].progress}
                    className="h-3 mb-2"
                  />
                  <p className="text-sm text-gray-600">
                    {statusConfig[selectedOrder.status as keyof typeof statusConfig].description}
                  </p>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Order Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Pizza className="h-4 w-4 text-orange-600" />
                        <div>
                          <div className="font-medium">{selectedOrder.pizzaType}</div>
                          <div className="text-sm text-gray-500">
                            {selectedOrder.size} • Quantity: {selectedOrder.quantity}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <div>
                          <div className="font-medium">${selectedOrder.price}</div>
                          <div className="text-sm text-gray-500">{selectedOrder.paymentMethod}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <div>
                          <div className="font-medium">Ordered: {selectedOrder.orderDate}</div>
                          <div className="text-sm text-gray-500">ETA: {selectedOrder.estimatedDelivery}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Customer & Delivery</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <div>
                          <div className="font-medium">{selectedOrder.customerPhone}</div>
                          <div className="text-sm text-gray-500">Customer Phone</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-red-600" />
                        <div>
                          <div className="font-medium">{selectedOrder.address}</div>
                          <div className="text-sm text-gray-500">Delivery Address</div>
                        </div>
                      </div>
                      {selectedOrder.deliveryDriver && (
                        <div className="flex items-center space-x-3">
                          <Truck className="h-4 w-4 text-purple-600" />
                          <div>
                            <div className="font-medium">{selectedOrder.deliveryDriver}</div>
                            <div className="text-sm text-gray-500">Delivery Driver</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Special Instructions */}
                {selectedOrder.specialInstructions && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Special Instructions</h4>
                    <p className="text-sm text-gray-700">{selectedOrder.specialInstructions}</p>
                  </div>
                )}

                {/* Rating */}
                {selectedOrder.rating && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Customer Rating:</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 transition-colors duration-200 ${i < selectedOrder.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="text-sm text-gray-600">({selectedOrder.rating}/5)</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  <Button
                    size="sm"
                    onClick={() => handleEditOrder(selectedOrder)}
                    className="transition-all duration-200 hover:scale-105"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Order
                  </Button>
                  <Button variant="outline" size="sm" className="transition-all duration-200 hover:scale-105">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Customer
                  </Button>
                  <Button variant="outline" size="sm" className="transition-all duration-200 hover:scale-105">
                    <MapPin className="mr-2 h-4 w-4" />
                    Track Delivery
                  </Button>
                  {selectedOrder.status !== "Delivered" && selectedOrder.status !== "Cancelled" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCancelOrder(selectedOrder)}
                      className="transition-all duration-200 hover:scale-105"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Cancel Order
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Order Modal */}
      <Dialog open={!!editingOrder} onOpenChange={() => setEditingOrder(null)}>
        <DialogContent className="max-w-2xl animate-in slide-in-from-bottom-4 duration-300">
          {editingOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Edit Order {editingOrder.id}</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      value={editingOrder.customerName}
                      onChange={(e) => setEditingOrder({ ...editingOrder, customerName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">Phone Number</Label>
                    <Input
                      id="customerPhone"
                      value={editingOrder.customerPhone}
                      onChange={(e) => setEditingOrder({ ...editingOrder, customerPhone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pizzaType">Pizza Type</Label>
                    <Select
                      value={editingOrder.pizzaType}
                      onValueChange={(value) => setEditingOrder({ ...editingOrder, pizzaType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {pizzaTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="size">Size</Label>
                    <Select
                      value={editingOrder.size}
                      onValueChange={(value) => setEditingOrder({ ...editingOrder, size: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {pizzaSizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={editingOrder.quantity}
                      onChange={(e) => setEditingOrder({ ...editingOrder, quantity: Number.parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={editingOrder.price}
                      onChange={(e) => setEditingOrder({ ...editingOrder, price: Number.parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select
                      value={editingOrder.paymentMethod}
                      onValueChange={(value) => setEditingOrder({ ...editingOrder, paymentMethod: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input
                    id="address"
                    value={editingOrder.address}
                    onChange={(e) => setEditingOrder({ ...editingOrder, address: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialInstructions">Special Instructions</Label>
                  <Textarea
                    id="specialInstructions"
                    value={editingOrder.specialInstructions}
                    onChange={(e) => setEditingOrder({ ...editingOrder, specialInstructions: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={editingOrder.status}
                      onValueChange={(value) => setEditingOrder({ ...editingOrder, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(statusConfig).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={editingOrder.priority}
                      onValueChange={(value) => setEditingOrder({ ...editingOrder, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(priorityConfig).map(([key, config]) => (
                          <SelectItem key={key} value={key}>
                            {config.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setEditingOrder(null)}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit} className="transition-all duration-200 hover:scale-105">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Order Confirmation */}
      <AlertDialog open={!!orderToCancel} onOpenChange={() => setOrderToCancel(null)}>
        <AlertDialogContent className="animate-in slide-in-from-bottom-4 duration-300">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel order {orderToCancel?.id}? This action cannot be undone. The customer will
              be notified and a refund will be processed if payment was already made.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Order</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelOrder}
              className="bg-red-600 hover:bg-red-700 transition-all duration-200 hover:scale-105"
            >
              Cancel Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
