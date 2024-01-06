document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Load the inbox view
  fetch('/emails/inbox')
  .then(response => response.json())
  .then(emails => {

      emails.forEach(email => {
          if(email.archived === false){
            const element = document.createElement('div');
            element.className = 'row';
            element.id = email.id
            element.style.border = '1px solid black';
            element.style.cursor = 'pointer';
  
            const sender_element = document.createElement('div');
            sender_element.className = 'col';
            sender_element.innerHTML = `<b>${email.sender}</b> &nbsp;&nbsp;&nbsp;&nbsp;`;
            element.append(sender_element);
  
            const subject_element = document.createElement('div');
            subject_element.className = 'col';
            subject_element.innerHTML = `<b>${email.subject}</b>`;
            element.append(subject_element);
  
            const time_element = document.createElement('div');
            time_element.className = 'col';
            time_element.innerHTML = `${email.timestamp} &nbsp;&nbsp;&nbsp;&nbsp;`;
            time_element.style.textAlign = 'right';
            element.append(time_element);
  
            if(email.read === true)
                element.style.backgroundColor = '#EEEDE7';

            const archive_element = document.createElement('div');
            archive_element.className = 'col-4';
            archive_element.innerHTML = '<button class="btn btn-light">Archive</button>';
            archive_element.style.textAlign = 'right';
            element.append(archive_element);
    
            // arhive the element if the button is click
            archive_element.addEventListener('click', function(e) {
              e.stopPropagation();

              fetch('/emails/'.concat(email.id), {
                method: 'PUT',
                body: JSON.stringify({
                    archived: true
                })
              });

              location.reload();
              load_mailbox('inbox');
            });

            element.addEventListener('click', function(e) {
              fetch('/emails/'.concat(email.id), {
                method: 'PUT',
                body: JSON.stringify({
                    read: true
                })
              })

              load_message('inbox', email.id);

              element.style.backgroundColor = '#EEEDE7';

            });

            document.querySelector('#inbox-view').append(element);
          }
      });
  });

  // Load the sent view
  fetch('/emails/sent')
  .then(response => response.json())
  .then(emails => {

      emails.forEach(email => {
          const element = document.createElement('div');
          element.className = 'row';
          element.style.border = '1px solid black';
          element.style.cursor = 'pointer';

          const recipient_element = document.createElement('div');
          recipient_element.className = 'col';
          recipient_element.innerHTML = `<b>To: ${email.recipients}</b> &nbsp;&nbsp;&nbsp;&nbsp;`;
          element.append(recipient_element);

          const subject_element = document.createElement('div');
          subject_element.className = 'col';
          subject_element.innerHTML = `<b>${email.subject}</b>`;
          element.append(subject_element);

          const time_element = document.createElement('div');
          time_element.className = 'col';
          time_element.innerHTML = `${email.timestamp} &nbsp;&nbsp;&nbsp;&nbsp;`;
          time_element.style.textAlign = 'right';
          element.append(time_element);

         element.addEventListener('click', function() {
              load_message('sent', email.id)
          });

          document.querySelector('#sent-view').append(element);
      });
  });

  // Load the archived view
  fetch('/emails/archive')
  .then(response => response.json())
  .then(emails => {
      emails.forEach(email => {
        const element = document.createElement('div');
        element.className = 'row';
        element.style.border = '1px solid black';
        element.style.cursor = 'pointer';

        const sender_element = document.createElement('div');
        sender_element.className = 'col';
        sender_element.innerHTML = `<b>${email.sender}</b> &nbsp;&nbsp;&nbsp;&nbsp;`;
        element.append(sender_element);

        const subject_element = document.createElement('div');
        subject_element.className = 'col';
        subject_element.innerHTML = `<b>${email.subject}</b>`;
        element.append(subject_element);

        const time_element = document.createElement('div');
        time_element.className = 'col';
        time_element.innerHTML = `${email.timestamp} &nbsp;&nbsp;&nbsp;&nbsp;`;
        time_element.style.textAlign = 'right';
        element.append(time_element);

        const unarchive_element = document.createElement('div');
        unarchive_element.innerHTML = '<button class="btn btn-light">Unarchive</button>';
        unarchive_element.style.textAlign = 'right';
        element.append(unarchive_element);

        unarchive_element.addEventListener('click', function(e) {
          e.stopPropagation();

          fetch('/emails/'.concat(email.id), {
            method: 'PUT',
            body: JSON.stringify({
                archived: false
            })
          });

          location.reload();
          load_mailbox('inbox');
        });

        element.addEventListener('click', function() {
            load_message('inbox', email.id);
        });

        document.querySelector('#archived-view').append(element);
      });
  });

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  document.querySelector('#inbox-view').style.display = 'none';
  document.querySelector('#sent-view').style.display = 'none';
  document.querySelector('#archived-view').style.display = 'none';
  document.querySelector('#message-view').style.display = 'none';

  const element = document.createElement('div');
  element.className = 'row';
  element.style.border = '1px solid black';
  element.style.cursor = 'pointer';   

  // GET USER'S recipients, subject and body after submitting
  document.querySelector('#compose-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const recipients = document.querySelector('#compose-recipients').value;
    const subject = document.querySelector('#compose-subject').value;
    const body = document.querySelector('#compose-body').value;

    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
          recipients: recipients,
          subject: subject,
          body: body
      })
    })
    .then(response => response.json()) 
    .then(result => {
        // Print result 
        console.log(result);

        fetch('/emails/sent')
        .then(response => response.json())
        .then(emails => {
            // Print emails
            console.log(emails);

            email = emails[0];
            console.log(email)

            const recipient_element = document.createElement('div');
            recipient_element.className = 'col';
            recipient_element.innerHTML = `<b>To: ${email.recipients}</b> &nbsp;&nbsp;&nbsp;&nbsp;`;
            element.append(recipient_element);

            const subject_element = document.createElement('div');
            subject_element.className = 'col';
            subject_element.innerHTML = `<b>${email.subject}</b>`;
            element.append(subject_element);

            const time_element = document.createElement('div');
            time_element.className = 'col';
            time_element.innerHTML = `${email.timestamp} &nbsp;&nbsp;&nbsp;&nbsp;`;
            time_element.style.textAlign = 'right';
            element.append(time_element);

            element.addEventListener('click', function() {
                load_message('sent', email.id);
            });

            console.log(element);    
        });
    });

    document.querySelector('#sent-view').prepend(element);
    load_mailbox('sent');
  });

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // ask what mailbox argument and change that display to block and the rest are none
  if(mailbox === 'inbox'){
    document.querySelector('#inbox-view').style.display = 'block';
    document.querySelector('#sent-view').style.display = 'none';
    document.querySelector('#archived-view').style.display = 'none';
    document.querySelector('#message-view').style.display = 'none';
  }else if(mailbox === 'sent'){
    document.querySelector('#inbox-view').style.display = 'none';
    document.querySelector('#sent-view').style.display = 'block';
    document.querySelector('#archived-view').style.display = 'none';
    document.querySelector('#message-view').style.display = 'none';
  }else if(mailbox === 'archive'){
    document.querySelector('#inbox-view').style.display = 'none';
    document.querySelector('#sent-view').style.display = 'none';
    document.querySelector('#archived-view').style.display = 'block';
    document.querySelector('#message-view').style.display = 'none'; 
  }else if(mailbox === 'message'){
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#inbox-view').style.display = 'none';
    document.querySelector('#sent-view').style.display = 'none';
    document.querySelector('#archived-view').style.display = 'none';
    document.querySelector('#message-view').style.display = 'block'; 
  }
}

