import LogoSrc from "../images/logo.png";
import BgRemoveLogo from "../images/logo_bg_removed.png";
const Logo = ({ removedBackground, style }) => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <img src={removedBackground ? BgRemoveLogo : LogoSrc} style={style} />
  </div>
);
export default Logo;
