import { fail } from "@sveltejs/kit"
import { EMAIL } from "$env/static/private";
import transporter from "$lib/emailSetup.server.js";

export const actions = {
  create: async ({ request }) => {
    try {
      const formData = await request.formData()
      console.log(formData);

      const fnameHoda = formData.get('fnameHoda');
      const fnameRegular = formData.get('fnameRegular');
      const lname = formData.get('lname');
      const suite = formData.get('suite');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const company = formData.get('company');
      const message = formData.get('message');
      const pickup = formData.get('pickup');
      const destination = formData.get('destination');
      const datetime = formData.get('datetime');
      const passengers = formData.get('passengers');
      const restaurant = formData.get('restaurant');
      const guests = formData.get('guests');
      const items = formData.get('items');
      const food = formData.get('food');

      const body = "NEW CLEO REQUEST || suite: "
      + suite + ", fnameHoda"
      + fnameHoda + ", fnameRegular"
      + fnameRegular + ", lname"
      + lname + ", email"
      + email + ", phone"
      + phone + ", company"
      + company + ", request"
      + request + ", pickup"
      + pickup + ", destination"
      + destination + ", datetime"
      + datetime + ", passengers"
      + passengers + ", restaurant"
      + restaurant + ", guests"
      + guests + ", items"
      + items + ", food"
      + food

      let intro =""
      let from =""
      if (fnameHoda !== null) {
        intro = "New CLEO request from one of your guest"
        from = fnameHoda + " " + lname + " – " + suite
      } else {
        intro = "New CLEO standard request"
        from = fnameRegular + " " + lname + " – " + email + " – " + phone + " – " + company
      }
      let messageHtml =""
      let html = ""
      if (request !== "") {
        messageHtml = `<p>Request: ${message}<p>`
        html = `
        <h1>${intro}</h1>
        <h2>Written request</h2>
        <p>${from}</p>
        ${messageHtml}
        `
      }
      if (pickup !== "") {
        html = `
        <h1>${intro}</h1>
        <h2>Car</h2>
        <p>${from}</p>
        <p>Pickup/destination: ${pickup}, ${destination}</p>
        <p>When: ${datetime}</p>
        <p>Passengers: ${passengers}</p>
        ${messageHtml}
        `  
      }
      if (restaurant !== "") {
        html = `
          <h1>${intro}</h1>
          <h2>Table</h2>
          <p>${from}</p>
          <p>Restaurant: ${restaurant}</p>
          <p>When: ${datetime}</p>
          <p>Guests: ${guests}</p>
          ${messageHtml}
        `
      }
      if (restaurant === "" && items !== "") {
        html = `
          <h1>${intro}</h1>
          <h2>Laundry</h2>
          <p>${from}</p>
          <p>When: ${datetime}</p>
          <p>Items: ${items}</p>
          ${messageHtml}
        `
      }
      if (restaurant !== "" && datetime !== "" && guests === "") {
        html = `
          <h1>${intro}</h1>
          <h2>Food</h2>
          <p>${from}</p>
          <p>Kind: ${food}</p>
          <p>Restaurant: ${restaurant}</p>
          <p>When: ${datetime}</p>
          <p>Items: ${items}</p>
          ${messageHtml}
        `
      }
      
      const mail = {
        from: EMAIL,
        to: "welcome@hodamilano.eu",
        text: body,
        html: html,
      };

      console.log(html);

      const sendEmail = async (mail) => {
        await new Promise((resolve, reject) => {
          transporter.sendMail(mail, (err, info) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(info);
            }
          });
        });
      };

      await sendEmail(mail);
      
      return {
        success: true,
      };
    } catch (error) {
      console.error(error);
    } return {
      success: false,
    };
  },
};