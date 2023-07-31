import { React } from "react";

export default function CommentSection({ handleClose }) {
  const handleCloseCommentSection = () => {
    handleClose();
  };

  return (
    <>
      <div className="w-80 border text-white rounded-lg border-gray-400 m-4">
        <div className="px-4 rounded-t bg-amber-300 flex flex-row items-center justify-between">
          <label className="text-slate-700 m-0 inline-block">Comments</label>
          <button
            type="button"
            onClick={handleCloseCommentSection}
            className="text-black text-3xl float-right"
            aria-hidden="true"
          >
            &times;
          </button>
        </div>
        <div className=" p-3 border-t-2 border-dotted border-slate-500 ">
          <ul className="commentList p-0 list-none overflow-auto max-h-80 h-full">
            <li className="m-0 mt-3">
              <div className="table-cell w-7 mr-1.5 h-full float-left">
                <img
                  alt="test kitty"
                  className="w-full rounded-full"
                  src="http://placekitten.com/50/50"
                />
              </div>
              <div className="table-cell">
                <p className="m-0">Hello this is a test comment.</p>{" "}
                <span className="date italic text-xs text-slate-400">
                  on March 5th, 2014
                </span>
              </div>
            </li>
            <li className="m-0 mt-3">
              <div className="table-cell w-7 mr-1.5 h-full float-left">
                <img
                  alt=""
                  className="w-full rounded-full"
                  src="http://placekitten.com/45/45"
                />
              </div>
              <div className="table-cell">
                <p className="m-0">
                  Hello this is a test comment and this comment is particularly
                  very long and it goes on and on and on.
                </p>{" "}
                <span className="date text-xs text-slate-400">
                  on March 5th, 2014
                </span>
              </div>
            </li>
            <li className="m-0 mt-3">
              <div className="table-cell w-7 mr-1.5 h-full float-left">
                <img
                  className="w-full rounded-full"
                  src="http://placekitten.com/40/40"
                  alt=""
                />
              </div>
              <div className="table-cell">
                <p className="m-0">Hello this is a test comment.</p>{" "}
                <span className="date text-xs text-slate-400">
                  on March 5th, 2014
                </span>
              </div>
            </li>
            <li className="m-0 mt-3">
              <div className="table-cell w-7 mr-1.5 h-full float-left">
                <img
                  alt=""
                  className="w-full rounded-full"
                  src="http://placekitten.com/45/45"
                />
              </div>
              <div className=" table-cell">
                <p className="m-0">
                  Hello this is a test comment and this comment is particularly
                  very long and it goes on and on and on.
                </p>{" "}
                <span className="date text-xs text-slate-400">
                  on March 5th, 2014
                </span>
              </div>
            </li>
          </ul>

          <form className="form-inline">
            <div className="w-full flex justify-between mt-8 p-2">
              <textarea
                className="form-control h-14 w-5/6 rounded-md p-2 text-slate-200 bg-black focus:border-2 focus:border-amber-300  focus:border-opacity-20"
                type="text"
                placeholder="Add a comment..."
              />
              <button className="p-2 ml-2 bg-amber-300 rounded-sm text-slate-700 transition duration-300">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
