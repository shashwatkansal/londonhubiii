const Spinner = ({ ariaLabel }: { ariaLabel?: string }) => {
  return (
    <div
      role="status"
      className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
      aria-label={ariaLabel}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
