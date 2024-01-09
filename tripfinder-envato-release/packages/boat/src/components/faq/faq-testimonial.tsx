'use client';

import Text from '@/components/ui/typography/text';
import Accordion from '@/components/ui/accordion';

const data = [
  {
    title: 'How can I register my boat?',
    text: '',
  },
  {
    title: 'How do I register the day cruises I offer on Voyarent.com? ',
    text: 'The cruise industry is a different axis of maritime tourism from yachting. As a different sector, it also has different requirements for cruise registration. This is why we place the cruise in the special place it deserves. To better promote your business, we separate the cruise listing from the Yachting listing. This is the easiest way for the visitor to find the services he is looking for. Select the Cruises for a more targeted view of your cruise services. Register your cruise depending on the type of cruise you offer. To register you need to follow a few simple and understandable steps with the instructions given to you.',
  },
  {
    title: 'Can I add my cruise to the yachting menu?',
    text: 'Yes you can, there is no limitation. Many owners combine these two services Yachting - Cruise. Double the chances to be seen by travelers who will pay attention to you due to you offer this kind of services.'
   },
  {
    title: 'What is Open Date Booking?',
    text: 'Now you can plan your vacation in time. If your plans change you have the option (for one time only) to change your travel dates without cancellation fees. when choosing the Open Date Booking There is no need to worry. Up to 31 days before the start of your trip and for a period of 18 months from the time of your initial booking you can change your booking date. The reservation change will be made according to the availability on board at the time of the change. The service is optional for owners and travelers. Valid with an additional charge of 8% charged and collected by the owner on the total amount of the reservation deducted from the supply services. '},
  {
    title: 'Are boat holidays affordable?',
    text: 'The cost of a boat trip is proportional to that of a traditional hotel stay and it always depends on the type, features and equipment of the boat, as well as the facilities and additional services offered.'
  },
  {
    title: 'What is the cost of renting a boat?',
    text: 'The cost of renting a boat starts from around 50€ per day and it is adjusted depending on the boat type, the accommodation features and the extra services offered. The final amount depends on the duration of the trip, the time period, the number of passengers as well as any additional expenses for the boat trip.',
  },
  {
    title: 'Can I rent a boat while I have no navigation experience?',
    text: 'If you do not have the experience to pilot a boat, select a crewed charter with a captain or even with a permanent crew. Thus, you will not be in charge of the boat and the passengers. A captain will be by your side 24 hours a day to take you to the best destinations while you enjoy your vacation carefree. Also, in this case you pay less or even zero guarantee.',
  },
  {
    title: 'Can I rent a boat without a captain?',
    text: 'Of course you can. If you are given the option of renting a boat without a captain, you should send the boat owner the necessary documents requested. These will prove your ability to pilot the boat. These documents usually consist of a captains license and a marine resume or some certificate of competency. However, the documents that will be requested are at the discretion of the boat owner. In case of renting a boat without a captain, you will be responsible for the boat and the passengers in the ports and at sea, up until your return to the base to hand the boat over. You will also pay a financial guarantee for any damage, on your behalf, which will be refunded after the inspection and delivery of the boat.',
  },
  {
    title: 'What documents are required before boarding?',
    text: 'If the voyage is appointed with a crew, a charter agreement (official document in 5 copies) is usually co-signed between the parties. You will also need to show your ID or passport. If you decide to cruise without a crew, you will need to provide additional documents that will be requested by the boat owner. These documents usually consist of a captains license and a marine resume or a certificate of competency. However, the documents that will be requested are at the discretion of the boats owner.',
  },
  {
    title: 'What are the charter agreement and the inventory form?',
    text: 'Charter agreement is the lease contract that sets out all the details of the boat rental negotiation. The inventory form describes the equipment and supplies included on board upon delivery. Both are signed by those involved (owner and client) before boarding and handing over the keys.',
  },
  {
    title: 'What is not usually included in the basic charter cost of a boat?',
    text: 'Read the terms of the charter carefully. Usually, the basic costs do not include the crew fees and food consumption, fuel, water consumption, extra equipment, boat cleaning, food supplies (usually there is a list), the one-way route, mooring fees (except for the port of departure), trip cancellation insurance due to bad weather or other additional service charges.' 
  },
  {
    title: 'What is a boat warranty?',
    text: 'During the voyage there may be material damage, losses or additional costs that will arise and may not be covered by the boat insurance. The amount of the guarantee depends on the boat. It is set by the owner and it is paid in advance by the traveler before departure. The guarantee is returned to the traveler upon return and after inspection of the boat. The payment method is agreed with the owner.' 
  },
  {
    title: 'What do I need to take with me on the boat trip?',
    text: 'In addition to clothes and accessories you would take for your summer vacation, we advise you use a windproof jacket and flat shoes with good traction for your time spent on the boat. Although you will not need a lot of clothes, it is good to have clothes for your night entertainment in the tourist resorts on land.'
  }
];

export default function FAQTestimonial() {
  return (
    <div className="container-fluid w-full !max-w-[1248px] pt-12 lg:pt-20 2xl:pb-8 3xl:px-0 3xl:pt-24">
      <div className="text-center">
        <Text tag="h2" className="text-xl md:!text-2xl xl:!text-3xl">
          Frequently asked questions
        </Text>
        <Text className="mt-2 text-sm lg:mt-3">
          Everything you need to know about <br className="lg:hidden" /> the
          product and billing
        </Text>
      </div>
      <div className="mt-8 lg:mt-12 2xl:mt-16">
        {data.map((item) => (
          <Accordion key={item.title} title={item.title} text={item.text} />
        ))}
      </div>
    </div>
  );
}
