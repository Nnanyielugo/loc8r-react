import React from 'react';

import './LocationList.css';

const locationList = props => {
  // const facilities = ['food', 'drinks', 'wifi']
    const label = props.location.facilities.map((facility, i) => (
      <span>
        <span key={i++} className="label label-warning">{facility}</span>
        <span>&nbsp;</span>
      </span>
    ))
    return(
      <div className="row list-group">
      <div className="col-sm-8 col-xs-12 col-md-8 list-group-item">
        <div>
          <h4>
            {props.location.name} &nbsp;
            {props.ratingStars(props.location.rating)}
            <span className="badge pull-right badge default">{props.formatDistance(props.location.distance)}</span>
          </h4>
          
          <div>{props.location.address}</div>
          {label}
          <hr />
        </div>
      </div>
      <div className="col-sm-4 col-xs-12 col-md-4"></div>
    </div>
    )
}

export default locationList;