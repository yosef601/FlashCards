import { React,useState,useEffect } from "react";
import { NavLink,Link } from "react-router-dom";
import { listDecks } from '../utils/api/index';
import { deleteDeck } from '../utils/api/index';
import { useNavigate } from "react-router-dom";

function HomeCard() {
  const [decks, setDecks] = useState([]);

  const navigate = useNavigate(); 

  useEffect(() => {
    async function fetchDecksDetails() {
      try {
        const curDecks = await listDecks();
        setDecks(curDecks);
      } catch (error) {
        console.error("Error fetching decks", error);
      }
    }
    fetchDecksDetails();
  }, []);

  const CreateDeckButton = () => {
    return (
      <NavLink className="btn btn-secondary"  to={`/decks/new`}>
       <span className="oi oi-plus" aria-hidden="true"></span> Create Deck
      </NavLink>

    );
  };

  const del = async (deckid) => {
    if (window.confirm("Are you sure you want to delete this Deck?")) {
      try {
        await deleteDeck(deckid);
        navigate(0);
      } catch (error) {
        console.error("Error deleting deck", error);
      }
    } else {
      console.log("Delete action canceled");
    }
  };

  return (
    <>
    <div className="HomeCard">
      <CreateDeckButton/> 
    </div>
    <div className="mt-3">
          {decks && decks.map((deck) => (
            <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="card-title">{deck.name}</h5>
                  <p className="card-text">{deck.description}</p>
                </div>
                <div>
                  <span>{deck.cards.length} cards</span>
                </div>
              </div>
              <div className="d-flex mt-3">
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
                   <span className="oi oi-eye" aria-hidden="true"></span> View
                </Link>
                <Link to={`/decks/${deck.id}/study`}className="btn btn-primary mr-2">
                  <span className="oi oi-book" aria-hidden="true"></span> Study
                </Link>
                <button type="button" className="btn btn-danger ml-auto" onClick={() => del(deck.id)}>
                  <span className="oi oi-trash" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </div>
          ))}
      </div>
    </>
  );
}

export default HomeCard;