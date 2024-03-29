import { useState, useEffect, useRef, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Typewriter from 'typewriter-effect';

const SettingWindow = ({ currentSetting, currentText, makeChoiceHandler }) => {
  const [settingChange, setSettingChange] = useState();

  const showChoicesHandler = () => {
    setSettingChange(false);
    setTimeout(() => {
      setSettingChange(true);
    }, 3000);
  };

  useEffect(() => {
    showChoicesHandler();
  }, [currentText.text]);

  return (
    <>
      <div className="setting-container" key={uuidv4()}>
        <div className="setting-image-container" key={uuidv4()}>
          <div
            className="setting-image-background"
            style={{
              backgroundImage: `url('${currentSetting.background_pic}')`,
            }}
            key={uuidv4()}
          ></div>
        </div>
      </div>
      <div className="container col-10 mt-3" key={uuidv4()}>
        <div style={{ fontSize: '20px', textAlign: 'center' }} key={uuidv4()}>
          {/* <Typewriter
            options={{
              strings: currentText.text,
              autoStart: true,
              delay: 20,
              pauseFor: 1000,
            }}
          /> */}
          {currentText.text}
        </div>
        {settingChange && (
          <div className="choices-container container mt-5 mb-0" key={uuidv4()}>
            {currentText &&
              currentText.choices.map((value) => (
                <div className="mt-3 container text-start" key={uuidv4()}>
                  <button
                    className="game-button"
                    id={value.dialogue_id_to}
                    onClick={makeChoiceHandler}
                    key={value.dialogue_id_to}
                  >
                    {value.choice_text}
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SettingWindow;
