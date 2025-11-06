import profileImage from "@assets/IMG_20231127_002204_012_1758821976384.jpg";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="text-contact-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg">Let's discuss your next project or collaboration</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div>
            <div className="mb-8 flex justify-center md:justify-start">
              <div className="gradient-border profile-glow">
                <img 
                  src={profileImage} 
                  alt="Nelson Ishmael Chinyere in blue suit" 
                  className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-full"
                  data-testid="img-profile"
                />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-8">Let's work together</h3>
            <div className="space-y-6">
              <div className="flex items-center" data-testid="contact-location">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-map-marker-alt text-primary"></i>
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-muted-foreground">Lusaka, Zambia</p>
                </div>
              </div>
              
              <div className="flex items-center" data-testid="contact-email">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-envelope text-secondary"></i>
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a 
                    href="mailto:nellishie32@gmail.com" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                    data-testid="link-email"
                  >
                    nellishie32@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center" data-testid="contact-phone">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-phone text-accent"></i>
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <a 
                    href="tel:+260772752623" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                    data-testid="link-phone"
                  >
                    +260772752623
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-medium mb-4">Follow me on social media</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://wa.me/260772752623" 
                  className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500 hover:bg-green-500/20 transition-colors"
                  data-testid="social-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                </a>
                <a 
                  href="https://github.com/nellishie" 
                  className="w-12 h-12 bg-gray-500/10 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-500/20 transition-colors"
                  data-testid="social-github"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a 
                  href="https://linkedin.com/in/nelson-chinyere-45150a336" 
                  className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 hover:bg-blue-500/20 transition-colors"
                  data-testid="social-linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
