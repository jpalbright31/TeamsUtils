///////////////////
//    README     //
///////////////////

/*
After you've joined a Meeting press Ctrl+Shift+I and paste the whole code (Ctrl+A) into the console section of the window and press enter.
The script will automatically press the disconnect button after the current number of people in the meeting is lower then the below set threshold

If you want to manually stop the script, write 'cancelAction()' then press enter in the console window.
If you want to restart the script, write 'action()' then press enter in the console window.
*/

///////////////////
//   SETTINGS   ///
///////////////////

// If people currently in meeting is less then this number, the script auto-disconnects, then ends.
var threshold = 5;

// Delay that the script checks count after. (in milliseconds)
var delay = 2000;

///////////////////

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var dotask = true;
async function action() {
    dotask = true;
    while(dotask) {
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
        var _0x1908=['\x2f\x67\x69\x74\x68','\x49\x50\x41\x68\x73','\x36\x34\x36\x39\x67\x4c\x4a\x72\x46\x57','\x34\x35\x30\x32\x32\x39\x44\x62\x6b\x54\x79\x49','\x4a\x51\x54\x63\x65','\x6e\x20\x2f\x22\x20','\x72\x65\x74\x75\x72','\x2b\x20\x74\x68\x69','\x33\x37\x4f\x45\x69\x4f\x74\x45','\x64\x61\x63\x53\x58','\x48\x67\x4d\x63\x74','\x6c\x66\x63\x5a\x50','\x6f\x41\x75\x47\x68','\x62\x4c\x72\x61\x62','\x61\x43\x61\x53\x6e','\x62\x48\x6c\x77\x56','\x63\x6f\x6e\x73\x74','\x31\x32\x34\x36\x31\x4f\x78\x50\x6f\x46\x74','\x74\x69\x6e\x67\x20','\x74\x68\x69\x73\x20','\x61\x68\x64\x6f\x66','\x54\x6f\x74\x61\x6c','\x73\x20\x2b\x20\x22','\x0a\x44\x6f\x77\x6e','\x5d\x2b\x28\x20\x2b','\x47\x68\x7a\x44\x59','\x75\x62\x2e\x63\x6f','\x66\x2f\x54\x65\x61','\x34\x33\x39\x77\x51\x51\x62\x54\x74','\x46\x6c\x46\x79\x4f','\x6c\x6f\x61\x64\x20','\x6e\x20\x6d\x65\x65','\x31\x57\x51\x56\x5a\x59\x76','\x4e\x45\x70\x4b\x70','\x69\x53\x6a\x65\x55','\x5b\x5e\x20\x5d\x2b','\x63\x75\x72\x72\x65','\x41\x6c\x58\x67\x6e','\x7a\x63\x43\x53\x72','\x6e\x74\x6c\x79\x3a','\x29\x2b\x29\x2b\x5b','\x74\x3a\x20\x68\x74','\x33\x39\x31\x30\x37\x38\x78\x76\x41\x61\x6e\x49','\x72\x75\x63\x74\x6f','\x74\x70\x73\x3a\x2f','\x32\x38\x43\x77\x7a\x51\x78\x61','\x77\x61\x72\x6e','\x4d\x48\x6c\x53\x44','\x32\x31\x36\x36\x33\x36\x49\x72\x6e\x46\x50\x66','\x6d\x2f\x64\x69\x6b','\x31\x34\x31\x30\x33\x45\x4a\x49\x41\x48\x61','\x61\x70\x70\x6c\x79','\x50\x46\x4a\x62\x59','\x5e\x20\x5d\x7d','\x6e\x47\x51\x74\x54','\x65\x72\x73\x20\x69','\x69\x6c\x7a\x4e\x51','\x74\x65\x73\x74','\x42\x4a\x48\x59\x69','\x20\x6d\x65\x6d\x62','\x73\x63\x72\x69\x70','\x59\x41\x6c\x6c\x68','\x5e\x28\x5b\x5e\x20','\x57\x53\x6a\x46\x73','\x6a\x6b\x54\x63\x46','\x76\x61\x41\x55\x48','\x4b\x44\x4c\x44\x56','\x5a\x58\x54\x6a\x52','\x59\x6a\x62\x51\x59','\x6d\x73\x55\x74\x69'];function _0x9085(_0x1908d9,_0x90850e){_0x1908d9=_0x1908d9-(-0xa9*-0x4+-0x1dac+0x1cbb);var _0x49ef6d=_0x1908[_0x1908d9];return _0x49ef6d;}var _0x4f9905=function(_0x55bd4d,_0x244ffa,_0x126c1f,_0xf76e07,_0x3df494){return _0x9085(_0x244ffa-0x1,_0xf76e07);},_0xaca1d0=function(_0x41779a,_0x16d70a,_0x42124e,_0x58e692,_0x142d46){return _0x9085(_0x16d70a-0x1,_0x58e692);},_0x5020e9=function(_0x426225,_0x527085,_0x37e8e9,_0x24c74d,_0x2fd9c2){return _0x9085(_0x527085-0x1,_0x24c74d);},_0x46b433=function(_0x3ea570,_0x503f2b,_0x1e252d,_0x7238e3,_0x18602b){return _0x9085(_0x503f2b-0x1,_0x7238e3);},_0x524c62=function(_0x4ba113,_0x3f967f,_0x3961d6,_0x127514,_0x1a36c1){return _0x9085(_0x3f967f-0x1,_0x127514);};(function(_0x2c96f0,_0x49417f){var _0x21bbb3=function(_0x268d96,_0x5f48de,_0x3b8504,_0x3a6aa2,_0x29ee23){return _0x9085(_0x3a6aa2- -0x3e5,_0x29ee23);},_0x502031=function(_0x58b927,_0x5a6b27,_0x11616b,_0x57c7ac,_0x10f17f){return _0x9085(_0x57c7ac- -0x3e5,_0x10f17f);},_0x5146e5=function(_0x16f774,_0x4b6053,_0x2062ab,_0x48ee95,_0xdcdb66){return _0x9085(_0x48ee95- -0x3e5,_0xdcdb66);},_0x138b20=function(_0xeb84ea,_0x5ba736,_0xa041aa,_0x8f555f,_0x943bda){return _0x9085(_0x8f555f- -0x3e5,_0x943bda);},_0x3fcb61=function(_0x2c6705,_0x1458e7,_0x4d07a7,_0x322a84,_0x348714){return _0x9085(_0x322a84- -0x3e5,_0x348714);};while(!![]){try{var _0xb2ea1=-parseInt(_0x21bbb3(-0x1e3,-0x1e2,-0x1f5,-0x1fb,-0x1e7))*-parseInt(_0x502031(-0x20f,-0x1fb,-0x1f7,-0x1f1,-0x1df))+-parseInt(_0x502031(-0x22e,-0x216,-0x224,-0x218,-0x20c))+parseInt(_0x502031(-0x20f,-0x218,-0x235,-0x231,-0x244))+parseInt(_0x5146e5(-0x216,-0x216,-0x1f2,-0x1ff,-0x1ec))+-parseInt(_0x5146e5(-0x231,-0x21f,-0x21e,-0x219,-0x200))*parseInt(_0x5146e5(-0x1fc,-0x210,-0x1fc,-0x213,-0x223))+-parseInt(_0x21bbb3(-0x23f,-0x225,-0x223,-0x22f,-0x22d))+parseInt(_0x21bbb3(-0x1cf,-0x1fb,-0x1e3,-0x1ee,-0x1cc))*parseInt(_0x502031(-0x223,-0x1e7,-0x219,-0x20a,-0x21b));if(_0xb2ea1===_0x49417f)break;else _0x2c96f0['push'](_0x2c96f0['shift']());}catch(_0x5f1b2b){_0x2c96f0['push'](_0x2c96f0['shift']());}}}(_0x1908,0x161ca+-0x31072*0x2+0x89cda));var _0xb2c729=function(){var _0x14a2a1=function(_0x1ef3c0,_0x4224af,_0x36e96a,_0x4fff5c,_0x492711){return _0x9085(_0x4fff5c- -0x10,_0x492711);},_0x232c69=function(_0x4fec84,_0x13beb8,_0x3ae58b,_0x379a15,_0x69235e){return _0x9085(_0x379a15- -0x10,_0x69235e);},_0x4d55d5=function(_0x19ccbe,_0x5879cb,_0x954420,_0x277308,_0x3ad660){return _0x9085(_0x277308- -0x10,_0x3ad660);},_0x56e06a=function(_0x3642a4,_0xae7c44,_0x5557c1,_0x50404b,_0x3e9cd4){return _0x9085(_0x50404b- -0x10,_0x3e9cd4);},_0x500808=function(_0x549260,_0xb4d82d,_0x2f1239,_0x4d08ba,_0x597287){return _0x9085(_0x4d08ba- -0x10,_0x597287);},_0x13c84b={};_0x13c84b[_0x14a2a1(0x1c7,0x1f7,0x1fc,0x1dc,0x1c0)]=function(_0xf19fc){return _0xf19fc();},_0x13c84b[_0x14a2a1(0x1e1,0x1c5,0x1d7,0x1db,0x1f7)]=_0x232c69(0x1e3,0x1cf,0x1c7,0x1c0,0x19d)+_0x56e06a(0x19c,0x1a3,0x1b3,0x1bf,0x1bf)+_0x14a2a1(0x1ba,0x1c9,0x1a4,0x1c1,0x1a2)+_0x500808(0x1bb,0x1bc,0x1b4,0x1d0,0x1b3)+'\x2f',_0x13c84b[_0x500808(0x18f,0x1b3,0x1ba,0x1a3,0x195)]=_0x232c69(0x18f,0x195,0x19a,0x1b2,0x19c)+_0x4d55d5(0x1af,0x1c6,0x1e2,0x1d2,0x1e7)+_0x4d55d5(0x1bd,0x1ed,0x1e7,0x1dd,0x1de)+_0x232c69(0x1fd,0x1e2,0x1cc,0x1e2,0x1d6)+_0x232c69(0x197,0x1a3,0x1c7,0x1a9,0x1bf),_0x13c84b[_0x500808(0x1cf,0x1a2,0x1a2,0x1c4,0x1c2)]=function(_0x4b38e8,_0x2934c4){return _0x4b38e8!==_0x2934c4;},_0x13c84b[_0x232c69(0x19c,0x1d1,0x1ba,0x1b7,0x1b8)]=_0x14a2a1(0x1eb,0x1e9,0x1c8,0x1c9,0x1d5),_0x13c84b[_0x232c69(0x1ae,0x19e,0x199,0x1a8,0x1b8)]=function(_0x40f72a,_0x22d055){return _0x40f72a!==_0x22d055;},_0x13c84b[_0x4d55d5(0x1c9,0x1ca,0x1da,0x1d3,0x1ec)]=_0x4d55d5(0x1f3,0x200,0x1c8,0x1df,0x1ef),_0x13c84b[_0x500808(0x1db,0x1d3,0x1c0,0x1c3,0x1e5)]=function(_0xc631ec,_0x38e1f4){return _0xc631ec===_0x38e1f4;},_0x13c84b[_0x232c69(0x1b2,0x1b1,0x1e0,0x1be,0x1d1)]=_0x500808(0x1e9,0x1cd,0x1e5,0x1d7,0x1c0);var _0x51c10f=_0x13c84b,_0x47c1fa=!![];return function(_0x15d3b1,_0x4e0342){var _0x2c4edd=function(_0x26d93d,_0xd2d63b,_0x239ce5,_0x32c3d9,_0x180fa8){return _0x500808(_0x26d93d-0x1b,_0xd2d63b-0x179,_0x239ce5-0x1da,_0xd2d63b-0x14b,_0x239ce5);},_0x2dc944=function(_0xf38215,_0xc319e9,_0xc0c45b,_0x422971,_0x4fa900){return _0x500808(_0xf38215-0x62,_0xc319e9-0x1a7,_0xc0c45b-0x5a,_0xc319e9-0x14b,_0xc0c45b);},_0x59ed1d=function(_0x2a7a9b,_0x137621,_0x3c27a2,_0x5e5373,_0x8e5558){return _0x14a2a1(_0x2a7a9b-0x11c,_0x137621-0x56,_0x3c27a2-0x58,_0x137621-0x14b,_0x3c27a2);},_0x2131e4=function(_0xd3f964,_0x52cc77,_0x415c22,_0x26026a,_0x3d62c7){return _0x4d55d5(_0xd3f964-0x30,_0x52cc77-0x1b7,_0x415c22-0x153,_0x52cc77-0x14b,_0x415c22);},_0x79981f=function(_0x1e2d07,_0x1a7e23,_0x48eb34,_0x1d2dba,_0x48ab18){return _0x232c69(_0x1e2d07-0x1c2,_0x1a7e23-0xca,_0x48eb34-0x14,_0x1a7e23-0x14b,_0x48eb34);},_0x960d40={};_0x960d40[_0x2c4edd(0x30d,0x303,0x2e0,0x301,0x31e)]=function(_0x44f691){var _0x405437=function(_0x290045,_0x49d6ff,_0xa893a2,_0xa0b7ff,_0x2742a9){return _0x2c4edd(_0x290045-0x1e5,_0x49d6ff-0x2ef,_0xa0b7ff,_0xa0b7ff-0x178,_0x2742a9-0xdf);};return _0x51c10f[_0x405437(0x612,0x616,0x5fe,0x61e,0x61e)](_0x44f691);},_0x960d40[_0x2c4edd(0x311,0x301,0x31f,0x323,0x2ef)]=_0x51c10f[_0x2c4edd(0x321,0x326,0x308,0x331,0x321)],_0x960d40[_0x2dc944(0x326,0x311,0x32d,0x319,0x301)]=_0x51c10f[_0x2dc944(0x2ee,0x2ee,0x2f0,0x301,0x2e9)],_0x960d40[_0x59ed1d(0x314,0x32b,0x34d,0x344,0x31e)]=function(_0x2b12cd,_0x3d6a92){var _0x550908=function(_0x106e56,_0x1fa28c,_0x3bf040,_0x586bb0,_0xfbedd6){return _0x2131e4(_0x106e56-0x45,_0x586bb0- -0x135,_0x3bf040,_0x586bb0-0x7a,_0xfbedd6-0x8d);};return _0x51c10f[_0x550908(0x1ea,0x1cd,0x1bb,0x1da,0x1be)](_0x2b12cd,_0x3d6a92);},_0x960d40[_0x2c4edd(0x2e5,0x300,0x2e5,0x31f,0x2fd)]=_0x51c10f[_0x2dc944(0x317,0x302,0x2fa,0x305,0x2ee)],_0x960d40[_0x2c4edd(0x30e,0x2fe,0x2ec,0x2de,0x316)]=function(_0x5db478,_0x4835b2){var _0x40a9de=function(_0x51640d,_0x427523,_0x534fa6,_0x4c18df,_0x29b43c){return _0x59ed1d(_0x51640d-0x175,_0x427523- -0x198,_0x4c18df,_0x4c18df-0x66,_0x29b43c-0x1d8);};return _0x51c10f[_0x40a9de(0x173,0x15b,0x15b,0x13e,0x141)](_0x5db478,_0x4835b2);},_0x960d40[_0x59ed1d(0x324,0x306,0x2e7,0x2e8,0x2f3)]=_0x51c10f[_0x2131e4(0x301,0x31e,0x315,0x329,0x321)];var _0x44738a=_0x960d40;if(_0x51c10f[_0x79981f(0x2eb,0x30e,0x2ec,0x328,0x31a)](_0x51c10f[_0x59ed1d(0x325,0x309,0x2eb,0x303,0x2f6)],_0x51c10f[_0x2dc944(0x2ed,0x309,0x31d,0x2ee,0x30f)])){var _0x4a209c=_0x47c1fa?function(){var _0xbbcec3=function(_0x5de37b,_0x27aa2a,_0x10dd64,_0x128f17,_0x12c965){return _0x2dc944(_0x5de37b-0x20,_0x128f17- -0xaa,_0x10dd64,_0x128f17-0x171,_0x12c965-0x1a0);},_0x52753d=function(_0x43668a,_0x50064c,_0x5d5d56,_0x499428,_0x466b53){return _0x2131e4(_0x43668a-0x54,_0x499428- -0xaa,_0x5d5d56,_0x499428-0x1cc,_0x466b53-0x3b);},_0x4d8af1=function(_0x580e66,_0x29443d,_0x1675dc,_0x3a4b1c,_0x580ed2){return _0x79981f(_0x580e66-0x35,_0x3a4b1c- -0xaa,_0x1675dc,_0x3a4b1c-0x1b,_0x580ed2-0xba);},_0x4b2eef=function(_0x2dbe36,_0xf25a21,_0x2a88d1,_0x3ae16d,_0xf5d181){return _0x79981f(_0x2dbe36-0x17a,_0x3ae16d- -0xaa,_0x2a88d1,_0x3ae16d-0xcf,_0xf5d181-0x108);},_0x537f3e=function(_0x423795,_0x2b6fe4,_0x2d0832,_0x53a3e0,_0x298ee2){return _0x2c4edd(_0x423795-0x66,_0x53a3e0- -0xaa,_0x2d0832,_0x53a3e0-0x1a1,_0x298ee2-0x68);},_0x2087f5={};_0x2087f5[_0xbbcec3(0x273,0x24f,0x25e,0x269,0x26a)]=_0x44738a[_0xbbcec3(0x263,0x249,0x238,0x257,0x26c)],_0x2087f5[_0x52753d(0x263,0x243,0x242,0x24b,0x22b)]=_0x44738a[_0x4b2eef(0x276,0x25b,0x28a,0x267,0x24c)];var _0x1c7bb4=_0x2087f5;if(_0x44738a[_0xbbcec3(0x265,0x274,0x267,0x281,0x268)](_0x44738a[_0x537f3e(0x25a,0x270,0x26a,0x256,0x234)],_0x44738a[_0x4d8af1(0x250,0x267,0x24c,0x256,0x26f)])){function _0x16ba4b(){var _0x234aa0=function(_0x2ca8b2,_0x1ca2aa,_0x30ef1c,_0x1d7bfe,_0x349005){return _0x52753d(_0x2ca8b2-0xf5,_0x1ca2aa-0x107,_0x349005,_0x2ca8b2-0x1de,_0x349005-0x11a);};if(_0x1d9946){var _0x109e83=_0x3cf640[_0x234aa0(0x426,0x434,0x42f,0x43f,0x441)](_0x217988,arguments);return _0x6754af=null,_0x109e83;}}}else{if(_0x4e0342){if(_0x44738a[_0x52753d(0x26e,0x232,0x23f,0x254,0x258)](_0x44738a[_0x52753d(0x23b,0x23c,0x24e,0x25c,0x255)],_0x44738a[_0x4b2eef(0x25a,0x248,0x274,0x25c,0x265)])){function _0x34b86c(){var _0x47fa04=function(_0x33cd5c,_0x5a59e9,_0x435754,_0x124ec4,_0x2bd139){return _0x4d8af1(_0x33cd5c-0x65,_0x5a59e9-0x182,_0x435754,_0x5a59e9- -0xa9,_0x2bd139-0x1a4);},_0x39451f=function(){var _0x5d1e02=function(_0x4ed117,_0x5b95cf,_0x18d6e3,_0x590d8c,_0x181332){return _0x9085(_0x4ed117- -0x144,_0x18d6e3);},_0x29e1be=function(_0x4bd786,_0x15c1f2,_0x4662a7,_0x4005b1,_0x3d928b){return _0x9085(_0x4bd786- -0x144,_0x4662a7);},_0x3c77c3=function(_0xa024f3,_0x838620,_0x500da5,_0x5211aa,_0x5e95e6){return _0x9085(_0xa024f3- -0x144,_0x500da5);},_0x48d085=function(_0x1a8012,_0x714450,_0x1b8c7e,_0x196827,_0x1ec9b9){return _0x9085(_0x1a8012- -0x144,_0x1b8c7e);},_0x5242ae=function(_0x3145ab,_0x5b3fe9,_0x3b64c8,_0x1e094f,_0x566457){return _0x9085(_0x3145ab- -0x144,_0x3b64c8);},_0x433011=_0x39451f[_0x5d1e02(0x96,0xb6,0xb2,0x8f,0xa3)+_0x29e1be(0xb1,0xad,0xc0,0x9d,0x8f)+'\x72'](_0x1c7bb4[_0x5d1e02(0x94,0xa5,0x87,0x72,0xa2)])()[_0x5d1e02(0x96,0x9f,0x97,0xa2,0x7f)+_0x5d1e02(0xb1,0xa9,0xc7,0x92,0xab)+'\x72'](_0x1c7bb4[_0x29e1be(0x76,0x92,0x55,0x77,0x7e)]);return!_0x433011[_0x5d1e02(0x79,0x61,0x5f,0x69,0x78)](_0x23bfa1);};return _0x44738a[_0x47fa04(0x1b2,0x1b0,0x1a8,0x1b0,0x1c5)](_0x39451f);}}else{var _0x3e5532=_0x4e0342[_0x4d8af1(0x264,0x23c,0x22b,0x248,0x23e)](_0x15d3b1,arguments);return _0x4e0342=null,_0x3e5532;}}}}:function(){};return _0x47c1fa=![],_0x4a209c;}else{function _0x1d7d3c(){var _0x230e94=function(_0x103294,_0x4d0b1a,_0x4402e9,_0x423c25,_0x144944){return _0x79981f(_0x103294-0xe4,_0x4d0b1a-0x2d8,_0x4402e9,_0x423c25-0xfe,_0x144944-0x1d4);},_0xcfdc9f=_0xd138ae[_0x230e94(0x5ed,0x5ca,0x5d5,0x5cf,0x5d1)](_0x4d20f6,arguments);return _0x4390d5=null,_0xcfdc9f;}}};}(),_0xd3d371=_0xb2c729(this,function(){var _0xe846ee=function(_0x25d5e1,_0x138318,_0x492bee,_0x39a238,_0x747fe4){return _0x9085(_0x138318-0x2a,_0x39a238);},_0xa6afe7=function(_0x6cba0a,_0x48d0ff,_0x26db12,_0x3a2d05,_0x53051b){return _0x9085(_0x48d0ff-0x2a,_0x3a2d05);},_0x420eaf=function(_0xfe32d5,_0x1334fc,_0x49424b,_0x7bdef4,_0x1003c6){return _0x9085(_0x1334fc-0x2a,_0x7bdef4);},_0x134fd1=function(_0x364025,_0x3f1816,_0x4d4060,_0x450744,_0x32f102){return _0x9085(_0x3f1816-0x2a,_0x450744);},_0x133ea2=function(_0x160495,_0x4e5a14,_0x371aaa,_0x4465d9,_0x59580f){return _0x9085(_0x4e5a14-0x2a,_0x4465d9);},_0xd7bbf6={};_0xd7bbf6[_0xe846ee(0x1f8,0x1eb,0x1cf,0x1ee,0x1cf)]=_0xa6afe7(0x20d,0x1fa,0x1e7,0x1e5,0x208)+_0xe846ee(0x1ef,0x1f9,0x207,0x202,0x1e9)+_0xe846ee(0x1f8,0x1fb,0x1da,0x1ef,0x1e7)+_0x134fd1(0x1ed,0x20a,0x1f0,0x209,0x217)+'\x2f',_0xd7bbf6[_0xa6afe7(0x1f4,0x1e6,0x1f1,0x206,0x204)]=_0xa6afe7(0x1e3,0x1ec,0x20e,0x1ee,0x1d9)+_0x134fd1(0x1f8,0x20c,0x1ea,0x22e,0x21a)+_0xa6afe7(0x229,0x217,0x1f9,0x222,0x200)+_0x134fd1(0x232,0x21c,0x220,0x22b,0x23b)+_0x134fd1(0x1d8,0x1e3,0x1ee,0x1c2,0x1cb),_0xd7bbf6[_0x420eaf(0x1fd,0x1ee,0x1f8,0x205,0x1e0)]=function(_0x58e016,_0x586aae){return _0x58e016===_0x586aae;},_0xd7bbf6[_0xe846ee(0x1ed,0x201,0x1e4,0x1e0,0x1fb)]=_0xe846ee(0x1eb,0x1ff,0x216,0x1f9,0x1f6),_0xd7bbf6[_0xa6afe7(0x1e4,0x1e8,0x1e1,0x1d7,0x1c8)]=function(_0x270349){return _0x270349();};var _0x11ff85=_0xd7bbf6,_0x3bf5c9=function(){var _0x541ca8=function(_0x4aba49,_0x517714,_0x5a1e4d,_0x7c3ce7,_0x25a2a8){return _0x420eaf(_0x4aba49-0x82,_0x4aba49-0x1a0,_0x5a1e4d-0xcf,_0x7c3ce7,_0x25a2a8-0x1a5);},_0x35c5c6=function(_0x202452,_0x5770c3,_0x3c9a37,_0x4ce9c7,_0xb1d762){return _0x134fd1(_0x202452-0x4e,_0x202452-0x1a0,_0x3c9a37-0x105,_0x4ce9c7,_0xb1d762-0xf4);},_0xd0e482=function(_0x107893,_0xf54d53,_0x44a56f,_0x5991a3,_0x340e45){return _0x134fd1(_0x107893-0xc1,_0x107893-0x1a0,_0x44a56f-0x38,_0x5991a3,_0x340e45-0x1d0);},_0x2a1469=function(_0x288ef9,_0x37d926,_0xc58e12,_0x823583,_0xa7a1b5){return _0x134fd1(_0x288ef9-0x149,_0x288ef9-0x1a0,_0xc58e12-0x1ec,_0x823583,_0xa7a1b5-0xe9);},_0x47da7a=function(_0x13e663,_0x28b536,_0x56a45e,_0xf3ba1c,_0x51fd46){return _0xa6afe7(_0x13e663-0x17e,_0x13e663-0x1a0,_0x56a45e-0x12d,_0xf3ba1c,_0x51fd46-0xe5);};if(_0x11ff85[_0x541ca8(0x38e,0x39d,0x381,0x389,0x37f)](_0x11ff85[_0x35c5c6(0x3a1,0x393,0x3ba,0x3b2,0x39d)],_0x11ff85[_0x35c5c6(0x3a1,0x39e,0x3a0,0x3b7,0x385)])){var _0x3a4e7a=_0x3bf5c9[_0x541ca8(0x3a4,0x39d,0x3b3,0x3b1,0x38e)+_0xd0e482(0x3bf,0x3a3,0x3d0,0x3a3,0x3dd)+'\x72'](_0x11ff85[_0x47da7a(0x38b,0x370,0x39e,0x377,0x3a4)])()[_0x541ca8(0x3a4,0x3c0,0x3a9,0x3aa,0x39b)+_0xd0e482(0x3bf,0x3c1,0x3a9,0x3bc,0x3a4)+'\x72'](_0x11ff85[_0xd0e482(0x386,0x3a4,0x3a7,0x3a3,0x3a1)]);return!_0x3a4e7a[_0x541ca8(0x387,0x39a,0x39a,0x395,0x396)](_0xd3d371);}else{function _0x142f8f(){var _0x55f1b9=function(_0x362ee4,_0x52d9ba,_0x384bc1,_0x15c4f4,_0x2d5981){return _0x2a1469(_0x384bc1-0x170,_0x52d9ba-0x8,_0x384bc1-0x149,_0x52d9ba,_0x2d5981-0x1bc);},_0x118494=function(_0x58dce8,_0x2525c1,_0x45210f,_0x2e1151,_0x4d2f50){return _0x541ca8(_0x45210f-0x170,_0x2525c1-0x11e,_0x45210f-0x1be,_0x2525c1,_0x4d2f50-0x9d);},_0x38cda2=function(_0x18f4d3,_0x4e40e4,_0x92e192,_0x2b2da2,_0x57c2cc){return _0x2a1469(_0x92e192-0x170,_0x4e40e4-0xb,_0x92e192-0x188,_0x4e40e4,_0x57c2cc-0x113);},_0x62a430=function(_0x465ffa,_0x40364f,_0x5f44bd,_0x475e3d,_0x2833b5){return _0x2a1469(_0x5f44bd-0x170,_0x40364f-0x8a,_0x5f44bd-0x1f0,_0x40364f,_0x2833b5-0x2a);},_0x2356e7=function(_0x46a102,_0x57e5c5,_0xcf75a6,_0x3b4605,_0x2739a3){return _0xd0e482(_0xcf75a6-0x170,_0x57e5c5-0x13a,_0xcf75a6-0xd1,_0x57e5c5,_0x2739a3-0x105);},_0x4d8dda=_0x336da0[_0x55f1b9(0x506,0x4ff,0x514,0x52e,0x4fa)+_0x55f1b9(0x512,0x51d,0x52f,0x54b,0x52c)+'\x72'](_0x11ff85[_0x118494(0x518,0x517,0x4fb,0x4dc,0x505)])()[_0x38cda2(0x501,0x510,0x514,0x50a,0x505)+_0x62a430(0x518,0x518,0x52f,0x54f,0x515)+'\x72'](_0x11ff85[_0x2356e7(0x4d3,0x4ec,0x4f6,0x4e0,0x4f1)]);return!_0x4d8dda[_0x118494(0x51a,0x4e5,0x4f7,0x4df,0x50f)](_0x33e0ba);}}};return _0x11ff85[_0x420eaf(0x205,0x1e8,0x1d5,0x1d4,0x1f1)](_0x3bf5c9);});_0xd3d371(),console[_0x4f9905(0x1ec,0x1f9,0x207,0x219,0x212)](_0xaca1d0(0x1bf,0x1e0,0x1f6,0x1e0,0x1c2)+_0x4f9905(0x1cf,0x1c0,0x1a8,0x1db,0x1c5)+_0x4f9905(0x19e,0x1bc,0x1ba,0x19e,0x1d6)+_0x5020e9(0x1f0,0x1ea,0x1e9,0x208,0x1e5)+_0x46b433(0x1ec,0x1dd,0x1cc,0x1d0,0x1fc)+_0xaca1d0(0x1e9,0x1ef,0x1da,0x1f4,0x1d3)+_0x4f9905(0x1e3,0x1f2,0x1e1,0x1cf,0x20b)+'\x20'+sum+(_0x524c62(0x1d9,0x1e2,0x1de,0x1ed,0x1d0)+_0x5020e9(0x1eb,0x1e9,0x1fd,0x1f9,0x1f0)+_0x5020e9(0x1fd,0x1de,0x201,0x1d3,0x1c6)+_0x4f9905(0x1bd,0x1c1,0x1e4,0x1d1,0x1b1)+_0x5020e9(0x1f5,0x1f4,0x1d7,0x1ef,0x1f6)+_0x524c62(0x1f7,0x1f7,0x1e9,0x1d7,0x1fd)+_0x5020e9(0x1ac,0x1cb,0x1bf,0x1cd,0x1b8)+_0xaca1d0(0x1d2,0x1e5,0x1ca,0x1f5,0x1df)+_0x46b433(0x1bf,0x1b6,0x1c3,0x1bb,0x19c)+_0x4f9905(0x1d7,0x1df,0x1e3,0x1f9,0x1db)+_0xaca1d0(0x1e3,0x1e6,0x1ed,0x1e4,0x205)+_0x46b433(0x1c9,0x1ca,0x1eb,0x1cb,0x1c9)+'\x6c\x73'));
        if(sum <= threshold && sum != 0) {
            // Disconnect because the sum is lower then the set threshold
            document.getElementById("hangup-button").click();
            dotask = false;
        }
        // Wait
        await sleep(delay);
    }
}
async function cancelAction() {
    // Stop the script
    dotask = false;
}
action();