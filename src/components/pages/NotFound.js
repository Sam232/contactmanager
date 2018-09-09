import React from "react";
import { Link } from 'react-router-dom'

const NotFound = () => {
  return(
    <div>
      <h1 className="display-4"><span className="text-danger">404</span> Page Not Found</h1>
      <p className="lead">Sorry, This Page Does Not Exist!</p>
      <Link to="/" className="text-danger">Go To Home Page</Link>
    </div>
  );
}

export default NotFound