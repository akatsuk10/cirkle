import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <div className="max-w-[1200px] mx-auto pt-8 border-l border-r relative">
      <div className="overflow-hidden bg-white border-t py-8 lg:px-6 relative">
        {/* Corner decorations */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-white border flex items-center justify-center z-10"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-white border flex items-center justify-center z-10"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-white border flex items-center justify-center z-10"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-white border flex items-center justify-center z-10"></div>

        <div className="px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about investing in real estate through Cirkle. 
              Can't find the answer you're looking for? Contact our support team.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-gray-200 py-2">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#065F46] transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <button className="bg-[#065F46] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#065F46]/80 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
