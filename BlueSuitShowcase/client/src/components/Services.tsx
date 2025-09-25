export default function Services() {
  const services = [
    {
      icon: "fas fa-code",
      title: "Software Development",
      description: "Full-stack development using modern technologies including Python, Java, HTML, CSS, and JavaScript.",
      bgColor: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      icon: "fas fa-tools",
      title: "IT Support",
      description: "Technical support, system troubleshooting, network management, and IT infrastructure planning.",
      bgColor: "bg-secondary/10",
      iconColor: "text-secondary"
    },
    {
      icon: "fas fa-palette",
      title: "Graphic Design",
      description: "Creative design solutions including UI/UX design, branding, packaging, and digital graphics.",
      bgColor: "bg-accent/10",
      iconColor: "text-accent"
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="text-services-title">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg">What I offer to help bring your ideas to life</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-colors"
              data-testid={`card-service-${index}`}
            >
              <div className={`w-16 h-16 ${service.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                <i className={`${service.icon} ${service.iconColor} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
