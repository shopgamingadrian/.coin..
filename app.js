let loggedIn =
  localStorage.getItem("vyrox_login") === "true";


/* =========================
   LOGIN
========================= */

function login() {

  const username =
    document.getElementById("loginUser").value.trim();

  const password =
    document.getElementById("loginPass").value;

  const message =
    document.getElementById("loginMessage");


  if (
    username === VYROX_CONFIG.username &&
    password === VYROX_CONFIG.password
  ) {

    localStorage.setItem("vyrox_login", "true");

    loggedIn = true;

    document
      .getElementById("loginScreen")
      .classList.add("hidden");

    document
      .getElementById("app")
      .classList.remove("hidden");

    message.textContent = "";

    addLog("Admin logged in");

    showNotification("ورود موفق بود 🔥");

  } else {

    message.textContent =
      "نام کاربری یا رمز عبور اشتباه است.";

  }
}


/* =========================
   LOGOUT
========================= */

function logout() {

  localStorage.removeItem("vyrox_login");

  loggedIn = false;

  document
    .getElementById("app")
    .classList.add("hidden");

  document
    .getElementById("loginScreen")
    .classList.remove("hidden");

}


/* =========================
   PAGE NAVIGATION
========================= */

function openPage(id, button) {

  document
    .querySelectorAll(".page")
    .forEach(page => {
      page.classList.add("hidden");
    });


  const selected =
    document.getElementById(id);

  if (selected) {
    selected.classList.remove("hidden");
  }


  document
    .querySelectorAll(".sidebar nav button")
    .forEach(btn => {
      btn.classList.remove("active");
    });


  if (button) {
    button.classList.add("active");
  }


  const titles = {

    dashboard: "داشبورد",
    users: "کاربران",
    groups: "گروه‌ها",
    guard: "گارد",
    ai: "هوش مصنوعی",
    games: "بازی‌ها",
    economy: "اقتصاد",
    broadcast: "پیام همگانی",
    analytics: "آمار",
    logs: "لاگ‌ها",
    admins: "ادمین‌ها",
    console: "کنسول",
    settings: "تنظیمات"

  };


  document.getElementById("pageTitle").textContent =
    titles[id] || "VYROX";

}


/* =========================
   CLOCK
========================= */

function updateClock() {

  const now = new Date();

  const time =
    now.toLocaleTimeString("fa-IR");

  const date =
    now.toLocaleDateString("fa-IR");

  document.getElementById("clock").textContent =
    date + " • " + time;
}

setInterval(updateClock, 1000);
updateClock();


/* =========================
   NOTIFICATION
========================= */

function showNotification(message) {

  const old =
    document.querySelector(".toast");

  if (old) {
    old.remove();
  }


  const toast =
    document.createElement("div");

  toast.className = "toast";

  toast.textContent = message;

  toast.style.position = "fixed";
  toast.style.bottom = "25px";
  toast.style.left = "25px";
  toast.style.background = "#08111b";
  toast.style.border = "1px solid #08aaff";
  toast.style.color = "#eef8ff";
  toast.style.padding = "14px 18px";
  toast.style.borderRadius = "10px";
  toast.style.zIndex = "9999";

  document.body.appendChild(toast);


  setTimeout(() => {

    toast.remove();

  }, 2500);

}


/* =========================
   BROADCAST
========================= */

function sendBroadcast() {

  const input =
    document.getElementById("broadcastText");

  const text =
    input.value.trim();


  if (!text) {

    showNotification("پیام خالی است.");

    return;

  }


  addLog(
    "Broadcast created: " +
    text.substring(0, 50)
  );


  input.value = "";

  showNotification("پیام برای ارسال آماده شد 📢");

}


/* =========================
   CONSOLE
========================= */

function runCommand() {

  const input =
    document.getElementById("consoleCommand");

  const command =
    input.value.trim().toLowerCase();


  if (!command) {
    return;
  }


  addConsole(
    "> " + command
  );


  switch (command) {

    case "help":

      addConsole(
        "Commands: help, status, stats, version, clear"
      );

      break;


    case "status":

      addConsole(
        "VYROX STATUS: ONLINE"
      );

      break;


    case "stats":

      addConsole(
        "Users: 12,842 | Groups: 426"
      );

      break;


    case "version":

      addConsole(
        "VYROX v" +
        VYROX_CONFIG.version
      );

      break;


    case "clear":

      document.getElementById(
        "consoleBox"
      ).innerHTML = "";

      break;


    default:

      addConsole(
        "Unknown command. Type: help"
      );

  }


  input.value = "";

}


/* =========================
   CONSOLE LOG
========================= */

function addConsole(message) {

  const box =
    document.getElementById("consoleBox");

  const line =
    document.createElement("div");

  line.textContent =
    "[" +
    new Date().toLocaleTimeString("fa-IR") +
    "] " +
    message;

  box.appendChild(line);

  box.scrollTop =
    box.scrollHeight;

}


