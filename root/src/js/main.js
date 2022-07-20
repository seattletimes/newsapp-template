// var paywall = require("./lib/paywall");
// setTimeout(() => paywall(12345678), 5000);

//added sidechain 
import Sidechain from '@nprapps/sidechain';
const guest = Sidechain.registerGuest({ sentinel: 'st' });

guest.sendMessage({
  type: 'analytics',
  eventCategory: 'interaction',
  eventAction: 'click',
  eventLabel: 'etc'
})
//end sidechain