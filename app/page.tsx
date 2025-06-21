"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  Plus,
  Minus,
  Heart,
  Truck,
  Shield,
  Award,
} from "lucide-react"

interface FoodItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  rating: number
  category: string
  cookTime: string
  isVeg: boolean
  spiceLevel?: number
}

interface CartItem extends FoodItem {
  quantity: number
}

export default function FoodDash() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [favorites, setFavorites] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<any>(null)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  const foodItems: FoodItem[] = [
    // Pizza
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Fresh tomatoes, mozzarella, basil, olive oil on crispy crust",
      price: 299,
      image: "/images/margherita-pizza.jpg",
      rating: 4.8,
      category: "pizza",
      cookTime: "25-30 min",
      isVeg: true,
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      description: "Spicy pepperoni, mozzarella, tomato sauce",
      price: 399,
      image: "/images/pepperoni-pizza.jpg",
      rating: 4.9,
      category: "pizza",
      cookTime: "25-30 min",
      isVeg: false,
    },
    {
      id: 3,
      name: "Veggie Supreme Pizza",
      description: "Bell peppers, mushrooms, onions, olives, tomatoes",
      price: 349,
      image: "/images/veggie-pizza.jpg",
      rating: 4.6,
      category: "pizza",
      cookTime: "25-30 min",
      isVeg: true,
    },

    // Indian Food
    {
      id: 4,
      name: "Butter Chicken",
      description: "Creamy tomato curry with tender chicken pieces",
      price: 280,
      image: "/images/butter-chicken.jpg",
      rating: 4.9,
      category: "indian",
      cookTime: "20-25 min",
      isVeg: false,
      spiceLevel: 2,
    },
    {
      id: 5,
      name: "Paneer Tikka Masala",
      description: "Grilled paneer in rich tomato and cream gravy",
      price: 250,
      image: "/images/paneer-tikka.jpg",
      rating: 4.7,
      category: "indian",
      cookTime: "20-25 min",
      isVeg: true,
      spiceLevel: 2,
    },
    {
      id: 6,
      name: "Biryani (Chicken)",
      description: "Aromatic basmati rice with spiced chicken",
      price: 320,
      image: "/images/biryani.jpg",
      rating: 4.8,
      category: "indian",
      cookTime: "30-35 min",
      isVeg: false,
      spiceLevel: 3,
    },
    {
      id: 7,
      name: "Dal Tadka",
      description: "Yellow lentils tempered with spices",
      price: 180,
      image: "/images/dal-tadka.jpg",
      rating: 4.5,
      category: "indian",
      cookTime: "15-20 min",
      isVeg: true,
      spiceLevel: 1,
    },

    // Chinese Food
    {
      id: 8,
      name: "Chicken Fried Rice",
      description: "Wok-fried rice with chicken and vegetables",
      price: 220,
      image: "/images/fried-rice.jpg",
      rating: 4.6,
      category: "chinese",
      cookTime: "15-20 min",
      isVeg: false,
    },
    {
      id: 9,
      name: "Hakka Noodles",
      description: "Stir-fried noodles with vegetables and sauces",
      price: 200,
      image: "/images/hakka-noodles.jpg",
      rating: 4.5,
      category: "chinese",
      cookTime: "15-20 min",
      isVeg: true,
    },
    {
      id: 10,
      name: "Manchurian (Dry)",
      description: "Crispy vegetable balls in spicy sauce",
      price: 240,
      image: "/images/manchurian.jpg",
      rating: 4.7,
      category: "chinese",
      cookTime: "20-25 min",
      isVeg: true,
      spiceLevel: 2,
    },

    // Burgers
    {
      id: 11,
      name: "Chicken Burger",
      description: "Grilled chicken, lettuce, tomato, special sauce",
      price: 199,
      image: "/images/chicken-burger.jpg",
      rating: 4.6,
      category: "burgers",
      cookTime: "15-20 min",
      isVeg: false,
    },
    {
      id: 12,
      name: "Veg Burger",
      description: "Crispy veg patty with fresh vegetables",
      price: 149,
      image: "/images/veg-burger.jpg",
      rating: 4.4,
      category: "burgers",
      cookTime: "15-20 min",
      isVeg: true,
    },
    {
      id: 13,
      name: "Cheese Burger",
      description: "Beef patty with melted cheese and pickles",
      price: 229,
      image: "/images/cheese-burger.jpg",
      rating: 4.7,
      category: "burgers",
      cookTime: "15-20 min",
      isVeg: false,
    },

    // South Indian
    {
      id: 14,
      name: "Masala Dosa",
      description: "Crispy crepe with spiced potato filling",
      price: 120,
      image: "/images/masala-dosa.jpg",
      rating: 4.8,
      category: "south-indian",
      cookTime: "15-20 min",
      isVeg: true,
    },
    {
      id: 15,
      name: "Idli Sambar",
      description: "Steamed rice cakes with lentil curry",
      price: 80,
      image: "/images/idli-sambar.jpg",
      rating: 4.6,
      category: "south-indian",
      cookTime: "10-15 min",
      isVeg: true,
    },
    {
      id: 16,
      name: "Uttapam",
      description: "Thick pancake with vegetables and chutneys",
      price: 140,
      image: "/images/uttapam.jpg",
      rating: 4.5,
      category: "south-indian",
      cookTime: "15-20 min",
      isVeg: true,
    },

    // Italian
    {
      id: 17,
      name: "Pasta Alfredo",
      description: "Creamy white sauce pasta with herbs",
      price: 280,
      image: "/images/pasta-alfredo.jpg",
      rating: 4.6,
      category: "italian",
      cookTime: "20-25 min",
      isVeg: true,
    },
    {
      id: 18,
      name: "Pasta Arrabbiata",
      description: "Spicy tomato sauce pasta with garlic",
      price: 260,
      image: "/images/pasta-arrabbiata.jpg",
      rating: 4.5,
      category: "italian",
      cookTime: "20-25 min",
      isVeg: true,
      spiceLevel: 2,
    },

    // Desserts
    {
      id: 19,
      name: "Gulab Jamun",
      description: "Sweet milk dumplings in sugar syrup",
      price: 80,
      image: "/images/gulab-jamun.jpg",
      rating: 4.7,
      category: "desserts",
      cookTime: "5-10 min",
      isVeg: true,
    },
    {
      id: 20,
      name: "Chocolate Brownie",
      description: "Rich chocolate brownie with vanilla ice cream",
      price: 150,
      image: "/images/chocolate-brownie.jpg",
      rating: 4.8,
      category: "desserts",
      cookTime: "10-15 min",
      isVeg: true,
    },

    // Beverages
    {
      id: 21,
      name: "Masala Chai",
      description: "Traditional Indian spiced tea",
      price: 30,
      image: "/images/masala-chai.jpg",
      rating: 4.9,
      category: "beverages",
      cookTime: "5-10 min",
      isVeg: true,
    },
    {
      id: 22,
      name: "Fresh Lime Soda",
      description: "Refreshing lime drink with soda",
      price: 50,
      image: "/images/lime-soda.jpg",
      rating: 4.4,
      category: "beverages",
      cookTime: "5 min",
      isVeg: true,
    },
    {
      id: 23,
      name: "Mango Lassi",
      description: "Creamy yogurt drink with mango",
      price: 80,
      image: "/images/mango-lassi.jpg",
      rating: 4.7,
      category: "beverages",
      cookTime: "5 min",
      isVeg: true,
    },

    // Street Food
    {
      id: 24,
      name: "Pani Puri",
      description: "Crispy shells with spiced water and chutneys",
      price: 60,
      image: "/images/pani-puri.jpg",
      rating: 4.8,
      category: "street-food",
      cookTime: "10-15 min",
      isVeg: true,
      spiceLevel: 2,
    },
    {
      id: 25,
      name: "Bhel Puri",
      description: "Puffed rice with vegetables and chutneys",
      price: 70,
      image: "/images/bhel-puri.jpg",
      rating: 4.6,
      category: "street-food",
      cookTime: "10-15 min",
      isVeg: true,
      spiceLevel: 1,
    },
    {
      id: 26,
      name: "Vada Pav",
      description: "Spiced potato fritter in bread bun",
      price: 40,
      image: "/images/vada-pav.jpg",
      rating: 4.7,
      category: "street-food",
      cookTime: "10-15 min",
      isVeg: true,
      spiceLevel: 2,
    },
  ]

  const categories = [
    { id: "all", name: "All", emoji: "🍽️" },
    { id: "indian", name: "Indian", emoji: "🍛" },
    { id: "chinese", name: "Chinese", emoji: "🥢" },
    { id: "pizza", name: "Pizza", emoji: "🍕" },
    { id: "burgers", name: "Burgers", emoji: "🍔" },
    { id: "south-indian", name: "South Indian", emoji: "🥞" },
    { id: "italian", name: "Italian", emoji: "🍝" },
    { id: "desserts", name: "Desserts", emoji: "🍰" },
    { id: "beverages", name: "Beverages", emoji: "🥤" },
    { id: "street-food", name: "Street Food", emoji: "🌮" },
  ]

  const filteredItems =
    activeCategory === "all" ? foodItems : foodItems.filter((item) => item.category === activeCategory)

  const addToCart = (item: FoodItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === id)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem,
        )
      }
      return prevCart.filter((cartItem) => cartItem.id !== id)
    })
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getSpiceIndicator = (level?: number) => {
    if (!level) return null
    return "🌶️".repeat(level)
  }

  const generateOrderId = () => {
    return "FD" + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase()
  }

  const handleLogin = (email: string, password: string) => {
    // Simulate login - in real app, this would be an API call
    const userData = {
      name: email.split("@")[0],
      email: email,
      phone: "+91 9876543210",
    }
    setUser(userData)
    setIsLoginOpen(false)
    // Load user's previous orders (simulated)
    const mockOrders = [
      {
        id: "FD12345678",
        items: ["Butter Chicken", "Naan"],
        total: 350,
        status: "delivered",
        orderTime: new Date(Date.now() - 86400000).toISOString(),
        estimatedTime: "25-30 min",
      },
    ]
    setOrders(mockOrders)
  }

  const handleSignup = (name: string, email: string, phone: string, password: string) => {
    const userData = { name, email, phone }
    setUser(userData)
    setIsSignupOpen(false)
    setOrders([])
  }

  const handleLogout = () => {
    setUser(null)
    setOrders([])
    setCart([])
  }

  const placeOrder = () => {
    if (!user) {
      setIsLoginOpen(true)
      return
    }

    const orderId = generateOrderId()
    const newOrder = {
      id: orderId,
      items: cart.map((item) => `${item.name} x${item.quantity}`),
      total: getTotalPrice() + 20, // Including delivery charges
      status: "confirmed",
      orderTime: new Date().toISOString(),
      estimatedTime: "25-30 min",
      trackingSteps: [
        { step: "Order Confirmed", time: new Date().toISOString(), completed: true },
        { step: "Preparing Food", time: null, completed: false },
        { step: "Out for Delivery", time: null, completed: false },
        { step: "Delivered", time: null, completed: false },
      ],
    }

    setOrders((prev) => [newOrder, ...prev])
    setCurrentOrder(newOrder)
    setCart([])
    setIsOrderTrackingOpen(true)

    // Simulate order progress
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: "preparing",
                trackingSteps: order.trackingSteps.map((step, index) =>
                  index === 1 ? { ...step, time: new Date().toISOString(), completed: true } : step,
                ),
              }
            : order,
        ),
      )
    }, 3000)

    setTimeout(() => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: "out-for-delivery",
                trackingSteps: order.trackingSteps.map((step, index) =>
                  index === 2 ? { ...step, time: new Date().toISOString(), completed: true } : step,
                ),
              }
            : order,
        ),
      )
    }, 8000)

    setTimeout(() => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: "delivered",
                trackingSteps: order.trackingSteps.map((step, index) =>
                  index === 3 ? { ...step, time: new Date().toISOString(), completed: true } : step,
                ),
              }
            : order,
        ),
      )
    }, 15000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Loading FoodDash...
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  FoodDash
                </h1>
                <p className="text-xs text-gray-500">Delicious food delivered fast</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {["Home", "Menu", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-gray-700">Welcome, {user.name}!</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsOrderTrackingOpen(true)}
                    className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                  >
                    Track Orders
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLoginOpen(true)}
                    className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsSignupOpen(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                className="relative hover:bg-orange-50 hover:border-orange-300 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 animate-pulse">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t pt-4 bg-white/90 backdrop-blur-sm rounded-lg">
              <div className="flex flex-col space-y-3">
                {["Home", "Menu", "About", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-orange-500 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-orange-50"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8">
            <img
              src="/images/hero-food.jpg"
              alt="Delicious Food"
              className="w-32 h-32 rounded-full mx-auto shadow-2xl border-4 border-white mb-6 object-cover"
            />
          </div>
          <h2 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Delicious Food
            <span className="block bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              Delivered Fast
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Order your favorite meals from the best restaurants in town. Fast delivery, fresh ingredients, amazing taste
            guaranteed.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Truck className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium">30min Delivery</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Safe & Hygienic</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Award className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">Top Rated</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg px-8 py-4"
            >
              Order Now 🚀
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-orange-50 hover:border-orange-300 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-4"
            >
              View Menu 📋
            </Button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-5xl font-bold text-gray-800 mb-4">Our Delicious Menu</h3>
            <p className="text-xl text-gray-600">Handpicked dishes from the finest kitchens</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`transition-all duration-300 text-sm px-6 py-3 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 shadow-lg"
                    : "hover:bg-orange-50 hover:border-orange-300 shadow-md hover:shadow-lg"
                }`}
              >
                <span className="mr-2">{category.emoji}</span>
                {category.name}
              </Button>
            ))}
          </div>

          {/* Food Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group bg-white/90 backdrop-blur-sm border-0 shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Badge className="bg-green-500/90 hover:bg-green-600 backdrop-blur-sm">
                      <Star className="w-3 h-3 mr-1" />
                      {item.rating}
                    </Badge>
                    {item.isVeg && <Badge className="bg-green-600/90 backdrop-blur-sm">🌱 Veg</Badge>}
                  </div>

                  {/* Favorite Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 p-0"
                    onClick={() => toggleFavorite(item.id)}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(item.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                      } transition-colors duration-300`}
                    />
                  </Button>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                      {item.name}
                    </h4>
                    {item.spiceLevel && <span className="text-sm">{getSpiceIndicator(item.spiceLevel)}</span>}
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                      ₹{item.price}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4 mr-1" />
                      {item.cookTime}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {cart.find((cartItem) => cartItem.id === item.id) && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 p-0 hover:bg-red-50 hover:border-red-300 rounded-full"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-bold text-lg min-w-[2rem] text-center">
                            {cart.find((cartItem) => cartItem.id === item.id)?.quantity || 0}
                          </span>
                        </>
                      )}
                    </div>
                    <Button
                      onClick={() => addToCart(item)}
                      className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <section className="py-8 px-4 bg-gradient-to-r from-orange-100 to-red-100">
          <div className="container mx-auto">
            <Card className="max-w-md mx-auto shadow-2xl bg-white/95 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <h4 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Order Summary 🛒
                </h4>
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-500 text-sm block">x{item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-orange-600">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span>Total:</span>
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                      ₹{getTotalPrice()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">+ ₹20 delivery charges</p>
                </div>
                <Button
                  onClick={placeOrder}
                  className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg py-4"
                  size="lg"
                >
                  {user ? "Place Order 🚀" : "Login to Order 🔐"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-5xl font-bold text-gray-800 mb-6">About FoodDash</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're passionate about bringing you the best food from your favorite restaurants, delivered fresh and
                fast to your doorstep. Our mission is to make great food accessible to everyone, anytime, anywhere.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "500+", label: "Restaurants", color: "text-orange-500" },
                  { number: "10k+", label: "Happy Customers", color: "text-red-500" },
                  { number: "30min", label: "Avg Delivery", color: "text-green-500" },
                  { number: "4.8★", label: "Rating", color: "text-blue-500" },
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                    <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/hero-food.jpg"
                alt="About FoodDash"
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold text-center text-gray-800 mb-12">Contact Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Address",
                info: "Food Street, City, Delhi 6",
                color: "from-orange-500 to-red-500",
              },
              { icon: Phone, title: "Phone", info: "+91 8877002297", color: "from-red-500 to-pink-500" },
              { icon: Mail, title: "Email", info: "hello@fooddash.com", color: "from-pink-500 to-purple-500" },
            ].map((contact, index) => (
              <Card
                key={index}
                className="text-center p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${contact.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl`}
                >
                  <contact.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-4">{contact.title}</h4>
                <p className="text-gray-600 text-lg">{contact.info}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <div>
                  <h5 className="text-2xl font-bold">FoodDash</h5>
                  <p className="text-gray-400 text-sm">Delivering happiness</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Delivering happiness, one meal at a time. Experience the best food delivery service in town.
              </p>
            </div>

            {[
              { title: "Quick Links", items: ["Home", "Menu", "About", "Contact"] },
              { title: "Services", items: ["Food Delivery", "Catering", "Corporate Orders", "Gift Cards"] },
              { title: "Follow Us", items: ["Facebook", "Twitter", "Instagram", "YouTube"] },
            ].map((section, index) => (
              <div key={index}>
                <h6 className="font-bold mb-4 text-lg">{section.title}</h6>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:underline"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 FoodDash. All rights reserved. Made with ❤️ for food lovers.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">🔐</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Welcome Back!</h3>
                <p className="text-gray-600">Login to your FoodDash account</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.target as HTMLFormElement)
                  handleLogin(formData.get("email") as string, formData.get("password") as string)
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsLoginOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    Login
                  </Button>
                </div>
              </form>

              <p className="text-center mt-4 text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setIsLoginOpen(false)
                    setIsSignupOpen(true)
                  }}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Sign up here
                </button>
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">👋</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Join FoodDash!</h3>
                <p className="text-gray-600">Create your account to start ordering</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.target as HTMLFormElement)
                  handleSignup(
                    formData.get("name") as string,
                    formData.get("email") as string,
                    formData.get("phone") as string,
                    formData.get("password") as string,
                  )
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Create a password"
                  />
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsSignupOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    Sign Up
                  </Button>
                </div>
              </form>

              <p className="text-center mt-4 text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setIsSignupOpen(false)
                    setIsLoginOpen(true)
                  }}
                  className="text-green-500 hover:text-green-600 font-medium"
                >
                  Login here
                </button>
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Order Tracking Modal */}
      {isOrderTrackingOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Order Tracking</h3>
                  <p className="text-gray-600">Track your delicious orders</p>
                </div>
                <Button variant="ghost" onClick={() => setIsOrderTrackingOpen(false)} className="w-10 h-10 p-0">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">📦</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">No Orders Yet</h4>
                  <p className="text-gray-600">Start ordering to see your order history here!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <Card
                      key={order.id}
                      className="border-2 border-gray-100 hover:border-orange-200 transition-colors duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-bold text-gray-800">Order #{order.id}</h4>
                            <p className="text-sm text-gray-500">{new Date(order.orderTime).toLocaleString()}</p>
                          </div>
                          <Badge
                            className={`${
                              order.status === "delivered"
                                ? "bg-green-500"
                                : order.status === "out-for-delivery"
                                  ? "bg-blue-500"
                                  : order.status === "preparing"
                                    ? "bg-yellow-500"
                                    : "bg-orange-500"
                            }`}
                          >
                            {order.status.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Items:</p>
                          <div className="flex flex-wrap gap-2">
                            {order.items.map((item, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <span className="font-semibold text-gray-800">Total: ₹{order.total}</span>
                          <span className="text-sm text-gray-500">Est. {order.estimatedTime}</span>
                        </div>

                        {/* Order Tracking Steps */}
                        {order.trackingSteps && (
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-gray-700">Order Progress:</p>
                            {order.trackingSteps.map((step, index) => (
                              <div key={index} className="flex items-center space-x-3">
                                <div
                                  className={`w-4 h-4 rounded-full ${step.completed ? "bg-green-500" : "bg-gray-300"}`}
                                ></div>
                                <div className="flex-1">
                                  <p
                                    className={`text-sm ${step.completed ? "text-green-700 font-medium" : "text-gray-500"}`}
                                  >
                                    {step.step}
                                  </p>
                                  {step.time && (
                                    <p className="text-xs text-gray-400">{new Date(step.time).toLocaleTimeString()}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
