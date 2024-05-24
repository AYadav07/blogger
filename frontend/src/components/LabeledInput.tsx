const LabeledInput = ({
  labelValue,
  inputType,
  placeholderValue,
  onChangeMethod,
}: {
  labelValue: string;
  inputType: string;
  placeholderValue: string;
  onChangeMethod: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col justify-center gap-1">
      <div className="px-2 font-bold">{labelValue}</div>
      <div>
        <input
          type={inputType}
          placeholder={placeholderValue}
          className="w-full md:w-80 border border-slate-400 p-1 text-sm font-medium"
          onChange={onChangeMethod}
        />
      </div>
    </div>
  );
};

export default LabeledInput;
