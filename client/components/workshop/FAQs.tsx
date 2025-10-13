import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function WorkshopFAQs() {
  return (
    <section className="py-16 bg-gradient-to-b from-vlsi-50/40 to-white">
      <div className="container max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900 text-center mb-10">FAQs</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="format">
            <AccordionTrigger>Is this online or offline? Any prerequisites?</AccordionTrigger>
            <AccordionContent>
              The session is conducted live online. Basic digital design knowledge helps, but we’ll cover fundamentals as we go.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="security">
            <AccordionTrigger>Is my payment secure?</AccordionTrigger>
            <AccordionContent>
              Yes. We use a secure payment gateway for card/UPI transactions and do not store sensitive card information on our servers.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="refunds">
            <AccordionTrigger>What about cancellations or refunds?</AccordionTrigger>
            <AccordionContent>
              Please refer to our Cancellation/Refund Policy for details. If you miss the session, you get 48-hour recording access.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="after">
            <AccordionTrigger>What happens after I book?</AccordionTrigger>
            <AccordionContent>
              You’ll receive a confirmation email with the workshop link. We’ll send reminders before the session and share resources & the recording (48 hours) after.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
