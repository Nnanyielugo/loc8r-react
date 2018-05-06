import React from 'react';

import './LocationList.css';

const locationList = props => {
  const facilities = ['food', 'drinks', 'wifi']
    const label = facilities.map((facility, i) => (
      <span>
        <span key={i++} className="label label-warning">{facility}</span>
        <span>&nbsp;</span>
      </span>
    ))
    return(
      <div className="container">
        <div className="banner"><big><b>Loc8r</b></big>&nbsp;Find places to work with wifi near you!</div>
        <div className="row list-group">
          <div className="col-sm-8 col-xs-12 col-md-8 list-group-item">
            <div>
              <h4>
                Burger King &nbsp;
                {props.ratingStars(3)}
                <span className="badge pull-right badge default">{props.formatDistance(400)}</span>
              </h4>
              
              <div>Old road, Lekki</div>
              {label}
              <hr />
            </div>
          </div>
          <div className="col-sm-4 col-xs-12 col-md-4"></div>
        </div>
      </div>
    )
}

export default locationList;