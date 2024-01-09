'use client';

import Text from '@/components/ui/typography/text';

export default function AboutUs() {
    return (
      <div className="container-fluid w-full !max-w-[1248px] pt-12 lg:pt-20 2xl:pb-8 3xl:px-0 3xl:pt-24">
        <div className="text-center">
        <Text tag="h2" className="text-xl md:!text-2xl xl:!text-3xl">
            ABOUT US
        </Text>
        <br></br>
        <Text tag="h2" className="text-xl md:!text-2xl xl:!text-1xl">
        Our vision
        </Text>
          <Text className="mt-2 text-sm lg:mt-3">
          Welcome to Voyarent.com!
          <br></br>
          Your ultimate destination for boat tours and yacht charters!
          </Text>
        </div>
        <br></br>
        <br></br>
        <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-2 md:grid-cols-2">
        <div className='flex justify-center items-center pt-12'>
        <img src="/images/About-banner.jpeg" className='w-full h-full object-cover' alt="" />
        </div>
        <div className="text-center">
          <Text className="mt-2 text-sm lg:mt-3">
          We are thrilled to have the opportunity to share our passion for luxury and the sea with you. At Voyarent.com, we are committed to providing exceptional service and ensuring that your adventure with us is nothing short of extraordinary.  Our team's unwavering vision is to revolutionize the booking process, making it easier and safer than ever before. Navigating the world of yacht rentals can be overwhelming, but with Voyarent, you'll have a trustworthy companion by your side every step of the way. We always strive to provide an exceptional experience that surpasses all expectations. We understand that each customer is unique, We take pride in crafting personalized experiences that create memories to last a lifetime From the moment you embark on your adventure with us, our dedication and attention to detail will be evident in every aspect of our business. Whether you are seeking a peaceful and scenic boat tour or an extravagant yacht charter, we are here to cater to your every need. Our knowledgeable and friendly team of experts is ready to assist you in planning the perfect trip that suits your desires.  Don't wait any longer! Call us now and let the excitement begin.
          </Text>
        </div>
        </div>
        </div>


  );
}
