import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <aside className="side-bar">
      <div className="side-bar__user-container">
        <img
          src={avatar}
          alt="Terrence Tegegne's Avatar"
          className="side-bar__avatar"
        />
        <p className="side-bar__username">Terrence Tegegne</p>
      </div>
    </aside>
  );
}

export default SideBar;
