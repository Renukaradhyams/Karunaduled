import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  Lightbulb, 
  Home, 
  Sofa, 
  UtensilsCrossed, 
  Bath, 
  Briefcase, 
  BedDouble,
  Warehouse,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface RoomType {
  id: string;
  name: string;
  icon: React.ElementType;
  luxRequired: number; // Lux requirement for the room
  description: string;
}

const roomTypes: RoomType[] = [
  { id: 'bedroom', name: 'Bedroom', icon: BedDouble, luxRequired: 150, description: 'Relaxing ambient light' },
  { id: 'living', name: 'Living Room', icon: Sofa, luxRequired: 200, description: 'Comfortable general lighting' },
  { id: 'kitchen', name: 'Kitchen', icon: UtensilsCrossed, luxRequired: 300, description: 'Bright task lighting' },
  { id: 'bathroom', name: 'Bathroom', icon: Bath, luxRequired: 250, description: 'Clear visibility lighting' },
  { id: 'office', name: 'Office/Study', icon: Briefcase, luxRequired: 350, description: 'Focus-enhancing light' },
  { id: 'garage', name: 'Garage/Storage', icon: Warehouse, luxRequired: 200, description: 'Functional lighting' },
];

const wattageOptions = [
  { watts: 7, lumens: 630, label: '7W LED' },
  { watts: 9, lumens: 810, label: '9W LED' },
  { watts: 12, lumens: 1080, label: '12W LED' },
  { watts: 15, lumens: 1350, label: '15W LED' },
  { watts: 18, lumens: 1620, label: '18W LED' },
  { watts: 22, lumens: 1980, label: '22W LED' },
];

