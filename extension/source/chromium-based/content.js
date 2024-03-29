var parsed = null;
parsed = JSON.parse(httpGet("https://raw.githubusercontent.com/dikahdoff/TeamsUtils/main/scripts.json"));
//parsed = JSON.parse(httpGet("https://cdn.jsdelivr.net/gh/dikahdoff/TeamsUtils/scripts.json"));
var manifestData = chrome.runtime.getManifest();

var dokicking = false;
var dojoining = false;
var dodisconnect = false;

var didswitch = false;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) &&
           !isNaN(parseFloat(str))
}
function strToBool(string){
    switch(string.toLowerCase().trim()){
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return null;
    }
}
function isRunning(key) {
    switch (key) {
        case "AutoKick":
            return dokicking;
            break;
        case "AutoJoinMeeting":
            return dojoining;
            break;
        case "AutoDisconnect":
            return dodisconnect;
            break;
        default:
            return null;
            break;
    }
}
function openGenerator() {
    window.open(parsed.generatorLink);
}
function openPage() {
    window.open(parsed.link);
}
function openChangelog() {
    window.open(parsed.changelog);
}
function openStorePage() {
    window.open(parsed.storeLink);
}
function workInProgress() {
    alert('Work in Progress');
}
function logToGui(logStr) {
    var nowTime = new Date().toLocaleTimeString();
    console.log("(" + nowTime + ") [TeamsUtils] " + logStr + "\nDownload this script: " + parsed.link + "");
    var outputTxt = document.getElementById("control-input");
    if(outputTxt != null) {
        outputTxt.setAttribute("placeholder", "(" + nowTime + ") TeamsUtils> " + logStr);
    } else {
        console.warn("[TeamsUtils] Failed to log to GUI, because selected element was not found.");
    }
}
function stopScript(key) {
    logToGui("Stopped " + key + ".");
    switch (key) {
        case "AutoKick":
            cancelKicking();
            break;
        case "AutoJoinMeeting":
            cancelJoining();
            break;
        case "AutoDisconnect":
            cancelDisconnect();
            break;
        default:
            logToGui("[ERROR] Action isn't implemented in this version of the client. Please update the extension: " + parsed.link);
            alert("ERROR! Action isn't implemented in this version of the client. Please update the extension: " + parsed.link);
            break;
    }
    closeMenu();
}
function getSettings(key) {
    var set = new Array;
    parsed.scripts.forEach(element => {
        if(element.key == key) {
            element.settings.forEach(settingsElement => {
                settingsElement.settings.forEach(settingsDetails => {
                    var typeStr = "";
                    switch (settingsDetails.type) {
                        case "int":
                            typeStr = "(Possible values: Numbers)";
                            break;
                        case "bool":
                            typeStr = "(Possible values: True/False)";
                            break;
                        case "str":
                            typeStr = "(Possible values: Text)";
                            break;
                        default:
                            break;
                    }
                    set[settingsDetails.key] = getInput(((settingsDetails.name == null) ? settingsElement.name : settingsDetails.name), settingsElement.description + " " + typeStr,settingsDetails.type, ((settingsDetails.default == null) ? "0" : settingsDetails.default));
                });
            });
        }
    });
    logToGui("Running " + key + "...");
    switch (key) {
        case "AutoKick":
            kickingAction(set['kickDelay'], set['targetName']);
            break;
        case "AutoJoinMeeting":
            joiningAction(set['joinDelay'], set['joinWait'], set['switchChannel'], set['switchTo'], set['switchToChannel']);
            break;
        case "AutoDisconnect":
            disconnectAction(set['threshold'], set['delay']);
            break;
        default:
            logToGui("[ERROR] Action isn't implemented in this version of the client. Please update the extension: " + parsed.link);
            alert("ERROR! Action isn't implemented in this version of the client. Please update the extension: " + parsed.link);
            break;
    }
    closeMenu();
}
function getInput(name, desc, type, def) {
    var taskNotDone = true;
    while(taskNotDone) {
        var input = prompt(name + "\n" + desc, def);
        if (input == null || input == "") {
            return def;
        } else {
            switch (type) {
                case "int":
                    if(isNumeric(input)) {                       
                        var out = parseInt(input);
                        if(0 < out < 32766) {
                            taskNotDone = false;
                            return out;
                        } else {
                            alert('Entered value is out of acceptable range.');
                        }
                    } else {
                        alert('Entered value cannot be parsed as an integer.');
                    }
                    break;
                case "bool":
                    var parsedBool = strToBool(input);
                    if(parsedBool != null) {
                        taskNotDone = false;
                        return parsedBool;
                    } else {
                        alert('Entered value cannot be parsed as a boolean.');
                    }
                    break;
                case "str":
                    if(input.length < 512) {
                        taskNotDone = false;
                        return input;
                    } else {
                        alert('Entered value is too long.');
                    }
                    break;
                case "array_str":
                    var parsedArrStr = input.split(";");
                    if(parsedArrStr != null) {
                        taskNotDone = false;
                        return parsedArrStr;
                    } else {
                        alert("Entered value can't be parsed as a String Array.");
                    }
                    break;
                default:
                    break;
            }
        }
    }
}
// Title modifications
var target = document.querySelector('title');
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(document.title != null && !document.title.includes(parsed.teamsTitle)) {
            document.title = document.title.replace("Microsoft Teams", parsed.teamsTitle);
            try {
                document.getElementsByClassName("teams-title")[0].innerText = "TeamsUtils";
            } catch (error) { /* Cope */ }
        }
    });
});
var config = {
    childList: true,
};
function openMenu() {
    if(document.getElementById("teamsutils-settings") == null) {
        var menu = document.createElement("div");
        menu.classList.add("popover", "settings-dropdown", "app-default-menu", "am-fade", "top");
        menu.setAttribute("data-tid", "settingsDropdownMenu");
        menu.setAttribute("oc-lazy-load", "settings-dropdown");
        menu.setAttribute("lazy-load-scenario", "lazy_settings_dropdown");
        menu.setAttribute("lazy-load-on-success", "appHeaderBar.onSettingsDropDownLoad()");
        menu.setAttribute("acc-role-dom", "dialog");
        menu.setAttribute("role", "dialog");
        menu.setAttribute("aria-modal", "true");
        var settingsDropdown = document.createElement("settings-dropdown");
        var divSettingsDropdown = document.createElement("div");
        var divDivSettingsDropdown = document.createElement("div");
        divDivSettingsDropdown.setAttribute("ng-show", "sdc.state === sdc.DropdownStates.INITIAL");
        var title = document.createElement("div");
        title.classList.add("settings-dropdown-header");
        title.setAttribute("data-tid", "product-name-and-type");
        title.setAttribute("ng-bind-html", "::sdc.teamsProductName");
        title.setAttribute("acc-role-dom", "menu-item");
        title.setAttribute("kb-item-role", "menuitem");
        title.innerHTML = "<b>" + parsed.title + "</b>";
        var mainList = document.createElement("ul");
        mainList.classList.add("dropdown-menu");
        mainList.id = "settings-dropdown-list";
        mainList.setAttribute("acc-role-dom", "menu dialog");
        mainList.setAttribute("kb-list", "");
        mainList.setAttribute("kb-cyclic", "");
        mainList.setAttribute("role", "menu");
        mainList.appendChild(title);
        // Create title
        title = document.createElement("div");
        title.classList.add("settings-dropdown-header");
        title.setAttribute("data-tid", "product-name-and-type");
        title.setAttribute("ng-bind-html", "::sdc.teamsProductName");
        title.setAttribute("acc-role-dom", "menu-item");
        title.setAttribute("kb-item-role", "menuitem");
        title.innerHTML = "Version: " + ((manifestData.version == parsed.latestVersion) ? manifestData.version : manifestData.version + ", new version available: " + parsed.latestVersion);
        mainList.appendChild(title);
        // End of Create Title
        // Create Button
        var btnElement = document.createElement("li");
        btnElement.setAttribute("ng-if", "::(sdc.displaySettingsComponents && sdc.isFreemiumAdmin)");
        btnElement.setAttribute("data-prevent-trigger-refocus", "true");
        btnElement.setAttribute("acc-role-dom", "menu-item");
        btnElement.setAttribute("role", "menuitem");
        btnElement.setAttribute("kb-item", "");
        var btnBtnElement = document.createElement("button");
        btnBtnElement.classList.add("ts-sym");
        btnBtnElement.setAttribute("ng-click", "sdc.gotoManage(); sdc.hide()");
        btnBtnElement.innerText = parsed.style.button + " Visit project link";
        btnBtnElement.addEventListener('click', openPage);
        btnElement.appendChild(btnBtnElement);
        mainList.appendChild(btnElement);
        // End of Create Button
        if(parsed.storeLink != null) {
            // Create Button
            var btnElement = document.createElement("li");
            btnElement.setAttribute("ng-if", "::(sdc.displaySettingsComponents && sdc.isFreemiumAdmin)");
            btnElement.setAttribute("data-prevent-trigger-refocus", "true");
            btnElement.setAttribute("acc-role-dom", "menu-item");
            btnElement.setAttribute("role", "menuitem");
            btnElement.setAttribute("kb-item", "");
            var btnBtnElement = document.createElement("button");
            btnBtnElement.classList.add("ts-sym");
            btnBtnElement.setAttribute("ng-click", "sdc.gotoManage(); sdc.hide()");
            btnBtnElement.innerText = parsed.style.button + " Visit store link";
            btnBtnElement.addEventListener('click', openStorePage);
            btnElement.appendChild(btnBtnElement);
            mainList.appendChild(btnElement);
            // End of Create Button
        }
        if(parsed.changelog != null) {
            // Create Button
            var btnElement = document.createElement("li");
            btnElement.setAttribute("ng-if", "::(sdc.displaySettingsComponents && sdc.isFreemiumAdmin)");
            btnElement.setAttribute("data-prevent-trigger-refocus", "true");
            btnElement.setAttribute("acc-role-dom", "menu-item");
            btnElement.setAttribute("role", "menuitem");
            btnElement.setAttribute("kb-item", "");
            var btnBtnElement = document.createElement("button");
            btnBtnElement.classList.add("ts-sym");
            btnBtnElement.setAttribute("ng-click", "sdc.gotoManage(); sdc.hide()");
            btnBtnElement.innerText = parsed.style.button + " Changelog";
            btnBtnElement.addEventListener('click', openChangelog);
            btnElement.appendChild(btnBtnElement);
            mainList.appendChild(btnElement);
            // End of Create Button
        }
        var splitterElement = document.createElement("li");
        splitterElement.setAttribute("ng-if","::sdc.displaySettingsComponents");
        splitterElement.classList.add("divider");
        splitterElement.setAttribute("acc-role-dom", "menu-separator");
        mainList.appendChild(splitterElement);
        /*
        !!! NOT IMPLEMENTED YET, DO NOT UNCOMMENT !!!
        // Create title
        title = document.createElement("div");
        title.classList.add("settings-dropdown-header");
        title.setAttribute("data-tid", "product-name-and-type");
        title.setAttribute("ng-bind-html", "::sdc.teamsProductName");
        title.setAttribute("acc-role-dom", "menu-item");
        title.setAttribute("kb-item-role", "menuitem");
        title.innerHTML = "Automatic execution";
        mainList.appendChild(title);
        // End of Create Title
        // Create Button
        var btnElement = document.createElement("li");
        btnElement.setAttribute("ng-if", "::(sdc.displaySettingsComponents && sdc.isFreemiumAdmin)");
        btnElement.setAttribute("data-prevent-trigger-refocus", "true");
        btnElement.setAttribute("acc-role-dom", "menu-item");
        btnElement.setAttribute("role", "menuitem");
        btnElement.setAttribute("kb-item", "");
        var btnBtnElement = document.createElement("button");
        btnBtnElement.classList.add("ts-sym");
        btnBtnElement.setAttribute("ng-click", "sdc.gotoManage(); sdc.hide()");
        btnBtnElement.innerText = "Create automation script";
        btnBtnElement.addEventListener('click', openGenerator);
        btnElement.appendChild(btnBtnElement);
        mainList.appendChild(btnElement);
        // End of Create Button
        // Create Button
        var btnElement = document.createElement("li");
        btnElement.setAttribute("ng-if", "::(sdc.displaySettingsComponents && sdc.isFreemiumAdmin)");
        btnElement.setAttribute("data-prevent-trigger-refocus", "true");
        btnElement.setAttribute("acc-role-dom", "menu-item");
        btnElement.setAttribute("role", "menuitem");
        btnElement.setAttribute("kb-item", "");
        var btnBtnElement = document.createElement("button");
        btnBtnElement.classList.add("ts-sym");
        btnBtnElement.setAttribute("ng-click", "sdc.gotoManage(); sdc.hide()");
        btnBtnElement.innerText = "Import automation script";
        btnBtnElement.addEventListener('click', workInProgress);
        btnElement.appendChild(btnBtnElement);
        mainList.appendChild(btnElement);
        // End of Create Button
        // Create Button
        var btnElement = document.createElement("li");
        btnElement.setAttribute("ng-if", "::(sdc.displaySettingsComponents && sdc.isFreemiumAdmin)");
        btnElement.setAttribute("data-prevent-trigger-refocus", "true");
        btnElement.setAttribute("acc-role-dom", "menu-item");
        btnElement.setAttribute("role", "menuitem");
        btnElement.setAttribute("kb-item", "");
        var btnBtnElement = document.createElement("button");
        btnBtnElement.classList.add("ts-sym");
        btnBtnElement.setAttribute("ng-click", "sdc.gotoManage(); sdc.hide()");
        btnBtnElement.innerText = "Start script";
        btnBtnElement.addEventListener('click', workInProgress);
        btnElement.appendChild(btnBtnElement);
        mainList.appendChild(btnElement);
        // End of Create Button
        splitterElement = document.createElement("li");
        splitterElement.setAttribute("ng-if","::sdc.displaySettingsComponents");
        splitterElement.classList.add("divider");
        splitterElement.setAttribute("acc-role-dom", "menu-separator");
        mainList.appendChild(splitterElement);
        */
        // Create title
        title = document.createElement("div");
        title.classList.add("settings-dropdown-header");
        title.setAttribute("data-tid", "product-name-and-type");
        title.setAttribute("ng-bind-html", "::sdc.teamsProductName");
        title.setAttribute("acc-role-dom", "menu-item");
        title.setAttribute("kb-item-role", "menuitem");
        title.innerHTML = "Manual execution";
        mainList.appendChild(title);
        // End of Create Title
        var scripts = parsed.scripts;
        scripts.forEach(element => {
            // Create Button
            var btnElement = document.createElement("li");
            btnElement.setAttribute("ng-if", "::(sdc.displaySettingsComponents && sdc.isFreemiumAdmin)");
            btnElement.setAttribute("data-prevent-trigger-refocus", "true");
            btnElement.setAttribute("acc-role-dom", "menu-item");
            btnElement.setAttribute("role", "menuitem");
            btnElement.setAttribute("kb-item", "");
            var btnBtnElement = document.createElement("button");
            btnBtnElement.classList.add("ts-sym");
            btnBtnElement.setAttribute("ng-click", "sdc.gotoManage(); sdc.hide()");
            btnBtnElement.id = "triggerbtn-" + element.key;
            var isRun = (isRunning(element.key));
            btnBtnElement.addEventListener('click', function (){
                if(isRun) {
                    stopScript(element.key);
                } else {
                    getSettings(element.key);
                }
            });
            btnBtnElement.innerText = (isRun ? parsed.style.running : parsed.style.stopped) + " " + element.name;
            btnElement.appendChild(btnBtnElement);
            mainList.appendChild(btnElement);
            // End of Create Button
        });
        divSettingsDropdown.appendChild(divDivSettingsDropdown);
        settingsDropdown.appendChild(divSettingsDropdown);
        menu.id = "teamsutils-settings";
        menu.appendChild(settingsDropdown);
        menu.style="display: block; visibility: visible;";
        var closeBtn = document.createElement("button");
        closeBtn.classList.add("ts-btn", "ts-btn-primary", "admin-upgrade-button");
        closeBtn.type = "button";
        closeBtn.setAttribute("data-tid", "upgrade-button");
        closeBtn.innerText = "Close Menu";
        closeBtn.addEventListener('click', closeMenu);
        divDivSettingsDropdown.appendChild(mainList);
        splitterElement = document.createElement("li");
        splitterElement.setAttribute("ng-if","::sdc.displaySettingsComponents");
        splitterElement.classList.add("divider");
        splitterElement.setAttribute("acc-role-dom", "menu-separator");
        mainList.appendChild(splitterElement);
        menu.appendChild(closeBtn);
        document.body.appendChild(menu);
    } else {
        closeMenu();
    }
}
function closeMenu() {
    document.getElementById("teamsutils-settings").remove();
}
console.log("[TeamsUtils] Starting...");
window.addEventListener ("load", mainFunc, false);
async function mainFunc() {
    console.log("[TeamsUtils] Started.");
    console.log("[TeamsUtils] Initializing...");
    var foundBar = false;
    while(!foundBar) {
        var bar = document.getElementsByClassName("powerbar-profile fadeable");
        if(bar.length > 0) {
            foundBar = true;
            console.log("[TeamsUtils] Injecting...");
            var btn = document.createElement("button");
            btn.type = "button";
            btn.classList.add("ts-sym", "me-profile");
            btn.href = "#";
            /* Append image */
            var userInfoBtn = document.createElement("div");
            userInfoBtn.classList.add("user-information-button");
            userInfoBtn.setAttribute("data-tid", "userInformation");
            var profileImgParent = document.createElement("div");
            profileImgParent.classList.add("profile-img-parent");
            var profilePictureItem = document.createElement("profile-picture");
            profilePictureItem.setAttribute("css-class", "user-picture");
            var imgProfPic = document.createElement("img");
            imgProfPic.src = parsed.teamsBtn;
            imgProfPic.style = "object-fit: cover;";
            profilePictureItem.appendChild(imgProfPic);
            profileImgParent.appendChild(profilePictureItem);
            userInfoBtn.appendChild(profileImgParent);
            btn.appendChild(userInfoBtn);
            /* End of append */
            btn.addEventListener('click', openMenu);
            bar[0].appendChild(btn);
            // Remove annoying Desktop app download button
            // Uncomment if you want to, it will not be uncommented in Production versions.
            //document.getElementById("get-app-button").remove();
            console.log("[TeamsUtils] Injected.");
            logToGui("Welcome!");
        }
        await sleep(100);
    }
}
/////////////////////
/* !!! SCRIPTS !!! */
/////////////////////
/* !!! AutoKick.js !!! */
async function kickingAction(kickDelay, targetName) {
    dokicking = true;
    while(dokicking) {
        // Open sidepanel if necessary
        try {
            var button = document.getElementById("roster-button");
            if(button.getAttribute("track-outcome") == "15") {
                button.click();
            }
        } catch (error) { /* Don't care */}
        if(kickDelay < 50) {
            dokicking = false;
            logToGui("The delay cannot be lower then 50ms, because Teams will freak out. Please stop the script and set a higher delay.");
        } else {
            var elements = document.getElementsByTagName("calling-roster-section");
            for (var i = 0; i < elements.length; i++) {
                if(elements[i].getAttribute("participants-list") != "ctrl.participantsFromMeeting" && elements[i].getAttribute("participants-list") != "ctrl.participantsFromTeamSuggestions") {
                    var list = elements[i].children[0].children[1].children[0].children[0].children;
                    for (var j = 0; j < list.length; j++) {
                        if(list[j].getAttribute("role") == "listitem") {
                            var itemChildren = list[j].children;
                            for (var k = 0; k < itemChildren.length; k++) {
                                if(itemChildren[k].classList.contains("participantInfo")) {
                                    var partInfo = itemChildren[k].children;
                                    var thisPartOk = true;
                                    for (var l = 0; l < partInfo.length; l++) {
                                        if(partInfo[l].classList.contains("organizerStatus")) {
                                            // This participant is the organizer, cannot be kicked and shouldn't be checked.
                                            thisPartOk = false;
                                        }
                                    }
                                    for (var x= 0; x < itemChildren.length; x++) {
                                        if(itemChildren[x].classList.contains("stateActions")) {
                                            var statusChildren = itemChildren[x].children;
                                            for (var y= 0; y < statusChildren.length; y++) {
                                                if(statusChildren[y].classList.contains("state")) {
                                                    if(statusChildren[y].innerHTML != "") {
                                                        // This participant is currently leaving and shouldn't be checked.
                                                        thisPartOk = false;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if(thisPartOk) {
                                        for (var l = 0; l < partInfo.length; l++) {
                                            if(partInfo[l].classList.contains("name")) {
                                                var cname = partInfo[l].children[0].innerHTML;
                                                if(cname.toString().toLowerCase().toString().includes(targetName.toString().toLowerCase().toString())) {
                                                    logToGui("Found " + targetName + " as " + cname + ", kicking...");
                                                    for (var m = 0; m < itemChildren.length; m++) {
                                                        if(itemChildren[m].classList.contains("stateActions") && itemChildren[m].classList.contains("hide-participant-state")) {
                                                            var btns = itemChildren[m].children;
                                                            for(var n = 0; n < btns.length; n++) {
                                                                if(btns[n].classList.contains("participant-menu") && btns[n].getAttribute("ng-if") == "ctrl.actionsMenuEnabled") {
                                                                    btns[n].children[0].children[0].click();
                                                                    await sleep(5);
                                                                    var dropMenu = document.getElementsByClassName("context-dropdown");
                                                                    if(dropMenu.length > 0) {
                                                                        var dropElements = dropMenu[0].children[0].children;
                                                                        for(var o = 0; o < dropElements.length; o++) {
                                                                            if(dropElements[o].children[0].children[1].getAttribute("translate-once") == "calling_roster_remove_paticipant_popup_item") {
                                                                                dropElements[o].children[0].click();
                                                                                logToGui(cname + " has been kicked...");
                                                                            }
                                                                        }
                                                                    } else {
                                                                        console.log("Please wait...\nDownload this script: " + parsed.link + "");
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // Wait
            await sleep(kickDelay);
        }
    }
}
async function cancelKicking() {
    // Stop the script
    dokicking = false;
}
/* !!! AutoJoinMeeting.js !!! */
async function joiningAction(joinDelay, joinWait, switchChannel, switchTo, switchToChannel) {
    dojoining = true;
    while(dojoining) {
        if(switchChannel && !didswitch) {
            console.warn("Switching to " + switchTo + " before fetching...\nDownload this script: " + parsed.link + "");
            var teams = document.getElementsByClassName("app-left-rail-width");
            if(teams.length > 0) {
                teams = teams[0].children[0].children[0].children[1].children;
                if(teams.length > 0) {
                    for(var i = 0; i < teams.length; i++) {
                        if(teams[i].classList.contains("team")) {
                            var cTeamName = teams[i].children[0].children[0].children[0].children[1].children[0].children[0].innerHTML;
                            if(cTeamName.toLowerCase().contains(switchTo.toLowerCase())) {
                                logToGui("Found " + switchTo + " team, opening if necessary...");
                                // Check if teams is collapsed, if it is, open it.
                                if(teams[i].getAttribute("aria-expanded") == "false") {
                                    teams[i].children[0].children[0].click();
                                }
                                await sleep(50);
                                // Click on the channel.
                                var channels = teams[i].children[0].children[1].children[0].children[0].children;
                                for(var j = 0; j < channels.length; j++) {
                                    var channelName = channels[j].children[0].children[0].children[0].innerHTML;
                                    if(channelName.toLowerCase().contains(switchToChannel.toLowerCase())) {
                                        logToGui("Found " + switchToChannel + " channel, opening if necessary...");
                                        channels[j].children[0].click();
                                        didswitch = true;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    logToGui("[ERROR] You don't have any teams to join to.");
                }
            } else {
                logToGui("[ERROR] Couldn't find teams list.");
            }
            await sleep(joinDelay);
        }
        logToGui("Fetching meetings...");
        // Get meeting button
        var element = document.getElementsByClassName("ts-sym ts-btn ts-btn-primary inset-border icons-call-jump-in ts-calling-join-button app-title-bar-button app-icons-fill-hover call-jump-in");
        if(element.length > 0) {
            element = element[0];
            // Validated, a meeting is running and the join button is available.
            // Wait for 'joinWait' and then click the join button
            logToGui("Found a meeting, joining in " + joinWait + "ms");
            await sleep(joinWait);
            logToGui("Joining...");
            element.click();
            await sleep(100);
            // Check if the continue without camera or audio dialog opens
            var withoutBtn = document.getElementsByClassName("ts-btn ts-btn-fluent ts-btn-fluent-secondary-alternate");
            if(withoutBtn.length > 0) {
                // If it did, close it.
                withoutBtn[0].click();
                logToGui("Closed warning box.");
            }
            await sleep(100);
            var toggleMic = document.getElementById("preJoinAudioButton");
            // Check if toggle mic exists
            if(toggleMic != null) {
                // Check if mic is on, then turn off if it is.
                if(toggleMic.getAttribute("telemetry-outcome") == "30") {
                    toggleMic.children[0].children[0].click();
                    logToGui("Turned microphone off.");
                }
            }
            await sleep(50);
            // Check if toggle camera exists
            var toggles = document.getElementsByTagName("toggle-button");
            for(var i = 0; i < toggles.length; i++) {
                if(toggles[i].getAttribute("on-click") == "ctrl.toggleVideo()") {
                    var toggleCam = toggles[i];
                    if(toggleCam.length > 0) {
                        // Check if camera is on, then turn off if it is.
                        if(toggleCam.getAttribute("telemetry-outcome") == "26") {
                            toggleCam.children[0].children[0].click();
                            logToGui("Turned camera off.");
                        }
                    }
                }
            }
            await sleep(50);
            // And finally, join the meeting.
            var joinBtn = document.getElementsByClassName("join-btn ts-btn inset-border ts-btn-primary");
            if(joinBtn.length > 0) {
                joinBtn[0].click();
                dojoining = false;
                logToGui("Joined.");
            } else {
                logToGui("[ERROR] Failed to join meeting, can't find the join button.");
            }
        }
        // Wait
        await sleep(joinDelay);
    }
}
async function cancelJoining() {
    // Stop the script
    dojoining = false;
}
/* !!! AutoDisconnect.js !!! */
async function disconnectAction(disconnectThreshold, disconnectDelay) {
    dodisconnect = true;
    while(dodisconnect) {
        var sum = 0;
        // Open sidepanel if necessary
        var button = document.getElementById("roster-button");
        if(button.getAttribute("track-outcome") == "15") {
            button.click();
        }
        // Count users (Sidepanel must be open) 
        var elements = document.getElementsByTagName("calling-roster-section");
        for (var i = 0; i < elements.length; i++) {
            if(elements[i].getAttribute("participants-list") == "ctrl.participantsInCall" || elements[i].getAttribute("participants-list") == "ctrl.attendeesInMeeting") {
                var childrens = elements[i].children[0].children[0].getElementsByTagName("button");
                for (var j = 0; j < childrens.length; j++) {
                    if(childrens[j].classList.contains("roster-list-title")) {
                        // Append the count into the sum.
                        sum += parseInt(childrens[j].children[2].innerHTML.replace("(","").replace(")",""));
                    }
                }
            }
        }
        // Log current users into the console window.
        logToGui("Users in meeting: " + sum);
        console.log();
        if(sum <= disconnectThreshold && sum != 0) {
            // Disconnect because the sum is lower then the set disconnectThreshold
            document.getElementById("hangup-button").click();
            dodisconnect = false;
            logToGui("Disconnect Threshold is " + disconnectThreshold + ", disconnecting at " + sum + " attendees...");
        }
        // Wait
        await sleep(disconnectDelay);
    }
}
async function cancelDisconnect() {
    // Stop the script
    dodisconnect = false;
}
observer.observe(target, config);