// uses polyfill if html imports aren't supported
if (!('registerElement' in document) ||
        !('import' in document.createElement('link')) ||
        !('content' in document.createElement('template'))) {
  // polyfill the platform!
  var e = document.createElement('script');
  e.src = '/webcomponents.js';
  document.body.appendChild(e);
}

CLASH = (function() {
    // Clears the page
    function clearArea() {
        let mainArea = document.querySelector('#mainArea');

        while (mainArea.firstChild) {
            mainArea.removeChild(mainArea.firstChild);
        }
    }

    function reqUsers(endpoint, title) {
        clearArea();

        $.ajax(endpoint)
        // if you succeed
        .done((res) => {
            let mainArea = document.querySelector('#mainArea')
            let users = document.querySelector('#users');
            let clonedUsers = users.cloneNode(true);
            let tableBody = clonedUsers.querySelector('tbody');

            for (let user of res) {
                // make tr
                let row = document.createElement('tr');

                for (let column in user) {
                    let entry = document.createElement('td');

                    entry.innerHTML = user[column];
                    row.appendChild(entry);
                }

                tableBody.appendChild(row);
            }

            clonedUsers.querySelector('h2').innerHTML = title;

            mainArea.appendChild(clonedUsers);
        })
        // if you fail
        .fail(() => {
            console.log('Mission failed');
        });
    }

    function viewUsers() {
        reqUsers('users', 'View All Users');
    }

    function viewUsersWithId3() {
        reqUsers('users/byID/3', 'View Users With ID 3');
    }

    function listUsersNamedMichael() {
        reqUsers('users/byFName/michael', 'View Users Named Michael');
    }

    // bind events
    document.querySelector('#listUsers').onclick = viewUsers;
    document.querySelector('#listUsersWithID3').onclick = viewUsersWithId3;
    document.querySelector('#listUsersNamedMichael').onclick = listUsersNamedMichael;

    return {
        user: {

        }
    }
}) ();
