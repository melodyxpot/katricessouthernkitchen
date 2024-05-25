import React from 'react'
import Section from '../_components/section'
import SubTitle from '../_components/subtitle'
import Image from 'next/image'
import AboutUsImage from '@/assets/img/service_img.png';

export default function page() {
  return (
    <Section className='flex-col pt-32'>
      <SubTitle className="text-left">About Us</SubTitle>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 w-full'>
        <Image width={800} height={800} src={AboutUsImage} alt='about us' />
        <div className='flex flex-col justify-center'>
          <p>Rich in family history all recipes were passed down from my Grandmother.</p>
          <p>She inspired my love of cooking for family and friends.</p>
          <p>We consider our customers family so your food is always made with the best ingredients and love.  We provide great service and affordable prices for big or small events.</p>
        </div>
      </div>
    </Section>
  )
}
