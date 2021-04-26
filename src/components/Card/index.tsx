import { Container, CardContent, ContainerProps } from "./styles";

export interface CardProps extends Partial<ContainerProps> {
  header?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}

function Card({
  header,
  content,
  footer,
  isDragging,
  backgroundColor = "#FFF",
}: CardProps) {
  return (
    <Container isDragging={isDragging} backgroundColor={backgroundColor}>
      {header && <CardContent>{header}</CardContent>}
      {content && <CardContent>{content}</CardContent>}
      {footer && <CardContent>{footer}</CardContent>}
    </Container>
  );
}

export { Card };
