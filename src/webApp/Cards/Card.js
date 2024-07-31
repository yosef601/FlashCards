// src/components/CardForm.js

import React from 'react';
import { Link } from 'react-router-dom';
import PostsNav from "../PostNav"

function CardForm({ card, onChange, onSubmit, breadcrumbs, title, submitButtonText, cancelLink }) {
  return (
    <div className="container mt-5">
      {/* Navigation component */}
      <PostsNav breadcrumbs={breadcrumbs} />
      <h5 className="card-title">{title}</h5>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            rows="3"
            placeholder="Front side of card"
            name="front"
            value={card.front}
            onChange={onChange}        
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            rows="3"
            placeholder="Back side of card"
            name="back"
            value={card.back}
            onChange={onChange}        
          ></textarea>
        </div>
        <div className="d-flex">
          <Link to={cancelLink} className="btn btn-secondary mr-2">
            <span className="oi oi-circle-x" aria-hidden="true"></span> Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            <span className="oi oi-circle-check" aria-hidden="true"></span> {submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CardForm;
