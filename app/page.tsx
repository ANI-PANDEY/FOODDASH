"use client"

import { useState } from "react"
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
  CreditCard,
  Wallet,
  Smartphone,
} from "lucide-react"

interface FoodItem {
  id: number
  name: string
  description: string
  price: number
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
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false)
  const [isStoresOpen, setIsStoresOpen] = useState(false)
  const [activeStoreFilter, setActiveStoreFilter] = useState("all")
  const [reviews, setReviews] = useState<any[]>([])
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [selectedItemForReview, setSelectedItemForReview] = useState<FoodItem | null>(null)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const foodItems: FoodItem[] = [
    // Pizza Items
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Fresh tomatoes, mozzarella, basil, olive oil on crispy crust",
      price: 299,
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
      rating: 4.6,
      category: "pizza",
      cookTime: "25-30 min",
      isVeg: true,
    },

    // Indian Food Items
    {
      id: 4,
      name: "Butter Chicken",
      description: "Creamy tomato curry with tender chicken pieces",
      price: 280,
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
      rating: 4.7,
      category: "indian",
      cookTime: "20-25 min",
      isVeg: true,
      spiceLevel: 2,
    },
    {
      id: 6,
      name: "Chicken Biryani",
      description: "Aromatic basmati rice with spiced chicken and herbs",
      price: 320,
      rating: 4.8,
      category: "indian",
      cookTime: "30-35 min",
      isVeg: false,
      spiceLevel: 3,
    },
    {
      id: 7,
      name: "Dal Tadka",
      description: "Yellow lentils tempered with aromatic spices",
      price: 180,
      rating: 4.5,
      category: "indian",
      cookTime: "15-20 min",
      isVeg: true,
      spiceLevel: 1,
    },

    // Chinese Food Items
    {
      id: 8,
      name: "Chicken Fried Rice",
      description: "Wok-fried rice with chicken, vegetables and soy sauce",
      price: 220,
      rating: 4.6,
      category: "chinese",
      cookTime: "15-20 min",
      isVeg: false,
    },
    {
      id: 9,
      name: "Hakka Noodles",
      description: "Stir-fried noodles with vegetables and Chinese sauces",
      price: 200,
      rating: 4.5,
      category: "chinese",
      cookTime: "15-20 min",
      isVeg: true,
    },
    {
      id: 10,
      name: "Veg Manchurian",
      description: "Crispy vegetable balls in spicy Indo-Chinese sauce",
      price: 240,
      rating: 4.7,
      category: "chinese",
      cookTime: "20-25 min",
      isVeg: true,
      spiceLevel: 2,
    },

    // Burger Items
    {
      id: 11,
      name: "Chicken Burger",
      description: "Grilled chicken patty with lettuce, tomato and special sauce",
      price: 199,
      rating: 4.6,
      category: "burgers",
      cookTime: "15-20 min",
      isVeg: false,
    },
    {
      id: 12,
      name: "Veg Burger",
      description: "Crispy vegetable patty with fresh vegetables and mayo",
      price: 149,
      rating: 4.4,
      category: "burgers",
      cookTime: "15-20 min",
      isVeg: true,
    },
    {
      id: 13,
      name: "Cheese Burger",
      description: "Juicy beef patty with melted cheese and pickles",
      price: 229,
      rating: 4.7,
      category: "burgers",
      cookTime: "15-20 min",
      isVeg: false,
    },

    // South Indian Items
    {
      id: 14,
      name: "Masala Dosa",
      description: "Crispy rice crepe filled with spiced potato curry",
      price: 120,
      rating: 4.8,
      category: "south-indian",
      cookTime: "15-20 min",
      isVeg: true,
    },
    {
      id: 15,
      name: "Idli Sambar",
      description: "Steamed rice cakes served with lentil curry and chutney",
      price: 80,
      rating: 4.6,
      category: "south-indian",
      cookTime: "10-15 min",
      isVeg: true,
    },
    {
      id: 16,
      name: "Uttapam",
      description: "Thick rice pancake topped with vegetables and served with chutney",
      price: 140,
      rating: 4.5,
      category: "south-indian",
      cookTime: "15-20 min",
      isVeg: true,
    },

    // Italian Items
    {
      id: 17,
      name: "Pasta Alfredo",
      description: "Creamy white sauce pasta with parmesan and herbs",
      price: 280,
      rating: 4.6,
      category: "italian",
      cookTime: "20-25 min",
      isVeg: true,
    },
    {
      id: 18,
      name: "Pasta Arrabbiata",
      description: "Spicy tomato sauce pasta with garlic and red chilies",
      price: 260,
      rating: 4.5,
      category: "italian",
      cookTime: "20-25 min",
      isVeg: true,
      spiceLevel: 2,
    },

    // Dessert Items
    {
      id: 19,
      name: "Gulab Jamun",
      description: "Sweet milk dumplings soaked in rose-flavored sugar syrup",
      price: 80,
      rating: 4.7,
      category: "desserts",
      cookTime: "5-10 min",
      isVeg: true,
    },
    {
      id: 20,
      name: "Chocolate Brownie",
      description: "Rich chocolate brownie served with vanilla ice cream",
      price: 150,
      rating: 4.8,
      category: "desserts",
      cookTime: "10-15 min",
      isVeg: true,
    },

    // Beverage Items
    {
      id: 21,
      name: "Masala Chai",
      description: "Traditional Indian spiced tea with milk and aromatic spices",
      price: 30,
      rating: 4.9,
      category: "beverages",
      cookTime: "5-10 min",
      isVeg: true,
    },
    {
      id: 22,
      name: "Fresh Lime Soda",
      description: "Refreshing lime drink with soda water and mint",
      price: 50,
      rating: 4.4,
      category: "beverages",
      cookTime: "5 min",
      isVeg: true,
    },
    {
      id: 23,
      name: "Mango Lassi",
      description: "Creamy yogurt drink blended with fresh mango pulp",
      price: 80,
      rating: 4.7,
      category: "beverages",
      cookTime: "5 min",
      isVeg: true,
    },

    // Street Food Items
    {
      id: 24,
      name: "Pani Puri",
      description: "Crispy hollow shells filled with spiced water and chutneys",
      price: 60,
      rating: 4.8,
      category: "street-food",
      cookTime: "10-15 min",
      isVeg: true,
      spiceLevel: 2,
    },
    {
      id: 25,
      name: "Bhel Puri",
      description: "Puffed rice mixed with vegetables, chutneys and sev",
      price: 70,
      rating: 4.6,
      category: "street-food",
      cookTime: "10-15 min",
      isVeg: true,
      spiceLevel: 1,
    },
    {
      id: 26,
      name: "Vada Pav",
      description: "Spiced potato fritter served in bread bun with chutneys",
      price: 40,
      rating: 4.7,
      category: "street-food",
      cookTime: "10-15 min",
      isVeg: true,
      spiceLevel: 2,
    },
  ]

  const partnerStores = [
    {
      id: 1,
      name: "Spice Garden",
      cuisine: "Indian",
      rating: 4.8,
      deliveryTime: "25-30 min",
      image: "/placeholder.svg?height=200&width=300",
      specialties: ["Butter Chicken", "Biryani", "Dal Tadka"],
      offers: "20% OFF on orders above ₹300",
      isVeg: false,
      location: "Connaught Place",
      established: "2018",
      totalOrders: "10k+",
    },
    {
      id: 2,
      name: "Pizza Palace",
      cuisine: "Italian",
      rating: 4.7,
      deliveryTime: "20-25 min",
      image: "/placeholder.svg?height=200&width=300",
      specialties: ["Margherita Pizza", "Pepperoni Pizza", "Garlic Bread"],
      offers: "Buy 1 Get 1 Free on Large Pizzas",
      isVeg: false,
      location: "Khan Market",
      established: "2020",
      totalOrders: "8k+",
    },
    {
      id: 3,
      name: "Dragon Wok",
      cuisine: "Chinese",
      rating: 4.6,
      deliveryTime: "15-20 min",
      image: "/placeholder.svg?height=200&width=300",
      specialties: ["Hakka Noodles", "Fried Rice", "Manchurian"],
      offers: "Free delivery on orders above ₹200",
      isVeg: false,
      location: "Lajpat Nagar",
      established: "2019",
      totalOrders: "12k+",
    },
    {
      id: 4,
      name: "Burger Junction",
      cuisine: "American",
      rating: 4.5,
      deliveryTime: "15-20 min",
      image: "/placeholder.svg?height=200&width=300",
      specialties: ["Chicken Burger", "Cheese Burger", "Fries"],
      offers: "₹50 OFF on first order",
      isVeg: false,
      location: "CP Metro Station",
      established: "2021",
      totalOrders: "6k+",
    },
    {
      id: 5,
      name: "South Delights",
      cuisine: "South Indian",
      rating: 4.9,
      deliveryTime: "20-25 min",
      image: "/placeholder.svg?height=200&width=300",
      specialties: ["Masala Dosa", "Idli Sambar", "Uttapam"],
      offers: "Combo meals starting at ₹99",
      isVeg: true,
      location: "Karol Bagh",
      established: "2017",
      totalOrders: "15k+",
    },
    {
      id: 6,
      name: "Sweet Treats",
      cuisine: "Desserts",
      rating: 4.8,
      deliveryTime: "10-15 min",
      image: "/placeholder.svg?height=200&width=300",
      specialties: ["Gulab Jamun", "Chocolate Brownie", "Ice Cream"],
      offers: "Buy 2 Get 1 Free on desserts",
      isVeg: true,
      location: "India Gate",
      established: "2019",
      totalOrders: "9k+",
    },
  ]

  const storeCategories = ["all", "indian", "italian", "chinese", "american", "south indian", "desserts"]

  const filteredStores =
    activeStoreFilter === "all"
      ? partnerStores
      : partnerStores.filter((store) => store.cuisine.toLowerCase().includes(activeStoreFilter.toLowerCase()))

  const categories = [
    { id: "all", name: "All Items" },
    { id: "pizza", name: "Pizza" },
    { id: "indian", name: "Indian" },
    { id: "chinese", name: "Chinese" },
    { id: "burgers", name: "Burgers" },
    { id: "south-indian", name: "South Indian" },
    { id: "italian", name: "Italian" },
    { id: "desserts", name: "Desserts" },
    { id: "beverages", name: "Beverages" },
    { id: "street-food", name: "Street Food" },
  ]

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, RuPay",
      popular: true,
    },
    {
      id: "upi",
      name: "UPI Payment",
      icon: Smartphone,
      description: "PhonePe, Google Pay, Paytm",
      popular: true,
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      icon: Wallet,
      description: "Paytm, Amazon Pay, Mobikwik",
      popular: false,
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: MapPin,
      description: "Pay when food arrives",
      popular: false,
    },
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
    const userData = {
      name: email.split("@")[0],
      email: email,
      phone: "+91 9876543210",
    }
    setUser(userData)
    setIsLoginOpen(false)
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
    setIsPaymentOpen(true)
  }

  const processPayment = async (paymentDetails: any) => {
    setIsProcessingPayment(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const orderId = generateOrderId()
    const newOrder = {
      id: orderId,
      items: cart.map((item) => `${item.name} x${item.quantity}`),
      total: getTotalPrice() + 20,
      status: "confirmed",
      orderTime: new Date().toISOString(),
      estimatedTime: "25-30 min",
      paymentMethod: selectedPaymentMethod,
      paymentStatus: "completed",
    }

    setOrders((prev) => [newOrder, ...prev])
    setCart([])
    setIsPaymentOpen(false)
    setIsProcessingPayment(false)
    setSelectedPaymentMethod("")

    alert(`Payment successful! Order placed with ID: ${orderId}`)
  }

  const handleReviewSubmit = (rating: number, comment: string) => {
    if (!user || !selectedItemForReview) return

    const newReview = {
      id: Date.now(),
      itemId: selectedItemForReview.id,
      itemName: selectedItemForReview.name,
      userName: user.name,
      rating: rating,
      comment: comment,
      date: new Date().toISOString(),
    }

    setReviews((prev) => [newReview, ...prev])
    setIsReviewModalOpen(false)
    setSelectedItemForReview(null)
    alert("Thank you for your review!")
  }

  const getItemReviews = (itemId: number) => {
    return reviews.filter((review) => review.itemId === itemId)
  }

  const getAverageRating = (itemId: number) => {
    const itemReviews = getItemReviews(itemId)
    if (itemReviews.length === 0) return 0
    const sum = itemReviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / itemReviews.length).toFixed(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                {/* Main Logo Circle */}
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <span className="text-white font-bold text-xl">🍽️</span>
                </div>
                {/* Small accent dot */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  FoodDash
                </h1>
                <p className="text-xs text-gray-500 font-medium">Fast • Fresh • Delicious</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {["Home", "Menu", "Stores", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={item === "Stores" ? "#" : `#${item.toLowerCase()}`}
                  onClick={
                    item === "Stores"
                      ? (e) => {
                          e.preventDefault()
                          setIsStoresOpen(true)
                        }
                      : undefined
                  }
                  className="text-gray-700 hover:text-orange-500 font-medium cursor-pointer transition-colors duration-200"
                >
                  {item}
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
                  <Button variant="outline" size="sm" onClick={() => setIsOrderTrackingOpen(true)}>
                    Track Orders
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600 hover:text-red-700">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setIsLoginOpen(true)}>
                    Login
                  </Button>
                  <Button size="sm" onClick={() => setIsSignupOpen(true)} className="bg-blue-500 hover:bg-blue-600">
                    Sign Up
                  </Button>
                </div>
              )}

              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500">{getTotalItems()}</Badge>
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
            <nav className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col space-y-3">
                {["Home", "Menu", "Stores", "About", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={item === "Stores" ? "#" : `#${item.toLowerCase()}`}
                    onClick={
                      item === "Stores"
                        ? (e) => {
                            e.preventDefault()
                            setIsStoresOpen(true)
                          }
                        : undefined
                    }
                    className="text-gray-700 hover:text-orange-500 py-2 px-4 rounded hover:bg-gray-100 cursor-pointer"
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
      <section id="home" className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Delicious Food
            <span className="block text-orange-500">Delivered Fast</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Order your favorite meals from the best restaurants in town. Fast delivery, fresh ingredients, amazing taste
            guaranteed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-4">
              Order Now
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              View Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Our Menu</h3>
            <p className="text-xl text-gray-600">Choose from our delicious selection</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={activeCategory === category.id ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Food Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                      <Badge className="bg-green-500">
                        <Star className="w-3 h-3 mr-1" />
                        {item.rating}
                      </Badge>
                      {item.isVeg && <Badge className="bg-green-600">Veg</Badge>}
                    </div>

                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0" onClick={() => toggleFavorite(item.id)}>
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.includes(item.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                        }`}
                      />
                    </Button>
                  </div>

                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-bold text-gray-800">{item.name}</h4>
                    {item.spiceLevel && <span className="text-sm">{getSpiceIndicator(item.spiceLevel)}</span>}
                  </div>

                  <p className="text-gray-600 mb-4 text-sm">{item.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-orange-500">₹{item.price}</span>
                    <div className="flex items-center text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded">
                      <Clock className="w-3 h-3 mr-1" />
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
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-bold text-lg min-w-[2rem] text-center">
                            {cart.find((cartItem) => cartItem.id === item.id)?.quantity || 0}
                          </span>
                        </>
                      )}
                    </div>
                    <Button onClick={() => addToCart(item)} className="bg-orange-500 hover:bg-orange-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (!user) {
                          setIsLoginOpen(true)
                          return
                        }
                        setSelectedItemForReview(item)
                        setIsReviewModalOpen(true)
                      }}
                      className="text-xs"
                    >
                      Write Review
                    </Button>
                    <div className="text-xs text-gray-500">{getItemReviews(item.id).length} reviews</div>
                  </div>

                  {/* Show recent reviews for this item */}
                  {getItemReviews(item.id).length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-700 mb-2">Recent Reviews:</p>
                      {getItemReviews(item.id)
                        .slice(0, 2)
                        .map((review) => (
                          <div key={review.id} className="mb-2 p-2 bg-gray-50 rounded text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{review.userName}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <section className="py-8 px-4 bg-orange-50">
          <div className="container mx-auto">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold mb-4 text-center text-orange-500">Order Summary</h4>
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-500 text-sm block">x{item.quantity}</span>
                      </div>
                      <span className="font-bold text-orange-600">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-orange-500">₹{getTotalPrice()}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">+ ₹20 delivery charges</p>
                </div>
                <Button
                  onClick={placeOrder}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-3"
                  size="lg"
                >
                  {user ? "Proceed to Payment" : "Login to Order"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-gray-800 mb-6">About FoodDash</h3>
              <p className="text-lg text-gray-600 mb-6">
                We're passionate about bringing you the best food from your favorite restaurants, delivered fresh and
                fast to your doorstep. Our mission is to make great food accessible to everyone, anytime, anywhere.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "500+", label: "Restaurants" },
                  { number: "10k+", label: "Happy Customers" },
                  { number: "30min", label: "Avg Delivery" },
                  { number: "4.8★", label: "Rating" },
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-orange-500 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="w-64 h-64 bg-orange-100 rounded-lg mx-auto flex items-center justify-center">
                <span className="text-6xl">🍽️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">Contact Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: "Address", info: "Food Street, City, Delhi 6" },
              { icon: Phone, title: "Phone", info: "+91 8877002297" },
              { icon: Mail, title: "Email", info: "hello@fooddash.com" },
            ].map((contact, index) => (
              <Card key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <contact.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">{contact.title}</h4>
                <p className="text-gray-600">{contact.info}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🍽️</span>
                </div>
                <div>
                  <h5 className="text-xl font-bold">FoodDash</h5>
                  <p className="text-gray-400 text-sm">Delivering happiness</p>
                </div>
              </div>
              <p className="text-gray-400">
                Delivering happiness, one meal at a time. Experience the best food delivery service in town.
              </p>
            </div>

            {[
              { title: "Quick Links", items: ["Home", "Menu", "About", "Contact"] },
              { title: "Services", items: ["Food Delivery", "Catering", "Corporate Orders", "Gift Cards"] },
              { title: "Follow Us", items: ["Facebook", "Twitter", "Instagram", "YouTube"] },
            ].map((section, index) => (
              <div key={index}>
                <h6 className="font-bold mb-4">{section.title}</h6>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a href="#" className="text-gray-400 hover:text-orange-400">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 FoodDash. All rights reserved. Made with ❤️ for food lovers.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="text-center mb-6">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsLoginOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
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
                  className="text-orange-500 hover:text-orange-600 font-medium"
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="text-center mb-6">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Create a password"
                  />
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsSignupOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
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
                  className="text-orange-500 hover:text-orange-600 font-medium"
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Order Tracking</h3>
                  <p className="text-gray-600">Track your orders</p>
                </div>
                <Button variant="ghost" onClick={() => setIsOrderTrackingOpen(false)} className="w-8 h-8 p-0">
                  <X className="w-4 h-4" />
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
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="border-2 border-gray-100">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-bold text-gray-800">Order #{order.id}</h4>
                            <p className="text-sm text-gray-500">{new Date(order.orderTime).toLocaleString()}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className="bg-green-500">{order.status.toUpperCase()}</Badge>
                            {order.paymentMethod && (
                              <Badge variant="outline" className="text-xs">
                                {order.paymentMethod.toUpperCase()}
                              </Badge>
                            )}
                          </div>
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

                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-800">Total: ₹{order.total}</span>
                          <span className="text-sm text-gray-500">Est. {order.estimatedTime}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stores Modal */}
      {isStoresOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-bold text-orange-500">Our Partner Restaurants</h3>
                  <p className="text-gray-600 mt-2">Discover amazing restaurants we've partnered with</p>
                </div>
                <Button variant="ghost" onClick={() => setIsStoresOpen(false)} className="w-10 h-10 p-0">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Store Category Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {storeCategories.map((category) => (
                  <Button
                    key={category}
                    variant={activeStoreFilter === category ? "default" : "outline"}
                    onClick={() => setActiveStoreFilter(category)}
                    className={`capitalize ${
                      activeStoreFilter === category ? "bg-orange-500 hover:bg-orange-600" : ""
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Partner Stores Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStores.map((store) => (
                  <Card key={store.id} className="hover:shadow-lg">
                    <div className="relative">
                      <img
                        src={store.image || "/placeholder.svg"}
                        alt={store.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <Badge className="bg-green-500">
                          <Star className="w-3 h-3 mr-1" />
                          {store.rating}
                        </Badge>
                        {store.isVeg && <Badge className="bg-green-600">Pure Veg</Badge>}
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-500 text-xs">Est. {store.established}</Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">{store.name}</h4>
                          <p className="text-sm text-gray-500">{store.location}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {store.cuisine}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded">
                          <Clock className="w-4 h-4 mr-1" />
                          {store.deliveryTime}
                        </div>
                        <div className="text-sm text-gray-600">{store.totalOrders} orders</div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700">Specialties:</p>
                        <div className="flex flex-wrap gap-1">
                          {store.specialties.slice(0, 3).map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <p className="text-sm font-medium text-orange-700 mb-1">Special Offer</p>
                        <p className="text-xs text-orange-600">{store.offers}</p>
                      </div>

                      <Button
                        className="w-full bg-orange-500 hover:bg-orange-600"
                        onClick={() => {
                          setIsStoresOpen(false)
                          document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
                        }}
                      >
                        View Menu
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredStores.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🏪</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">No Restaurants Found</h4>
                  <p className="text-gray-600">Try selecting a different cuisine category.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && selectedItemForReview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Write a Review</h3>
                <p className="text-gray-600">Share your experience with {selectedItemForReview.name}</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.target as HTMLFormElement)
                  const rating = Number.parseInt(formData.get("rating") as string)
                  const comment = formData.get("comment") as string
                  handleReviewSubmit(rating, comment)
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select
                    name="rating"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select Rating</option>
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                    <option value="4">⭐⭐⭐⭐ Very Good</option>
                    <option value="3">⭐⭐⭐ Good</option>
                    <option value="2">⭐⭐ Fair</option>
                    <option value="1">⭐ Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                  <textarea
                    name="comment"
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Tell us about your experience..."
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsReviewModalOpen(false)
                      setSelectedItemForReview(null)
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
                    Submit Review
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Complete Payment</h3>
                <p className="text-gray-600">Choose your preferred payment method</p>
              </div>

              {/* Order Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span>₹20</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span className="text-orange-500">₹{getTotalPrice() + 20}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-800">Select Payment Method</h4>
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedPaymentMethod === method.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <method.icon className="w-6 h-6 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-800">{method.name}</p>
                          <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {method.popular && <Badge className="bg-green-500 text-xs">Popular</Badge>}
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            selectedPaymentMethod === method.id ? "border-orange-500 bg-orange-500" : "border-gray-300"
                          }`}
                        >
                          {selectedPaymentMethod === method.id && (
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Form */}
              {selectedPaymentMethod && (
                <div className="mb-6">
                  {selectedPaymentMethod === "card" && (
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </form>
                  )}

                  {selectedPaymentMethod === "upi" && (
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                        <input
                          type="text"
                          placeholder="yourname@paytm"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                          You will be redirected to your UPI app to complete the payment
                        </p>
                      </div>
                    </form>
                  )}

                  {selectedPaymentMethod === "wallet" && (
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Wallet</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                          <option value="">Choose wallet</option>
                          <option value="paytm">Paytm</option>
                          <option value="amazonpay">Amazon Pay</option>
                          <option value="mobikwik">Mobikwik</option>
                        </select>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-700">
                          You will be redirected to your wallet app to complete the payment
                        </p>
                      </div>
                    </form>
                  )}

                  {selectedPaymentMethod === "cod" && (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700 mb-2">
                        <strong>Cash on Delivery</strong>
                      </p>
                      <p className="text-sm text-green-600">
                        Pay ₹{getTotalPrice() + 20} in cash when your order arrives. Please keep exact change ready.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsPaymentOpen(false)
                    setSelectedPaymentMethod("")
                  }}
                  className="flex-1"
                  disabled={isProcessingPayment}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => processPayment({})}
                  disabled={!selectedPaymentMethod || isProcessingPayment}
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                >
                  {isProcessingPayment ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    `Pay ₹${getTotalPrice() + 20}`
                  )}
                </Button>
              </div>

              {/* Security Notice */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 text-center">
                  🔒 Your payment information is secure and encrypted. We never store your card details.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
