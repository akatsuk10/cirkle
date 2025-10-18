import { Check } from "lucide-react";

export default function Features() {
  return (
    <div className="max-w-[1200px] mx-auto py-16 border-l border-r relative">
      <div className="overflow-hidden border-y py-8 lg:px-6 relative">
        {/* Corner decorations */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-white border flex items-center justify-center z-10"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-white border flex items-center justify-center z-10"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-white border flex items-center justify-center z-10"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-white border flex items-center justify-center z-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
          {/* Individuals - Free */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col">
            <div className="h-48">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Individuals</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">Free</span>
                </div>
                <p className="text-sm text-gray-600">Good for individuals who are just starting out and simply want the essentials.</p>
              </div>
            </div>
            
            <div className="mt-auto">
              <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors mb-6">
                Get started →
              </button>
              
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-900 mb-3">Free, forever</p>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">1 user</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">Unlimited calendars</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">Unlimited event types</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">Workflows</span>
                </div>
              </div>
            </div>
          </div>

          {/* Teams - $15 (Featured) */}
          <div className="bg-gray-900 text-white border border-gray-900 rounded-2xl p-6 relative flex flex-col">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-gray-700 text-white text-xs px-3 py-1 rounded-full">14 day free trial</span>
            </div>
            
            <div className="h-48">
              <div className="mb-6 pt-4">
                <h3 className="text-lg font-semibold mb-2">Teams</h3>
                <div className="mb-1">
                  <span className="text-sm text-gray-300">Starts at</span>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$15</span>
                  <span className="text-sm text-gray-300 ml-1">per month/user</span>
                </div>
                <p className="text-sm text-gray-300">Highly recommended for small teams who seek to upgrade their time and perform better as a unit.</p>
              </div>
            </div>
            
            <div className="mt-auto">
              <button className="w-full bg-white text-gray-900 py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors mb-6">
                Get started →
              </button>
              
              <div className="space-y-3">
                <p className="text-sm font-semibold mb-3">Free plan features, plus:</p>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">1 team</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Schedule meetings as a team</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Round-robin, fixed round-robin</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Collective events</span>
                </div>
              </div>
            </div>
          </div>

          {/* Organizations - $37 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col">
            <div className="h-48">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Organizations</h3>
                <div className="mb-1">
                  <span className="text-sm text-gray-500">Starts at</span>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">$37</span>
                  <span className="text-sm text-gray-500 ml-1">per month/user</span>
                </div>
                <p className="text-sm text-gray-600">Robust scheduling for larger teams looking to have more control, privacy, and security.</p>
              </div>
            </div>
            
            <div className="mt-auto">
              <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors mb-6">
                Get started →
              </button>
              
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-900 mb-3">Teams plan features, plus:</p>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">1 parent team and unlimited sub-teams</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">Organization workflows</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">Yourcompany.cal.com subdomain</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">SOC2, HIPAA, ISO 27001 compliance check</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enterprise - Contact us */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col">
            <div className="h-48">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">Contact us</span>
                </div>
                <p className="text-sm text-gray-600">The most advanced scheduling and routing solution for large enterprise organizations.</p>
              </div>
            </div>
            
            <div className="mt-auto">
              <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors mb-6">
                Get a Quote →
              </button>
              
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-900 mb-3">Organizations plan features plus:</p>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">Dedicated Database</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">Active directory sync</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">Sync your HRIS tools</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">Advanced routing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
