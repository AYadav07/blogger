const AuthorDetails = ({ authorName }: { authorName: string }) => {
  return (
    <div className="w-full flex flex-col gap-1 items-start justify-center">
      <div className="text-base font-semibold">Author</div>
      <div className="pl-10 pt-5 text-xl font-bold text-black">
        {authorName}
      </div>
      <div className="pl-10 text-small font-normal text-slate-500">
        Descripiton
      </div>
    </div>
  );
};

export default AuthorDetails;
