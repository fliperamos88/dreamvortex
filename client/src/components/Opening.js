import { useState, useEffect, useRef, useContext } from 'react';
import { Audio, ButtonClick } from './Audio';
import Button from './Button';
import Agreement from './Agreement';
import MainMenu from './MainMenu';
import { currentPlayerContext } from '../helpers/GameContext';

const Opening = () => {
  const {
    menuDisplay,
    setMenuDisplay,
    currentPlayer,
    setCurrentPlayer,
    skipBTN,
    setSkipBTN,
    gameHandler,
    setGameHandler,
  } = useContext(currentPlayerContext);
  const [visible, setVisible] = useState(false);
  const [openTXT, setOpenTXT] = useState('');
  const [image, setImage] = useState(false);
  const [menu, setMenu] = useState(false);
  const [title, setTitle] = useState(false);
  const [agree, setAgree] = useState();

  const songAudio = useRef();
  const clickAudio = useRef();

  useEffect(() => {
    if (!currentPlayer) {
      const timeout = setTimeout(() => {
        setAgree('pending');
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (currentPlayer) {
      skipOpeningHandler();
    }
  }, [currentPlayer]);

  const skipOpeningHandler = () => {
    setImage(true);
    setTitle(true);
    setMenu(true);
    setAgree('');
  };

  const fn = async (value, time) => {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        setVisible(value);
        resolve();
      }, time)
    );
  };

  useEffect(() => {
    const initialScreen = async () => {
      setOpenTXT('POWERED BY');
      const timeout1 = setTimeout(() => {
        songAudio.current.play();
        setSkipBTN(true);
        setGameHandler((prevState) => ({
          ...prevState,
          handler: skipOpeningHandler,
        }));
      }, 4000);
      await fn(true, 8000);
      await fn(false, 5000);
      setOpenTXT('FELIPE RAMOS PRESENTS');
      await fn(true, 5000);
      await fn(false, 5000);
      setTimeout(() => {
        setImage(true);
      }, 4000);

      const timeout2 = setTimeout(() => {
        setTitle(true);
      }, 14000);
      const timeout3 = setTimeout(() => {
        setSkipBTN(false);
        setMenu(true);
      }, 19000);
      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
      };
    };
    if (agree === 'accepted') {
      initialScreen();
    }
  }, [agree]);

  return (
    <>
      <div className={`d-flex justify-content-center ${menuDisplay} `}>
        <Audio src="audio/MorbidCuriosity.mp3" ref={songAudio} loop={'loop'} />
        <ButtonClick src="audio/buttonsound.mp3" ref={clickAudio} />
        <div className={image ? 'menu' : 'opening-warnings'}>
          {agree === 'pending' ? (
            <>
              <Agreement />{' '}
              <Button
                action={() => {
                  setAgree('accepted');
                  clickAudio.current.play();
                }}
                text="Agree"
              />
            </>
          ) : (
            ''
          )}

          {visible && agree === 'accepted' && (
            <div>
              <h1 className="">{openTXT}</h1>
              {openTXT === 'POWERED BY' && (
                <div className="icons-container container col-4 col-md-2 mt-2">
                  <div className="col-4">
                    <img
                      className="img-fluid"
                      src="https://icons.veryicon.com/png/o/business/vscode-program-item-icon/javascript-3.png"
                      alt="Javascript"
                    />
                  </div>
                  <div className="col-4">
                    <img
                      className="img-fluid"
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                      alt="React"
                    ></img>
                  </div>
                  <div className="col-4">
                    <img
                      className="img-fluid"
                      src="https://cdn.iconscout.com/icon/free/png-256/free-node-js-1174925.png?f=webp"
                      alt="NodeJS"
                    ></img>
                  </div>
                  <div className="col-4">
                    <img
                      className="img-fluid"
                      src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"
                      alt="PostgreSQL"
                    ></img>
                  </div>
                </div>
              )}
            </div>
          )}

          {image && (
            <div className="opening-image-container">
              {title && <div className="game-title">DREAMVORTEX</div>}
              <div
                className="image-background"
                style={{
                  backgroundImage: `url('images/settings/menucityjpg.jpg')`,
                }}
              ></div>
            </div>
          )}

          {menu && <MainMenu clickAudio={clickAudio} />}
        </div>
      </div>
    </>
  );
};

export default Opening;
