import { React } from "react";
import { Link } from "react-router-dom";
import { deleteCard} from '../../utils/api/index';
import { useNavigate } from "react-router-dom";



function Card({cardId, deckId, back, front}) {
  const navigate = useNavigate(); 
  async function del() {
    if (window.confirm("Are you sure you want to delete this Deck?")) {
      await deleteCard(cardId);
      navigate(0); // Forces the component to reload
    } else {
      console.log("Delete action canceled");
    }
}
  return (
    <div className="card mb-3">
      <div className="card-body">
      <div className="d-flex justify-content-between">
        <p className="card-text">{front}</p>
        <p className="card-text">{back}</p>
      </div>
        <div className="d-flex">
          <div className="ml-auto">
          <Link to={`/decks/${deckId}/cards/${cardId}/edit`} className="btn btn-secondary mr-2">
            <span className="oi oi-pencil" aria-hidden="true"></span> Edit
          </Link>
          <button type="button" className="btn btn-danger" onClick={del}>
            <span className="oi oi-trash" aria-hidden="true"></span>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
