import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const TimelineSection = () => {
  const timeline = [
    {
      Logo: Logo1,
      heading: "Leadership",
      description: "Fully commited to the success company",
    },
    {
      Logo: Logo2,
      heading: "Responsibility",
      description: "Students will always be our top Priority",
    },
    {
      Logo: Logo3,
      heading: "Flexibility",
      description: "The ability to switch is an important skill",
    },
    {
      Logo: Logo4,
      heading: "Solve Your Problem",
      description: "Code your way to a Solution",
    },
  ];
  return (
    <div>
      <div className="flex lg:flex-row gap-15 items-center flex-col">
        <div className="lg:w-[55%] flex flex-col gap-5 w-[100%]">
          {timeline.map((element, index) => {
            return (
              <div className="flex flex-row gap-5 my-4" key={index}>
                <div className="w-[50px] h-[50px] flex items-center">
                  <img src={element.Logo} alt="" />
                </div>
                <div>
                  <h2 className="font-semibold text-[22px]">
                    {element.heading}
                  </h2>
                  <p className="text-base">{element.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* Right Section */}
        <div
          className="relative shadow-blue-200 mx-3 my-12 bg-gray-200 
    shadow-[-5px_-5px_10px_#3b82f6,5px_5px_10px_#ffffff] 
    rounded-full"
        >
          <img
            src={timelineImage}
            alt=""
            className="shadow-white object-cover h-fit rounded-md"
          />
          <div className="absolute text-white uppercase bg-caribbeangreen-700 flex flex-row py-7 px-4 left-[50%] translate-x-[-50%] lg:translate-y-[-50%] translate-y-[-10%]">
            <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-200 px-7">
              <p className="text-3xl font-bold">10+</p>
              <p className="text-caribbeangreen-100 text-sm">
                Years of Experience
              </p>
            </div>

            <div className="flex gap-5 items-center px-7">
              <p className="text-3xl font-bold">100+</p>
              <p className="text-caribbeangreen-100 text-sm">
                Types of Courses
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
