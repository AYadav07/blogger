import { Link } from "react-router-dom";
import Avatar from "./Avatar";

interface BlogCardType {
  authorName: string;
  publishTime: string;
  blogTitle: string;
  blogContent: string;
  blogId: string;
}
const BlogCard = ({
  authorName,
  publishTime,
  blogTitle,
  blogContent,
  blogId,
}: BlogCardType) => {
  return (
    <div className="w-2/3 grid grid-cols-3 gap-2 border-b p-2">
      <div className="col-span-3 px-10 flex flex-col gap-1">
        <Link
          to={`/blog/${blogId}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <div className="flex gap-5 items-center">
            <Avatar
              tailwindHeight={"8"}
              tailwindWidth={"8"}
              authorName={"Abc"}
              avatarSrc={undefined}
            />
            <div className="text-sm	font-semibold">{authorName}</div>
            <div className="text-sm	font-normal text-slate-500">
              {publishTime}
            </div>
          </div>
          <div className="text-xl font-bold">{blogTitle}</div>
          <div className="text-base font-normal">
            {blogContent.length > 200
              ? `${blogContent.substring(0, 200)} ...`
              : blogContent}
          </div>
          <div className="text-sm	font-normal text-slate-500">
            {Math.ceil(blogContent.length / 100) + " min read"}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
