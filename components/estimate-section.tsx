export default function EstimateSection() {
  return (
    <section id="estimate-section" className="w-full py-16 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="mb-6 relative lg:mx-20 mx-auto">
          <div className="absolute right-0 -top-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.5 9H22L16 14L18.5 21L12 17L5.5 21L8 14L2 9H9.5L12 2Z" fill="#FFD700" />
              <circle cx="18" cy="6" r="1.5" fill="#FFD700" />
            </svg>
          </div>
          <h2 className="text-[42px] font-bold text-gray-800">
            Estimate your{" "}
            <br />
            <span
              className="inline-block relative px-4 py-1 rounded-r-md"
              style={{
                color: "#424bd1",
                background: "linear-gradient(90deg, rgba(66, 75, 209, 0.23), rgba(66, 75, 209, 0.05))",
              }}
            >
              <span className="relative z-10">monthly cost</span>
              <span
                className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-md"
                style={{ backgroundColor: "#424bd1" }}
              ></span>
            </span>
          </h2>
          <p className="text-[#3d3d3d] text-[20px] mt-4">
            Enter your estimated monthly usage, and we'll provide <br /> a plan that best suits your needs
          </p>
        </div>

        {/* Calculator form would be implemented here */}
      </div>
    </section>
  )
}

