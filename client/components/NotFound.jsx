import React from 'react';
/**
 *
 * @description The page the user gets when an invalid route is entered in the address bar.
 *
 * @method NotFound
 *
 * @returns { undefined }
 * .
 */
const NotFound = () => (
  <div>
    <div className="notFound">
    <p className="num">404</p>
    <p className="word">Page Not Found</p>
    <span>Please try going back to the home page</span>
    </div>
    </div>
);

export default NotFound;
