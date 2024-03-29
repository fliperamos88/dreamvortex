import Button from './Button';
import { useState, useEffect, useRef, useContext } from 'react';
import { GameAPI } from '../helpers/GameAPI';
import PlayerForm from './PlayerForm';
import { currentPlayerContext } from '../helpers/GameContext';
import NewStory from './NewStory';
import LoadStory from './LoadStory';

const MainMenu = ({ clickAudio }) => {
  const [login, setLogin] = useState();
  const {
    currentPlayer,
    setCurrentPlayer,
    menuAnimationClass,
    setMenuAnimationClass,
  } = useContext(currentPlayerContext);
  const [newGame, setNewGame] = useState(false);
  const [loadGame, setLoadGame] = useState(false);

  return (
    <>
      <div className="menuOptions">
        {!currentPlayer && !login && (
          <>
            <div
              className="set-id-button mt-5 p-4"
              onClick={() => setLogin('pending')}
            >
              {' '}
              Set Player_ID
            </div>
          </>
        )}
        {login === 'pending' && !newGame && !loadGame && (
          <PlayerForm setLogin={setLogin} clickAudio={clickAudio} />
        )}
        {currentPlayer && !newGame && !loadGame && (
          <div className={`mt-5 ${menuAnimationClass}`}>
            <Button
              addClass="menu-button"
              action={() => {
                setNewGame(true);
                setMenuAnimationClass('regular-menu-container-normal');
              }}
              text="New Game"
            />
            <Button
              addClass="menu-button"
              text="Load Game"
              action={() => {
                setLoadGame(true);
                setMenuAnimationClass('regular-menu-container-normal');
              }}
            />
          </div>
        )}
        {newGame && !loadGame && (
          <NewStory setNewGame={setNewGame} newGame={newGame} />
        )}
      </div>
      {!newGame && loadGame && (
        <LoadStory
          setLoadGame={setLoadGame}
          loadGame={loadGame}
          clickAudio={clickAudio}
        />
      )}
    </>
  );
};

export default MainMenu;
