import React from 'react'

function PortalGuide() {
  return (
    <div>

<section id="works" className="relative  py-10 sm:py-16 lg:py-24 font">
  <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-4xl text-dark font-extrabold mx-auto md:text-6xl lg:text-5xl">How does it work?</h2>
      <p className="max-w-2xl mx-auto mt-4 text-base text-dark leading-relaxed md:text-2xl">
        Our Application will help you from start to finish
      </p>
    </div>
    <div className="relative mt-12 lg:mt-20">
    <div className="absolute inset-x-0 hidden md:block top-2">
  <img 
    alt="Curved Dotted Line" 
    loading="lazy" 
    width="1000" 
    height="500" 
    decoding="async" 
    className="w-full max-w-4xl mx-auto" 
    style={{
      filter: 'invert(93%) sepia(100%) saturate(500%) hue-rotate(0deg) brightness(100%) contrast(100%)',
      opacity: 0.9,
    }}
    src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" 
  />
</div>

      <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
        <div>
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-green-700 rounded-full shadow">
            <span className="text-xl font-semibold text-gray-700">1</span>
          </div>
          <h3 className="mt-6 text-xl text-dark font-semibold leading-tight md:mt-10">Create an Account & Log In</h3>
          <p className="mt-4 text-base text-gray-600 md:text-lg">
          Create an account and log in with your credentials to access your dashboard, giving you a seamless and professional job application experience..
          </p>
        </div>
        <div>
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-green-700 rounded-full shadow">
            <span className="text-xl font-semibold text-gray-700">2</span>
          </div>
          <h3 className="mt-6 text-xl font-semibold leading-tight text-dark md:mt-10">
          Complete Your Profile
</h3>
<p className="mt-4 text-base text-gray-600 md:text-lg">
 Navigate to the Profile section and fill  all the required details and information.Keeping your profile updated ensures a smooth and successful job application process.
</p>


        </div>
        <div>
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-green-700 rounded-full shadow">
            <span className="text-xl font-semibold text-gray-700">3</span>
          </div>
          <h3 className="mt-6 text-xl text-dark font-semibold leading-tight md:mt-10">
          Explore & Apply for Jobs
</h3>
<p className="mt-4 text-base text-gray-600 md:text-lg">
Browse the latest job openings and apply for positions that match your expertise. You can track the status of your applications directly from your dashboard, ensuring you stay informed.
</p>


        </div>
      </div>
    </div>
  </div>
  <div 
    className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg" 
    style={{
      background: "radial-gradient(1.89deg, rgba(34, 78, 95, 0.4) -1000%, rgba(191, 227, 205, 0.26) 1500.74%, rgba(34, 140, 165, 0.41) 56.49%, rgba(28, 47, 99, 0.11) 1150.91%)"
    }} 
  />
</section>

    </div>
  )
}

export default PortalGuide