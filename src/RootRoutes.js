import React from 'react'
import { Routes, Route } from "react-router-dom";
import NotFound from "./Layout/NotFound";
import HomeCard from "./webApp/HomeCard";
import CreateDeck from "./webApp/Decks/CreateDeck";
import NewCard from "./webApp/Cards/NewCard";
import Deck from "./webApp/Decks/Deck";
import EditCard from "./webApp/Cards/EditCard";
import EditDeck from "./webApp/Decks/EditDeck";
import StudyCard from "./webApp/Cards/Study";


function RootRoutes() {

  return (
    <>
       <Routes>
          <Route path="/" element={<HomeCard />} /> 
          <Route path="/FlashCards" element={<HomeCard />} /> 
          <Route path="/decks/new" element={<CreateDeck />} /> 
          <Route path="/decks/:deckId/" element={<Deck />} />  
          <Route path="/decks/:deckId/study" element={<StudyCard />} />  
          <Route path="/decks/:deckId/edit" element={<EditDeck />} /> 
          <Route path="/decks/:deckId/cards/new" element={<NewCard />} /> 
          <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} /> 
          <Route path="*" element={<NotFound />} /> 
      </Routes>
    </>
  )
};  

export default RootRoutes