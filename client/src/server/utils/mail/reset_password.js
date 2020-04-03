const moment = require('moment');
const resetpassword = (token, user, URL) => {

	// const URL = process.env.NODE_ENV === 'production' ? process.env.ROOT_URL : 'http://localhost:3000'
	const time = moment().format('DD MMMM YYYY, hh:mm:ss');
	// console.log(data)
	return `
    <!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
	xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
	<meta charset="utf-8"> <!-- utf-8 works for most cases -->
	<meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
	<meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely -->
	<title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->

	<link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">

	<!-- CSS Reset : BEGIN -->
	<style>
		/* What it does: Remove spaces around the email design added by some email clients. */
		/* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
		html,
		body {
			margin: 0 auto !important;
			padding: 0 !important;
			height: 100% !important;
			width: 100% !important;
			background: #f1f1f1;
		}

		/* What it does: Stops email clients resizing small text. */
		* {
			-ms-text-size-adjust: 100%;
			-webkit-text-size-adjust: 100%;
		}

		/* What it does: Centers email on Android 4.4 */
		div[style*="margin: 16px 0"] {
			margin: 0 !important;
		}

		/* What it does: Stops Outlook from adding extra spacing to tables. */
		table,
		td {
			mso-table-lspace: 0pt !important;
			mso-table-rspace: 0pt !important;
		}

		/* What it does: Fixes webkit padding issue. */
		table {
			border-spacing: 0 !important;
			border-collapse: collapse !important;
			table-layout: fixed !important;
			margin: 0 auto !important;
		}

		/* What it does: Uses a better rendering method when resizing images in IE. */
		img {
			-ms-interpolation-mode: bicubic;
		}

		/* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
		a {
			text-decoration: none;
		}

		/* What it does: A work-around for email clients meddling in triggered links. */
		*[x-apple-data-detectors],
		/* iOS */
		.unstyle-auto-detected-links *,
		.aBn {
			border-bottom: 0 !important;
			cursor: default !important;
			color: inherit !important;
			text-decoration: none !important;
			font-size: inherit !important;
			font-family: inherit !important;
			font-weight: inherit !important;
			line-height: inherit !important;
		}

		/* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
		.a6S {
			display: none !important;
			opacity: 0.01 !important;
		}

		/* What it does: Prevents Gmail from changing the text color in conversation threads. */
		.im {
			color: inherit !important;
		}

		/* If the above doesn't work, add a .g-img class to any image in question. */
		img.g-img+div {
			display: none !important;
		}

		/* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
		/* Create one of these media queries for each additional viewport size you'd like to fix */
		/* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
		@media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
			u~div .email-container {
				min-width: 320px !important;
			}
		}

		/* iPhone 6, 6S, 7, 8, and X */
		@media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
			u~div .email-container {
				min-width: 375px !important;
			}
		}

		/* iPhone 6+, 7+, and 8+ */
		@media only screen and (min-device-width: 414px) {
			u~div .email-container {
				min-width: 414px !important;
			}
		}
	</style>

	<!-- CSS Reset : END -->

</head>

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;font-family: 'Work Sans', sans-serif !important;font-weight: 400;font-size: 15px;line-height: 1.8;color: rgba(0, 0, 0, .4);">
	<center style="width: 100%; background-color: #f1f1f1;">
		<div
			style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
			&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
		</div>
		<div style="max-width: 600px; margin: 0 auto;" class="email-container">
			<!-- BEGIN BODY -->
			<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
				style="margin: auto;">
				<tr>
					<td valign="top" style="padding: 1em 2.5em 0 2.5em;background: #ffffff;">
						<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td class="logo" style="text-align: center;">
									<a href="https://kobble.co.id">
										<img src="https://www.lumisoft.co.id/assets/images/logo_1.png" alt=""
											style="width: 100%; max-width: 200px; height: auto; margin: auto; display: block;">
									</a>
								</td>
							</tr>
						</table>
					</td>
				</tr><!-- end tr -->
				<tr>
				</tr><!-- end tr -->
				<tr>
					<td valign="middle" style="padding: 2em 0 0 0;background: #ffffff;position: relative;z-index: 0;">
						<table>
							<tr>
								<td>
									<div style="padding: 0 2.5em; text-align: center;color: rgba(0, 0, 0, .3);">
										<h2 style="font-size: 25px;margin-bottom: 0;font-family: 'Work Sans', sans-serif;color: #000000;margin-top: 0;font-weight: 400;">
											Please click button below to <span
												style="font-weight: 600;color: #232325;">reset</span> ${user.name} password
										</h2>
									</div>
								</td>
							</tr>
						</table>
					</td>
				</tr><!-- end tr -->
				<tr>
					<td valign="middle" style="padding: 2em 0;background: #ffffff;">
						<table>
							<tr>
								<td>
									<div style="padding: 0 2.5em; text-align: center;color: rgba(0, 0, 0, .3);">
										<p>
											<a href="\n${URL}\/resetpasswordpage/${token}"
												style="padding: 5px 15px;display: inline-block;border-radius: 0px;background: transparent;border: 2px solid #000;color: #000;font-weight: 700;">
												Reset Password
											</a>
										</p>
									</div>
								</td>
							</tr>
						</table>
					</td>
				</tr><!-- end tr -->
				<!-- 1 Column Text + Button : END -->
			</table>
			<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
				style="margin: auto;">
				<tr>
					<td valign="middle"
						style="background: #ffffff;border-top: 1px solid rgba(0, 0, 0, .05);color: rgba(0, 0, 0, .5);">
						<table>
							<tr style="text-align: left;">
								<td valign="middle" width="60%" style="padding-top: 20px; text-align: left;">
									<h3 style="color: #000;font-size: 20px;font-family: 'Work Sans', sans-serif;margin-top: 0;font-weight: 400;">Stay Updated On Our Shop</h3>
								</td>
								<td valign="middle" width="40%" style="padding-top: 20px; text-align: right;">
									<ul style="margin: 0;padding: 0;">
										<li style="list-style: none;margin-bottom: 10px;display: inline-block;margin-right: 10px;">
											<a href="#" style="color: rgba(0, 0, 0, 1);">
												<img src="https://www.kobble.co.id/assets/images/004-twitter-logo.png" alt=""
													style="width: 24px; max-width: 600px; height: auto; display: block;">
											</a>

										</li>
										<li style="list-style: none;margin-bottom: 10px;display: inline-block;margin-right: 10px;">
											<a href="#" style="color: rgba(0, 0, 0, 1);">
												<img src="https://www.kobble.co.id/assets/images/005-facebook.png" alt=""
													style="width: 24px; max-width: 600px; height: auto; display: block;">
											</a>

										</li>
										<li style="list-style: none;margin-bottom: 10px;display: inline-block;margin-right: 10px;">
											<a href="#" style="color: rgba(0, 0, 0, 1);">
												<img src="https://www.kobble.co.id/assets/images/006-instagram-logo.png" alt=""
													style="width: 24px; max-width: 600px; height: auto; display: block;">
											</a>
										</li>
									</ul>
								</td>
							</tr>
						</table>
					</td>
				</tr><!-- end: tr -->
			</table>
			<div style="padding: 15px;">
				requested at ${time}
			</div>
		</div>
	</center>
</body>

</html>
    `
}

module.exports = { resetpassword }