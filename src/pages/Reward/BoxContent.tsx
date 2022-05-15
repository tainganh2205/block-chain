import React from "react";

type Props = {
  title: string;
  content: any;
}
const BoxContent: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div className="flex flex-column items-center justify-center pt-6 pb-6">
      <div className="relative tabContent">
        <img src="/images/fish/box-buy-gem.png" alt="" className={"box-buy-gem"} />
        <h1 className="title-buy-gem">{props.title}</h1>
        {props.content}
      </div>
    </div>
  );
};

export default BoxContent;
