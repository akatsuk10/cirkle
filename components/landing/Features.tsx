import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Features() {
  return (
    <div className="max-w-[1200px] mx-auto py-16 relative">
      <div className="overflow-hidden py-8 lg:px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 items-stretch">
          {/* Individuals - Free */}
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Individuals</CardTitle>
              <div className="mb-4">
                <span className="text-4xl font-bold">Free</span>
              </div>
              <CardDescription>Good for individuals who are just starting out and simply want the essentials.</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1">
              <div className="space-y-3">
                <p className="text-sm font-semibold mb-3">Free, forever</p>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">1 user</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Unlimited calendars</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Unlimited event types</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Workflows</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button className="w-full bg-black hover:bg-black/80 text-white dark:bg-white dark:hover:bg-white/80 dark:text-black">
                Get started →
              </Button>
            </CardFooter>
          </Card>

          {/* Teams - $15 (Featured) */}
          <Card className="bg-muted/50 dark:bg-muted border-border flex flex-col h-full relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-black text-white dark:bg-white dark:text-black border-transparent">14 day free trial</Badge>
            </div>
            
            <CardHeader className="pt-8">
              <CardTitle>Teams</CardTitle>
              <div className="mb-1">
                <span className="text-sm text-muted-foreground">Starts at</span>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold">$15</span>
                <span className="text-sm text-muted-foreground ml-1">per month/user</span>
              </div>
              <CardDescription>Highly recommended for small teams who seek to upgrade their time and perform better as a unit.</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1">
              <div className="space-y-3">
                <p className="text-sm font-semibold mb-3">Free plan features, plus:</p>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">1 team</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Schedule meetings as a team</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Round-robin, fixed round-robin</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Collective events</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button className="w-full bg-black hover:bg-black/80 text-white dark:bg-white dark:hover:bg-white/80 dark:text-black">
                Get started →
              </Button>
            </CardFooter>
          </Card>

          {/* Organizations - $37 */}
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Organizations</CardTitle>
              <div className="mb-1">
                <span className="text-sm text-muted-foreground">Starts at</span>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold">$37</span>
                <span className="text-sm text-muted-foreground ml-1">per month/user</span>
              </div>
              <CardDescription>Robust scheduling for larger teams looking to have more control, privacy, and security.</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1">
              <div className="space-y-3">
                <p className="text-sm font-semibold mb-3">Teams plan features, plus:</p>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">1 parent team and unlimited sub-teams</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Organization workflows</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Yourcompany.cal.com subdomain</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">SOC2, HIPAA, ISO 27001 compliance check</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button className="w-full bg-black hover:bg-black/80 text-white dark:bg-white dark:hover:bg-white/80 dark:text-black">
                Get started →
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise - Contact us */}
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <div className="mb-4">
                <span className="text-4xl font-bold">Contact us</span>
              </div>
              <CardDescription>The most advanced scheduling and routing solution for large enterprise organizations.</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1">
              <div className="space-y-3">
                <p className="text-sm font-semibold mb-3">Organizations plan features plus:</p>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Dedicated Database</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Active directory sync</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Sync your HRIS tools</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Advanced routing</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button className="w-full bg-black hover:bg-black/80 text-white dark:bg-white dark:hover:bg-white/80 dark:text-black">
                Get a Quote →
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
