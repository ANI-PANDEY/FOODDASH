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
  Truck,
  Users,
  Award,
  Shield,
  Zap,
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
  const [isDeliveryPartnersOpen, setIsDeliveryPartnersOpen] = useState(false)
  const [isTieUpPartnersOpen, setIsTieUpPartnersOpen] = useState(false)
  const [isPartnerApplicationOpen, setIsPartnerApplicationOpen] = useState(false)
  const [activeTieUpFilter, setActiveTieUpFilter] = useState("all")

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

  const deliveryPartners = [
    {
      id: 1,
      name: "Rajesh Kumar",
      rating: 4.9,
      deliveries: "2,500+",
      experience: "3 years",
      vehicle: "Bike",
      location: "Central Delhi",
      speciality: "Fast Delivery",
      languages: ["Hindi", "English"],
      avatar: "👨‍🦱",
      status: "online",
      badge: "Top Performer",
    },
    {
      id: 2,
      name: "Priya Sharma",
      rating: 4.8,
      deliveries: "1,800+",
      experience: "2 years",
      vehicle: "Scooter",
      location: "South Delhi",
      speciality: "Careful Handling",
      languages: ["Hindi", "English", "Punjabi"],
      avatar: "👩‍🦰",
      status: "online",
      badge: "Customer Favorite",
    },
    {
      id: 3,
      name: "Mohammed Ali",
      rating: 4.7,
      deliveries: "3,200+",
      experience: "4 years",
      vehicle: "Bike",
      location: "North Delhi",
      speciality: "Night Delivery",
      languages: ["Hindi", "English", "Urdu"],
      avatar: "👨‍🦲",
      status: "busy",
      badge: "Veteran",
    },
    {
      id: 4,
      name: "Sneha Patel",
      rating: 4.9,
      deliveries: "2,100+",
      experience: "2.5 years",
      vehicle: "Electric Bike",
      location: "West Delhi",
      speciality: "Eco-Friendly",
      languages: ["Hindi", "English", "Gujarati"],
      avatar: "👩‍🦱",
      status: "online",
      badge: "Eco Warrior",
    },
    {
      id: 5,
      name: "Amit Singh",
      rating: 4.6,
      deliveries: "1,500+",
      experience: "1.5 years",
      vehicle: "Scooter",
      location: "East Delhi",
      speciality: "Quick Response",
      languages: ["Hindi", "English"],
      avatar: "👨‍🦳",
      status: "online",
      badge: "Rising Star",
    },
    {
      id: 6,
      name: "Kavya Reddy",
      rating: 4.8,
      deliveries: "2,800+",
      experience: "3.5 years",
      vehicle: "Bike",
      location: "Central Delhi",
      speciality: "Premium Orders",
      languages: ["Hindi", "English", "Telugu"],
      avatar: "👩‍🦳",
      status: "online",
      badge: "Premium Partner",
    },
  ]

  const tieUpPartners = [
    {
      id: 1,
      name: "The Royal Kitchen",
      type: "Restaurant",
      cuisine: "North Indian",
      rating: 4.9,
      location: "Connaught Place, Delhi",
      established: "2015",
      specialties: ["Butter Chicken", "Dal Makhani", "Naan", "Biryani"],
      priceRange: "₹₹₹",
      deliveryTime: "25-35 min",
      minimumOrder: 200,
      offers: "20% OFF on orders above ₹500",
      image: "/placeholder.svg?height=300&width=400",
      owner: "Chef Rajesh Sharma",
      phone: "+91 9876543210",
      email: "royal.kitchen@email.com",
      joinedDate: "2020-01-15",
      totalOrders: "15k+",
      monthlyRevenue: "₹8,50,000",
      status: "active",
      commission: "18%",
      features: ["Dine-in", "Takeaway", "Delivery", "Catering"],
      workingHours: "10:00 AM - 11:00 PM",
      seatingCapacity: 80,
      isVeg: false,
      hasParking: true,
      acceptsCards: true,
      hasWifi: true,
    },
    {
      id: 2,
      name: "Café Mocha",
      type: "Café",
      cuisine: "Continental",
      rating: 4.7,
      location: "Khan Market, Delhi",
      established: "2018",
      specialties: ["Cappuccino", "Croissants", "Pasta", "Sandwiches"],
      priceRange: "₹₹",
      deliveryTime: "15-25 min",
      minimumOrder: 150,
      offers: "Buy 2 Get 1 Free on beverages",
      image: "/placeholder.svg?height=300&width=400",
      owner: "Ms. Priya Gupta",
      phone: "+91 9876543211",
      email: "cafe.mocha@email.com",
      joinedDate: "2020-03-20",
      totalOrders: "12k+",
      monthlyRevenue: "₹4,20,000",
      status: "active",
      commission: "15%",
      features: ["Dine-in", "Takeaway", "Delivery", "WiFi Lounge"],
      workingHours: "8:00 AM - 10:00 PM",
      seatingCapacity: 45,
      isVeg: true,
      hasParking: false,
      acceptsCards: true,
      hasWifi: true,
    },
    {
      id: 3,
      name: "Spice Junction",
      type: "Restaurant",
      cuisine: "South Indian",
      rating: 4.8,
      location: "Lajpat Nagar, Delhi",
      established: "2012",
      specialties: ["Dosa", "Idli", "Sambar", "Filter Coffee"],
      priceRange: "₹₹",
      deliveryTime: "20-30 min",
      minimumOrder: 120,
      offers: "Combo meals starting at ₹99",
      image: "/placeholder.svg?height=300&width=400",
      owner: "Mr. Venkatesh Iyer",
      phone: "+91 9876543212",
      email: "spice.junction@email.com",
      joinedDate: "2019-08-10",
      totalOrders: "18k+",
      monthlyRevenue: "₹6,80,000",
      status: "active",
      commission: "16%",
      features: ["Dine-in", "Takeaway", "Delivery", "Traditional Ambiance"],
      workingHours: "7:00 AM - 10:30 PM",
      seatingCapacity: 60,
      isVeg: true,
      hasParking: true,
      acceptsCards: true,
      hasWifi: false,
    },
    {
      id: 4,
      name: "Pizza Corner",
      type: "Restaurant",
      cuisine: "Italian",
      rating: 4.6,
      location: "Karol Bagh, Delhi",
      established: "2019",
      specialties: ["Wood Fired Pizza", "Pasta", "Garlic Bread", "Tiramisu"],
      priceRange: "₹₹₹",
      deliveryTime: "30-40 min",
      minimumOrder: 250,
      offers: "Buy 1 Get 1 Free on Large Pizzas",
      image: "/placeholder.svg?height=300&width=400",
      owner: "Chef Marco Rossi",
      phone: "+91 9876543213",
      email: "pizza.corner@email.com",
      joinedDate: "2020-06-05",
      totalOrders: "10k+",
      monthlyRevenue: "₹7,20,000",
      status: "active",
      commission: "20%",
      features: ["Dine-in", "Takeaway", "Delivery", "Wood Fired Oven"],
      workingHours: "12:00 PM - 11:30 PM",
      seatingCapacity: 70,
      isVeg: false,
      hasParking: true,
      acceptsCards: true,
      hasWifi: true,
    },
    {
      id: 5,
      name: "Green Leaf Café",
      type: "Café",
      cuisine: "Healthy",
      rating: 4.8,
      location: "Greater Kailash, Delhi",
      established: "2020",
      specialties: ["Smoothie Bowls", "Salads", "Quinoa Bowls", "Fresh Juices"],
      priceRange: "₹₹₹",
      deliveryTime: "20-30 min",
      minimumOrder: 180,
      offers: "15% OFF on healthy combos",
      image: "/placeholder.svg?height=300&width=400",
      owner: "Ms. Ananya Sharma",
      phone: "+91 9876543214",
      email: "greenleaf.cafe@email.com",
      joinedDate: "2021-02-14",
      totalOrders: "8k+",
      monthlyRevenue: "₹5,60,000",
      status: "active",
      commission: "17%",
      features: ["Dine-in", "Takeaway", "Delivery", "Organic Menu"],
      workingHours: "7:00 AM - 9:00 PM",
      seatingCapacity: 35,
      isVeg: true,
      hasParking: false,
      acceptsCards: true,
      hasWifi: true,
    },
    {
      id: 6,
      name: "Tandoor Express",
      type: "Restaurant",
      cuisine: "Punjabi",
      rating: 4.7,
      location: "Punjabi Bagh, Delhi",
      established: "2016",
      specialties: ["Tandoori Chicken", "Butter Naan", "Lassi", "Kulcha"],
      priceRange: "₹₹",
      deliveryTime: "25-35 min",
      minimumOrder: 200,
      offers: "Free dessert on orders above ₹400",
      image: "/placeholder.svg?height=300&width=400",
      owner: "Sardar Jasbir Singh",
      phone: "+91 9876543215",
      email: "tandoor.express@email.com",
      joinedDate: "2019-11-20",
      totalOrders: "14k+",
      monthlyRevenue: "₹9,10,000",
      status: "active",
      commission: "19%",
      features: ["Dine-in", "Takeaway", "Delivery", "Live Tandoor"],
      workingHours: "11:00 AM - 11:00 PM",
      seatingCapacity: 90,
      isVeg: false,
      hasParking: true,
      acceptsCards: true,
      hasWifi: false,
    },
    {
      id: 7,
      name: "Sweet Dreams Bakery",
      type: "Bakery",
      cuisine: "Desserts",
      rating: 4.9,
      location: "Defence Colony, Delhi",
      established: "2014",
      specialties: ["Custom Cakes", "Pastries", "Cookies", "Bread"],
      priceRange: "₹₹",
      deliveryTime: "15-25 min",
      minimumOrder: 100,
      offers: "10% OFF on birthday cakes",
      image: "/placeholder.svg?height=300&width=400",
      owner: "Ms. Ritu Malhotra",
      phone: "+91 9876543216",
      email: "sweetdreams.bakery@email.com",
      joinedDate: "2020-09-12",
      totalOrders: "11k+",
      monthlyRevenue: "₹3,80,000",
      status: "active",
      commission: "12%",
      features: ["Takeaway", "Delivery", "Custom Orders", "Fresh Daily"],
      workingHours: "8:00 AM - 9:00 PM",
      seatingCapacity: 20,
      isVeg: true,
      hasParking: false,
      acceptsCards: true,
      hasWifi: false,
    },
    {
      id: 8,
      name: "Dragon Palace",
      type: "Restaurant",
      cuisine: "Chinese",
      rating: 4.5,
      location: "Nehru Place, Delhi",
      established: "2017",
      specialties: ["Dim Sum", "Peking Duck", "Fried Rice", "Hot Pot"],
      priceRange: "₹₹₹",
      deliveryTime: "30-40 min",
      minimumOrder: 300,
      offers: "20% OFF on family combos",
      image: "/placeholder.svg?height=300&width=400",
      owner: "Chef Li Wei",
      phone: "+91 9876543217",
      email: "dragon.palace@email.com",
      joinedDate: "2020-12-08",
      totalOrders: "9k+",
      monthlyRevenue: "₹6,40,000",
      status: "active",
      commission: "21%",
      features: ["Dine-in", "Takeaway", "Delivery", "Authentic Chinese"],
      workingHours: "12:00 PM - 10:30 PM",
      seatingCapacity: 85,
      isVeg: false,
      hasParking: true,
      acceptsCards: true,
      hasWifi: true,
    },
  ]

  const tieUpCategories = ["all", "restaurant", "café", "bakery"]
  const cuisineFilters = [
    "all",
    "north indian",
    "south indian",
    "chinese",
    "italian",
    "continental",
    "punjabi",
    "healthy",
    "desserts",
  ]

  const filteredTieUpPartners = tieUpPartners.filter((partner) => {
    const typeMatch = activeTieUpFilter === "all" || partner.type.toLowerCase() === activeTieUpFilter
    return typeMatch
  })

  const storeCategories = ["all", "indian", "italian", "chinese", "american", "south indian", "desserts"]

  const filteredStores =
    activeStoreFilter === "all"
      ? partnerStores
      : partnerStores.filter((store) => store.cuisine.toLowerCase().includes(activeStoreFilter.toLowerCase()))

  const categories = [
    { id: "all", name: "All Items", emoji: "🍽️" },
    { id: "pizza", name: "Pizza", emoji: "🍕" },
    { id: "indian", name: "Indian", emoji: "🍛" },
    { id: "chinese", name: "Chinese", emoji: "🥡" },
    { id: "burgers", name: "Burgers", emoji: "🍔" },
    { id: "south-indian", name: "South Indian", emoji: "🥞" },
    { id: "italian", name: "Italian", emoji: "🍝" },
    { id: "desserts", name: "Desserts", emoji: "🍰" },
    { id: "beverages", name: "Beverages", emoji: "🥤" },
    { id: "street-food", name: "Street Food", emoji: "🌮" },
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

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative group">
                {/* Main Logo Circle */}
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl border-3 border-white transform group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">🍽️</span>
                </div>
                {/* Animated accent dot */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  FoodDash
                </h1>
                <p className="text-sm text-gray-600 font-medium flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-orange-500" />
                  <span>Fast</span>
                  <span>•</span>
                  <span>Fresh</span>
                  <span>•</span>
                  <span>Delicious</span>
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { name: "Home", href: "#home" },
                { name: "Menu", action: scrollToMenu },
                { name: "Stores", action: () => setIsStoresOpen(true) },
                { name: "Partners", action: () => setIsDeliveryPartnersOpen(true) },
                { name: "Tie-ups", action: () => setIsTieUpPartnersOpen(true) },
                { name: "About", href: "#about" },
                { name: "Contact", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href || "#"}
                  onClick={
                    item.action
                      ? (e) => {
                          e.preventDefault()
                          item.action()
                        }
                      : undefined
                  }
                  className="text-gray-700 hover:text-orange-500 font-medium cursor-pointer transition-all duration-200 hover:scale-105 relative group"
                >
                  {item.name}
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
                    className="border-orange-200 hover:border-orange-300 hover:bg-orange-50"
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
                    className="border-orange-200 hover:border-orange-300 hover:bg-orange-50"
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsSignupOpen(true)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg"
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                className="relative border-orange-200 hover:border-orange-300 hover:bg-orange-50 bg-transparent"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 animate-bounce">
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
                {[
                  { name: "Home", href: "#home" },
                  { name: "Menu", action: scrollToMenu },
                  { name: "Stores", action: () => setIsStoresOpen(true) },
                  { name: "Partners", action: () => setIsDeliveryPartnersOpen(true) },
                  { name: "Tie-ups", action: () => setIsTieUpPartnersOpen(true) },
                  { name: "About", href: "#about" },
                  { name: "Contact", href: "#contact" },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href || "#"}
                    onClick={
                      item.action
                        ? (e) => {
                            e.preventDefault()
                            item.action()
                            setIsMenuOpen(false)
                          }
                        : () => setIsMenuOpen(false)
                    }
                    className="text-gray-700 hover:text-orange-500 py-3 px-4 rounded-lg hover:bg-orange-50 cursor-pointer transition-all duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="py-20 px-4 bg-gradient-to-br from-orange-100 via-white to-red-100 relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-red-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-pulse delay-500"></div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-7xl font-bold text-gray-800 mb-8 leading-tight">
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Delicious Food
              </span>
              <span className="block text-gray-700 mt-2">Delivered Fast</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Order your favorite meals from the best restaurants in town. Fast delivery, fresh ingredients, amazing
              taste guaranteed with our premium delivery partners.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                onClick={scrollToMenu}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xl px-10 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="mr-2">🍽️</span>
                Order Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToMenu}
                className="text-xl px-10 py-6 rounded-2xl border-2 border-orange-300 hover:border-orange-400 hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 bg-transparent"
              >
                <span className="mr-2">📋</span>
                View Menu
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto">
              {[
                { number: "500+", label: "Restaurants", icon: "🏪" },
                { number: "10k+", label: "Happy Customers", icon: "😊" },
                { number: "30min", label: "Avg Delivery", icon: "⚡" },
                { number: "4.8★", label: "Rating", icon: "⭐" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-orange-500 mb-1">{stat.number}</div>
                  <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold text-gray-800 mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Menu</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our delicious selection of freshly prepared meals
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg"
                    : "border-orange-200 hover:border-orange-300 hover:bg-orange-50"
                } px-6 py-3 rounded-full font-medium transform hover:scale-105 transition-all duration-200`}
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
                className="hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Image placeholder with gradient */}
                  <div className="h-48 bg-gradient-to-br from-orange-200 via-red-200 to-pink-200 flex items-center justify-center relative">
                    <span className="text-6xl opacity-80">
                      {categories.find((cat) => cat.id === item.category)?.emoji || "🍽️"}
                    </span>
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
                        <Star className="w-3 h-3 mr-1" />
                        {item.rating}
                      </Badge>
                      {item.isVeg && (
                        <Badge className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
                          🌱 Veg
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-4 left-4 w-10 h-10 p-0 bg-white/80 backdrop-blur-sm hover:bg-white/90"
                      onClick={() => toggleFavorite(item.id)}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(item.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                        }`}
                      />
                    </Button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-bold text-gray-800">{item.name}</h4>
                      {item.spiceLevel && (
                        <span className="text-lg flex items-center">{getSpiceIndicator(item.spiceLevel)}</span>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>

                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        ₹{item.price}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm bg-gray-100 px-3 py-2 rounded-full">
                        <Clock className="w-4 h-4 mr-1" />
                        {item.cookTime}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {cart.find((cartItem) => cartItem.id === item.id) && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeFromCart(item.id)}
                              className="w-10 h-10 p-0 rounded-full border-orange-200 hover:border-orange-300 hover:bg-orange-50"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-bold text-xl min-w-[2rem] text-center text-orange-600">
                              {cart.find((cartItem) => cartItem.id === item.id)?.quantity || 0}
                            </span>
                          </>
                        )}
                      </div>
                      <Button
                        onClick={() => addToCart(item)}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
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
                        className="text-xs border-orange-200 hover:border-orange-300 hover:bg-orange-50"
                      >
                        ⭐ Write Review
                      </Button>
                      <div className="text-xs text-gray-500">{getItemReviews(item.id).length} reviews</div>
                    </div>

                    {/* Show recent reviews for this item */}
                    {getItemReviews(item.id).length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-700 mb-3">Recent Reviews:</p>
                        {getItemReviews(item.id)
                          .slice(0, 2)
                          .map((review) => (
                            <div key={review.id} className="mb-3 p-3 bg-gray-50 rounded-lg text-xs">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-800">{review.userName}</span>
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
                              <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <section className="py-12 px-4 bg-gradient-to-r from-orange-100 via-red-50 to-pink-100">
          <div className="container mx-auto">
            <Card className="max-w-lg mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Order Summary
                </h4>
                <div className="space-y-4 mb-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                      <div>
                        <span className="font-medium text-gray-800">{item.name}</span>
                        <span className="text-gray-500 text-sm block">Quantity: {item.quantity}</span>
                      </div>
                      <span className="font-bold text-orange-600 text-lg">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-6 mb-8">
                  <div className="flex justify-between items-center text-lg mb-2">
                    <span>Subtotal:</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg mb-4">
                    <span>Delivery Fee:</span>
                    <span>₹20</span>
                  </div>
                  <div className="flex justify-between items-center text-2xl font-bold border-t pt-4">
                    <span>Total:</span>
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                      ₹{getTotalPrice() + 20}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={placeOrder}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  size="lg"
                >
                  {user ? "🚀 Proceed to Payment" : "🔐 Login to Order"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Delivery Partners Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold text-gray-800 mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Delivery Partners
              </span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet our trusted delivery heroes who ensure your food reaches you fresh, fast, and with a smile
            </p>
          </div>

          {/* Partner Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
            {[
              { number: "50+", label: "Active Partners", icon: Users },
              { number: "99.8%", label: "On-Time Delivery", icon: Clock },
              { number: "4.9★", label: "Average Rating", icon: Star },
              { number: "24/7", label: "Service Available", icon: Shield },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deliveryPartners.map((partner) => (
              <Card
                key={partner.id}
                className="hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                        {partner.avatar}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-800">{partner.name}</h4>
                        <p className="text-sm text-gray-500">{partner.location}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge
                        className={`mb-2 ${
                          partner.status === "online"
                            ? "bg-gradient-to-r from-green-500 to-emerald-500"
                            : "bg-gradient-to-r from-yellow-500 to-orange-500"
                        }`}
                      >
                        {partner.status === "online" ? "🟢 Online" : "🟡 Busy"}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-blue-200">
                        {partner.badge}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{partner.rating}</div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{partner.deliveries}</div>
                      <div className="text-xs text-gray-600">Deliveries</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">{partner.experience}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Vehicle:</span>
                      <span className="font-medium">{partner.vehicle}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Specialty:</span>
                      <span className="font-medium text-blue-600">{partner.speciality}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Languages:</p>
                    <div className="flex flex-wrap gap-1">
                      {partner.languages.map((lang, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-200">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(partner.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">({partner.rating})</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Join as Partner CTA */}
          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 border-0 shadow-2xl">
              <CardContent className="p-8 text-white">
                <h4 className="text-3xl font-bold mb-4">Join Our Delivery Team!</h4>
                <p className="text-lg mb-6 opacity-90">
                  Become a FoodDash delivery partner and earn flexible income while serving your community
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300"
                  >
                    <Truck className="w-5 h-5 mr-2" />
                    Apply Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 bg-transparent"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-5xl font-bold text-gray-800 mb-8">
                About{" "}
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  FoodDash
                </span>
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We're passionate about bringing you the best food from your favorite restaurants, delivered fresh and
                fast to your doorstep. Our mission is to make great food accessible to everyone, anytime, anywhere with
                our network of trusted delivery partners.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "500+", label: "Restaurants", icon: "🏪" },
                  { number: "10k+", label: "Happy Customers", icon: "😊" },
                  { number: "30min", label: "Avg Delivery", icon: "⚡" },
                  { number: "4.8★", label: "Rating", icon: "⭐" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="text-3xl mb-3">{stat.icon}</div>
                    <div className="text-3xl font-bold text-orange-500 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="w-80 h-80 bg-gradient-to-br from-orange-200 via-red-200 to-pink-200 rounded-3xl mx-auto flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300">
                <span className="text-8xl">🍽️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold text-center text-gray-800 mb-16">
            Contact{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Us</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Address",
                info: "Food Street, City, Delhi 6",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Phone,
                title: "Phone",
                info: "+91 8877002297",
                color: "from-green-500 to-green-600",
              },
              { icon: Mail, title: "Email", info: "hello@fooddash.com", color: "from-purple-500 to-purple-600" },
            ].map((contact, index) => (
              <Card
                key={index}
                className="text-center p-8 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${contact.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                >
                  <contact.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-800">{contact.title}</h4>
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
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🍽️</span>
                </div>
                <div>
                  <h5 className="text-2xl font-bold">FoodDash</h5>
                  <p className="text-gray-400 text-sm">Delivering happiness</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Delivering happiness, one meal at a time. Experience the best food delivery service in town with our
                trusted partners.
              </p>
            </div>

            {[
              { title: "Quick Links", items: ["Home", "Menu", "About", "Contact"] },
              { title: "Services", items: ["Food Delivery", "Catering", "Corporate Orders", "Gift Cards"] },
              { title: "Follow Us", items: ["Facebook", "Twitter", "Instagram", "YouTube"] },
            ].map((section, index) => (
              <div key={index}>
                <h6 className="font-bold mb-6 text-lg">{section.title}</h6>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 FoodDash. All rights reserved. Made with ❤️ for food lovers everywhere.
            </p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">👋</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Welcome Back!</h3>
                <p className="text-gray-600 mt-2">Login to your FoodDash account</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.target as HTMLFormElement)
                  handleLogin(formData.get("email") as string, formData.get("password") as string)
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsLoginOpen(false)}
                    className="flex-1 py-3 rounded-xl border-gray-300 hover:border-gray-400"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 py-3 rounded-xl shadow-lg"
                  >
                    Login
                  </Button>
                </div>
              </form>

              <p className="text-center mt-6 text-sm text-gray-600">
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🚀</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Join FoodDash!</h3>
                <p className="text-gray-600 mt-2">Create your account to start ordering</p>
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
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Create a password"
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsSignupOpen(false)}
                    className="flex-1 py-3 rounded-xl border-gray-300 hover:border-gray-400"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 py-3 rounded-xl shadow-lg"
                  >
                    Sign Up
                  </Button>
                </div>
              </form>

              <p className="text-center mt-6 text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setIsSignupOpen(false)
                    setIsLoginOpen(true)
                  }}
                  className="text-blue-500 hover:text-blue-600 font-medium"
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800">Order Tracking</h3>
                  <p className="text-gray-600 mt-2">Track your orders and delivery status</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setIsOrderTrackingOpen(false)}
                  className="w-10 h-10 p-0 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-6xl">📦</span>
                  </div>
                  <h4 className="text-2xl font-semibold text-gray-800 mb-4">No Orders Yet</h4>
                  <p className="text-gray-600 mb-8">Start ordering to see your order history here!</p>
                  <Button
                    onClick={() => {
                      setIsOrderTrackingOpen(false)
                      scrollToMenu()
                    }}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-8 py-3 rounded-xl"
                  >
                    Browse Menu
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <Card
                      key={order.id}
                      className="border-2 border-gray-100 hover:shadow-lg transition-all duration-200"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h4 className="text-xl font-bold text-gray-800">Order #{order.id}</h4>
                            <p className="text-sm text-gray-500 mt-1">{new Date(order.orderTime).toLocaleString()}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1">
                              {order.status.toUpperCase()}
                            </Badge>
                            {order.paymentMethod && (
                              <Badge variant="outline" className="text-xs border-blue-200 text-blue-600">
                                {order.paymentMethod.toUpperCase()}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="mb-6">
                          <p className="text-sm font-medium text-gray-700 mb-3">Items Ordered:</p>
                          <div className="flex flex-wrap gap-2">
                            {order.items.map((item, index) => (
                              <Badge key={index} variant="outline" className="text-sm px-3 py-1">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-lg font-semibold text-gray-800">Total: ₹{order.total}</span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Est. {order.estimatedTime}
                          </span>
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-7xl max-h-[90vh] overflow-y-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    Our Partner Restaurants
                  </h3>
                  <p className="text-gray-600 mt-2 text-lg">Discover amazing restaurants we've partnered with</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setIsStoresOpen(false)}
                  className="w-12 h-12 p-0 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Store Category Filter */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {storeCategories.map((category) => (
                  <Button
                    key={category}
                    variant={activeStoreFilter === category ? "default" : "outline"}
                    onClick={() => setActiveStoreFilter(category)}
                    className={`capitalize px-6 py-3 rounded-full font-medium transform hover:scale-105 transition-all duration-200 ${
                      activeStoreFilter === category
                        ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg"
                        : "border-orange-200 hover:border-orange-300 hover:bg-orange-50"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Partner Stores Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStores.map((store) => (
                  <Card
                    key={store.id}
                    className="hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden"
                  >
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-orange-200 via-red-200 to-pink-200 flex items-center justify-center">
                        <span className="text-6xl">🏪</span>
                      </div>
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
                          <Star className="w-3 h-3 mr-1" />
                          {store.rating}
                        </Badge>
                        {store.isVeg && (
                          <Badge className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
                            🌱 Pure Veg
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs shadow-lg">
                          Est. {store.established}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">{store.name}</h4>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {store.location}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs border-orange-200 text-orange-600">
                          {store.cuisine}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center text-gray-500 text-sm bg-gray-100 px-3 py-2 rounded-full">
                          <Clock className="w-4 h-4 mr-1" />
                          {store.deliveryTime}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">{store.totalOrders} orders</div>
                      </div>

                      <div className="mb-6">
                        <p className="text-sm font-medium text-gray-700 mb-3">Specialties:</p>
                        <div className="flex flex-wrap gap-2">
                          {store.specialties.slice(0, 3).map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-gray-200">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                        <p className="text-sm font-medium text-orange-700 mb-1 flex items-center">
                          <Award className="w-4 h-4 mr-1" />
                          Special Offer
                        </p>
                        <p className="text-sm text-orange-600">{store.offers}</p>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                        onClick={() => {
                          setIsStoresOpen(false)
                          scrollToMenu()
                        }}
                      >
                        View Menu
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredStores.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-6xl">🏪</span>
                  </div>
                  <h4 className="text-2xl font-semibold text-gray-800 mb-4">No Restaurants Found</h4>
                  <p className="text-gray-600">Try selecting a different cuisine category.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delivery Partners Modal */}
      {isDeliveryPartnersOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-7xl max-h-[90vh] overflow-y-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    Our Delivery Partners
                  </h3>
                  <p className="text-gray-600 mt-2 text-lg">Meet our trusted delivery heroes</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setIsDeliveryPartnersOpen(false)}
                  className="w-12 h-12 p-0 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Partner Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {[
                  { number: "50+", label: "Active Partners", icon: Users },
                  { number: "99.8%", label: "On-Time Delivery", icon: Clock },
                  { number: "4.9★", label: "Average Rating", icon: Star },
                  { number: "24/7", label: "Service Available", icon: Shield },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <stat.icon className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Partners Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {deliveryPartners.map((partner) => (
                  <Card
                    key={partner.id}
                    className="hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                            {partner.avatar}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-800">{partner.name}</h4>
                            <p className="text-sm text-gray-500 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {partner.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge
                            className={`${
                              partner.status === "online"
                                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                : "bg-gradient-to-r from-yellow-500 to-orange-500"
                            } text-white shadow-lg`}
                          >
                            {partner.status === "online" ? "🟢 Online" : "🟡 Busy"}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-blue-200 text-blue-600">
                            {partner.badge}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                          <div className="text-xl font-bold text-blue-600">{partner.rating}</div>
                          <div className="text-xs text-gray-600">Rating</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                          <div className="text-xl font-bold text-green-600">{partner.deliveries}</div>
                          <div className="text-xs text-gray-600">Deliveries</div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Experience:</span>
                          <span className="font-medium">{partner.experience}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Vehicle:</span>
                          <span className="font-medium">{partner.vehicle}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Specialty:</span>
                          <span className="font-medium text-blue-600">{partner.speciality}</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-3">Languages:</p>
                        <div className="flex flex-wrap gap-2">
                          {partner.languages.map((lang, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-gray-200">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-center pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(partner.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">({partner.rating})</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && selectedItemForReview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⭐</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Write a Review</h3>
                <p className="text-gray-600 mt-2">Share your experience with {selectedItemForReview.name}</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.target as HTMLFormElement)
                  const rating = Number.parseInt(formData.get("rating") as string)
                  const comment = formData.get("comment") as string
                  handleReviewSubmit(rating, comment)
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Rating</label>
                  <select
                    name="rating"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
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
                  <label className="block text-sm font-medium text-gray-700 mb-3">Comment</label>
                  <textarea
                    name="comment"
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell us about your experience..."
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsReviewModalOpen(false)
                      setSelectedItemForReview(null)
                    }}
                    className="flex-1 py-3 rounded-xl border-gray-300 hover:border-gray-400"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 py-3 rounded-xl shadow-lg"
                  >
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💳</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Complete Payment</h3>
                <p className="text-gray-600 mt-2">Choose your preferred payment method</p>
              </div>

              {/* Order Summary */}
              <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl">
                <h4 className="font-semibold text-gray-800 mb-4 text-lg">Order Summary</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-medium">₹{getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span className="font-medium">₹20</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl border-t pt-3">
                    <span>Total:</span>
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                      ₹{getTotalPrice() + 20}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-gray-800 text-lg">Select Payment Method</h4>
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                      selectedPaymentMethod === method.id
                        ? "border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 shadow-lg"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            selectedPaymentMethod === method.id
                              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <method.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{method.name}</p>
                          <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {method.popular && (
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
                            Popular
                          </Badge>
                        )}
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedPaymentMethod === method.id ? "border-orange-500 bg-orange-500" : "border-gray-300"
                          }`}
                        >
                          {selectedPaymentMethod === method.id && <div className="w-3 h-3 rounded-full bg-white"></div>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Form */}
              {selectedPaymentMethod && (
                <div className="mb-8">
                  {selectedPaymentMethod === "card" && (
                    <div className="space-y-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                  )}

                  {selectedPaymentMethod === "upi" && (
                    <div className="space-y-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                        <input
                          type="text"
                          placeholder="yourname@paytm"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div className="p-4 bg-purple-100 rounded-xl">
                        <p className="text-sm text-purple-700 flex items-center">
                          <Smartphone className="w-4 h-4 mr-2" />
                          You will be redirected to your UPI app to complete the payment
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedPaymentMethod === "wallet" && (
                    <div className="space-y-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Wallet</label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200">
                          <option value="">Choose wallet</option>
                          <option value="paytm">Paytm</option>
                          <option value="amazonpay">Amazon Pay</option>
                          <option value="mobikwik">Mobikwik</option>
                        </select>
                      </div>
                      <div className="p-4 bg-green-100 rounded-xl">
                        <p className="text-sm text-green-700 flex items-center">
                          <Wallet className="w-4 h-4 mr-2" />
                          You will be redirected to your wallet app to complete the payment
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedPaymentMethod === "cod" && (
                    <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl">
                      <div className="flex items-center mb-3">
                        <MapPin className="w-5 h-5 text-yellow-600 mr-2" />
                        <p className="text-lg font-medium text-yellow-800">Cash on Delivery</p>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Pay ₹{getTotalPrice() + 20} in cash when your order arrives. Please keep exact change ready for
                        faster delivery.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsPaymentOpen(false)
                    setSelectedPaymentMethod("")
                  }}
                  className="flex-1 py-4 rounded-xl border-gray-300 hover:border-gray-400"
                  disabled={isProcessingPayment}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => processPayment({})}
                  disabled={!selectedPaymentMethod || isProcessingPayment}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  {isProcessingPayment ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    `💳 Pay ₹${getTotalPrice() + 20}`
                  )}
                </Button>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                <p className="text-xs text-gray-600 text-center flex items-center justify-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Your payment information is secure and encrypted. We never store your card details.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tie-up Partners Modal */}
      {isTieUpPartnersOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-7xl max-h-[90vh] overflow-y-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    Restaurant & Café Partners
                  </h3>
                  <p className="text-gray-600 mt-2 text-lg">Our trusted restaurant and café partners</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => setIsPartnerApplicationOpen(true)}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-6 py-3 rounded-xl shadow-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Join as Partner
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setIsTieUpPartnersOpen(false)}
                    className="w-12 h-12 p-0 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              {/* Partner Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {[
                  { number: "50+", label: "Partner Restaurants", icon: "🏪" },
                  { number: "25+", label: "Partner Cafés", icon: "☕" },
                  { number: "₹2.5Cr+", label: "Monthly Revenue", icon: "💰" },
                  { number: "4.8★", label: "Average Rating", icon: "⭐" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="text-3xl mb-3">{stat.icon}</div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {tieUpCategories.map((category) => (
                  <Button
                    key={category}
                    variant={activeTieUpFilter === category ? "default" : "outline"}
                    onClick={() => setActiveTieUpFilter(category)}
                    className={`capitalize px-6 py-3 rounded-full font-medium transform hover:scale-105 transition-all duration-200 ${
                      activeTieUpFilter === category
                        ? "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-lg"
                        : "border-purple-200 hover:border-purple-300 hover:bg-purple-50"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Partners Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTieUpPartners.map((partner) => (
                  <Card
                    key={partner.id}
                    className="hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden"
                  >
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-purple-200 via-indigo-200 to-pink-200 flex items-center justify-center">
                        <span className="text-6xl">
                          {partner.type === "Restaurant" ? "🍽️" : partner.type === "Café" ? "☕" : "🧁"}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
                          <Star className="w-3 h-3 mr-1" />
                          {partner.rating}
                        </Badge>
                        <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg text-xs">
                          {partner.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs shadow-lg">
                          {partner.type}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">{partner.name}</h4>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {partner.location}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs border-purple-200 text-purple-600">
                          {partner.cuisine}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                          <div className="text-lg font-bold text-green-600">{partner.totalOrders}</div>
                          <div className="text-xs text-gray-600">Orders</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                          <div className="text-lg font-bold text-blue-600">{partner.monthlyRevenue}</div>
                          <div className="text-xs text-gray-600">Revenue</div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Owner:</span>
                          <span className="font-medium">{partner.owner}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Established:</span>
                          <span className="font-medium">{partner.established}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Delivery Time:</span>
                          <span className="font-medium text-purple-600">{partner.deliveryTime}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Min Order:</span>
                          <span className="font-medium">₹{partner.minimumOrder}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                        <div className="flex flex-wrap gap-1">
                          {partner.specialties.slice(0, 3).map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-gray-200">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                        <p className="text-sm font-medium text-purple-700 mb-1 flex items-center">
                          <Award className="w-4 h-4 mr-1" />
                          Current Offer
                        </p>
                        <p className="text-sm text-purple-600">{partner.offers}</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {partner.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-blue-200 text-blue-600">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(partner.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">({partner.rating})</span>
                        </div>
                        <div className="text-sm text-gray-600">{partner.priceRange}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Partner Benefits Section */}
              <div className="mt-16">
                <h4 className="text-3xl font-bold text-center text-gray-800 mb-12">
                  Why Partner With{" "}
                  <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    FoodDash?
                  </span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: "📈",
                      title: "Increase Revenue",
                      description: "Boost your sales by 40% with our extensive customer base and marketing support",
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      icon: "🎯",
                      title: "Targeted Marketing",
                      description: "Reach the right customers with our AI-powered recommendation system",
                      color: "from-blue-500 to-indigo-500",
                    },
                    {
                      icon: "📱",
                      title: "Easy Management",
                      description: "Manage orders, menu, and analytics through our user-friendly partner dashboard",
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      icon: "🚀",
                      title: "Quick Onboarding",
                      description: "Get started in just 24 hours with our streamlined registration process",
                      color: "from-orange-500 to-red-500",
                    },
                    {
                      icon: "💰",
                      title: "Competitive Rates",
                      description: "Enjoy industry-best commission rates and transparent pricing structure",
                      color: "from-yellow-500 to-orange-500",
                    },
                    {
                      icon: "🛡️",
                      title: "Reliable Support",
                      description: "24/7 dedicated support team to help you succeed and grow your business",
                      color: "from-teal-500 to-cyan-500",
                    },
                  ].map((benefit, index) => (
                    <Card
                      key={index}
                      className="text-center p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm"
                    >
                      <div className="text-4xl mb-4">{benefit.icon}</div>
                      <h5 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h5>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Partner Application Modal */}
      {isPartnerApplicationOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🤝</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Join FoodDash Partners</h3>
                <p className="text-gray-600 mt-2">Partner with us and grow your business</p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Restaurant/Café Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter business name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Business Type *</label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select type</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="cafe">Café</option>
                      <option value="bakery">Bakery</option>
                      <option value="cloud-kitchen">Cloud Kitchen</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Owner Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter owner name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Complete Address *</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Enter complete address with pincode"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Cuisine Type *</label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select cuisine</option>
                      <option value="north-indian">North Indian</option>
                      <option value="south-indian">South Indian</option>
                      <option value="chinese">Chinese</option>
                      <option value="italian">Italian</option>
                      <option value="continental">Continental</option>
                      <option value="punjabi">Punjabi</option>
                      <option value="multi-cuisine">Multi-Cuisine</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Established Year</label>
                    <input
                      type="number"
                      min="1900"
                      max="2024"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., 2020"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Seating Capacity</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Number of seats"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Average Order Value</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="₹ per order"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Business Features</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Dine-in", "Takeaway", "Delivery", "Catering", "Parking", "WiFi", "AC", "Live Music"].map(
                      (feature) => (
                        <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-500 focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </label>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Tell us about your specialties and what makes you unique
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Describe your signature dishes, unique selling points, awards, etc."
                  />
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Partnership Benefits
                  </h4>
                  <ul className="text-sm text-green-700 space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Increase revenue by up to 40%
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Access to 10k+ active customers
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Free marketing and promotional support
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      24/7 dedicated partner support
                    </li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsPartnerApplicationOpen(false)}
                    className="flex-1 py-4 rounded-xl border-gray-300 hover:border-gray-400"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Submit Application
                  </Button>
                </div>
              </form>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-sm text-blue-700 text-center flex items-center justify-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Need help? Call us at +91 8877002297 or email partners@fooddash.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
