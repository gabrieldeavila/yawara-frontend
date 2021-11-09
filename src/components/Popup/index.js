import styled from "styled-components";
import { TiArrowSortedUp } from "react-icons/ti";
import { useEffect, useRef } from "react";

const Content = styled.div`
  background: ${(props) => `var(--${props.colorvar})`};
  width: ${(props) => props.width};
  height: fit-content;
  padding: 1.5rem;
  border-radius: 10px;
`;

const SvgIcon = styled(TiArrowSortedUp)`
  transform: scale(1.5);
  margin-bottom: -0.6rem;
  margin-left: ${(props) => props.left};
  fill: ${(props) => `var(--${props.colorvar})`};
`;

const Wrapper = styled.div`
  position: fixed;
  top: calc(${(props) => props.bottom}px);
  left: calc(${(props) => props.left}px - 12rem);
`;

function Popup({
  bottom,
  left,
  colorVar,
  setPopup,
  children,
  className,
  width = "15rem",
  svgMarginLeft = "12.65rem",
}) {
  const ref = useRef("");
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (event.target.classList) {
          if (!event.target.classList.contains(className)) setPopup(false);
        } else setPopup(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleClickOutside);
    };
  }, [ref]);

  return (
    <Wrapper ref={ref} bottom={bottom} left={left}>
      <SvgIcon left={svgMarginLeft} colorvar={colorVar} />
      <Content width={width} colorvar={colorVar}>
        {children}
      </Content>
    </Wrapper>
  );
}

export default Popup;
