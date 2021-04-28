import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export type ContainerProps = {
  isDragging?: boolean;
  backgroundColor?: string;
  isClickable?: boolean;
};

export const Container = styled.div<ContainerProps>`
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0px 0px 5px -3px rgba(112, 112, 112, 1);
  background-color: ${({ backgroundColor = "#fff" }) => backgroundColor};
  ${({ isClickable }) =>
    isClickable &&
    css`
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        box-shadow: 0px 0px 10px -3px rgba(112, 112, 112, 1);
      }
    `}
  ${({ isDragging }) =>
    isDragging &&
    css`
      /* border: 2px dashed rgba(0, 0, 0, 0.2); */
      /* border-radius: 0; */
      background-color: transparent;
      box-shadow: none;
      cursor: grabbing;
      transform: rotate(3deg);
      * {
        opacity: 0;
      }
    `};
`;

export const CardContent = styled.div`
  margin: 5px;
`;
