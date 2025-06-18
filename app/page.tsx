"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Clock, MapPin, Phone, Mail, Menu, X, Plus, Minus } from "lucide-react"

interface FoodItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  rating: number
  category: string
  cookTime: string
}

interface CartItem extends FoodItem {
  quantity: number
}

export default function FoodDash() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeCategory, setActiveCategory] = useState("all")

  const foodItems: FoodItem[] = [
    // Pizza
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Fresh tomatoes, mozzarella, basil, olive oil",
      price: 299,
      image: "https://ooni.com/cdn/shop/articles/20220211142347-margherita-9920_ba86be55-674e-4f35-8094-2067ab41a671.jpg?v=1737104576&width=1080",
      rating: 4.8,
      category: "pizza",
      cookTime: "25-30 min",
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      description: "Pepperoni, mozzarella, tomato sauce",
      price: 399,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      category: "pizza",
      cookTime: "25-30 min",
    },
    {
      id: 3,
      name: "Veggie Supreme Pizza",
      description: "Bell peppers, mushrooms, onions, olives, tomatoes",
      price: 349,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      category: "pizza",
      cookTime: "25-30 min",
    },

    // Indian Food
    {
      id: 4,
      name: "Butter Chicken",
      description: "Creamy tomato curry with tender chicken pieces",
      price: 280,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      category: "indian",
      cookTime: "20-25 min",
    },
    {
      id: 5,
      name: "Paneer Tikka Masala",
      description: "Grilled paneer in rich tomato and cream gravy",
      price: 250,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      category: "indian",
      cookTime: "20-25 min",
    },
    {
      id: 6,
      name: "Biryani (Chicken)",
      description: "Aromatic basmati rice with spiced chicken",
      price: 320,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      category: "indian",
      cookTime: "30-35 min",
    },
    {
      id: 7,
      name: "Dal Tadka",
      description: "Yellow lentils tempered with spices",
      price: 180,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.5,
      category: "indian",
      cookTime: "15-20 min",
    },

    // Chinese Food
    {
      id: 8,
      name: "Chicken Fried Rice",
      description: "Wok-fried rice with chicken and vegetables",
      price: 220,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      category: "chinese",
      cookTime: "15-20 min",
    },
    {
      id: 9,
      name: "Hakka Noodles",
      description: "Stir-fried noodles with vegetables and sauces",
      price: 200,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.5,
      category: "chinese",
      cookTime: "15-20 min",
    },
    {
      id: 10,
      name: "Manchurian (Dry)",
      description: "Crispy vegetable balls in spicy sauce",
      price: 240,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      category: "chinese",
      cookTime: "20-25 min",
    },

    // Burgers
    {
      id: 11,
      name: "Chicken Burger",
      description: "Grilled chicken, lettuce, tomato, special sauce",
      price: 199,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      category: "burgers",
      cookTime: "15-20 min",
    },
    {
      id: 12,
      name: "Veg Burger",
      description: "Crispy veg patty with fresh vegetables",
      price: 149,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.4,
      category: "burgers",
      cookTime: "15-20 min",
    },
    {
      id: 13,
      name: "Cheese Burger",
      description: "Beef patty with melted cheese and pickles",
      price: 229,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      category: "burgers",
      cookTime: "15-20 min",
    },

    // South Indian
    {
      id: 14,
      name: "Masala Dosa",
      description: "Crispy crepe with spiced potato filling",
      price: 120,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      category: "south-indian",
      cookTime: "15-20 min",
    },
    {
      id: 15,
      name: "Idli Sambar",
      description: "Steamed rice cakes with lentil curry",
      price: 80,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      category: "south-indian",
      cookTime: "10-15 min",
    },
    {
      id: 16,
      name: "Uttapam",
      description: "Thick pancake with vegetables and chutneys",
      price: 140,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.5,
      category: "south-indian",
      cookTime: "15-20 min",
    },

    // Italian
    {
      id: 17,
      name: "Pasta Alfredo",
      description: "Creamy white sauce pasta with herbs",
      price: 280,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      category: "italian",
      cookTime: "20-25 min",
    },
    {
      id: 18,
      name: "Pasta Arrabbiata",
      description: "Spicy tomato sauce pasta with garlic",
      price: 260,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.5,
      category: "italian",
      cookTime: "20-25 min",
    },

    // Desserts
    {
      id: 19,
      name: "Gulab Jamun",
      description: "Sweet milk dumplings in sugar syrup",
      price: 80,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      category: "desserts",
      cookTime: "5-10 min",
    },
    {
      id: 20,
      name: "Chocolate Brownie",
      description: "Rich chocolate brownie with vanilla ice cream",
      price: 150,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      category: "desserts",
      cookTime: "10-15 min",
    },

    // Beverages
    {
      id: 21,
      name: "Masala Chai",
      description: "Traditional Indian spiced tea",
      price: 30,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      category: "beverages",
      cookTime: "5-10 min",
    },
    {
      id: 22,
      name: "Fresh Lime Soda",
      description: "Refreshing lime drink with soda",
      price: 50,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.4,
      category: "beverages",
      cookTime: "5 min",
    },
    {
      id: 23,
      name: "Mango Lassi",
      description: "Creamy yogurt drink with mango",
      price: 80,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      category: "beverages",
      cookTime: "5 min",
    },

    // Street Food
    {
      id: 24,
      name: "Pani Puri",
      description: "Crispy shells with spiced water and chutneys",
      price: 60,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      category: "street-food",
      cookTime: "10-15 min",
    },
    {
      id: 25,
      name: "Bhel Puri",
      description: "Puffed rice with vegetables and chutneys",
      price: 70,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      category: "street-food",
      cookTime: "10-15 min",
    },
    {
      id: 26,
      name: "Vada Pav",
      description: "Spiced potato fritter in bread bun",
      price: 40,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      category: "street-food",
      cookTime: "10-15 min",
    },
  ]

  const categories = [
    "all",
    "indian",
    "chinese",
    "pizza",
    "burgers",
    "south-indian",
    "italian",
    "desserts",
    "beverages",
    "street-food",
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

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                FoodDash
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium"
              >
                Home
              </a>
              <a
                href="#menu"
                className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium"
              >
                Menu
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium"
              >
                Contact
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="relative hover:bg-orange-50 hover:border-orange-300 transition-all duration-300"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600">{getTotalItems()}</Badge>
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
              <div className="flex flex-col space-y-2">
                <a href="#home" className="text-gray-700 hover:text-orange-500 transition-colors duration-300 py-2">
                  Home
                </a>
                <a href="#menu" className="text-gray-700 hover:text-orange-500 transition-colors duration-300 py-2">
                  Menu
                </a>
                <a href="#about" className="text-gray-700 hover:text-orange-500 transition-colors duration-300 py-2">
                  About
                </a>
                <a href="#contact" className="text-gray-700 hover:text-orange-500 transition-colors duration-300 py-2">
                  Contact
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Delicious Food
            <span className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Delivered Fast
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Order your favorite meals from the best restaurants in town. Fast delivery, fresh ingredients, amazing
            taste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Order Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-orange-50 hover:border-orange-300 transform hover:scale-105 transition-all duration-300"
            >
              View Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Menu</h3>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={`capitalize transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    : "hover:bg-orange-50 hover:border-orange-300"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Food Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <Star className="w-3 h-3 mr-1" />
                      {item.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h4>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-orange-500">₹{item.price}</span>
                    <div className="flex items-center text-gray-500 text-sm">
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
                            className="w-8 h-8 p-0 hover:bg-red-50 hover:border-red-300"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-semibold">
                            {cart.find((cartItem) => cartItem.id === item.id)?.quantity || 0}
                          </span>
                        </>
                      )}
                    </div>
                    <Button
                      onClick={() => addToCart(item)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300"
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
        <section className="py-8 px-4 bg-gray-50">
          <div className="container mx-auto">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-4">Order Summary</h4>
                <div className="space-y-2 mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-orange-500">₹{getTotalPrice()}</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-gray-800 mb-6">About FoodDash</h3>
              <p className="text-lg text-gray-600 mb-6">
                We're passionate about bringing you the best food from your favorite restaurants, delivered fresh and
                fast to your doorstep. Our mission is to make great food accessible to everyone, anytime, anywhere.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">500+</div>
                  <div className="text-gray-600">Restaurants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">10k+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">30min</div>
                  <div className="text-gray-600">Avg Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">4.8★</div>
                  <div className="text-gray-600">Rating</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="/placeholder.svg?height=400&width=500" alt="About FoodDash" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">Contact Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Address</h4>
              <p className="text-gray-600">Food Street,  City, delhi 6 </p>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Phone</h4>
              <p className="text-gray-600">+91 8877002297</p>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Email</h4>
              <p className="text-gray-600">hello@fooddash.com</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">F</span>
                </div>
                <h5 className="text-xl font-bold">FoodDash</h5>
              </div>
              <p className="text-gray-400">Delivering happiness, one meal at a time.</p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Quick Links</h6>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#home" className="hover:text-orange-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-orange-400 transition-colors">
                    Menu
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-orange-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-orange-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Services</h6>
              <ul className="space-y-2 text-gray-400">
                <li>Food Delivery</li>
                <li>Catering</li>
                <li>Corporate Orders</li>
                <li>Gift Cards</li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Follow Us</h6>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-orange-400">
                  Facebook
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-orange-400">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-orange-400">
                  Instagram
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FoodDash. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
