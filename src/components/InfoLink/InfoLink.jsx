import React from 'react';
import { Link } from 'react-router-dom';
 
const InfoLink = (props) => {
    const {path , title , className , onClick } = props;
  return (
    <Link to={path}><li className={className} onClick={onClick}>{title}</li></Link>
  )
}

export default InfoLink;