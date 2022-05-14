import React from "react";
import "./style.less";

interface Props {
  className?: string,
  text: string,
  action: any
}

const FishButton: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div className="btn-fish-wrapper relative" onClick={props.action}>
      <img src="/images/fish/btn-default.png"
           alt=""
      />
      <span className="btn-fish-text">
        {props.text}
      </span>
    </div>
  );
};

export default FishButton;
