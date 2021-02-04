export const emailResetCodeObject = (fullName = '', randomNo: string) => {
    return {
        subject: 'Password Reset',
        text: `Hello ${fullName},
		    Someone has requested to reset your password. you will need to enter the following code on the password reset page.
		    Password Reset Code: ${randomNo}
        `,

        html: `<div>
		    <div>Hi <strong>${fullName}</strong>,</div><br>
		    <div>Someone, hopefully you, has requested to reset your password. you need to enter the following code on the password reset page.</div><br>
		    <div>Password Reset Code: ${randomNo}</strong><br>
            </div>
        `,
    }
}
