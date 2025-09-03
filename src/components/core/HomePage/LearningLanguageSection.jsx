import React from "react";
import HighlightText from "./HighlightText";
import kyp from "../../../assets/Images/Know_your_progress.svg";
import cwo from "../../../assets/Images/Compare_with_others.png";
import pyl from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./CTAButton";

const LearningLanguageSection = () => {
  return (
    <div className="mt-[120px] mb-[40px]">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-4xl font-semibold items-center text-center mx-auto">
          Your Swiss Knife for <HighlightText text={"Learning any Language"} />
        </div>
        <div className="text-center text-richblack-600 mx-auto text-base font-medium lg:w-[70%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className="flex lg:flex-row items-center justify-center mt-5 flex-col">
          <img className="object-contain lg:-mr-28" src={kyp} alt="" />
          <img className="object-contain" src={cwo} alt="" />
          <img className="object-contain lg:-ml-36" src={pyl} alt="" />
        </div>
        <div className="w-fit">
          <CTAButton active={true}>Connect Now</CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
