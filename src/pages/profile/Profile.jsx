import React, { useState, useEffect } from "react";
import { Navbar, RestaurantRecords } from "../../components/index";
import "./Profile.scss";

const Profile = (props) => {
  // MAIN STATES
  const [nameInput, setNameInput] = useState("");

  return (
    <div class="Profile">
      <Navbar />
      <div className="Profile-MainContainer">
        <div className="info">
          <div className="slika"></div>
          <div className="intro">
            Minnie Mickey and his pals are cooking up wonderful meals at more
            than 270 restaraunts throughout the Walt Disney World Resort. These
            include a variety of signature, table-service, counter-service,
            lounges, and kiosk locations Ever wonder what percentage of Disney's
            dining offerings you've experienced? <br />
            Here's a fun tool to it figure out.
          </div>
          <div className="explenation">
            This tool started as a post on
            <a
              href="https://web.archive.org/web/20150214041431/http://www.disboards.com/threads/are-you-a-disney-foodie-go-for-the-golden-spoon.3232354/"
              target="_blank"
            >
              DISboards
            </a>
            . Check it out and share your results using the BB-Code generator at
            the bottom of the page! <br />
            <br />
            While Walt Disney World has many additional places to grab something
            to eat or drink, this list focuses on those locations that can be
            considered a "meal." In some cases, it was a tough call to determine
            whether a location offers only snacks or if its menu constitutes a
            meal. <br />
            For example, the Refreshment Coolpost in Epcot's World Showcase has
            a hot dog on its menu. Everything else on the menu is truly a snack
            item. Herbie's Drive-In at Disney's Hollywood Studios also has a
            menu that includes just snacks and hot dogs. However, Herbie's menu
            offers hot dogs, chili dogs, corn dogs, and polish sausages. In the
            case of Coolpost, I decided the hot dog was intended as a snack. For
            Herbie's, I decided it was a meal. It works both ways. Ghirardelli's
            in Downtown Disney, for example, has nothing but ice cream on their
            menu. It's an iconic location, though, and how could any list of
            Disney dining experiences exclude it? I included it. In the end, it
            was very subjective. If there's a restaurant I didn't include that
            you disagree with, go ahead and add it using the bonus section.
            <br />
            <br /> Restaurants at Vero Beach and Shades of Green have been
            included, however, not everyone can visit these locations. If you're
            not a DVC Member or a member of the military, click the check box
            next to the respective resorts to exclude them from the count.
            <br />
            <br />
            <i>
              See how close you can get to "The Golden Spoon," and proudly
              display your progress in your signature on your favorite Disney
              boards.
            </i>
            <br /> A variety of profile badges have been created.
          </div>
          <h1>Dave's Golden Spoon Generator</h1>
          <h4>Indicate the restaraunts you've tried</h4>
          <br /> <br />
          <br />
          <p>
            In the table that follows, mark the restaurants you've eaten at and
            the ones you plan to try real soon. If you have some favorite
            places, mark those, too. They'll get special recognition in your
            list.
          </p>
        </div>
        <div className="restaurants">
          <RestaurantRecords />
        </div>
      </div>
    </div>
  );
};

export default Profile;
