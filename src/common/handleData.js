/**
 * author:jakietwo
 * time: 2019/5/6
 */
/**
 * 将reply 根据commentId分类
 * @param replys
 */
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
  return result;
}

/**
 * 将reply根据createTime排序， 小的在前面
 * @param replyResult
 * @returns {*}
 */
function orderByCreateTime(replyResult) {
  Object.entries(replyResult).forEach(result => {
    result[1].sort((a, b) => {
      return (
        new Date(a.createTime).getTime() - new Date(b.createTime).getTime()
      );
    });
  });
  return replyResult;
}

/**
 * 将comments数组 按照articleId分类
 * @param commentData
 */
function sortCommentByArticleId(commentData) {
  let result = {};
  commentData.forEach(commet => {
    let articleId = commet.articleId;
    if (result[articleId]) {
      result[articleId].push(commet);
    } else {
      result[articleId] = [];
      result[articleId].push(commet);
    }
  });
  return result;
}
function sortCategoryByArticleId(categorysData) {
  let result = {};
  let nameResult = {};
  categorysData.forEach(category => {
    let articleId = category.articleId;
    let name = category.name;
    if (result[articleId]) {
      result[articleId].push(category);
    } else {
      result[articleId] = [];
      result[articleId].push(category);
    }
    if (nameResult[name]) {
      nameResult[name].push(category);
    } else {
      nameResult[name] = [];
      nameResult[name].push(category);
    }
  });
  return { result, nameResult };
}

/**
 *
 * @param tags
 */
function sortTagByArticleId(tags) {
  let result = {};
  tags.forEach(tag => {
    let articleId = tag.articleId;
    if (result[articleId]) {
      result[articleId].push(tag);
    } else {
      result[articleId] = [];
      result[articleId].push(tag);
    }
  });
  return result;
}
function sortCategoryByName(category) {}
export {
  sortReplyByCommentId,
  orderByCreateTime,
  sortCommentByArticleId,
  sortCategoryByArticleId,
  sortTagByArticleId
};
