export default function Footer() {
    return (
        <footer className="">
            <div className="max-w-6xl mx-auto pb-12">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    {/* Brand Section */}
                    <div className="mb-8 md:mb-4">
                        <div className="mb-2">
                            <h3 className="text-4xl font-bold text-gray-900">
                                Cirkle
                            </h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-6">
                            There is no risk-free trading
                        </p>
                    </div>

                    {/* Right-aligned sections wrapper */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-32 md:justify-end">
                        {/* About Section */}
                        <div>
                            <h4 className="text-sm text-gray-900 mb-4">About</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Documentation Section */}
                        <div>
                            <h4 className="text-sm text-gray-900 mb-4">Documentation</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                        Developer Docs
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                        FAQ
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Social Section */}
                        <div>
                            <h4 className="text-sm text-gray-900 mb-4">Social</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                        X (Twitter)
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                        YouTube
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className=" border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    {/* Status Indicator */}
                    <div className="flex items-center space-x-2 border w-fit px-2 py-1 rounded-lg bg-white">
                        <div className="w-2.5 h-2.5 bg-yellow-200 border rounded-full shadow-xs"></div>
                        <span className="text-sm text-gray-600">All systems operational</span>
                    </div>
                    <div className="flex space-x-6">
                        <p className="text-sm text-gray-500 mb-4 md:mb-0">
                            © 2025 Cirkle. All rights reserved
                        </p>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                            Terms of Use
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
