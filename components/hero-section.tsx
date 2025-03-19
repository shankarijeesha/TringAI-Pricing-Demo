export default function HeroSection() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4 text-center pt-5">
        <div className="mb-6 inline-flex items-center relative">
          <div className="mr-3 absolute lg:top-[-40px] top-[-50px] left-0">
               <img src="/Star-Blue.svg" alt="star" />
          </div>
          <h1 className="text-[30px] lg:text-[42px] font-bold text-[#3d3d3d]">
            Designed for your Business;{" "}
            <span
              className="inline-block relative px-4 py-1 rounded-r-md"
              style={{
                color: "#424bd1",
                background: "linear-gradient(90deg, rgba(66, 75, 209, 0.23), rgba(66, 75, 209, 0.05))",
              }}
            >
              <span className="relative z-10 w-full">Priced to Fit your Budget</span>
              <span
                className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-md"
                style={{ backgroundColor: "#424bd1" }}
              ></span>
            </span>
          </h1>
        </div>
        <p className="text-[#3d3d3d] text-[20px] mx-auto">
          Tring AI is highly budget-friendly, perfectly suited to meet your needs. Choose the plan that you desire the
          most!
        </p>
      </div>
    </section>
  )
}

