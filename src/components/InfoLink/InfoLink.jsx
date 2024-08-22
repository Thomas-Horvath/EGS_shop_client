import React from 'react';
import { Link } from 'react-router-dom';
 
const InfoLink = (props) => {
    const {path , title , className , onClick } = props;
  return (
   <li className={className} onClick={onClick}> <Link to={path}>{title}</Link></li>
  )
}

export default InfoLink;