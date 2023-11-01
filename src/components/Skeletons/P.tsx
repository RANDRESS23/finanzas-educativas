import Container from "./Container";

export default function P({
  height = 2,
  width = 360,
}: {
  height?: number;
  width?: number;
}) {
  return (
    <Container>
      <div
        className={`h-${height} bg-gray-200 rounded-full max-w-[${width}px] mt-2.5`}
      />
    </Container>
  );
}
