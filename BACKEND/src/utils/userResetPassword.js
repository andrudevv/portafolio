
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


function sendEmail(email, token) {
  return new Promise((resolve, reject) => { 
  // Envía un correo con el token
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Recuperación de contraseña",
    html: `
  <html>
    <head>
      <style>
        /* Estilos CSS normales */
        body {
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header-img{
          background-image: url('http://imgfz.com/i/5mVDtlq.png');
        background-color: #007BFF;

          height: 200px;
      }
      .bod {
        color: #ffffff;
        background-color: #007BFF;
        background-image: url('http://imgfz.com/i/Jj6LEgN.png');
        text-align: center;
        /* padding: 10px; */
        height: 300px;
        flex-direction: column;

      }
      .title {
        font-size: 24px;
        margin-top: 5%;
        font-weight: bold;
      }
      .link {
        color: #00ffff;
      }
 
      .footer {
          height: 100px;
        background-color: #007BFF;
        background-size: contain;
          background-image: url('http://imgfz.com/i/TeQwUaD.png');
        
      }
        .parrafo-header{
            color: #ffffff;
            margin-top: 0px;
        }
       
        .parrafo-body{
            margin-top: 10%;
        }
      </style>
    </head>
    <body>
    <div class="container">
      <div class="header-img">
       
        </div>
          <div class="bod"> 
            <p class="parrafo-header">"Innovación que brilla en cada gota. Tu lavadero, nuestra tecnología."</p>
            <h1 class="title">Recuperación de contraseña</h1> 
            <p class="parrafo-body">
            Haga clic en este <a class="link" href="http://localhost:5173/new-password-user/${token}">enlace</a> para restablecer su contraseña.
     
            </p>
          </div>
        <div class="footer">
      </div>
    </div>
    </body>
  </html>
`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      //console.error(error);
      reject(error);
    } else {
      //console.log("Correo de recuperación de contraseña enviado: " , info.response );
      resolve(true);
    }
  });
} );
}

module.exports = sendEmail;