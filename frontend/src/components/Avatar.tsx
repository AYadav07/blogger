const Avatar = ({
  tailwindHeight,
  tailwindWidth,
  avatarSrc,
  authorName,
}: {
  tailwindHeight: string;
  tailwindWidth: string;
  avatarSrc: string | undefined;
  authorName: string;
}) => {
  authorName = authorName[0].toUpperCase();
  let styleForIcon =
    "w-" +
    tailwindWidth +
    " h-" +
    tailwindHeight +
    " rounded-full ring-gray-300 dark:ring-gray-500";

  if (!avatarSrc) {
    styleForIcon =
      "w-" +
      tailwindWidth +
      " h-" +
      tailwindHeight +
      " relative inline-flex items-center justify-center overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600";
    return (
      <div className={styleForIcon}>
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {authorName}
        </span>
      </div>
    );
  }
  return (
    <div>
      <img className={styleForIcon} alt={authorName} />
    </div>
  );
};

export default Avatar;
