import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Sun, Battery, Zap, Calendar, Shield, AlertTriangle, 
  FileText, Download, Plus, Settings, Activity
} from 'lucide-react';

// Mock solar system data
const mockSystem = {
  id: '1',
  system_id: 'SELCO-BLG-2024-0042',
  system_type: 'home_light' as const,
  installation_date: '2023-06-15',
  warranty_status: 'active' as const,
  warranty_end_date: '2028-06-15',
  health_status: 'good' as const,
  last_service_date: '2024-01-10',
  next_maintenance_date: '2024-04-10',
  installation_address: 'House No. 42, Main Road, Belgaum, Karnataka 590001',
  // Technical specs
  panel_brand: 'SELCO',
  panel_wattage: 100,
  panel_quantity: 2,
  total_capacity_watts: 200,
  battery_type: 'Lead Acid',
  battery_capacity_ah: 100,
  battery_voltage: 12,
  num_lights: 4,
  num_appliances: 2,
  expected_daily_generation_kwh: 0.8,
};

// Mock performance data
const mockPerformance = {
  todayGeneration: 0.65,
  batteryLevel: 78,
  systemUptime: 99.5,
  lastWeekGeneration: [0.7, 0.8, 0.6, 0.75, 0.8, 0.7, 0.65],
};

// Mock service history
const mockServiceHistory = [
  { date: '2024-01-10', type: 'Routine Maintenance', technician: 'Lakshmi D.', notes: 'Cleaned panels, checked connections' },
  { date: '2023-09-15', type: 'Battery Replacement', technician: 'Raju M.', notes: 'Replaced old battery with new 100Ah' },
  { date: '2023-06-15', type: 'Installation', technician: 'Team SELCO', notes: 'Initial installation completed' },
];

const getHealthColor = (status: string) => {
  switch (status) {
    case 'good': return 'bg-success text-success-foreground';
    case 'fair': return 'bg-warning text-warning-foreground';
    case 'needs_attention': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted';
  }
};

const getWarrantyColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-success';
    case 'expired': return 'bg-muted';
    default: return 'bg-destructive';
  }
};

export default function MySolarSystem() {
  const [activeTab, setActiveTab] = useState('overview');

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getDaysUntilMaintenance = () => {
    const nextDate = new Date(mockSystem.next_maintenance_date);
    const today = new Date();
    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilMaintenance = getDaysUntilMaintenance();

  return (
    <div className="p-6 space-y-6 max-w-lg mx-auto">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          ☀️ My Solar System
        </h1>
        <p className="text-muted-foreground mt-1">View and manage your solar installation</p>
      </div>

      {/* System ID Card */}
      <Card className="bg-solar-gradient text-white">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/70 text-sm">System ID</p>
              <p className="font-mono font-bold text-lg">{mockSystem.system_id}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Sun className="w-8 h-8" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-white/70 text-xs">Health</p>
              <Badge className={getHealthColor(mockSystem.health_status)}>
                {mockSystem.health_status === 'good' ? '✓ Good' : mockSystem.health_status}
              </Badge>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-white/70 text-xs">Warranty</p>
              <Badge className={getWarrantyColor(mockSystem.warranty_status)}>
                {mockSystem.warranty_status === 'active' ? '✓ Active' : 'Expired'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="specs">Specs</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          {/* Performance Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Today's Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Power Generated</span>
                  <span className="font-medium">{mockPerformance.todayGeneration} kWh</span>
                </div>
                <Progress value={(mockPerformance.todayGeneration / mockSystem.expected_daily_generation_kwh) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Expected: {mockSystem.expected_daily_generation_kwh} kWh/day
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted rounded-lg p-3 text-center">
                  <Battery className="w-6 h-6 mx-auto mb-1 text-success" />
                  <p className="text-2xl font-bold">{mockPerformance.batteryLevel}%</p>
                  <p className="text-xs text-muted-foreground">Battery Level</p>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <Zap className="w-6 h-6 mx-auto mb-1 text-primary" />
                  <p className="text-2xl font-bold">{mockPerformance.systemUptime}%</p>
                  <p className="text-xs text-muted-foreground">Uptime</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Alert */}
          {daysUntilMaintenance <= 30 && (
            <Card className={daysUntilMaintenance <= 7 ? 'border-warning bg-warning/5' : 'border-info bg-info/5'}>
              <CardContent className="pt-4 flex items-center gap-4">
                <div className={`p-3 rounded-full ${daysUntilMaintenance <= 7 ? 'bg-warning/20' : 'bg-info/20'}`}>
                  <Calendar className={`w-6 h-6 ${daysUntilMaintenance <= 7 ? 'text-warning' : 'text-info'}`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Maintenance Due</p>
                  <p className="text-sm text-muted-foreground">
                    {daysUntilMaintenance > 0 
                      ? `In ${daysUntilMaintenance} days (${formatDate(mockSystem.next_maintenance_date)})`
                      : 'Overdue - Please schedule soon'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Warranty Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Warranty Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Valid Until</p>
                  <p className="font-medium">{formatDate(mockSystem.warranty_end_date)}</p>
                </div>
                <Badge className={getWarrantyColor(mockSystem.warranty_status)}>
                  {mockSystem.warranty_status === 'active' ? 'Active' : 'Expired'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                All repairs and parts are covered under warranty
              </p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-14 flex flex-col gap-1">
              <FileText className="w-5 h-5" />
              <span className="text-xs">View Documents</span>
            </Button>
            <Button variant="outline" className="h-14 flex flex-col gap-1">
              <Download className="w-5 h-5" />
              <span className="text-xs">Download Manual</span>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="specs" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Solar Panels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Brand</span>
                <span className="font-medium">{mockSystem.panel_brand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Wattage</span>
                <span className="font-medium">{mockSystem.panel_wattage}W × {mockSystem.panel_quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Capacity</span>
                <span className="font-medium">{mockSystem.total_capacity_watts}W</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Battery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium">{mockSystem.battery_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Capacity</span>
                <span className="font-medium">{mockSystem.battery_capacity_ah} Ah</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Voltage</span>
                <span className="font-medium">{mockSystem.battery_voltage}V</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Connected Devices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lights</span>
                <span className="font-medium">{mockSystem.num_lights}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Other Appliances</span>
                <span className="font-medium">{mockSystem.num_appliances}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Installation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{formatDate(mockSystem.installation_date)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Address</span>
                <p className="font-medium mt-1">{mockSystem.installation_address}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Service History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockServiceHistory.map((service, index) => (
                <div key={index} className="border-l-2 border-primary pl-4 pb-4 last:pb-0">
                  <p className="text-sm text-muted-foreground">{formatDate(service.date)}</p>
                  <p className="font-medium">{service.type}</p>
                  <p className="text-sm text-muted-foreground">By {service.technician}</p>
                  <p className="text-sm mt-1">{service.notes}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button className="w-full h-14" variant="outline">
            <Download className="mr-2 w-5 h-5" />
            Download Full Service Report
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
