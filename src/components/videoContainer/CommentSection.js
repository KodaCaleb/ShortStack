import React from "react";

export default function CommentSection() {
  return (
    <>
	<div className="comments-container mx-auto mt-4 mb-4">
		<h1 className="text-white text-xl">Comments</h1>
		<ul id="comments-list"className="comments-list mt-6 relative">
			<li className="mb-4 block relative">
				<div className="comment-main-level">
					<div className="commenter-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt=""/></div>
					<div className="comment-box text-amber-200">
						<div className="comment-head rounded-tr-2xl ">
							<h6 className="commenter-name text-amber-200"><a href="http://creaticode.com/blog">Agustin Ortiz</a></h6>
						</div>
						<div className="comment-content rounded-br-2xl">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
						</div>
					</div>
				</div>
			</li>

			<li>
				<div className="comment-main-level">
					<div className="commenter-avatar">
            <img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt=""/></div>
				
					<div className="comment-box">
						<div className="comment-head rounded-tr-2xl">
							<h6 className="  commenter-name"><a href="http://creaticode.com/blog">Lorena Rojero</a></h6>
						</div>
						<div className="comment-content rounded-br-2xl ">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
						</div>
					</div>
				</div>
			</li>
		
    <form  className=" w-11/12 pl-4 pt-5 flex ml-auto items-center"
            action=""
          >
            <input
              className="text-white w-full h-10 px-3 py-2 text-sm bg-gray-600 bg-opacity-50 mr-3 rounded focus:outline-none focus:ring-1 focus:ring-slate-500"
              type="text"
              placeholder="Add a comment..."
              // value={*videoComment*}
              // onChange={(e) => addComment functionality here)}
            />
             <button
                className="bg-yellow-400 h-10 w-10  text-sm text-black rounded  hover:bg-yellow-500 focus:ring-1 focus:ring-yellow-800
                ease-in-out duration-500"
                // onClick={() =>
                  // add comment fn 
                // }
              >
                {" "}
                +
              </button>
      
      </form>
      </ul>
	</div>
    </>
  )
};