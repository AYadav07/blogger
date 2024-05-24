const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex items-center justify-center">
      <div className="max-w-md">
        <p className="text-2xl font-black">
          "The customer I received was exceptional. The support team went above
          and beyond to address my concerns."
        </p>
        <div className="flex flex-col pt-2">
          <span className="text-lg font-bold">Jules Winnfield</span>
          <span className="text-base font-light">CEO, Acme Inc</span>
        </div>
      </div>
    </div>
  );
};

export default Quote;