function load_message(mailbox, email_id){

  // get the email id here to get the email
  fetch(`/emails/${email_id}`)
  .then(response => response.json())
  .then(email => {
      console.log(email);

      document.querySelector('#email-sender').innerHTML = `<b>From: </b> ${email.sender}`;
      document.querySelector('#email-recipients').innerHTML = `<b>Recipients: </b> ${email.recipients}`;
      document.querySelector('#email-subject').innerHTML = `<b>Subject: </b> ${email.subject}`;
      document.querySelector('#email-timestamp').innerHTML = `<b>Timestamp: </b> ${email.timestamp}`;

      if(mailbox === 'sent')
        document.querySelector('#reply-button').style.display = 'none';
      else if(mailbox === 'inbox')
        document.querySelector('#reply-button').style.display = 'block';

      document.querySelector('#email-body').innerHTML = email.body.replaceAll('\n','<br>');

      document.querySelector('#reply-button').addEventListener('click', function() {
          console.log('compose-view');
          compose_email();

          // Pre-fill the recipient
          document.querySelector('#compose-recipients').value = email.sender;
          console.log(document.querySelector('#compose-recipients').value);

          // Add Re: email.subject, but if Re: is present don't add anymore
          if(!email.subject.includes('Re: '))
            document.querySelector('#compose-subject').value = `Re: ${email.subject}`;
          else
            document.querySelector('#compose-subject').value = email.subject;


          // Pre-fill the body "On Jan 1 2020, 12:00 AM foo@example.com wrote:"
          document.querySelector('#compose-body').value = `${email.body} \r\n\r\n On ${email.timestamp} ${email.sender} wrote: \r\n\r\n`;
          document.querySelector('#compose-body').focus();
      });
  });

  load_mailbox('message');
}