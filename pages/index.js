import { useState, useEffect } from "react";
import Head from "next/head";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { 
  Plus, Users, Droplets, Scale, Heart, Calendar, BarChart3, Menu, X, 
  Cloud, CloudRain, Sun, Thermometer, DollarSign, Syringe, 
  AlertTriangle, Bell, Settings, TrendingUp, MapPin, Clock,
  Wheat, Truck, Phone, Calculator, FileText, Camera,
  Zap, Wifi, WifiOff, Download, Upload, CheckCircle,
  Activity, PieChart, LineChart, Target, Award, MessageCircle,
  Mic, MicOff, Volume2, VolumeX, Bot, Stethoscope, 
  UserCheck, Send, Languages, Globe
} from "lucide-react";
// Enhanced Farm Dashboard Component
function ShambaMobileDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showMenu, setShowMenu] = useState(false); 
  // AI Chat Features
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'ai',
      message: 'Oli otya! I am Dr. Shamba AI, your farming assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString(),
      language: 'luganda'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('luganda');
  // Sample farm data
  const [animals, setAnimals] = useState([
    { 
      id: 1, name: "Daisy", type: "Cow", breed: "Holstein", age: 3,
      weight: 450, lastFed: "2 hours ago", health: "Good", milkToday: 12,
      feedCost: 45, location: "Paddock A", pregnant: false, notes: "Top milk producer"
    },
    { 
      id: 2, name: "Bella", type: "Cow", breed: "Jersey", age: 4,
      weight: 380, lastFed: "1 hour ago", health: "Good", milkToday: 8,
      feedCost: 42, location: "Paddock B", pregnant: true, notes: "Expecting calf in August"
    },
    { 
      id: 3, name: "Charlie", type: "Goat", breed: "Boer", age: 2,
      weight: 65, lastFed: "3 hours ago", health: "Fair", milkToday: 2,
      feedCost: 15, location: "Goat Pen", pregnant: false, notes: "Needs vaccination soon"
    }
  ]);
  const [tasks, setTasks] = useState([
    { id: 1, task: "Vaccinate Charlie", dueDate: "2025-06-16", priority: "High", completed: false },
    { id: 2, task: "Order hay feed", dueDate: "2025-06-18", priority: "Medium", completed: false },
    { id: 3, task: "Pregnancy check - Bella", dueDate: "2025-06-20", priority: "High", completed: false }
  ]);
  const [availableVets] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Nakato',
      specialization: 'Large Animal Veterinarian',
      experience: '12 years',
      rating: 4.9,
      location: 'Kampala, Uganda',
      languages: ['English', 'Luganda', 'Swahili'],
      available: true,
      consultationFee: 25,
      responseTime: '5-10 minutes'
    },
    {
      id: 2,
      name: 'Dr. James Mwangi',
      specialization: 'Dairy & Livestock Specialist',
      experience: '8 years',
      rating: 4.8,
      location: 'Nairobi, Kenya',
      languages: ['English', 'Swahili', 'Kikuyu'],
      available: true,
      consultationFee: 30,
      responseTime: '10-15 minutes'
    }
  ]);
  const [newAnimal, setNewAnimal] = useState({ 
    name: "", type: "Cow", breed: "", age: "", weight: "", location: "", notes: "" 
  });
  const [showAddForm, setShowAddForm] = useState(false);
  // Calculations
  const totalAnimals = animals.length;
  const totalMilk = animals.reduce((sum, animal) => sum + animal.milkToday, 0);
  const healthyAnimals = animals.filter(a => a.health === 'Good').length;
  const urgentTasks = tasks.filter(t => t.priority === 'High' && !t.completed).length;
  // Functions
  const addAnimal = () => {
    if (newAnimal.name && newAnimal.weight) {
      setAnimals([...animals, {
        id: Date.now(),
        name: newAnimal.name,
        type: newAnimal.type,
        breed: newAnimal.breed,
        age: parseInt(newAnimal.age) || 0,
        weight: parseInt(newAnimal.weight),
        lastFed: "Just now",
        health: "Good",
        milkToday: 0,
        feedCost: newAnimal.type === 'Cow' ? 40 : 15,
        location: newAnimal.location,
        pregnant: false,
        notes: newAnimal.notes
      }]);
      setNewAnimal({ name: "", type: "Cow", breed: "", age: "", weight: "", location: "", notes: "" });
      setShowAddForm(false);
    }
  };
  const updateMilk = (id, amount) => {
    setAnimals(animals.map(animal => 
      animal.id === id ? {...animal, milkToday: amount} : animal
    ));
  };
  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: chatInput,
      timestamp: new Date().toLocaleTimeString(),
      language: selectedLanguage
    }; 
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setTimeout(() => {
      const aiResponses = {
        luganda: [
          "Weebale okubuuza! Based on your farm data, nkuwa amagezi gano: Your animals are doing well! Daisy is your top milk producer.",
          "Eky'okusinga obukulu kwe kulabirira obulamu bw'ensolo zo. Charlie needs vaccination soon - this is very important!",
          "Nkulaga engeri y'oyinza okwongera ku mata: Give your cows more concentrate feed and ensure clean water always."
        ],
        swahili: [
          "Asante kwa swali! Kulingana na data ya shamba lako, napendekeza: Ng'ombe wako wanafanya vizuri sana!",
          "Jambo muhimu ni kutunza afya ya mifugo yako. Charlie anahitaji chanjo haraka - hii ni muhimu sana!",
          "Hapa ni njia za kuongeza uzalishaji wa maziwa: Wape ng'ombe chakula bora na maji safi kila wakati."
        ],
        english: [
          "Thank you for asking! Based on your farm data, I recommend: Your cows are producing well, especially Daisy!",
          "The most important thing is maintaining your animals' health. Charlie urgently needs vaccination.",
          "Here are ways to increase milk production: Improve feed quality, ensure clean water, and maintain regular feeding schedules."
        ]
      }; 
      const responses = aiResponses[selectedLanguage] || aiResponses.english;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];  
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        message: randomResponse,
        timestamp: new Date().toLocaleTimeString(),
        language: selectedLanguage
      };
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };
  const startListening = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const voiceInputs = {
        luganda: "Ensolo zange tezirina mata nnyo. Nnyinza kutya okukola?",
        swahili: "Ng'ombe wangu hawatoi maziwa mengi. Nifanye nini?",
        english: "My cows are not producing much milk. What should I do?"
      };
      setChatInput(voiceInputs[selectedLanguage] || voiceInputs.english);
    }, 2000);
  };
  const StatCard = ({ icon: Icon, title, value, color = "green", subtitle = "" }) => (
    <div className={`bg-white p-4 rounded-lg shadow-sm border-l-4 border-${color}-500`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-xs uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        <Icon className={`h-8 w-8 text-${color}-500`} />
      </div>
    </div>
  );
  // DASHBOARD PAGE
  if (activeTab === "dashboard") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-green-600 text-white p-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold">🐐 Shamba Pro Dashboard</h1>
              <p className="text-sm opacity-90">Revolutionary Farm Management • {new Date().toLocaleDateString()}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMenu(!showMenu)}
              className="text-white hover:bg-green-700"
            >
              {showMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {showMenu && (
          <div className="bg-white shadow-lg p-4 border-b">
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: "dashboard", icon: BarChart3, label: "Dashboard" },
                { key: "animals", icon: Users, label: "Animals" },
                { key: "chat", icon: MessageCircle, label: "AI Assistant" },
                { key: "vet", icon: Stethoscope, label: "Vet Consult" },
                { key: "tasks", icon: CheckCircle, label: "Tasks" },
                { key: "reports", icon: FileText, label: "Reports" }
              ].map(({ key, icon: Icon, label }) => (
                <Button
                  key={key}
                  variant={activeTab === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setActiveTab(key); setShowMenu(false); }}
                  className="flex items-center gap-2 justify-start"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        )}
        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon={Users} title="Animals" value={totalAnimals} subtitle={`${healthyAnimals} healthy`} />
          <StatCard icon={Droplets} title="Milk Today" value={`${totalMilk}L`} color="blue" subtitle="Daily production" />
          <StatCard icon={DollarSign} title="Profit" value="$6,470" color="green" subtitle="This month" />
          <StatCard icon={AlertTriangle} title="Urgent" value={urgentTasks} color="red" subtitle="Tasks pending" />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Animal Status
          </h2>
          <div className="bg-white rounded-lg shadow-sm">
            {animals.map((animal) => (
              <div key={animal.id} className="p-4 border-b last:border-b-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{animal.name}</h3>
                    <p className="text-sm text-gray-600">{animal.breed} {animal.type} • {animal.weight}kg</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {animal.location} • Last fed: {animal.lastFed}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Heart className={`h-4 w-4 ${animal.health === 'Good' ? 'text-green-500' : 'text-yellow-500'}`} />
                      <span className="text-sm">{animal.health}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{animal.milkToday}L</span>
                    </div>
                    {animal.pregnant && (
                      <div className="text-xs text-pink-600 mt-1">🤰 Pregnant</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {!showAIChat && (
          <Button
            onClick={() => setShowAIChat(true)}
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg z-50 animate-bounce"
          >
            <Bot className="h-6 w-6 text-white" />
          </Button>
        )}
        {showAIChat && (
          <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border z-50 flex flex-col">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Bot className="h-6 w-6" />
                <div>
                  <h3 className="font-bold">Dr. Shamba AI</h3>
                  <p className="text-xs opacity-90">Your Farming Assistant</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowAIChat(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-1 h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-2 border-b bg-gray-50">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full p-1 text-xs border rounded"
              >
                <option value="luganda">🇺🇬 Luganda</option>
                <option value="swahili">🇰🇪 Kiswahili</option>
                <option value="english">🇬🇧 English</option>
              </select>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-2xl ${
                    msg.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={selectedLanguage === 'luganda' ? 'Wandiika ekibuuzo kyo...' : 
                              selectedLanguage === 'swahili' ? 'Andika swali lako...' : 
                              'Type your question...'}
                  className="flex-1 text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                />
                <Button
                  size="sm"
                  onClick={isListening ? () => setIsListening(false) : startListening}
                  className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-
