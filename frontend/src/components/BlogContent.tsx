const BlogContent = ({
  blogTitle,
  blogContent,
}: {
  blogTitle: string;
  blogContent: string;
}) => {
  return (
    <div className="w-full flex flex-col gap-1 items-start justify-center">
      <div className="text-5xl font-black text-black">{blogTitle}</div>
      <div className="pt-2 text-base font-light text-slate-500">
        Posted on 24 August, 2024
      </div>
      <div className="pt-3 text-balance text-ellipsis">{blogContent}</div>
    </div>
  );
};

export default BlogContent;