/* =========================
   LOG SYSTEM
========================= */

function addLog(message) {

  const box =
    document.getElementById("logsBox");

  if (box) {

    const line =
      document.createElement("div");

    line.textContent =
      "[" +
      new Date().toLocaleTimeString("fa-IR") +
      "] " +
      message;

    box.appendChild(line);

  }


  const recent =
    document.getElementById("recentLogs");

  if (recent) {

    recent.textContent =
      message;

  }

}


/* =========================
   USER SEARCH
========================= */

function searchUsers(value) {

  const rows =
    document.querySelectorAll(
      "#usersTable tr"
    );


  const search =
    value.toLowerCase();


  rows.forEach(row => {

    const text =
      row.textContent.toLowerCase();

    row.style.display =
      text.includes(search)
        ? ""
        : "none";

  });

}


/* =========================
   CONFIG UI
========================= */

function loadConfig() {

  const botName =
    document.getElementById(
      "dashboardBotName"
    );

  const settingsBot =
    document.getElementById(
      "settingsBotName"
    );

  const owner =
    document.getElementById(
      "settingsOwner"
    );

  const username =
    document.getElementById(
      "settingsUsername"
    );

  const version =
    document.getElementById(
      "settingsVersion"
    );


  if (botName) {
    botName.textContent =
      VYROX_CONFIG.botName;
  }

  if (settingsBot) {
    settingsBot.textContent =
      VYROX_CONFIG.botName;
  }

  if (owner) {
    owner.textContent =
      VYROX_CONFIG.ownerName;
  }

  if (username) {
    username.textContent =
      VYROX_CONFIG.ownerUsername;
  }

  if (version) {
    version.textContent =
      VYROX_CONFIG.version;
  }

}


/* =========================
   STARTUP
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadConfig();

    if (loggedIn) {

      document
        .getElementById("loginScreen")
        .classList.add("hidden");

      document
        .getElementById("app")
        .classList.remove("hidden");

    }

  }
);
/* =========================
   ADMIN MANAGER
========================= */

let admins =
  JSON.parse(
    localStorage.getItem("vyrox_admins") || "[]"
  );


function saveAdmins() {

  localStorage.setItem(
    "vyrox_admins",
    JSON.stringify(admins)
  );

}


function addAdmin() {

  const name =
    document.getElementById("adminName").value.trim();

  const username =
    document.getElementById("adminUsername").value.trim();

  const userId =
    document.getElementById("adminUserId").value.trim();

  const role =
    document.getElementById("adminRole").value;


  if (!name || !username || !userId) {

    showNotification(
      "همه اطلاعات را وارد کن ❌"
    );

    return;

  }


  const exists =
    admins.some(
      admin =>
        admin.userId === userId ||
        admin.username === username
    );


  if (exists) {

    showNotification(
      "این ادمین قبلاً وجود دارد ❌"
    );

    return;

  }


  const newAdmin = {

    id: Date.now(),

    name: name,

    username: username,

    userId: userId,

    role: role

  };


  admins.push(newAdmin);

  saveAdmins();

  renderAdmins();


  document.getElementById(
    "adminName"
  ).value = "";

  document.getElementById(
    "adminUsername"
  ).value = "";

  document.getElementById(
    "adminUserId"
  ).value = "";


  addLog(
    "Admin added: " +
    username
  );


  showNotification(
    "ادمین اضافه شد 👑"
  );

}


function deleteAdmin(id) {

  const admin =
    admins.find(
      item => item.id === id
    );


  if (!admin) return;


  const confirmDelete =
    confirm(
      "ادمین " +
      admin.username +
      " حذف شود؟"
    );


  if (!confirmDelete) return;


  admins =
    admins.filter(
      item => item.id !== id
    );


  saveAdmins();

  renderAdmins();


  addLog(
    "Admin removed: " +
    admin.username
  );


  showNotification(
    "ادمین حذف شد 🗑️"
  );

}


function renderAdmins() {

  const table =
    document.getElementById(
      "adminsTable"
    );


  if (!table) return;


  table.innerHTML = "";


  if (admins.length === 0) {

    table.innerHTML = `
      <tr>
        <td colspan="5">
          هنوز ادمینی اضافه نشده است.
        </td>
      </tr>
    `;

    return;

  }


  admins.forEach(admin => {

    const row =
      document.createElement("tr");


    row.innerHTML = `

      <td>
        ${escapeHTML(admin.name)}
      </td>

      <td>
        ${escapeHTML(admin.username)}
      </td>

      <td>
        ${escapeHTML(admin.userId)}
      </td>

      <td>
        <span class="admin-role">
          ${escapeHTML(
            admin.role.toUpperCase()
          )}
        </span>
      </td>

      <td>

        <button
          class="delete-admin"
          onclick="deleteAdmin(${admin.id})"
        >
          🗑️ حذف
        </button>

      </td>

    `;


    table.appendChild(row);

  });

}


/* جلوگیری از تزریق HTML */

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}
