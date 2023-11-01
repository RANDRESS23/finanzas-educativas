import Container from "./Container";

export default function Round({ p = 7 }: { p?: number }) {
  return (
    <Container>
      <div className={`rounded-full p-${p} bg-gray-200`} />
    </Container>
  );
}
