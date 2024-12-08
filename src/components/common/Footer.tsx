import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router";

const footerLinks = {
  Services: [
    "Web development",
    "E-commerce applications",
    "Mobile app development",
  ],
  Company: ["About", "Brands", "Contact"],
  Legal: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
};

const Footer = () => {
  return (
    <footer className='bg-secondary/20'>
      <div className='container mx-auto px-4 pt-12'>
        <div className='text-center mb-8'>
          <h2 className='text-2xl font-bold'>Chill Gamer</h2>
          <p className='text-gray-400 mt-2'>A Game Review Application.</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto'>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className='font-semibold text-lg mb-4'>{title}</h3>
              <ul className='space-y-2'>
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to='/'
                      className='text-gray-400 hover:text-primary transition-colors'
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 py-6 mt-8 border-t-2 border-[#9f009f]'>
          <p>© Chill-Gamer 2024</p>
          <div className='flex gap-2 text-primary'>
            <Link to='https://www.facebook.com/aliakbor28924'>
              <Facebook />
            </Link>
            <Link to='https://github.com/aliakbordev'>
              <Github />
            </Link>
            <Link to='https://www.linkedin.com/aliakbordev/'>
              <Linkedin />
            </Link>
            <Link to='https://x.com/aliakbordev'>
              <Twitter />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
