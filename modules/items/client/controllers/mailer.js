'use strict';
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	pool: false,
	auth: {
		user: 'labinventorywebapp@gmail.com',
		pass: '1234qwer!@#$QWER'
	},
	tls: {
                rejectUnauthorized: false
    }
});

let Mailer = new function() {
	this.sendRestock = function(item, count, restockThreshold) {
		let mailOptions = {
			from: '"Lab Inventory Web App" <XXXX@ufl.edu>',
			to: 'sjswanson@ymail.com',
			subject: 'Low Inventory Notice for ' + item,
			text: 'Dmitry, the following item is running low according to our database. ' +
						'Item:' + item + '\n' +
						'Current Count: ' + count + '\n' +
						'Restock Threshold: ' + restockThreshold + '\n'
		};
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log('Message %s sent: %s', info.messageId, info.response);
		});
	};
};

module.exports = Mailer;
