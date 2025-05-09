
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">AI Productivity Hub</h3>
            <p className="text-gray-300 text-sm">
              Your trusted resource for discovering the best AI tools to enhance productivity, 
              streamline workflows, and boost efficiency.
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-gray-300 hover:text-primary text-sm transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-primary text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-primary text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-gray-300 hover:text-primary text-sm transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {currentYear} AI Productivity Hub. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="mailto:contact@aiproductivityhub.com" className="text-sm text-gray-400 hover:text-primary transition-colors">
              contact@aiproductivityhub.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
