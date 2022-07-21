import React from "react";
import "./CustomButton.css";
import { Link, useParams } from "react-router-dom";

const STYLES = ["btn--primary", "btn--outline", "btn--test"];

const SIZES = ["btn--medium", "btn--large"];

type Props = {
  children: string;
  buttonStyle: string;
  buttonSize: string;
  links: string;
  //setState: (val: string) => void;
  //onClick: () => void;
};

export const CustomButton: React.FC<Props> = ({
  children,
  buttonStyle,
  buttonSize,
  links,
  //onClick,
}): JSX.Element => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to={links} className="btn-mobile">
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        // onClick={onClick}
      >
        {children}
      </button>
    </Link>
  );
};
