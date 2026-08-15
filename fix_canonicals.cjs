const fs = require('fs');
const path = require('path');

const files = [
  { path: 'src/pages/ErrorDetail.jsx', find: '<SEO title="Error Not Found | ErrorFix Pro" />', replace: '<SEO title="Error Not Found | ErrorFix Pro" canonical="https://errorfixerpro.co.uk/errors" />' },
  { path: 'src/pages/ContactUs.jsx', find: '<SEO title="Contact Us | ErrorFix Pro" description="Get in touch with the ErrorFix Pro team for support, business inquiries, or feedback." />', replace: '<SEO title="Contact Us | ErrorFix Pro" description="Get in touch with the ErrorFix Pro team for support, business inquiries, or feedback." canonical="https://errorfixerpro.co.uk/contact" />' },
  { path: 'src/pages/AboutUs.jsx', find: '<SEO title="About Us | ErrorFix Pro" description="Learn more about ErrorFix Pro, our methodology, and the team behind the ultimate Windows diagnostic companion." />', replace: '<SEO title="About Us | ErrorFix Pro" description="Learn more about ErrorFix Pro, our methodology, and the team behind the ultimate Windows diagnostic companion." canonical="https://errorfixerpro.co.uk/about" />' },
  { path: 'src/pages/Scanner.jsx', find: '<SEO title="System Diagnostics | ErrorFix Pro" description="Run real-time browser-based diagnostics to analyze CPU, memory, and network performance." />', replace: '<SEO title="System Diagnostics | ErrorFix Pro" description="Run real-time browser-based diagnostics to analyze CPU, memory, and network performance." canonical="https://errorfixerpro.co.uk/scanner" />' },
  { path: 'src/pages/PrivacyPolicy.jsx', find: '<SEO title="Privacy Policy | ErrorFix Pro" description="Read the ErrorFix Pro Privacy Policy to understand how we manage cookies, ad networks, and protect your data." />', replace: '<SEO title="Privacy Policy | ErrorFix Pro" description="Read the ErrorFix Pro Privacy Policy to understand how we manage cookies, ad networks, and protect your data." canonical="https://errorfixerpro.co.uk/privacy" />' },
  { path: 'src/pages/NotFound.jsx', find: '<SEO title="404 - Page Not Found | ErrorFix Pro" />', replace: '<SEO title="404 - Page Not Found | ErrorFix Pro" canonical="https://errorfixerpro.co.uk" />' }
];

files.forEach(f => {
  const p = path.join(__dirname, f.path);
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, 'utf8');
    fs.writeFileSync(p, content.replace(f.find, f.replace), 'utf8');
  }
});

