"use client";
import { sliderProps } from "@/utility/sliderprops";
import Slider from "react-slick";

const Client = () => {
  return (
    <Slider {...sliderProps.client} className="client-logo-active">
      <div
        className="client-logo-item"
        data-aos="flip-up"
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <a href="#">
          <img
            src="assets/images/client-logos/client-logo1.png"
            alt="Client Logo"
          />
        </a>
      </div>
      <div
        className="client-logo-item"
        data-aos="flip-up"
        data-aos-delay={50}
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <a href="#">
          <img src="assets/images/supported/ambengan.png" alt="Client Logo" />
        </a>
      </div>
      <div
        className="client-logo-item"
        data-aos="flip-up"
        data-aos-delay={100}
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <a href="#">
          <img src="assets/images/supported/pokdarwis.png" alt="Client Logo" />
        </a>
      </div>
      <div
        className="client-logo-item"
        data-aos="flip-up"
        data-aos-delay={150}
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <a href="#">
          <img src="assets/images/supported/sukasada.png" alt="Client Logo" />
        </a>
      </div>
      <div
        className="client-logo-item"
        data-aos="flip-up"
        data-aos-delay={200}
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <a href="#">
          <img src="assets/images/supported/dispar.png" alt="Client Logo" />
        </a>
      </div>
      <div
        className="client-logo-item"
        data-aos="flip-up"
        data-aos-delay={200}
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <a href="#">
          <img src="assets/images/supported/bestdesta.png" alt="Client Logo" />
        </a>
      </div>
    </Slider>
  );
};
export default Client;
