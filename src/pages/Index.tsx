
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/ui/header";
import { Plane, Shield, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      {/* Header */}
    <Header username="Manager"/>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-[#3b3b3b] mb-6">
            Streamline Your Corporate Travel Management
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Empower managers to efficiently handle travel requests, track spending, and manage employee bookings with our comprehensive dashboard solution.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-[#8C6D73] hover:bg-[#8C6D73]/90 text-white px-8 py-3 text-lg">
              Launch Manager Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-[#8C6D73] mb-4">
              Complete Travel Management Solution
            </h3>
            <p className="text-lg text-gray-600">
              Everything you need to manage corporate travel efficiently
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-[#8C6D73] bg-opacity-10 rounded-full w-fit">
                  <Shield className="h-8 w-8 text-[#8C6D73]" />
                </div>
                <CardTitle className="text-[#8C6D73]">Request Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Review, approve, reject, or modify employee travel requests with detailed workflow management.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-[#8C6D73] bg-opacity-10 rounded-full w-fit">
                  <BarChart3 className="h-8 w-8 text-[#8C6D73]" />
                </div>
                <CardTitle className="text-[#8C6D73]">Spending Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Track total spending with interactive charts and comprehensive analytics for better budget control.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-[#8C6D73] bg-opacity-10 rounded-full w-fit">
                  <Users className="h-8 w-8 text-[#8C6D73]" />
                </div>
                <CardTitle className="text-[#8C6D73]">Employee Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Filter and manage employees, view their travel history, and track individual spending patterns.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-[#8C6D73] bg-opacity-10 rounded-full w-fit">
                  <Plane className="h-8 w-8 text-[#8C6D73]" />
                </div>
                <CardTitle className="text-[#8C6D73]">Quick Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Create bookings for yourself or employees with streamlined forms and instant confirmation.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-[#e5e5e5]">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-[#3b3b3b] mb-4">
            Ready to Transform Your Travel Management?
          </h3>
          <p className="text-xl text-[#6c6c6c] mb-8">
            Join thousands of managers who trust TSL Corporate Travel for their business travel needs.
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg bg-[#8C6D73] text-white hover:bg-[#8C6D73]/90">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 px-6 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">
            © 2024 TSL Corporate Travel. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
