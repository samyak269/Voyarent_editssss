import SubscriptionBlock from "@/components/subscription/subscription-block";
import FAQTestimonial from "@/components/faq/faq-testimonial";


export default function page() {
    return (
      <div>
        <FAQTestimonial/>
        <SubscriptionBlock sectionClassName="4xl:!px-16" />
      </div>
    );
  }