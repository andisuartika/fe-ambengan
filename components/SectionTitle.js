import { Fragment } from "react";
import Counter from "./Counter";
const SectionTitle = ({
  title,
  countValue = 34500,
  subtitle1 = "Experience the Authentic Charm of Village Life with Modern Comforts",
  subtitle2 = "most popular experience you’ll remember",
  bg,
}) => {
  return (
    <Fragment>
      <h2>{title}</h2>
      <p>
        {subtitle1}{" "}
        {/* <span className={`count-text plus ${bg}`}>
          <Counter end={countValue} />
        </span>{" "} */}
        {/* {subtitle2} */}
      </p>
    </Fragment>
  );
};
export default SectionTitle;
