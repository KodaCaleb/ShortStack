import { React, useState } from "react";
import PostContainer from "./PostContainer";
import { firestore } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";


export default function CommentSection( { comments, handleClose} ) {



  // {comments.map((comment, index) => (
  //   console.log("LOOK HERE", comment)
  // ))}



  const handleCloseCommentSection = () => {
    handleClose();
  };
  
  return (
    <>
      <div className="w-80 border text-white rounded-lg border-gray-400 m-4">
        <div className="px-4 rounded-t bg-amber-300 flex flex-row items-center justify-between">
          <label className="text-slate-700 m-0 inline-block">Comments</label>
          <button type="button"
            onClick={handleCloseCommentSection}
          className="text-black text-3xl float-right" aria-hidden="true">
            &times;
          </button>
        </div>

        {comments.map((comment, index) => (
        <div className=" p-3 border-t-2 border-dotted border-slate-500 ">
          <ul className="commentList p-0 list-none overflow-auto max-h-80 h-full">
            <li className="m-0 mt-3">
              <div className="table-cell w-7 mr-1.5 h-full float-left">
        
              </div>
              <div className="table-cell">
                <p className="m-0">{comment}</p>{" "}
              </div>
            </li>
          </ul>
        </div>
        ))}


          <form className="form-inline" role="form">
            <div className="w-full flex justify-between mt-8 p-2">
              <textarea
                className="form-control h-14 w-5/6 rounded-md p-2 text-slate-200 bg-black focus:border-2 focus:border-amber-300  focus:border-opacity-20"
                type="text"
                placeholder="Add a comment..."
              />
              <button className="p-2 ml-2 bg-amber-300 rounded-sm text-slate-700 transition duration-300">Add</button>
             
            </div>
          </form>

   
      </div>
    </>
  );
}
