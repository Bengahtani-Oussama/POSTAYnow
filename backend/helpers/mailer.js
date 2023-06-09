const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const { OAuth2 } = google.auth;
const oauth_link = 'https://developers.google.com/oauthplayground';
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link
);

exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });

  const mySite = process.env.BASE_URL;

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: 'POSTAY Email Verification',
    html: `  <div
    class="container"
    style="
     
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: Cambria, Cochin, Georgia, Times, serif;
    "
  >
    <div class="logo">
      <img
        alt="LOGO"
        src="https://res.cloudinary.com/postay/image/upload/v1679864464/2_otvr35.png"
        style="width: 175px; height: 80px"
      />
    </div>
    <div
      class="card"
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 1rem 0;
        padding: 0 25px;
        width: 400px;
        height: 300px;
        border-radius: 10px;
        box-shadow: 0px 1px 10px 1px #dabb89;
      "
    >
      <img
        src="https://ci5.googleusercontent.com/proxy/XacXXq-Nm83mVWJHxkbMz2o3chqNg4OjGxbCwyvzoiQizBnFU9NkQZMszRU2VWoA7JVrKhORfKr00YJJ6ovAXBinaJhVX8Awrj0=s0-d-e1-ft#https://www.gstatic.com/gumdrop/files/security-logo.png"
        alt="verification logo"
        style="width: 50px"
      />
      <p
        style="
          display: flex;
          align-items: center;
          gap: 3px;
          color: #d38300;
          font-weight: 600;
        "
      >
        Action requite : Activate your
        <img
          src="https://res.cloudinary.com/postay/image/upload/v1679864463/6_skcmwm.png"
          alt="POSTAY"
          style="width: 30px"
        />
        POSTAY account
      </p>
      <p style="text-align: center">
        You recently created an account on POSTAY To complete your
        registration confirm your Account.
      </p>
      <a
        href=${url}
        style="
          text-decoration: none;
          color: #fff;
          background-color: #d38300;
          padding: 8px 15px;
          border-radius: 5px;
          transition-duration: 500ms;
        "
        >Confirm your Account</a
      >
    </div>
    <div
      class="card"
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 1rem 0;
        padding: 0 25px;
        width: 400px;
        height: 300px;
        border-radius: 10px;
        box-shadow: 0px 1px 10px 1px #dabb89;
      "
    >
      <h2>Hello ${name} ,</h2>
      <p style="text-align: center">
        Welcome to POSTAY. Your new account allows you to communicate with
        many friends around the world.
      </p>
      <p style="text-align: center">
        Here are some tips to help you get started with the account.
      </p>
      <a
        href=${mySite}
        style="
          text-decoration: none;
          color: #fff;
          background-color: #d38300;
          padding: 8px 15px;
          border-radius: 5px;
          transition-duration: 500ms;
        "
        >Click Here</a
      >
    </div>
    <div
      class="card"
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 1rem 0;
        padding: 0 25px;
        width: 400px;
        height: 300px;
        border-radius: 10px;
        box-shadow: 0px 1px 10px 1px #dabb89;
      "
    >
      <img
        src="https://res.cloudinary.com/postay/image/upload/v1679873597/downloads_swonbj.png"
        alt="Get answers"
        style="width: 50px; margin-left: 30px"
      />
      <h2>DOWNLOAD</h2>
      <p style="text-align: center">
        You can download the POSTAY application for free through the following
        systems
      </p>
      <div style="display: flex; justify-content: space-around; width: 100%">
        <div
          style="
            width: 130px;
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #fff;
            gap: 8px;
            background-color: #d38300;
            padding: 5px 10px;
            border-radius: 5px;
            transition-duration: 500ms;
            cursor: pointer;
          "
        >
          <img
            src="https://res.cloudinary.com/postay/image/upload/v1679870915/logo_apple__cltlfa7xve82_large_s5afa8.png"
            alt=""
            style="width: 20px"
          />
          <span>For Appel</span>
        </div>
        <div
          style="
            width: 130px;
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #fff;
            gap: 8px;
            padding: 5px 10px;
            background-color: #d38300;
            border-radius: 5px;
            transition-duration: 500ms;
            cursor: pointer;
          "
        >
          <img
            src="https://res.cloudinary.com/postay/image/upload/v1679871101/android_hbjssi.png"
            alt=""
            style="width: 20px"
          />
          <span>For Android</span>
        </div>
      </div>
    </div>

    <div
      class="card footer"
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 1rem 0;
        padding: 0 25px;
        width: 400px;
        height: 300px;
        border-radius: 10px;
        box-shadow: 0px 1px 10px 1px #dabb89;
      "
    >
      <img
        src="https://ci6.googleusercontent.com/proxy/TG_73bo5A1Pc1eIFk1TAgBGRHrAxzmsZtnlBz_y4U-yzDejAl40oW7wfvtFyTe-l9j20EIjv6_VepwVe3yiziWWUFAzYs4O1rvOCHxvbbeDFVMKl=s0-d-e1-ft#https://www.gstatic.com/images/branding/product/2x/email_64dp.png"
        alt="Get answers"
        style="width: 50px"
      />
      <h2>Get answers</h2>
      <p>
        Please go to the
        <a href=${mySite} style="color: #d38300; text-decoration: none"
          >Help Center</a
        >
        to learn all about your new
        <a href=${mySite} style="color: #d38300; text-decoration: none"
          >POSTAY</a
        >
        Account.
      </p>
    </div>
    <span style="color: gray; font-size: 12px; margin: 15px 0"
      >You received this email because you created a
      <a href=${mySite} style="color: #d38300; text-decoration: none"
        >POSTAY</a
      >
      Account.</span
    >
  </div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};

exports.sendResetCode = (email, name, code) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });

  const mySite = process.env.BASE_URL;

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: 'Reset POSTAY Password',
    html: `  <div
    class="container"
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: Cambria, Cochin, Georgia, Times, serif;
    "
  >
    <div class="logo">
      <img
        alt="LOGO"
        src="https://res.cloudinary.com/df9iy1rz7/image/upload/v1679864466/4_c2sapr.png"
        style="width: 175px; height: 80px"
      />
    </div>
    <div
      class="card"
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 1rem 0;
        padding: 0 25px;
        width: 400px;
        height: 300px;
        border-radius: 10px;
        box-shadow: 0px 1px 10px 1px #dabb89;
      "
    >
      <img
        src="https://ci5.googleusercontent.com/proxy/XacXXq-Nm83mVWJHxkbMz2o3chqNg4OjGxbCwyvzoiQizBnFU9NkQZMszRU2VWoA7JVrKhORfKr00YJJ6ovAXBinaJhVX8Awrj0=s0-d-e1-ft#https://www.gstatic.com/gumdrop/files/security-logo.png"
        alt="verification logo"
        style="width: 50px"
      />
      Action requite :<br /><br />
      <p
        style="
          display: flex;
          align-items: center;
          gap: 3px;
          color: #d38300;
          font-weight: 600;
        "
      >
        Code to reset your
        <img
          src="https://res.cloudinary.com/df9iy1rz7/image/upload/c_scale,w_64/v1679864463/6_skcmwm.png"
          alt="POSTAY"
          style="width: 30px"
        />
        POSTAY account Paswword
      </p>
      <p style="text-align: center">
        You recently created an account on POSTAY, copy the following code to
        create a new password
      </p>
      <p
        style="
          text-decoration: none;
          color: #fff;
          background-color: #d38300;
          padding: 8px 15px;
          border-radius: 5px;
          transition-duration: 500ms;
        "
      >
        ${code}
      </p>
    </div>
    <div
      class="card"
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 1rem 0;
        padding: 0 25px;
        width: 400px;
        height: 300px;
        border-radius: 10px;
        box-shadow: 0px 1px 10px 1px #dabb89;
      "
    >
      <h2>Hello ${name} ,</h2>
      <p style="text-align: center">
        Welcome to POSTAY. Your new account allows you to communicate with
        many friends around the world.
      </p>
      <p style="text-align: center">
        Here are some tips to help you get started with the account.
      </p>
      <a
        href="${mySite}"
        style="
          text-decoration: none;
          color: #fff;
          background-color: #d38300;
          padding: 8px 15px;
          border-radius: 5px;
          transition-duration: 500ms;
        "
        >Click Here</a
      >
    </div>
    <div
      class="card"
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 1rem 0;
        padding: 0 25px;
        width: 400px;
        height: 300px;
        border-radius: 10px;
        box-shadow: 0px 1px 10px 1px #dabb89;
      "
    >
      <img
        src="https://res.cloudinary.com/df9iy1rz7/image/upload/v1679873597/downloads_swonbj.png"
        alt="Get answers"
        style="width: 50px; margin-left: 30px"
      />
      <h2>DOWNLOAD</h2>
      <p style="text-align: center">
        You can download the POSTAY application for free through the following
        systems
      </p>
      <div style="display: flex; justify-content: space-around; width: 100%">
        <div
          style="
            width: 130px;
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #fff;
            gap: 8px;
            background-color: #d38300;
            padding: 5px 10px;
            border-radius: 5px;
            transition-duration: 500ms;
            cursor: pointer;
          "
        >
          <img
            src="https://res.cloudinary.com/df9iy1rz7/image/upload/c_limit,h_32,w_32/v1679870915/logo_apple__cltlfa7xve82_large_s5afa8.png"
            alt=""
          />
          <span>For Appel</span>
        </div>
        <div
          style="
            width: 130px;
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #fff;
            gap: 8px;
            padding: 5px 10px;
            background-color: #d38300;
            border-radius: 5px;
            transition-duration: 500ms;
            cursor: pointer;
          "
        >
          <img
            src="https://res-console.cloudinary.com/df9iy1rz7/thumbnails/transform/v1/image/upload/Y19zY2FsZSx3XzMy/v1679871101/YW5kcm9pZF9oYmpzc2k=/template_primary"
            alt=""
          />
          <span>For Android</span>
        </div>
      </div>
    </div>

    <div
      class="card footer"
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 1rem 0;
        padding: 0 25px;
        width: 400px;
        height: 300px;
        border-radius: 10px;
        box-shadow: 0px 1px 10px 1px #dabb89;
      "
    >
      <img
        src="https://ci6.googleusercontent.com/proxy/TG_73bo5A1Pc1eIFk1TAgBGRHrAxzmsZtnlBz_y4U-yzDejAl40oW7wfvtFyTe-l9j20EIjv6_VepwVe3yiziWWUFAzYs4O1rvOCHxvbbeDFVMKl=s0-d-e1-ft#https://www.gstatic.com/images/branding/product/2x/email_64dp.png"
        alt="Get answers"
        style="width: 50px"
      />
      <h2>Get answers</h2>
      <p>
        Please go to the
        <a href="${mySite}" style="color: #d38300; text-decoration: none"
          >Help Center</a
        >
        to learn all about your new
        <a href="${mySite}" style="color: #d38300; text-decoration: none"
          >POSTAY</a
        >
        Account.
      </p>
    </div>
    <span style="color: gray; font-size: 12px; margin: 15px 0"
      >You received this email because you created a
      <a href="${mySite}" style="color: #d38300; text-decoration: none"
        >POSTAY</a
      >
      Account.</span
    >
  </div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