const LightingCalculator: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [heightFeet, setHeightFeet] = useState<number>(9);
  const [selectedWattage, setSelectedWattage] = useState(wattageOptions[2]); // 12W default
  const [showResults, setShowResults] = useState(false);

  const roomData = roomTypes.find(r => r.id === selectedRoom);
  
  const calculations = useMemo(() => {
    if (!selectedRoom || !length || !width) return null;
    
    const areaInSqFt = parseFloat(length) * parseFloat(width);
    const areaInSqM = areaInSqFt * 0.0929; // Convert to sq meters
    
    const room = roomTypes.find(r => r.id === selectedRoom);
    if (!room) return null;
    
    // Calculate total lumens needed
    const totalLumensNeeded = areaInSqM * room.luxRequired;
    
    // Adjust for ceiling height (higher ceilings need more light)
    const heightMultiplier = heightFeet > 10 ? 1.2 : heightFeet > 12 ? 1.4 : 1;
    const adjustedLumens = totalLumensNeeded * heightMultiplier;
    
    // Calculate number of bulbs needed
    const bulbsNeeded = Math.ceil(adjustedLumens / selectedWattage.lumens);
    
    // Energy savings calculation (vs 60W incandescent)
    const incandescentWatts = bulbsNeeded * 60;
    const ledWatts = bulbsNeeded * selectedWattage.watts;
    const energySaved = Math.round(((incandescentWatts - ledWatts) / incandescentWatts) * 100);
    
    // Monthly cost (assuming 6 hours/day, ₹8/kWh)
    const monthlyHours = 6 * 30;
    const monthlyCostLED = (ledWatts * monthlyHours / 1000) * 8;
    const monthlyCostIncandescent = (incandescentWatts * monthlyHours / 1000) * 8;
    const monthlySavings = monthlyCostIncandescent - monthlyCostLED;
    
    return {
      areaInSqFt,
      totalLumensNeeded: Math.round(adjustedLumens),
      bulbsNeeded,
      energySaved,
      monthlyCostLED: Math.round(monthlyCostLED),
      monthlySavings: Math.round(monthlySavings),
      yearlySavings: Math.round(monthlySavings * 12),
    };
  }, [selectedRoom, length, width, heightFeet, selectedWattage]);

  const handleCalculate = () => {
    if (calculations) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setSelectedRoom('');
    setLength('');
    setWidth('');
    setHeightFeet(9);
    setSelectedWattage(wattageOptions[2]);
    setShowResults(false);
  };

  const isFormValid = selectedRoom && length && width && parseFloat(length) > 0 && parseFloat(width) > 0;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Room Type Selection */}
            <div className="space-y-4">
              <Label className="text-lg font-heading font-semibold flex items-center gap-2">
                <Home className="w-5 h-5 text-primary" />
                Select Room Type
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {roomTypes.map((room, index) => (
                  <motion.button
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedRoom(room.id)}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all duration-300 text-left group",
                      selectedRoom === room.id
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                        : "border-border bg-card hover:border-primary/50 hover:bg-card/80"
                    )}
                  >
                    <room.icon className={cn(
                      "w-8 h-8 mb-2 transition-colors",
                      selectedRoom === room.id ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                    )} />
                    <p className="font-semibold text-foreground">{room.name}</p>
                    <p className="text-xs text-muted-foreground">{room.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Room Dimensions */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: selectedRoom ? 1 : 0.5 }}
            >
              <Label className="text-lg font-heading font-semibold flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Room Dimensions (in feet)
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">Length</Label>
                  <Input
                    id="length"
                    type="number"
                    placeholder="e.g., 12"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="h-12 text-lg"
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder="e.g., 10"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="h-12 text-lg"
                    min="1"
                  />
                </div>
              </div>
              
              {/* Ceiling Height */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <Label>Ceiling Height</Label>
                  <span className="text-primary font-semibold">{heightFeet} feet</span>
                </div>
                <Slider
                  value={[heightFeet]}
                  onValueChange={(value) => setHeightFeet(value[0])}
                  min={8}
                  max={15}
                  step={1}
                  className="w-full"
                />
              </div>
            </motion.div>

            {/* Bulb Wattage Selection */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: selectedRoom && length && width ? 1 : 0.5 }}
            >
              <Label className="text-lg font-heading font-semibold flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                Preferred Bulb Wattage
              </Label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {wattageOptions.map((option) => (
                  <motion.button
                    key={option.watts}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedWattage(option)}
                    className={cn(
                      "p-3 rounded-lg border-2 transition-all duration-300 text-center",
                      selectedWattage.watts === option.watts
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card hover:border-primary/50"
                    )}
                  >
                    <p className="font-bold text-foreground">{option.watts}W</p>
                    <p className="text-xs text-muted-foreground">{option.lumens}lm</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Live Preview */}
            {calculations && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 rounded-xl bg-primary/5 border border-primary/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                    <span className="text-muted-foreground">Estimated bulbs needed:</span>
                  </div>
                  <motion.span 
                    key={calculations.bulbsNeeded}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-primary"
                  >
                    {calculations.bulbsNeeded}
                  </motion.span>
                </div>
              </motion.div>
            )}

            {/* Calculate Button */}
            <Button
              size="lg"
              className="w-full gap-2 glow-primary-sm"
              onClick={handleCalculate}
              disabled={!isFormValid}
            >
              <Calculator className="w-5 h-5" />
              Calculate Lighting Requirements
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Results Header */}
            <div className="text-center space-y-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center"
              >
                <Lightbulb className="w-10 h-10 text-primary" />
              </motion.div>
              <h3 className="text-2xl font-heading font-bold text-foreground">
                Your Lighting Recommendation
              </h3>
              <p className="text-muted-foreground">
                For your {roomData?.name} ({calculations?.areaInSqFt} sq.ft)
              </p>
            </div>

            {/* Main Result */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30 text-center"
            >
              <p className="text-muted-foreground mb-2">You need approximately</p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', bounce: 0.4 }}
                className="flex items-center justify-center gap-4"
              >
                <span className="text-6xl md:text-7xl font-heading font-bold text-primary glow-text">
                  {calculations?.bulbsNeeded}
                </span>
                <div className="text-left">
                  <p className="text-xl font-semibold text-foreground">{selectedWattage.label}</p>
                  <p className="text-sm text-muted-foreground">Bulbs</p>
                </div>
              </motion.div>
              <p className="mt-4 text-sm text-muted-foreground">
                Total lumens: {calculations?.totalLumensNeeded.toLocaleString()} lm
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Energy Saved', value: `${calculations?.energySaved}%`, icon: Zap, color: 'text-success' },
                { label: 'Monthly Cost', value: `₹${calculations?.monthlyCostLED}`, icon: Calculator, color: 'text-primary' },
                { label: 'Monthly Savings', value: `₹${calculations?.monthlySavings}`, icon: Sparkles, color: 'text-amber-glow' },
                { label: 'Yearly Savings', value: `₹${calculations?.yearlySavings}`, icon: Home, color: 'text-success' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-4 rounded-xl bg-card border border-border text-center"
                >
                  <stat.icon className={cn("w-6 h-6 mx-auto mb-2", stat.color)} />
                  <p className={cn("text-xl font-bold", stat.color)}>{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Comparison Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-4 rounded-xl bg-success/10 border border-success/20"
            >
              <p className="text-sm text-center text-success">
                💡 Compared to incandescent bulbs, you'll save <strong>₹{calculations?.yearlySavings}</strong> per year 
                and reduce energy consumption by <strong>{calculations?.energySaved}%</strong>!
              </p>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 gap-2"
                onClick={handleReset}
              >
                <RotateCcw className="w-4 h-4" />
                Calculate Again
              </Button>
              <Link to="/products" className="flex-1">
                <Button size="lg" className="w-full gap-2 glow-primary-sm">
                  Browse {selectedWattage.label} Bulbs
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LightingCalculator;
