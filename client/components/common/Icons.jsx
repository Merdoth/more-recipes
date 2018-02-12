import React from 'react';

export const Icons = ({ upvotes, downvotes, views }) => (
  <span className="icons">
    <Icon className="fa fa-thumbs-up" score={upvotes} />
    <Icon className="fa fa-thumbs-down" score={downvotes} />
    <Icon className="fa fa-eye" score={views} />
  </span>
);

export const Icon = ({ className, score }) => (
  <i className={className} aria-hidden="true" id="iconI">
    <span id="score">{score}</span>
  </i>
);
