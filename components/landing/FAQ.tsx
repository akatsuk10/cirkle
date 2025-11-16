import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function FAQ() {
  const faqs = [
    {
      id: "item-1",
      question: "What is Cirkle and how does it work?",
      answer: "Cirkle is a revolutionary real estate investment platform that allows you to invest in properties through digital assets. You can buy, sell, and trade real estate positions without the traditional barriers of property ownership, such as large down payments, maintenance, or geographical limitations."
    },
    {
      id: "item-2", 
      question: "How do I get started with investing on Cirkle?",
      answer: "Getting started is simple! Connect your wallet, browse available markets, and start investing with as little as $1. Our platform provides detailed market analytics, transaction history, and performance metrics to help you make informed investment decisions."
    },
    {
      id: "item-3",
      question: "What markets are available on Cirkle?",
      answer: "Cirkle offers access to major real estate markets across the United States, including Austin, Chicago, Brooklyn, San Francisco, Miami, and many more. Each market provides detailed analytics including transaction volumes, price trends, and market conditions."
    },
    {
      id: "item-4",
      question: "Is my investment secure on Cirkle?",
      answer: "Yes, security is our top priority. All transactions are secured by blockchain technology, and we maintain SOC2, HIPAA, and ISO 27001 compliance. Your investments are backed by real estate data and market performance, providing transparency and security."
    },
    {
      id: "item-5",
      question: "What fees does Cirkle charge?",
      answer: "Cirkle charges competitive transaction fees that are transparent and clearly displayed before each trade. There are no hidden fees, monthly maintenance charges, or minimum balance requirements. You only pay when you trade."
    },
    {
      id: "item-6",
      question: "Can I withdraw my investment at any time?",
      answer: "Yes, Cirkle provides liquidity that traditional real estate investments don't offer. You can buy and sell your positions at any time during market hours, giving you the flexibility to adjust your portfolio as needed."
    }
  ];

  return (
    <section className="w-full border-l border-r border-border">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8 md:py-12">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about investing in real estate through Cirkle. 
            Can't find the answer you're looking for? Contact our support team.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left text-foreground hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <Button size="lg" className="rounded-full">
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
}
