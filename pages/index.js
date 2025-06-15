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
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button size="sm" onClick={sendChatMessage} className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {isListening && (
                <p className="text-xs text-red-500 mt-1 animate-pulse">🎤 Listening...</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ANIMALS PAGE
  if (activeTab === "animals") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-green-600 text-white p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">🐄 Animal Management</h1>
            <p className="text-sm opacity-90">{totalAnimals} animals managed</p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-700 hover:bg-green-800"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("dashboard")}
              className="text-white hover:bg-green-700"
            >
              Back
            </Button>
          </div>
        </div>

        {showAddForm && (
          <div className="p-4 bg-white border-b">
            <h3 className="font-medium mb-3">Add New Animal</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Animal name"
                  value={newAnimal.name}
                  onChange={(e) => setNewAnimal({...newAnimal, name: e.target.value})}
                />
                <Input
                  placeholder="Breed"
                  value={newAnimal.breed}
                  onChange={(e) => setNewAnimal({...newAnimal, breed: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  className="w-full p-2 border rounded-md"
                  value={newAnimal.type}
                  onChange={(e) => setNewAnimal({...newAnimal, type: e.target.value})}
                >
                  <option value="Cow">Cow</option>
                  <option value="Bull">Bull</option>
                  <option value="Goat">Goat</option>
                  <option value="Sheep">Sheep</option>
                  <option value="Chicken">Chicken</option>
                </select>
                <Input
                  type="number"
                  placeholder="Weight (kg)"
                  value={newAnimal.weight}
                  onChange={(e) => setNewAnimal({...newAnimal, weight: e.target.value})}
                />
              </div>
              <Input
                placeholder="Location"
                value={newAnimal.location}
                onChange={(e) => setNewAnimal({...newAnimal, location: e.target.value})}
              />
              <div className="flex gap-2">
                <Button onClick={addAnimal} className="flex-1">Add Animal</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        <div className="p-4">
          <div className="space-y-3">
            {animals.map((animal) => (
              <div key={animal.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      {animal.name}
                      {animal.pregnant && <span className="text-pink-500">🤰</span>}
                    </h3>
                    <p className="text-gray-600">{animal.breed} {animal.type}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {animal.location}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    animal.health === 'Good' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {animal.health}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{animal.weight} kg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{animal.lastFed}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">${animal.feedCost}/day</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Milk today:</span>
                  <Input
                    type="number"
                    value={animal.milkToday}
                    onChange={(e) => updateMilk(animal.id, parseInt(e.target.value) || 0)}
                    className="w-20 h-8 text-sm"
                  />
                  <span className="text-sm">L</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // AI CHAT PAGE
  if (activeTab === "chat") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">🤖 Dr. Shamba AI Assistant</h1>
            <p className="text-sm opacity-90">Your Intelligent Farming Companion</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("dashboard")}
            className="text-white hover:bg-white hover:bg-opacity-20"
          >
            Back
          </Button>
        </div>

        <div className="bg-white p-4 border-b shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-gray-500" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border rounded-lg p-2 text-sm"
              >
                <option value="luganda">🇺🇬 Luganda (Uganda)</option>
                <option value="swahili">🇰🇪 Kiswahili (Kenya/Tanzania)</option>
                <option value="english">🇬🇧 English</option>
              </select>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 text-xs text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                AI Online
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-sm lg:max-w-md p-4 rounded-2xl shadow-sm ${
                msg.type === 'user' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                  : 'bg-white text-gray-800 border'
              }`}>
                {msg.type === 'ai' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="h-5 w-5 text-blue-500" />
                    <span className="font-semibold text-blue-600">Dr. Shamba AI</span>
                  </div>
                )}
                <p className="leading-relaxed">{msg.message}</p>
                <p className="text-xs opacity-70 mt-2">{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 mb-3">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={
                  selectedLanguage === 'luganda' ? 'Buuza Dr. Shamba AI ekibuuzo kyonna ku byobulimi...' : 
                  selectedLanguage === 'swahili' ? 'Uliza Dr. Shamba AI swali lolote kuhusu kilimo...' : 
                  'Ask Dr. Shamba AI anything about farming...'
                }
                className="flex-1 p-3 text-lg rounded-xl border-2"
                onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
              />
              <Button
                onClick={isListening ? () => setIsListening(false) : startListening}
                className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white p-3 rounded-xl`}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              <Button 
                onClick={sendChatMessage} 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-xl"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>

            {isListening && (
              <div className="text-center py-2">
                <p className="text-red-500 animate-pulse font-medium">
                  🎤 {selectedLanguage === 'luganda' ? 'Nkuwuliriza...' : 
                       selectedLanguage === 'swahili' ? 'Nasikiliza...' : 
                       'Listening...'}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-3">
              {selectedLanguage === 'luganda' && [
                'Ensolo zange tezirina mata',
                'Ensolo zange zilwadde',
                'Emmere ki ezisinga obulungi?'
              ].map((q, idx) => (
                <Button
                  key={idx}
                  size="sm"
                  variant="outline"
                  onClick={() => setChatInput(q)}
                  className="text-xs rounded-full"
                >
                  {q}
                </Button>
              ))}

              {selectedLanguage === 'swahili' && [
                'Ng\'ombe wangu hawatoi maziwa',
                'Mifugo yangu ni wagonjwa',
                'Chakula g
                {selectedLanguage === 'swahili' && [
                'Ng\'ombe wangu hawatoi maziwa',
                'Mifugo yangu ni wagonjwa',
                'Chakula gani ni bora?'
              ].map((q, idx) => (
                <Button
                  key={idx}
                  size="sm"
                  variant="outline"
                  onClick={() => setChatInput(q)}
                  className="text-xs rounded-full"
                >
                  {q}
                </Button>
              ))}

              {selectedLanguage === 'english' && [
                'My cows are not producing milk',
                'My animals are sick',
                'What is the best feed?'
              ].map((q, idx) => (
                <Button
                  key={idx}
                  size="sm"
                  variant="outline"
                  onClick={() => setChatInput(q)}
                  className="text-xs rounded-full"
                >
                  {q}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // VET CONSULTATION PAGE
  if (activeTab === "vet") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">🏥 Veterinary Consultation</h1>
            <p className="text-sm opacity-90">Connect with Professional Veterinarians</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("dashboard")}
            className="text-white hover:bg-white hover:bg-opacity-20"
          >
            Back
          </Button>
        </div>

        <div className="bg-red-500 text-white p-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">24/7 Emergency Vet Line: +256-800-VET-HELP</span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-500" />
              Quick Consultation (FREE)
            </h3>
            <p className="text-sm text-gray-600 mb-3">Get instant advice for common issues</p>
            <Button className="w-full bg-green-500 hover:bg-green-600">
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Free AI Pre-Assessment
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Licensed Veterinarians Available Now
              </h3>
            </div>
            
            {availableVets.map((vet) => (
              <div key={vet.id} className="p-4 border-b last:border-b-0">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="text-4xl">👩‍⚕️</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{vet.name}</h4>
                      <p className="text-green-600 font-medium">{vet.specialization}</p>
                      <p className="text-sm text-gray-600">{vet.experience} experience • {vet.location}</p>
                      
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {'★'.repeat(Math.floor(vet.rating))}
                          </div>
                          <span className="font-medium">{vet.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Languages className="h-4 w-4" />
                          <span>{vet.languages.join(', ')}</span>
                        </div>
                      </div>

                      <div className="mt-2 text-sm">
                        <span className="text-gray-600">Response time: </span>
                        <span className="font-medium">{vet.responseTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      vet.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {vet.available ? '🟢 Available' : '🔴 Busy'}
                    </div>
                    <div className="mt-2 text-lg font-bold text-green-600">
                      ${vet.consultationFee}
                    </div>
                    <div className="text-xs text-gray-500">per consultation</div>
                  </div>
                </div>

                {vet.available && (
                  <div className="mt-4 flex gap-2">
                    <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                      <Phone className="h-4 w-4 mr-2" />
                      Voice Call
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // TASKS PAGE
  if (activeTab === "tasks") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">✅ Task Management</h1>
            <p className="text-sm opacity-90">{tasks.filter(t => !t.completed).length} pending • {urgentTasks} urgent</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("dashboard")}
            className="text-white hover:bg-purple-700"
          >
            Back
          </Button>
        </div>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon={CheckCircle} title="Completed" value={tasks.filter(t => t.completed).length} color="green" />
            <StatCard icon={Clock} title="Pending" value={tasks.filter(t => !t.completed).length} color="blue" />
            <StatCard icon={AlertTriangle} title="Urgent" value={urgentTasks} color="red" />
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold">All Tasks</h3>
            </div>
            {tasks.map((task) => (
              <div key={task.id} className={`p-4 border-b last:border-b-0 ${task.completed ? 'bg-gray-50' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {task.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 border-2 border-gray-300 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <div className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                        {task.task}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        Due: {task.dueDate}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded text-xs ${
                      task.priority === 'High' ? 'bg-red-100 text-red-800' :
                      task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // REPORTS PAGE
  if (activeTab === "reports") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">📊 Farm Reports</h1>
            <p className="text-sm opacity-90">Analytics • Insights • Performance</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("dashboard")}
            className="text-white hover:bg-indigo-700"
          >
            Back
          </Button>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Farm Performance Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded">
                <div className="text-3xl font-bold text-green-600">{((healthyAnimals/totalAnimals)*100).toFixed(0)}%</div>
                <div className="text-sm text-gray-600">Health Rate</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded">
                <div className="text-3xl font-bold text-blue-600">{(totalMilk/totalAnimals).toFixed(1)}L</div>
                <div className="text-sm text-gray-600">Avg Milk/Animal</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold mb-3">This Week's Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Total Milk Production:</span>
                <span className="font-bold text-blue-600">{totalMilk * 7}L</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Weekly Revenue:</span>
                <span className="font-bold text-green-600">${(totalMilk * 7 * 2.5).toFixed(0)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Target className="h-5 w-5" />
              AI-Powered Recommendations
            </h3>
            <div className="space-y-3">
              <div className="bg-green-50 border-l-4 border-green-500 p-3">
                <div className="font-medium text-green-800">💡 Optimize Milk Production</div>
                <div className="text-sm text-green-700">Daisy is your top performer. Consider breeding her to improve herd genetics.</div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                <div className="font-medium text-blue-800">🎯 Health Focus</div>
                <div className="text-sm text-blue-700">Implement preventive vaccination schedule to reduce future vet costs.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Main App Component
export default function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const onboardingSteps = [
    {
      title: "Welcome to Shamba Pro",
      desc: "The most comprehensive livestock management system for African farmers.",
    },
    {
      title: "AI-Powered Assistant",
      desc: "Get intelligent recommendations in Luganda, Swahili, or English with voice support.",
    },
    {
      title: "Professional Vet Access",
      desc: "Connect with licensed veterinarians across East Africa for expert consultation.",
    },
    {
      title: "Complete Farm Management",
      desc: "Animals, health, finances, weather, and tasks - all in one powerful platform.",
    },
  ];

  if (showSplash) {
    return (
      <>
        <Head>
          <title>Shamba Pro - Revolutionary Farm Management</title>
          <meta name="description" content="The most advanced farming app for Africa with AI assistant and vet consultations" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative z-10 animate-pulse">
            <div className="text-6xl mb-4 animate-bounce">🐐</div>
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
              Shamba Pro
            </h1>
            <p className="text-xl opacity-90 mb-6">Complete Farm Management System</p>
            <p className="text-lg opacity-80">By Dr. Bulayimu Group</p>
            <div className="mt-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
            <div className="mt-4 text-sm opacity-70">Loading your revolutionary farming platform...</div>
          </div>
          
          <div className="absolute top-20 left-10 text-4xl opacity-30 animate-pulse">🌾</div>
          <div className="absolute top-32 right-16 text-3xl opacity-25 animate-bounce delay-300">🐄</div>
          <div className="absolute bottom-32 left-20 text-3xl opacity-20 animate-pulse delay-700">🥛</div>
          <div className="absolute bottom-20 right-12 text-2xl opacity-25 animate-bounce delay-1000">💰</div>
          <div className="absolute top-40 left-1/2 text-2xl opacity-15 animate-pulse delay-500">🤖</div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Head>
          <title>Login - Shamba Pro</title>
          <meta name="description" content="Access your revolutionary farm management system" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="min-h-screen flex flex-col justify-center items-center px-6 bg-gradient-to-br from-green-50 via-white to-blue-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🐐</div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Shamba Pro
              </h1>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Welcome Back</h2>
              <p className="text-gray-600 text-sm">Access your revolutionary farm management system</p>
            </div>
            
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-green-500 transition-colors"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-green-500 transition-colors"
              />
              <Button
                onClick={() => setUser({ email })}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white w-full py-3 text-lg rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                disabled={!email || !password}
              >
                Enter Farm Dashboard
              </Button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">Secured by Dr. Bulayimu Group Technology</p>
              <div className="flex justify-center items-center gap-2 mt-2 text-xs text-gray-400">
                <Bot className="h-3 w-3" />
                <span>AI Assistant</span>
                <span>•</span>
                <Stethoscope className="h-3 w-3" />
                <span>Vet Access</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (step < onboardingSteps.length) {
    const { title, desc } = onboardingSteps[step];
    return (
      <>
        <Head>
          <title>Getting Started - Shamba Pro</title>
          <meta name="description" content="Learn about Shamba Pro features" />
        </Head>
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-10 bg-gradient-to-br from-green-50 via-white to-blue-50">
          <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg w-full border border-gray-100">
            <div className="mb-8">
              {step === 0 && <div className="text-8xl mb-6 animate-bounce">🌱</div>}
              {step === 1 && <div className="text-8xl mb-6 animate-pulse">🤖</div>}
              {step === 2 && <div className="text-8xl mb-6 animate-bounce">🏥</div>}
              {step === 3 && <div className="text-8xl mb-6 animate-pulse">🚀</div>}
            </div>
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              {title}
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">{desc}</p>
            
            <div className="flex gap-2 justify-center mb-8">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === step 
                      ? 'w-8 bg-gradient-to-r from-green-600 to-blue-600' 
                      : 'w-3 bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <Button
              onClick={() => setStep((prev) => prev + 1)}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-10 py-3 w-full text-lg rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {step === onboardingSteps.length - 1 ? 'Start Revolutionary Farming' : 'Continue Journey'}
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            Step {step + 1} of {onboardingSteps.length}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - Shamba Pro</title>
        <meta name="description" content="Your complete farm management dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ShambaMobileDashboard />
    </>
  );
}
