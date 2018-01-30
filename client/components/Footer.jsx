import React from 'react';

/**
 * @description this returns a footer component
 *
 * @extends {Component}
 *
 * @returns { undefined }
 */

const Footer = () => (
      <div className="container-fluid">
        <div className="footer">
          <div>
            <p>
              <i>Designed with</i>
              <i className="fa fa-heart love" aria-hidden="true" />
              <i>by </i>
              <strong>Ucheya</strong>
            </p>
          </div>
        </div>
      </div>
);

export default Footer;
