"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Clock, MapPin, Phone, Mail, Menu, X, Plus, Minus, Heart } from "lucide-react"

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

    const orderId = generateOrderId()
    const newOrder = {
      id: orderId,
      items: cart.map((item) => `${item.name} x${item.quantity}`),
      total: getTotalPrice() + 20,
      status: "confirmed",
      orderTime: new Date().toISOString(),
      estimatedTime: "25-30 min",
    }

    setOrders((prev) => [newOrder, ...prev])
    setCart([])
    alert(`Order placed successfully! Order ID: ${orderId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-orange-500">FoodDash</h1>
                <p className="text-xs text-gray-500">Delicious food delivered fast</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {["Home", "Menu", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-orange-500 font-medium"
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
                {["Home", "Menu", "About", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-orange-500 py-2 px-4 rounded hover:bg-gray-100"
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
                  {user ? "Place Order" : "Login to Order"}
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
                  <span className="text-white font-bold">F</span>
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
                          <Badge className="bg-green-500">{order.status.toUpperCase()}</Badge>
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
    </div>
  )
}
