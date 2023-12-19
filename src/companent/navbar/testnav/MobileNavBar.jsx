import { useState } from "react";
import * as Icon from "@mui/icons-material";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "./MobileNavBar.scss";
const MobileNavBar = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("access");
  const user = useSelector((state) => state.user.user);
  const [ShowSide, setShowSide] = useState(false);
  const [DropList, setDropList] = useState(false);
  const [DropListLang, setDropListLnag] = useState(false);
  const [stretchSide, setStretchSide] = useState(false);
  const [slideList, setSlideList] = useState(false);
  const [slideListAcc, setSlideListAcc] = useState(false);
  const scrollToBottom = () => {
    const options = {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: 50,
    };
    scroll.scrollToBottom(options);
  };
  const handleLangSelect = () => {
    if (stretchSide) {
      setSlideList(!slideList);
    } else {
      setDropListLnag(!DropListLang);
    }
  };
  return (
    <div className="navbar-test">
      <div className="top-nav-bar">
        <div className="item-top">
          <span>
            <Icon.Mail />
          </span>
          <span>lemondedeoiseaux@gmail.com</span>
        </div>
        <div className="item-top">
          <span>
            <Icon.Phone />
          </span>
          <span>+216-71-564-236</span>
        </div>
      </div>
      <div className="mobile-nav">
        <Link to={"/"} className="link">
          <div className="main-title">
            <img src="" alt="logo" />
            <h1>Le Monde De Oiseaux</h1>
          </div>
        </Link>
        <div
          className={`side-bar-btn ${ShowSide ? "rotat" : ""} `}
          onClick={() => setShowSide(!ShowSide)}
        >
          {!ShowSide ? <Icon.Menu /> : <Icon.Close />}
        </div>
        <div
          className={`nav-item-link ${ShowSide ? "Show" : ""} ${stretchSide ? "stretch-side" : ""
            }`}
        >
          {ShowSide && (
            <div
              className={`Stretch ${stretchSide ? "left-abit" : ""}`}
              onClick={() => {
                setStretchSide(!stretchSide);
                setSlideList(false);
              }}
            >
              <Icon.ArrowForwardIos
                className={`Icon-strech ${stretchSide ? "rot" : ""}`}
              />
            </div>
          )}
          <ul className={`${stretchSide ? "stretch-side" : ""}`}>
            {/* {token && <li>Profile</li>} */}
            <Link to={"/"} className="link" onClick={() => setShowSide(false)} >
              <li>
                <Icon.Home /> <p> {t("Boutique")}</p>
              </li>
            </Link>
            <li onClick={() => { scrollToBottom(); setShowSide(false) }} >
              <span>
                <Icon.ChatSharp />
              </span>
              <p>Contact</p>
            </li>
            <Link className="link" to="/produits/Chien" onClick={() => setShowSide(false)}>
              <li>
                <span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                  >
                    <path d="M21 6h-2l-1.27-1.27A2.49 2.49 0 0016 4h-2.5A2.64 2.64 0 0011 2v6.36a4.38 4.38 0 001.13 2.72 6.57 6.57 0 004.13 1.82l3.45-1.38a3 3 0 001.73-1.84L22 8.15a1.06 1.06 0 000-.31V7a1 1 0 00-1-1zm-5 2a1 1 0 111-1 1 1 0 01-1 1z" />
                    <path d="M11.38 11.74A5.24 5.24 0 0110.07 9H6a1.88 1.88 0 01-2-2 1 1 0 00-2 0 4.69 4.69 0 00.48 2A3.58 3.58 0 004 10.53V22h3v-5h6v5h3v-8.13a7.35 7.35 0 01-4.62-2.13z" />
                  </svg>
                </span>
                <p> {t("Chien")}</p>
              </li>
            </Link>
            <Link className="link" to="/produits/Chat" onClick={() => setShowSide(false)}>
              <li>
                <span>
                  <svg
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                  >
                    <path d="M288 192h17.1c22.1 38.3 63.5 64 110.9 64 11 0 21.8-1.4 32-4v228c0 17.7-14.3 32-32 32s-32-14.3-32-32V339.2L248 448h56c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-53 0-96-43-96-96V192.5c0-16.1-12-29.8-28-31.8l-7.9-1C10.5 157.6-1.9 141.6.2 124s18.2-30 35.7-27.8l7.9 1c48 6 84.1 46.8 84.1 95.3v85.3c34.4-51.7 93.2-85.8 160-85.8zm160 26.5c-10 3.5-20.8 5.5-32 5.5-28.4 0-54-12.4-71.6-32-3.7-4.1-7-8.5-9.9-13.2C325.3 164 320 146.6 320 128V10.7C320 4.8 324.7.1 330.6 0h.2c3.3 0 6.4 1.6 8.4 4.2v.1l12.8 17 27.2 36.3L384 64h64l4.8-6.4L480 21.3l12.8-17v-.1c2-2.6 5.1-4.2 8.4-4.2h.2c5.9.1 10.6 4.8 10.6 10.7V128c0 17.3-4.6 33.6-12.6 47.6-11.3 19.8-29.6 35.2-51.4 42.9zM400 128c0-8.8-7.2-16-16-16s-16 7.2-16 16 7.2 16 16 16 16-7.2 16-16zm48 16c8.8 0 16-7.2 16-16s-7.2-16-16-16-16 7.2-16 16 7.2 16 16 16z" />
                  </svg>
                </span>
                <p> {t("Chats")}</p>
              </li>
            </Link>
            <Link className="link" to="/produits/Oiseaux" onClick={() => setShowSide(false)}>
              <li>
                <span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                  >
                    <path d="M23 11.5l-3.05-1.13c-.26-1.15-.91-1.81-.91-1.81a4.189 4.189 0 00-5.93 0l-1.48 1.48L5 3c-1 4 0 8 2.45 11.22L2 19.5s8.89 2 14.07-2.05c2.76-2.16 3.38-3.42 3.77-4.75L23 11.5m-5.29.22c-.39.39-1.03.39-1.42 0a.996.996 0 010-1.41c.39-.39 1.03-.39 1.42 0 .39.39.39 1.02 0 1.41z" />
                  </svg>
                </span>
                <p> {t("Oiseaux")}</p>
              </li>
            </Link>
            {!token ? (
              <Link className="link" to="/Connexion" onClick={() => setShowSide(false)}>
                <li>
                  <span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                    >
                      <path d="M10 17v-3H3v-4h7V7l5 5-5 5m0-15h9a2 2 0 012 2v16a2 2 0 01-2 2h-9a2 2 0 01-2-2v-2h2v2h9V4h-9v2H8V4a2 2 0 012-2z" />
                    </svg>
                  </span>
                  <p> Connexion</p>
                </li>
              </Link>
            ) : (
              <Link className="link" to={`/profile/{user.id}`} onClick={() => setShowSide(false)}>
                <li>
                  <span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>
                  </span>
                  <p> Profile</p>
                </li>
              </Link>
            )}
            <div className="drop-item">
              <Link to={"/order-mobile"} className="link" onClick={() => setShowSide(false)}>
                <li>
                  <span>
                    <Icon.ShoppingCart />
                  </span>
                  <p>{t("Pannier")}</p>
                </li>
              </Link>
              <div className="btn-show" onClick={handleLangSelect}>
                <span>
                  <Icon.Language />
                </span>
                <p>Lang</p>
                <span>
                  <Icon.ArrowForwardIos
                    className={`icon-arrow-drop ${DropListLang ? "IsDroped" : ""
                      } `}
                  />
                </span>
              </div>
              {stretchSide && (
                <CSSTransition>
                  <div
                    className={`strectch-list-lang ${slideList ? "slide" : ""}`}
                  >
                    <li onClick={() => i18n.changeLanguage("en")}>EN-en</li>
                    <li onClick={() => i18n.changeLanguage("fr")}>FR-fr</li>
                  </div>
                </CSSTransition>
              )}
              <CSSTransition in={DropListLang} timeout={100} classNames="drop">
                <>
                  <div
                    className="drop-down-list"
                    style={{
                      display: !DropListLang ? "none" : "",
                      transition: "all 0.5s ease",
                    }}
                  >
                    <ol onClick={() => i18n.changeLanguage("en")}>EN-en</ol>
                    <ol onClick={() => i18n.changeLanguage("fr")}>FR-fr</ol>
                  </div>
                </>
              </CSSTransition>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNavBar;
