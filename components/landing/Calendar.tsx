import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Calendar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">May 2025</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          <div className="text-muted-foreground font-medium py-2">SUN</div>
          <div className="text-muted-foreground font-medium py-2">MON</div>
          <div className="text-muted-foreground font-medium py-2">TUE</div>
          <div className="text-muted-foreground font-medium py-2">WED</div>
          <div className="text-muted-foreground font-medium py-2">THU</div>
          <div className="text-muted-foreground font-medium py-2">FRI</div>
          <div className="text-muted-foreground font-medium py-2">SAT</div>
          
          <div className="py-2"></div>
          <div className="py-2"></div>
          <div className="py-2"></div>
          <div className="py-2"></div>
          <div className="py-2 text-muted-foreground/50">1</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">2</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">3</div>
          
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">4</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">5</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">6</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">7</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">8</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">9</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">10</div>
          
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">11</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">12</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">13</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">14</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">15</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">16</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">17</div>
          
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">18</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">19</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">20</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">21</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">22</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">23</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">24</div>
          
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">25</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">26</div>
          <div className="py-2 bg-primary text-primary-foreground rounded">27</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">28</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">29</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">30</div>
          <div className="py-2 text-foreground hover:bg-accent rounded cursor-pointer">31</div>
        </div>
      </CardContent>
    </Card>
  );
}
