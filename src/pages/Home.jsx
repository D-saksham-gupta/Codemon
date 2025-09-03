import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900 cursor-pointer">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>
        <div className="text-center text-richblack-300 font-semibold mt-3 text-lg w-[90%]">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="flex flex-row mt-8 gap-7 font-inter">
          <CTAButton linkTo={"/about"} active={false}>
            Learn More
          </CTAButton>
          <CTAButton linkTo={"/signup"} active={true}>
            Book a Demo
          </CTAButton>
        </div>

        <div
          className="shadow-blue-200 mx-3 my-12 bg-gray-200 
    shadow-[-5px_-5px_10px_#3b82f6,5px_5px_10px_#ffffff] 
    rounded-sm"
        >
          <video className="lg:h-[500px] rounded-sm" muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1 */}

        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="lg:text-5xl text-4xl font-semibold">
                Unlock your <HighlightText text={"Coding Potential"} /> through
                our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it yourself",
              linkTo: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkTo: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1" />\n<title>React & Tailwind CSS Starter Pack</title>\n</head>\n<body>\n<noscript>You need to enable JavaScript to run this app.</noscript>\n<div id="root"></div>\n</body>\n</html>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={
              "relative rounded-md p-6 bg-[#0a0f1c] [background:linear-gradient(#0a0f1c,#0a0f1c)_padding-box,linear-gradient(to_right,#facc15,#ec4899,#a855f7)_border-box] border border-transparent shadow-[0_0_25px_rgba(255,192,203,0.4)]"
            }
          />
        </div>

        {/* Code Section 2 */}

        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="lg:text-5xl font-semibold text-4xl">
                Start <HighlightText text={"Coding In Seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkTo: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkTo: "/login",
              active: false,
            }}
            codeblock={`import React from 'react'\nconst Home = () => {\nreturn (\n<div>\nThis is the Home of Study Notion\n<button>Signup</button>\nLogin to Learn Coding\n</div>\n)}\nexport default Home`}
            codeColor={"text-richblack-100"}
            backgroundGradient={
              "bg-[#0a0f1c] border border-gray-700 rounded-md p-6 relative shadow-[0_0_25px_rgba(0,200,255,0.4)]"
            }
          />
        </div>

        <ExploreMore />
      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[333px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto">
            <div className="lg:h-[200px] h-[30px]"></div>
            <div className="gap-7 flex lg:flex-row text-white flex-col">
              <CTAButton active={true} linkTo={"/login"}>
                <div className="flex items-center gap-3">
                  Explore full catalog <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkTo={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 mx-auto max-w-[90%] flex flex-col items-center justify-between gap-7">
          <div className="flex lg:flex-row gap-5 mb-10 lg:mt-[90px] mt-[-70px] flex-col">
            <div className="lg:max-w-[60%] text-5xl font-semibold max-w-[100%]">
              Get the skills you need for a{" "}
              <HighlightText text={"Job in Demand"} />
            </div>
            <div className="flex flex-col gap-10 lg:w-[60%] w-[100%]">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true}>Learn More</CTAButton>
            </div>
          </div>
          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-11/12 max-w-maxContent items-center mx-auto flex flex-col justify-between gap-8 bg-richblack-900 text-white mt-5">
        <InstructorSection />
        <h2 className="text-center text-4xl font-semibold mt-10">
          Review from other Learners
        </h2>

        {/* Review Slider  */}
      </div>

      {/* Footer  */}
      <Footer />
    </div>
  );
};

export default Home;
