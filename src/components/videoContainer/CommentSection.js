import { React, useState } from "react";


export default function CommentSection( { handleClose} ) {
  const handleCloseCommentSection = () => {
    handleClose();
  };
  
  return (
    <>
      <div className="justify-end w-96 border text-white rounded-lg border-gray-400 m-4">
        <div className="p-2 bg-amber-300">
          <label className="text-slate-700 m-0 inline-block">Comments</label>
          <button type="button"
            onClick={handleCloseCommentSection}
          className="text-black text-xl float-right" aria-hidden="true">
            &times;
          </button>
        </div>

        <div className="p-3 border-t-2 border-dotted border-slate-500">
          <p className="mt-2 mb-0">
            User's description of the video can go here.
          </p>
        </div>
        <div className=" p-3 border-t-2 border-dotted border-slate-500 ">
          <ul className="commentList p-0 list-none overflow-auto max-h-52 h-full">
            <li className="m-0 mt-3">
              <div className="table-cell commenterImage">
                <img src="http://placekitten.com/50/50" />
              </div>
              <div className="table-cell commentText">
                <p className="">Hello this is a test comment.</p>{" "}
                <span className="date sub-text">on March 5th, 2014</span>
              </div>
            </li>
            <li className="m-0 mt-3">
              <div className="table-cell commenterImage">
                <img src="http://placekitten.com/45/45" />
              </div>
              <div className="table-cell commentText">
                <p className="">
                  Hello this is a test comment and this comment is particularly very long and it goes on and on and on.
                </p>{" "}
                <span className="date sub-text">on March 5th, 2014</span>
              </div>
            </li>
            <li className="m-0 mt-3">
              <div className="table-cell commenterImage">
                <img src="http://placekitten.com/40/40" />
              </div>
              <div className="table-cell commentText">
                <p className="">Hello this is a test comment.</p>{" "}
                <span className="date sub-text">on March 5th, 2014</span>
              </div>
            </li>
            <li className="m-0 mt-3">
              <div className="table-cell commenterImage">
                <img src="http://placekitten.com/45/45" />
              </div>
              <div className=" table-cell commentText">
                <p className="">
                  Hello this is a test comment and this comment is particularly very long and it goes on and on and on.
                </p>{" "}
                <span className="date sub-text">on March 5th, 2014</span>
              </div>
            </li>
          </ul>

          <form className="form-inline" role="form">
            <div className="w-full flex justify-between mt-8 p-2">
              <textarea
                className="form-control h-10 w-5/6 rounded-sm p-2 text-slate-700"
                type="text"
                placeholder="Add a comment..."
              />
              <button className="p-2 bg-amber-300 rounded-sm text-slate-700 transition duration-300">Add</button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
}
