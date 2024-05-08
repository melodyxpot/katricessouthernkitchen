import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { clsx } from "clsx";
import CloseIcon from "@mui/icons-material/Close";

const openClassNames = {
  right: "translate-x-0",
  left: "translate-x-0",
  top: "translate-y-0",
  bottom: "translate-y-0"
};

const closeClassNames = {
  right: "translate-x-full",
  left: "-translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full"
};

const classNames = {
  right: "inset-y-0 right-0",
  left: "inset-y-0 left-0",
  top: "inset-x-0 top-0",
  bottom: "inset-x-0 bottom-0"
};

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  side?: "right" | "left" | "top" | "bottom";
  className?: string;
  children?: ReactNode | string;
  header?: ReactNode | string;
  footer?: ReactNode | string;
}

const Drawer: FC<Props> = ({
  open,
  setOpen,
  side = "right",
  className = "",
  children,
  header,
  footer
}) => {
  return (
    <div
      id={`dialog-${side}`}
      className="relative z-50"
      aria-labelledby="slide-over"
      role="dialog"
      aria-modal="true"
      onClick={() => setOpen(!open)}
    >
      <div
        className={clsx(
          "fixed inset-0 bg-black bg-opacity-50 transition-all",
          {
            "opacity-100 duration-500 ease-in-out visible": open
          },
          { "opacity-0 duration-500 ease-in-out invisible": !open }
        )}
      ></div>
      <div className={clsx({ "fixed inset-0 overflow-hidden": open })}>
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={clsx(
              "pointer-events-none fixed max-w-full w-full md:w-1/2 lg:w-1/3",
              classNames[side]
            )}
          >
            <div
              className={clsx(
                "pointer-events-auto relative w-full h-full transform transition ease-in-out duration-500",
                { [closeClassNames[side]]: !open },
                { [openClassNames[side]]: open }
              )}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <div
                className={clsx(
                  "flex flex-col h-full bg-white shadow-xl rounded-l-lg justify-between",
                  { className: className }
                )}
              >
                <div className="flex flex-col p-5">
                  <div className="flex justify-between mb-3">
                    {header}
                    <button
                      className="cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  <div className="border-t-[1px] border-gray-200 w-full mb-3"></div>
                </div>
                {children}
                <div className="p-5 flex flex-col justify-center w-full">
                  <div className="border-t-[1px] border-gray-200 w-full mb-3"></div>
                  {footer}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
