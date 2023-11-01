import Container from "./Container";

export default function Round({ p = 7 }: { p?: number }) {
  return (
    <Container>
      <div className="rounded-full p-7 bg-gray-200" />
    </Container>
  );
}
