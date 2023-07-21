import { Button } from "@mui/material";
import Bio from "@mui/icons-material/ContactEmergency";
import { useEffect, useState } from "react";
import WorkIcon from "@mui/icons-material/WorkTwoTone";
import DownhillIcon from "@mui/icons-material/DownhillSkiingTwoTone";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import CurrentCityIcon from "@mui/icons-material/HomeWorkTwoTone";
import RelationshipIcon from "@mui/icons-material/Diversity1TwoTone";
import BadgeIcon from "@mui/icons-material/BadgeTwoTone";
import FeatureIcon from "@mui/icons-material/CelebrationTwoTone";
import { Link } from "react-router-dom";
import Sending from "../../svg/sending";
import Close from "../../svg/close";
import { getError } from "../../utils/error/error";
import axios from "axios";
import { useSelector } from "react-redux";
import ADD from "../../svg/add";
import CreateDetails from "../../components/profile/CreateDetails";

export default function ProfileBio({
  detail,
  visitor,
  setOtherName,
  username,
  loading,
}) {
  const { user } = useSelector((state) => ({ ...state }));
  const [details, setDetails] = useState();

  // console.log('user', user);
  // console.log('details', details);
  const initialDetails = {
    bio: details?.bio ? details?.bio : "",
    otherName: details?.otherName ? details.otherName : "",
    job: details?.job ? details.job : "",
    workplace: details?.workplace ? details.workplace : "",
    highSchool: details?.highSchool ? details.highSchool : "",
    college: details?.college ? details.college : "",
    currentCity: details?.currentCity ? details.currentCity : "",
    hometown: details?.hometown ? details.hometown : "",
    relationship: details?.relationship ? details.relationship : "",
    facebook: details?.facebook ? details.facebook : "",
    instagram: details?.instagram ? details.instagram : "",
    youtube: details?.youtube ? details.youtube : "",
    tiktok: details?.tiktok ? details.tiktok : "",
    twitter: details?.twitter ? details.twitter : "",
    github: details?.github ? details.github : "",
  };

  const [infos, setInfos] = useState(initialDetails);
  const [showBio, setShowBio] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [bioTxt, setBioTxt] = useState("");
  const [error, setError] = useState("");

  const [bioMax, setBioMax] = useState(
    infos?.bio ? 145 - infos.bio.length : 145
  );

  const bioHandleChange = (e) => {
    const { name, value } = e.target;
    setInfos({ ...infos, [name]: value });
    setDetails({ ...detail, [name]: value });
    setBioMax(145 - e.target.value.length);
  };

  useEffect(() => {
    setDetails(detail);
    setInfos(detail);
  }, [detail]);

  const UpdateDetailsInfo = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
        {
          infos,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setShowBio(false);
      setDetails(data);
      setOtherName(data.otherName);
    } catch (err) {
      setError(getError(err));
    }
  };
  // console.log('infos :', infos);
  // console.log(details.map((item) => item));

  return (
    <div className="profile_post_left_bio  card">
      <div className="profile_left_header">Introduction :</div>
      <div className="profile_left_bio">
        {!visitor ? (
          <div className="add_bio_btn w-100">
            <span>{details?.bio ? details?.bio : "No Bio Yet"}</span>
            {!showBio && (
              <Button
                fullWidth
                color="warning"
                startIcon={<Bio />}
                onClick={() => setShowBio(true)}
              >
                {details?.bio ? "Edit Bio" : "New Bio"}
              </Button>
            )}
          </div>
        ) : (
          <>
            {loading ? (
              "loading..."
            ) : (
              <div className="profile_NoBio_text">
                {username} Does not have a bio yet
              </div>
            )}
          </>
        )}

        {showBio && (
          <div className="input_text_edit_bio">
            <textarea
              placeholder={`${
                details?.bio ? "Edit Your Bio" : "Create new bio"
              }`}
              name="bio"
              value={details?.bio}
              maxLength={145}
              onChange={(e) => bioHandleChange(e)}
            />
            <div className="character">{bioMax} character remaining</div>
            <div className="btn_edit_bio">
              <Button
                color="warning"
                startIcon={<Close color={"#ff5d00"} />}
                onClick={() => setShowBio(false)}
              >
                Cancel
              </Button>
              <Button
                color="warning"
                startIcon={<Sending color={"#ff5d00"} />}
                onClick={() => UpdateDetailsInfo()}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="profile_bio_info">
        <div className="profile_bio_items">
          {!details?.otherName &&
            !details?.job &&
            !details?.workplace &&
            !details?.highSchool &&
            !details?.college &&
            !details?.currentCity &&
            !details?.hometown &&
            !details?.relationship &&
            !details?.facebook &&
            !details?.instagram &&
            !details?.youtube &&
            !details?.tiktok &&
            !details?.twitter &&
            !details?.github &&
            !visitor && (
              <div className="profile_NoBio_text">You can add your details</div>
            )}
          {details?.job && details?.workplace ? (
            <div className="profile_bio_item">
              <div className="profile_bio_img">
                <WorkIcon color="warning" />
              </div>
              <div className="profile_bio_text">
                Work as {details?.job} at <b>{details?.workplace}</b>
              </div>
            </div>
          ) : details?.job && !details?.workplace ? (
            <div className="profile_bio_item">
              <div className="profile_bio_img">
                <WorkIcon color="warning" />
              </div>
              <div className="profile_bio_text">Work as {details?.job}</div>
            </div>
          ) : !details?.job && details?.workplace ? (
            <div className="profile_bio_item">
              <div className="profile_bio_img">
                <WorkIcon color="warning" />
              </div>
              <div className="profile_bio_text">
                Work at <b>{details?.workplace}</b>
              </div>
            </div>
          ) : (
            ""
          )}
          {details?.highSchool && (
            <div className="profile_bio_item">
              <div className="profile_bio_img">
                <SchoolTwoToneIcon color="warning" />
              </div>
              <div className="profile_bio_text">
                Studied at <b>{details?.highSchool}</b>
              </div>
            </div>
          )}
          {details?.college && (
            <div className="profile_bio_item">
              <div className="profile_bio_img">
                <SchoolTwoToneIcon color="warning" />
              </div>
              <div className="profile_bio_text">
                Studied at <b>{details?.college}</b>
              </div>
            </div>
          )}
          {details?.relationship && (
            <div className="profile_bio_item">
              <div className="profile_bio_img">
                <RelationshipIcon color="warning" />
              </div>
              <div className="profile_bio_text">
                Relationship : <b>{details?.relationship}</b>
              </div>
            </div>
          )}
          {details?.currentCity && (
            <div className="profile_bio_item">
              <div className="profile_bio_img">
                <CurrentCityIcon color="warning" />
              </div>
              <div className="profile_bio_text">
                Lives at : <b>{details?.currentCity}</b>
              </div>
            </div>
          )}
          {details?.hometown && (
            <div className="profile_bio_item">
              <div className="profile_bio_img">
                <CurrentCityIcon color="warning" />
              </div>
              <div className="profile_bio_text">
                Home Town : <b>{details?.hometown}</b>
              </div>
            </div>
          )}
          {details?.facebook && (
            <Link
              to={`https://www.facebook.com/${details?.facebook}`}
              className="profile_bio_item"
            >
              <div className="profile_bio_img">
                <img src="/left/facebook.png" alt="facebook" />
              </div>
              <div className="profile_bio_text">
                facebook : <b>{details?.facebook}</b>
              </div>
            </Link>
          )}
          {details?.instagram && (
            <Link
              to={`https://www.instagram.com/${details?.instagram}`}
              className="profile_bio_item"
            >
              <div className="profile_bio_img">
                <img src="/left/instagram.png" alt="instagram" />
              </div>
              <div className="profile_bio_text">
                instagram : <b>{details?.instagram}</b>
              </div>
            </Link>
          )}
          {details?.youtube && (
            <Link
              to={`https://www.youtube.com/${details?.youtube}`}
              className="profile_bio_item"
            >
              <div className="profile_bio_img">
                <img src="/left/youtube.png" alt="youtube" />
              </div>
              <div className="profile_bio_text">
                youtube : <b>{details?.youtube}</b>
              </div>
            </Link>
          )}
          {details?.tiktok && (
            <Link
              to={`https://www.tiktok.com/${details?.tiktok}`}
              className="profile_bio_item"
            >
              <div className="profile_bio_img">
                <img src="/left/tiktok.png" alt="tiktok" />
              </div>
              <div className="profile_bio_text">
                tiktok : <b>{details?.tiktok}</b>
              </div>
            </Link>
          )}
          {details?.twitter && (
            <Link
              to={`https://www.twitter.com/${details?.twitter}`}
              className="profile_bio_item"
            >
              <div className="profile_bio_img">
                <img src="/left/twitter.png" alt="twitter" />
              </div>
              <div className="profile_bio_text">
                twitter : <b>{details?.twitter}</b>
              </div>
            </Link>
          )}
          {details?.github && (
            <Link
              to={`https://www.github.com/${details?.github}`}
              className="profile_bio_item"
            >
              <div className="profile_bio_img">
                <img src="/left/github.png" alt="github" />
              </div>
              <div className="profile_bio_text">
                github : <b>{details?.github}</b>
              </div>
            </Link>
          )}
        </div>
        {!visitor && (
          <div className="profile_bios">
            {showDetails && (
              <div className="blur">
                <div className="add_details_wrapper">
                  <div className="add_details_header">
                    {!details?.otherName &&
                    !details?.job &&
                    !details?.workplace &&
                    !details?.highSchool &&
                    !details?.college &&
                    !details?.currentCity &&
                    !details?.hometown &&
                    !details?.relationship &&
                    !details?.facebook &&
                    !details?.instagram &&
                    !details?.youtube &&
                    !details?.tiktok &&
                    !details?.twitter &&
                    !details?.github ? (
                      <div className="add_details_header_txt">
                        Add New Details
                      </div>
                    ) : (
                      <div className="add_details_header_txt">Edit Details</div>
                    )}
                    <i
                      className="exit_icon"
                      onClick={() => setShowDetails(false)}
                    ></i>
                  </div>
                  <div className="add_details_infos">
                    <div className="add_details_text">
                      Customize your details easily
                    </div>
                    <div className="add_details_">
                      <CreateDetails
                        header="Other Name"
                        placeholder="Add your other name"
                        icon="otherName"
                        value={infos?.otherName}
                        setShowDetails={setShowDetails}
                        bioHandleChange={bioHandleChange}
                        UpdateDetailsInfo={UpdateDetailsInfo}
                      />
                      <CreateDetails
                        header="Your job"
                        placeholder="Add your Your job"
                        icon="job"
                        value={infos?.job}
                        setShowDetails={setShowDetails}
                        bioHandleChange={bioHandleChange}
                        UpdateDetailsInfo={UpdateDetailsInfo}
                      />
                      <CreateDetails
                        header="Workplace"
                        placeholder="Add your Workplace"
                        icon="workplace"
                        value={infos?.workplace}
                        setShowDetails={setShowDetails}
                        bioHandleChange={bioHandleChange}
                        UpdateDetailsInfo={UpdateDetailsInfo}
                      />
                      <CreateDetails
                        header="High School"
                        placeholder="Add your high school"
                        icon="highSchool"
                        value={infos?.highSchool}
                        setShowDetails={setShowDetails}
                        bioHandleChange={bioHandleChange}
                        UpdateDetailsInfo={UpdateDetailsInfo}
                      />
                      <CreateDetails
                        header="College"
                        placeholder="Add your college"
                        icon="college"
                        value={infos?.college}
                        setShowDetails={setShowDetails}
                        bioHandleChange={bioHandleChange}
                        UpdateDetailsInfo={UpdateDetailsInfo}
                      />
                      <CreateDetails
                        header="Current City"
                        placeholder="Add your current city"
                        icon="currentCity"
                        value={infos?.currentCity}
                        setShowDetails={setShowDetails}
                        bioHandleChange={bioHandleChange}
                        UpdateDetailsInfo={UpdateDetailsInfo}
                      />
                      <CreateDetails
                        header="Hometown"
                        placeholder="Add your home town"
                        icon="hometown"
                        value={infos?.hometown}
                        setShowDetails={setShowDetails}
                        bioHandleChange={bioHandleChange}
                        UpdateDetailsInfo={UpdateDetailsInfo}
                      />
                      <CreateDetails
                        relation
                        header="Relationship"
                        placeholder="Add your relationship"
                        icon="relationship"
                        value={infos?.relationship}
                        setShowDetails={setShowDetails}
                        bioHandleChange={bioHandleChange}
                        UpdateDetailsInfo={UpdateDetailsInfo}
                      />
                      <CreateDetails
                        header="Facebook"
                        placeholder="Add your facebook"
                        icon="facebook"
                        value={infos?.facebook}
                        setShowDetails={setShowDetails}
                        bioHandleChange={bioHandleChange}
                        UpdateDetailsInfo={UpdateDetailsInfo}
                      />
                      <CreateDetails
                        header="Instagram"
                        placeholder="Add your instagram"
                        icon="instagram"
                        value={infos?.instagram}
                        setShowDetails={setShowDetails}
                        bioHandleChange={bioHandleChange}
                        UpdateDetailsInfo={UpdateDetailsInfo}
                      />
                      <CreateDetails
                        header="Youtube"
                        placeholder="Add your youtube"
                        icon="youtube"
                        value={infos?.youtube}
                        setShowDetails={setShowDetails}
                        bioHandleChange={bioHandleChange}
                        UpdateDetailsInfo={UpdateDetailsInfo}
                      />
                      <CreateDetails
                        header="Tiktok"
                        placeholder="Add your tiktok"
                        icon="tiktok"
                        value={infos?.tiktok}
                        setShowDetails={setShowDetails}
                        bioHandleChange={bioHandleChange}
                        UpdateDetailsInfo={UpdateDetailsInfo}
                      />
                      <CreateDetails
                        header="Twitter"
                        placeholder="Add your twitter"
                        icon="twitter"
                        value={infos?.twitter}
                        setShowDetails={setShowDetails}
                        bioHandleChange={bioHandleChange}
                        UpdateDetailsInfo={UpdateDetailsInfo}
                      />
                      <CreateDetails
                        header="Github"
                        placeholder="Add your github"
                        icon="github"
                        value={infos?.github}
                        setShowDetails={setShowDetails}
                        bioHandleChange={bioHandleChange}
                        UpdateDetailsInfo={UpdateDetailsInfo}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="add_bio_btn w-100">
              <Button
                fullWidth
                color="warning"
                startIcon={<BadgeIcon />}
                onClick={() => setShowDetails(true)}
              >
                Edit Details
              </Button>
            </div>
            <div className="add_bio_btn w-100">
              <Button fullWidth color="warning" startIcon={<DownhillIcon />}>
                Add Hobbies
              </Button>
            </div>
            <div className="add_bio_btn w-100">
              <Button fullWidth color="warning" startIcon={<FeatureIcon />}>
                Add Featured
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// otherName
// job
// workplace
// highSchool
// college
// currentCity
// hometown
// relationship
// facebook
// instagram
// youtube
// tiktok
// twitter
// github
