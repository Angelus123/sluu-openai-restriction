const nodemailer =require('nodemailer')
/**
 * Send email middleware
 */
export const sendEmail = async options => {
/**
 * create atransporter
 */
    const transporter =nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,

        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD 
        }

  /**
   * Activate in gmail "less secure app" opion
   */

        })
  /**
   * Define email options
   */
    const mailOptions = {
        from: 'izere123@iz.io',
        to: options.email,
        subject:options.subject,
        text: options.message
    }
  /**
   * Actualy send email
   */

    await transporter.sendMail(mailOptions)

}