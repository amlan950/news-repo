import React from 'react';

export default function NewsItem({ title, discription, imgUrl, newsUrl }) {
  return (
    <div className='my-3'>
      <div className="card" style={{ width: "18rem" }}>
        <img src={!imgUrl?"https://www.reuters.com/resizer/v2/CVN5MYDJYVJ4DCMYF5Z3GKAMMQ.jpg?auth=671c78d126b969115c796887de050de972b0f49ce5582c1410747fc2c0cda471&height=1005&width=1920&quality=80&smart=true":imgUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{discription}...</p>
          <a href={newsUrl} rel='noreferrer' target="_blank" className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
    </div>
  );
}
