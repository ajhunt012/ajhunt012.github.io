const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const recaptcha_secret_key = 'recaptcha_secret_key';
  const recaptcha_response = document.querySelector('.g-recaptcha-response').value;
  const remote_ip = event.target.dataset.remoteip;

  const recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
  const recaptcha_params = new URLSearchParams();
  recaptcha_params.append('secret', recaptcha_secret_key);
  recaptcha_params.append('response', recaptcha_response);
  recaptcha_params.append('remoteip', remote_ip);

  const recaptcha_request = await fetch(recaptcha_url, {
    method: 'POST',
    body: recaptcha_params,
  });
  const recaptcha_result = await recaptcha_request.json();

  if (recaptcha_result.success) {
    // The reCAPTCHA was successfully verified
    // Proceed with your form processing logic here
    event.target.submit();
    // need to keep the information hidden unitl this stage is completed including the second submit button ,and to clear this if it has been aknowledged. 
// still having issues getting the information to populate.
// TODO find whats affecting the non hidden side of the code. 
  } else {
    // The user is a bot, display an error message or take other appropriate action
    alert('Please prove that you are not a robot');
  }
});