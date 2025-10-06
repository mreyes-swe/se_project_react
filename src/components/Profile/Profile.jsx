import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, onGarmentClick, onAddNewClick }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onGarmentClick={onGarmentClick}
        onAddNewClick={onAddNewClick}
      />
    </section>
  );
}

export default Profile;
