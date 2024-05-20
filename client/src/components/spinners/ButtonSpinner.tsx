import { classNames } from "@/utils";

export interface ButtonSpinnerProps {
  loading: boolean | undefined;
  buttonText: string;
}

function ButtonSpinner({ loading, buttonText }: ButtonSpinnerProps) {
  return (
    <>
      <span className={classNames(loading ? "opacity-30" : "")}>{buttonText}</span>
      {loading && <span className="bg-transparent absolute inset-0 flex items-center justify-center">
        <Spinner color="text-white" />
      </span>}
    </>
  )
}


export default ButtonSpinner


interface SpinnerProps {
  className?: string;
  small?: boolean;
  color?: string;
}

export function Spinner({ className, color = "gray-900", small = false }: SpinnerProps) {

  return (
    <span className={classNames(
      className ? className : '',
      small ? "h-3 w-3" : "h-4 w-4",
      "animate-spin rounded-full border-t-2 border-b-2",
      `border-${color}`
    )}></span>
  )
}
