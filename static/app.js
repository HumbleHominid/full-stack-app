if (!('registerElement' in document) ||
        !('import' in document.createElement('link')) ||
        !('content' in document.createElement('template'))) {
  // polyfill the platform!
  var e = document.createElement('script');
  e.src = '/webcomponents.js';
  document.body.appendChild(e);
}

CLASH = (function() {
    function viewOverview() {
        console.log("Calling view overview");

        // grab the current user
        let user_id = window.CLASH.user.id;

        if (!user_id) {
            console.log("There is no logged in user");

            return;
        }

        // This is assuming you are using jquery
        // send an ajax request to api/overview/:user_id
        $.ajax('api/overview', {
            data: user_id, // this is appended to the url
        })
        // if you succeed
        .done((data) => {
            console.log('Success');
        })
        // if you fail
        .fail(() => {
            console.log('Mission failed');

            let data = {
                troopNum: 420,
                spellNum: 69,
                townHallLevel: 50
            }

            let el = document.querySelector('#mainArea #overview');

            if (!el) {
                document.querySelector('#mainArea').appendChild(document.querySelector('#overview').cloneNode(true));

                el = document.querySelector('#mainArea #overview');
            }

            el.querySelector('#troopNum').innerHTML = data.troopNum;
            el.querySelector('#spellNum').innerHTML = data.spellNum;
            el.querySelector('#townHallLevel').innerHTML = data.townHallLevel;

            el.querySelector('#upgradeTownHall').onclick = function() {
                console.log('upgrading')

                let townHallEl = el.querySelector('#townHallLevel');
                let currentLevel = townHallEl.innerHTML;

                if (!parseInt(currentLevel)) {
                    console.log('no num');

                    return;
                }

                townHallEl.innerHTML = parseInt(currentLevel) + 1;
            }
        });
    }

    function viewBuildingList() {
        console.log("Calling view building list");

        // grab the current user
        let user_id = window.CLASH.user.id;

        if (!user_id) {
            console.log("There is no logged in user");

            return;
        }

        // This is assuming you are using jquery
        // send an ajax request to /overview/:user_id
        $.ajax('api/buildinglist.json',
        {
            dataType: "json"
        })
        // if you succeed
        .done((data) => {
            console.log('Success');
            console.log(JSON.stringify(data));
        })
        // if you fail
        .fail(() => {
            console.log('Mission failed');
        });
    }

    function login() {
        console.log('Logging in');

        window.CLASH.user.id = 420;
    }

    // bind events
    document.querySelector('#viewOverview').onclick = viewOverview;
    document.querySelector('#viewBuildingList').onclick = viewBuildingList;
    document.querySelector('#loginBtn').onclick = login;

    return {
        user: {

        }
    }
}) ();
