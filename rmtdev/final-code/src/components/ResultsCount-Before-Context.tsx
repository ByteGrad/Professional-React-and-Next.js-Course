export default function ResultsCount({ count }: { count: number }) {
  return (
    <p className="count">
      <span className="u-bold">{count}</span> results
    </p>
  );
}
