import React from "react";

import CardDetailSegment from "../sharedComponents/CardDetailSegment";
import CardComment from "../sharedComponents/CardComment";

const CardComments = ({ comments, ...props }) => {
  const saveComment = (comment, commentId) => {
    if (commentId) {
      console.log("update: ", comment, commentId);
    } else {
      console.log("newComment: ", comment);
    }
  };
  return (
    <CardDetailSegment>
      <CardComment saveComment={saveComment} {...props} />
    </CardDetailSegment>
  );
};

export default CardComments;
