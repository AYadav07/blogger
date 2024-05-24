const TextAreaEditor = ({
  onChangeHandler,
}: {
  onChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <div className="w-full pl-20">
      <div className="px-5 py-5 w-full bg-white rounded-b-lg dark:bg-gray-800">
        <label htmlFor="editor" className="sr-only">
          Publish post
        </label>
        <textarea
          onChange={onChangeHandler}
          rows={10}
          className="block w-full px-5 py-2 text-base text-gray-800 bg-white dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 h-full focus:outline-none border"
          placeholder="Write your blog..."
          required
        ></textarea>
      </div>
    </div>
  );
};

export default TextAreaEditor;
