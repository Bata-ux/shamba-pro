import { useState, useEffect } from "react";
import Head from "next/head";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
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
export default function Home() {
return (
<div className="min-h-screen bg-gray-50 flex items-center justify-center">
<div className="text-center">
<div className="text-6xl mb-4">🐐</div>
<h1 className="text-4xl font-bold text-green-600 mb-2">Shamba Pro</h1>
<p className="text-gray-600">Revolutionary Farm Management System</p>
<p className="text-sm text-gray-500 mt-4">Full app loading soon...</p>
</div>
</div>
);
}
