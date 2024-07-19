import type { MouseEvent } from "react";
import { useEffect, useRef } from "react";

type Props = {
  className?: string;
};

const LogoAnimation = ({ className = "" }: Props) => {
  const pupilL = useRef<SVGCircleElement>(null);
  const pupilR = useRef<SVGCircleElement>(null);
  useEffect(() => {
    // const pupils = document.querySelectorAll(".pupil");
    if (!pupilR.current || !pupilL.current) return;
    const pupilAreaL = pupilL.current.getBoundingClientRect();
    const pupilAreaR = pupilR.current.getBoundingClientRect();
    const r = pupilAreaL.width * 0.5;
    pupilL.current.style.transformBox = `fill-box`;
    pupilL.current.style.transformOrigin = `-${0.3 * r}px -${0.25 * r}px `;
    // pupilL.current.style.transformOrigin = `${r}px ${r}px `;
    pupilR.current.style.transformBox = `fill-box`;
    pupilR.current.style.transformOrigin = `-${0.3 * r}px -${0.25 * r}px `;

    const eventHandler = (event: unknown): void => {
      const e =
        event instanceof TouchEvent ? event.touches[0] : (event as MouseEvent);
      const clientX = e?.clientX;
      const clientY = e?.clientY;
      if (!pupilR.current || !pupilL.current) return;
      let y = clientY - pupilAreaL.top;
      let x = clientX - pupilAreaL.right;
      let angle = Math.atan2(y, x) * (180 / Math.PI) + 360;
      pupilL.current.style.transform = `translate(80%, 70%)
        rotate(${angle - 40 + "deg"})`;
      y = clientY - pupilAreaR.top;
      x = clientX - pupilAreaR.right;
      angle = Math.atan2(y, x) * (180 / Math.PI) + 360;
      pupilR.current.style.transform = `translate(80%, 70%) rotate(${
        angle - 40 + "deg"
      })`;
    };
    document.body.addEventListener("touchmove", eventHandler);
    document.body.addEventListener("mousemove", eventHandler);
    return () => {
      document.body.removeEventListener("mousemove", eventHandler);
    };
  }, []);
  return (
    <svg
      className={`logo-animation group ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 278.08 278.08"
    >
      <path d="M267,87.29c-2.26-42.46-36.85-75.14-77.25-73C165.13,15.61,144,29.61,131.81,50,117.56,29.17,94.43,16.2,69,17.55,28.62,19.7-2.22,57.25.13,101.41s37,78.23,77.4,76.08a68.83,68.83,0,0,0,41.83-17.27c3.26,12,7.37,23.3,11.56,35.42a5.16,5.16,0,0,1-1.46,5.55c-15.6,13.77-48.9,41.5-59.78,53.09-21.76,22.19-26.52,34.62,8,11.22,24-15.08,51.33-29.7,70.7-47.9,11.18-9.4,10.18-21.07,4.71-33.39-5.91-12.11-9.31-24.05-11.25-39.17,14.24,15.2,34.34,24.19,56.15,23C238.38,165.92,269.3,129.76,267,87.29ZM73.32,152.66c-28,0-50.72-24.89-50.72-55.6s22.71-55.6,50.72-55.6S124,66.36,124,97.06,101.33,152.66,73.32,152.66Zm121.8-7c-27.77,0-50.29-23.86-50.29-53.28S167.35,39.1,195.12,39.1,245.4,63,245.4,92.38,222.89,145.66,195.12,145.66Z" />
      {/*<path d="M545.71,38.65c-12.37-33.33-59.26-49.13-81.64-14.43C459.94,7.15,440-2.3,422.73.48c-20.79,3-37,18.35-45.52,35.67-14.28,29.3-9.63,66.47,13.7,90.35h0c-18.81,14.76-38.63,5.66-50.77-12a142.46,142.46,0,0,1-17.48-32.09c-2.76-2.65-7.53-3.82-10.22-4.2C320.57,58.4,340,33,352.83,23.09c9.69-8.62,19-14.67,20.13-17.78C372.28,0,354.66,7.18,345.48,12c-22.71,11.6-43.51,32-54.2,53.59-3.16-13.15-5.15-27.75-11.33-40-1.17-2.29-3.52-4.79-5.65-5.59-4.06-1.52-9.08-1.12-12.13,1.06-3.5,2.49-5.52,7-4,10.91,17.85,47,13.89,94.64,13,111.39a12.07,12.07,0,0,0,11.7,12.47l.42,0A12.28,12.28,0,0,0,296.1,145c1.27-13.63,3.51-31.28,7.57-44.31,18.62,43.3,60.5,78.59,106.2,41.72C425.79,153.1,445.73,158.33,465,158c17.45-1.66,30.19-13.14,24-30.45-13-28.17-23.87-129.4,34.38-98.46C529.32,30.58,550.23,53.6,545.71,38.65Zm-137.55,70.7a55.08,55.08,0,0,1-13.55-28.11,62.66,62.66,0,0,1,3.49-31.45c3.64-9.22,10.48-18,19.28-22.81,10-6.23,25.54-3.56,23.23,9.9-.73,10.64-5.49,22-10,32.35C424.51,83.14,417.52,97.26,408.16,109.35ZM462,134.46c-12.14-.68-24.72-3.34-35-9.58,11.44-14.44,19.65-30.75,26.84-47.37C454.67,96.67,458,116,465,133.9,464,134.12,463,134.31,462,134.46Z" />*/}
      {/*<path d="M460,136.63h0S460,136.63,460,136.63Z" />*/}
      <circle ref={pupilL} className="pupil" cx="74.3" cy="96.5" r="15.7" />
      <circle ref={pupilR} className="pupil" cx="195.1" cy="92.4" r="15.7" />
    </svg>
  );
};

export default LogoAnimation;
