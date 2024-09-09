import Image from 'next/image'
import React from 'react'

function AboutMogo() {
  return (
    <>
      <Image
        className='w-full my-1 sm:my-6'
        alt="mission banner"
        src="/images/mission.jpg"
        width={1920}
        height={523}
      />
      <div className='flex justify-center w-full my-6 md:my-12'>
        <div className='w-[96%] sm:w-[90%] md:w=[90%] space-y-8 text-justify text-sm sm:text-base md:text-lg'>
          <p>
            At the Museum of Go (MoGO), our mission is to
            perpetuate and celebrate the timeless legacy of
            Go. It not only enhances individual intellectual
            capacity and fosters international friendship and
            exchange but also accelerates the development
            of artificial intelligence technology.
          </p>
          <p>
            MoGo is the first Go museum in the Western
            world. We are committed to preserving and
            sharing the rich history, strategies,
            development, and significance of Go, aiming
            to leave behind a valuable cultural heritage
            for generations to come.
          </p>
        </div>
      </div>
    </>
  )
}

export default AboutMogo
