(function() {

  username = 'user1';
  password = 'hello';

  path = 'http://localhost:8080';
  apiAllLocation = '/api/v1/contacts/all';
  apiSingleLocation = '/api/v1/contacts/';
  apiCreateLocation = '/api/v1/create';
  apiUpdateLocation = '/api/v1/update/';
  apiDeleteLocation = '/api/v1/delete/';

  // allContacts
  const app = document.getElementById('allContacts');

  document.getElementById('allButton').addEventListener('click', makeRequest);

  // SingleContact
  const appSingle = document.getElementById('singleContact');

  document.getElementById('singleButton').addEventListener('click', makeSingleRequest);

  // createContact
  const appCreate = document.getElementById('createContact');

  document.getElementById('createButton').addEventListener('click', makeCreateRequest);

  // updateContact
  const appUpdate = document.getElementById('updateContact');

  document.getElementById('updateButton').addEventListener('click', makeUpdateRequest);

  // deleteContact
  const appDelete = document.getElementById('deleteContact');

  document.getElementById('deleteButton').addEventListener('click', makeDeleteRequest);

  function makeRequest() {

    var httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('Cannot create an XMLHTTP instance');
      return false;
    }

    httpRequest.open('GET', path + apiAllLocation);
    httpRequest.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));

    httpRequest.onload = function() {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response);

      if (httpRequest.status >= 200 && httpRequest.status < 400) {

        data.data.forEach(item => {

          const card = document.createElement('div');
          card.setAttribute('class', 'card');
          card.setAttribute('style', 'padding: 25px;');

          const cardBody = document.createElement('div');
          cardBody.setAttribute('class', 'card-body');

          const cardTitle = document.createElement('h5');
          cardTitle.setAttribute('class', 'card-title');
          cardTitle.textContent = item.name;

          const cardEmail = document.createElement('p');
          cardEmail.setAttribute('class', 'card-text');
          cardEmail.textContent = item.email;

          const cardUL = document.createElement('ul');
          cardUL.setAttribute('class', 'list-group list-group-flush');

          const cardListItemPhone = document.createElement('li');
          cardListItemPhone.setAttribute('class', 'list-group-item');
          cardListItemPhone.textContent = item.phone;

          const cardListItemAddress = document.createElement('li');
          cardListItemAddress.setAttribute('class', 'list-group-item');
          cardListItemAddress.textContent = item.address;

          app.appendChild(card);
          card.appendChild(cardBody);
          cardBody.appendChild(cardTitle);
          cardBody.appendChild(cardEmail);
          card.appendChild(cardUL);
          cardUL.appendChild(cardListItemPhone);
          cardUL.appendChild(cardListItemAddress);
        });
      } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Argh, it's not working!`;
        app.appendChild(errorMessage);
      }
    }

    httpRequest.send();
  }

  function makeSingleRequest() {
    var httpSingleRequest = new XMLHttpRequest();

    if (!httpSingleRequest) {
      alert('Cannot create an XMLHTTP instance');
      return false;
    }

    var cntID = document.getElementById("singleForm").elements[0].value;
    singelURL = apiSingleLocation + cntID + '/details';

    httpSingleRequest.open('GET', path + singelURL);
    httpSingleRequest.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));

    httpSingleRequest.onload = function() {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response);

      if (appSingle.hasChildNodes()) {
        appSingle.removeChild(appSingle.childNodes[0]);
      }
      if (httpSingleRequest.status >= 200 && httpSingleRequest.status < 400) {

        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const cardHeader = document.createElement('div');
        cardHeader.setAttribute('class', 'card-header');
        cardHeader.textContent = 'Details';

        const cardUL = document.createElement('ul');
        cardUL.setAttribute('class', 'list-group');

        const cardName = document.createElement('li');
        cardName.setAttribute('class', 'list-group-item');
        cardName.textContent = data.data.name;

        const cardEmail = document.createElement('li');
        cardEmail.setAttribute('class', 'list-group-item');
        cardEmail.textContent = data.data.email;

        const cardPhone = document.createElement('li');
        cardPhone.setAttribute('class', 'list-group-item');
        cardPhone.textContent = data.data.phone;

        const cardAddress = document.createElement('li');
        cardAddress.setAttribute('class', 'list-group-item');
        cardAddress.textContent = data.data.address;

        appSingle.appendChild(card);
        card.appendChild(cardHeader);
        cardHeader.appendChild(cardUL);
        cardUL.appendChild(cardName);
        cardUL.appendChild(cardEmail);
        cardUL.appendChild(cardPhone);
        cardUL.appendChild(cardAddress);

      } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Argh, it's not working! ` + data["message"];
        appSingle.appendChild(errorMessage);
      }
    }

    httpSingleRequest.send();
  }

  function makeCreateRequest() {
    var httpCreateRequest = new XMLHttpRequest();

    if (!httpCreateRequest) {
      alert('Cannot create an XMLHTTP instance');
      return false;
    }

    var cntName = document.getElementById("createForm").elements[0].value;
    var cntEmail = document.getElementById("createForm").elements[1].value;
    var cntPhone = document.getElementById("createForm").elements[2].value;
    var cntAddress = document.getElementById("createForm").elements[3].value;

    var data = {};
    data.name = cntName;
    data.email = cntEmail;
    data.phone = cntPhone;
    data.address = cntAddress;
    var jsonData = JSON.stringify(data);

    httpCreateRequest.open('POST', path + apiCreateLocation);
    httpCreateRequest.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
    httpCreateRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    httpCreateRequest.onload = function() {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response);

      if (appCreate.hasChildNodes()) {
        appCreate.removeChild(appCreate.childNodes[0]);
      }
      if (httpCreateRequest.status >= 200 && httpCreateRequest.status < 400) {

        const div = document.createElement('div');
        div.setAttribute('class', 'alert alert-primary');
        div.setAttribute('role', 'alert');
        div.textContent = 'Contact was added successfully';

        appCreate.appendChild(div);

      } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Argh, it's not working! ` + data["message"];
        appSingle.appendChild(errorMessage);
      }
    }

    httpCreateRequest.send(jsonData);
  }

  function makeUpdateRequest() {
    var httpUpdateRequest = new XMLHttpRequest();

    if (!httpUpdateRequest) {
      alert('Cannot create an XMLHTTP instance');
      return false;
    }

    var cntID = document.getElementById("updateForm").elements[0].value;
    var cntName = document.getElementById("updateForm").elements[1].value;
    var cntEmail = document.getElementById("updateForm").elements[2].value;
    var cntPhone = document.getElementById("updateForm").elements[3].value;
    var cntAddress = document.getElementById("updateForm").elements[4].value;

    if (cntID == "") {
      alert('Provide ID.');
      return false;
    }

    var data = {};
    if (cntName != "") {
      data.name = cntName;
    }
    if (cntEmail != "") {
      data.email = cntEmail;
    }
    if (cntPhone != "") {
      data.phone = cntPhone;
    }
    if (cntAddress != "") {
      data.address = cntAddress;
    }


    var jsonData = JSON.stringify(data);

    httpUpdateRequest.open('PUT', path + apiUpdateLocation + cntID);
    httpUpdateRequest.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
    httpUpdateRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    httpUpdateRequest.onload = function() {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response);

      if (appUpdate.hasChildNodes()) {
        appUpdate.removeChild(appUpdate.childNodes[0]);
      }
      if (httpUpdateRequest.status >= 200 && httpUpdateRequest.status < 400) {

        const div = document.createElement('div');
        div.setAttribute('class', 'alert alert-primary');
        div.setAttribute('role', 'alert');
        div.textContent = 'Contact was updated successfully';

        appUpdate.appendChild(div);

      } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Argh, it's not working! ` + data["message"];
        appSingle.appendChild(errorMessage);
      }
    }

    httpUpdateRequest.send(jsonData);
  }

  function makeDeleteRequest() {
    var httpDeleteRequest = new XMLHttpRequest();

    if (!httpDeleteRequest) {
      alert('Cannot create an XMLHTTP instance');
      return false;
    }

    var cntID = document.getElementById("deleteForm").elements[0].value;
    
    if (cntID == "") {
      alert('Provide ID.');
      return false;
    }

    
    httpDeleteRequest.open('DELETE', path + apiDeleteLocation + cntID);
    httpDeleteRequest.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));

    httpDeleteRequest.onload = function() {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response);

      if (appDelete.hasChildNodes()) {
        appDelete.removeChild(appDelete.childNodes[0]);
      }
      if (httpDeleteRequest.status >= 200 && httpDeleteRequest.status < 400) {

        const div = document.createElement('div');
        div.setAttribute('class', 'alert alert-primary');
        div.setAttribute('role', 'alert');
        div.textContent = 'Contact was deleted';

        appDelete.appendChild(div);

      } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Argh, it's not working! ` + data["message"];
        appDelete.appendChild(errorMessage);
      }
    }

    httpDeleteRequest.send(null);
  }
})();