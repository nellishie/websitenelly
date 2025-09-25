export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="text-about-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto" data-testid="text-about-intro">
            I'm a passionate Software Engineering student with hands-on experience in IT support and graphic design. 
            Currently pursuing my Bachelor's Degree at ZCAS University, I specialize in creating innovative 
            technological solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Professional Summary</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed" data-testid="text-professional-summary">
              Enthusiastic and detail-oriented Software Engineering student with hands-on experience in IT support 
              and graphic design. Skilled in programming, web development, networking, and IT project management. 
              Passionate about leveraging technology to solve problems and currently pursuing a Bachelor's Degree 
              in Software Engineering.
            </p>
            <div className="space-y-3">
              <div className="flex items-center" data-testid="text-location">
                <i className="fas fa-map-marker-alt text-primary mr-3"></i>
                <span>Lusaka, Zambia</span>
              </div>
              <div className="flex items-center" data-testid="text-email">
                <i className="fas fa-envelope text-primary mr-3"></i>
                <span>nellishie32@gmail.com</span>
              </div>
              <div className="flex items-center" data-testid="text-phone">
                <i className="fas fa-phone text-primary mr-3"></i>
                <span>+260772752623</span>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-xl border border-border">
            <h3 className="text-2xl font-semibold mb-6">Languages</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">English</span>
                  <span className="text-muted-foreground">Upper Intermediate (B2)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Shona</span>
                  <span className="text-muted-foreground">Advanced (C1)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{width: '95%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
