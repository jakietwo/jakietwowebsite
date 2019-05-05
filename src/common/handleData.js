function sortReplyByCommentId(replys) {
  let result = {};
  replys.forEach(item => {
    let commentId = item.commentId;
    if (result[commentId]) {
      result[commentId].push(item);
    } else {
      result[commentId] = [];
      result[commentId].push(item);
    }
  });
  console.log("result", result);
  return result;
}
export { sortReplyByCommentId };
