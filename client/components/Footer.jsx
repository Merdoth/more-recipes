import React from 'react';

/**
 * @description this returns a footer component
 *
 * @extends { Component }
 *
 * @returns { undefined }
 */

const Footer = () => (
  <div className="container-fluid">
    <div
    id="footer"
    className="footer">
      <div>
        <p>
          Designed with&nbsp;<i
            className="fa fa-heart love"
            aria-hidden="true"
          />&nbsp;by&nbsp;<span>Ucheya</span>
        </p>
      </div>
    </div>
  </div>
);

export default Footer;
