interface StyledButtonType {
  buttonValue: string;
  onClickMethod: () => void;
}
const StyledButton = ({ buttonValue, onClickMethod }: StyledButtonType) => {
  return (
    <div className="flex justify-center">
      <div
        onClick={onClickMethod}
        className="w-full md:w-80 text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2 cursor-pointer"
      >
        {buttonValue}
      </div>
    </div>
  );
};

export default StyledButton;
