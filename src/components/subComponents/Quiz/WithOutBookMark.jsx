import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const WithOutBookMark = ({ getBookMarksData }) => {
  return (
    <>
      <div className="row">
        <div className="side-row2-box ">
          <div className="col-12 side-row2 overflow-auto position-relative">
            <div className="card test">
              <div
                className="card-body"
                data-tooltip-id={getBookMarksData.bookName}
              >
                {getBookMarksData.bookName.length > 25
                  ? getBookMarksData.bookName.slice(0, 25) + "...pdf "
                  : getBookMarksData.bookName}
                <ReactTooltip
                  className="toolTipIndex"
                  id={getBookMarksData.bookName}
                  place="bottom"
                  content={getBookMarksData.bookName}
                />
              </div>
            </div>

            <div className="card mt-1 position-absolute  border-0" style={{top:'30%'}}>            
              <div className="card-body text-center ">                
              <img src="https://cdn.adraproductstudio.com/Nobookmark.png" alt="no-bookmark-image" className="img-fluid  " width={200} height={200}/>
              <div className="card-title brand-color fw-bold">No Bookmark</div>
                <p className="card-text no-bookmark-text ">
                  This book does not contain any bookmarks so click the{" "}
                  <span><b>Generate Questions</b></span> button
                  to generate the questions randomly...!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithOutBookMark;
