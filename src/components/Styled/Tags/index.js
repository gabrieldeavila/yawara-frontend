import styled from 'styled-components'

export const CheckSpan = styled.span`
  width: 12px;
  display: flex;
  height: 12px;
  border: 2px solid var(--yellow);
  justify-content: center;
  align-items: center;
  svg {
    transition: 0.25s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    transform: scale(0);
    stroke: ${(props) =>
      props.dontChange
        ? 'var(--blue)'
        : props.theme === 'light'
        ? 'var(--white)'
        : 'var(--black)'};
  }
`

export const TagsToSelect = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 5rem;

  span {
    font-weight: 600;
    color: var(--green);
  }
`

export const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  gap: 0.5rem;
  width: 10rem;
  position: relative;
  input {
    display: none;
  }
  & input:checked ~ ${CheckSpan} svg {
    transform: scale(1.5);
  }
  input:focus + ${CheckSpan} {
    box-shadow: 0 0 0 3px pink;
  }
`

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
  width: 10rem;
`
