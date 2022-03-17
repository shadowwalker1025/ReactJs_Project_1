import React from 'react';


function NewsCard({ article }) {
  return (
    <div className='news-card'>
        <h3> { article.title }</h3>
        <h5> {article.points} points by {article.author} | {article.num_comments} comments</h5>
        <a href={article.url}>Read More</a>
    </div>
  )
}

export default NewsCard;