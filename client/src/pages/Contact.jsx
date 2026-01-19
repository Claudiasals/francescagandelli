import { PhoneCall, EnvelopeOpen } from "phosphor-react";

const Contact = () => {
    return (
      <section class="contact-section p-8 max-w-3xl mx-auto">
      <h2 class="text-3xl font-bold mb-6 text-center">Contatti</h2>
    
    
      <div class="flex flex-col md:flex-row justify-center items-start md:items-center gap-6 mt-6">
        <div class="flex items-center gap-3">
        <PhoneCall size={32} color="#8CA576" />
          <a href="mailto:francescag.photographer@gmail.com" class="text-lg hover:underline">
            francescagandelli.photographer@gmail.com
          </a>
        </div>
    
        <div class="flex items-center gap-3">
        <EnvelopeOpen size={32} color="#8CA576" />
          <a href="tel:+393466106008" class="text-lg hover:underline">
            +39 346 610 6008
          </a>
        </div>
      </div>
  
    </section>
    
    );
  };
  
  export default Contact; 