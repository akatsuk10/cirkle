import { Badge } from "@/components/ui/badge";

export default function Footer() {
    return (
        <footer className="w-full border-t border-border bg-background">
            <div className="max-w-6xl mx-auto py-12 px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <div className="mb-8 md:mb-4">
                        <div className="mb-2">
                            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                                Cirkle<span className="text-red-500">.</span>
                            </h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-6">
                            There is no risk-free trading
                        </p>
                    </div>

                    {/* Right-aligned sections wrapper */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-32 md:justify-end">
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-4">About</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-4">Documentation</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        Developer Docs
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        FAQ
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-4">Social</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        X (Twitter)
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        YouTube
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <Badge variant="outline" className="gap-2 rounded-lg text-xs">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        All systems operational
                    </Badge>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                        <p className="text-sm text-muted-foreground">
                            © 2025 Cirkle. All rights reserved
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Terms of Use
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
