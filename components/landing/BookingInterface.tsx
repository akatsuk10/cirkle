import { Star, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Calendar from "./Calendar";

export default function BookingInterface() {
  return (
    <section className="w-full bg-muted/30 border-l border-r border-border">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-12 md:py-16">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">DS</span>
              </div>
              <div>
                <CardDescription>Dr. Sarah Smith</CardDescription>
                <CardTitle className="text-base">Medical Appointment</CardTitle>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Welcome to Sacred Heart Hospital. Please pick a time for your appointment.
            </p>
            
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm">15m</Button>
              <Button variant="outline" size="sm">30m</Button>
              <Button variant="outline" size="sm">45m</Button>
              <Button variant="default" size="sm">1h</Button>
            </div>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>22 Street, Chicago</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Asia/Singapore →</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Calendar />

        <div className="flex justify-center gap-8 mt-8 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
              ))}
            </div>
            <span className="text-sm font-medium">Trustpilot</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <Badge variant="secondary" className="rounded-full w-6 h-6 p-0 flex items-center justify-center bg-orange-500 text-white">
              G
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-red-500 text-red-500" />
              ))}
              <Star className="w-4 h-4 fill-red-200 text-red-200" />
            </div>
            <Badge variant="secondary" className="rounded-full w-6 h-6 p-0 flex items-center justify-center bg-red-500 text-white">
              G
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
