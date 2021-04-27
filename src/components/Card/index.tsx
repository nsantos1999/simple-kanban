import { motion } from "framer-motion";
import { useMemo } from "react";
import { Container, CardContent, ContainerProps } from "./styles";

export interface CardProps extends Partial<ContainerProps> {
  header?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
}

function Card({
  header,
  content,
  footer,
  isDragging,
  backgroundColor = "#FFF",
  onClick,
  isClickable,
}: CardProps) {
  return (
    <Container
      isDragging={isDragging}
      backgroundColor={backgroundColor}
      isClickable={!!onClick || isClickable}
      onClick={onClick}
    >
      {header && <CardContent>{header}</CardContent>}
      {content && <CardContent>{content}</CardContent>}
      {footer && <CardContent>{footer}</CardContent>}
    </Container>
  );
}

export { Card };
