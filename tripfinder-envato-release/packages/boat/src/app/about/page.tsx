import React from 'react'
import Footer from '@/components/footer/footer'

const page = () => {
  return (
    <div className='bg-no-repeat'>
      <div className='h-96'>
        <img src="/images/about/about.jpeg" className='w-full h-full object-cover' alt="" />
      </div>
      <div className='max-w-[1440px] mx-auto mb-20' >
        <div className='pt-20'>
          <div className='bg-white'>
            <div>
              <p className='text-center font-bold text-3xl text-black my-2'>About Us</p>
              <p className='text-center font-bold text-xl text-black my-2'>Our vision</p>
            </div>
            <p className='text-black text-2xl'>
              We are thrilled to have the opportunity to share our passion for luxury and the sea with you. At Voyarent.com, we are committed to providing exceptional service and ensuring that your adventure with us is nothing short of extraordinary.  Our team's unwavering vision is to revolutionize the booking process, making it easier and safer than ever before. Navigating the world of yacht rentals can be overwhelming, but with Voyarent, you'll have a trustworthy companion by your side every step of the way. We always strive to provide an exceptional experience that surpasses all expectations. We understand that each customer is unique, We take pride in crafting personalized experiences that create memories to last a lifetime From the moment you embark on your adventure with us, our dedication and attention to detail will be evident in every aspect of our business. Whether you are seeking a peaceful and scenic boat tour or an extravagant yacht charter, we are here to cater to your every need. Our knowledgeable and friendly team of experts is ready to assist you in planning the perfect trip that suits your desires.  Don't wait any longer! Call us now and let the excitement begin.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  )
}

export default page