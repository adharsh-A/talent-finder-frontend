
const Footer = () => {
  return (
<footer className="p-10 mt-20 bg-black bottom-0 text-white w-full h-auto md:h-24 py-4 md:py-0 px-4 md:px-8">
  <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
    
    {/* Left Side - Branding and Description */}
    <div className="flex flex-col md:w-1/2">
      <h1 className="font-bold text-2xl md:text-3xl">Talent Finder</h1>
      <p className="text-sm md:text-base my-2">
        A web application that helps you discover and connect with talented individuals in your area.
      </p>
      <p className="text-sm md:text-base my-2 text-zinc-400 dark:text-zinc-500 ">
        &copy; 2023 Talent Finder. All rights reserved.
      </p>
    </div>

    {/* Right Side - Social Links */}
    <div className="flex flex-col md:w-1/2 md:items-end">
  <div className="flex space-x-4 my-2">
    <a href="https://github.com/adharsh-A" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-current text-white" viewBox="0 0 24 24">
        <path d="M12 0a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2.16c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.76.08-.75.08-.75 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.32 3.53 1.01.11-.78.42-1.32.76-1.62-2.67-.31-5.47-1.34-5.47-5.97 0-1.32.47-2.39 1.25-3.24-.13-.31-.54-1.55.12-3.23 0 0 1.01-.32 3.3 1.24a11.5 11.5 0 016.02 0c2.3-1.56 3.31-1.24 3.31-1.24.67 1.68.26 2.92.13 3.23.78.85 1.25 1.92 1.25 3.24 0 4.64-2.8 5.66-5.48 5.97.43.37.81 1.11.81 2.25v3.34c0 .32.22.68.83.58A12 12 0 0012 0z" />
      </svg>
    </a>

    <a href="https://www.linkedin.com/in/adharsh-boddul-6847a3235/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-current text-white" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.334 20h-3v-10h3v10zm-1.5-11.568c-.966 0-1.5-.727-1.5-1.434 0-.725.548-1.434 1.531-1.434.966 0 1.5.709 1.5 1.434 0 .707-.548 1.434-1.531 1.434zm12.5 11.568h-3v-5.488c0-1.357-.487-2.285-1.703-2.285-.928 0-1.484.625-1.728 1.229-.089.211-.111.508-.111.803v5.741h-3v-10h3v1.361c.387-.596 1.028-1.44 2.498-1.44 1.817 0 3.045 1.194 3.045 3.762v6.317z" />
      </svg>
    </a>
  </div>
</div>

  </div>
</footer>


  )
};

export default Footer;
