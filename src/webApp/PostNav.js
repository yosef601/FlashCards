import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // For the home icon

export const PostsNav = ({ breadcrumbs }) => (
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <li key={index} className="breadcrumb-item">
          {breadcrumb.to ? (
            <Link to={breadcrumb.to} className="text-primary">
              {breadcrumb.icon && <breadcrumb.icon />} {breadcrumb.label}
            </Link>
          ) : (
            breadcrumb.label
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default PostsNav;