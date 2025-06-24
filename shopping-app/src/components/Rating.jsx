const Rating = ({ rate }) => {
  const currentRate = Math.round(Number(rate));
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex gap-1 items-center mt-auto">
      {stars.map((num) => (
        <svg
          key={num}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={num <= currentRate ? "#facc15" : "#e5e7eb"}
          className="w-5 h-5 drop-shadow"
        >
          <path
            d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
          />
        </svg>
      ))}
      <span className="ml-2 text-sm text-gray-500 font-medium">{rate}</span>
    </div>
  );
};

export default Rating;
