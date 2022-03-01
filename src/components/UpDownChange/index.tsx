import { formatCurrency, formatNumber } from "utils";


interface UpDownChangeProps {
  format?: "percent" | "currency";
  children: number;
  className?: string;
}

// eslint-disable-next-line import/prefer-default-export
export const UpDownChange = (props: UpDownChangeProps) => {
  const { children, format = "percent", className } = props;

  const prefix = children > 0 ? "+" : "-";
  const suffix = format === "percent" ? "%" : "";

  const number =
    format === "percent"
      ? formatNumber(Math.abs(children))
      : formatCurrency(Math.abs(children));

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <span style={{color:children >= 0 ? "green" : "red"}} className={className}>
       {prefix}
      {number}
      {suffix}
    </span>
  );
};
