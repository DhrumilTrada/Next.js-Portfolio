import StarIcon from "@/assets/icons/star.svg";
import { Fragment } from "react";

const words = [
  "Performant",
  "Accessible",
  "Secure",
  "Scalable",
  "User Friendly",
  "Responsive",
  "Maintainable",
  "Usable",
  "Reliable",
];

export const TapeSection = () => {
  return (
    <div>
      <div className="py-16 lg:py-24 overflow-x-clip">
        <div className="bg-gradient-to-r from-emerald-300 to-sky-400 -rotate-3 -mx-1">
          <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex flex-none gap-4 pr-4 py-3 animate-move-left [animation-duration:25s]">
              {[...new Array(3)].fill(0).map((_, index) => (
                <Fragment key={index}>
                  {words.map((word) => (
                    <div key={word} className="inline-flex items-center gap-4">
                      <span className="text-gray-900 uppercase font-extrabold text-sm">
                        {word}
                      </span>
                      <StarIcon className="size-6 text-gray-900 -rotate-6" />
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
