import styled, { css } from "styled-components";

export type ContainerProps = {
  isDragging?: boolean;
};

export const Container = styled.div<ContainerProps>`
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 0px 12px -3px rgba(112, 112, 112, 1);
  ${({ isDragging }) =>
    isDragging &&
    css`
      border: 2px dashed rgba(0, 0, 0, 0.2);
      /* border-radius: 0; */
      background-color: transparent;
      box-shadow: none;
      cursor: grabbing;
      * {
        opacity: 0;
      }
    `}
`;

export const CardContent = styled.div`
  margin: 5px;
`;
